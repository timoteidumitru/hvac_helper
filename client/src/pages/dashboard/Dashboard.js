import React, { useState } from "react";
import "../../App.css";
import {
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import NavBar from "../../components/navbar/Navbar";
import {
  Home as HomeIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"; // Import icons from Material-UI
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
import CircularProgress from "./CircularProgressBar"; // Import the new circular progress bar component

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0); // Track the current tab index
  const { user } = useAuth(); // Access the login function and user data
  const progressValue = 38; // Set the desired progress value here

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Work", icon: <WorkIcon /> },
    { label: "Calendar", icon: <CalendarIcon /> },
    { label: "Settings", icon: <SettingsIcon /> },
  ];

  const switchTabs = ["Today", "This Week", "Pay Period"];

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div>
      <NavBar toggleDrawer={toggleDrawer} />
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main>
        {/* User Avatar and Welcome Text */}
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
            alt={user?.fullName.split(" ")[0]}
            src={user?.avatarUrl} // Replace with the actual user's avatar URL
            sx={{
              width: 100,
              height: 100,
              marginBottom: "5px",
            }}
          />
          <Typography variant="h6">
            Welcome {user?.fullName.split(" ")[0]}
          </Typography>
          <Typography variant="subtitle2" color={"green"}>
            Admin
          </Typography>
        </div>

        {/* Switch Tabs */}
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

        {/* Content for the selected tab */}
        <div>
          {/* You can add content specific to each tab here */}
          {currentTab === 0 && (
            <CircularProgress progressValue={progressValue} />
          )}
          {currentTab === 1 && (
            <CircularProgress progressValue={progressValue} />
          )}
          {currentTab === 2 && (
            <CircularProgress progressValue={progressValue} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
