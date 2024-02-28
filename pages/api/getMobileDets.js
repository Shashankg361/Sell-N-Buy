// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "@/database/handleDatabase";

export default async function getMobileDets(req, res) {
  try{
    //await connectDB();
    const db = client.db('MobileDets');
    const collection = db.collection('Details');
    const response = await collection.find({}).toArray();
    //const data = JSON.stringify(response);
    res.status(200).json( response );
  }catch(error){  
    res.status(500).json({ error:"Internal server Error" });
  } 
  
}
