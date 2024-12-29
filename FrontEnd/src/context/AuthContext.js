import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    // Initialize state with token from localStorage if it exists
    return localStorage.getItem('authToken');
  });

  const login = (token) => {
    setAuthToken(token); // Update state
    localStorage.setItem('authToken', token); // Save token to localStorage
  };

  const logout = () => {
    console.log('logout');
    setAuthToken(null); // Clear state
    localStorage.removeItem('authToken'); // Remove token from localStorage
  };

  useEffect(() => {
    // Optionally, sync state with localStorage changes (for example, in case of multi-tab usage)
    const handleStorageChange = () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
