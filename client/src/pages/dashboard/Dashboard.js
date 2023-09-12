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
  Button,
  createTheme,
  ThemeProvider,
  TextField,
  Grid,
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

const theme = createTheme(); // Create a theme instance

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0); // Track the current tab index
  const [clockedIn, setClockedIn] = useState(false); // Track clock in/out state
  const { user } = useAuth(); // Access the login function and user data
  let [progressValue, setProgressValue] = useState({
    daily: 9,
    weekly: 32,
    payCheck: 72,
  }); // Set the initial progress value here
  const [overtimeHours, setOvertimeHours] = useState(0); // State for overtime hours input

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

  // Function to handle clock in/out button click
  const handleClockInOut = () => {
    // Add 9 to progressValue if clocked in, subtract 9 if clocked out
    setProgressValue(clockedIn ? progressValue - 9 : progressValue + 9);
    setClockedIn(!clockedIn);
  };

  // Function to handle overtime submission
  const handleSubmitOvertime = () => {
    const overtimeValue = parseFloat(overtimeHours);
    if (!isNaN(overtimeValue)) {
      // Check if the entered value is a valid number
      const updatedProgressValue = progressValue + overtimeValue * 1.5;
      setProgressValue(updatedProgressValue);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
              src={user?.avatarUrl}
              sx={{
                width: 120,
                height: 120,
                marginBottom: "10px",
              }}
            />
            <Typography variant="h6">
              Welcome {user?.fullName.split(" ")[0]}
            </Typography>
            <Typography variant="subtitle2" color={"green"}>
              Admin
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

          <div style={{ textAlign: "center" }}>
            {currentTab === 0 && (
              <div>
                <CircularProgress progressValue={progressValue.daily} />
                <Button
                  variant="contained"
                  color={clockedIn ? "secondary" : "primary"}
                  size="large"
                  onClick={handleClockInOut}
                  style={{ marginTop: "20px" }}
                >
                  {clockedIn ? "Clock Out" : "Clock In"}
                </Button>
                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      label="Overtime hours"
                      variant="outlined"
                      fullWidth
                      value={overtimeHours}
                      onChange={(e) => setOvertimeHours(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleSubmitOvertime}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
            {currentTab === 1 && (
              <div>
                <CircularProgress progressValue={progressValue.weekly} />
              </div>
            )}
            {currentTab === 2 && (
              <div>
                <CircularProgress progressValue={progressValue.payCheck} />
              </div>
            )}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
