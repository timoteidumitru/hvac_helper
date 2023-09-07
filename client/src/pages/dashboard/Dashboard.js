import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth(); // Access the user data and logout function from the context
  const navigate = useNavigate();

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
            Hello, {user.username}!
          </Typography>
          <Typography variant="body1" paragraph>
            This is a basic dashboard component. You can customize it further
            with your own content and features.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            style={{ marginTop: "16px" }}
          >
            Logout
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
