import { pool } from "@/pages/_app";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
export default function Login(){
    const router = useRouter();
    const {LoggedIn , setLoggedIn} = useContext(pool);
    const {register , handleSubmit ,formState: {errors}} = useForm();
    const submit = async (data)=>{ 
        console.log(data);
        const {Email,Password} = data;
        console.log(Email,Password);
        const response = await axios.post("/api/login",{Email,Password});
        const Resdata = response.data;
        console.log("message",Resdata.Message , Resdata.LoggedIn);
        setLoggedIn(Resdata.LoggedIn);
    }
    console.log(LoggedIn);
    
    return(
        <>
        <form className="text-black flex flex-col mt-10 p-5" onSubmit={handleSubmit(submit)}>
            <label className="font-semibold text-lg p-2" id="Email">Email</label>
            <input placeholder="Email" className="p-2 border-4 rounded-lg" {...register("Email" ,{required:"This feild is required"})}></input>
            {errors.Email && <h1>This feild is required</h1>}
            <label className="font-semibold text-lg p-2" id="Password">Password</label>
            <input type="password" className="p-2 border-4 rounded-lg" placeholder="Password" {...register("Password" ,{required:"This feild is required" , minLength:6})}></input>
            {errors.Password && <h1>This feild is required</h1>}
            <input className="bg-gray-400 p-1 text-lg font-semibold mt-3 cursor-pointer border-2 border-black rounded-2xl" type="submit"></input>
        </form>
        </>
    )
}