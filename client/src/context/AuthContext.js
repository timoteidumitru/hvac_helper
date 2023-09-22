import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Check for a stored token in localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      // If a token is found in localStorage, set it as the authenticated token
      setToken(storedToken);

      // Fetch user data using the token
      fetchUserData(user?.personal?.email);
    }
  }, [user?.personal?.email]);

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get("/profile/get", {});
      // Set the user data in the state
      setUser(response?.data?.profile?.profileData);
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

      // Fetch user data using the token and wait for it to complete
      await fetchUserData(email);

      // At this point, the user data should be available in the 'user' state
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
