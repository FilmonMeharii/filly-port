import React, { useEffect, useRef } from 'react';
import '../CSS/Skills.css';

export default function Skills() {
  const sectionRef = useRef(null);

  // Map skills to their most relevant project IDs
  const skillProjectMap = {
    // Cybersecurity & Cloud
    'Cloud Security': [5, 25],
    'IAM (Identity & Access Management)': [5, 15, 25],
    'FortiGate / Fortinet': [15],
    'Splunk': [5, 15],
    'OpenVAS': [15],
    'Tenable': [15],
    'Proxmox': [20],
    'nftables': [20],
    'Fail2Ban': [20],
    'Vulnerability scanning': [15],
    'System hardening': [20, 25],
    'Network defense': [15, 20, 25],
    // Software & AI
    'Python': [11, 13, 22],
    'C++': [8],
    'Java': [23],
    'Kotlin': [21],
    'Swift': [4, 26, 27],
    'AI': [11, 13],
    'Machine Learning': [11],
    'JavaScript': [9],
    'React': [9],
    'Node.js': [3, 9],
    'React Native': [3],
    'Deep Learning (PyTorch)': [13],
    'Data Fusion': [13],
  };

  const handleSkillClick = (skill) => {
    const projectIds = skillProjectMap[skill];
    if (projectIds && projectIds.length > 0) {
      // Notify Projects section which project IDs should be focused.
      window.dispatchEvent(
        new CustomEvent('skill-project-focus', {
          detail: { skill, projectIds }
        })
      );

      // Scroll to projects section
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills" ref={sectionRef}>
      <div className="container skills-container">
        <h2>Skills</h2>
        <div className="skills-grid description-top-mode">
          <div className="skills-unified card">
            <aside className="description-box description-top">
              <h3>About My Skills</h3>
              <p>
                I started with software development at Jönköping University, where I learned programming, mobile app design, and AI. Now at Högskolan Väst, I’m focusing on cybersecurity especially cloud security, IAM and industrial systems protection.
              </p>
              <p className="muted">Tools: Git, GitHub, Docker (basic), SQL, PyTorch</p>
              <p className="muted" style={{ marginTop: '0.5rem' }}>Tip: click any skill chip to jump directly to the project(s) that demonstrate that skill.</p>
            </aside>

            <div className="skills-panels">
              <div className="skills-card">
                <h3>Cybersecurity & Cloud</h3>
                <div className="chips">
                  <span className="chip" onClick={() => handleSkillClick('Cloud Security')} style={{ cursor: 'pointer' }}>Cloud Security</span>
                  <span className="chip" onClick={() => handleSkillClick('IAM (Identity & Access Management)')} style={{ cursor: 'pointer' }}>IAM (Identity & Access Management)</span>
                  <span className="chip" onClick={() => handleSkillClick('FortiGate / Fortinet')} style={{ cursor: 'pointer' }}>FortiGate / Fortinet</span>
                  <span className="chip" onClick={() => handleSkillClick('Splunk')} style={{ cursor: 'pointer' }}>Splunk</span>
                  <span className="chip" onClick={() => handleSkillClick('OpenVAS')} style={{ cursor: 'pointer' }}>OpenVAS</span>
                  <span className="chip" onClick={() => handleSkillClick('Tenable')} style={{ cursor: 'pointer' }}>Tenable</span>
                  <span className="chip" onClick={() => handleSkillClick('Proxmox')} style={{ cursor: 'pointer' }}>Proxmox</span>
                  <span className="chip" onClick={() => handleSkillClick('nftables')} style={{ cursor: 'pointer' }}>nftables</span>
                  <span className="chip" onClick={() => handleSkillClick('Fail2Ban')} style={{ cursor: 'pointer' }}>Fail2Ban</span>
                  <span className="chip" onClick={() => handleSkillClick('Vulnerability scanning')} style={{ cursor: 'pointer' }}>Vulnerability scanning</span>
                  <span className="chip" onClick={() => handleSkillClick('System hardening')} style={{ cursor: 'pointer' }}>System hardening</span>
                  <span className="chip" onClick={() => handleSkillClick('Network defense')} style={{ cursor: 'pointer' }}>Network defense</span>
                </div>
              </div>

              <div className="skills-card">
                <h3>Software & AI</h3>
                <div className="chips">
                  <span className="chip" onClick={() => handleSkillClick('Python')} style={{ cursor: 'pointer' }}>Python</span>
                  <span className="chip" onClick={() => handleSkillClick('C++')} style={{ cursor: 'pointer' }}>C++</span>
                  <span className="chip" onClick={() => handleSkillClick('Java')} style={{ cursor: 'pointer' }}>Java</span>
                  <span className="chip" onClick={() => handleSkillClick('Kotlin')} style={{ cursor: 'pointer' }}>Kotlin</span>
                  <span className="chip" onClick={() => handleSkillClick('Swift')} style={{ cursor: 'pointer' }}>Swift</span>
                  <span className="chip" onClick={() => handleSkillClick('JavaScript')} style={{ cursor: 'pointer' }}>JavaScript</span>
                  <span className="chip" onClick={() => handleSkillClick('React')} style={{ cursor: 'pointer' }}>React</span>
                  <span className="chip" onClick={() => handleSkillClick('Node.js')} style={{ cursor: 'pointer' }}>Node.js</span>
                  <span className="chip" onClick={() => handleSkillClick('Deep Learning (PyTorch)')} style={{ cursor: 'pointer' }}>Deep Learning (PyTorch)</span>
                  <span className="chip" onClick={() => handleSkillClick('Data Fusion')} style={{ cursor: 'pointer' }}>Data Fusion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 