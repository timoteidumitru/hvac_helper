import { Request, Response } from 'express';
import User from '../models/Users.model';

// make a post request to user module
const createUser = (req: Request, res: Response) => {
  const { firstName, surName, email, tel, gender, day, month, year, comments } = req.body;

  const user = new User({
    firstName,
    surName,
    email,
    tel,
    gender,
    day,
    month,
    year,
    comments
  });

  return user
    .save()
    .then((user: any) => res.status(201).json({ user }))
    .catch((error: any) => res.status(500).json({ message: error.message }));
};

// geta all data from server
// const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
//   return User.find()
//     .then((users: any) => res.status(200).json(users))
//     .catch((error: any) => res.status(500).json(error));
// };

export default { createUser };
