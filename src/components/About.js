import React, { useEffect, useRef } from 'react';
import '../CSS/About.css';
import CV from '../assets/CV.pdf';

const About = () => {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <div id="about" className="section about" ref={sectionRef}>
      <div className='container'>
        <h2>About Me</h2>
        <div className="terminal card">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button close"></span>
              <span className="terminal-button minimize"></span>
              <span className="terminal-button expand"></span>
            </div>
            <div className="terminal-title">profile.sh</div>
          </div>
          <div className="terminal-body">
            <div className="line">
              <span className="prompt">$</span> whoami
            </div>
            <div className="line output">
              I am a Computer Science graduate from Jönköping University, currently pursuing a MSc in Cybersecurity at Högskolan Väst. I focus on securing systems, intrusion detection, and industrial control system hardening.
            </div>
            <div className="line">
              <span className="prompt">$</span> cat interests.txt
            </div>
            <div className="line output">
              • Threat Intelligence • Penetration Testing • Incident Response • Network Security • System Hardening • Software Development • AI • App Development • System Development • Web Development
            </div>
            <div className="line">
              <span className="prompt">$</span> <span className="cursor">_</span>
            </div>
            <div className="terminal-actions">
              <a href={CV} download="CV_Filmon_Mehari.pdf" className="btn">Download Resume</a>
            </div>
          </div>
        </div>
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
