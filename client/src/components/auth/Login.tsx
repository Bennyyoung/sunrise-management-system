import axios from 'axios';
import React, { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import AuthContext from '../../context/AuthContext';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      axios.defaults.headers.post['Access-Control-Allow-Methods'] =
        'PATCH, DELETE, POST, GET, OPTIONS';

      const loginData = {
        email,
        password,
      };

      await axios.post('/auth/login', loginData);

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
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Login</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 col-xxl-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Login</h5>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => login(e)}>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          placeholder="Email"
                          className="form-control"
                          onChange={(e) => handleEmailChange(e)}
                          value={email}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          placeholder="Password"
                          className="form-control"
                          onChange={(e) => handlePasswordChange(e)}
                          value={password}
                          required
                        />
                      </div>
                    </div>
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
