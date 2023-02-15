import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h1>Wellcome to home page!</h1>
      <h3>
        Click here for loggin in <Link to="/login">Login</Link>
      </h3>
    </>
  );
}
