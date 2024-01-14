import { pool } from "@/pages/_app"
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react"

export default function Shopkeeper(){
    const {userData} = useContext(pool);

    const show = ()=>{
        if(userData.Shopkeeper){
            return(
                <div>
                    <FontAwesomeIcon icon={faLock} />
                </div>
            )
        }else{
            return <div>
                working
            </div>
        }
    }
    

    return(
        <div>
            {show}
        </div>
    )
}