import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRef, useState } from 'react'
import Login from '@/components/login';
import Register from '@/components/register';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [log , setLog] = useState('true');

  function login(){
    setLog(true);
  }

  function register(){
    setLog(false);
  }

  return (
    <main
      className={`flex justify-center p-3 min-h-screen ${inter.className} bg-white`}
    >
      <div className='flex flex-col items-center'>
        <div className='pt-2 pb-2 pr-4 pl-4 mt-10 bg-gray-300 rounded-lg'>
          <button onClick={login} className={`pt-2 pb-2 pr-4 pl-4 rounded-lg ${log?'text-white bg-slate-500 font-bold':'text-black font-semibold'}`}>Login</button>
          <button onClick={register} className={`pt-2 pb-2 pr-4 pl-4 rounded-lg ${!log?'text-white bg-slate-500 font-bold':'text-black font-semibold'}`} >Register</button>
        </div>
        <div>
          {log ? <Login /> : <Register />}
        </div>
      </div>
    </main>
  )
}
