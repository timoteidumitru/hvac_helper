import { Request, Response } from 'express';
import { Timesheet } from '../models/Timesheet.model';

// create new timesheet
const newTimesheet = async (req: Request, res: Response) => {
  const { timesheetID } = req.body;

  try {
    // Check if required fields are provided
    if (!timesheetID) {
      return res.status(400).json({ message: 'TimesheetID is required.' });
    }

    // Check if the user with the same email already exists
    const existingTimesheet = await Timesheet.findOne({ timesheetID });
    if (existingTimesheet) {
      return res.status(409).json({ message: 'Timesheet already created.' });
    }

    // Create a new user instance
    const timesheet = new Timesheet({
      timesheetID
    });

    // Save the user to the database
    await timesheet.save();

    // Respond with a success message and user data
    return res.status(201).json({ message: 'Timesheet created successfully', timesheet });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default { newTimesheet };
