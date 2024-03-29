import { useContext, useEffect, useState } from "react";
import { pool } from "../_app";
import { useRouter } from "next/router";
import Navbar from "@/components/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useSWR from "swr";
import { checkToken } from "..";

async function fetcher(query){
    const response = await axios(`/api/bookingUpdate?query=${query}`);
    const data = response.data;
    return data;
}

export default function Product(){
    const {userData,LoggedIn,setLoggedIn,setUserData,setUploaded,setBooked} = useContext(pool);
    const [currentImage,setCurrentImage]=useState(null);
    const [Booked,setBookedd] = useState(null);
    const router = useRouter();
    const query = router.query.productId;
    const[product,setProduct] = useState(null);

    const {data,error} = useSWR("Booking",()=>fetcher(query));

    useEffect(()=>{
        checkToken({setLoggedIn,setUserData,setBooked,setUploaded,userData,router});
    },[]);

    useEffect(()=>{
        //console.log("changed");
        setProduct(data)
    },[data])

    useEffect(()=>{
        setCurrentImage( product && product?.ImagesUrl[0]);
        setBookedd(product && product?.Booked);
    },[product])
    
    
    const images = product &&  product?.ImagesUrl;
    console.log("Images",images);
    useEffect(()=>{
        setCurrentImage(currentImage);
    },[currentImage]);

    //function for booking the product
    const Booking = async ()=>{
        if(LoggedIn){
            const userName = userData.Name;
            const userEmail = userData.Email;
            const productId = product && product &&  product?._id;
            const productName = product &&  product?.Mname;
            const shopName = product &&  product?.ShopName;

            const data = {userName,userEmail,productId,productName,shopName};
            console.log("datatata",data);
            const response = await axios.post('/api/Booking',data);
            const {message,Booked} = response.data;
            console.log("Response",message)
            setBookedd(Booked)
            alert(message);
        }else{
            alert("Please LogIn!")
        }
        

    }
    

    //console.log("product detail",product);

    return(
        <div className="text-black bg-white h-screen w-screen overflow-y-scroll overflow-x-hidden p-2">
            <Navbar></Navbar>
            <div className="p-2 border-2 rounded-lg font-semibold w-fit cursor-pointer text-gray-800 border-gray-700 mb-2" onClick={()=>router.back()}><FontAwesomeIcon icon={faArrowLeft} /> Back</div>
            <div>
                <div className="flex flex-col items-center md:flex-row m-2">
                    <div className="flex flex-col-reverse md:flex-row h-svh">
                        <div className="flex flex-row md:flex-col m-2">
                            <ul className="flex flex-row m-5 md:flex-col">
                                {product && images.map((img,index)=>{
                                    return <li key={index}><img src={`${img}`}  onClick={()=>setCurrentImage(img)} className="h-20 w-20 m-1 border-2 border-black rounded-lg" /></li>
                                })}
                            </ul>
                        </div>
                        <div  className="md:h-[600px] md:w-[500px] h-[400px] w-screen flex  justify-center md:m-1 overflow-hidden shadow-lg shadow-gray-900">
                            <img src={`${currentImage}`} alt=""  className="rounded-lg m-2"/>
                        </div>
                    </div>
                    <div className="flex flex-col text-2xl shadow-lg shadow-gray-900 rounded-lg p-2 w-full md:w-3/5 m-5 mb-14 md:m-5 p-5"> 
                        <div className=" md:flex justify-between">
                            <h1 className="font-normal text-2xl ml-3 underline decoration-double decoration-gray-900 decoration-2" >{product &&  product?.Mname}{`(${product &&  product?.Color})`}</h1>
                            <div className={`absolute bottom-0 left-0 w-screen md:w-40 flex justify-center md:relative border-2 ${Booked ? "hover:bg-red-300":"hover:bg-green-300"} border-none ${Booked ? "bg-red-500":"bg-green-500"} md:rounded-lg p-2`}>
                                <button  
                                    disabled={Booked}
                                    onClick={Booking}>{ Booked ? "Booked" : "Click to Book"}
                                </button>
                            </div>
                        </div>
                    
                    <h1 className="font-bold text-4xl antialiased italic m-5"><FontAwesomeIcon icon={faIndianRupee} />{product &&  product?.Price}</h1>
                    <h1>- Rear camera {product &&  product?.RearC} | Front camera {product &&  product?.FrontC}</h1>
                    <h1>- Ram {product &&  product?.Ram}</h1>
                    <h1>- Rom {product &&  product?.Rom}</h1>
                    <h1>- Processor {product &&  product?.Processor}</h1>
                    <h1>- Battery {product &&  product?.Battery}</h1>
                    <h1>- Company {product &&  product?.Cname}</h1>
                    <h1>- Used For {product &&  product?.UsedFor}</h1>
                    <h1 className="font-medium">- About :- {product &&  product?.Description}</h1>
                    <h1 className=" right-0 bottom-0">@{product &&  product?.ShopName}</h1>

                </div>
            </div>
            </div>
        </div>
    )

}