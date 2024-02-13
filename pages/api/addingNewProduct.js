import { client } from "@/database/handleDatabase";

export default async function updateNewProduct(req,res){
    try{
        const db = client.db('MobileDets');
        const collection = db.collection('Details');
        const response = collection.watch();

        response.on('change',newData=>{
            if(newData.operationType === "insert"){
                res.status(200).json({newData});
            }else{
                res.status(204).end();
            }
        })
    }catch(error){
        res.status(500).json({error:"Internal server error"});
    }
    
}