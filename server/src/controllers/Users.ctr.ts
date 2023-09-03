import { Request, Response } from 'express';
import { User } from '../models/Users.model';

// create new user
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

// authenticate the user
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Username and password are required.' });
  const foundUser = await User.findOne({ email, password }).exec();
  if (!foundUser) return res.status(401).json({ message: 'Username or password are wrong.' }); //Unauthorized

  return res.send(foundUser);
};

export default { loginUser, createUser };
