import React, { useEffect, useRef } from 'react';
import '../CSS/About.css';
import CV from '../assets/CV_Filmon_Mehari.pdf';

const About = () => {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <div id="about" className="section about" ref={sectionRef}>
      <div className='container'>
        <h2>About Me</h2>
        <p>
          Hi there 👋<br />
          I’m a Computer Science graduate from Jönköping University, now studying for a Master’s degree in Cybersecurity at Högskolan Väst.
        </p>

        <p>
          My background is in software development and AI, and I’m now exploring cybersecurity through hands-on labs and projects. I’ve worked with PLC systems, firewalls, and intrusion detection while continuing to code in languages like Python, C++, Java, and Swift.
        </p>

        <p>
          I enjoy combining development and security building things and learning how to protect them. I’m currently looking for a Master’s thesis or a part-time cybersecurity role where I can apply both my technical and security knowledge.
        </p>

        <p>
          <a href={CV} download="CV_Filmon_Mehari.pdf">Download Resume</a>
        </p>
      </div>
    </div>
  );
}

  function useReveal(ref) {
    useEffect(() => {
      if (!ref.current) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, [ref]);
  }


export default About;
