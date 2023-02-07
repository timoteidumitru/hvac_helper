import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.scss';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const sendData = Object.fromEntries(data.entries());
    console.log("Data you've send to server: ", Object.fromEntries(data.entries()));
    fetch('http://localhost:7079/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Response from server: ', result);
        if (result.email === sendData.email) {
          localStorage.setItem('isLogged', 'true');
          setTimeout(() => {
            navigate('/dashboard');
          }, 700);
        }
      })
      .catch((err) => console.log('Error on POST data ', err));
  };

  return (
    <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
      <div className="login-wrapper">
        <div className="login-main">
          <div className="login-top">
            <h2>Login</h2>
          </div>
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
