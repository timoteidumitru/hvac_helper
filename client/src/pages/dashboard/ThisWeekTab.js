import { useState } from "react";
import CircularProgress from "./CircularProgressBar";

const ThisWeekTab = () => {
  const [progressValue, setProgressValue] = useState(58.5); // Set the initial progress value here

  return (
    <div>
      <CircularProgress progressValue={progressValue} maxValue={72} />
    </div>
  );
};

export default ThisWeekTab;
