import { pool } from "@/pages/_app";
import { faIndianRupee, faRupee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect } from "react";
import { io } from "socket.io-client";

export default function ShowProduct(){
    const {mobileDets,setMobileDets} = useContext(pool);

    const socketFunc = async()=>{
        await axios('api/addingNewProduct');
        const socket = io();
        socket.on('connect',()=>{
            console.log('connected');
        });

        socket.on('updated-document',(message)=>{
            const newData = JSON.parse(message);
            console.log("Datatatatatat",newData , newData.fullDocument);
            mobileDets && setMobileDets([...mobileDets,newData.fullDocument]);
        })
    }

    useEffect(()=>{
        socketFunc();
    },[])

    return(
        <div>
            {mobileDets && mobileDets.map((mobile)=>{
                return (
                    <div className="flex flex-col items-center m-5">
                        <div className="bg-gray-200 rounded-lg p-2 m-2 text-black flex justify-between w-4/5">
                            <div className="flex ">
                                <img src={mobile.ImagesUrl[0]} style={{maxWidth:"12%"}} className="m-2 rounded-lg"/>
                                <div>
                                    <h1 className="m-2 font-semibold text-xl">{mobile.Mname}</h1>
                                    <h1 className="m-1 ml-2 text-base">- Rear camera {mobile.RearC + " | "+mobile.FrontC} front camera</h1>
                                    <h1 className="m-1 ml-2 text-base">- Ram {mobile.Ram + " | " + mobile.Rom} Rom</h1>
                                    <h1 className="m-1 ml-2 text-base">- Processor {mobile.Processor}</h1>
                                    <h1 className="m-1 ml-2 text-base">- Used for {mobile.UsedFor}</h1>
                                </div>
                            </div>    
                            <div className="m-2 font-bold text-2xl mr-20"><h1><FontAwesomeIcon icon={faIndianRupee} />  8,000</h1>
                                <h1>Under warrant</h1> 
                                <h1>Booked </h1>
                                {mobileDets && <h1 className="font-normal text-base">{mobile.owner}</h1>}
                            </div>    
                        </div>
                    </div>
                )
            })}
            
        </div>
    )
}