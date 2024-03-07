import { pool } from "@/pages/_app"
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";

export default function Shopkeeper(){
    const {userData} = useContext(pool);

    const show = ()=>{
        if(userData.Shopkeeper){
            return <RemoveLock />
        }else{
            return <ShowLock lockBtnRef/>
        }
    }

    return(
        <div>
            {show()}
        </div>
    )
};


function ShowLock(){
    const [change , setChange] = useState(false);
    const lockBtnRef = useRef(null);
    useEffect(()=>{

        const blink = setInterval(()=>{
                    setChange(!change);
                    },1000
        );

        return ()=>clearInterval(blink);            
    },[change]);
    
    return(
        <div className="text-center mt-10">
            <FontAwesomeIcon icon={faLock} className="text-5xl text-stone-800"/> 
            <h1 className="text-xl">To Unlock you have to buy Subscription</h1>
            <div ref={lockBtnRef} ><button type="button" className={`text-xl w-80 border-2 border-black p-1 rounded-xl ${change && "bg-gray-800 text-white"}`} >Click Here</button></div>
        </div>
    )
}

//Component

function RemoveLock(){
    const [files,setFiles] = useState(null);
    const [previewUrls,setPreviewUrls] = useState([]);
    const [URLs, setURLs] = useState([]);
    const [toggle , setToggle] = useState(false);
    const {register,formState:{errors},handleSubmit,watch,reset,formState} = useForm();
    const {userData,setUploaded,setBooked} = useContext(pool);
    const [isLoading,setIsLoading] = useState(false);
    const [warranty,setWarranty] = useState(null);
    
    useEffect(()=>{
        setWarranty(watch("UnderWarranty"));
        //console.log("warranty",watch("UnderWarranty"));
    },[watch("UnderWarranty")])
    
    const socKet = async()=>{
        await axios('api/newUser');
        const socket = io();

        socket.on('connect',()=>{
            console.log('connected');
        });

        socket.on('update-document',(message)=>{
            const newDoc = JSON.parse(message);
            if(newDoc.operationType === "update"){
                const uploadInfo = newDoc.updateDescription.updatedFields; 
                if(uploadInfo.Uploaded != undefined){
                    setUploaded(uploadInfo.Uploaded);
                }
            }
        })
    }

    //websocket for updating uploaded and booked variable
    useEffect(()=>{
        socKet();
    },[]);

    //Handling file upload
    const formFiles = watch('files')
    useEffect(()=>{
        if(formFiles){
            const selectedFiles = Array.from(formFiles);
            setFiles(selectedFiles);
        }
    },[formFiles])
    
    useEffect(()=>{
        if(files){
            const promises = files.map((file) => {
                return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(file);
                });
            });
            
            Promise.all(promises).then((urls) => setPreviewUrls(urls));
        }
    },[files]);

    //API call for storing Image file and details
    const submit = async(details)=>{
        const formData = new FormData();

        files && files.forEach((file , index) => {
            formData.append(`file${index+1}`,file);
        });

        formData.append("details",JSON.stringify(details));
        formData.append("owner",JSON.stringify(userData.Email));

        if(!files){
            alert("please enter file");
        }else{
            //console.log(files);
            try{
                setIsLoading(true);
                const response = await axios.post('/api/uploadtocloud',formData,{
                    headers:{
                        "Content-Type":"multipart/form-data",
                    }
                });
                const data = response.data;
                alert(data.message);
                setURLs(data.URL.ImagesUrl);
                console.log(data.URL.ImagesUrl);
                reset();
            }catch(error){
                console.error(error);
            }finally{
                setIsLoading(false);
                setToggle(!toggle);
            }
            
        }

    }

    const closingBtn = ()=>{
        if(isLoading){
            alert("Please wait till Data get stored");
        }else{
            setToggle(!toggle)
        }
        
    }

    //URLs && console.log('URLLL',URLs);

    return<div>
        
        <div className={`z-10 bg-black/70 fixed flex justify-center items-center left-0 top-0 h-screen w-screen ${toggle ? "block":"hidden"}`}>
            {
                !isLoading?(
            <div className=" popUp text-black bg-gray-200 h-3/4 w-96 p-5 items-center overflow-y-auto">
            <div className="text-white m-5 text-lg cursor-pointer right-0 top-0 fixed" onClick={closingBtn}>X</div>
                
                        <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
                        <label className="font-semibold text-lg p-2">Mobile name</label>
                        <input type="text"className="p-2 border-4 rounded-lg" placeholder="Enter mobile name" {...register('Mname',{required:'This feild is required'})}/>
                        {errors.Mname && <h1 className="text-red-500">{errors.Mname.message}</h1>}

                        <label className="font-semibold text-lg p-2">Company name</label>
                        <input type="text" className="p-2 border-4 rounded-lg" placeholder="Enter company name" {...register('Cname',{required:'This feild is required'})}/>
                        {errors.Cname && <h1 className="text-red-500">{errors.Cname.message}</h1>}

                        <label className="font-semibold text-lg p-2">Mobile color</label>
                        <input type="text" className="p-2 border-4 rounded-lg" placeholder="eg: Stargaze Blue" {...register('Color',{required:'This feild is required'})}/>
                        {errors.Color && <h1 className="text-red-500">{errors.Color.message}</h1>}

                        <label className="font-semibold text-lg p-2">Rear camera</label>
                        <input type="text" className="p-2 border-4 rounded-lg" placeholder="eg: 48+12+8" {...register('RearC',{required:'This feild is required'})}/>
                        {errors.RearC && <h1 className="text-red-500">{errors.RearC.message}</h1>}

                        <label className="font-semibold text-lg p-2">Front camera</label>
                        <input type="text" className="p-2 border-4 rounded-lg" placeholder="eg: 8" {...register('FrontC',{required:'This feild is required'})}/>
                        {errors.FrontC && <h1 className="text-red-500">{errors.FrontC.message}</h1>}

                        <label className="font-semibold text-lg p-2">Ram</label>
                        <input type="text" className="p-2 border-4 rounded-lg" placeholder="eg: 8" {...register('Ram',{required:'This feild is required'})}/>
                        {errors.Ram && <h1 className="text-red-500">{errors.Ram.message}</h1>}

                        <label className="font-semibold text-lg p-2">Storage/Rom</label>
                        <input type="text" className="p-2 border-4 rounded-lg" placeholder="eg: 8" {...register('Rom',{required:'This feild is required'})}/>
                        {errors.Rom && <h1 className="text-red-500">{errors.Rom.message}</h1>}

                        <label className="font-semibold text-lg p-2">Processor</label>
                        <input type="text" className="p-2 border-4 rounded-lg" placeholder="eg: Snapdrgon 860/dimensity 1200" {...register('Processor',{required:'This feild is required'})}/>
                        {errors.Processor && <h1 className="text-red-500">{errors.Processor.message}</h1>}

                        <label className="font-semibold text-lg p-2">Battery</label>
                        <input type="text" className="p-2 border-4 rounded-lg" placeholder="eg: 5000mh" {...register('Battery',{required:'This feild is required'})}/>
                        {errors.Battery && <h1 className="text-red-500">{errors.Battery.message}</h1>}

                        <label className="font-semibold text-lg p-2">Used for</label>
                        <input type="text" className="p-2 border-4 rounded-lg" placeholder="eg: 1 year 2 month" {...register('UsedFor',{required:'This feild is required'})}/>
                        {errors.UsedFor && <h1 className="text-red-500">{errors.UsedFor.message}</h1>}

                        <label className="font-semibold text-lg p-2">Shop name</label>
                        <input type="text" className="p-2 border-4 rounded-lg" placeholder="eg: om sai mobiles" {...register('ShopName',{required:'This feild is required'})}/>
                        {errors.ShopName && <h1 className="text-red-500">{errors.ShopName.message}</h1>}

                        <label className="font-semibold text-lg p-2">Under Warranty</label>
                        <select className="p-2 border-4 rounded-lg" {...register('UnderWarranty',{required:'This feild is required'})}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                        {warranty === "true" && <h1 className="text-black">{warranty?"If yes, Please mention the remaining days in Description":""}</h1>}
                        {errors.UnderWarranty && <h1 className="text-red-500">{errors.UnderWarranty.message}</h1>}

                        <label className="font-semibold text-lg p-2">Description</label>
                        <textarea type="text" className="p-2 border-4 rounded-lg" placeholder="eg: Describe the condition & features of mobile" {...register('Description',{required:'This feild is required'})}/>
                        {errors.Description && <h1 className="text-red-500">{errors.Description.message}</h1>}

                        <label className="font-semibold text-lg p-2">{"Price (in rupees)"}</label>
                        <input type="text" className="p-2 border-4 rounded-lg" placeholder="eg: 6500 " {...register('Price',{required:'This feild is required'})}/>
                        {errors.Price && <h1 className="text-red-500">{errors.Price.message}</h1>}

                        <label className="font-semibold text-lg p-2">Add pictures</label>
                        <input type="file" accept="image/*" className="p-2 border-4 rounded-lg" placeholder="Upload phone pictures" {...register('files',{required:'This feild is required'})} multiple/>
                        {errors.files && <h1 className="text-red-500">{errors.files.message}</h1>}

                        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                            {previewUrls && previewUrls.map((url,index)=>{
                                return <img src={url} key={index} alt="" style={{maxWidth : "100%"}}/>
                            })}
                        </div>
                        

                        <input type="submit" id="submit" className="bg-gray-800 p-2 rounded-lg text-white mt-2 cursor-pointer"></input>
                    </form>
                    
                
            </div>):
                (<div className="progress w-1/4">
                    <div className="color"></div>
                </div>)
            }
        </div>
        <div className="bg-white p-2 mt-2 flex items-center justify-center h-screen w-auto">
            <h1 className="bg-black text-white cursor-pointer text-xl border-2 p-2 rounded-lg" onClick={()=>setToggle(!toggle)}>+ Add New Mobile</h1>
        </div>
    </div>
}