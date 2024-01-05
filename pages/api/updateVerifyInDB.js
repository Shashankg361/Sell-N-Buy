import { client, connectDB } from "@/database/handleDatabase";

export default async function UpdateDb(req,res){
   const mailId = req.body.mailId;
    console.log(mailId);
    connectDB();

    const db = client.db('User_Details');
    const collectionRef = db.collection('Registration');

    try{
        await collectionRef.updateOne(
            {Email:mailId} ,
            {$set:{Verified:true}}
        );
        res.status(200).json({Message:'Verified'});
    }catch(error){
        res.json({Message:'Error occured'});
    }
    



}