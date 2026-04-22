import React from 'react';
import '../../CSS/Projects/ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  const featuredTags = (project.tags || []).slice(0, 3);

  return (
    <div className="project" data-project-id={project.id} role="article" tabIndex={0} aria-label={project.title}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {featuredTags.length > 0 && (
        <div className="project-tags" aria-label="Project tags">
          {featuredTags.map((tag) => (
            <span className="project-tag" key={tag}>{tag}</span>
          ))}
        </div>
      )}
      <button className="read-more-btn" onClick={() => onClick(project)}>Read More</button>
    </div>
  );
};

export default ProjectCard;