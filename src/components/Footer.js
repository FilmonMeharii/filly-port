import React from 'react';
import '../CSS/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faTwitter} from '@fortawesome/free-brands-svg-icons'; // Ensure all icons are imported
import { faEnvelope as faEnvelopeSolid, faPhone as faPhoneSolid } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-content'>
          <div className='footer-section'>
            <div className="contact-info">
              <p>
                <FontAwesomeIcon icon={faEnvelopeSolid} />
                filmonmehari08@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhoneSolid} />
                +46700395606
              </p>
            </div>
          </div>
          <div className='footer-section'>
            <div className='social-links'>
              <a href="https://www.linkedin.com/in/filmon-mehari-452768252/" target="_blank" rel="noopener noreferrer">
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
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
