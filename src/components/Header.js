import React, { useState, useEffect, useRef } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import profile from '../assets/profile pic.svg';
import cvFile from '../assets/CV_Filmon.pdf';
import '../CSS/Header.base.css';
import '../CSS/Header.nav.css';
import '../CSS/Header.responsive.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    // Ref for detecting outside clicks to close the mobile menu
    const navRef = useRef(null);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleOutsideClick = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);

    return (
        <header id='home' className='header'>
            <nav ref={navRef} className='navbar'>
                <button
                    className={`menu-icon ${isMenuOpen ? 'open' : ''}`}
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
                    <li><Link smooth to='#home' onClick={closeMenu}>Home</Link></li>
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
                        <h2> Computer Science Graduate & Master's Student in Cybersecurity</h2>
                        <div className="hero-actions">
                            <iframe
                                className='tryhackme-badge'
                                title='TryHackMe Public Badge'
                                src='https://tryhackme.com/api/v2/badges/public-profile?userPublicId=5838198'
                                style={{ border: 'none' }}
                                loading='lazy'
                                scrolling='no'
                                aria-label='TryHackMe public profile badge'
                            />
                            <a
                                href='https://www.linkedin.com/in/filmon-mehari-452768252/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hero-linkedin'
                                aria-label='Visit my LinkedIn profile'
                            >
                                <FontAwesomeIcon icon={faLinkedin} className='hero-linkedin-icon' aria-hidden='true' />
                                My LinkedIn
                            </a>
                        </div>
                    </div>
                    <div className='profile-photo'>
                        <img src={profile} alt='Filmon Software Developer' />
                    </div>
                </div>
                <div className='header-scroll-cue'>
                    <Link smooth to='#projects' className='hero-cta' onClick={closeMenu} aria-label='Explore my projects'>
                        <span>Explore My Work</span>
                        <span className='hero-cta-pill' aria-hidden='true'>↓</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
