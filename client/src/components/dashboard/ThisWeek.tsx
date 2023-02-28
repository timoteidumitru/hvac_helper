import React, { useContext, useState } from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { Button } from '@material-ui/core';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { ProfileContext } from '../../contexts/ProfileContext';

const getCurrentWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek + 1);
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - dayOfWeek));
  const startFormatted = format(startDate, 'dd MMM');
  const endFormatted = format(endDate, 'dd MMM');
  return `${startFormatted} - ${endFormatted}`;
};

const ThisWeek = () => {
  const { profileData } = useContext(ProfileContext);
  const [todayData, setTodayData] = useState({ today: { normalHours: 0, overtime: 0 } });
  const value = 34;
  const progress = value / 72;
  const weekRange = getCurrentWeekRange();
  const profileID = profileData.userId;

  function postTodayData() {
    fetch('http://localhost:7079/timesheet/today', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileID, todayData })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

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
          marginBottom: '0',
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
          onClick={postTodayData}
        >
          Yes
        </Button>
      </Box>
      <Box>
        <TextField
          name="overtime"
          InputProps={{
            style: { textAlign: 'center' },
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ backgroundColor: 'transparent', padding: '0', paddingRight: '0' }}
              >
                <IconButton type="submit" style={{ padding: 0 }}>
                  <CheckIcon style={{ cursor: 'pointer' }} />
                </IconButton>
              </InputAdornment>
            )
          }}
          label="Any overtime to add? "
          variant="standard"
          sx={{ width: '50%', marginBottom: '1em' }}
        />
      </Box>
      <Typography style={{ color: 'gray', paddingBottom: '1em' }}>Current Week: {weekRange}</Typography>
      <Box style={{ position: 'relative', display: 'inline-block' }}>
        <CircularProgress
          variant="determinate"
          value={progress * 100}
          style={{ transform: 'rotate(90deg)', color: value < 46 ? 'green' : value > 60 ? 'red' : 'orange' }}
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
          <span style={{ color: value < 46 ? 'green' : value > 60 ? 'red' : 'orange', fontWeight: '600' }}>
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
            <Typography>27</Typography>
          </Box>
        </Box>
        <Box width={'50%'}>
          <Box>
            <Typography>Overtime Hours</Typography>
          </Box>
          <Box>
            <Typography>5</Typography>
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

export default ThisWeek;
