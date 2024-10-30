import React from 'react';
import profile from '../profilePic.svg';

const Banner = () => {
  return (
    <div id='filmon' className="banner">
      <div className='banner-content'>
        <div className='text-content'>
          <h1>Hi <br></br>I'm Filmon <br></br>Software Developer</h1>
          <p><br/>Hi there👋<br/>I'm Filmon Mehari, a Software Engineering student. 
            I'm a fast learner who enjoys diving into the world of coding and tech. 
            I love solving problems, exploring new ideas, and keeping an open mind to learn from every experience. 
            Excited about the endless possibilities in the tech universe.</p>
        </div>
        <div className='profile-photo'>
          <img src={profile} alt='profile' style={{ width: '300px', height: '300px', borderRadius: '100%' }} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
