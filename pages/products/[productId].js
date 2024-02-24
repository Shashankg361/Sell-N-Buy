import { useContext } from "react";
import { pool } from "../_app";
import { useRouter } from "next/router";

export default function Product(){
    const {mobileDets} = useContext(pool);
    const router = useRouter();
    const query = router.query.productId;
    const product = mobileDets?.filter((mobile)=>{
        return mobile._id == query
    })
    console.log("product detail",product);

    return(
        <div className="text-black bg-white h-screen w-screen">
            <h1>{product && product[0].Mname}</h1>
            <h1>working</h1>
        </div>
    )

}