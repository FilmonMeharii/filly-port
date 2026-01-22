import React from 'react';
import '../../CSS/Projects/ProjectsList.css';
import ProjectCard from './ProjectCard';

const ProjectsList = ({ projects, onProjectClick, searchTerm, setSearchTerm, filter, setFilter, filterButtons }) => {
  return (
    <>
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
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={onProjectClick} />
        ))}
      </div>
    </>
  );
};

export default ProjectsList;