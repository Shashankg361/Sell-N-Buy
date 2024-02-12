import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { pool } from "@/pages/_app";

export default function Dashboard(){
    const {uploaded,booked} = useContext(pool);

    // uploaded && console.log("Uploaded",uploaded);

    useEffect(()=>{
        console.log("changed",uploaded);
        //console.log("Booked",booked);
    },[uploaded])

    return(
        <div className="h-full overflow-y-hidden">
            <div className="flex mt-2 p-1">
                <div className="bg-white w-2/4 border-1 rounded-md p-2">
                    <h1 className="font-semibold text-2xl">Booked</h1>
                    <h1 className="mt-5 font-bold text-4xl">{booked}</h1>
                </div>
                <div className="ml-5 bg-white w-2/4 border-1 rounded-md p-2">
                    <h1 className="font-semibold text-2xl">Uploaded</h1>
                    <h1 className="mt-5 font-bold text-4xl">{uploaded}</h1>
                </div>
            </div>
            <div className="flex flex-col h-3/4"> 
                <div className="flex bg-white p-2 m-1 rounded-md items-center">
                    <h1 className="font-semibold text-xl">Mobile</h1>
                    <div className=" flex items-center bg-gray-200 p-3 ml-16 rounded-r-3xl rounded-l-3xl">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl p-1"/>
                        <input placeholder="Search by title..." className="outline-0 placeholder:italic placeholder:text-gray-600 bg-gray-200 text-black w-80 p-1"></input>
                        <button type="button"className="ml-1">Search</button>
                    </div>
                </div>
                <div className="m-2 bg-white w-auto h-full">
                    <h1>baksjbdjk</h1>
                </div>
            </div>
        </div>
    )
}