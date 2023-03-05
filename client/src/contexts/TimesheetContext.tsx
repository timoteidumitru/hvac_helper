import React, { createContext, useState } from 'react';

export interface Day {
  date: string;
  hoursWorked: number;
  overtime: number;
}

export interface TimesheetData {
  profileID: string;
  dueDate: string;
  period: string;
  days: Day[];
  project: string;
  comments: string;
}

interface Props {
  children: React.ReactNode;
}

interface TimesheetContextData {
  timesheetData: TimesheetData;
  setTimesheetData: React.Dispatch<React.SetStateAction<TimesheetData>>;
}

export const TimesheetContext = createContext<TimesheetContextData>({
  timesheetData: {
    profileID: '',
    dueDate: '',
    period: '',
    days: [],
    project: '',
    comments: ''
  },
  setTimesheetData: () => {}
});

export const TimesheetContextProvider: React.FC<Props> = ({ children }) => {
  const [timesheetData, setTimesheetData] = useState<TimesheetData>({
    profileID: '',
    dueDate: '',
    period: '',
    days: [],
    project: '',
    comments: ''
  });

  return <TimesheetContext.Provider value={{ timesheetData, setTimesheetData }}>{children}</TimesheetContext.Provider>;
};
