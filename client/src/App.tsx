import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import Timesheet from './components/timesheet/Timesheet';
import OrderList from './components/orderList/OrderList';
import DeliveryList from './components/deliveryList/DeliveryList';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import { LoginContext } from './contexts/LoginContext';

function App() {
  const { loginData } = useContext(LoginContext);
  const isUserLoggedIn = Object.values(loginData).every((value) => value !== '');
  console.log(loginData);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          {isUserLoggedIn && <Route path="dashboard" element={<Dashboard />} />}
          <Route path="timesheet" element={<Timesheet />} />
          <Route path="order-list" element={<OrderList />} />
          <Route path="delivery-list" element={<DeliveryList />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
