import React, { useState } from "react";
import {
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
import NavBar from "../../components/navbar/Navbar";
import {
  Home as HomeIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"; // Import icons from Material-UI

const Dashboard = () => {
  const classes = useStyles();
  const { user } = useAuth(); // Access the user data and logout function from the context
  const [activeTab, setActiveTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Work", icon: <WorkIcon /> },
    { label: "Calendar", icon: <CalendarIcon /> },
    { label: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <div className={classes.dashboardContainer}>
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
      <main className={classes.content}>
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
                style={classes.centeredTabs}
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
      </main>
    </div>
  );
};

export default Dashboard;

const useStyles = () => ({
  dashboardContainer: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: "20px",
  },
  centeredTabs: {
    display: "flex",
    justifyContent: "space-around",
  },
});
