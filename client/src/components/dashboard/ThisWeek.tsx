import React, { useContext, useEffect } from 'react';
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
  const daysToAdd = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // if it's Sunday, start from previous Monday
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysToAdd);
  const sunday = dayOfWeek === 0 ? today : new Date(today.getFullYear(), today.getMonth(), monday.getDate() + 6);
  const startFormatted = format(monday, 'EEE, dd MMM');
  const endFormatted = format(sunday, 'EEE, dd MMM');
  return `${startFormatted} - ${endFormatted}`;
};

const ThisWeek = () => {
  const { profileData } = useContext(ProfileContext);
  const { timesheetData, setTimesheetData, errors, setErrors } = useContext(TimesheetContext);
  const regularHours = 0 || timesheetData.days.reduce((acc, cur) => acc + cur.hoursWorked, 0);
  const overtimeHours = '' || timesheetData.days.reduce((acc, cur) => acc + cur.overtime, 0);
  const totalHours = 0 || regularHours + overtimeHours * 1.5;
  const progress = 0 || totalHours / 72;
  const weekRange = getCurrentWeekRange();
  const profileID = profileData._id;
  const timesheetID = '6404c80d44924e5b9decbcab';

  console.log(timesheetData);

  useEffect(() => {
    fetch('http://localhost:7079/timesheet/get-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ timesheetID })
    })
      .then((response) => response.json())
      .then((data) => {
        setTimesheetData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // handle overtime input
  const handleNestedInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [parentName, childName] = name.split('.');
    setTimesheetData((prevState) => ({
      ...prevState,
      days: prevState.days.map((day, index) => {
        if (index === 0) {
          return {
            ...day,
            [childName]: value
          };
        }
        return day;
      })
    }));
  };

  // get today date in format DD/MM/YYYY
  function getTodayDate(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async function postTodayData() {
    const timesheetData = {
      date: getTodayDate(),
      hoursWorked: 9,
      overtime: 0
    };
    try {
      const response = await fetch('http://localhost:7079/timesheet/add-day', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profileID, timesheetData })
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'An error occurred adding data.');
      }
      const timesheet = await response.json();
      console.log(timesheet);
      setTimesheetData(timesheet);
    } catch (error) {
      setErrors('Already signed in for today!');
      console.log(error);
    }
  }

  async function updateTodayData() {
    const updateData = {
      dayIndex: 0,
      hoursWorked: 9,
      overtime: timesheetData.days[0].overtime
    };
    try {
      const response = await fetch('http://localhost:7079/timesheet/update-day', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timesheetID, updateData })
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'An error occurred adding data.');
      }
      const timesheet = await response.json();
      console.log(timesheet);
      setTimesheetData(timesheet);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Stack style={{ textAlign: 'center', paddingTop: '1em', color: 'black' }}>
      {!errors ? (
        <Stack>
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
              name="days.overtime"
              value={timesheetData?.days[0]?.overtime || ''}
              onChange={handleNestedInputChange}
              InputProps={{
                style: { textAlign: 'center' },
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ backgroundColor: 'transparent', padding: '0', paddingRight: '0' }}
                  >
                    <IconButton type="submit" style={{ padding: 0 }} onClick={updateTodayData}>
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
        </Stack>
      ) : (
        <Typography style={{ padding: '1em', color: 'green', fontSize: '1.1em' }}>
          Already signed in for today!
        </Typography>
      )}
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
