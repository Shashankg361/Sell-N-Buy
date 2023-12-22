import axios from "axios";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form"

export default function Register({data}){
    const [valid , setValid] = useState(false);
    const {register , formState:{errors} , handleSubmit ,watch} = useForm();

    const submit = async (detail)=>{
        const {Email , Username , Password} = detail;
        const now = new Date();
        const data = {Email , Username , Password ,now};
        const response = await axios.post("/api/registration",data);
        if(response.data){
            alert(response.data.Message);
        }
    }
    const getMail = watch('Email');

    const validateMail = ()=>{
        const newdata = JSON.parse(data);
        setValid(newdata.some((element)=>{
            if(element.Email === getMail){
                return true;  
            }
            return false;
        }));
    }

    const mailFunc = (event)=>{
        if(valid){
            alert("Please use Valid Email");
        }else{
            console.log("send mail");
        }
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
            <div>
                <label className="font-semibold text-lg p-2" id="Email">Email</label>
                <div className="flex">
                    <input placeholder="Email" type="email" className="p-2 border-4 rounded-lg mr-2" {...register("Email" ,
                        {required:"This feild is required",
                        pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:"Please enter valid email",
                        }
                        })}></input>
                        <div className="flex">
                            <button className="bg-gray-400 p-1 w-auto text-lg mr-1 font-semibold mt-3 cursor-pointer border-4 border-black rounded-2xl" onClick={validateMail}>Validate</button>
                            <button className="bg-gray-400 p-1 w-auto text-lg font-semibold mt-3 cursor-pointer border-4 border-black rounded-2xl" onClick={mailFunc}>Verify</button>
                        </div>
                        
                </div>
                {errors.Email && <h1 className="text-red-500" >{errors.Email.message}</h1>}
                {valid ? <h1 className="text-red-500" >This email already exist</h1> : <h1 className="text-green-500" >You can use this email</h1>}
            </div>
            
            <label className="font-semibold text-lg p-2" id="Username">Username</label>
            <input placeholder="Username" className="p-2 border-4 rounded-lg" {...register("Username" ,{required:"This feild is required",})}></input>
            {errors.Username && <h1 className="text-red-500">This feild is required</h1>}
            <label className="font-semibold text-lg p-2" id="Password">Password</label>
            <input type="password" className="p-2 border-4 rounded-lg" placeholder="Password" {...register("Password" ,{required:"This feild is required" , minLength:6})}></input>
            {errors.Password && <h1 className="text-red-500">This feild is required</h1>}
            <input className="bg-gray-400 p-1 w-auto text-lg font-semibold mt-3 cursor-pointer border-2 border-black rounded-2xl" type="submit"></input>
        </form>

        <h1 className="text-black">value {valid}</h1>
        </>
    )
}