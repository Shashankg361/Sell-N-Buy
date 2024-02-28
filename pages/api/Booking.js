import { client } from "@/database/handleDatabase";
import { ObjectId } from "mongodb";
//import { data } from "autoprefixer";
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export default async function BookingEndPoint(req,res){
    if(req.method === 'POST'){
        const {userName,userEmail,productId,productName,shopName} = req.body;
        
        const BookingTime = Date.now();
        const db = client.db('MobileDets');
        const BookingCollection = db.collection('Booking');
        const DetailsCollection = db.collection('Details');
        const dataStore = {userName,userEmail,productId,productName,shopName};
        const Id = new ObjectId(productId);
        console.log("stored",dataStore);
        const sceretkey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({dataStore},sceretkey,{expiresIn:'24h'});
        const data = {userName,userEmail,productId,productName,shopName,token,BookingTime}
        console.log("working",productId);
        try{
            const response = await BookingCollection.insertOne(data);
            const query = {_id:Id};
            const updateBooked = await DetailsCollection.updateOne(query,{$set:{Booked:true}});
            console.log("Update",updateBooked);
            console.log("Booking response",response);
            res.status(200).json({message:"Booked!",Booked:true});
        }catch(error){
            res.status(200).json({message:`Internal sever error ${error}`,Booked:false});
        }
        
    }
}