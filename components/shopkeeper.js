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

    const handleChange = (e)=>{
        console.log("working");
        const selectedFiles = Array.from(e.target.files)
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
    
    // const formData = new formData();
    // files.forEach((file , index) => {
    //     formData.append(`file${index+1}`,file);
    // });

    const handleSubmit = async()=>{
        if(!files){
            alert("please enter file");
        }else{
            console.log(files);
            const response = await axios.post('/api/uploadtocloud',{files:files});
            const data = response.data;
            console.log(data.message);
        }
        
    }

    return<div>
        <div>
            <input type="file" onChange={handleChange} multiple/>
            <input type="submit"  onClick={handleSubmit} />
        </div>
        <div >
        {previewUrls.length > 0 && (
        <div className="flex">
          <p>Previews:</p>
          {previewUrls.map((url, index) => (
            <img key={index} src={url} alt={`Preview ${index}`} style={{ maxWidth: '20%' }} />
          ))}
        </div>
      )}
        </div>

    </div>
}