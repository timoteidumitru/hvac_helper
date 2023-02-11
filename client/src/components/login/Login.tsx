import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';
import './login.scss';

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { errors, setErrors, setLoginData } = useContext(LoginContext);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const sendData: LoginData = {
        email: data.get('email') as string,
        password: data.get('password') as string
      };

      if (sendData.email === '' && sendData.password === '') {
        setErrors(true);
      }

      fetch('http://localhost:7079/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.message) setErrors(true);
          if (result.email === sendData.email) {
            setErrors(false);
            setLoginData(result);
            localStorage.setItem('loginData', JSON.stringify(sendData));
            setTimeout(() => {
              setErrors(false);
              navigate('/dashboard');
            }, 700);
          }
        })
        .catch((err) => {
          console.log('Error on POST data ', err);
        });
    },
    [navigate, setErrors, setLoginData]
  );

  return (
    <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
      <div className="login-wrapper">
        <div className="login-main">
          <div className="login-top">
            <h2>Login</h2>
          </div>
          {errors ? <p className="login-error">Please enter correct credentials!</p> : ''}
          <div className="login-bottom">
            <div className="login-email">
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" autoComplete="off" />
            </div>
            <div className="login-password">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" autoComplete="off" />
            </div>
            <button className="login-botton">Login</button>
            <p className="login-redirect">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
