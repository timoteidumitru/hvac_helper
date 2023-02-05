import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
}

// Data model for insertion into DB
export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, require: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<IUserModel>('User', UserSchema);
