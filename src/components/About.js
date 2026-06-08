import React, { useEffect, useRef } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import '../CSS/About.css';
import CV from '../assets/CV Generally.pdf';
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
                I'm a Computer Science graduate (BSc 2025) with an MSc in Cybersecurity (2026). My focus is on applied system hardening, intrusion detection, and IAM. My hands-on experience includes Azure IAM (Entra ID, RBAC, MFA, Key Vault), SIEM/SOAR (Wazuh, Elastic), vulnerability assessments (OpenVAS, Nessus), and network security (nftables, firewalls).
              </div>

              <div className="line">
                <span className="prompt">$</span> projects
              </div>
              <div className="line output">
                I've built end-to-end solutions: Azure IAM with Entra ID and OAuth2 SSO, SIEM log analysis pipelines comparing Wazuh and Elastic, ICS security lab with OpenPLC and Modbus/TCP, vulnerability scanning with OpenVAS/Nessus, and full-stack web applications with Node.js and REST APIs.
              </div>

              <div className="line">
                <span className="prompt">$</span> interests
              </div>
              <div className="line output">
                IAM • Cloud Security (Azure) • SIEM / SOC • Network Security • DevSecOps • Zero Trust • Industrial Control Systems (ICS/OT)
              </div>

              <div className="line">
                <span className="prompt">$</span> <span className="cursor">_</span>
              </div>

              <div className="terminal-actions">
                <a href={CV} target="_blank" rel="noopener noreferrer" className="btn" aria-label="Download CV in PDF format">View CV</a>
                <a href={Cert} target="_blank" rel="noopener noreferrer" className="btn" aria-label="View CyberOps Associate certificate in PDF">View Certificate</a>
                <Link smooth to="#skills" className="btn" aria-label="View full skills section">View Skills</Link>
                <Link smooth to="#projects" className="btn" aria-label="View projects section">View Projects</Link>
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