import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { ProfileDocument } from '../models/Profile.model';
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
  profile: {
    create: Joi.object<ProfileDocument>({
      user: Joi.string().required(),
      name: Joi.string().required(),
      location: Joi.string().required()
    })
  }
};
