import React, { useEffect, useRef } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import '../CSS/About.css';
import CV from '../assets/CV thesis.pdf';
import Cert from '../assets/CyberOps_Associate_certificate.pdf';

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
                I'm a Computer Science graduate currently pursuing an MSc in Cybersecurity. I focus on applied system hardening and intrusion detection, with hands-on labs and projects across cloud and industrial control systems including FortiGate/WAF tuning, centralized logging with Splunk, vulnerability assessments with OpenVAS/Nessus, and PLC hardening with OpenPLC.
              </div>

              <div className="line">
                <span className="prompt">$</span> projects
              </div>
              <div className="line output">
                I've built and evaluated end-to-end solutions: multimodal computer-vision thesis (RGB+depth+IR YOLO), IoT platform hardening (TLS/OAuth2), and ICS attack simulations with before/after scans and remediation steps.
              </div>

              <div className="line">
                <span className="prompt">$</span> interests
              </div>
              <div className="line output">
                Threat Intelligence • Incident Response • System Hardening • ICS Security • Cloud Security • AI & Computer Vision • Software Engineering
              </div>

              <div className="line">
                <span className="prompt">$</span> <span className="cursor">_</span>
              </div>

              <div className="terminal-actions">
                <a href={CV} target="_blank" rel="noopener noreferrer" className="btn" aria-label="Download CV in PDF format">View CV</a>
                <a href={Cert} target="_blank" rel="noopener noreferrer" className="btn" style={{marginLeft: '8px'}} aria-label="View CyberOps Associate certificate in PDF">View Certificate</a>
                <Link smooth to="#skills" className="btn" style={{marginLeft: '8px'}} aria-label="View full skills section">View Skills</Link>
                <Link smooth to="#projects" className="btn" style={{marginLeft: '8px'}} aria-label="View projects section">View Projects</Link>
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
