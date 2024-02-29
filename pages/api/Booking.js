import { client } from "@/database/handleDatabase";
import { ObjectId } from "mongodb";
//import { data } from "autoprefixer";
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export default async function BookingEndPoint(req,res){
    if(req.method === 'POST'){
        const {userName,userEmail,productId,productName,shopName} = req.body;
        const db = client.db('MobileDets');
        const BookingCollection = db.collection('Booking');
        const DetailsCollection = db.collection('Details');
        const CurrentBooking = db.collection('CurrentBooked');
        const Id = new ObjectId(productId);
        try{
            const booking = await DetailsCollection.findOne({_id:Id});
            if(!booking.Booked){
                const BookingTime = Date.now();
                
                const dataStore = {userName,userEmail,productId,productName,shopName,BookingTime};
                
                console.log("stored",dataStore);
                const sceretkey = crypto.randomBytes(32).toString('hex');
                const token = jwt.sign({dataStore},sceretkey,{expiresIn:'1h'});
                const data = {sceretkey,token}
                console.log("working",productId);
                try{
                    await CurrentBooking.insertOne(data);
                    await BookingCollection.insertOne(data);
                    const query = {_id:Id};
                    console.log("workingggg");
                    await DetailsCollection.updateOne(query,{$set:{Booked:true}});
                    //console.log("Update",updateBooked);
                    //console.log("Booking response",response);
                    res.status(200).json({message:"Booked!",Booked:true});
                }catch(error){
                    res.status(200).json({message:`Internal sever error ${error}`,Booked:false});
                }
            }else{
                res.status(200).json({message:"Already booked",Booked:true});
            }
        }catch(error){
            res.status(200).json({message:`Internal sever error ${error}`,Booked:false});
        }
        
        
        
        
    }
}