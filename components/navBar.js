import Link from "next/link";

export default function Navbar(){
    return<>
        <div className="flex justify-between items-center">
            <div>
                <h1 className="font-bold text-2xl ">AaOo</h1>
            </div>
            <div>
                <Link href={"/login"}>
                    <button className="bg-gray-400 p-1 w-auto text-lg font-semibold mt-3 cursor-pointer border-2 border-black rounded-lg">SingIn</button>
                </Link>
                
            </div>
        </div>
    </>
} 