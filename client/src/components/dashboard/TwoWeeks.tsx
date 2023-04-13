import React, { useContext } from 'react';
import { Typography, ListItem, ListItemIcon, ListItemText, Box, CircularProgress } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/system';
import { TimesheetContext } from '../../contexts/TimesheetContext';

function formatDate(dateStr: string) {
  const [day, month, year] = dateStr.split('/');
  const dateObj = new Date(`${month}/${day}/${year}`);
  const formattedDate = dateObj.toLocaleDateString('en-UK', { weekday: 'short', day: 'numeric', month: 'short' });
  return formattedDate;
}

function getWeekDays() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const currentDay = today.getDay() === 0 ? 6 : today.getDay();
  const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - currentDay);
  const previousWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - currentDay - 7);
  const weekOne = [];
  const weekTwo = [];

  // Add current week days to array
  for (let i = 0; i < 7; i++) {
    const day = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() + i);
    weekOne.push(`${day.toLocaleString('default', { weekday: 'short', day: 'numeric', month: 'short' })}`);
  }

  // Add previous week days to array
  for (let i = 0; i < 7; i++) {
    const day = new Date(
      previousWeekStart.getFullYear(),
      previousWeekStart.getMonth(),
      previousWeekStart.getDate() + i
    );
    weekTwo.push(`${day.toLocaleString('default', { weekday: 'short', day: 'numeric', month: 'short' })}`);
  }

  return { weekOne, weekTwo };
}

const TwoWeeks = () => {
  const { timesheetData } = useContext(TimesheetContext);
  const value = 104;
  const progress = value / 150;

  const { weekOne, weekTwo } = getWeekDays();
  // console.log(weekOne, weekTwo);

  const firstWeek = timesheetData?.data?.slice() || {};
  const secondWeek = timesheetData?.data?.slice() || {};

  // const totalFirstWeek =
  //   timesheetData?.data[0]?.days?.reduce((acc, cur) => {
  //     const normal = acc + cur.hoursWorked;
  //     return normal;
  //   }, 0) +
  //   timesheetData.data.reduce((acc, cur) => {
  //     let overtime = acc + cur.overtime * 1.5;
  //     return overtime;
  //   }, 0);
  // const totalSecondWeek =
  //   timesheetData.data.reduce((acc, cur) => {
  //     const normal = acc + cur.hoursWorked;
  //     return normal;
  //   }, 0) +
  //   timesheetData.data.reduce((acc, cur) => {
  //     let overtime = acc + cur.overtime * 1.5;
  //     return overtime;
  //   }, 0);

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
      <Box>
        <Typography style={{ fontSize: '1.2em', padding: '0.5em 0 0.1em 0.5em' }}>
          {weekTwo[0]} - {weekTwo[6]} {'->'} `totalSecondWeek`hrs
        </Typography>
        {/* {firstWeek.map((day, idx) => (
          <div key={idx}>
            <ListItem>
              <ListItemText>{formatDate(day.date)}</ListItemText>
              <ListItemIcon>
                {day.hoursWorked}hrs(+{day.overtime})
              </ListItemIcon>
            </ListItem>
            <Divider />
          </div>
        ))}
        <Typography style={{ fontSize: '1.2em', padding: '0.5em 0 0.1em 0.5em' }}>
          {weekOne[0]} - {weekOne[6]} {'->'} {totalFirstWeek}hrs
        </Typography>
        {secondWeek.map((day, idx) => (
          <div key={idx}>
            <ListItem>
              <ListItemText>{formatDate(day.date)}</ListItemText>
              <ListItemIcon>
                {day.hoursWorked}hrs(+{day.overtime})
              </ListItemIcon>
            </ListItem>
            <Divider />
          </div>
        ))} */}
      </Box>
    </Stack>
  );
};

export default TwoWeeks;
