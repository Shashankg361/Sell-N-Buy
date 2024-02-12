import Navbar from '@/components/navBar'
import { Inter } from 'next/font/google'
import { client, connectDB } from '@/database/handleDatabase'
import { useContext, useEffect } from 'react'
import { pool } from './_app'
import ShowProduct from '@/components/showproduct'

const inter = Inter({ subsets: ['latin'] })
export default function Home({data}) {
  console.log("Data:",JSON.parse(data));
  const {setMobileDets} = useContext(pool);
  
  useEffect(()=>{
    setMobileDets(JSON.parse(data));
  },[])

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
