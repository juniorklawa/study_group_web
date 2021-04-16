import React, { createContext, useContext, useState } from "react";

export interface IUser {
  id: string;
  name: string;
  email: string;
  ra: string;
  groupIds: number[];
}

interface IAuthContextData {
  user: IUser;
  setUser: (user: IUser) => void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
