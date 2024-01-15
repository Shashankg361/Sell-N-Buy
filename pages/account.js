import { useContext, useState } from "react"
import Profile from "../components/profile";
import Dashboard from "@/components/dashboard";
import Logout from "@/components/logout";
import { pool } from "./_app";
import Shopkeeper from "@/components/shopkeeper";

export default function Account(){
    const [route , setRoute] = useState('Profile');
    const {userData} = useContext(pool);

    let shopkeeperBtn = (userData.Shopkeeper) ? '':'bg-gray-300 rounded-lg border-1 p-1 text-black';

    const show = ()=>{
        switch(route){
            case 'Profile':
                return <Profile />
            case 'Dashboard':
                return <Dashboard />
            case 'Shop':
                return <Shopkeeper />
        }
    }

    return(
        <div className="flex">
            <div className="h-screen bg-gray-800 w-64 text-white flex flex-col items-center p-2">
                <h1 className="font-bold text-2xl">Account</h1>
                <ul className="mt-5">
                    <li><div onClick={()=>setRoute('Profile')} className="cursor-pointer font-semibold text-xl">Profile</div></li>
                    <li><div onClick={()=>setRoute('Dashboard')} className="cursor-pointer font-semibold text-xl"> Dashboard</div></li>
                    <li><div onClick={()=>setRoute('Shop')} className={`cursor-pointer font-semibold text-xl ${shopkeeperBtn}`}>Shopkeeper</div></li>
                </ul>
            </div>
            <div className="h-screen bg-gray-100 flex-auto p-1 bg- text-black overflow-y-hidden">
                
                <h1 className="font-semibold text-2xl">{route}</h1>
                {show()}
            </div>
        </div>
    )
}