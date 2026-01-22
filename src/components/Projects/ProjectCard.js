import React from 'react';
import '../../CSS/Projects/ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      className="project"
      data-project-id={project.id}
      onClick={() => onClick(project)}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <span className="project-category">{project.category}</span>
    </div>
  );
};

export default ProjectCard;