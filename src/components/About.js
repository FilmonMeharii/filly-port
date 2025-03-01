import React from 'react';
import '../CSS/About.css';
import CV from '../assets/CV_Filmon_Mehari.pdf';

const About = () => {
  return (
    <div id="about" className="section about">
      <div className='container'>
        <h2>About Me</h2>
        <p> Hi there👋<br />I'm a final-year Computer Science student at Jönköping University, specializing in Software Development and Mobile Platforms. I'm passionate about coding and problem-solving. I did an internship at Sweco as a software developer and unit tester, where I gained practical experience. Right now, I'm working on my bachelor's thesis using AI to count people in a room with a video camera. I enjoy learning new technologies and solving problems.I am familiar to use C++, Java, Python, Swift, and JavaScript. I also use tools like Git and SQL.I'm always eager to learn new technologies and apply my skills to solve real-world problems. I'm looking for a job to gain more experience and continue growing in the tech field.
        </p>
        <p>
          <a href={CV} download="CV_Filmon_Mehari.pdf">Download Resume</a>
        </p>
      </div>
    </div>
  );
}

export default About;
