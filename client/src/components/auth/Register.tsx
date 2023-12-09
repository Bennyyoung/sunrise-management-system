import axios from 'axios';
import React, { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import AuthContext from '../../context/AuthContext';
import { backendUrl } from '../../http/env';
import AuthHeaders from '../Headers/auth/AuthHeaders';
import Input from '../modules/Input/Input';

export default function Register(): JSX.Element {

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setRegisterData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const { getLoggedIn } = useContext(AuthContext);

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      axios.defaults.headers.post['Access-Control-Allow-Methods'] =
        'PATCH, DELETE, POST, GET, OPTIONS';

      await axios.post(`${backendUrl}/auth/`, registerData);
      await getLoggedIn();

      swal('Good job', 'Registration successful', 'success');
    } catch (err) {
      console.error(err);
      swal(
        "Couldn't register user",
        'Mismatched Passwords or check all fields properly',
        'error'
      );
    }
  };

  return (
    <div className="content-body">
      <div className="container-fluid">
        <AuthHeaders>
          <h4>Register</h4>
        </AuthHeaders>

        <div className="row">
          <div className="col-xl-12 col-xxl-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Register</h5>
              </div>
              <div className="card-body">
                <form onSubmit={register}>
                  <div className="row">
                    <Input
                      label='Email'
                      type={"email"}
                      placeholder={"Email"}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      name="email"
                      value={registerData.email}
                      required
                    />
                    <Input
                      label='Password'
                      type={"password"}
                      placeholder={"Password"}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      name="password"
                      value={registerData.password}
                      required
                    />
                    <Input
                      label='Confirm Password'
                      type="password"
                      placeholder="Verify your password"
                      className="form-control"
                      onChange={handleChange}
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      required
                    />
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                      <button type="submit" className="btn btn-light">
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
