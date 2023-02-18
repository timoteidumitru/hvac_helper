import mongoose from 'mongoose';
import { UserDocument } from './Users.model';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  phone: String,
  email: String,
  role: String,
  nextOfKin: String,
  bankAcc: String,
  utr: String,
  rate: String
});

export interface ProfileDocument extends mongoose.Document {
  user: UserDocument['_id'];
  name: string;
  phone: string;
  email: String;
  role: string;
  nextOfKin: string;
  bankAcc: string;
  utr: string;
  rate: string;
}

export const Profile = mongoose.model<ProfileDocument>('Profile', profileSchema);
