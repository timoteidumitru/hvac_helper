import { Request, Response } from 'express';
import { User } from '../models/Users.model';
import { Profile } from '../models/Profile.model';

// create new profile info
const updateProfile = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const profileData = req.body.profileData;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found!' });
    }

    // Find the user's existing profile and update its properties
    const profile = await Profile.findOneAndUpdate(
      { user: user._id },
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
const createProfile = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const profileData = req.body.profileData;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      const profile = new Profile({
        profileData
      });

      profile
        .save()
        .then((savedProfile) => {
          res.send({ profile: savedProfile });
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
const getProfileData = async (req: Request, res: Response) => {
  const userId = req.body.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      Profile.findOne({ user: user._id })
        .then((profile) => {
          if (!profile) {
            return res.status(404).send({ error: 'Profile not found' });
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

export default { updateProfile, createProfile, getProfileData };
