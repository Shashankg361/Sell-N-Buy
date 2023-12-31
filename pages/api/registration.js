import { client, connectDB } from "@/database/handleDatabase";
const bcrypt = require('bcrypt');
export default async function registration(req , res){

    if(req.method === 'POST'){
        const {Email , Username , Password ,now,Verified} = req.body;
        console.log("registration pass ",Password);
        const db = client.db('User_Details');
        const collection = db.collection('Registration');
        const PasswordCred = getHashedPass(Password);
        const data = {Email , Username , PasswordCred ,now ,Verified};
        try{
            await collection.insertOne(data);
            res.status(200).json({Message:"Successfully registered"});
        }catch(error){
            res.json({error});
        }

    }
}

const getHashedPass = (Password)=>{
    const saltRound = 10;
    const salt = bcrypt.genSaltSync(saltRound);
    const saltPassword = Password+salt;
    console.log("saltPassword",saltPassword);
    console.log(saltPassword);
    const hashedPassword = bcrypt.hashSync(saltPassword , saltRound);
    return {hashedPassword , salt};

}