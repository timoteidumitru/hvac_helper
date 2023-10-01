import React, { useState } from "react";
import { Typography, Grid, Button, Box, TextField } from "@mui/material";
import CircularProgress from "./CircularProgressBar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTimesheet } from "../../context/TimesheetProvider";
import { useAuth } from "../../context/AuthContext";
import { Select, MenuItem } from "@mui/material"; // Import Select and MenuItem

const TodayTab = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [selectedSite, setSelectedSite] = useState(""); // State for selected site

  const { updateTimesheetEntry, postTimesheet, getTimesheet, timesheet } =
    useTimesheet();
  const { token } = useAuth();

  const handleClockInOut = () => {
    console.log("Signed in for today!");
  };

  const handleSubmitOvertime = () => {
    console.log(`Submitted overtime data to: ${overtimeHours} hrs`);
  };

  const handleOvertimeHoursFocus = () => {
    setOvertimeHours("");
  };

  const handleSiteChange = (event) => {
    console.log("Selected site to: ", event.target.value);
    setSelectedSite(event.target.value);
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
          {/* Dropdown menu */}
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Select
              label="Select Site: "
              variant="outlined"
              fullWidth
              value={selectedSite}
              onChange={handleSiteChange}
            >
              <MenuItem value={"70 Chancery Lane"}>70 Chancery Lane</MenuItem>
              <MenuItem value={"Bain Capital"}>Bain Capital</MenuItem>
              <MenuItem value={"160 Blackfriars Rd"}>
                160 Blackfriars Rd
              </MenuItem>
              <MenuItem value={"Addrian and Hobbs"}>Addrian and Hobbs</MenuItem>
              <MenuItem value={"King Cross St Pancras"}>
                King Cross St Pancras
              </MenuItem>
            </Select>
          </Grid>
          <CircularProgress progressValue={progressValue} maxValue={12} />
          <Grid
            container
            spacing={2}
            style={{ marginTop: "5px", padding: "10px" }}
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
                label="Overtime Hours"
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
