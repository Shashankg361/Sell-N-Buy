import { pool } from "@/pages/_app"
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Input } from "postcss";
import { useContext, useEffect, useRef, useState } from "react"

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

function RemoveLock(){
    const [files,setFiles] = useState(null);
    const [previewUrls,setPreviewUrls] = useState([]);
    const [URLs, setURLs] = useState([]);
    const handleChange = (e)=>{
        console.log("working");
        const selectedFiles = Array.from(e.target.files);
        
        setFiles(selectedFiles);

        const promises = selectedFiles.map((file) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.readAsDataURL(file);
            });
        });
      
        Promise.all(promises).then((urls) => setPreviewUrls(urls));

    }
    
    const formData = new FormData();

    files && files.forEach((file , index) => {
        formData.append(`file${index+1}`,file);
    });

    const handleSubmit = async()=>{
        if(!files){
            alert("please enter file");
        }else{
            console.log(files);
            const response = await axios.post('/api/uploadtocloud',formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                }
            });
            const data = response.data;
            alert(data.message);
            setURLs(data.URL.ImagesUrl);
            console.log(data.URL.ImagesUrl);
        }
        
    }

    //URLs && console.log('URLLL',URLs);

    return<div>
        <div className="z-10 bg-black/70 fixed flex justify-center items-center left-0 top-0 h-screen w-screen">
            <div className="text-black bg-slate-500 h-3/4 w-3/4">
                <form className="">
                    <label>mobile name</label>
                    <input type="text" placeholder="Enter mobile name"></input>
                </form>
            </div>
        </div>
        <div className="bg-white p-2 mt-2 flex items-center justify-center h-screen w-auto">
            <h1 className="bg-black text-white cursor-pointer text-xl border-2 p-2 rounded-lg">+ Add New Mobile</h1>
        </div>
    </div>
}