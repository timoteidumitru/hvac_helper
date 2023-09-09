import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography, // Add Typography
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
    },
    {
      label: "Work",
      icon: <WorkIcon />,
    },
    {
      label: "Calendar",
      icon: <CalendarIcon />,
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleToggleDrawer}
              edge="start"
              style={{ fontSize: "32px", fontWeight: "700" }}
            >
              {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          {/* Display the current route */}
          <Typography variant="h6" align="center" color="white">
            {location.pathname.split("/")[1].toUpperCase()}
          </Typography>
          {user ? (
            <div>
              <IconButton
                color="inherit"
                aria-label="user menu"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleAvatarClick}
                style={{ width: "42px", height: "42px" }}
              >
                <Avatar
                  src={user.avatarUrl}
                  alt={user.fullName}
                  style={{ width: "100%", height: "100%" }}
                />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
                <MenuItem onClick={handleMenuClose}>Messages</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleToggleDrawer}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                handleToggleDrawer();
                navigate(item.route);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
