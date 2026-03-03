// chatbotData.js
export const portfolioData = {
  personal: {
    name: "Filmon Mehari",
    title: "MSc Student in Cybersecurity | Software Engineer",
    location: "Gothenburg, Sweden",
    contact: {
      email: "filmonmehari08@gmail.com",
      linkedin: "https://linkedin.com/in/filmonmehari",
      github: "https://github.com/FilmonMeharii",
      portfolio: "https://filmonmeharii.github.io/filly-port/"
    },
    summary: "Computer Science graduate currently pursuing an MSc in Cybersecurity. Focuses on applied system hardening and intrusion detection, with hands-on labs and projects across cloud and industrial control systems..."
  },

  skills: {
    cybersecurity: [
      "Cloud Security", "IAM (Identity & Access Management)", "FortiGate / Fortinet", 
      "Splunk", "OpenVAS", "Tenable", "Proxmox", "nftables", "Fail2Ban",
      "Vulnerability scanning", "System hardening", "Network defense",
      "Azure", "Wazuh", "Elastic Security", "SOAR", "T-Pot Honeypot",
      "ICS Security", "PLC Hardening", "Modbus/TCP"
    ],
    programming: [
      "Python", "C++", "Java", "Kotlin", "Swift", "JavaScript",
      "React", "Node.js", "SQL", "Bash"
    ],
    ai: [
      "Deep Learning", "PyTorch", "Computer Vision", "YOLO", "OpenCV",
      "Data Fusion", "Data Analysis"
    ]
  },

  experience: [
    {
      role: "Master Thesis",
      company: "Högskolan Väst",
      period: "Jan 2026 – Present",
      description: "Comparing how fast and accurately two open-source SOAR platforms (Shuffle vs Wazuh+Cortex+TheHive) can automatically block attacks detected by a FortiGate firewall and T-Pot honeypot."
    },
    {
      role: "Backend Developer (Student Project)",
      company: "Husqvarna Group",
      period: "Mar 2025 – Jun 2025",
      description: "Designed database schemas, built REST APIs, and deployed services on AWS EC2 using Docker. Integrated AWS Cognito, S3 and contributed to the final technical presentation delivered to Husqvarna."
    },
    {
      role: "Bachelor Thesis",
      company: "Jönköpings läns museum",
      period: "Jan 2025 – Jun 2025",
      description: "Built a privacy-preserving people counting system using multimodal sensor fusion (RGB, depth, IR) with YOLO-based detection. Fused data with dynamic weighting, fine-tuned YOLO models for classroom settings, deployed on Intel RealSense D435. Privacy by design: no facial recognition."
    },
    {
      role: "Product Owner (Student Project)",
      company: "Knowit",
      period: "Aug 2024 – Nov 2024",
      description: "Led sprint planning, backlog prioritization, and demo preparation as Product Owner for the Web Admin squad. Coordinated cross-team integration, managed technical debt, and presented product achievements to stakeholders."
    },
    {
      role: "System Developer Intern",
      company: "Sweco",
      period: "Mar 2023 – Jun 2023",
      description: "Built a React Native proof-of-concept app integrating maps and REST APIs. Performed unit testing with NUnit, fixed bugs, and improved software performance."
    },
    {
      role: "Stödassistent",
      company: "Göteborgs Stad",
      period: "Jun 2022 – Feb 2023",
      description: "Provided person-centered care to individuals with dementia, ensuring the right person received the right medicine at the right time through strict adherence to protocols and documentation."
    }
  ],

  projects: [
    {
      title: "Azure IoT Security Lab: End-to-End Cloud Infrastructure & Platform Hardening",
      period: "Sep 2025 – Nov 2025",
      description: "Designed and deployed a secure, scalable IoT platform on Azure using ThingsBoard, implementing enterprise-grade security controls, identity management, and encrypted communications in a collaborative team environment."
    },
    {
      title: "ICS Security & PLC Hardening Lab",
      period: "Oct 2024 – Dec 2024",
      description: "A unified cybersecurity case study securing an OpenPLC based water pump control system with firewall hardening (nftables), centralized logging (rsyslog), and attack analysis. Simulated reconnaissance and Modbus attacks, validated firewall rules with Nmap scans."
    },
    {
      title: "Academic Research: Evaluating Azure NSGs for Lateral Movement Containment",
      period: "2025",
      description: "Conducted a controlled experimental study to evaluate the effectiveness of Azure Network Security Groups (NSGs) in preventing lateral threat movement within cloud networks. Achieved 100% blockage while maintaining administrative access."
    },
    {
      title: "SQL: Hotel Management System Database",
      period: "2023",
      description: "A comprehensive relational database system designed to automate and streamline hotel operational workflows. Features include real-time room availability tracking, integrated reservation system, automated billing, and complex SQL queries for revenue analysis."
    },
    {
      title: "Multiplayer Tic Tac Toe (Android)",
      period: "2023",
      description: "A multiplayer Android game with real-time game state synchronization. Players connect to a server, join a lobby, and challenge each other. Implemented custom networking protocols and a user-friendly adaptive interface."
    },
    {
      title: "AI Programming: From Search to Learning",
      period: "2024",
      description: "Implementation of AI algorithms from scratch covering search (A*), rule-based systems (Minimax), supervised learning (KNN, Perceptron), and reinforcement learning (Q-learning)."
    },
    {
      title: "FiliPort Personal E-Portfolio Web Application",
      period: "2023",
      description: "A fully functional personal e-portfolio web application with admin content management, visitor comments, and a contact system. Built with Node.js, Express.js, SQLite3, and Bcrypt authentication."
    },
    {
      title: "Automotive Cybersecurity Standards: ISO/SAE 21434 Implementation & Tooling",
      period: "2025",
      description: "Systematic literature review exploring how ISO/SAE 21434 is implemented, measured and supported by tooling across automotive organizations."
    }
  ],

  education: [
    {
      degree: "MSc in Cybersecurity",
      institution: "Högskolan Väst",
      period: "Sep 2025 – Jun 2026",
      focus: "Cloud Security, Network Security, Cyber-Physical Systems, Risk Management, Compliance"
    },
    {
      degree: "BSc in Computer Science - Software Development and Mobile Platforms",
      institution: "Jönköping University",
      period: "Aug 2022 – Jun 2025",
      focus: "Full-stack development, mobile platforms, algorithms, data structures"
    },
    {
      degree: "Natural Science Program",
      institution: "Katrinelundsgymnasiet",
      period: "Aug 2018 – Jun 2021"
    }
  ],

  certifications: [
    "Cisco CyberOps Associate (Dec 2025)",
    "Körkort B"
  ],

  languages: [
    "Svenska (Full Professional)",
    "Engelska (Full Professional)",
    "Tigrinya (Native or Bilingual)"
  ],

  interests: [
    "Threat Intelligence",
    "Incident Response",
    "System Hardening",
    "ICS Security",
    "Cloud Security",
    "AI & Computer Vision",
    "Software Engineering"
  ]
};

