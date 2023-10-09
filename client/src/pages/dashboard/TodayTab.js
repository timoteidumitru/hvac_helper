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
  const [progressValue, setProgressValue] = useState(
    0 || timesheet[0]?.hoursWorked + 1.5 * timesheet[0]?.overtime
  );
  const [overtimeHours, setOvertimeHours] = useState(
    0 || timesheet[0]?.overtime
  );
  const [selectedSite, setSelectedSite] = useState("" || timesheet[0]?.project);

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

      // Get the current date and add one month to it
      const currentDate = new Date();
      // currentDate.setMonth(currentDate.getMonth());

      // Format the date as "dd/MM/yyyy"
      const formattedDate = format(currentDate, "dd-MM-yyyy");

      // Check if there is an existing entry for today's date in the received data
      const existingEntry = timesheet.find(
        (entry) => (
          format(new Date(entry.date.split("T")[0]), "dd-MM-yyyy") ===
            formattedDate,
          console.log(
            formattedDate,
            format(new Date(entry.date.split("T")[0]), "dd-MM-yyyy")
          )
        )
      );
      // console.log(existingEntry);

      if (existingEntry) {
        // If an entry already exists for today, update it
        await updateTimesheetEntry(
          userId,
          existingEntry._id,
          formattedDate,
          9,
          overtimeHours,
          selectedSite
        );

        console.log("Updated existing entry successfully.");
      } else {
        // If there is no entry for today, create a new one
        await postTimesheet(
          userId,
          formattedDate,
          9,
          parseFloat(overtimeHours),
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
    try {
      // Retrieve user ID from the authentication context
      const storedToken = localStorage.getItem("authToken");
      const decodedToken = jwt_decode(storedToken);
      const userId = decodedToken?.userId; // Replace with the actual user ID

      // Get the current date and format it as "01/10/2023"
      const currentDate = format(new Date(), "dd/MM/yyyy");

      // Define the desired date (e.g., "01/10/2023")
      const desiredDate = "01/10/2023";

      // Check if the current date matches the desired date
      if (currentDate === desiredDate) {
        // If the dates match, proceed with posting the entry
        await postTimesheet(
          userId,
          currentDate, // Use the formatted current date
          9,
          parseFloat(overtimeHours),
          selectedSite
        );

        // After the POST request is successful, you can update your UI or state as needed.
        console.log("New overtime data submitted successfully.");
      } else {
        // If the dates do not match, do not post a new entry
        console.log("Not posting for the current date.");
      }
    } catch (error) {
      console.error("Error submitting overtime data:", error);
    }
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
