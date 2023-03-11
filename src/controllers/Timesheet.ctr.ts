import { Request, Response } from 'express';
import { Profile } from '../models/Profile.model';
import { Timesheet } from '../models/Timesheet.model';

// detele today data from days array
const deleteTimesheetEntry = async (req: Request, res: Response) => {
  const { timesheetID, date } = req.body;

  try {
    const timesheet = await Timesheet.findById(timesheetID);
    if (!timesheet) {
      return res.status(404).send({ error: 'Timesheet not found!' });
    }

    const updatedDays = timesheet.days.filter((day) => {
      // const dayDate = day.date.split('/').reverse().join('-');
      return day.date !== date;
    });
    timesheet.days = updatedDays;

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
const pushTodayTimesheet = async (req: Request, res: Response) => {
  const { profileID, timesheetData } = req.body;

  try {
    const profile = await Profile.findById(profileID);
    if (!profile) {
      return res.status(404).send({ error: 'Profile not found!' });
    }

    const timesheet = await Timesheet.findOne({ profileID: profile._id });

    if (!timesheet) {
      const newTimesheet = new Timesheet({
        profileID: profile._id,
        days: [timesheetData]
      });
      await newTimesheet.save();
      res.status(201).send(newTimesheet);
    } else {
      const isDateIncluded = timesheet.days.some((day) => day.date === timesheetData.date);
      if (isDateIncluded) {
        return res.status(400).send({ error: 'Date already included!' });
      }
      timesheet.days.push(timesheetData);
      timesheet.days.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const updatedTimesheet = await timesheet.save();
      res.status(201).send(updatedTimesheet);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error! Invalid Date Range!' });
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
