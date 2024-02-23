import Navbar from '@/components/navBar'
import { Inter } from 'next/font/google'
import { client, connectDB } from '@/database/handleDatabase'
import { useContext, useEffect } from 'react'
import { pool } from './_app'
import ShowProduct from '@/components/showproduct';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })
export default function Home({data}) {
  //console.log("Data:",JSON.parse(data));
  const {setMobileDets,setLoggedIn,setUserData,setBooked,setUploaded,userData} = useContext(pool);
  
  useEffect(()=>{
    setMobileDets(JSON.parse(data));
  },[])

  useEffect(()=>{
    checkToken();
  },[])

  const checkToken = async ()=>{
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
            //router.push('/');
          }
        }
      }
    }
  }

  return (
    <main
      className={`p-3 min-h-screen text-black ${inter.className} bg-white`}
    >
      <Navbar />
      <ShowProduct />
    </main>
  )
}

export async function getServerSideProps(){
  
  try{
    await connectDB();
    const db = client.db('MobileDets');
    const collection = db.collection('Details');
    const response = await collection.find({}).toArray();
    const data = JSON.stringify(response);
    return{
      props:{data},
    }
  }catch(error){
    return{
      props:{data:error},
    }
  }   
}
