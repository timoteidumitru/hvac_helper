import React, { useContext, useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { Button } from '@material-ui/core';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { ProfileContext } from '../../contexts/ProfileContext';
import { TimesheetContext } from '../../contexts/TimesheetContext';

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
  const { timesheetData, setTimesheetData } = useContext(TimesheetContext);
  const regularHours = 0;
  const overtimeHours = 0;
  const totalHours = 0 || regularHours + overtimeHours * 1.5;
  const progress = 0 || totalHours / 72;
  const weekRange = getCurrentWeekRange();
  const profileID = profileData._id;
  const timesheetID = '6403b382d7bb8a32ccdd9a93';

  console.log(timesheetData);

  useEffect(() => {
    const timesheetData = {
      days: [],
      dueDate: '05/03/2023',
      period: '20/02/2023 - 05/03/2023',
      project: 'Bain Capital',
      comments: 'HVAC services on all 6 floors'
    };
    fetch('http://localhost:7079/timesheet/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        profileID,
        timesheetData
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setTimesheetData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // console.log(timesheetData);

  function postTodayData() {
    console.log('day added');
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
          style={{ transform: 'rotate(90deg)', color: totalHours < 46 ? 'green' : totalHours > 60 ? 'red' : 'orange' }}
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
          <span style={{ color: totalHours < 46 ? 'green' : totalHours > 60 ? 'red' : 'orange', fontWeight: '600' }}>
            {totalHours}h
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
            <Typography>{regularHours}</Typography>
          </Box>
        </Box>
        <Box width={'50%'}>
          <Box>
            <Typography>Overtime Hours</Typography>
          </Box>
          <Box>
            <Typography>{overtimeHours}</Typography>
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
        <Typography>Total Hours: {totalHours}</Typography>
      </Box>
    </Stack>
  );
};

export default ThisWeek;
