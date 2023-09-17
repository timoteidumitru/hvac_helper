import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Import the useAuth hook
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Delivery from "./pages/delivery/Delivery";
import Orders from "./pages/orders/Orders";
import Timesheet from "./pages/timesheet/Timesheet";

function App() {
  const { user } = useAuth(); // Access the user data and logout function from the context

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/timesheet" element={<Timesheet />} />
      </Routes>
    </Router>
  );
}

export default App;
