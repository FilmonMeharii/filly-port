import React from 'react';
import '../CSS/About.css';
import CV from '../assets/CV_Filmon_Mehari.pdf';

const About = () => {
  return (
    <div id="about" className="section about">
      <div className='container'>
        <h2>About Me</h2>
        <p> Hi there👋<br />Fast learner who's passionate about coding, problem-solving,
            and creating tech solutions. Currently building skills in web and mobile development,
            I'm always excited to learn and take on new challenges
          I am currently pursuing a degree in Computer Science with a specialization in Software Development and Mobile Platforms at Jönköping University. 
          I have developed strong skills in programming languages such as C++, Java, Python, JavaScript, Swift, Kotlin, and React. My experience includes 
          several projects in web and mobile development, along with an internship at Sweco, where I worked as a software developer and unit tester. 
          There, I developed a Proof of Concept (POC) app and conducted unit tests, enhancing my technical expertise and problem-solving abilities.
        </p>
        <p>
          <a href={CV} download="CV_Filmon_Mehari.pdf">Download Resume</a>
        </p>
      </div>
    </div>
  );
}

export default About;
