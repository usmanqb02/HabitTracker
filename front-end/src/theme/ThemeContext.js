import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the theme and notifications
const ThemeContext = createContext();

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component that wraps the app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState(true);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Store in localStorage to persist the theme
  };

  // Toggle notifications
  const toggleNotifications = () => {
    setNotifications(prev => !prev);
  };

  // Apply theme class to the body element
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme); // Add the class corresponding to the theme
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, notifications, toggleNotifications }}>
      {children}
    </ThemeContext.Provider>
  );
};
