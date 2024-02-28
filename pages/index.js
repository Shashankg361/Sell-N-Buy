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
    //const data = JSON.stringify(response);
    return{
      props:{
        fallback:{
          "MobileDets":JSON.parse(JSON.stringify(data)),
        }
      },
    }   
}

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