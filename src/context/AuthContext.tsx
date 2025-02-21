'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  confirmed_at?: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<{ user: User | null }>;
  signIn: (email: string, password: string) => Promise<{ user: User | null }>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signUp: async () => ({ user: null }),
  signIn: async () => ({ user: null }),
  signOut: async () => {},
  loading: false,
  isAuthenticated: false
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (_email: string, _password: string) => {
    // In a real app, you would make an API call to your backend
    const mockUser = {
      id: '1',
      email: _email,
      confirmed_at: new Date().toISOString()
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { user: mockUser };
  };

  const signIn = async (_email: string, _password: string) => {
    // In a real app, you would make an API call to your backend
    const mockUser = {
      id: '1',
      email: _email,
      confirmed_at: new Date().toISOString()
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { user: mockUser };
  };

  const signOut = async () => {
    // In a real app, you would make an API call to your backend
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    signUp,
    signIn,
    signOut,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
