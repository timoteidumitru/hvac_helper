import React, { useState, useEffect } from 'react';
import { Typography, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CheckIcon from '@mui/icons-material/Check';

type Day = {
  date: Date;
  dayOfWeek: string;
};

type TwoWeeksProps = {
  startDate: Date;
};

const TwoWeeks: React.FC<TwoWeeksProps> = ({ startDate }) => {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    // Get the start date and clone it
    let currentDate = new Date(startDate.getTime());

    // Loop through the next 14 days
    const newDays: Day[] = [];
    for (let i = 0; i < 14; i++) {
      // Add the current date to the list of days
      newDays.push({
        date: currentDate,
        dayOfWeek: currentDate.toLocaleDateString('en-US', { weekday: 'long' })
      });

      // Increment the current date by one day
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }

    // Update the state with the new list of days
    setDays(newDays);
  }, [startDate]);

  console.log(days);

  return (
    <div style={{ backgroundColor: 'white', color: 'black', padding: 0 }}>
      <Typography variant="h6">Last Two Weeks: </Typography>
      {days.map((day, idx) =>
        idx < 7 ? (
          <ListItem key={day.date.toISOString()}>
            <ListItemText primary={`${day.dayOfWeek}, ${day.date.toLocaleDateString()}`} disableTypography />
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
          </ListItem>
        ) : (
          <ListItem key={day.date.toISOString()}>
            <ListItemText primary={`${day.dayOfWeek}, ${day.date.toLocaleDateString()}`} disableTypography />
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
          </ListItem>
        )
      )}
    </div>
  );
};

export default TwoWeeks;
