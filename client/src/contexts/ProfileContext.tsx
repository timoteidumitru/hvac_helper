import React, { createContext, useState } from 'react';

interface ProfileData {
  userId: string;
  name: string;
  phone: number;
  role: string;
  bankAcc: number;
  sortCode: number;
  utr: number;
  nextOfKin: string;
}

interface Props {
  children: React.ReactNode;
}

interface ProfileContextData {
  errors: boolean;
  setErrors: React.Dispatch<React.SetStateAction<boolean>>;
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

export const ProfileContext = createContext<ProfileContextData>({
  errors: false,
  setErrors: () => {},
  profileData: { userId: '', name: '', phone: 0, role: '', bankAcc: 0, sortCode: 0, utr: 0, nextOfKin: '' },
  setProfileData: () => {}
});

export const ProfileContextProvider: React.FC<Props> = ({ children }) => {
  const [errors, setErrors] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    userId: '',
    name: '',
    phone: 0,
    role: '',
    bankAcc: 0,
    sortCode: 0,
    utr: 0,
    nextOfKin: ''
  });
  return (
    <ProfileContext.Provider value={{ errors, setErrors, profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};
