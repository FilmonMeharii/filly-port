import React from 'react';
import '../../CSS/Projects/ProjectModal.css';

const ProjectModal = ({ project, onClose, closeButtonRef, modalRef, setLightboxIndex }) => {
  if (!project) return null;

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${project.title}`}
      onClick={(e) => {
        // close when clicking outside modal content (overlay)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} ref={closeButtonRef} aria-label="Close project details">
          &times;
        </button>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.details && (
          <ul>
            {project.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        )}

        {project.images && project.images.length > 0 && (
          <div className="project-gallery">
            {project.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${project.title} screenshot ${i+1}`}
                className="project-image"
                onClick={() => setLightboxIndex(i)}
                role="button"
                aria-label={`Open image ${i + 1} of ${project.title}`}
              />
            ))}
          </div>
        )}

        {project.pdf && (
          <p style={{ margin: '1rem 0' }}>
            <a
              className="btn"
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full PDF
            </a>
          </p>
        )}

        {project.githubLink && project.githubLink.length > 0 && (
          <p>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">View code on GitHub</a>
          </p>
        )}
        <span className="project-category">{project.category}</span>
      </div>
    </div>
  );
};

export default ProjectModal;