import { useState } from "react"
import Profile from "../components/profile";
import Dashboard from "@/components/dashboard";
import Logout from "@/components/logout";

export default function Account(){
    const [route , setRoute] = useState('');

    const show = ()=>{
        switch(route){
            case 'Profile':
                return <Profile />
            case 'Dashboard':
                return <Dashboard />
            case 'Logout':
                return <Logout />
        }

    }

    return(
        <div className="flex">
            <div className="h-screen bg-gray-600 w-64 text-white flex flex-col items-center p-2">
                <h1 className="font-bold text-2xl">Account</h1>
                <ul className="mt-5">
                    <li><div onClick={()=>setRoute('Profile')} className="cursor-pointer font-semibold text-xl">Profile</div></li>
                    <li><div onClick={()=>setRoute('Dashboard')} className="cursor-pointer font-semibold text-xl"> Dashboard</div></li>
                    <li><div onClick={()=>setRoute('Logout')} className="cursor-pointer font-semibold text-xl">Logout!</div></li>
                </ul>
            </div>
            <div className="h-screen flex-auto flex flex-col items-center pt-36 bg-white text-black">
                
                <h1 className="font-bold text-2xl">{route}</h1>
                {show()}
            </div>
        </div>
    )
}