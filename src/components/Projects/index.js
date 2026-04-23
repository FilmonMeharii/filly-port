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
    lightboxIndex,
    setLightboxIndex,
    handleProjectClick,
    handleCloseClick,
    closeButtonRef,
    modalRef,
    sectionRef,
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
            Browse projects by category first, then open a folder to explore the projects inside.
          </p>
          <p className="projects-count" aria-live="polite">
            Total {visibleCount} project{visibleCount === 1 ? '' : 's'}
          </p>
        </div>
        <ProjectsList
          projects={orderedProjects}
          onProjectClick={handleProjectClick}
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