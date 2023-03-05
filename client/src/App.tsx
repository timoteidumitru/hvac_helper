import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import Timesheet from './components/timesheet/Timesheet';
import OrderList from './components/orderList/OrderList';
import DeliveryList from './components/deliveryList/DeliveryList';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import { LoginContext } from './contexts/LoginContext';
import { ProfileContextProvider } from './contexts/ProfileContext';
import { TimesheetContextProvider } from './contexts/TimesheetContext';

function App() {
  const { loginData, setLoginData } = useContext(LoginContext);
  const isUserLoggedIn = Object.values(loginData).every((value) => value !== '');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLoginData = localStorage.getItem('loginData');
    if (savedLoginData) {
      setLoginData(JSON.parse(savedLoginData));
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', overflow: 'hidden' }}>
      <ProfileContextProvider>
        <TimesheetContextProvider>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="" index element={<Home />} />
              {isUserLoggedIn ? (
                <Route path="dashboard" element={<Dashboard />} />
              ) : (
                <Route path="" index element={<Home />} />
              )}
              <Route path="timesheet" element={<Timesheet />} />
              <Route path="order-list" element={<OrderList />} />
              <Route path="delivery-list" element={<DeliveryList />} />
            </Route>
            <Route path="*" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </TimesheetContextProvider>
      </ProfileContextProvider>
    </div>
  );
}

export default App;
