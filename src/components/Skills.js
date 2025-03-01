import React from 'react';
import '../CSS/Skills.css'

const Skills = () => {
  const skillsCategories = {
    'Programming Languages': [
      'C++',
      'JavaScript',
      'Swift',
      'Python',
      'Kotlin',
      'Java',
      'React'
    ],
    'Development Tools': ['Git/GitHub', 'SQL', 'SQLite', 'HTML', 'CSS'],
    'Testing': ['System Testing', 'Unit Testing'],
    'Design': ['Graphic Design']
  };

  return (
    <section  id= "skills" className="skills-container">
      <div className="skills-box">
        <h2>My Skills</h2>
        {Object.entries(skillsCategories).map(([category, skills], index) => (
          <div key={index} className="skills-category">
            <h3>{category}</h3>
            <ul className="skills-list">
              {skills.map((skill, skillIndex) => (
                <li key={skillIndex}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="description-box">
        <h2>About My Skills</h2>
        <p>
          As a Computer Science student at Jönköping University, I've developed a diverse set of skills through various projects and coursework. My experience spans:
          <br />
          • AI and Computer Vision: I've worked on deep learning projects to count people and made AI programs using Haskell and Python.
          <br />
          • Mobile Development: Created iOS apps using SwiftUI, like a quiz app, weather app and a todo list app.
          <br />
          • Web Development: Built a website using React, JavaScript, and CSS.
          <br />
          • Software Design: Developed a Java based board game framework using good design practices.
          <br />
          • Database Work: Designed and implemented a Hotel management system using SQL.
          <br />
          • System Analysis: Created comprehensive domain models for university teaching systems.
          <br />
          • Project Management: Served as a Product Owner in a large-scale software development project.
          <br />
          • Graphic Design: Completed projects in layout design, branding, and digital illustration.
          <br />
        </p>
      </div>
    </section>
  );
};

export default Skills;
