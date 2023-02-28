import { Request, Response } from 'express';
import { Profile } from '../models/Profile.model';
import { Timesheet } from '../models/Timesheet.model';

// update today's status
const updateTimesheet = async (req: Request, res: Response) => {
  const profileID = req.body.profile;
  const profileData = req.body.todayData;

  try {
    const profileId = await Profile.findById(profileID);

    if (!profileId) {
      return res.status(404).send({ error: 'Profile not found!' });
    }

    // Find the profileId's existing profile and update its properties
    const profile = await Timesheet.findOneAndUpdate(
      { profileId: profileId._id },
      { $set: profileData },
      { new: true, upsert: true }
    );

    res.send(profile);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};
// create new profile info
const createTimesheet = async (req: Request, res: Response) => {
  const profileID = req.body.profileID;
  const timesheetData = req.body.timesheetData;

  Profile.findById(profileID)
    .then((profile) => {
      if (!profile) {
        return res.status(404).send({ error: 'Profile not found..' });
      }

      const timesheet = new Timesheet(timesheetData);

      timesheet
        .save()
        .then((savedTimesheet) => {
          res.send({ timesheet: savedTimesheet });
        })
        .catch((error) => {
          res.send(error);
        });
    })
    .catch((error) => {
      res.send(error);
    });
};

// get profile data from server
const getTimesheetData = async (req: Request, res: Response) => {
  const userId = req.body.userId;

  Profile.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: 'Profile not found' });
      }

      Timesheet.findOne({ user: user._id })
        .then((profile) => {
          if (!profile) {
            return res.status(404).send({ error: 'Timesheet not found' });
          }

          res.send({ user, profile });
        })
        .catch((error) => {
          res.send(error);
        });
    })
    .catch((error) => {
      res.send(error);
    });
};

export default { updateTimesheet, createTimesheet };
