import '@/styles/globals.css'
import { createContext, useState } from 'react'

export const pool = createContext();

export default function App({ Component, pageProps }) {
  const [LoggedIn , setLoggedIn] = useState(false);
  const [userData , setUserData] = useState({});
  const [uploaded,setUploaded] = useState(null);
  const [booked,setBooked] = useState(null);
  const [mobileDets,setMobileDets] = useState(null);
  
  return (
    <pool.Provider value={{LoggedIn, setLoggedIn, userData, setUserData, uploaded, setUploaded, booked, setBooked, mobileDets, setMobileDets}}>
      <Component {...pageProps} />
    </pool.Provider>
  )
  
}
