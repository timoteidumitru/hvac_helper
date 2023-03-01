import { Request, Response } from 'express';
import { Profile } from '../models/Profile.model';
import { Timesheet } from '../models/Timesheet.model';

// update today's status
const updateTimesheet = async (req: Request, res: Response) => {
  const { dayIndex, hoursWorked, overtime } = req.body.updateData;
  const { timesheetID } = req.body;

  try {
    const timesheet = await Timesheet.findById(timesheetID);
    if (!timesheet) {
      return res.status(404).send({ error: 'Timesheet not found!' });
    }

    const day = timesheet.days[dayIndex];
    if (!day) {
      return res.status(404).send({ error: 'Day not found!' });
    }

    day.hoursWorked = hoursWorked;
    day.overtime = overtime;

    const updatedTimesheet = await timesheet.save();

    res.send(updatedTimesheet);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error!' });
  }
};

// add today's status
const pushTimesheet = async (req: Request, res: Response) => {
  const { profileID, timesheetData } = req.body;

  try {
    const profile = await Profile.findById(profileID);
    if (!profile) {
      return res.status(404).send({ error: 'Profile not found!' });
    }

    const timesheet = await Timesheet.findOneAndUpdate(
      { profileID: profile._id },
      { $push: { days: timesheetData } },
      { new: true, upsert: true }
    );

    res.status(201).send(timesheet);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error!' });
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
    const period = timesheet?.days[0]?.period;
    timesheet.profileID = profileID;
    const savedTimesheet = await timesheet.save();
    res.send({ savedTimesheet, period });
  } catch (error) {
    res.send(error);
  }
};

export default { pushTimesheet, createTimesheet, updateTimesheet };
