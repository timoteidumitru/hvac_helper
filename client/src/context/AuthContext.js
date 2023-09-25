import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import jwt_decode from "jwt-decode"; // Import jwt-decode library

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

      // Decode the JWT token to get the email
      const decodedToken = jwt_decode(storedToken);
      const email = decodedToken.email;

      // Fetch user data using the email
      fetchUserData(email);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      // If login fails, make a POST request to /profile/register with dummy data
      const dummyUserData = {
        email: email,
        profileData: {
          personal: {
            firstName: "John",
            lastName: "Doe",
            phone: 1234567890,
            email: email,
            address: "123 Main Street, City",
          },
          nextOfKin: {
            name: "Jane Doe",
            phone: 9876543210,
          },
          bankDetails: {
            institute: "ABC Bank",
            sortCode: 112233,
            account: 987654321,
          },
          position: {
            role: "Software Engineer",
            dateStart: "2023-01-15",
          },
        },
      };
      if (token) {
        await axios.post("/profile/register", dummyUserData);
        console.log("Dummy user data created successfully.");
      }

      const response = await axios.get(`/profile/get`);
      const userData = response?.data?.profile?.profileData;

      // Set the user data in the state
      setUser(userData ? userData : dummyUserData);
    } catch (error) {
      console.error("Error fetching user data: ", error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("/user/auth", { email, password });

      if (response.status === 200) {
        // Successful login, continue as usual
        const { token: authToken } = response.data;
        localStorage.setItem("authToken", authToken);

        setToken(authToken);
        await fetchUserData(email);
      } else if (response.status === 401) {
        console.log("Unauthorised request!");
      } else {
        // Handle other error cases here
        console.error("Error on login: ", response.data.message);
      }
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
