import { Request, Response } from 'express';
import { Timesheet } from '../models/Timesheet.model';

// Update a specific entry in the timesheet
const updateTimesheetEntry = async (req: Request, res: Response) => {
  const { userId, date, newHoursWorked, newOvertime, newProject } = req.body;

  try {
    const timesheet = await Timesheet.findOne({ userId });

    if (!timesheet) {
      return res.status(404).json({ error: 'Timesheet not found' });
    }

    // Find the entry for the specified date
    const entryToUpdate = timesheet.entries.find((entry) => entry.date === date);

    if (!entryToUpdate) {
      return res.status(404).json({ error: 'Entry not found for the specified date' });
    }

    // Update the entry if the new values are provided
    if (newHoursWorked !== undefined) {
      entryToUpdate.hoursWorked = newHoursWorked;
    }

    if (newOvertime !== undefined) {
      entryToUpdate.overtime = newOvertime;
    }

    if (newProject !== undefined) {
      entryToUpdate.project = newProject;
    }

    await timesheet.save();
    res.status(200).json([timesheet?.entries]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all entries from a user
const getTimesheet = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const timesheet = await Timesheet.findOne({ userId });

    if (!timesheet) {
      return res.status(404).json({ error: 'Timesheet not found' });
    }

    res.json(timesheet.entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new timesheet or add an entry to an existing one
const postTimesheet = async (req: Request, res: Response) => {
  const { userId, date, hoursWorked, overtime, project } = req.body;

  try {
    let timesheet = await Timesheet.findOne({ userId });

    if (!timesheet) {
      // Create a new timesheet if one doesn't exist for the employee
      timesheet = new Timesheet({
        userId,
        entries: [{ date, hoursWorked, overtime, project }]
      });
      await timesheet.save();
      res.status(201).json(timesheet);
    } else {
      // Add an entry to the existing timesheet
      timesheet.entries.push({ date, hoursWorked, overtime, project });
      await timesheet.save();
      res.status(201).json(timesheet);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { updateTimesheetEntry, getTimesheet, postTimesheet };
