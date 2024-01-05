import axios from "axios";
//import { Mali } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import { get, useForm, useWatch } from "react-hook-form"

export default function Register({data}){
    let showError = true;
    const [showPaymentBtn , setShowPaymentBtn] = useState(false);
    const [valid , setValid] = useState(true);
    //const [isFocused , setIsFocused] = useState(false);
    const {register , formState:{errors} , handleSubmit ,watch , reset} = useForm();

    const submit = async (detail)=>{
       // console.log("isValid",valid);
        if(!valid){
            const {Email , Username , Password} = detail;
            const Verified = false;
            const now = new Date();
            const data = {Email , Username , Password ,now ,Verified};
            try{
                const verifyResponse = await axios.post("/api/verificationMail",{getMail});
                const verifyData = verifyResponse.data;
                alert(verifyData.Message);
            }catch(error){
                alert("Error occurecd while sending verification email");
            }
            try{
                const response = await axios.post("/api/registration",data);
                response.data && alert(response.data.Message);
                setValid(true);
            }catch(error){
                alert("Error occured while registration");
            }
        }else{
            alert("Validate your E-mail");
        }
        reset();
    }
    const getMail = watch('Email');

    const validateMail = ()=>{
        if(getMail !== ''){
            if(showError){
                alert("Please enter correct email");
            }else{
                console.log("enter");
                const newdata = JSON.parse(data);
                setValid(newdata.some((element)=>{
                    if(element.Email === getMail){
                        return true;  
                    }
                    return false;
                }));
            }
        }else{
            alert("Enter proper email");
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
            <div className="mt-4">
                <label className="font-semibold text-lg p-2" id="Email">Email</label>
                <div className="flex">
                    <input placeholder="Email"  className="p-2 border-4 rounded-lg mr-2" {...register("Email" ,
                        {required:"This feild is required",
                        pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:"Please enter valid email",
                        }
                        })}></input>
                        <div className="flex">
                            <button type="button" className="bg-gray-400 p-1 w-auto text-lg mr-1 font-semibold mt-3 cursor-pointer border-4 border-black rounded-2xl" onClick={validateMail}>Validate</button>
                            
                        </div>
                        
                </div>
                
                {errors.Email ? <h1 className="text-red-500" >{errors.Email.message}</h1> : showError = false}
                {getMail && (valid ? <h1 className="text-red-500" >This email already exist</h1> : <h1 className="text-green-500" >You can use this email</h1>)}
            </div>
            
            <label className="font-semibold text-lg p-2 flex mt-4" id="ShopKeeper"><div>
                    <span className="mr-6">Shopkeeper:</span>
                </div>
                <div className="flex justify-between w-32">
                    <div><input className="ml-1 mr-1" type="radio" value="Yes" {...register("ShopKeeper",{required:"please Select any one option"})} onChange={()=>setShowPaymentBtn(true)}></input>
                    <span className="font-normal">yes</span></div>
                    <div><input className="ml-1 mr-1" type="radio" value="No" {...register("ShopKeeper",{required:"please Select any one option"})} onChange={()=>setShowPaymentBtn(false)}></input>
                    <span className="font-normal">No</span></div>
                </div>
            </label>
            {errors.ShopKeeper && <h1 className="text-red-500">{errors.ShopKeeper.message}</h1>}

            {showPaymentBtn && <Link href="https://buy.stripe.com/test_00g00hdhV8Bkdmo8ww" ><button type="button" className="bg-gray-400 p-1 w-auto text-lg font-semibold mt-3 cursor-pointer border-2 border-black rounded-2xl mt-4"  >Pay 100 Rs for ShopKeeper account</button></Link>}

            <label className="font-semibold text-lg p-2 mt-4" id="Password">Password</label>
            <input type="password" className="p-2 border-4 rounded-lg" placeholder="Password" {...register("Password" ,{required:"This feild is required" , minLength:6})}></input>
            {errors.Password && <h1 className="text-red-500">This feild is required</h1>}
            <input className="bg-gray-400 p-1 w-auto text-lg font-semibold mt-3 cursor-pointer border-2 border-black rounded-2xl mt-4" type="submit"></input>
        </form>
        </>
    )
}
