import axios from "axios";
import { useRouter } from "next/router";
export default function Verify(){

    const router = useRouter();
    const query = router.query;
    console.log(query);

    const handleClick = async()=>{
        const response = await axios.post("/api/updateVerifyInDB",{query});
        const data = response.data;
        alert(data.message);
    }
    
    return(
        <div>
            <button onClick={handleClick} className="bg-green-400 p-1 w-auto text-lg font-semibold mt-3 cursor-pointer border-2 border-black rounded-lg">SingIn</button>
        </div>
    )
}