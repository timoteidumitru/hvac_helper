import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';

function getCurrentYearDates() {
  const now = new Date();
  const year = now.getFullYear();
  const firstDay = new Date(year, 0, 1);
  const lastDay = new Date(year, 11, 31);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const startDate = firstDay.toLocaleDateString('en-US', options);
  const endDate = lastDay.toLocaleDateString('en-US', options);
  return { startDate, endDate };
}

const LastYear = () => {
  const value = 2310;
  const progress = value / 3000;
  const { startDate, endDate } = getCurrentYearDates();

  const monthRangeString = `Current Month: ${startDate} - ${endDate}`;

  return (
    <Stack style={{ textAlign: 'center', paddingTop: '1em', color: 'black' }}>
      <Typography style={{ color: 'gray', paddingBottom: '1em' }}>{monthRangeString}</Typography>
      <Box style={{ position: 'relative', display: 'inline-block' }}>
        <CircularProgress
          variant="determinate"
          value={progress * 100}
          style={{ transform: 'rotate(90deg)', color: value < 2128 ? 'green' : value > 2600 ? 'red' : 'orange' }}
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
          <span style={{ fontWeight: '600', color: value < 2128 ? 'green' : value > 2600 ? 'red' : 'orange' }}>
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
            <Typography>2010</Typography>
          </Box>
        </Box>
        <Box width={'50%'}>
          <Box>
            <Typography>Overtime Hours</Typography>
          </Box>
          <Box>
            <Typography>200</Typography>
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

export default LastYear;
