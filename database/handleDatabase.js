import { MongoClient } from "mongodb";
import { config } from "dotenv";


const uri = `mongodb+srv://shashankg361:${process.env.PASSWORD}@cluster0.dpbfj49.mongodb.net/`;
export const client = new MongoClient(uri ,{ useNewUrlParser: true, useUnifiedTopology: true });

export const connectDB = async()=>{
    try{
        await client.connect();
        console.log("Connected successfully");
    }catch(error){
        console.log("Database not connected",error);
    }
}

