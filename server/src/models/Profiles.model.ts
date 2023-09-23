import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  profileData: {
    personal: {
      firstName: String,
      lastName: String,
      phone: Number,
      email: String,
      address: String
    },
    nextOfKin: {
      name: String,
      phone: Number
    },
    bankDetails: {
      institute: String,
      sortCode: Number,
      account: Number
    },
    position: {
      role: String,
      dateStart: Date
    }
  }
});

export interface ProfileDocument extends mongoose.Document {
  profileData: {
    personal: {
      firstName: string;
      lastName: string;
      phone: number;
      email: string;
      address: string;
    };
    nextOfKin: {
      name: string;
      phone: number;
    };
    bankDetails: {
      institute: string;
      sortCode: number;
      account: number;
    };
    position: {
      role: string;
      dateStart: Date;
    };
  };
}

export const Profile = mongoose.model<ProfileDocument>('Profile', profileSchema);
