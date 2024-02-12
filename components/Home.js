import { pool } from "@/pages/_app";
import { useContext } from "react";

export default function Home(){
    const {mobileDets} = useContext(pool);

    return(
        <div>
            <div className="bg-gray-400 rounded-lg p-2 m-2 ">
                <title>Title</title>
            </div>
        </div>
    )
}