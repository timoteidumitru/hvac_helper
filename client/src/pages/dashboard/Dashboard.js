import React, { useState, useEffect } from "react";
import "../../App.css";
import {
  Typography,
  Avatar,
  createTheme,
  ThemeProvider,
  Tabs,
  Tab,
} from "@mui/material";
import NavBar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import TodayTab from "./TodayTab";
import ThisWeekTab from "./ThisWeekTab";
import PayPeriodTab from "./PayPeriodTab";

const theme = createTheme(); // Create a theme instance

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const { user } = useAuth();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const switchTabs = ["Today", "This Week", "Pay Period"];

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavBar toggleDrawer={toggleDrawer} />
        <main>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Avatar
              alt={user?.personal?.firstName}
              src={user?.personal?.firstName}
              sx={{
                width: 120,
                height: 120,
                marginBottom: "10px",
              }}
            />
            <Typography variant="h6">
              Welcome {user?.personal?.firstName}
            </Typography>
            <Typography variant="subtitle2" color={"green"}>
              {user?.position?.role}
            </Typography>
          </div>

          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {switchTabs.map((tabLabel, index) => (
              <Tab label={tabLabel} key={index} />
            ))}
          </Tabs>

          {currentTab === 0 && <TodayTab />}
          {currentTab === 1 && <ThisWeekTab />}
          {currentTab === 2 && <PayPeriodTab />}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
