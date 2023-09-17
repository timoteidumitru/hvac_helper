import React from "react";
import "../../App.css";
import CircularProgress from "@mui/material/CircularProgress";

const CircularProgressBar = ({ progressValue, maxValue }) => {
  // Function to handle color change of progress bar
  const getColor = (value) => {
    if (value <= maxValue * 0.4) {
      return "red"; // Green color for values up to 40% of the maxValue
    } else if (value <= maxValue * 0.6) {
      return "orange"; // Amber color for values between 41% and 60% of the maxValue
    } else {
      return "green"; // Red color for values above 60% of the maxValue
    }
  };

  // Calculate the percentage of progress based on the provided values.
  const percentage = (progressValue / maxValue) * 100;

  return (
    <div className="circular-progress-container">
      <CircularProgress
        variant="determinate"
        value={percentage} // Use percentage as the value
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
