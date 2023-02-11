import { Request, Response } from 'express';
import { User } from '../models/Users.model';
import { Profile } from '../models/Profile.model';

// create new profile info
const createProfile = async (req: Request, res: Response) => {
  const userId = req.body.profileData.userId;
  const profileData = req.body.profileData;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      const profile = new Profile({
        ...profileData,
        user: user._id
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

export default { createProfile, getProfileData };
