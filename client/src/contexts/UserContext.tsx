import React, { createContext } from 'react';

export const UserContext = createContext({});

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserContextProviderProps) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UserContext;
