import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Delivery from "./pages/delivery/Delivery";
import Orders from "./pages/orders/Orders";
import Timesheet from "./pages/timesheet/Timesheet";

function App() {
  const { token } = useAuth(); // Access the token from AuthContext

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <Register />}
        />
        {/* Use the PrivateRoute logic within each Route */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/delivery"
          element={token ? <Delivery /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={token ? <Orders /> : <Navigate to="/login" />}
        />
        <Route
          path="/timesheet"
          element={token ? <Timesheet /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
