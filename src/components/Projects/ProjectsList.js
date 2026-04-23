import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faBrain,
  faMobileScreenButton,
  faGlobe,
  faDatabase,
  faCode,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons';
import '../../CSS/Projects/ProjectsList.css';
import ProjectCard from './ProjectCard';

const ProjectsList = ({ projects, onProjectClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const groupedProjects = useMemo(() => {
    return projects.reduce((groups, project) => {
      const category = project.category || 'Other';
      if (!groups[category]) groups[category] = [];
      groups[category].push(project);
      return groups;
    }, {});
  }, [projects]);

  const categoryFolders = useMemo(() => {
    return Object.entries(groupedProjects)
      .map(([name, items]) => ({
        name,
        count: items.length,
        preview: items.slice(0, 3).map((item) => item.title)
      }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [groupedProjects]);

  const categoryProjects = selectedCategory ? (groupedProjects[selectedCategory] || []) : [];
  const hasResults = categoryProjects.length > 0;
  const columns = Math.min(4, Math.max(1, Math.ceil(Math.sqrt(categoryProjects.length || 1))));

  const getCategoryIcon = (category) => {
    const normalized = (category || '').toLowerCase();

    if (normalized.includes('cyber')) return faShieldHalved;
    if (normalized.includes('ai')) return faBrain;
    if (normalized.includes('mobile')) return faMobileScreenButton;
    if (normalized.includes('web')) return faGlobe;
    if (normalized.includes('database')) return faDatabase;
    if (normalized.includes('software')) return faCode;
    return faFolderOpen;
  };

  const getCategoryThemeClass = (category) => {
    const normalized = (category || '').toLowerCase();

    if (normalized.includes('cyber')) return 'theme-cyber';
    if (normalized.includes('ai')) return 'theme-ai';
    if (normalized.includes('mobile')) return 'theme-mobile';
    if (normalized.includes('web')) return 'theme-web';
    if (normalized.includes('database')) return 'theme-database';
    if (normalized.includes('software')) return 'theme-software';
    return 'theme-default';
  };

  return (
    <>
      {!selectedCategory ? (
        <div className="category-folders" aria-label="Project category folders">
          {categoryFolders.map((folder) => (
            <button
              key={folder.name}
              className={`category-folder card ${getCategoryThemeClass(folder.name)}`}
              onClick={() => setSelectedCategory(folder.name)}
              aria-label={`Open ${folder.name} category with ${folder.count} projects`}
            >
              <span className="folder-icon" aria-hidden="true">
                <FontAwesomeIcon icon={getCategoryIcon(folder.name)} />
              </span>
              <h3>{folder.name}</h3>
              <p>{folder.count} project{folder.count === 1 ? '' : 's'}</p>
              <div className="folder-preview" aria-hidden="true">
                {folder.preview.map((title) => (
                  <span key={title}>{title}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="category-header card">
            <button className="back-to-folders" onClick={() => setSelectedCategory(null)}>
              Back to categories
            </button>
            <h3>{selectedCategory}</h3>
            <p>{categoryProjects.length} project{categoryProjects.length === 1 ? '' : 's'}</p>
          </div>

          {hasResults ? (
            <div className="projects projects-square" style={{ '--projects-columns': columns }}>
              {categoryProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={onProjectClick} />
              ))}
            </div>
          ) : (
            <div className="projects-empty card">
              <h3>No projects in this category</h3>
              <p>Try another category folder.</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProjectsList;