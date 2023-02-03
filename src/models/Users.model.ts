import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
  firstName: string;
  surName: string;
  email: string;
  tel: string;
  gender: string;
  day: string;
  month: string;
  year: string;
  comments: string;
}

// Data model for insertion into DB
export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    surName: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: true },
    gender: { type: String, required: true },
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    comments: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<IUserModel>('User', UserSchema);
