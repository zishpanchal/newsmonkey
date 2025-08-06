import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const lightTheme = {
  bg: '#f0f8ff',
  cardBg: '#f0f8ff',
  text: 'gray.800',
  border: 'gray.800',
  shadow: '#000000',
  navbarBg: 'gray.800',
  footerBg: 'gray.100',
  footerText: 'gray.600',
  headingBg: '#f0f8ff',
  endMessageBg: '#f0f8ff'
};

export const darkTheme = {
  bg: '#1a1a2e',
  cardBg: '#16213e',
  text: 'gray.100',
  border: '#0f3460',
  shadow: '#000000',
  navbarBg: '#0f1419',
  footerBg: '#0f3460',
  footerText: 'gray.300',
  headingBg: '#16213e',
  endMessageBg: '#16213e'
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('newsmonkey-theme');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('newsmonkey-theme', JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};