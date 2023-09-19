import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String
});

export interface ProfileDocument extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
}

export const Profile = mongoose.model<ProfileDocument>('User', profileSchema);
