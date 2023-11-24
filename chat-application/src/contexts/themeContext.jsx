import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const initialMode = localStorage.getItem('mode') || 'light';
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
    console.log('themecontext === ', ThemeContext)
  const context = useContext(ThemeContext);
  return context;
};