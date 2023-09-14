import mongoose from 'mongoose';

const timesheetSchema = new mongoose.Schema({
  employeeId: String,
  datesWorked: [Date], // Change 'date' to 'datesWorked'
  dueDate: String
});

export interface TimesheetDocument extends mongoose.Document {
  employeeId: string;
  datesWorked: Date[];
  dueDate: string;
}

export const Timesheet = mongoose.model<TimesheetDocument>('Timesheet', timesheetSchema);
