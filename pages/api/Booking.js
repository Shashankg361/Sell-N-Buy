import { client } from "@/database/handleDatabase";
//import { data } from "autoprefixer";
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export default async function BookingEndPoint(req,res){
    if(req.method === 'POST'){
        const {userName,userEmail,productId,productName,shopName} = req.body;
        const db = client.db('MobileDets');
        const collection = db.collection('Booked');
        const dataStore = {userName,userEmail,productId,productName,shopName};
        const sceretkey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({dataStore},sceretkey,{expiresIn:'24h'});
        try{
            const response = await collection.insertOne(dataStore);
            res.status(200).json({message:"Booked!"});
        }catch(error){
            res.status(200).json({message:error});
        }
        
    }
}