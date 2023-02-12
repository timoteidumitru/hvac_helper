import React, { createContext, useState } from 'react';

interface ProfileData {
  userId: string;
  name: string;
  location: string;
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
  profileData: { userId: '', name: '', location: '' },
  setProfileData: () => {}
});

export const ProfileContextProvider: React.FC<Props> = ({ children }) => {
  const [errors, setErrors] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({ userId: '', name: '', location: '' });
  return (
    <ProfileContext.Provider value={{ errors, setErrors, profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};
