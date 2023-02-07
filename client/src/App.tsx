import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import Timesheet from './components/timesheet/Timesheet';
import OrderList from './components/orderList/OrderList';
import DeliveryList from './components/deliveryList/DeliveryList';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';

function App() {
  localStorage.setItem('isLogged', 'false');
  let isLogged: string | null = localStorage.getItem('isLogged');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
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
