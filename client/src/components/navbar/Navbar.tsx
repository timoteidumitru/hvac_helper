import React, { useContext } from 'react';
import './navbar.scss';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../contexts/ProfileContext';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

export default function Navbar() {
  const { profileData, showProfile, setShowProfile } = useContext(ProfileContext);
  const isUserLoggedIn: string | null = localStorage.getItem('loginData');
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOff = () => {
    localStorage.removeItem('loginData');
    setTimeout(() => {
      navigate('/');
      setOpen(false);
    }, 400);
  };
  return (
    <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ mr: 0, ...(open && { display: 'none' }) }}>
            <p style={{ textTransform: 'capitalize' }}>
              {window.location.pathname.replace('/', '').replace('-', ' ') === 'dashboard'
                ? ''
                : window.location.pathname.replace('/', '').replace('-', ' ')}{' '}
            </p>
          </Typography>
          {isUserLoggedIn ? (
            <div style={{ display: 'flex', cursor: 'pointer' }} onClick={() => setShowProfile(!showProfile)}>
              {profileData.name.split(' ')[0]}&nbsp;
              <AccountCircleIcon />
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', alignItems: 'center', display: 'flex', color: 'white' }}>
              Login&nbsp;
              <AccountCircleIcon />
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ justifyContent: 'space-between' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <IconButton color="inherit" edge="start" onClick={handleLogOff}>
            <SettingsPowerIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItemButton onClick={handleDrawerClose}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} />
              </ListItemButton>
            </Link>
            <Divider />
          </ListItem>
          <ListItem disablePadding>
            <Link to="/timesheet" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItemButton onClick={handleDrawerClose}>
                <ListItemIcon>
                  <EventAvailableIcon />
                </ListItemIcon>
                <ListItemText primary={'Timesheet'} />
              </ListItemButton>
            </Link>
            <Divider />
          </ListItem>
          <ListItem disablePadding>
            <Link to="/order-list" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItemButton onClick={handleDrawerClose}>
                <ListItemIcon>
                  <FactCheckIcon />
                </ListItemIcon>
                <ListItemText primary={'Order List'} />
              </ListItemButton>
            </Link>
            <Divider />
          </ListItem>
          <ListItem disablePadding>
            <Link to="/delivery-list" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItemButton onClick={handleDrawerClose}>
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary={'Delivery List'} />
              </ListItemButton>
            </Link>
            <Divider />
          </ListItem>
        </List>
      </Drawer>
      <Main
        open={false}
        onClick={handleDrawerClose}
        sx={{
          padding: '0',
          ...(open && { backgroundColor: 'rgba(0,0,0, 0.66)' })
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
