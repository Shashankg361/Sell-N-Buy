import { pool } from "@/pages/_app";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar(){
    const {LoggedIn} = useContext(pool);
    //console.log("Home page",LoggedIn);
    return<>
        <div className="flex justify-between items-center">
            <div>
                <Link href={"/"}>
                    <h1 className="font-bold text-2xl ">AaOo</h1>
                </Link>
                
            </div>
            <div>
                {
                    LoggedIn?
                        <Link href={"/account"}><div className="w-16 h-16 bg-black rounded-b-full rounded-t-full"></div></Link>
                        :<Link href={"/login"}>
                    <button className="bg-gray-400 p-1 w-auto text-lg font-semibold mt-3 cursor-pointer border-2 border-black rounded-lg">SingIn</button>
                </Link>
                }
                
                
            </div>
        </div>
    </>
} 