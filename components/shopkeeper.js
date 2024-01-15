import { pool } from "@/pages/_app"
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef, useState } from "react"

export default function Shopkeeper(){
    const {userData} = useContext(pool);

    const show = ()=>{
        if(userData.Shopkeeper){
            return <div>working</div>
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
    if(window){
        setInterval(()=>{
            setChange(!change);
        },2000);
    }
    

    return(
        <div className="text-center mt-10">
            <FontAwesomeIcon icon={faLock} className="text-5xl text-stone-800"/>
            <h1 className="text-xl">To Unlock you have to buy Subscription</h1>
            <div ref={lockBtnRef} className={`text-xl border-2 border-black p-1 rounded-xl ${change ? "bg-gray-800 text-white":""}`}><button type="button"  >Click Here</button></div>
        </div>
    )
}