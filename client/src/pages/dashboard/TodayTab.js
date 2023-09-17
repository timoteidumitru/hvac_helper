import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import CircularProgress from "./CircularProgressBar";

const TodayTab = () => {
  const [clockedIn, setClockedIn] = useState(false); // Track clock in/out state
  const [progressValue, setProgressValue] = useState(9); // Set the initial progress value here
  const [overtimeHours, setOvertimeHours] = useState(0); // State for overtime hours input

  // Function to handle clock in/out button click
  const handleClockInOut = () => {
    setClockedIn(!clockedIn);
  };

  // Function to handle overtime submission
  const handleSubmitOvertime = () => {
    const overtimeValue = parseFloat(overtimeHours);
    if (!isNaN(overtimeValue)) {
      // Check if the entered value is a valid number
      const updatedProgressValue = progressValue + overtimeValue;
      setProgressValue(updatedProgressValue);
    }
  };

  return (
    <div>
      {clockedIn ? (
        <div>
          <TextField
            disabled
            fullWidth
            label={`You clocked in for today! ${new Date().toLocaleDateString()}`}
          />
        </div>
      ) : (
        <div>
          <CircularProgress progressValue={progressValue} maxValue={14} />
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={6}>
              <TextField
                type="number"
                label="Overtime hours"
                variant="outlined"
                fullWidth
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmitOvertime}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color={clockedIn ? "secondary" : "primary"}
            size="large"
            onClick={handleClockInOut}
            style={{ marginTop: "20px" }}
            disabled={clockedIn}
          >
            {clockedIn ? "Clocked In" : "Clock In"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodayTab;
