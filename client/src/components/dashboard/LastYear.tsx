import React from 'react';
import { Box, CircularProgress, CircularProgressProps, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { Button } from '@material-ui/core';

type MyCircularProgressProps = {
  value: number; // Progress value from 0 to 100
} & CircularProgressProps;

const getCurrentWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek + 1);
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - dayOfWeek));
  const startFormatted = format(startDate, 'dd MMM');
  const endFormatted = format(endDate, 'dd MMM');
  return `${startFormatted} - ${endFormatted}`;
};

const LastYear: React.FC<MyCircularProgressProps> = ({ value, ...props }) => {
  const progress = value / 72;
  const weekRange = getCurrentWeekRange();

  return (
    <Box style={{ textAlign: 'center', paddingTop: '1em', color: 'black' }}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          margin: '1em'
        }}
      >
        <Button style={{ backgroundColor: 'red', color: 'white', padding: '0.4em 2.4em', fontWeight: '600' }}>
          Off
        </Button>
        <Button
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '0.4em 2.4em',
            fontWeight: '600',
            fontSize: '1.02em'
          }}
        >
          In
        </Button>
      </Box>
      <Typography style={{ color: 'gray', paddingBottom: '1em' }}>Current Week: {weekRange}</Typography>
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
        <Box width={'33.3%'}>
          <Box width={'50%'}>
            <Typography>Regular Hours</Typography>
          </Box>
          <Box width={'50%'}>
            <Typography>48</Typography>
          </Box>
        </Box>
        <Box width={'33.3%'}>
          <Box width={'50%'}>
            <Typography>Overtime Hours</Typography>
          </Box>
          <Box width={'50%'}>
            <Typography>6</Typography>
          </Box>
        </Box>
        <Box width={'33.3%'}>
          <Box width={'50%'}>
            <Typography>Total Hours</Typography>
          </Box>
          <Box width={'50%'}>
            <Typography>57</Typography>
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
    </Box>
  );
};

export default LastYear;
