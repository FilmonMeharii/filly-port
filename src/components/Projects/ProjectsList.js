import React from 'react';
import '../../CSS/Projects/ProjectsList.css';
import ProjectCard from './ProjectCard';

const ProjectsList = ({ projects, onProjectClick, searchTerm, setSearchTerm, filter, setFilter, filterButtons }) => {
  const hasResults = projects.length > 0;

  return (
    <>
      <div className="projects-toolbar card">
        <input
          type="text"
          placeholder="Search projects by title, tech, or topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search projects"
        />
        <div className="filter-container" aria-label="Project categories">
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
      </div>

      {hasResults ? (
        <div className="projects">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={onProjectClick} />
          ))}
        </div>
      ) : (
        <div className="projects-empty card">
          <h3>No matching projects</h3>
          <p>Try a different keyword or switch to a broader category.</p>
        </div>
      )}
    </>
  );
};

export default ProjectsList;