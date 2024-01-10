//import { MongoClient } from "mongodb";
const {MongoClient} = require('mongodb')
require('dotenv').config({path:'./.env.local'});
//import { config } from "dotenv";


const uri = `mongodb+srv://shashankg361:${process.env.PASSWORD}@cluster0.dpbfj49.mongodb.net/`;
const client = new MongoClient(uri);

const connectDB = async()=>{
    try{
        await client.connect();
        console.log("Connected successfully");
    }catch(error){
        console.log("Database not connected",error);
    }
}

module.exports = {
    client,
    connectDB,
}
