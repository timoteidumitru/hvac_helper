import React, { createContext, useState } from 'react';

export interface ProfileData {
  userId: string;
  name: string;
  phone: number;
  email: string;
  role: string;
  address: string;
  nextOfKin: { name: string; phone: number };
  bankAcc: { name: string; sort: number; account: number };
  utr: number;
  rate: number;
}

interface Props {
  children: React.ReactNode;
}

interface ProfileContextData {
  errors: boolean;
  showProfile: boolean;
  setErrors: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

export const ProfileContext = createContext<ProfileContextData>({
  errors: false,
  showProfile: false,
  setErrors: () => {},
  setShowProfile: () => {},
  profileData: {
    userId: '',
    name: '',
    phone: 0,
    email: '',
    address: '',
    role: '',
    nextOfKin: { name: '', phone: 0 },
    bankAcc: { name: '', sort: 0, account: 0 },
    utr: 0,
    rate: 0
  },
  setProfileData: () => {}
});

export const ProfileContextProvider: React.FC<Props> = ({ children }) => {
  const [errors, setErrors] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    userId: '',
    name: '',
    phone: 0,
    email: '',
    address: '',
    role: '',
    nextOfKin: { name: '', phone: 0 },
    bankAcc: { name: '', sort: 0, account: 0 },
    utr: 0,
    rate: 0
  });
  return (
    <ProfileContext.Provider value={{ errors, setErrors, profileData, setProfileData, showProfile, setShowProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
