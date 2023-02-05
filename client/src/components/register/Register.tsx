import './register.scss';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="register-wrapper">
      <div className="register-main">
        <div className="register-top">
          <h2>Register</h2>
        </div>
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
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
