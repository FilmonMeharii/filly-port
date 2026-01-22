import { useState, useEffect, useRef } from 'react';
import projectsData from './projectsData';

const useProjects = () => {
  const [modalProject, setModalProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleProjectClick = (project) => {
    setModalProject(project);
  };

  const handleCloseClick = () => {
    setModalProject(null);
  };

  // modal focus management
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!modalProject) return;

    const previousActive = document.activeElement;
    // focus the close button for accessibility
    setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setModalProject(null);
      }
      if (e.key === 'Tab' && modalRef.current) {
        // simple focus trap
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
      previousActive?.focus?.();
    };
  }, [modalProject]);

  // animate projects on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const els = document.querySelectorAll('.project');
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Ensure projects are visible after modal interactions (defensive restore)
  useEffect(() => {
    if (modalProject) return; // only when modal closed
    // re-add in-view to any project elements that may have lost it
    const els = document.querySelectorAll('.project');
    els.forEach((el) => {
      if (!el.classList.contains('in-view')) el.classList.add('in-view');
    });
  }, [modalProject]);

  // ensure the whole projects section reveals (parent .section is hidden by default)
  const sectionRef = useRef(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          secObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    secObs.observe(sectionRef.current);
    return () => secObs.disconnect();
  }, []);

  const filterButtons = ['All', 'Cybersecurity', 'AI', 'Mobile', 'Web', 'Database'];

  // small helper to normalize category strings (robust comparison)
  const normalize = (s) => (s || '').toString().toLowerCase().trim();

  const filteredProjects = projectsData
    .filter(project => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      // Search in title, description, category, tags, and details
      const titleMatch = project.title.toLowerCase().includes(lowerSearchTerm);
      const descriptionMatch = project.description.toLowerCase().includes(lowerSearchTerm);
      const categoryMatch = project.category.toLowerCase().includes(lowerSearchTerm);
      const tagsMatch = project.tags && project.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm));
      const detailsMatch = project.details && project.details.some(detail => detail.toLowerCase().includes(lowerSearchTerm));
      return titleMatch || descriptionMatch || categoryMatch || tagsMatch || detailsMatch;
    })
    .filter(project => {
      if (filter === 'All') return true;
      return normalize(project.category) === normalize(filter);
    });

  // Ensure Cybersecurity projects appear first in the listing
  const orderedProjects = [...filteredProjects].sort((a, b) => {
    const aCyber = normalize(a.category) === 'cybersecurity' ? 0 : 1;
    const bCyber = normalize(b.category) === 'cybersecurity' ? 0 : 1;
    if (aCyber !== bCyber) return aCyber - bCyber;
    // fallback to original order by id
    return a.id - b.id;
  });

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (!modalProject || !modalProject.images) return;
      const len = modalProject.images.length;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((idx) => (idx === null ? null : (idx - 1 + len) % len));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((idx) => (idx === null ? null : (idx + 1) % len));
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, modalProject]);

  return {
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
  };
};

export default useProjects;