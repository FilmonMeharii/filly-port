import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import profile from '../assets/profilePic.svg';
import cvFile from '../assets/CV thesis.pdf';
import '../CSS/Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Default to dark mode unless the user previously saved a preference
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            const saved = localStorage.getItem('theme');
            if (saved) return saved === 'dark';
        } catch (e) {
            // ignore storage errors
        }
        return true; // default to dark
    });

    useEffect(() => {
        // Ensure the documentElement reflects the current theme on mount (matches public/index.html inline script)
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        try {
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        } catch (e) {
            // ignore storage errors
        }
    }, [isDarkMode]);

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
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {
                // ignore storage errors
            }
            document.documentElement.setAttribute('data-theme', newTheme);
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
                    <li><a href={cvFile} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>CV</a></li>
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
                        <h2> Computer Science Graduate <br /> Maters's Student in Cybersecurity</h2>
                    </div>
                    {/* TryHackMe public badge — loads a local static copy to avoid login prompts */}
                    <div className='badges'>
                        <iframe
                            className='tryhackme-badge'
                            title='TryHackMe Public Badge'
                            src='https://tryhackme.com/api/v2/badges/public-profile?userPublicId=5838198'
                            style={{ border: 'none' }}
                            loading='lazy'
                            scrolling='no'
                            aria-label='TryHackMe public profile badge'
                        />
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
