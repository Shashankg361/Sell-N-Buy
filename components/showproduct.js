import { pool } from "@/pages/_app";
import { faIndianRupee, faRupee, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useSWR from "swr";
import { Showproduct } from "./dashboard";

export const fetcher = async ()=>{
    const response = await axios('/api/getMobileDets');
    const data = response.data;
    //console.log("Update",data);
    return data;
}

export default function ShowProduct(){
    const {mobileDets,setMobileDets} = useContext(pool);
    var {data,error} = useSWR('MobileDets',fetcher);
    const [show,setShow]=useState();
    //data = JSON.stringify(data);
    
    useEffect(()=>{
        //console.log("Dataaaaaaaa",data);
        setMobileDets(data);
    },[data]);

    useEffect(()=>{
        setShow(mobileDets);
    },[mobileDets])

    // const socketFunc = async()=>{
    //     await axios('api/addingNewProduct');
    //     const socket = io();
    //     socket.on('connect',()=>{
    //         console.log('connected');
    //     });

    //     socket.on('updated-document',(message)=>{
    //         const newData = JSON.parse(message);
    //         console.log("Datatatatatat",newData , newData.fullDocument);
    //         mobileDets && setMobileDets([...mobileDets,newData.fullDocument]);
    //     })
    // }

    // useEffect(()=>{
    //     socketFunc();
    // },[])

    function search(e){
        setShow(mobileDets.filter((element)=>{
            const name = element.Mname.trim().toLowerCase();
            //console.log("workingggg");
            return name.includes(e.target.value.trim().toLowerCase());
        }))
    };

    // useEffect(()=>{
    //     console.log("Show",show);
    // },[show])

    return(
        <div className="m-5">

            <div className=" p-5 pt-0 flex justify-center items-center ">
                <div className="shadow-lg shadow-gray-400 p-5 border-0 rounded-3xl">
                    <input type="text" onChange={search} className="w-96 rounded-lg mr-2 border-0 p-2" placeholder="Search by tile"></input>
                    <FontAwesomeIcon icon={faSearch} className="text-xl p-1"/>
                </div>
                
            </div>

            {show && <Showproduct show={show}/> }
            
        </div>
    )
}


// {mobileDets && mobileDets.map((mobile,index)=>{
//     return (
//         <Link href={`/products/${mobile._id}`}>
//             <div key={index} className="flex flex-col items-center">
//                 <div className="bg-gray-200 rounded-lg p-2 m-2 text-black flex justify-between w-4/5">
//                     <div className="flex ">
//                         <img src={mobile.ImagesUrl[0]} style={{maxWidth:"12%"}} className="m-2 rounded-lg"/>
//                         <div>
//                             <h1 className="m-2 font-semibold text-xl">{mobile.Mname}{`(${mobile.Color})`}</h1>
//                             <h1 className="m-1 ml-2 text-base">- Rear camera {mobile.RearC + " | "+mobile.FrontC} front camera</h1>
//                             <h1 className="m-1 ml-2 text-base">- Ram {mobile.Ram + " | " + mobile.Rom} Rom</h1>
//                             <h1 className="m-1 ml-2 text-base">- Processor {mobile.Processor}</h1>
//                             <h1 className="m-1 ml-2 text-base">- Used for {mobile.UsedFor}</h1>
//                         </div>
//                     </div>    
//                     <div className="m-2 font-bold text-2xl mr-20"><h1><FontAwesomeIcon icon={faIndianRupee} />{mobile.Price}</h1>
//                         {mobile.UnderWarranty == 'true'&& <h1>Under warrant</h1>} 
//                         <h1>{mobile.Booked ? "Booked":"Available"}</h1>
//                         {mobileDets && <h1 className="font-normal text-base">{mobile.owner}</h1>}
//                     </div>    
//                 </div>
//             </div>
//         </Link>
//     )
// })}