// Language translations for chatbot responses
export const translations = {
  en: {
    greeting: "Hi! I'm Filmon's AI assistant. Ask me about his skills, projects, or experience!",
    skillsIntro: "Filmon specializes in various areas:",
    cybersecurity: "Cybersecurity",
    programming: "Programming",
    projectsIntro: "Filmon has worked on",
    projectsHighlight: "projects. Some highlights:",
    askMore: "Ask me about",
    forMoreDetails: "for more details!",
    experienceAt: "Filmon has experience at:",
    contact: "You can reach Filmon at:",
    interests: "Filmon's main interests:",
    education: "Education",
    focus: "Focus",
    certifications: "Filmon holds:",
    languages: "Filmon speaks:",
    notFound: "Hmm, I couldn't find exactly what you're looking for. Try asking about:",
    skillsExample: "Skills (e.g., 'What does Filmon know about Azure?')",
    projectsExample: "Projects (e.g., 'Tell me about his thesis')",
    experienceExample: "Experience (e.g., 'Where did he work at Sweco?')",
    educationExample: "Education (e.g., 'What degrees does he have?')",
    helpIntro: "I can help you learn about:",
    skillsTech: "Skills & Technologies",
    projectsPortfolio: "Projects & Portfolio",
    educationBackground: "Education & Background",
    workExperience: "Work Experience",
    interestsSpec: "Interests & Specializations",
    contactInfo: "Contact Information",
    justAsk: "Just ask me anything!",
    youreWelcome: "You're welcome! Feel free to ask anything else about Filmon's background or expertise.",
    hello: "Hello! 👋 How can I help you learn more about Filmon's skills and experience?",
    foundInfo: "I found some relevant information:",
    skills: "Skills",
    experience: "Experience",
    at: "at"
  },
  sv: {
    greeting: "Hej! Jag är Filmons AI-assistent. Fråga mig om hans färdigheter, projekt eller erfarenhet!",
    skillsIntro: "Filmon specialiserar sig inom olika områden:",
    cybersecurity: "Cybersäkerhet",
    programming: "Programmering",
    projectsIntro: "Filmon har arbetat med",
    projectsHighlight: "projekt. Några höjdpunkter:",
    askMore: "Fråga mig om",
    forMoreDetails: "för mer detaljer!",
    experienceAt: "Filmon har erfarenhet från:",
    contact: "Du kan nå Filmon på:",
    interests: "Filmons huvudsakliga intressen:",
    education: "Utbildning",
    focus: "Fokus",
    certifications: "Filmon innehar:",
    languages: "Filmon talar:",
    notFound: "Hmm, jag kunde inte hitta exakt vad du letar efter. Prova att fråga om:",
    skillsExample: "Färdigheter (t.ex., 'Vad kan Filmon om Azure?')",
    projectsExample: "Projekt (t.ex., 'Berätta om hans examensarbete')",
    experienceExample: "Erfarenhet (t.ex., 'Var jobbade han på Sweco?')",
    educationExample: "Utbildning (t.ex., 'Vilka examina har han?')",
    helpIntro: "Jag kan hjälpa dig att lära dig om:",
    skillsTech: "Färdigheter & Tekniker",
    projectsPortfolio: "Projekt & Portfölj",
    educationBackground: "Utbildning & Bakgrund",
    workExperience: "Arbetserfarenhet",
    interestsSpec: "Intressen & Specialiseringar",
    contactInfo: "Kontaktinformation",
    justAsk: "Fråga mig vad som helst!",
    youreWelcome: "Varsågod! Fråga gärna mer om Filmons bakgrund eller expertis.",
    hello: "Hej! 👋 Hur kan jag hjälpa dig att lära dig mer om Filmons färdigheter och erfarenhet?",
    foundInfo: "Jag hittade relevant information:",
    skills: "Färdigheter",
    experience: "Erfarenhet",
    at: "på"
  }
};

// Swedish keywords for language detection
export const swedishKeywords = [
  'hej', 'tjena', 'hallå', 'vad', 'hur', 'kan', 'berätta', 'vilka', 'var',
  'färdigheter', 'kompetenser', 'projekt', 'erfarenhet', 'utbildning',
  'examensarbete', 'jobbar', 'jobbat', 'arbetar', 'kunskap', 'om',
  'tack', 'varför', 'när', 'vem', 'berät', 'visa', 'hjälp'
];
