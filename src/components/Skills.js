import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className='section skills'>
      <div className='container'>
        <h2>Skills</h2>
        <div className="skills-container">
          <div className="skills-box">
            <h3>Skills</h3>
            <ul className="skills-list">
              <li>React</li>
              <li>JavaScript</li>
              <li>Java</li>
              <li>Swift</li>
              <li>C++</li>
              <li>Kotlin</li>
              <li>Phyton</li>
              <li>HTML</li>
              <li>CSS</li>
            </ul>
          </div>
          <div className="description-box">
            <h3>Descriptions</h3>
            <p className="description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sodales ipsum at neque aliquam, vitae rhoncus risus dictum.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
