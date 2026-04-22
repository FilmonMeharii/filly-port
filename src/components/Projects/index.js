import React from 'react';
import '../../CSS/Projects/Projects.css';
import ProjectsList from './ProjectsList';
import ProjectModal from './ProjectModal';
import ProjectLightbox from './ProjectLightbox';
import useProjects from './useProjects';

const Projects = () => {
  const {
    modalProject,
    setModalProject,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    lightboxIndex,
    setLightboxIndex,
    handleProjectClick,
    handleCloseClick,
    closeButtonRef,
    modalRef,
    sectionRef,
    filterButtons,
    orderedProjects
  } = useProjects();

  const visibleCount = orderedProjects.length;

  return (
    <section id="projects" className="section projects-section" ref={sectionRef}>
      <div className="container">
        <div className="projects-intro">
          <p className="section-kicker">Selected work</p>
          <h2>Featured Projects</h2>
          <p className="projects-summary">
            A focused collection of technical, research, and application projects, with search and filters to narrow the view.
          </p>
          <p className="projects-count" aria-live="polite">
            Showing {visibleCount} project{visibleCount === 1 ? '' : 's'}
          </p>
        </div>
        <ProjectsList
          projects={orderedProjects}
          onProjectClick={handleProjectClick}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
          filterButtons={filterButtons}
        />
        <ProjectModal
          project={modalProject}
          onClose={handleCloseClick}
          closeButtonRef={closeButtonRef}
          modalRef={modalRef}
          setLightboxIndex={setLightboxIndex}
        />
        <ProjectLightbox
          project={modalProject}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
        />
      </div>
    </section>
  );
};

export default Projects;