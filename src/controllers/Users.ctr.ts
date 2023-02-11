import { Request, Response } from 'express';
import { User } from '../models/Users.model';
import { Profile } from '../models/Profile.model';

// get all profile data from server
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

// create new user to DB
const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Username and password are required.' });

  const user = new User({
    email,
    password
  });

  return user
    .save()
    .then((user: any) => res.status(201).json({ user }))
    .catch((error: any) => res.status(500).json({ message: error.message }));
};

// authenticate user to DB
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Username and password are required.' });
  const foundUser = await User.findOne({ email, password }).exec();
  if (!foundUser) return res.status(401).json({ message: 'Username or password are wrong.' }); //Unauthorized

  return res.send(foundUser);
};

export default { loginUser, createUser, getProfileData };
