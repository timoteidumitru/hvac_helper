import React, { useState } from "react";
import { Typography, Grid, Button, Box, TextField } from "@mui/material";
import CircularProgress from "./CircularProgressBar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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

  // Function to clear the overtimeHours field on focus
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
