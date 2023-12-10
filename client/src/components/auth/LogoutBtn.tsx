import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { backendUrl } from '../../http/env';


export default function LogoutBtn(): JSX.Element {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = async () => {

    try {
      await axios.get(`${backendUrl}/auth/logout`);

      await getLoggedIn();
      navigate('/');

    } catch (error) {
      console.error(error)
    }
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
