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
          I have a diverse skill set ranging from front-end technologies like
          React and JavaScript to back-end programming languages such as Java and Python.
          My experience also includes mobile development with Swift and Kotlin, and I am
          proficient in writing efficient and clean code in C++ and building modern, responsive
          designs using HTML and CSS.
        </p>
      </div>
    </section>
  );
};

export default Skills;
