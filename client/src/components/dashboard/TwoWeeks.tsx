import React from 'react';
import { Typography, ListItem, ListItemIcon, ListItemText, Box, CircularProgress } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/system';

const TwoWeeks = () => {
  const value = 104;
  const progress = value / 150;
  const today = new Date();
  const startOfCurrentWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
  const startOfPreviousWeek = new Date(
    startOfCurrentWeek.getFullYear(),
    startOfCurrentWeek.getMonth(),
    startOfCurrentWeek.getDate() - 7
  );
  const daysUntilSunday = 7 - today.getDay();
  const endOfCurrentWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilSunday);
  const twoWeekDays = [];
  const weekOne = [];
  const weekTwo = [];

  // Loop through the dates for the previous week and add them to the array
  for (let date = startOfPreviousWeek; date < startOfCurrentWeek; date.setDate(date.getDate() + 1)) {
    twoWeekDays.push(new Date(date));
    weekTwo.push(new Date(date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }));
  }

  // Loop through the dates for the current week and add them to the array
  for (let date = startOfCurrentWeek; date <= endOfCurrentWeek; date.setDate(date.getDate() + 1)) {
    twoWeekDays.push(new Date(date));
    weekOne.push(new Date(date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }));
  }

  return (
    <Stack style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', paddingTop: '1em' }}>
      <Typography style={{ color: 'gray', paddingBottom: '1em' }}>
        Current Period: {weekTwo[0]} - {weekOne[6]}
      </Typography>
      <Box style={{ position: 'relative', display: 'inline-block' }}>
        <CircularProgress
          variant="determinate"
          value={progress * 100}
          style={{ transform: 'rotate(90deg)', color: value < 91 ? 'green' : value > 110 ? 'red' : 'orange' }}
          thickness={3}
          size={120}
        />
        <Typography
          variant="h6"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <span style={{ color: value < 91 ? 'green' : value > 110 ? 'red' : 'orange', fontWeight: '600' }}>
            {value}h
          </span>{' '}
        </Typography>
      </Box>
      <Box
        width="100%"
        style={{
          backgroundColor: 'lightgray',
          display: 'flex',
          justifyContent: 'space-around',
          margin: '0.5em 0.5em 0',
          borderRadius: '5px 5px 0 0'
        }}
      >
        <Box width={'50%'}>
          <Box>
            <Typography>Regular Hours</Typography>
          </Box>
          <Box>
            <Typography>89</Typography>
          </Box>
        </Box>
        <Box width={'50%'}>
          <Box>
            <Typography>Overtime Hours</Typography>
          </Box>
          <Box>
            <Typography>10</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        width={'100%'}
        style={{
          backgroundColor: 'lightgray',
          margin: '0 0.5em 1em 0.5em',
          borderRadius: '0 0 5px 5px',
          paddingTop: '1em'
        }}
      >
        <Typography>Total Hours: {value}</Typography>
      </Box>
      <Typography style={{ fontSize: '1.2em', padding: '0.5em 0 0.1em 0.5em' }}>
        {weekOne[0]} - {weekOne[6]} {'=>'} 59hrs
      </Typography>
      {weekOne.map((day, idx) => (
        <div key={idx}>
          <ListItem>
            <ListItemText primary={day} disableTypography />
            <ListItemIcon>{day.startsWith('Su') ? 'off' : '9hrs'}</ListItemIcon>
          </ListItem>
          <Divider />
        </div>
      ))}
      <Typography style={{ fontSize: '1.2em', padding: '0.5em 0 0.1em 0.5em' }}>
        {weekTwo[0]} - {weekTwo[6]} {'=>'} 45hrs
      </Typography>
      {weekTwo.map((day, idx) => (
        <div key={idx}>
          <ListItem>
            <ListItemText primary={day} disableTypography />
            <ListItemIcon>{day.startsWith('S') ? 'off' : '9hrs'}</ListItemIcon>
          </ListItem>
          <Divider />
        </div>
      ))}
    </Stack>
  );
};

export default TwoWeeks;
