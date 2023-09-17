import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Home as HomeIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const Menu = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Work", icon: <WorkIcon /> },
    { label: "Calendar", icon: <CalendarIcon /> },
    { label: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose} variant="temporary">
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Menu;
