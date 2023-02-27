import React, { useState, useEffect } from 'react';
import { Typography, ListItem, ListItemIcon, ListItemText, Box, CircularProgress } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import { format } from 'date-fns';
import { Stack } from '@mui/system';

type Day = {
  date: Date;
  dayOfWeek: string;
};

const getFirstWeekRange = () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8);
  const startFormatted = format(startDate, 'dd MMM');
  const endFormatted = format(endDate, 'dd MMM');
  return `${startFormatted} - ${endFormatted}`;
};

const getSecondtWeekRange = () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 6);
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  const startFormatted = format(startDate, 'dd MMM');
  const endFormatted = format(endDate, 'dd MMM');
  return `${startFormatted} - ${endFormatted}`;
};

const TwoWeeks = () => {
  const [days, setDays] = useState<Day[]>([]);
  const weekOne = getFirstWeekRange();
  const weekTwo = getSecondtWeekRange();
  const value = 104;
  const progress = value / 150;
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startPeriod = format(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek + 1 - 14),
    'dd MMM'
  );
  const endPeriod = format(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), 'dd MMM');

  useEffect(() => {
    let startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
    // Loop through the next 14 days
    const newDays: Day[] = [];
    for (let i = 0; i < 14; i++) {
      // Add the current date to the list of days
      newDays.push({
        date: startDate,
        dayOfWeek: startDate.toLocaleDateString('en-UK', { weekday: 'long' })
      });

      // Increment the current date by one day
      startDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
    }

    // Update the state with the new list of days
    setDays(newDays);
  }, []);

  return (
    <Stack style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', paddingTop: '1em' }}>
      <Typography style={{ color: 'gray', paddingBottom: '1em' }}>
        Current Period: {startPeriod} - {endPeriod}
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
        {weekOne} {'=>'} 59hrs
      </Typography>
      {days.map(
        (day, idx) =>
          idx < 7 && (
            <div key={day.date.toISOString()}>
              <ListItem>
                <ListItemText primary={`${day.dayOfWeek}, ${day.date.toLocaleDateString()}`} disableTypography />
                <ListItemIcon>{day.dayOfWeek.startsWith('Su') ? 'off' : '9hrs'}</ListItemIcon>
              </ListItem>
              <Divider />
            </div>
          )
      )}
      <Typography style={{ fontSize: '1.2em', padding: '0.5em 0 0.1em 0.5em' }}>
        {weekTwo} {'=>'} 45hrs
      </Typography>
      {days.map(
        (day, idx) =>
          idx > 6 && (
            <div key={day.date.toISOString()}>
              <ListItem>
                <ListItemText primary={`${day.dayOfWeek}, ${day.date.toLocaleDateString()}`} disableTypography />
                <ListItemIcon>{day.dayOfWeek.startsWith('S') ? 'off' : '9hrs'}</ListItemIcon>
              </ListItem>
              <Divider />
            </div>
          )
      )}
    </Stack>
  );
};

export default TwoWeeks;
