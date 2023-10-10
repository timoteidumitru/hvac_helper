import React, { useState } from "react";
import {
  Typography,
  Grid,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CircularProgress from "./CircularProgressBar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTimesheet } from "../../context/TimesheetProvider";
import jwt_decode from "jwt-decode";
import { format } from "date-fns";

const TodayTab = () => {
  const { updateTimesheetEntry, postTimesheet, getTimesheet, timesheet } =
    useTimesheet();
  const [clockedIn, setClockedIn] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [selectedSite, setSelectedSite] = useState("");

  // Retrieve user ID from the authentication context
  const storedToken = localStorage.getItem("authToken");
  const decodedToken = jwt_decode(storedToken);
  const userId = decodedToken?.userId;

  const handleClockInOut = async () => {
    try {
      // Check if already clocked in
      if (clockedIn) {
        console.log("You are already clocked in.");
        return;
      }

      // Get the current date and format it as "dd-MM-yyyy"
      const currentDate = format(new Date(), "dd-MM-yyyy");

      // Check if there is an existing entry for today's date in the received data
      const existingEntry = timesheet.find(
        (entry) => entry.date === currentDate
      );
      console.log(existingEntry);

      if (existingEntry) {
        // If an entry already exists for today, update it using postTimesheet
        await updateTimesheetEntry(
          userId,
          currentDate,
          9,
          overtimeHours,
          selectedSite
        );
        console.log("Updated existing entry successfully.");
      } else {
        // If there is no entry for today, create a new one using postTimesheet
        await postTimesheet(
          userId,
          currentDate,
          9,
          overtimeHours,
          selectedSite
        );
        console.log("Clocked in successfully.");
      }

      // Update the UI or state to reflect clocking in
      setClockedIn(true);
    } catch (error) {
      console.error("Error clocking in:", error);
    }
  };

  const handleSubmitOvertime = async () => {
    console.log("Overtime Submited");
  };

  const handleOvertimeHoursFocus = () => {
    setOvertimeHours("");
  };

  const handleSiteChange = (event) => {
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
          <Grid
            item
            xs={10}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
              padding: "0 10px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel
                id="select-site-label"
                htmlFor="select-site"
                shrink={Boolean(selectedSite)}
              >
                Please Select a Site!
              </InputLabel>
              <Select
                labelId="select-site-label"
                id="select-site"
                value={selectedSite}
                onChange={handleSiteChange}
                variant="outlined"
              >
                <MenuItem value="">
                  <em>Not in today!</em>
                </MenuItem>
                <MenuItem value={"70 Chancery Lane"}>70 Chancery Lane</MenuItem>
                <MenuItem value={"Bain Capital"}>Bain Capital</MenuItem>
                <MenuItem value={"160 Blackfriars Rd"}>
                  160 Blackfriars Rd
                </MenuItem>
                <MenuItem value={"Addrian and Hobbs"}>
                  Addrian and Hobbs
                </MenuItem>
                <MenuItem value={"King Cross St Pancras"}>
                  King Cross St Pancras
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
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
              disabled={!selectedSite || clockedIn}
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
