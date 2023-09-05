import { Request, Response } from 'express';
import { User } from '../models/Users.model';

// create new user
const createUser = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if required fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full Name, Email, and Password are required.' });
    }

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    // Create a new user instance
    const user = new User({
      fullName,
      email,
      password
    });

    // Save the user to the database
    await user.save();

    // Respond with a success message and user data
    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
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
