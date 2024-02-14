import { useContext, useState } from "react"
import Profile from "../components/profile";
import Dashboard from "@/components/dashboard";
import Logout from "@/components/logout";
import { pool } from "./_app";
import Shopkeeper from "@/components/shopkeeper";
import { useRouter } from "next/router";

export default function Account(){
    const [route , setRoute] = useState('Profile');
    const {userData} = useContext(pool);
    const router = useRouter();

    let shopkeeperBtn = (userData.Shopkeeper) ? '':'bg-gray-300 rounded-lg border-1 p-1 text-black';

    const handleRoute = ()=>{
        router.push('/');
    }

    const show = ()=>{
        switch(route){
            case 'Profile':
                return <Profile />
            case 'Dashboard':
                return <Dashboard />
            case `ShopKeeper's place`:
                return <Shopkeeper />
            case 'Home':
                handleRoute();
        }
    }

    return(
        <div className="flex">
            <div className="h-screen bg-gray-800 w-64 text-white flex flex-col items-center p-2">
                <h1 className="font-bold text-2xl">Account</h1>
                <ul className="mt-5">
                    <li><div onClick={()=>setRoute('Home')} className="cursor-pointer font-semibold text-xl"> Home</div></li>
                    <li><div onClick={()=>setRoute('Profile')} className="cursor-pointer font-semibold text-xl">Profile</div></li>
                    <li><div onClick={()=>setRoute('Dashboard')} className="cursor-pointer font-semibold text-xl"> Dashboard</div></li>
                    <li><div onClick={()=>setRoute(`ShopKeeper's place`)} className={`cursor-pointer font-semibold text-xl ${shopkeeperBtn}`}>Shopkeeper</div></li>
                </ul>
            </div>
            <div className="h-screen bg-gray-100 flex-auto p-1 bg- text-black overflow-y-hidden">
                
                <h1 className="font-semibold text-2xl">{route}</h1>
                {show()}
            </div>
        </div>
    )
}