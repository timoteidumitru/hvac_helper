import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/Users.model';
import Logging from '../library/Logging';

// validate date come from client
export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);

      return res.status(422).json({ error });
    }
  };
};

// data validation schema
export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      firstName: Joi.string().required(),
      surName: Joi.string().required(),
      email: Joi.string().email().required(),
      tel: Joi.string().required(),
      gender: Joi.string().required(),
      day: Joi.string().required(),
      month: Joi.string().required(),
      year: Joi.string().required(),
      comments: Joi.string().required()
    })
  }
};
