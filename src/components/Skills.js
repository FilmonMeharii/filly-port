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
        <div className="skills-grid">
          <div className="skills-card card">
            <h3>Technical</h3>
            <div className="chips">
              <span className="chip">React</span>
              <span className="chip">JavaScript</span>
              <span className="chip">HTML</span>
              <span className="chip">CSS</span>
              <span className="chip">Node.js</span>
            </div>
          </div>

          <div className="skills-card card">
            <h3>Tools & Workflow</h3>
            <div className="chips">
              <span className="chip">Git</span>
              <span className="chip">VSCode</span>
              <span className="chip">Figma</span>
              <span className="chip">Webpack</span>
            </div>
          </div>

          <aside className="description-box card">
            <h3>About My Skills</h3>
            <p>
              As a Computer Science student at Jönköping University, I've
              developed a diverse skill set through projects and coursework.
              My experience includes AI & Computer Vision, Mobile and Web
              development, software design, databases and project management.
            </p>
            <p className="muted">Tools: Git, SQL, PyTorch, SwiftUI, React, Jest</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
