import mongoose from 'mongoose';
import { UserDocument } from './Users.model';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String },
  nextOfKin: {
    name: { type: String, required: true },
    phone: { type: String, required: true }
  },
  bankAcc: {
    name: { type: String },
    sort: { type: Number, required: true },
    account: { type: Number, required: true }
  },
  utr: { type: Number, required: true },
  rate: { type: Number, required: true }
});

export interface ProfileDocument extends mongoose.Document {
  user: UserDocument['_id'];
  name: string;
  phone: number;
  email: string;
  address: string;
  role: string;
  nextOfKin: {
    name: string;
    phone: number;
  };
  bankAcc: {
    name: string;
    sort: number;
    account: number;
  };
  utr: number;
  rate: number;
}

export const Profile = mongoose.model<ProfileDocument>('Profile', profileSchema);
