import React from "react";
import "../../App.css";
import CircularProgress from "@mui/material/CircularProgress";

const CircularProgressBar = ({ progressValue }) => {
  // Function to handle color change of progress bar
  const getColor = (value) => {
    if (value <= 40) {
      return "green"; // Green color for values up to 40
    } else if (value > 40 && value <= 60) {
      return "orange"; // Amber color for values between 41 and 60
    } else {
      return "red"; // Red color for values above 60
    }
  };

  return (
    <div className="circular-progress-container">
      <CircularProgress
        variant="determinate"
        value={progressValue}
        size={150}
        thickness={4}
        style={{
          color: getColor(progressValue), // Set the color based on the progressValue
        }}
      />
      <div className="shaded-circle"></div>
      <div className="progress-text">
        <span>{progressValue}h</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;
