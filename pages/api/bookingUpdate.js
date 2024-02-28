import { client } from "@/database/handleDatabase";
import { ObjectId } from "mongodb";

export default async function bookingUpdate(req,res){
    const Rquery = req.query;
    console.log("query",Rquery);
    const db = client.db('MobileDets');
    const collection = db.collection('Details');
    const id = new ObjectId(Rquery.query);
    const query = {_id:id};
    try{
        const data = await collection.findOne(query);
        res.status(200).json(data);
    }catch(error){
        res.error(error);
    }
}