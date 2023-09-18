import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../models/Users.model'; // Import your Mongoose User model

const jwtSecret = 'mysecretcode';

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const decodedToken: any = verify(token, jwtSecret);

    // Use the User model to query for user data based on the decoded token (e.g., user ID)
    const user = await User.findById(decodedToken.userId).exec(); // Add .exec() to execute the query

    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    // Attach the user data to the request
    // req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default authenticateToken;
