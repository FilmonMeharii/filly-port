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

  return (
    <section id="projects" className="section projects-section" ref={sectionRef}>
      <div className="container">
        <h2>Projects</h2>
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