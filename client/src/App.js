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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;
