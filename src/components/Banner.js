import React from 'react';
import profile from '../profilePic.svg';
import '../CSS/Banner.css'


const Banner = () => {
  return (
    <div id='filmon' className="banner">
      <div className='banner-content'>
        <div className='text-content'>
          <h1>Hi <br></br>I'm Filmon <br></br>Software Developer</h1>
          <p></p>
        </div>
        <div className='profile-photo'>
          <img src={profile} alt='profile' style={{ width: '300px', height: '300px', borderRadius: '100%' }} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
