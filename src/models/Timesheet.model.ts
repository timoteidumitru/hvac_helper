import mongoose, { Schema, Document, Types } from 'mongoose';
import { ProfileDocument } from './Profile.model';

export interface Day extends Document {
  date: string;
  hoursWorked: number;
  overtime: number;
  period: string;
}

export interface Timesheet extends Document {
  profileID: ProfileDocument['_id'];
  dueDate: string;
  period: string;
  days: Day[];
  project: string;
  comments?: string;
}

const daySchema: Schema<Day> = new Schema({
  date: {
    type: String,
    validate: {
      validator: function (value: string): boolean {
        // Ensure the date is within the current pay period and in the format DD/MM/YYYY
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(value)) {
          return false;
        }
        const [dd, mm, yyyy] = value.split('/');
        const date = new Date(`${yyyy}-${mm}-${dd}`);
        const startDate = new Date('2023-02-16T00:00:00Z'); // Replace with your specific start date
        const endDate = new Date(startDate.getTime());
        endDate.setDate(endDate.getDate() + 14);
        return date >= startDate && date <= endDate;
      },
      message: 'Date must be within the current pay period (past two weeks) and in the format DD/MM/YYYY'
    }
  },
  period: {
    type: String,
    get: function (this: Day): string {
      const [dd, mm, yyyy] = this.date.split('/');
      const date = new Date(`${yyyy}-${mm}-${dd}`);
      const periodStart = new Date('2023-02-13T00:00:00Z'); // Replace with your specific start date
      const periodEnd = new Date(periodStart.getTime());
      periodEnd.setDate(periodEnd.getDate() + 13);
      const periodStartFormatted = periodStart.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const periodEndFormatted = periodEnd.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      return `${periodStartFormatted} - ${periodEndFormatted}`;
    },
    readonly: true
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
  dueDate: { type: String },
  period: {
    type: String,
    default: function (this: Timesheet): string {
      const [dd, mm, yyyy] = this.dueDate.split('/');
      const payday = new Date(`${yyyy}-${mm}-${dd}`);
      const start = new Date(payday.getTime() - 13 * 24 * 3600 * 1000);
      const end = new Date(payday.getTime() - 0 * 24 * 3600 * 1000);
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
  days: [daySchema],
  project: {
    type: String
  },
  comments: {
    type: String
  }
});

export const Timesheet = mongoose.model<Timesheet>('Timesheet', timesheetSchema);
