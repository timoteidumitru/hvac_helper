import { Link } from 'react-router-dom';
import './login.scss';

export default function Login() {
  return (
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
          <button type="submit" className="login-botton">
            Login
          </button>
          <p className="login-redirect">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
