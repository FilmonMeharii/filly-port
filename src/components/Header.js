import React from 'react';
import profile from '../profilePic.svg';
import '../CSS/Header.css'


const Header = () => {
    return (
        <header className='header'>
            <nav className='navbar'>
                <ul>
                    <li><a href='#header'>Filmon</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
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
