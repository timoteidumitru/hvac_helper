import mongoose from 'mongoose';
import { UserDocument } from './Users.model';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  location: String
});

export interface ProfileDocument extends mongoose.Document {
  user: UserDocument['_id'];
  name: string;
  location: string;
}

export const Profile = mongoose.model<ProfileDocument>('Profile', profileSchema);
