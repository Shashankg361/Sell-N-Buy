import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { pool } from "@/pages/_app";

export default function Dashboard(){
    const {userData} = useContext(pool);
    const [uploaded,setUploaded] = useState(userData.Uploaded);
    const [booked,setBooked] = useState(userData.Booked);

    //websocket for getting the
    useEffect(()=>{
        const io = new WebSocket('ws://localhost:8080');
        io.onopen = ()=>{
            console.log('Websocket connected');
        }
 
        io.onmessage = (message)=>{
            const newAdded = JSON.parse(message.data);
            console.log(newAdded);
            const uploadInfo = newAdded.updateDescription.updatedFields; 
            if(newAdded.operationType === "update"){
                if(uploadInfo.Uploaded != undefined){
                    console.log("Working",uploadInfo.Uploaded,uploadInfo.Booked)
                    setUploaded(uploadInfo.Uploaded);
                }else{
                    setBooked(uploadInfo.Booked);
                }
            }
        }

        io.onclose = ()=>{
            console.log('disconnected to websocket');
        }
    },[]);

    useEffect(()=>{
        console.log("Uploaded",uploaded);
        console.log("Booked",booked);
    },[uploaded,booked])
    

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