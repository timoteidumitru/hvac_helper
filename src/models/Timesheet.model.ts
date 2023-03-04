import mongoose, { Schema, Document } from 'mongoose';
import { ProfileDocument } from './Profile.model';

export interface Day extends Document {
  date: string;
  hoursWorked: number;
  overtime: number;
}

export interface Timesheet extends Document {
  profileID: ProfileDocument['_id'];
  dueDate: string;
  period: string;
  days: Day[];
  project: string;
  comments: string;
}

const daySchema: Schema<Day> = new Schema({
  date: {
    type: String,
    validate: {
      validator: function (this: Day, value: string): boolean {
        // Ensure the date is within the current pay period and in the format DD/MM/YYYY
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(value)) {
          return false;
        }
        const today = new Date();
        const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const daysSinceLastMonday = currentDay === 1 ? 7 : currentDay - 1;
        const lastMonday = new Date(today.getTime() - daysSinceLastMonday * 24 * 3600 * 1000 - 7 * 24 * 3600 * 1000);
        const [dd, mm, yyyy] = value.split('/');
        const date = new Date(`${yyyy}-${mm}-${dd}`);
        const startDate = lastMonday;
        const endDate = new Date(startDate.getTime());
        endDate.setDate(endDate.getDate() + 14);
        return date >= startDate && date <= endDate;
      },
      message: 'Date must be within the current pay period (past two weeks) and in the format DD/MM/YYYY'
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

const timesheetSchema: Schema = new Schema({
  profileID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  days: [daySchema],
  dueDate: { type: String },
  period: {
    type: String,
    default: function (this: Timesheet): string {
      const [dd, mm, yyyy] = this.dueDate.split('/');
      const dueDay = new Date(`${yyyy}-${mm}-${dd}`);
      const start = new Date(dueDay.getTime() - 13 * 24 * 3600 * 1000);
      const end = new Date(dueDay.getTime() - 0 * 24 * 3600 * 1000);
      const startFormatted = start.toLocaleDateString('en-UK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const endFormatted = end.toLocaleDateString('en-UK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      return `${startFormatted} - ${endFormatted}`;
    },
    readonly: true
  },
  project: {
    type: String
  },
  comments: {
    type: String
  }
});

export const Timesheet = mongoose.model<Timesheet>('Timesheet', timesheetSchema);
