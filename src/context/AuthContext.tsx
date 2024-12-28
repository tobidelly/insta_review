import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '../types';
import { useInstagramAuth } from '../hooks/useInstagramAuth';

interface AuthContextType {
  user: User | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
  authenticating: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { authenticate, authenticating } = useInstagramAuth();

  const login = useCallback(async (username: string) => {
    const authenticatedUser = await authenticate(username);
    setUser(authenticatedUser);
  }, [authenticate]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, authenticating }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};