import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { TimesheetDocument } from '../models/Timesheet.model';
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
    create: Joi.object<TimesheetDocument>({
      employeeId: Joi.string().required(),
      datesWorked: Joi.array().required(),
      dueDate: Joi.string().required()
    }),
    validate: Joi.object<TimesheetDocument>({
      employeeId: Joi.string().required(),
      datesWorked: Joi.array().required(),
      dueDate: Joi.string().required()
    })
  }
};
