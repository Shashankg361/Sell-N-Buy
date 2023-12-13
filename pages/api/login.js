import { client } from "@/database/handleDatabase";
const bcrypt = require('bcrypt');
const crypto = require('crypto');

export default async function login(req, res){
    if(req.method === 'POST'){
        const {Username , Password} = req.body;
        //console.log(Username);
        const PasswordCred = await getPassword(Username);
        //console.log("Paassssss : ",hashedPassword);

        const matched = calculation(PasswordCred,Password);
        console.log('matched ',matched);
        if(matched){
            createSession(Username);
            res.status(200).json({LoggedIn:true , Message:'Successfull'});
        }else{
            res.status(200).json({LoggedIn:false,Message:'Password Incorrect'});
        }
        //res.status(200).json({message:'Executed'});
    }
}

const getPassword = async (UserName)=>{
    const db = client.db('User_Details');
    const collection = db.collection('Registration');
    const query = {Username : UserName};
    const data = await collection.findOne(query);
    console.log("data ",data);
    return data.PasswordCred;
}

const calculation = (PasswordCred,Password)=>{
    const {hashedPassword , salt} = PasswordCred;
    console.log("Pass ",salt);
    const saltedPassword = Password + salt;

    const matched = bcrypt.compareSync(hashedPassword , saltedPassword);
    console.log('login ',matched);
    if(matched){
        return true;
    }else{
        return false;
    }
}

const createSession = async (Username)=>{
    const sceretkey = crypto.randomBytes(32).toString('hex'); 

    const token = jwt.sign({Username},sceretkey , {expiresIn : '5h'});
    const db = client.db('User_Details');
    const collection = db.collection('Login_Dets');
    const getLoginData = collection.find(Username);

    if(!getLoginData){
        const loginData = {Username , sceretkey , token};
        await collection.insertOne(loginData);
    }else{
        const loginData = {sceretkey , token}
        await collection.updateOne(Username , loginData);
    }
    
}

