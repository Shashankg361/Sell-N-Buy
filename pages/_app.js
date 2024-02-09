import '@/styles/globals.css'
import { createContext, useState } from 'react'

export const pool = createContext();

export default function App({ Component, pageProps }) {
  const [LoggedIn , setLoggedIn] = useState(false);
  const [userData , setUserData] = useState({});
  
  return (
    <pool.Provider value={{LoggedIn , setLoggedIn , userData , setUserData}}>
      <Component {...pageProps} />
    </pool.Provider>
  )
  
}
