import { client, connectDB } from "@/database/handleDatabase";

export default async function UpdateDb(res,req){
   const mail = req.query.id;

    connectDB();

    const db = client.db('User_details');
    const collectionRef = db.collection('Registration');
    try{
        const doc_id = await collectionRef.findOne({Email : mail});
        const updateDoc = {Verified:true};
        const response = await collectionRef.updateOne(doc_id , updateDoc);
        res.status(200).json({Message:'Verified'});
    }catch(error){
        res.json({error});
    }
    



}