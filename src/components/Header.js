import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import profile from '../assets/profilePic.svg';
import '../CSS/Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.setAttribute('data-theme', 'dark');
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleTheme = () => {
        // use functional update so we always compute based on previous state
        setIsDarkMode(prev => {
            const newVal = !prev;
            const newTheme = newVal ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            document.body.setAttribute('data-theme', newTheme);
            return newVal;
        });
    };

    return (
        <header className='header'>
            <nav className='navbar'>
                <div className="logo">
                    <Link smooth to='#top'>Home</Link>
                </div>
                <button
                    className="menu-icon"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-navigation"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
                <ul id="primary-navigation" className={isMenuOpen ? 'open' : ''}>
                    <li><Link smooth to='#about' onClick={closeMenu}>About</Link></li>
                    <li><Link smooth to='#skills' onClick={closeMenu}>Skills</Link></li>
                    <li><Link smooth to='#projects' onClick={closeMenu}>Projects</Link></li>
                    <li><Link smooth to='#contact' onClick={closeMenu}>Contact</Link></li>
                    <li>
                        <button
                            className={`light-mode-switch ${isDarkMode ? 'dark' : 'light'}`}
                            onClick={toggleTheme}
                            aria-pressed={isDarkMode}
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? '🌙' : '☀️'}
                        </button>
                    </li>
                </ul>
            </nav>
            <div className='banner'>
                <div className='banner-content'>
                    <div className='text-content'>
                        <h3>Hello, I'm</h3>
                        <h1>Filmon Mehari</h1>
                        <h2>Software Developer</h2>
                    </div>
                    <div className='profile-photo'>
                        <img src={profile} alt='Filmon - Software Developer' />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
