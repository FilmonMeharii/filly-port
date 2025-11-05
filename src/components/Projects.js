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

  const filterButtons = ['All', 'Web', 'Mobile', 'Data', 'Database'];

  const projectsData = [
    {
      id: 1,
      title: 'Real-Time People Counting System',
      description: 'Developing a deep learning-based system for real-time people counting in classrooms using multi-modal data from RGB, depth, and infrared cameras.',
      category: 'AI/Computer Vision',
      details: [
        'Utilized and fine-tuned a Faster R-CNN model for accurate people detection',
        'Implemented multi-modal data fusion for enhanced accuracy',
        'Optimized for real-time performance and privacy preservation',
        'Achieved significant accuracy improvements over baseline models',
        'Collaborated with Jönköping Museum for real-world testing and deployment'
      ],
      tags: ['Deep Learning', 'PyTorch', 'Computer Vision', 'Multi-Modal Data']
    },
    {
      id: 2,
      title: 'Large-Scale Software Development Project',
      description: 'Participated in a major software development project in collaboration with Knowit, serving as the Product Owner for the Admin Page team.',
      category: 'Software Development',
      details: [
        'Managed requirements and coordinated with stakeholders',
        'Applied agile methodologies (Scrum) and project management skills',
        'Ensured successful implementation of the Admin Page component',
        'Collaborated effectively in a multi-group environment'
      ],
      tags: ['Agile', 'Scrum', 'Product Owner', 'Project Management']
    },
    {
      id: 3,
      title: 'AI Programming with Haskell and Python',
      description: 'Comprehensive course project covering various AI algorithms and concepts using Haskell and Python.',
      category: 'AI',
      details: [
        'Implemented fundamental AI algorithms from scratch',
        'Explored functional programming in Haskell',
        'Covered search algorithms, rule-based systems, supervised learning, and reinforcement learning',
        'Developed intelligent game players and self-learning agents'
      ],
      tags: ['AI', 'Haskell', 'Python', 'Machine Learning']
    },
    {
      id: 4,
      title: 'Weather App with Open Meteo API',
      description: 'An iOS weather application using SwiftUI and the Open Meteo API, providing current and forecast weather data.',
      category: 'Mobile',
      details: [
        'Displays weather for current location and user-defined cities',
        'Shows weather forecast for upcoming days',
        'Integrates Core Location for obtaining user\'s current location',
        'Implements data persistence for user preferences'
      ],
      tags: ['iOS', 'SwiftUI', 'API Integration', 'Core Location']
    },
    {
      id: 5,
      title: 'Java Board Game Framework',
      description: 'A Java-based framework for board games, designed using GRASP principles and MVC pattern.',
      category: 'Software Design',
      details: [
        'Implemented MVC architecture for game design',
        'Applied GRASP design principles for better maintainability and extensibility',
        'Designed for easy adaptation to different board games and rule sets',
        'Focused on clean code and object-oriented design patterns'
      ],
      tags: ['Java', 'OOP', 'Design Patterns', 'MVC']
    },
    {
      id: 6,
      title: 'Hotel Management System',
      description: 'A comprehensive database solution for hotel management, featuring ER diagrams, SQL code, and complex queries.',
      category: 'Database',
      details: [
        'Developed ER Diagrams (Conceptual and Logical)',
        'Implemented SQL code for database creation',
        'Created 8+ SQL queries ranging from simple to complex joins and functions',
        'Designed 6 main tables and 2 middle tables for many-to-many relations'
      ],
      githubLink: 'https://github.com/FilmonMeharii/SQL-Hotel-Management-System',
      tags: ['SQL', 'Database Design', 'ER Modeling']
    },
    {
      id: 7,
      title: 'SwiftUI Todo List App',
      description: 'An iOS app built with SwiftUI and Swift, featuring todo management with categories and filtering capabilities.',
      category: 'Mobile',
      details: [
        'Implemented CRUD operations for todos',
        'Added category system with filtering functionality',
        'Used icons/colors to visualize categories',
        'Implemented data persistence using UserDefaults or @AppStorage'
      ],
      tags: ['iOS', 'SwiftUI', 'Swift', 'Mobile Development']
    },
    {
      id: 8,
      title: 'University Teaching System Domain Model',
      description: 'A comprehensive domain model for university teaching systems, focusing on student-teacher interactions and supporting tools.',
      category: 'System Analysis',
      details: [
        'Created a detailed domain model using UML',
        'Analyzed complex interactions between students, teachers, and administrative systems',
        'Modeled various university systems including PingPong, Ladok, and Kronox',
        'Applied principles of domain-driven design and conceptual modeling'
      ],
      tags: ['UML', 'Domain Modeling', 'System Analysis']
    },
    {
      id: 9,
      title: 'Graphic Design',
      description: 'A comprehensive graphic design project showcasing skills in layout design, branding, and digital illustration.',
      category: 'Design',
      details: [
        'Created coffee table book spreads about a designer',
        'Developed branding and visual identity for a restaurant',
        'Designed a stylized geometric animal illustration using Adobe Illustrator',
        'Applied principles of typography, color theory, and layout design'
      ],
      tags: ['Graphic Design', 'Adobe Illustrator', 'Branding']
    },
    {
      id: 10,
      title: 'Portfolio Website',
      description: 'Personal portfolio website showcasing projects and skills, built using React and modern CSS techniques.',
      category: 'Web',
      details: [
        'Designed and implemented a responsive layout',
        'Created interactive project displays with filtering and search functionality',
        'Implemented smooth scrolling and animations for enhanced user experience',
        'Optimized for performance and accessibility'
      ],
      tags: ['React', 'CSS', 'Responsive Design', 'Web Development']
    }
  ];

  const filteredProjects = projectsData
    .filter(project => project.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(project => filter === 'All' || project.category === filter);

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
          {filteredProjects.map((project) => (
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
