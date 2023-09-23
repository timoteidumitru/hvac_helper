import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Button,
  Drawer,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import MenuList from "./MenuList"; // Import the MenuList component

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
                <MenuItem onClick={() => navigate("/account")}>
                  My Account
                </MenuItem>
                <MenuItem onClick={() => navigate("/messages")}>
                  Messages
                </MenuItem>
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
        {/* Use the MenuList component */}
        <MenuList navigate={navigate} />
      </Drawer>
    </>
  );
};

export default NavBar;
