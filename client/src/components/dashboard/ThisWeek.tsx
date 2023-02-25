import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { Button } from '@material-ui/core';
import { Stack } from '@mui/material';

type MyCircularProgressProps = {
  value: number;
  color?: string;
};

const getCurrentWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek + 1);
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - dayOfWeek));
  const startFormatted = format(startDate, 'dd MMM');
  const endFormatted = format(endDate, 'dd MMM');
  return `${startFormatted} - ${endFormatted}`;
};

const ThisWeek: React.FC<MyCircularProgressProps> = ({ value }) => {
  const progress = value / 72;
  const weekRange = getCurrentWeekRange();

  return (
    <Stack style={{ textAlign: 'center', paddingTop: '1em', color: 'black' }}>
      <Typography>Are you IN today?</Typography>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          margin: '1em',
          fontSize: '1.02em'
        }}
      >
        <Button style={{ backgroundColor: 'red', color: 'white', padding: '0.4em 2.4em', fontWeight: '600' }}>
          No
        </Button>
        <Button
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '0.4em 2.4em',
            fontWeight: '600'
          }}
        >
          Yes
        </Button>
      </Box>
      <Typography style={{ color: 'gray', paddingBottom: '1em' }}>Current Week: {weekRange}</Typography>
      <Box style={{ position: 'relative', display: 'inline-block' }}>
        <CircularProgress
          variant="determinate"
          value={progress * 100}
          style={{ transform: 'rotate(90deg)', color: value < 46 ? 'green' : value > 65 ? 'red' : 'orange' }}
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
          <span style={{ color: value < 46 ? 'green' : value > 65 ? 'red' : 'orange', fontWeight: '600' }}>
            {value}h
          </span>{' '}
          <br />
          <span style={{ color: value < 46 ? 'green' : value > 65 ? 'red' : 'orange', fontWeight: '600' }}>
            of
          </span>{' '}
          <br />
          <span style={{ color: value < 46 ? 'green' : value > 65 ? 'red' : 'orange', fontWeight: '600' }}>72hrs</span>
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

export default ThisWeek;
