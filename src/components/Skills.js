import React, { useEffect, useRef } from 'react';
import '../CSS/Skills.css';

export default function Skills() {
  const sectionRef = useRef(null);

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
          <aside className="description-box card description-top">
            <h3>About My Skills</h3>
            <p>
              I started with software development at Jönköping University, where I learned programming, mobile app design, and AI. Now at Högskolan Väst, I’m focusing on cybersecurity especially cloud security, IAM and industrial systems protection.
            </p>
            <p className="muted">Tools: Git, GitHub, Docker (basic), SQL, PyTorch</p>
          </aside>

          <div className="skills-card card">
            <h3>Cybersecurity & Cloud</h3>
            <div className="chips">
              <span className="chip">Cloud Security</span>
              <span className="chip">IAM (Identity & Access Management)</span>
              <span className="chip">FortiGate / Fortinet</span>
              <span className="chip">Splunk</span>
              <span className="chip">OpenVAS</span>
              <span className="chip">Tenable</span>
              <span className="chip">Proxmox</span>
              <span className="chip">nftables</span>
              <span className="chip">Fail2Ban</span>
              <span className="chip">Vulnerability scanning</span>
              <span className="chip">System hardening</span>
              <span className="chip">Network defense</span>
            </div>
          </div>

          <div className="skills-card card">
            <h3>Software & AI</h3>
            <div className="chips">
              <span className="chip">Python</span>
              <span className="chip">C++</span>
              <span className="chip">Java</span>
              <span className="chip">Kotlin</span>
              <span className="chip">Swift</span>
              <span className="chip">JavaScript</span>
              <span className="chip">React</span>
              <span className="chip">Node.js</span>
              <span className="chip">Deep Learning (PyTorch)</span>
              <span className="chip">Data Fusion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 