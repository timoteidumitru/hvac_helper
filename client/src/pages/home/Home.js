import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useTimesheet } from "../../context/TimesheetProvider";
import jwt_decode from "jwt-decode";

export default function Home() {
  const { getTimesheet, timesheet } = useTimesheet();

  // Retrieve user ID from the authentication context
  const storedToken = localStorage.getItem("authToken");
  const decodedToken = jwt_decode(storedToken);
  const userId = decodedToken?.userId;

  useEffect(() => {
    if (userId) {
      getTimesheet(userId);
    }
  }, []);

  // console.log(timesheet);
  return (
    <div>
      <Navbar />
      <h2>This is Home Component</h2>
    </div>
  );
}
