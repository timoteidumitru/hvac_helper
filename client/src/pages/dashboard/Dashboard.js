import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth(); // Access the user data and logout function from the context
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLogout = () => {
    // Call the logout function from the context
    logout();
    // Navigate back to the login page after logging out
    navigate("/login");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" style={{ margin: "16px 0" }}>
        Welcome to the Dashboard
      </Typography>

      {user && (
        <div>
          <Typography variant="h6" gutterBottom>
            Hello, {user?.fullName.split(" ")[0]}!
          </Typography>
          <Paper square>
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
            >
              <Tab label="Today" />
              <Tab label="Weekly" />
              <Tab label="Monthly" />
            </Tabs>
          </Paper>
          <Box mt={2}>
            {activeTab === 0 && (
              <Typography variant="body1" paragraph>
                Content for Today
              </Typography>
            )}
            {activeTab === 1 && (
              <Typography variant="body1" paragraph>
                Content for Weekly
              </Typography>
            )}
            {activeTab === 2 && (
              <Typography variant="body1" paragraph>
                Content for Monthly
              </Typography>
            )}
          </Box>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
