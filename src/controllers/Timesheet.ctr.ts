import { Request, Response } from 'express';
import { Profile } from '../models/Profile.model';
import { Week, Day, Timesheet } from '../models/Timesheet.model';

export interface ITimesheetData {
  timesheetID: string;
  weekIndex: number;
  date: string;
  hoursWorked: number;
  overtime: number;
}

// detele today data from days array
const deleteTimesheetEntry = async (req: Request, res: Response) => {
  const { timesheetID, date } = req.body;

  try {
    const timesheet = await Timesheet.findById(timesheetID);
    if (!timesheet) {
      return res.status(404).send({ error: 'Timesheet not found!' });
    }

    const updatedDays = timesheet.data.filter((dt) => {
      return dt.weekEnd !== date;
    });
    timesheet.data = updatedDays;

    await timesheet.save();
    res.send(timesheet);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error!' });
  }
};

// get timesheet data
const getTimesheet = async (req: Request, res: Response) => {
  const { timesheetID } = req.body;

  try {
    const timesheet = await Timesheet.findById(timesheetID);
    if (!timesheet) {
      return res.status(404).send({ error: 'Timesheet not found!' });
    }

    res.send(timesheet);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error!' });
  }
};

// update today's status
const updateTimesheet = async (req: Request, res: Response) => {
  const { weekIndex, weekEnd } = req.body.updateData;
  const { timesheetID } = req.body;

  try {
    const timesheet = await Timesheet.findById(timesheetID);
    if (!timesheet) {
      return res.status(404).send({ error: 'Timesheet not found!' });
    }

    const week = timesheet.data[weekIndex];
    if (!week) {
      return res.status(404).send({ error: 'Day not found!' });
    }

    week.weekEnd = weekEnd;

    const updatedTimesheet = await timesheet.save();

    res.send(updatedTimesheet);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error!' });
  }
};

// add today's status
const pushTodayTimesheet = async (req: Request, res: Response) => {
  const { timesheetID, weekIndex, date, hoursWorked, overtime } = req.body.timesheetData as ITimesheetData;

  try {
    const ts: Timesheet = (await Timesheet.findById(timesheetID)) as Timesheet;

    if (!ts) {
      return res.status(404).json({ error: 'Timesheet not found' });
    }

    // Get the week object from the specified week index or create a new week if it doesn't exist
    let week: Week = ts.data[weekIndex];

    if (!week) {
      week = {
        weekEnd: date,
        days: []
      };

      ts.data[weekIndex] = week;
    }

    // Check if a day object already exists for the current date
    const existingDay = week.days.find((day) => day.date === date);

    // If a day object already exists, update its properties
    if (existingDay) {
      existingDay.hoursWorked = hoursWorked;
      existingDay.overtime = overtime;
    } else {
      // If a day object doesn't already exist, create a new one
      const newDay: Day = {
        date: date,
        hoursWorked: hoursWorked,
        overtime: overtime
      };

      week.days.push(newDay);
    }

    // Save the updated timesheet to the database
    await ts.save();

    return res.status(201).json(ts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// create new timesheet
const createTimesheet = async (req: Request, res: Response) => {
  const profileID = req.body.profileID;
  const timesheetData = req.body.timesheetData;

  try {
    const profile = await Profile.findById(profileID);
    if (!profile) {
      return res.status(404).send({ error: 'Profile not found..' });
    }
    const timesheet = new Timesheet(timesheetData);
    timesheet.profileID = profileID;
    const savedTimesheet = await timesheet.save();
    res.send(savedTimesheet);
  } catch (error) {
    res.send(error);
  }
};

export default { pushTodayTimesheet, createTimesheet, updateTimesheet, getTimesheet, deleteTimesheetEntry };
