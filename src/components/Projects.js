import React, { useState } from 'react';
import '../CSS/Projects.css'

const Projects = () => {
  const [modalProjectIndex, setModalProjectIndex] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleProjectClick = (index) => {
    setModalProjectIndex(index);
  };

  const handleCloseClick = () => {
    setModalProjectIndex(null);
  };

  const filterButtons = ['All', 'Web', 'Mobile', 'Data'];

  const projectsData = [
    { title: 'Weather App', description: 'A mobile app that provides real-time weather updates using OpenWeather API. Built with React Native.', category: 'Mobile' },
    { title: 'E-commerce Website', description: 'A full-stack e-commerce site with a custom shopping cart, payment integration, and admin dashboard. Developed using React, Node.js, and MongoDB.', category: 'Web' },
    { title: 'Chat Application', description: 'A real-time chat application with WebSocket support, featuring user authentication and private messaging. Created with JavaScript and Socket.io.', category: 'Web' },
    { title: 'Portfolio Website', description: 'My personal portfolio showcasing projects and skills, built using React and styled with modern CSS techniques.', category: 'Web' },
    { title: 'Data Analysis Dashboard', description: 'An interactive dashboard for visualizing large datasets, built with Python and Plotly. Supports filtering and custom data visualization.', category: 'Data' },
    { title: 'Todo List App', description: 'A simple but effective to-do list app with task management and reminders. Built using JavaScript, HTML, and CSS.', category: 'Web' },
  ];

  const filteredProjects = projectsData
    .filter(project => project.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(project => filter === 'All' || project.category === filter);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2>Projects</h2>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-container">
          {filterButtons.map(btn => (
            <button 
              key={btn} 
              onClick={() => setFilter(btn)}
              className={filter === btn ? 'active' : ''}
            >
              {btn}
            </button>
          ))}
        </div>
        <div className="projects">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="project"
              onClick={() => handleProjectClick(index)}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span className="project-category">{project.category}</span>
            </div>
          ))}
        </div>

        {modalProjectIndex !== null && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={handleCloseClick}>
                &times;
              </button>
              <h3>{projectsData[modalProjectIndex].title}</h3>
              <p>{projectsData[modalProjectIndex].description}</p>
              <span className="project-category">{projectsData[modalProjectIndex].category}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
