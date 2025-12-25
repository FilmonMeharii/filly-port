import React, { useState, useEffect, useRef } from 'react';
import '../CSS/Projects.css';

const Projects = () => {
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

  const projectsData = [
    // Cybersecurity Labs (latest additions first)
    {
      id: 20,
      title: 'ICS Security & PLC Hardening Lab',
      description: 'A unified cybersecurity case study securing an OpenPLC-based water pump control system with firewall hardening, centralized logging, and attack analysis.',
      category: 'Cybersecurity',
      details: [
        'Environment Setup: deployed Ubuntu VMs for PLC server and HMI using Proxmox VE',
        'PLC Programming: implemented water pump control with safety interlocks in OpenPLC (Structured Text)',
        'Network Hardening: configured nftables to whitelist HMI IP and drop other traffic; implemented segmentation',
        'Logging & Prevention: centralized logs with rsyslog and automated blocking via Fail2Ban',
        'Attack Simulation: performed reconnaissance and verified firewall with pre/post Nmap scans; simulated Modbus/TCP interactions using mbpoll',
        'Case Study Analysis: examined Colonial Pipeline incident to derive practical mitigations (segmentation, MFA, monitoring)',
        'Documentation: collected before/after scans, rulesets, configuration snippets and a written analysis of mitigations'
      ],
      tags: ['ICS Security','PLC','OpenPLC','nftables','Fail2Ban','Modbus','Colonial Pipeline','SCADA'],
      githubLink: ''
    },
    {
      id: 15,
      title: 'Cybersecurity Labs: Reconnaissance & Network Discovery',
      description: 'Hands-on lab covering network reconnaissance techniques and discovery using industry-standard tools. Techniques include WHOIS lookups, DNS enumeration, zone transfers, and subnet identification.',
      category: 'Cybersecurity',
      details: [
        'Performed WHOIS queries for domain and IP ownership research',
        'Conducted DNS zone transfers (dig AXFR) to enumerate DNS records',
        'Used NetBox for network documentation and CIDR notation mapping',
        'Network discovery and active/passive reconnaissance techniques',
        'Created comprehensive network mapping reports identifying hosts, services, and potential entry points',
        'Social engineering reconnaissance basics (OSINT from public sources)'
      ],
      tags: ['Reconnaissance', 'DNS', 'WHOIS', 'Network Mapping', 'OSINT', 'NetBox'],
      githubLink: ''
    },
    {
      id: 16,
      title: 'Cybersecurity Labs: Vulnerability Scanning & Assessment',
      description: 'Practical vulnerability assessment using industry-standard tools (OpenVAS and Nessus) to identify and classify security weaknesses in networks and hosts.',
      category: 'Cybersecurity',
      details: [
        'Configured and deployed OpenVAS for vulnerability scanning on Kali Linux',
        'Used Nessus Professional for enterprise-grade vulnerability assessment',
        'Performed network-wide and targeted host scans',
        'Analyzed CVE database entries and understood CVSS severity scoring',
        'Generated professional vulnerability reports with remediation recommendations',
        'Prioritized findings based on severity, exploitability, and business impact',
        'Demonstrated understanding of common vulnerability classes (OWASP Top 10, CWE)'
      ],
      tags: ['OpenVAS', 'Nessus', 'Vulnerability Assessment', 'CVE', 'CVSS', 'Penetration Testing'],
      githubLink: ''
    },
    {
      id: 17,
      title: 'Cybersecurity Labs: Network Monitoring & Honeypots',
      description: 'Deployment and monitoring of T-Pot honeypot infrastructure to detect, log, and visualize attack patterns using Splunk and multiple honeypot services.',
      category: 'Cybersecurity',
      details: [
        'Deployed T-Pot multi-service honeypot environment (Cowrie SSH, Suricata IDS, Dionaea)',
        'Configured iptables rules for traffic logging and packet capture',
        'Integrated Splunk for centralized logging and log aggregation',
        'Created Splunk dashboards visualizing attack maps, top attackers, and attack patterns',
        'Analyzed honeypot logs to identify attack trends, reconnaissance activities, and exploitation attempts',
        'Captured and analyzed shell interaction logs from compromised honeypot services',
        'Demonstrated understanding of attack lifecycle through real-world attack telemetry'
      ],
      tags: ['Honeypot', 'T-Pot', 'Splunk', 'iptables', 'Log Analysis', 'Network Monitoring', 'IDS'],
      githubLink: ''
    },
    {
      id: 18,
      title: 'Cybersecurity Labs: Web Application Firewalls & Attack Mitigation',
      description: 'Configuration and management of FortiGate Next-Generation Firewall (NGFW) with WAF capabilities to detect and block web-based attacks (SQLi, XSS, etc.).',
      category: 'Cybersecurity',
      details: [
        'Set up FortiGate NGFW and Web Application Firewall (WAF)',
        'Deployed vulnerable web application (DVWA) as attack target',
        'Performed SQL injection (SQLi) and Cross-Site Scripting (XSS) attacks against unprotected application',
        'Configured WAF rules and policies to detect and block injection attacks',
        'Demonstrated successful attack mitigation with before/after screenshots',
        'Created and tuned custom firewall policies for application protection',
        'Analyzed attack logs and firewall block events to verify WAF effectiveness',
        'Documented policy configurations and compliance with security best practices'
      ],
      tags: ['FortiGate', 'WAF', 'NGFW', 'SQLi', 'XSS', 'DVWA', 'Attack Mitigation'],
      githubLink: ''
    },
    {
      id: 19,
      title: 'Cybersecurity Labs: Authentication & Access Control',
      description: 'Implementation of user authentication systems and role-based access control (RBAC) using FortiGate firewalls, RADIUS authentication, and MFA concepts.',
      category: 'Cybersecurity',
      details: [
        'Configured local user database and RADIUS authentication on FortiGate',
        'Implemented role-based access control (RBAC) with multiple permission levels',
        'Set up multi-factor authentication (MFA) concepts and testing',
        'Created authentication policies with user groups and permissions',
        'Configured MAC filtering and dynamic access control rules',
        'Tested discretionary access control (DAC) and mandatory access control (MAC) concepts',
        'Documented authentication scenarios and access control policies',
        'Analyzed authentication logs and access denial events',
        'Demonstrated principle of least privilege in policy configuration'
      ],
      tags: ['RBAC', 'Authentication', 'RADIUS', 'MFA', 'Access Control', 'FortiGate', 'DAC', 'MAC'],
      githubLink: ''
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
    // Bachelor's Thesis
    {
      id: 13,
      title: 'Bachelor\'s Thesis: Counting-People-Using-Video-Camera for Smart Classrooms',
      description: 'A multimodal computer vision system using RGB, depth, and IR cameras with YOLO-based detection to estimate occupancy while preserving privacy.',
      category: 'AI',
      images: [
        require('../assets/thesis/missedToDetectAnd Count.png'),
        require('../assets/thesis/occupancy_plot.png'),
        require('../assets/thesis/1.png'),
        require('../assets/thesis/2.png'),
        require('../assets/thesis/3.png'),
        require('../assets/thesis/4.png')      ],
      details: [
        'Conducted independent research and implemented a real-world computer vision system',
        'Multimodal sensing: RGB, depth, and infrared data fusion with dynamic weighting',
        'Applied YOLO-based person detection and fine-tuned models for classroom settings',
        'Deployed with Intel RealSense D435 and handled sensor synchronization and calibration',
        'Collected and analyzed one week of occupancy logs; evaluated performance under occlusion and low light',
        'Privacy-by-design: only bounding boxes (no facial recognition); system tuned for accuracy and robustness'
      ],
      tags: ['Computer Vision', 'YOLO', 'RealSense', 'Multimodal', 'Deep Learning', 'Data Analysis'],
      githubLink: 'https://github.com/FilmonMeharii/Counting-People-Using-Video-Camera'
    },
    // AI Programming
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
    // Rest of projects
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
    },
    {
      id: 14,
      title: 'FlexiCharge – Agile Software Engineering Project',
      description: 'A multi-squad web application developed using Scrum. I served as Product Owner for the Web-Admin squad, coordinating feature delivery and demos.',
      category: 'Web',
      details: [
        'Served as Product Owner for the Web-Admin squad: sprint planning, demo preparation, and cross-squad coordination',
        'Managed technical debt and planned future improvements',
        'Facilitated retrospectives and improved team processes',
        'Coordinated integration testing and resolved cross-squad issues for final demo presentations',
        'Documented demo scripts and led stakeholder presentation'
      ],
      tags: ['Agile', 'Scrum', 'Product Owner', 'Project Management', 'Web'],
      githubLink: ''
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
  ];

  // small helper to normalize category strings (robust comparison)
  const normalize = (s) => (s || '').toString().toLowerCase().trim();

  const filteredProjects = projectsData
    .filter(project => project.title.toLowerCase().includes(searchTerm.toLowerCase()))
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
                          onClick={() => setLightboxIndex(i)}
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

        {modalProject && lightboxIndex !== null && (
          <div className="lightbox" onClick={() => setLightboxIndex(null)} role="dialog" aria-modal="true">
            <button className="lightbox-nav left" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); const len = modalProject.images.length; setLightboxIndex((lightboxIndex - 1 + len) % len); }}>&larr;</button>
            <img src={modalProject.images[lightboxIndex]} alt={`Expanded ${modalProject.title} screenshot ${lightboxIndex+1}`} />
            <button className="lightbox-nav right" aria-label="Next image" onClick={(e) => { e.stopPropagation(); const len = modalProject.images.length; setLightboxIndex((lightboxIndex + 1) % len); }}>&rarr;</button>
          </div>
        )}



      </div>
    </section>
  );
};

export default Projects;
