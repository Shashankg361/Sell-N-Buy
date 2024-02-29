import Navbar from '@/components/navBar';
import { Inter } from 'next/font/google';
import { client, connectDB } from '@/database/handleDatabase';
import { useContext, useEffect } from 'react';
import { pool } from './_app';
import ShowProduct from '@/components/showproduct';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr/_internal';
import { json } from 'micro';
import { ObjectId } from 'mongodb';
const jwt = require('jsonwebtoken');

const inter = Inter({ subsets: ['latin'] })
export default function Home({fallback}) {
  //console.log("Data:",JSON.parse(data));
  const {setMobileDets,setLoggedIn,setUserData,setBooked,setUploaded,userData} = useContext(pool);
  const router = useRouter();
  
  // useEffect(()=>{
  //   setMobileDets(JSON.parse(data));
  // },[])

  useEffect(()=>{
    checkToken({setLoggedIn,setUserData,setBooked,setUploaded,userData,router});
  },[])

  return (
    <SWRConfig value={{fallback}}>
      <main
        className={`p-3 min-h-screen text-black ${inter.className} bg-white`}
      >
        <Navbar />
        <ShowProduct />
      </main>
    </SWRConfig>
    
  )
}

async function getData(){
  try{
    await connectDB();
    const db = client.db('MobileDets');
    const collection = db.collection('Details');
    const response = await collection.find({}).toArray();
    return response
  }catch(error){
    console.log(error);
  }
}

export async function getServerSideProps(){

    const data = await getData();
    await checkBooking();
    //const data = JSON.stringify(response);
    return{
      props:{
        fallback:{
          "MobileDets":JSON.parse(JSON.stringify(data)),
        }
      },
    }   
}

//This fucntion check the session token on first load
export async function checkToken({setLoggedIn,setUserData,setBooked,setUploaded,userData,router}){
  if(window && userData===null){
    if(localStorage.getItem("token")){
      const Token = localStorage.getItem("token");
      const decode = jwtDecode(Token);
      if(decode.exp*1000 < Date.now()){
        alert("Please login again session expire");
      }else{
        console.log("notexpired");
        const response = await axios.post("/api/verifyToken",{Token})
        const data = response.data;
        setLoggedIn(data.LoggedIn);
        if(data.LoggedIn){
          console.log("Recived",data.Data)
          setUserData(data.Data);
          setUploaded(data.Data.Uploaded);
          setBooked(data.Data.Booked);
          //alert(data.Message);
        }
      }
    }else{
      router.push('/');
    }
  }
}

//This function checks the booking status of the mobile on first load
async function checkBooking(){
  const date = Date.now();
  //console.log("woeling",date);
  const db = client.db('MobileDets');
  const DetailsCollection = db.collection('Details');
  const currentBookingCollection = db.collection('CurrentBooked');
  try{
    const response = await currentBookingCollection.find({}).toArray();
    response.map(async (element)=>{
      //console.log("Verify",jwt.verify(element.token,element.sceretkey));
      const elementId = new ObjectId(element._id);
      const decode = jwtDecode(element.token,element.sceretkey);
      const data = decode.dataStore;
      //console.log("decode",decode.exp * 1000 < date);
      //const expire = verify.getExpiresAt();
      const id = new ObjectId(data.productId) ;
      if(decode.exp * 1000<date){
        //console.log("WOrking");
        await DetailsCollection.updateOne({_id:id},{$set:{Booked:false}});
        await currentBookingCollection.deleteOne({_id:elementId});
      }
    })
  }catch(error){
    console.log("Working",error);
  } 
}