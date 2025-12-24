import React, { useState, useEffect, useRef } from 'react';
import '../CSS/Projects.css';

const Projects = () => {
  const [modalProject, setModalProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

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

  const projectsData = [
    {
      id: 1,
      title: 'Cybersecurity Labs',
      description: 'Practical labs at Högskolan Väst where I worked with OpenPLC and network security tools. I configured firewalls, performed vulnerability scans, and set up intrusion detection systems.',
      category: 'Cybersecurity',
      details: [
        'Configured OpenPLC and tested Modbus/TCP scenarios',
        'Set up nftables rules and basic firewall hardening',
        'Performed vulnerability scans and basic IDS using Fail2Ban',
      ],
      tags: ['OpenPLC', 'Modbus', 'nftables', 'IDS']
    },
    {
      id: 5,
      title: 'Cloud Security Lab',
      description: 'Hands-on cloud security lab exploring IAM, MFA, RBAC, secure VM/storage configuration and centralized logging using Splunk and open-source scanning tools.',
      category: 'Cybersecurity',
      details: [
        'Configured Azure-like environments: MFA, RBAC and secure VM onboarding',
        'Integrated Splunk for centralized logging and basic alerting',
        'Performed vulnerability assessments with OpenVAS/Tenable and remediations'
      ],
      tags: ['Cloud Security', 'Azure', 'Splunk', 'OpenVAS']
    },
    {
      id: 2,
      title: 'AI People Counting System',
      description: 'Bachelor’s thesis using RGB, depth, and infrared video data to count people without identifying them. Used deep learning and data fusion to improve accuracy.',
      category: 'AI',
      details: [
        'Implemented deep learning models for people detection',
        'Combined RGB, depth and infrared data for robust counting',
        'Focused on privacy-preserving techniques'
      ],
      tags: ['Deep Learning', 'Data Fusion', 'Privacy']
    },
    {
      id: 3,
      title: 'Mobile App – Sweco Internship',
      description: 'Developed a proof-of-concept mobile app using React Native and REST APIs during my internship. Contributed to unit testing and debugging workflows.',
      category: 'Mobile',
      details: [
        'Implemented key features and integration with REST APIs',
        'Wrote unit tests and fixed bugs',
        'Collaborated with other teams to deliver a POC'
      ],
      tags: ['React Native', 'REST', 'Testing']
    },
    {
      id: 4,
      title: 'iOS Apps (SwiftUI)',
      description: 'Created iOS applications including a weather app and a todo list app using SwiftUI.',
      category: 'Mobile',
      details: [
        'Built apps with SwiftUI and Core Location',
        'Handled data persistence and UI state management',
      ],
      tags: ['SwiftUI', 'iOS']
    }
    ,
    {
      id: 6,
      title: 'Azure IoT Infrastructure Setup & Cloud Security',
      description: 'Designed and deployed a secure IoT infrastructure using Azure-like services and ThingsBoard for telemetry and visualization.',
      category: 'Cybersecurity',
      details: [
        'Created VNet/subnets and deployed Ubuntu VMs for frontend, backend and PostgreSQL',
        'Implemented RBAC and MFA for user access control; used SSH keys and bastion host for management',
        'Deployed ThingsBoard for telemetry ingestion and dashboards; integrated MQTT simulator (Python)'
      ],
      tags: ['Cloud Security','Azure','ThingsBoard','MQTT'],
      githubLink: ''
    },
    {
      id: 7,
      title: 'IoT Platform Hardening — HTTPS & OAuth2',
      description: 'Hardened ThingsBoard deployments with TLS, OAuth2 SSO and secret management using Azure services.',
      category: 'Cybersecurity',
      details: [
        "Configured Let's Encrypt (Certbot) for HTTPS",
        'Integrated Azure AD for OAuth2-based SSO and centralized auth',
        'Used Key Vault-style secrets management and managed identities for secure access in functions'
      ],
      tags: ['TLS','OAuth2','Azure AD','Key Vault'],
      githubLink: ''
    }
  ];

  const filteredProjects = projectsData
    .filter(project => project.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(project => filter === 'All' || project.category === filter);

  // Ensure Cybersecurity projects appear first in the listing
  const orderedProjects = [...filteredProjects].sort((a, b) => {
    const aCyber = a.category === 'Cybersecurity' ? 0 : 1;
    const bCyber = b.category === 'Cybersecurity' ? 0 : 1;
    if (aCyber !== bCyber) return aCyber - bCyber;
    // fallback to original order by id
    return a.id - b.id;
  });

  return (
  <section id="projects" className="section projects-section" ref={sectionRef}>
      <div className="container">
        <h2>Projects</h2>
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
          {orderedProjects.map((project) => (
            <div
              key={project.id}
              className="project"
              onClick={() => handleProjectClick(project)}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span className="project-category">{project.category}</span>
            </div>
          ))}
        </div>

        {modalProject && (
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Details for ${modalProject.title}`}
            onClick={(e) => {
              // close when clicking outside modal content (overlay)
              if (e.target === e.currentTarget) handleCloseClick();
            }}
          >
            <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={handleCloseClick} ref={closeButtonRef} aria-label="Close project details">
                &times;
              </button>
              <h3>{modalProject.title}</h3>
              <p>{modalProject.description}</p>
                  {modalProject.details && (
                    <ul>
                      {modalProject.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  )}

                  {modalProject.images && modalProject.images.length > 0 && (
                    <div className="project-gallery">
                      {modalProject.images.map((img, i) => (
                        <img key={i} src={img} alt={`${modalProject.title} screenshot ${i+1}`} className="project-image" />
                      ))}
                    </div>
                  )}

                  {modalProject.githubLink && modalProject.githubLink.length > 0 && (
                    <p>
                      <a href={modalProject.githubLink} target="_blank" rel="noopener noreferrer">View code on GitHub</a>
                    </p>
                  )}
              {modalProject.githubLink && (
                <p>
                  <a href={modalProject.githubLink} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </p>
              )}
              <span className="project-category">{modalProject.category}</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
