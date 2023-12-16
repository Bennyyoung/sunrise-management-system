import axios from "axios";
import{ AuthContextProvider } from "./Context/AuthContext";
import Router from "./Router";

axios.defaults.withCredentials = true;


function App() {

 return (
  <AuthContextProvider>
   <Router />
  </AuthContextProvider>
 );
}

export default App;
