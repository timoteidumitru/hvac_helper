import mongoose from 'mongoose';
import { UserDocument } from './Users.model';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userId: { type: String, required: true },
  _id: { type: String, required: true, immutable: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true },
  nextOfKin: {
    name: { type: String, required: true },
    phone: { type: String, required: true }
  },
  bankAcc: {
    name: { type: String, required: true },
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
