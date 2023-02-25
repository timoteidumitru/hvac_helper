import React from 'react';
import { Box, CircularProgress, CircularProgressProps, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { Button } from '@material-ui/core';
import { Stack } from '@mui/material';

type MyCircularProgressProps = {
  value: number; // Progress value from 0 to 100
} & CircularProgressProps;

const LastMonth: React.FC<MyCircularProgressProps> = ({ value, ...props }) => {
  const progress = value / 72;
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const startDateString = startOfMonth.toLocaleDateString('en-UK', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const endDateString = endOfMonth.toLocaleDateString('en-UK', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const monthRangeString = `Current Month: ${startDateString} - ${endDateString}`;

  return (
    <Stack style={{ textAlign: 'center', paddingTop: '1em', color: 'black' }}>
      <Typography style={{ color: 'gray', paddingBottom: '1em' }}>{monthRangeString}</Typography>
      <Box style={{ position: 'relative', display: 'inline-block' }}>
        <CircularProgress
          variant="determinate"
          value={progress * 100}
          {...props}
          style={{ transform: 'rotate(90deg)' }}
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
          <span style={{ color: 'green', fontWeight: '600' }}>{value}h</span> <br />
          <span style={{ color: 'gray', fontWeight: '600' }}>of</span> <br />
          <span style={{ color: 'black', fontWeight: '600' }}>72hrs</span>
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
            <Typography>48</Typography>
          </Box>
        </Box>
        <Box width={'50%'}>
          <Box>
            <Typography>Overtime Hours</Typography>
          </Box>
          <Box>
            <Typography>6</Typography>
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
        <Typography>Total Hours: 57</Typography>
      </Box>
    </Stack>
  );
};

export default LastMonth;
