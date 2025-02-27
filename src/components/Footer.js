import React from 'react';
import '../CSS/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-content'>
          <div className='footer-section'>
            <h3>Filmon Mehari</h3>
            <p>Software Developer</p>
          </div>
          <div className='footer-section'>
            <h3>Contact</h3>
            <p>Email: filmonmehari08@gmail.com</p>
            <p>Phone: +46700395606</p>
          </div>
          <div className='footer-section'>
            <h3>Follow Me</h3>
            <div className='social-links'>
              <a href="https://www.linkedin.com/in/filmon-mehari-452768252/
" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com/FilmonMeharii" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://x.com/Filmon_Mehari01" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>&copy; {new Date().getFullYear()} Filmon Mehari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
