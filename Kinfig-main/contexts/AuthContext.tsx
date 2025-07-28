import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { router } from 'expo-router';

interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  family: string;
  gender?: string;
  dob?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // App has now mounted
  }, []);

  useEffect(() => {
    if (hasMounted && !isAuthenticated) {
      router.replace('/auth/splash');
    }
  }, [hasMounted, isAuthenticated]);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    router.replace('/(tabs)');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    router.replace('/auth/splash');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}