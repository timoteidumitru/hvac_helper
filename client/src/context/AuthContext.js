import React, { createContext, useContext, useState } from "react";
import axios from "../api/axios"; // Import your Axios instance here

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data here if authenticated
  const [isLoading, setIsLoading] = useState(false);
  console.log(user);

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await axios.post("/user/auth", { email, password });
      setUser(response.data);
    } catch (error) {
      console.error("Error on login: ", error.message);
    }

    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
