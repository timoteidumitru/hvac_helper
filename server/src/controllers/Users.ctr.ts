import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'; // Import the JWT library
import { User } from '../models/Users.model';

// Create a function to generate JWT tokens
function generateToken(user: any) {
  const payload = {
    userId: user._id,
    email: user.email
    // You can add more user information to the payload if needed
  };

  // Sign the token with a secret key and set an expiration time
  const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' }); // Change 'your-secret-key' to your actual secret key
  return token;
}

// create new user and issue a JWT token
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

    // Generate a JWT token for the newly created user
    const token = generateToken(user);

    // Respond with a success message and user data along with the token
    return res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// authenticate the user and issue a JWT token
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Username and password are required.' });

  try {
    // Find the user by email and password
    const foundUser = await User.findOne({ email, password }).exec();
    if (!foundUser) return res.status(401).json({ message: 'Username or password are wrong.' }); // Unauthorized

    // Generate a JWT token for the authenticated user
    const token = generateToken(foundUser);

    // Respond with the user data and token
    return res.status(200).json({ message: 'User logged in successfully', user: foundUser, token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default { loginUser, createUser };
