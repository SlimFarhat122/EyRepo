import React, { useState, useEffect } from 'react';
import logo from '../assets/LogoEY.png';
import { NavLink } from 'react-router-dom';
import DarkModeButton from '../DarkMode/DarkModeButton';

const Navbar = () => {
  // Set up theme state; default is "light"
  const [theme, setTheme] = useState('light');

  // When component mounts, load theme from localStorage and update document class
  useEffect(() => {
    const savedTheme = localStorage.getItem('color-theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle function for dark mode switch
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('color-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Function for active/inactive link styles
  const linkclass = ({ isActive }) =>
    isActive 
      ? 'bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded' 
      : 'text-white hover:bg-gray-900 hover:text-white rounded px-3 py-2';

  return (
    <nav className="bg-black border-b border-gray-800">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">
        <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-17 w-auto" src={logo} alt="React Jobs" />
             
            </NavLink>
            <div className="md:ml-auto flex items-center gap-4">
              <NavLink to="/" className={linkclass}>
                Home
              </NavLink>
              <NavLink to="/jobs" className={linkclass}>
                Jobs
              </NavLink>
              <NavLink to="/add-job" className={linkclass}>
                Add Job
              </NavLink>
              <NavLink to="/Test" className={linkclass}>
                Test
              </NavLink>
              <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="theme-toggle"
                  className="sr-only peer"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                              <DarkModeButton />

            
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
