import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);

      // Fetch user data using the email
      const decodedToken = jwt_decode(storedToken);
      const email = decodedToken?.email;

      // Check if the user has a profile, and create one if not found
      checkProfileExists(email);
    }
  }, []);

  const checkProfileExists = async (email) => {
    try {
      const response = await axios.get(`/profile/get`, { email });
      const userData = response?.data?.profile?.profileData;

      if (!userData) {
        // If the user doesn't have a profile, create one with dummy data
        await createDummyProfile(email);
      } else {
        // If the user has a profile, set it in the state
        setUser(userData);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If the response status is 404 (Not Found), it means the profile doesn't exist
        // Create a dummy profile in this case
        await createDummyProfile(email);
      } else {
        console.error("Error checking profile: ", error.message);
      }
    }
  };

  const createDummyProfile = async (myEmail) => {
    try {
      const dummyUserData = {
        email: myEmail,
        profileData: {
          personal: {
            firstName: "John",
            lastName: "Doe",
            phone: 1234567890,
            email: myEmail,
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

      if (myEmail) {
        await axios.post("/profile/register", dummyUserData);
        console.log("Dummy user data created successfully.");
      }

      // Set the user data in the state
      setUser(dummyUserData.profileData);
    } catch (error) {
      console.error("Error creating dummy profile: ", error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("/user/auth", { email, password });
      const respEmail = response.data.user.email;

      if (response.status === 200) {
        const { token: authToken } = response.data;
        localStorage.setItem("authToken", authToken);

        setToken(authToken);
        await checkProfileExists(respEmail);
      } else if (response.status === 401) {
        console.log("Unauthorised request!");
      } else {
        console.error("Error on login: ", response.data.message);
      }
    } catch (error) {
      console.error("Error on login: ", error.message);
    }
  };

  const logout = () => {
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
