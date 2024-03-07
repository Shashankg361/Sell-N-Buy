import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { pool } from "@/pages/_app";
import Link from "next/link";
import { faIndianRupee, faRupee } from "@fortawesome/free-solid-svg-icons";
import { fetcher } from "./showproduct";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dashboard(){
    const {uploaded,booked,userData,mobileDets,setBooked,setMobileDets} = useContext(pool);
    //console.log("fuck you",mobileDets);
    const [show,setShow] = useState('');
    const [filterArr,setFilterArr] = useState('');
    //on refresh mobileDets gets empty so, when page is refresh I will get the data
    !mobileDets && fetcher().then(data=>setMobileDets(data));
    //!mobileDets && 
    //console.log("data",fetcher());

    //filteration on the basis of email
    useEffect(()=>{
        if(mobileDets){ 
            setShow(mobileDets?.filter((element)=>{
            //
            return (element.owner === userData.Email || element.BookedBy === userData.Email);
            }))
        }
    },[mobileDets]);

    //counting booked
    useEffect(()=>{
        const count = mobileDets?.filter((element)=>{
            return (element.BookedBy === userData.Email);
        });
        setBooked(count?.length===0?0:count?.length);
        console.log("count",count?.length);
    },[mobileDets]);

    //when ever show chnages this will run
    useEffect(()=>{
        //console.log("set working");
        show && setFilterArr(show);
    },[show]);

    //on change search function
    function search(e){
        //console.log("change",e.target.value);
        if(show){
                setFilterArr(show.filter((element)=>{
                const name = element.Mname.trim().toLowerCase();
                //console.log("workingggg");
                return name.includes(e.target.value.trim().toLowerCase());
            }))

        }
    }

    // useEffect(()=>{
    //     filterArr && console.log("AHow",filterArr);
    // },[filterArr])
    

    // uploaded && console.log("Uploaded",uploaded);

    // useEffect(()=>{
    //     console.log("changed",uploaded);
    //     //console.log("Booked",booked);
    // },[uploaded])

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
                        <input onChange={search} placeholder="Search by title..." className="outline-0 placeholder:italic placeholder:text-gray-600 bg-gray-200 text-black w-80 p-1"></input>
                        <button type="button"className="ml-1">Search</button>
                    </div>
                </div>
                <div className="m-2 bg-white w-auto h-full overflow-scroll">
                    {filterArr && <Showproduct show = {filterArr} />}
                </div>
            </div>
        </div>
    )
}

export function Showproduct({show}){

    //show && console.log("fuckYouagain",show);
    return(
        <div>
           {show.map((mobile,index)=>{
                return (
                    <Link href={`/products/${mobile._id}`}>
                        <div key={index} className="flex flex-col items-center m-5">
                            <div className="bg-gray-200 rounded-lg p-2 m-2 text-black flex justify-between w-4/5">
                                <div className="flex ">
                                    <img src={mobile.ImagesUrl[0]} style={{maxWidth:"12%"}} className="m-2 rounded-lg"/>
                                    <div>
                                        <h1 className="m-2 font-semibold text-xl">{mobile.Mname}{`(${mobile.Color})`}</h1>
                                        <h1 className="m-1 ml-2 text-base">- Rear camera {mobile.RearC + " | "+mobile.FrontC} front camera</h1>
                                        <h1 className="m-1 ml-2 text-base">- Ram {mobile.Ram + " | " + mobile.Rom} Rom</h1>
                                        <h1 className="m-1 ml-2 text-base">- Processor {mobile.Processor}</h1>
                                        <h1 className="m-1 ml-2 text-base">- Used for {mobile.UsedFor}</h1>
                                    </div>
                                </div>    
                                <div className="m-2 font-bold text-2xl mr-20"><h1><FontAwesomeIcon icon={faIndianRupee} />{mobile.Price}</h1>
                                    {mobile.UnderWarranty == 'true'&& <h1>Under warrant</h1>} 
                                    <h1>{mobile.Booked ? "Booked":"Available"}</h1>
                                    {show && <h1 className="font-normal text-base">{mobile.owner}</h1>}
                                </div>    
                            </div>
                        </div>
                    </Link>
                )
            })} 
        </div>
        
    )
}