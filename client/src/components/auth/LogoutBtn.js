import axios from 'axios'
import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom'

export default function LogoutBtn() {
 const { getLoggedIn } = useContext(AuthContext);

 const history = useHistory();

 async function logout() {
  await axios.get('/auth/logout');

  await getLoggedIn();
  history.push("/");
 }
 return (
  <>
   <li className="nav-label first">Login</li>
   <li><Link className="has-arrow" onClick={logout} aria-expanded="false">
    <i className="la la-login"></i>
    <span className="nav-text">Logout</span>
   </Link>
   </li>
  </>
 )
}

