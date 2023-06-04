import React, { useState, useEffect } from 'react';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import LOGO from '../assets/logo_wb.png'

export default function Header() {
  const [theme, setTheme] = useState('light');
  const [buttonStyle, setButtonStyle] = useState({});

  useEffect(() => {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  useEffect(() => {
    const html = document.querySelector('html');
    if (localStorage.getItem('theme') === 'dark') {
      html.classList.add('dark');
      setTheme('dark');
    } else {
      html.classList.remove('dark');
      setTheme('light');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    if (localStorage.getItem('theme') === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      setButtonStyle({ transform: 'scale(0)' }); // Apply transform when switching to dark mode
      setTimeout(() => {
        setButtonStyle({ transform: 'scale(1)' }); // Revert transform after a small delay for transition effect
      }, 500);
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      setButtonStyle({ transform: 'scale(0)' }); // Apply transform when switching to light mode
      setTimeout(() => {
        setButtonStyle({ transform: 'scale(1)' }); // Revert transform after a small delay for transition effect
      }, 500);
    }
  };

  return (
    <div className={`bg-bg-light z-50 dark:bg-bg-dark text-primary dark:text-primary-dark min-h-fit p-4 flex justify-between transition-all delay-250 fixed w-full px-5`}>
      <div className="flex">
        <img src={LOGO} className='w-10 h-10' alt="" />
      </div>
      <ul className="flex my-auto">
        <li className="font-semibold px-3 py-2 rounded-md">
          <Link
            to="/"
            className="hover:text-secondary dark:hover:text-secondary-dark hover:bg-lighter-lightDarker hover:dark:bg-lighter-darkLighter px-3 py-2 rounded-md transition-all duration-300 ease-in-out"
          >
            Home
          </Link>
        </li>
        <li className="font-semibold px-3 py-2 rounded-md">
          <Link
            to="/"
            className="hover:text-secondary dark:hover:text-secondary-dark hover:bg-lighter-lightDarker hover:dark:bg-lighter-darkLighter px-3 py-2 rounded-md transition-all duration-300 ease-in-out"
          >
            Coming soon
          </Link>
        </li>
      </ul>

      <div className="flex">
        <button
            onClick={handleThemeSwitch}
            className={`px-2 py-2 my-auto hover:bg-lighter-lightDarker hover:dark:bg-lighter-darkLighter text-primary dark:text-primary-dark rounded-md transition-all delay-250`}
            style={buttonStyle}
        >
            {theme === 'light' ? <BsMoonFill /> : <BsSunFill />}
        </button>
      </div>
    </div>
  );
}
