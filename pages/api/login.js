import { client } from "@/database/handleDatabase";
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = client.db('User_Details');

export default async function login(req, res){

    const checkVerified = async (Email)=>{
        const collection = db.collection('Registration');
        const query = {Email : Email};
        try{
            const data = await collection.findOne(query);
            if(data){
                console.log("Verified",data.Verified);
                return data.Verified;
            }else{
                console.log("Verified",data);
                return data;
            }
        }catch(err){
            res.status(200).json({LoggedIn:false , Message:'Error occured!'})
        }
    }

    if(req.method === 'POST'){
        const {Email,Password} = req.body;
        //console.log(Password);
        const check = await checkVerified(Email);
        console.log(check,!check);
        if(check===false){
            res.status(200).json({LoggedIn:false , Message:'Please verify you email(check mail)'}) ;
        }else if(check === null){
            res.status(200).json({LoggedIn:false , Message:'Email incorrect'});
        }else{
            const data = await getPassword(Email);
            const PasswordCred = data.PasswordCred;
            const sendData = {
                Name:data.FirstName +" "+ data.LastName,
                Email:data.Email,
                Shopkeeper:data.Shopkeeper,
                Uploaded:data.Uploaded,
                Booked:data.Booked,
            }
            const matched = calculation(PasswordCred,Password);
            //console.log('matched',matched);
            if(matched){
                const result = await createSession(Email);
                result?
                    res.status(200).json({LoggedIn:result , Message:'Successfull LoggedIn' , Data:sendData}):
                    res.status(200).json({LoggedIn:result , Message:'Error occured', Data:null});
            }else{
                res.status(200).json({LoggedIn:false,Message:'Password Incorrect', Data:null});
            }
        }
        //res.status(200).json({message:'Executed'});
    }

    

}

const getPassword = async (Email)=>{
    
    const collection = db.collection('Registration');
    const query = {Email : Email};
    const data = await collection.findOne(query);
    console.log("data",data);
    return data;
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
    //const db = client.db('User_Details');
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
