import React, { createContext, useState } from 'react';

interface LoginData {
  _id: string;
  email: string;
  password: string;
}

interface Props {
  children: React.ReactNode;
}

interface LoginContextData {
  errors: boolean;
  setErrors: React.Dispatch<React.SetStateAction<boolean>>;
  loginData: LoginData;
  setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
}

export const LoginContext = createContext<LoginContextData>({
  errors: false,
  setErrors: () => {},
  loginData: { _id: '', email: '', password: '' },
  setLoginData: () => {}
});

export const LoginContextProvider: React.FC<Props> = ({ children }) => {
  const [errors, setErrors] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({ _id: '', email: '', password: '' });
  return (
    <LoginContext.Provider value={{ errors, setErrors, loginData, setLoginData }}>{children}</LoginContext.Provider>
  );
};
