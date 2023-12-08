import React, { createContext, useEffect, useState, ReactNode } from 'react'
import axios from 'axios'
console.log('import.meta.env',import.meta.env.VITE_REACT_APP_BACK_END)

interface AuthContextProps {
    loggedIn: boolean | undefined;
    getLoggedIn: () => Promise<void>
}

const backendUrl = import.meta.env.VITE_REACT_APP_BACK_END

const AuthContext = createContext<AuthContextProps>({
    loggedIn: undefined,
    getLoggedIn: async () => {}
});

function AuthContextProvider({children}: { children: ReactNode}) {
 const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);

 async function getLoggedIn() {

  const loggedInRes = await axios.get(`${backendUrl}/auth/loggedIn`);
  setLoggedIn(loggedInRes.data);
  console.log("Logged in data "+ loggedIn);
 }

 useEffect(() => {
  getLoggedIn();
 }, []);


 return (
  <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
   {children}
  </AuthContext.Provider>
 )
}

export default AuthContext
export { AuthContextProvider };