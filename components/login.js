import { pool } from "@/pages/_app";
import axios from "axios";
import { useContext, useState ,useRef} from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

export default function Login(){
    const router = useRouter();
    const {LoggedIn , setLoggedIn , userData , setUserData, setUploaded, setBooked} = useContext(pool);
    const {register , handleSubmit ,formState: {errors},reset} = useForm();
    const [isLoading,setIsLoading] = useState(false);

    const submit = async (data)=>{ 
        try{
            setIsLoading(true);
            const {Email,Password} = data;
            const response = await axios.post("/api/login",{Email,Password});
            const Resdata = response.data;
            if(Resdata.LoggedIn){
                console.log("Recived",Resdata.Data)
                setUserData(Resdata.Data);
                setUploaded(Resdata.Data.Uploaded);
                setBooked(Resdata.Data.Booked);
                localStorage.setItem("token",Resdata.Token);
                alert(Resdata.Message);
                router.back();
            }else{
                alert(Resdata.Message);
            }
            //Resdata.LoggedIn && router.push('/');
            //console.log("message",Resdata.Message , Resdata.LoggedIn);
            setLoggedIn(Resdata.LoggedIn);
            reset();
        }catch(error){
            console.error(error);
        }finally{
            setIsLoading(false);
        }
    }

    //isLoading ? disable() : enable();
    LoggedIn && console.log("Login",LoggedIn);
    
    return(
        <>

        <form className="text-black flex flex-col mt-10 p-5" onSubmit={handleSubmit(submit)}>
            <label className="font-semibold text-lg p-2" id="Email">Email</label>
            <input placeholder="Email" className="p-2 border-4 rounded-lg" {...register("Email" ,{required:"This feild is required",
                pattern:{
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message:"Please enter valid email",
                }
            })}></input>
            {errors.Email && <h1 className="text-red-500">This feild is required</h1>}
            <label className="font-semibold text-lg p-2" id="Password">Password</label>
            <input type="password" className="p-2 border-4 rounded-lg" placeholder="Password" {...register("Password" ,{required:"This feild is required" , minLength:6})}></input>
            {errors.Password && <h1 className="text-red-500">This feild is required</h1>}
            { isLoading && <div className="text-red-500">Please Wait...</div>}
            <input disabled={isLoading} className={`bg-gray-500 text-zinc-900 p-1 text-lg font-semibold mt-3 cursor-pointer hover:opacity-70 border-2 border-black rounded-2xl ${isLoading && "opacity-30"}`} type="submit"></input>
        </form>

        
        </>
    )
}