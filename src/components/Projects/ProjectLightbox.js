import React from 'react';
import '../../CSS/Projects/ProjectLightbox.css';

const ProjectLightbox = ({ project, lightboxIndex, setLightboxIndex }) => {
  if (!project || lightboxIndex === null || !project.images) return null;

  const len = project.images.length;

  return (
    <div className="lightbox" onClick={() => setLightboxIndex(null)} role="dialog" aria-modal="true">
      <button className="lightbox-nav left" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + len) % len); }}>&larr;</button>
      <img src={project.images[lightboxIndex]} alt={`Expanded ${project.title} screenshot ${lightboxIndex+1}`} />
      <button className="lightbox-nav right" aria-label="Next image" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % len); }}>&rarr;</button>
    </div>
  );
};

export default ProjectLightbox;