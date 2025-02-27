import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import profile from '../assets/profilePic.svg'

import '../CSS/Header.css'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className='header'>
            <nav className='navbar'>
                <div className="menu-icon" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={isMenuOpen ? 'open' : ''}>
                    <li><Link smooth to='#top' onClick={closeMenu}>Filmon</Link></li>
                    <li><Link smooth to='#about' onClick={closeMenu}>About</Link></li>
                    <li><Link smooth to='#skills' onClick={closeMenu}>Skills</Link></li>
                    <li><Link smooth to='#projects' onClick={closeMenu}>Projects</Link></li>
                    <li><Link smooth to='#contact' onClick={closeMenu}>Contact</Link></li>
                </ul>
            </nav>
            <div className='banner'>
                <div className='banner-content'>
                    <div className='text-content'>
                        <h1>Hi <br /> I'm Filmon <br /> Software Developer</h1>
                        <p>Passionate about coding and creating innovative solutions.</p>
                    </div>
                    <div className='profile-photo'>
                        <img src={profile} alt='profile' />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
