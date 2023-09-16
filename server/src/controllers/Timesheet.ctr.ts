import { Request, Response } from 'express';
import { Timesheet } from '../models/Timesheet.model';

// get all entries from a user
const getTimesheet = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const timesheet = await Timesheet.findOne({ userId });

    if (!timesheet) {
      res.status(404).json({ error: 'Timesheet not found' });
    } else {
      res.json(timesheet.entries);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// create new timesheet
const postTimesheet = async (req: Request, res: Response) => {
  const { userId, date, hoursWorked, project } = req.body;

  try {
    const timesheet = await Timesheet.findOne({ userId });

    if (!timesheet) {
      // Create a new timesheet if one doesn't exist for the employee
      const newTimesheet = new Timesheet({
        userId,
        entries: [{ date, hoursWorked, project }]
      });
      await newTimesheet.save();
      res.status(201).json(newTimesheet);
    } else {
      // Add an entry to the existing timesheet
      timesheet.entries.push({ date, hoursWorked, project });
      await timesheet.save();
      res.status(201).json(timesheet);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { getTimesheet, postTimesheet };
