import { useContext, useEffect, useState } from "react";
import { pool } from "../_app";
import { useRouter } from "next/router";
import Navbar from "@/components/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";

export default function Product(){
    const {mobileDets} = useContext(pool);
    
    const router = useRouter();
    const query = router.query.productId;
    const product = mobileDets?.filter((mobile)=>{
        return mobile._id == query
    })
    const [currentImage,setCurrentImage]=useState(product && product[0]?.ImagesUrl[0]);
    const images = product[0].ImagesUrl;
    console.log("Images",images);
    useEffect(()=>{
        setCurrentImage(currentImage);
    },[currentImage]);
    

    console.log("product detail",product);

    return(
        <div className="text-black bg-white h-screen w-screen overflow-y-scroll p-2">
            <Navbar></Navbar>
            <div>
                <div className="flex ">
                    <div className="flex">
                        <div className="flex flex-col m-2">
                            <ul>
                                {images.map((img)=>{
                                    return <li><img src={`${img}`} onClick={()=>setCurrentImage(img)} className="h-20 w-20 border-2 border-black rounded-lg" /></li>
                                })}
                            </ul>
                        </div>
                        <div className="h-auto w-auto m-1 shadow-lg shadow-gray-900">
                            <img src={`${currentImage}`} alt="" style={{height:"600px", width:"500px"}} className="rounded-lg"/>
                        </div>
                    </div>
                    <div className="flex flex-col text-2xl shadow-lg shadow-gray-900 rounded-lg p-2 w-3/5 m-1 p-4"> 
                        <div className="flex justify-between">
                            <h1 className="font-normal text-2xl ml-3 underline decoration-double decoration-gray-900 decoration-2" >{product[0].Mname}{`(${product[0].Color})`}</h1>
                            <div className={`border-2 border-none ${product[0].Booked ? "bg-red-500":"bg-green-500"} rounded-lg p-2`}><button>{ product[0].Booked ? "Booked" : "Click to Book"}</button></div>
                        </div>
                    
                    <h1 className="font-bold text-4xl antialiased italic m-5"><FontAwesomeIcon icon={faIndianRupee} />{product[0]?.Price}</h1>
                    <h1>- Rear camera {product[0].RearC} | Front camera {product[0].FrontC}</h1>
                    <h1>- Ram {product[0].Ram}</h1>
                    <h1>- Rom {product[0].Rom}</h1>
                    <h1>- Processor {product[0].Processor}</h1>
                    <h1>- Battery {product[0].Battery}</h1>
                    <h1>- Company {product[0].Cname}</h1>
                    <h1>- Used For {product[0].UsedFor}</h1>
                    <h1 className="font-medium">- About :- {product[0].Description}</h1>
                    <h1 className=" right-0 bottom-0">@{product[0]?.ShopName}</h1>

                </div>
            </div>
            </div>
        </div>
    )

}