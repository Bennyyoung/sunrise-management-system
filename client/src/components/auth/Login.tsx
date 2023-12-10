import axios from 'axios';
import { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import AuthContext from '../../context/AuthContext';
import { backendUrl } from '../../http/env';
import Input from '../modules/Input/Input';
import AuthHeaders from '../Headers/auth/AuthHeaders';

export default function Login(): JSX.Element {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      axios.defaults.headers.post['Access-Control-Allow-Methods'] =
        'PATCH, DELETE, POST, GET, OPTIONS';

      await axios.post(`${backendUrl}/auth/login`, loginData);

      await getLoggedIn();
      swal('Good job', 'Login successful', 'success');

      navigate('/');
    } catch (error) {
      console.error(error);
      swal('Sorry you are unauthorized', 'Wrong email or password', 'error');
    }
  };

  return (
    <div className="content-body">
      <div className="container-fluid">
        <AuthHeaders>
          <h4>Login</h4>
        </AuthHeaders>

        <div className="row">
          <div className="col-xl-12 col-xxl-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Login</h5>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => login(e)}>
                  <div className="row">
                    <Input
                      label='Email'
                      type={"email"}
                      placeholder={"Email"}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      name="email"
                      value={loginData.email}
                      required
                    />
                    <Input
                      label='Password'
                      type={"password"}
                      placeholder={"Password"}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      name="password"
                      value={loginData.password}
                      required
                    />
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                      <button type="button" className="btn btn-light">
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
