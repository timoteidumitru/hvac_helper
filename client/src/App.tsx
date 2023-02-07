import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  localStorage.setItem('isLogged', 'false');
  let isLogged: string | null = localStorage.getItem('isLogged');

  console.log(isLogged);

  const router = createBrowserRouter([
    {
      path: '/',
      element: isLogged ? <Login /> : <Dashboard />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/dashboard',
      element: isLogged ? <Dashboard /> : <Login />
    },
    {
      path: '*',
      element: <Dashboard />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
