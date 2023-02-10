import './register.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const sendData = Object.fromEntries(data.entries());
    if (sendData['password'] === sendData['confirm-password']) {
      delete sendData['confirm-password'];
    } else {
      setErrors('Password does not match!');
    }
    console.log("Data you've send to server: ", sendData);
    fetch('http://localhost:7079/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Response from server: ', result.user);
        if (result.user.email === sendData.email) {
          setErrors('Successfully create new account!');
          setTimeout(() => {
            navigate('/login');
          }, 1700);
        }
      })
      .catch((err) => console.log('Error on POST data ', err));
  };

  return (
    <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
      <div className="register-wrapper">
        <div className="register-main">
          <div className="register-top">
            <h2>Register</h2>
          </div>
          <p className="register-errors">{errors}</p>
          <div className="register-bottom">
            <div className="register-email">
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" autoComplete="off" />
            </div>
            <div className="register-password">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" autoComplete="off" />
            </div>
            <div className="register-confirm-password">
              <label htmlFor="confirm-password">Repeat Password: </label>
              <input type="password" name="confirm-password" autoComplete="off" />
            </div>
            <button type="submit" className="register-botton">
              Register
            </button>
            <p className="register-redirect">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
