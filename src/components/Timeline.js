import React from 'react';
import '../CSS/Timeline.css';

const timelineData = [
  {
    date: '2025 – Present',
    title: 'MSc Cybersecurity',
    institution: 'Högskolan Väst, Trollhättan',
    description: ''
  },
  {
    date: 'Graduated May 2025',
    title: 'BSc Computer Science',
    institution: 'Jönköping University',
    description: ''
  },
  {
    date: 'Mar 2023 – May 2023',
    title: 'Software Developer Intern',
    institution: 'Sweco',
    description: ''
  },
  {
    date: '2018 – 2021',
    title: 'Natural Science Program',
    institution: 'Katrinelundsgymnasiet',
    description: ''
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
