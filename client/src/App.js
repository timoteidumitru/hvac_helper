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

function App() {
  const { user } = useAuth(); // Access the user data from the context

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />} // Check if the user is authenticated
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />} // Redirect to dashboard if authenticated
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
