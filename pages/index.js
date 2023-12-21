import Navbar from '@/components/navBar'
import { Inter } from 'next/font/google'
import { connectDB } from '@/database/handleDatabase'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })
export default function Home({Message}) {
  
  useEffect(()=>{
    console.log("Message : ",Message);
  },[])

  return (
    <main
      className={`p-3 min-h-screen text-black ${inter.className} bg-white`}
    >
      <Navbar />
    </main>
  )
}

export async function getServerSideProps(){
  try{
    await connectDB();
    return{
      props:{Message:'Database connected successfully'},
    }
  }catch(error){
    return{
      props:{Message:error},
    }
  }   
}
