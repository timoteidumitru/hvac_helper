import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import { TimesheetProvider } from "./context/TimesheetProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TimesheetProvider>
        <App />
      </TimesheetProvider>
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();
