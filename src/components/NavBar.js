import React from 'react';
import '../CSS/Navbar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div>
                <ul>
                    <li><a href='#filmon'>Filmon</a></li>
                </ul>
            </div>
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    );
}

export default Navbar;
