import React, { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import '../CSS/ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
