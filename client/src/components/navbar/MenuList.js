import React from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import {
  Home as HomeIcon,
  ShoppingCart as OrdersIcon, // Use ShoppingCart icon for "Orders"
  Schedule as TimesheetIcon, // Use Schedule icon for "Timesheet"
  LocalShipping as DeliveryIcon, // Use LocalShipping icon for "Delivery"
  Dashboard as DashboardIcon, // Use Dashboard icon for "Dashboard"
} from "@mui/icons-material";

const MenuList = ({ navigate }) => {
  const menuItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
      route: "/",
    },
    {
      label: "Dashboard",
      icon: <DashboardIcon />, // Use Dashboard icon for "Dashboard"
      route: "/dashboard",
    },
    {
      label: "Delivery",
      icon: <DeliveryIcon />, // Use LocalShipping icon for "Delivery"
      route: "/delivery",
    },
    {
      label: "Orders",
      icon: <OrdersIcon />, // Use ShoppingCart icon for "Orders"
      route: "/orders",
    },
    {
      label: "Timesheet",
      icon: <TimesheetIcon />, // Use Schedule icon for "Timesheet"
      route: "/timesheet",
    },
  ];

  return (
    <List>
      {menuItems.map((item, index) => (
        <ListItem
          key={index}
          onClick={() => {
            navigate(item.route);
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;
