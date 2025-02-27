import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import profile from '../profilePic.svg';
import '../CSS/Header.css'

const Header = () => {
    return (
        <header className='header'>
            <nav className='navbar'>
                <ul>
                    <li><Link smooth to='#top'>Filmon</Link></li>
                    <li><Link smooth to='#about'>About</Link></li>
                    <li><Link smooth to='#skills'>Skills</Link></li>
                    <li><Link smooth to='#projects'>Projects</Link></li>
                    <li><Link smooth to='#contact'>Contact</Link></li>
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
}

export default Header;
