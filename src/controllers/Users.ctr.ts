import { Request, Response } from 'express';
import User from '../models/Users.model';

// create new user to DB
const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Username and password are required.' });
  const foundUser = await User.findOne({ email, password }).exec();
  if (!foundUser) return res.status(401).json({ message: 'Username or password are wrong.' }); //Unauthorized

  return res.send(foundUser);
};

// authenticate user to DB
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Username and password are required.' });
  const foundUser = await User.findOne({ email, password }).exec();
  if (!foundUser) return res.status(401).json({ message: 'Username or password are wrong.' }); //Unauthorized

  return res.send(foundUser);
};

export default { loginUser, createUser };
