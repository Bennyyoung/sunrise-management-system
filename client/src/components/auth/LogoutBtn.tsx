import axios from 'axios';
import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function LogoutBtn(): JSX.Element {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = async () => {
    await axios.get('/auth/logout');

    await getLoggedIn();
    navigate('/');
  };

  return (
    <>
      <li className="nav-label first">Login</li>
      <li>
        <Link
          to="#"
          className="has-arrow"
          onClick={logout}
          aria-expanded="false"
        >
          <i className="la la-login"></i>
          <span className="nav-text">Logout</span>
        </Link>
      </li>
    </>
  );
}
