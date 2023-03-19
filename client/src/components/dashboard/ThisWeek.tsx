import React, { useContext, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Box, CircularProgress, Typography, Button } from '@material-ui/core';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { format } from 'date-fns';
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

// get today date in format DD/MM/YYYY
function getTodayDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

const ThisWeek = () => {
  const { profileData } = useContext(ProfileContext);
  const { timesheetData, setTimesheetData, errors, setErrors } = useContext(TimesheetContext);
  const regularHours = 0 || timesheetData.days.reduce((acc, cur) => acc + cur.hoursWorked, 0);
  const overtimeHours = 0 || timesheetData.days.reduce((acc, cur) => acc + cur.overtime, 0);
  const totalHours = 0 || regularHours + overtimeHours * 1.5;
  const progress = 0 || totalHours / 72;
  const weekRange = getCurrentWeekRange();
  const todayDay = getTodayDate();
  const profileID = profileData._id;
  const timesheetID = '6404c80d44924e5b9decbcab';

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
    const lastDayIndex = timesheetData.days.length - 1;
    setTimesheetData((prevState) => ({
      ...prevState,
      days: prevState.days.map((day, index) => {
        if (index === lastDayIndex) {
          return {
            ...day,
            [childName]: value
          };
        }
        return day;
      })
    }));
  };

  // send todayData to DB
  async function postTodayData() {
    const todayData = {
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
        body: JSON.stringify({ profileID, timesheetData: todayData })
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

  async function cancelTodayCheck() {
    const date = getTodayDate();
    try {
      const response = await fetch('http://localhost:7079/timesheet/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timesheetID, date })
      });
      const data = await response.json();
      setTimesheetData(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateTodayData() {
    const lastDayIndex = timesheetData.days.length - 1;
    const lastDay = timesheetData.days[lastDayIndex];
    const updateData = {
      dayIndex: lastDayIndex,
      hoursWorked: timesheetData.days[lastDayIndex].hoursWorked,
      overtime: timesheetData.days[lastDayIndex].overtime
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
      // Update the last day in the days array with the updated data
      const updatedDays = [...timesheetData.days];
      updatedDays[lastDayIndex] = { ...lastDay, ...updateData };
      setTimesheetData({ ...timesheetData, days: updatedDays });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Stack style={{ textAlign: 'center', padding: '1em 0', color: 'black' }}>
      {!errors ? (
        <Stack style={{ padding: '1em 0' }}>
          <Box>
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
              <Button
                style={{ backgroundColor: 'red', color: 'white', padding: '0.4em 2.4em', fontWeight: '600' }}
                onClick={cancelTodayCheck}
              >
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
          </Box>
          {timesheetData?.days.at(-1)?.date === todayDay && (
            <Box>
              <TextField
                name="days.overtime"
                value={timesheetData?.days.at(-1)?.overtime || ''}
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
          )}
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
