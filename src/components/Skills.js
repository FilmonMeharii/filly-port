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
              <p className="muted skills-tip">Tip: click any skill chip to jump directly to the project(s) that demonstrate that skill.</p>
            </aside>

            <div className="skills-panels">
              <div className="skills-card">
                <h3>Cybersecurity & Cloud</h3>
                <div className="chips">
                  <span className="chip" onClick={() => handleSkillClick('Cloud Security')}>Cloud Security</span>
                  <span className="chip" onClick={() => handleSkillClick('IAM (Identity & Access Management)')}>IAM (Identity & Access Management)</span>
                  <span className="chip" onClick={() => handleSkillClick('FortiGate / Fortinet')}>FortiGate / Fortinet</span>
                  <span className="chip" onClick={() => handleSkillClick('Splunk')}>Splunk</span>
                  <span className="chip" onClick={() => handleSkillClick('OpenVAS')}>OpenVAS</span>
                  <span className="chip" onClick={() => handleSkillClick('Tenable')}>Tenable</span>
                  <span className="chip" onClick={() => handleSkillClick('Proxmox')}>Proxmox</span>
                  <span className="chip" onClick={() => handleSkillClick('nftables')}>nftables</span>
                  <span className="chip" onClick={() => handleSkillClick('Fail2Ban')}>Fail2Ban</span>
                  <span className="chip" onClick={() => handleSkillClick('Vulnerability scanning')}>Vulnerability scanning</span>
                  <span className="chip" onClick={() => handleSkillClick('System hardening')}>System hardening</span>
                  <span className="chip" onClick={() => handleSkillClick('Network defense')}>Network defense</span>
                </div>
              </div>

              <div className="skills-card">
                <h3>Software & AI</h3>
                <div className="chips">
                  <span className="chip" onClick={() => handleSkillClick('Python')}>Python</span>
                  <span className="chip" onClick={() => handleSkillClick('C++')}>C++</span>
                  <span className="chip" onClick={() => handleSkillClick('Java')}>Java</span>
                  <span className="chip" onClick={() => handleSkillClick('Kotlin')}>Kotlin</span>
                  <span className="chip" onClick={() => handleSkillClick('Swift')}>Swift</span>
                  <span className="chip" onClick={() => handleSkillClick('JavaScript')}>JavaScript</span>
                  <span className="chip" onClick={() => handleSkillClick('React')}>React</span>
                  <span className="chip" onClick={() => handleSkillClick('Node.js')}>Node.js</span>
                  <span className="chip" onClick={() => handleSkillClick('Deep Learning (PyTorch)')}>Deep Learning (PyTorch)</span>
                  <span className="chip" onClick={() => handleSkillClick('Data Fusion')}>Data Fusion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 