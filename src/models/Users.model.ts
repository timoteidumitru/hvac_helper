import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

export const User = mongoose.model<UserDocument>('User', userSchema);
