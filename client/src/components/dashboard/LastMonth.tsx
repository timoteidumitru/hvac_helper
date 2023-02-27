import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';

function getCurrentMonthDates() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  const startDate = firstDay.toLocaleDateString('en-UK', options);
  const endDate = lastDay.toLocaleDateString('en-UK', options);
  return { startDate, endDate };
}

const LastMonth = () => {
  const value = 210;
  const progress = value / 250;
  const { startDate, endDate } = getCurrentMonthDates();

  const monthRangeString = `Current Month: ${startDate} - ${endDate}`;

  return (
    <Stack style={{ textAlign: 'center', paddingTop: '1em', color: 'black' }}>
      <Typography style={{ color: 'gray', paddingBottom: '1em' }}>{monthRangeString}</Typography>
      <Box style={{ position: 'relative', display: 'inline-block' }}>
        <CircularProgress
          variant="determinate"
          value={progress * 100}
          style={{ transform: 'rotate(90deg)', color: value < 181 ? 'green' : value > 215 ? 'red' : 'orange' }}
          thickness={3}
          size={140}
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
          <span style={{ fontWeight: '600', color: value < 181 ? 'green' : value > 215 ? 'red' : 'orange' }}>
            {value}hrs
          </span>
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
            <Typography>192</Typography>
          </Box>
        </Box>
        <Box width={'50%'}>
          <Box>
            <Typography>Overtime Hours</Typography>
          </Box>
          <Box>
            <Typography>12</Typography>
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
    </Stack>
  );
};

export default LastMonth;
