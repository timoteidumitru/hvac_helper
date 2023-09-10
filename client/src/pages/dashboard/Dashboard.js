import React, { useState } from "react";
import {
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
} from "@mui/material";
import NavBar from "../../components/navbar/Navbar";
import {
  Home as HomeIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"; // Import icons from Material-UI

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0); // Track the current tab index

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
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main>
        <Typography variant="h4" align="center">
          Welcome to the Dashboard
        </Typography>

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
            <Typography variant="h6">Content for Today</Typography>
          )}
          {currentTab === 1 && (
            <Typography variant="h6">Content for This Week</Typography>
          )}
          {currentTab === 2 && (
            <Typography variant="h6">Content for Pay Period</Typography>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
