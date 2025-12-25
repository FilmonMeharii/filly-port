import React, { useState, useEffect, useRef } from 'react';
import '../CSS/Projects.css';

const Projects = () => {
  const [modalProject, setModalProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxImage, setLightboxImage] = useState(null);

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
    },
    {
      id: 8,
      title: 'Advanced C++ Data Structures & Algorithms',
      description: 'Comprehensive university-level programming assignments covering fundamental and advanced data structures, algorithms, complexity analysis, and recursion. Implemented core CS concepts with hands-on project applications.',
      category: 'Web',
      details: [
        'Pointers, Arrays & Sorting Implemented BubbleSort and InsertSort using pointer arithmetic and index-based loops',
        'Recursion Recursive array functions, binary search, Tower of Hanoi, flood-fill algorithm',
        'Data Structures Linked lists, stacks (array and list-based), queues (FIFO, circular array), BSTs, heaps, hash tables',
        'Complexity Analysis Theoretical and experimental analysis of sorting algorithms (BubbleSort, InsertSort, std::sort)',
        'Tree & Graph Algorithms Tree traversal (pre/in/post-order), BST operations, Dijkstra\'s shortest path algorithm',
        'Advanced Topics Priority queues, heap sort, merge sort, expression parsing (Dijkstra\'s shunting-yard algorithm)',
        'Highlights Graphical paint tool with flood-fill, Tower of Hanoi solver, system queue simulator with priority queues'
      ],
      tags: ['C++', 'Qt', 'Data Structures', 'Algorithms', 'Recursion', 'Complexity Analysis', 'Dijkstra'],
      githubLink: 'https://github.com/FilmonMeharii/Data-Structure-and-Algorithm'
    },
    {
      id: 9,
      title: 'FiliPort Personal E-Portfolio Web Application',
      description: 'A fully functional personal e-portfolio web application that enables developers to showcase projects, skills, and contact information. Features admin content management, visitor comments, and a contact system.',
      category: 'Web',
      details: [
        'Responsive navigation with six sections: Home, About, Projects, Comments, Contact, Login/Logout',
        'Admin can Create, Update, Delete projects, contacts, and comments with session-based authentication',
        'Secure password hashing using Bcrypt and Express-Session middleware',
        'Visitors can view projects and add comments via interactive forms',
        'Contact form with stored details in relational database',
        'Database design with three normalized tables: projects, comments, contacts with proper relationships',
        'Client-server architecture using HTTP requests/responses with Express.js middleware'
      ],
      tags: ['Node.js', 'Express.js', 'SQLite3', 'Bcrypt', 'Handlebars', 'REST APIs', 'Authentication'],
      githubLink: ''
    },
    {
      id: 10,
      title: 'SQL: Hotel Management System Database',
      description: 'A comprehensive relational database system designed to automate and streamline hotel operational workflows, from room inventory management to billing and guest services.',
      category: 'Database',
      details: [
        'Designed normalized relational database for hotel operations with 8 core business entities',
        'Implemented two junction tables to resolve complex many-to-many relationships (Room-Reservation Bridge, Service-Bill Mapping)',
        'Real-time room availability tracking with status indicators and dynamic pricing',
        'Integrated reservation system with date conflict prevention and multi-room assignment support',
        'Automated billing generation with service charge aggregation and multi-method payment processing',
        'Business intelligence queries for revenue analysis by room type, service, and time period',
        'Complete documentation: ER diagrams (Conceptual & Logical), SQL DDL scripts, 8+ complex queries, data dictionary',
        'Constraint definitions (PK, FK, unique, check), index strategy for performance optimization, sample data population'
      ],
      tags: ['SQL', 'Database Design', 'Relational Database', 'ER Modeling', 'Normalization', 'Hotel Management'],
      githubLink: 'https://github.com/FilmonMeharii/SQL-Hotel-Management-System'
    },
    {
      id: 11,
      title: 'AI Programming: From Search to Learning',
      description: 'A comprehensive series of AI algorithm implementations covering four core areas: problem solving (GPS & A*), knowledge & reasoning (rule-based systems & Minimax), supervised learning (KNN & Perceptron), and reinforcement learning (Q-learning).',
      category: 'AI',
      images: [require('../assets/AI-project/KNN.png'), require('../assets/AI-project/Perceptron.png')],
      details: [
        'Search Algorithms (Haskell) General Problem Solver (GPS) with BFS for Solitaire puzzle, A* with Manhattan heuristic for 8-puzzle',
        'Rule-Based Systems & Adversarial Search Forward & backward chaining expert systems, Minimax with Alpha-Beta pruning for binary game trees',
        'Supervised Learning (Python)K-Nearest Neighbors (KNN) for MNIST digit classification (1 vs 6), Perceptron for OR problem, multi-layer perceptron for XOR',
        'Reinforcement Learning (Python) Q-learning for Frozen Lake 8x8 (discrete), linear function approximator for continuous state spaces (Lunar Lander/Acrobot)',
        'All algorithms implemented from scratch in Haskell and Python without ML libraries (only NumPy for basic math)',
        'Modular design separating generic solvers from problem-specific logic; custom training loops and evaluation metrics',
        'Integrated with Gymnasium environments; implemented accuracy, error rate, cumulative reward, and pruning efficiency metrics'
      ],
      tags: ['Haskell', 'Python', 'AI', 'Search Algorithms', 'Machine Learning', 'Reinforcement Learning', 'A*', 'Q-Learning'],
      githubLink: 'https://github.com/FilmonMeharii/AI-Programming'
    },
    {
      id: 12,
      title: 'Aires AB – Drone-Based Emergency Medical Delivery',
      description: 'A comprehensive business plan for a startup proposing AI-assisted, operator-controlled drones to deliver critical medical supplies in emergency situations to hard-to-reach areas.',
      category: 'Web',
      images: [require('../assets/bussiness/budget2025.png'), require('../assets/bussiness/budget2026.png')],
      details: [
        'Business Model Canvas Key partners (hospitals, ambulance services, regulators), revenue streams, cost structure analysis',
        'Financial Analysis Self-cost calculation (SEK 5,322/delivery), pricing strategy (SEK 6,653/delivery with 20% margin), break-even analysis (557 deliveries/year)',
        'Market & Competitor Analysis Target segments (hospitals, ambulance services, remote locations), competitors (Zipline, Everdrone), unique selling points',
        'Risk Assessment Technical, regulatory, economic, market, and environmental risks with probability/impact matrix and mitigation strategies',
        'Operational Plan 6-month roadmap covering company registration, financing, recruitment, technical development, pilot testing, and market launch',
        'Problem-Solution Framework Integration with emergency services (112) for verified need-based deployment of defibrillators, first-aid kits, and adrenaline',
        'Team Contribution Market research, competitor analysis, financial modeling, budget forecasting, and strategic planning'
      ],
      tags: ['Business Planning', 'Financial Modeling', 'Market Analysis', 'Entrepreneurship', 'Risk Management', 'Strategic Planning'],
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
                        <img
                          key={i}
                          src={img}
                          alt={`${modalProject.title} screenshot ${i+1}`}
                          className="project-image"
                          onClick={() => setLightboxImage(img)}
                          role="button"
                          aria-label={`Open image ${i + 1} of ${modalProject.title}`}
                        />
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

        {lightboxImage && (
          <div className="lightbox" onClick={() => setLightboxImage(null)} role="dialog" aria-modal="true">
            <img src={lightboxImage} alt="Expanded project screenshot" />
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
