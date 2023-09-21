import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
});

export interface UserDocument extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
  profile: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'Profile';
  };
}

export const User = mongoose.model<UserDocument>('User', userSchema);
