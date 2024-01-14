import { useContext } from "react";
import { pool } from "../pages/_app";

export default function Profile(){
    const {userData} = useContext(pool);

    return(
        <>
            <div className="flex flex-col items-center">
                <h1 className="font-normal text-2xl">Wellcome!!</h1>
                <h1 className="font-semibold text-2xl">{(userData.Name).toUpperCase()}</h1>
                <h1 className="font-normal text-2xl">{userData.Email}</h1>
            </div>
        </>
    )



}