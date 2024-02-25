import { useContext, useEffect, useState } from "react";
import { pool } from "../_app";
import { useRouter } from "next/router";
import Navbar from "@/components/navBar";

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
        <div className="text-black bg-white h-screen w-screen p-2">
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
                        <div className="h-1/2 w-1/2">
                            <img src={`${currentImage}`} alt="" style={{height:"500px", width:"500px"}} className="rounded-lg"/>
                        </div>
                    </div>
                    <div className="flex flex-col border-2 rounded-lg border-black">
                    <h1 className="font-bold font-3xl">{product[0].Mname}</h1>
                    <h1>Rear camera {product[0].RearC} | Front camera{product[0].FrontC}</h1>
                    <h1>Ram {product[0].Ram}</h1>
                    <h1>Rom {product[0].Rom}</h1>
                    <h1>Processor {product[0].Processor}</h1>

                </div>
            </div>
            <h1>{product && product[0].Mname}</h1>
            <h1>working</h1>
            </div>
            
        </div>
    )

}