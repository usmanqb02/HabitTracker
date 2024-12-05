// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context to hold authentication state
const AuthContext = createContext();

// AuthProvider to wrap the app and provide authentication state
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
