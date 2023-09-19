import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios"; // Import your Axios instance here

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Store JWT token here if authenticated
  const [user, setUser] = useState(null); // Store user data here if authenticated

  // Check for a stored token in localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      // If a token is found in localStorage, set it as the authenticated token
      setToken(storedToken);

      // Fetch user data using the token
      fetchUserData(storedToken);
    }
  }, []);

  const fetchUserData = async (authToken) => {
    try {
      const response = await axios.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Set the user data in the state
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data: ", error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("/user/auth", { email, password });

      // Assuming the backend returns a JWT token upon successful login
      const { token: authToken } = response.data;

      // Store the token in localStorage upon successful login
      localStorage.setItem("authToken", authToken);

      // Set the token state
      setToken(authToken);

      // Fetch user data using the token
      fetchUserData(authToken);
    } catch (error) {
      console.error("Error on login: ", error.message);
    }
  };

  const logout = () => {
    // Remove the token and user data from localStorage and set the states to null
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
