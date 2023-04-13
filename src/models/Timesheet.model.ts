import mongoose, { Schema, Document } from 'mongoose';
import { ProfileDocument } from './Profile.model';

export interface Day {
  date: string;
  hoursWorked: number;
  overtime: number;
}

export interface Week {
  weekEnd: string;
  days: Day[];
}

export interface Timesheet extends Document {
  profileID: ProfileDocument['_id'];
  dueDate: string;
  data: Week[];
  period: string;
  project: string;
  comments: string;
}

const daySchema: Schema<Day> = new Schema({
  date: {
    type: String,
    validate: {
      validator: function (this: Day, value: string): boolean {
        // Ensure the date is within the past two weeks and in the format DD/MM/YYYY
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(value)) {
          return false;
        }
        const today = new Date();
        const [dd, mm, yyyy] = value.split('/');
        const date = new Date(`${yyyy}-${mm}-${dd}`);
        const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 3600 * 1000);
        return date >= twoWeeksAgo && date <= today;
      },
      message: 'Date must be within the past two weeks (in the format DD/MM/YYYY)'
    }
  },
  hoursWorked: {
    type: Number,
    validate: {
      validator: function (value: number): boolean {
        // Ensure the value is a positive number less than or equal to 24
        return value >= 0 && value <= 24;
      },
      message: 'Hours worked must be a positive number less than or equal to 24'
    }
  },
  overtime: {
    type: Number,
    validate: {
      validator: function (value: number): boolean {
        // Ensure the value is a positive number less than or equal to 24
        return value >= 0 && value <= 24;
      },
      message: 'Overtime must be a positive number less than or equal to 24'
    }
  }
});

const weekSchema: Schema<Week> = new Schema({
  weekEnd: {
    type: String
  },
  days: [daySchema]
});

const timesheetSchema: Schema = new Schema({
  profileID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  dueDate: { type: String },
  data: [weekSchema],
  project: {
    type: String
  },
  comments: {
    type: String
  }
});

export const Timesheet = mongoose.model<Timesheet>('Timesheet', timesheetSchema);
