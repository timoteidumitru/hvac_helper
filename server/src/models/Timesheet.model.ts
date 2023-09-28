import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheetEntrySchema = new Schema({
  date: Date,
  hoursWorked: Number,
  overtime: Number,
  project: String
});

const timesheetSchema = new Schema({
  entries: [timesheetEntrySchema],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export interface TimesheetDocument extends mongoose.Document {
  entries: {
    date: Date;
    hoursWorked: number;
    overtime: number;
    project: string;
  }[];
  userId: mongoose.Types.ObjectId; // Reference to the User document
}

export const Timesheet = mongoose.model<TimesheetDocument>('Timesheet', timesheetSchema);
