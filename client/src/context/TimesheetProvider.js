import React, { createContext, useContext, useState } from "react";
import axios from "../api/axios";

const TimesheetContext = createContext();

export const useTimesheet = () => {
  return useContext(TimesheetContext);
};

export const TimesheetProvider = ({ children }) => {
  const [timesheet, setTimesheet] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update timesheet data
  const updateTimesheetEntry = async (
    userId,
    date,
    newHoursWorked,
    newOvertime,
    newProject
  ) => {
    try {
      // Use Axios to make a PUT request
      const response = await axios.put("/timesheet/update", {
        userId,
        date,
        newHoursWorked,
        newOvertime,
        newProject,
      });

      // Handle the response and update the local state
      const updatedTimesheet = [...response];
      // Update the entry in the local state based on the response or other criteria

      setTimesheet(updatedTimesheet);
    } catch (error) {
      console.error(error);
    }
  };

  // Get current timesheet data
  const getTimesheet = async (userId) => {
    try {
      // Use Axios to make a GET request
      const response = await axios.post("/timesheet/get", { userId });

      // Handle the response and update the local state
      setTimesheet(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Create new timesheet or post todays data
  const postTimesheet = async (
    userId,
    date,
    hoursWorked,
    overtime,
    project
  ) => {
    try {
      // Use Axios to make a POST request
      const response = await axios.post("/timesheet/post", {
        userId,
        date,
        hoursWorked,
        overtime,
        project,
      });

      // Handle the response and update the local state
      const newTimesheetEntry = response.data;
      setTimesheet(newTimesheetEntry);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TimesheetContext.Provider
      value={{
        timesheet,
        loading,
        setLoading,
        updateTimesheetEntry,
        getTimesheet,
        postTimesheet,
      }}
    >
      {children}
    </TimesheetContext.Provider>
  );
};
