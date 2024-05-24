import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react'; // Optional: for icons

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 bg-primary-100 rounded dark:bg-dark-soft-3 text-primary-800 dark:text-primary-100"
        >
            {theme === 'light' ? <Moon /> : <Sun />}
        </button>
    );
};

export default ThemeSwitcher;
