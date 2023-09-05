import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String
});

export interface UserDocument extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
}

export const User = mongoose.model<UserDocument>('User', userSchema);
