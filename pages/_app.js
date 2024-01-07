import '@/styles/globals.css'
import { createContext, useState } from 'react'

export const pool = createContext();

export default function App({ Component, pageProps }) {
  const [LoggedIn , setLoggedIn] = useState(false);
  
  return (
    <pool.Provider value={{LoggedIn , setLoggedIn}}>
      <Component {...pageProps} />
    </pool.Provider>
  )
  
}
