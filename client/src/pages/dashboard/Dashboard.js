import React, { useState } from "react";
import { Typography, Box, Paper, Tabs, Tab } from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
import NavBar from "../../components/navbar/Navbar";

const Dashboard = () => {
  const classes = useStyles();
  const { user } = useAuth(); // Access the user data and logout function from the context
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className={classes.dashboardContainer}>
      <NavBar />
      <Typography variant="h4" align="center">
        Welcome to the Dashboard
      </Typography>

      {user && (
        <div>
          <Paper square>
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
              style={classes.centeredTabs} // Apply the custom style to center the tabs
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
    </div>
  );
};

export default Dashboard;

const useStyles = () => ({
  dashboardContainer: {
    margin: 0, // Remove the default margin
    padding: 0, // Optionally, remove padding if needed
  },
  centeredTabs: {
    display: "flex",
    justifyContent: "space-around", // Update to "space-around" to evenly space the tabs
  },
});
