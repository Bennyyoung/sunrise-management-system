import React, { createContext, useEffect, useState, ReactNode } from 'react'
import axios from 'axios'

interface AuthContextProps {
    loggedIn: boolean | undefined;
    getLoggedIn: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
    loggedIn: undefined,
    getLoggedIn: async () => {}
});

function AuthContextProvider({children}: { children: ReactNode}) {
 const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);

 async function getLoggedIn() {

  const loggedInRes = await axios.get('/auth/loggedIn');
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