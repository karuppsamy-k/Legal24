import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../../infrastructure/services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for persisted session
    const savedUser = localStorage.getItem('legal24_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await AuthService.login(email, password);
      setUser(userData);
      setRole(userData.role);
      localStorage.setItem('legal24_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const newUser = await AuthService.signup(userData);
      // Auto-login after signup
      setUser(newUser);
      setRole(newUser.role);
      localStorage.setItem('legal24_user', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('legal24_user');
  };

  const value = {
    user,
    role,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
