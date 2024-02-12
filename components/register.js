import axios from "axios";
//import { Mali } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
import { get, useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/router";
//import WebSocket from "ws";


export default function Register({data}){
    //const router = new useRouter();
    const [newdata , setNewdata] = useState(JSON.parse(data)); 
    // useEffect(()=>{
    // setNewdata();
    // },[data]);

    const [valid , setValid] = useState(null);

    useEffect(()=>{
        const io = new WebSocket('ws://localhost:8080');
        io.onopen = ()=>{
            console.log('Websocket connected');
        }

        io.onmessage = (message)=>{
            const newAdded = JSON.parse(message.data);
            // console.log("Type",newAdded.operationType);
            // console.log("newly",newAdded);
            if(newAdded.operationType === "insert"){
                setNewdata([...newdata,newAdded.fullDocument]);
            }
        }

        io.onclose = ()=>{
            console.log('disconnected to websocket');
        }
    },[]);

    const {register , formState:{errors} ,setValue, handleSubmit} = useForm();
    
    const submit = async (detail)=>{
       // console.log("isValid",valid);
        if(!valid){
            const {Email , FirstName ,LastName , Password} = detail;            
            const Verified = false;
            const now = new Date();
            const data = {Email , FirstName ,LastName , Password ,now ,Verified};
            try{
                //console.log("mail",Email);
                const verifyResponse = await axios.post("/api/verificationMail",{Email});
                const verifyData = verifyResponse.data;
                alert(verifyData.Message+" (You can send verification mail again at login page tab)");
            }catch(error){
                alert("Error occurecd while sending verification email (You can send verification mail again at login page tab)");
            }
            try{
                const response = await axios.post("/api/registration",data);
                response.data && alert(response.data.Message);
                setValid(true);
                //router.push('/login');
            }catch(error){
                alert("Error occured while registration");
            }
            setValue('FirstName','');
            setValue('LastName','');
            setValue('Email','');
            setValue('Password','');
        }else{
            alert("Validate your E-mail");
        }
        
    }
    //const getMail = watch('Email');
    useEffect(()=>{
        console.log("updated",newdata);
    },[newdata])
    

    const validateMail = (event)=>{
        const E_mail = event.target.value.trim();
        setValid(newdata.some((element)=>{
            if(element.Email === E_mail){
                return true;  
            }
            return false;  
        }));
        //console.log("enter to setvalid");
    }
 
    return(
        <>
        <form className="text-black flex flex-col mt-10 p-5" onSubmit={handleSubmit(submit)}>
            <div>
            <label className="font-semibold text-lg p-2" id="Name">Name</label>
                <div className="flex">
                    <div className="flex flex-col">
                        <input placeholder="FirstName" type="text" className="p-2 border-4 rounded-lg" {...register("FirstName" ,{required:"This feild is required"})}></input>
                        {errors.FirstName && <h1 className="text-red-500">This feild is required</h1>}
                    </div>
                    <div className="flex flex-col">
                        <input placeholder="LastName" type="text" className="p-2 border-4 rounded-lg" {...register("LastName" ,{required:"This feild is required"})}></input>
                        {errors.LastName && <h1 className="text-red-500">This feild is required</h1>}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <label className="font-semibold text-lg p-2" id="Email">Email</label>
                <div className="flex">
                    <input placeholder="Email" className="p-2 border-4 rounded-lg mr-2" {...register("Email" ,
                        {required:"This feild is required",
                        pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:"Please enter valid email",
                        }
                        })} onChange={validateMail}>
                    </input>
                        
                </div>
                
                {errors.Email && <h1 className="text-red-500" >{errors.Email.message}</h1>}
                {valid ? <h1 className="text-red-500" >This email already exist</h1> : <h1 className="text-green-500" >You can use this email</h1>}
            </div>
            
            <label className="font-semibold text-lg p-2 mt-4" id="Password">Password</label>
            <input type="password" className="p-2 border-4 rounded-lg" placeholder="Password" {...register("Password" ,{required:"This feild is required" , minLength:6})}></input>
            {errors.Password && <h1 className="text-red-500">This feild is required</h1>}
            <input className="bg-gray-400 p-1 w-auto text-lg font-semibold mt-3 cursor-pointer border-2 border-black rounded-2xl mt-4" type="submit"></input>
        </form>
        </>
    )
}
