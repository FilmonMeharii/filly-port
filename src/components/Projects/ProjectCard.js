import React from 'react';
import '../../CSS/Projects/ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project" data-project-id={project.id}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <button className="read-more-btn" onClick={() => onClick(project)}>Read More</button>
    </div>
  );
};

export default ProjectCard;