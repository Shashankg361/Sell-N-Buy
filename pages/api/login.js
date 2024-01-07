import { client } from "@/database/handleDatabase";
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

export default async function login(req, res){
    if(req.method === 'POST'){
        const {Email,Password} = req.body;
        console.log(Password);
        const PasswordCred = await getPassword(Email);
        //console.log("Paassssss : ",hashedPassword);
    
        const matched = calculation(PasswordCred,Password);
        console.log('matched',matched);
        if(matched){
            const result = await createSession(Email);
            result?
                res.status(200).json({LoggedIn:result , Message:'Successfull LoggedIn'}):
                res.status(200).json({LoggedIn:result , Message:'Error occured'});
        }else{
            res.status(200).json({LoggedIn:false,Message:'Password Incorrect'});
        }
        //res.status(200).json({message:'Executed'});
    }
}

const getPassword = async (Email)=>{
    const db = client.db('User_Details');
    const collection = db.collection('Registration');
    const query = {Email : Email};
    const data = await collection.findOne(query);
    console.log("data",data);
    return data.PasswordCred;
}

const calculation = (PasswordCred,Password)=>{

    const {hashedPassword , salt} = PasswordCred;
    const saltedPassword = Password+salt;
    const matched = bcrypt.compareSync(saltedPassword,hashedPassword);
    return matched;
}

const createSession = async (Email)=>{
    const sceretkey = crypto.randomBytes(32).toString('hex'); 
    const token = jwt.sign({Email},sceretkey , {expiresIn : '5h'});
    const db = client.db('User_Details');
    const collection = db.collection('Login_Dets');
    try{
        const getLoginData = await collection.findOne({Email:Email});

        if(getLoginData == null){
            const loginData = {Email , sceretkey , token};
            try{
                await collection.insertOne(loginData);
                return true;
            }catch(error){
                console.log("Error occured while inserting",error);
                return false;
                
            }
        }else{
            //const loginData = {sceretkey , token}
            const filter = {Email};
            const updateDoc = {$set:{sceretkey , token}}
            try{
                await collection.updateOne(filter , updateDoc);
                return true;
            }catch(error){
                console.log("Error occured while updating",error);
                return false;
                
            }
            
        }
    }catch(err){
        console.log("Error occured while finding the document else doc not found",err);
    }
    

    
    
}
