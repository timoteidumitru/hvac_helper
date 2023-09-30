import React, { useState, useEffect } from "react";
import { Typography, Grid, Button, Box, TextField } from "@mui/material";
import jwt_decode from "jwt-decode";
import CircularProgress from "./CircularProgressBar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTimesheet } from "../../context/TimesheetProvider";
import { useAuth } from "../../context/AuthContext";

const TodayTab = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [progressValue, setProgressValue] = useState(0); // Initialize progressValue as 0
  const [overtimeHours, setOvertimeHours] = useState(0);

  const { updateTimesheetEntry, postTimesheet, getTimesheet, timesheet } =
    useTimesheet();
  const { token } = useAuth();

  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const currentSite = "70 Chancery Lane";
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Fetch the timesheet data for the current user
    getTimesheet(userId);
  }, [userId]);

  useEffect(() => {
    // Check if there's an existing entry for the current date
    if (timesheet) {
      const entryForToday = timesheet.find(
        (entry) => entry.date === currentDate
      );

      if (entryForToday) {
        // User is already clocked in, so update progressValue with the existing data
        setProgressValue(
          entryForToday.hoursWorked + entryForToday.overtimeHours || 0
        ); // Use the hoursWorked value or set to 0 if undefined
        setClockedIn(true);
      }
    }
  }, [timesheet, currentDate]);

  const handleClockInOut = () => {
    // If clocked in, update the existing entry; otherwise, create a new entry
    const newHoursWorked = progressValue + parseFloat(overtimeHours) || 9; // Initialize as 9

    if (clockedIn) {
      // Find an existing entry for the current date
      const entryForToday = timesheet.find((entry) => {
        const entryDate = new Date(entry.date);
        const today = new Date();
        return (
          entryDate.getDate() === today.getDate() &&
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getFullYear() === today.getFullYear()
        );
      });

      if (entryForToday) {
        // Update the existing entry for the current date
        updateTimesheetEntry(
          userId,
          entryForToday.date, // Use the date from the found entry
          newHoursWorked,
          overtimeHours,
          currentSite
        );
      } else {
        console.error("No matching entry found for the current date.");
      }
    } else {
      // Clock in and create a new entry
      setClockedIn(true);

      // Check if there's already an entry for the current date, if not, create a new one
      if (!timesheet) {
        console.error("Timesheet data is undefined.");
        return;
      }

      const entryForToday = timesheet.find((entry) => {
        const entryDate = new Date(entry.date);
        const today = new Date();
        return (
          entryDate.getDate() === today.getDate() &&
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getFullYear() === today.getFullYear()
        );
      });

      if (!entryForToday) {
        postTimesheet(
          userId,
          currentDate,
          newHoursWorked,
          overtimeHours,
          currentSite
        );
      } else {
        console.error("An entry already exists for the current date.");
      }
    }

    // Optionally, update the local progressValue
    setProgressValue(newHoursWorked);
  };

  const handleSubmitOvertime = () => {
    const overtimeValue = parseFloat(overtimeHours);
    if (!isNaN(overtimeValue)) {
      const updatedProgressValue = progressValue + overtimeValue;
      setProgressValue(updatedProgressValue);
    }

    if (clockedIn) {
      // If clocked in, update the existing entry for the current date
      updateTimesheetEntry(
        userId,
        currentDate,
        progressValue,
        overtimeValue,
        currentSite
      );
    } else {
      // If not clocked in, create a new entry for the current date
      postTimesheet(
        userId,
        currentDate,
        progressValue,
        overtimeValue,
        currentSite
      );
    }
  };

  const handleOvertimeHoursFocus = () => {
    setOvertimeHours("");
  };

  return (
    <div>
      {clockedIn ? (
        <div>
          <Typography
            variant="h6"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            You have clocked in for today!
          </Typography>
          <Typography
            variant="h6"
            style={{
              margin: "10px",
              display: "flex",
              justifyContent: "center",
              color: "green",
              fontWeight: 700,
            }}
          >
            {new Date().toLocaleDateString()}
          </Typography>
        </div>
      ) : (
        <div>
          <CircularProgress progressValue={progressValue} maxValue={12} />
          <Grid
            container
            spacing={2}
            style={{ marginTop: "20px", padding: "10px" }}
          >
            <Grid item xs={12}>
              <Typography variant="body1">
                Is there any overtime you want to add?
              </Typography>
            </Grid>
            <Grid
              item
              xs={9}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                type="number"
                label="Overtime hours"
                variant="outlined"
                fullWidth
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(e.target.value)}
                onFocus={handleOvertimeHoursFocus}
              />
            </Grid>
            <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmitOvertime}
                style={{
                  borderRadius: "50px",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ChevronRightIcon />
              </Button>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" margin="20px">
            <Button
              variant="contained"
              color={clockedIn ? "secondary" : "primary"}
              size="large"
              onClick={handleClockInOut}
              disabled={clockedIn}
            >
              {clockedIn ? "Clocked In" : "Clock In"}
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default TodayTab;
