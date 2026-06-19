import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { login as loginApi, logout as logoutApi, getCurrentUser } from "../services/authService";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (data: { email: string; password: string }) => {
    await loginApi(data);
    setUser(await getCurrentUser());
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};