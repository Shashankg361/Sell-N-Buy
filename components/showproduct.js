import { pool } from "@/pages/_app";
import { faIndianRupee, faRupee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

export default function ShowProduct(){
    const {mobileDets} = useContext(pool);

    return(
        <div>
            <div className="bg-gray-200 rounded-lg p-2 m-2 text-black flex justify-between">
                <div className="flex ">
                    {mobileDets && <img src={mobileDets[37].ImagesUrl[0]} style={{maxWidth:"20%"}} className="m-2"/>}
                    {mobileDets && <div>
                        <h1 className="m-2 font-semibold text-xl">{mobileDets[37].Mname}</h1>
                        <h1 className="m-1 ml-2 text-base">- Rear camera {mobileDets[37].RearC + " | "+mobileDets[37].FrontC} front camera</h1>
                        <h1 className="m-1 ml-2 text-base">- Ram {mobileDets[37].Ram + " | " + mobileDets[37].Rom} Rom</h1>
                        <h1 className="m-1 ml-2 text-base">- Processor {mobileDets[37].Processor}</h1>
                        <h1 className="m-1 ml-2 text-base">- Used for {mobileDets[37].UsedFor}</h1>
                        </div>}
                </div>    
                <div className="m-2 font-bold text-2xl mr-20"><h1><FontAwesomeIcon icon={faIndianRupee} />  8,000</h1>
                    <h1>Under warrant</h1> 
                    <h1>Booked </h1>
                    {mobileDets && <h1 className="font-normal text-base">{mobileDets[37].owner}</h1>}
                </div>    
            </div>
        </div>
    )
}