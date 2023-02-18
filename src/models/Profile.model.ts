import mongoose from 'mongoose';
import { UserDocument } from './Users.model';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  phone: Number,
  role: String,
  bankAcc: Number,
  sortCode: Number,
  utr: Number,
  nextOfKin: String
});

export interface ProfileDocument extends mongoose.Document {
  user: UserDocument['_id'];
  name: string;
  phone: number;
  role: string;
  bankAcc: number;
  sortCode: number;
  utr: number;
  nextOfKin: string;
}

export const Profile = mongoose.model<ProfileDocument>('Profile', profileSchema);
