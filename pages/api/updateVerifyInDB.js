import { client, connectDB } from "@/database/handleDatabase";

export default async function UpdateDb(res,req){
   const mailId = req.body;

    connectDB();

    const db = client.db('User_details');
    const collectionRef = db.collection('Registration');
    try{
        const doc_id = await collectionRef.findOne({Email : mailId});
        const updateDoc = {Verified:true};
        const response = await collectionRef.updateOne(doc_id , updateDoc);
        res.status(200).json({Message:'Verified'});
    }catch(error){
        res.status(200).json({error});
    }
    



}