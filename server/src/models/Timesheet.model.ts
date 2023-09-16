import mongoose from 'mongoose';

const timesheetSchema = new mongoose.Schema({
  entries: [
    {
      date: Date,
      hoursWorked: Number,
      project: String
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export interface TimesheetDocument extends mongoose.Document {
  entries: [
    {
      date: Date;
      hoursWorked: Number;
      project: String;
    }
  ];
  userId: mongoose.Types.ObjectId; // Reference to the User document
}

export const Timesheet = mongoose.model<TimesheetDocument>('Timesheet', timesheetSchema);
