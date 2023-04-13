import React, { createContext, useState } from 'react';

export type NestedTimesheetData = {
  [key: string]: string;
};

export interface Day {
  weekEnd: string;
  days: {
    date: string;
    hoursWorked: number;
    overtime: number;
  };
}

export interface TimesheetData {
  profileID: string;
  dueDate: string;
  period: string;
  data: Day[];
  project: string;
  comments: string;
  [key: string]: NestedTimesheetData | string | any[];
}

interface Props {
  children: React.ReactNode;
}

interface TimesheetContextData {
  timesheetData: TimesheetData;
  errors: string;
  setTimesheetData: React.Dispatch<React.SetStateAction<TimesheetData>>;
  setErrors: React.Dispatch<React.SetStateAction<string>>;
}

export const TimesheetContext = createContext<TimesheetContextData>({
  timesheetData: {
    profileID: '',
    dueDate: '',
    period: '',
    data: [],
    project: '',
    comments: ''
  },
  errors: '',
  setTimesheetData: () => {},
  setErrors: () => {}
});

export const TimesheetContextProvider: React.FC<Props> = ({ children }) => {
  const [errors, setErrors] = useState('');
  const [timesheetData, setTimesheetData] = useState<TimesheetData>({
    profileID: '',
    dueDate: '',
    period: '',
    data: [],
    project: '',
    comments: ''
  });

  return (
    <TimesheetContext.Provider value={{ timesheetData, setTimesheetData, errors, setErrors }}>
      {children}
    </TimesheetContext.Provider>
  );
};
