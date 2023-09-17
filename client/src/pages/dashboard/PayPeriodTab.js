import { useState } from "react";
import CircularProgress from "./CircularProgressBar";

const PayPeriodTab = () => {
  const [progressValue, setProgressValue] = useState(96); // Set the initial progress value here

  return (
    <div>
      <CircularProgress progressValue={progressValue} maxValue={110} />
    </div>
  );
};

export default PayPeriodTab;
