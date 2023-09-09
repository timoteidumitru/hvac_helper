import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios"; // Import your Axios instance here

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data here if authenticated
  const [isLoading, setIsLoading] = useState(true);

  // Check for a stored user in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");

    if (storedUser) {
      // If a user is found in localStorage, parse and set it as the authenticated user
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, [isLoading]);

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await axios.post("/user/auth", { email, password });
      setUser(response.data);

      // Store the user data in localStorage upon successful login
      localStorage.setItem("authUser", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error on login: ", error.message);
    }

    setIsLoading(false);
  };

  const logout = () => {
    // Remove the user data from localStorage and set the user state to null
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
