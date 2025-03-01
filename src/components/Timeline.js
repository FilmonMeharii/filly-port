import React from 'react';
import '../CSS/Timeline.css';

const timelineData = [
  {
    date: 'Graduate June 2025',
    title: 'Computer Science Student',
    institution: 'Jönköping University',
    description: 'Specializing in Software Development and Mobile Platforms'
  },
  {
    date: 'March 2024 - May 2024',
    title: 'Software Developer Intern',
    institution: 'Sweco',
    description: 'Conducted unit tests and developed a Proof of Concept (POC) app'
  },
  {
    date: '2018 - 2021',
    title: 'Natural Science',
    institution: 'Katrinelundsgymnasiet',
    description: 'High School Diploma in Natural Science'
  }
];

const Timeline = () => {
  return (
    <section id="experience" className="timeline-section">
      <h2>My Journey</h2>
      <div className="timeline">
        {timelineData.map((item, index) => (
          <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <h4>{item.institution}</h4>
              <p className="date">{item.date}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
