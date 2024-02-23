import { client } from "@/database/handleDatabase";
import { jwtDecode } from "jwt-decode";
import { getPassword } from "./login";
const jwt = require('jsonwebtoken');

export default async function verifyToken(req,res){
    if(req.method === 'POST'){
        const {Token} = req.body;
        const decode = jwtDecode(Token);
        const Email = decode.Email;
        console.log("Email",Email);
        var validate = false;
        try{
            const db = client.db('User_Details');
            const collection = db.collection('Login_Dets');
            const query = {Email:Email};
            const response = await collection.findOne(query);
            //console.log("verificaiton",response);
            const key = response.sceretkey;
            try{
                jwt.verify(Token,key);
                validate=true;
            }catch(error){
                validate=false;
                console.log("Invaild token");
                res.status(200).json({LoggedIn:false, Message:'Invailid Token', Data:null})
            }

            if(validate){
                const data = await getPassword(Email);
                const sendData = {
                    Name:data.FirstName +" "+ data.LastName,
                    Email:data.Email,
                    Shopkeeper:data.Shopkeeper,
                    Uploaded:data.Uploaded,
                    Booked:data.Booked,
                }
                res.status(200).json({LoggedIn:true , Message:'Successfull LoggedIn' , Data:sendData})
            }
        }
        catch(error){
            console.log("error occured",error);
            res.end();
        }

    }
}