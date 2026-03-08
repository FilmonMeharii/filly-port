import React, { useState, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import { portfolioData, translations, swedishKeywords } from './chatbotData';
import '../CSS/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'sv'
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: translations.en.greeting,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [fuseInstance, setFuseInstance] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const searchableData = [
      ...portfolioData.skills.cybersecurity.map((skill) => ({
        type: 'skill',
        text: skill,
        description: `Cybersecurity skill: ${skill}`
      })),
      ...portfolioData.skills.programming.map((skill) => ({
        type: 'skill',
        text: skill,
        description: `Programming skill: ${skill}`
      })),
      ...portfolioData.skills.ai.map((skill) => ({
        type: 'skill',
        text: skill,
        description: `AI skill: ${skill}`
      })),
      ...portfolioData.projects.map((project) => ({
        type: 'project',
        text: project.title,
        period: project.period,
        description: project.description
      })),
      ...portfolioData.experience.map((experience) => ({
        type: 'experience',
        text: experience.role,
        company: experience.company,
        period: experience.period,
        description: experience.description
      }))
    ];

    const fuse = new Fuse(searchableData, {
      keys: ['text', 'description', 'company', 'period'],
      threshold: 0.35,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2
    });

    setFuseInstance(fuse);
  }, []);

  const synonyms = {
    azure: ['cloud', 'microsoft', 'entra', 'ad', 'iam', 'rbac', 'aws'],
    python: ['py', 'django', 'flask', 'scripting'],
    security: ['cyber', 'säkerhet', 'defense', 'protection', 'vulnerability', 'soc'],
    experience: ['work', 'jobb', 'erfarenhet', 'praktik', 'internship'],
    project: ['projekt', 'built', 'developed', 'byggt', 'thesis', 'examensarbete'],
    education: ['utbildning', 'degree', 'examen', 'university', 'school']
  };

  const expandQuery = (query) => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const expanded = new Set(words);

    words.forEach((word) => {
      Object.entries(synonyms).forEach(([key, values]) => {
        if (word.includes(key) || values.some((value) => word.includes(value) || value.includes(word))) {
          expanded.add(key);
          values.forEach((value) => expanded.add(value));
        }
      });
    });

    return Array.from(expanded);
  };

  const logUnansweredQuestion = (question, lang, suggestion = null) => {
    const storageKey = 'chatbot_unanswered_questions';
    const payload = {
      question,
      language: lang,
      suggestion,
      timestamp: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updated = [...existing, payload].slice(-100);
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to store unanswered question:', error);
    }
  };

  const getUnansweredQuestions = () => {
    const storageKey = 'chatbot_unanswered_questions';
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (error) {
      console.error('Failed to read unanswered questions:', error);
      return [];
    }
  };

  const clearUnansweredQuestions = () => {
    const storageKey = 'chatbot_unanswered_questions';
    try {
      localStorage.removeItem(storageKey);
      return true;
    } catch (error) {
      console.error('Failed to clear unanswered questions:', error);
      return false;
    }
  };

  const createUnansweredExportUrl = (entries) => {
    try {
      const payload = {
        exportedAt: new Date().toISOString(),
        total: entries.length,
        entries
      };
      const encoded = encodeURIComponent(JSON.stringify(payload, null, 2));
      return `data:text/json;charset=utf-8,${encoded}`;
    } catch (error) {
      console.error('Failed to generate export URL:', error);
      return null;
    }
  };

  // Function to parse text and make URLs and emails clickable
  const parseTextWithLinks = (text) => {
    // Split text by lines first to preserve formatting
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Combined pattern for URLs and emails
      const linkPattern = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/[^\s]*|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
      
      const parts = [];
      let lastIndex = 0;
      let match;
      
      // Reset regex
      linkPattern.lastIndex = 0;
      
      while ((match = linkPattern.exec(line)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          parts.push({
            type: 'text',
            content: line.substring(lastIndex, match.index)
          });
        }
        
        // Determine if it's an email or URL
        const matchedText = match[0];
        if (matchedText.includes('@')) {
          parts.push({
            type: 'email',
            content: matchedText
          });
        } else {
          parts.push({
            type: 'url',
            content: matchedText
          });
        }
        
        lastIndex = match.index + matchedText.length;
      }
      
      // Add remaining text
      if (lastIndex < line.length) {
        parts.push({
          type: 'text',
          content: line.substring(lastIndex)
        });
      }
      
      // If no matches, just add the whole line as text
      if (parts.length === 0) {
        parts.push({
          type: 'text',
          content: line
        });
      }
      
      return (
        <React.Fragment key={lineIndex}>
          {parts.map((part, partIndex) => {
            if (part.type === 'email') {
              return (
                <a 
                  key={partIndex} 
                  href={`mailto:${part.content}`}
                  className="message-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {part.content}
                </a>
              );
            } else if (part.type === 'url') {
              const href = part.content.startsWith('http') ? part.content : `https://${part.content}`;
              return (
                <a 
                  key={partIndex} 
                  href={href}
                  className="message-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {part.content}
                </a>
              );
            } else {
              return <span key={partIndex}>{part.content}</span>;
            }
          })}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  // Detect language based on user input
  const detectLanguage = (text) => {
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);
    
    // Check if any Swedish keywords are present
    const hasSwedishKeywords = words.some(word => 
      swedishKeywords.some(keyword => word.includes(keyword))
    );
    
    // Swedish-specific characters
    const hasSwedishChars = /[åäöÅÄÖ]/.test(text);
    
    if (hasSwedishKeywords || hasSwedishChars) {
      return 'sv';
    }
    
    return 'en';
  };

  // Smart search function to find relevant data
  const searchInData = (query) => {
    const lowerQuery = query.toLowerCase();
    let results = {};

    // Search in skills
    const allSkills = [
      ...portfolioData.skills.cybersecurity,
      ...portfolioData.skills.programming,
      ...portfolioData.skills.ai
    ];
    results.matchedSkills = allSkills.filter(skill => 
      skill.toLowerCase().includes(lowerQuery)
    );

    // Search in experience
    results.matchedExperience = portfolioData.experience.filter(exp => 
      exp.role.toLowerCase().includes(lowerQuery) ||
      exp.company.toLowerCase().includes(lowerQuery) ||
      exp.description.toLowerCase().includes(lowerQuery)
    );

    // Search in projects
    results.matchedProjects = portfolioData.projects.filter(proj =>
      proj.title.toLowerCase().includes(lowerQuery) ||
      proj.description.toLowerCase().includes(lowerQuery)
    );

    return results;
  };

  const getBotResponse = (userMessage, lang = 'en') => {
    const message = userMessage.toLowerCase();
    const searchResults = searchInData(message);
    const t = translations[lang]; // Get translations for current language

    if (
      message.includes('show unanswered') ||
      message.includes('unanswered questions') ||
      message.includes('visa obesvarade') ||
      message.includes('obesvarade frågor')
    ) {
      const entries = getUnansweredQuestions();
      if (!entries.length) {
        return lang === 'sv'
          ? 'Inga obesvarade frågor finns loggade ännu.'
          : 'No unanswered questions are logged yet.';
      }

      const preview = entries
        .slice(-10)
        .reverse()
        .map((entry, index) => {
          const suggested = entry.suggestion ? ` | suggestion: ${entry.suggestion}` : '';
          return `${index + 1}. ${entry.question}${suggested}`;
        })
        .join('\n');

      return lang === 'sv'
        ? `Senaste obesvarade frågor (${entries.length} totalt):\n\n${preview}`
        : `Latest unanswered questions (${entries.length} total):\n\n${preview}`;
    }

    if (
      message.includes('clear unanswered') ||
      message.includes('clear logs') ||
      message.includes('rensa obesvarade') ||
      message.includes('rensa logg')
    ) {
      const success = clearUnansweredQuestions();
      if (!success) {
        return lang === 'sv'
          ? 'Kunde inte rensa loggen just nu.'
          : 'Could not clear the log right now.';
      }

      return lang === 'sv'
        ? 'Obesvarade frågor har rensats.'
        : 'Unanswered question logs have been cleared.';
    }

    if (
      message.includes('export unanswered') ||
      message.includes('export logs') ||
      message.includes('exportera obesvarade') ||
      message.includes('exportera logg')
    ) {
      const entries = getUnansweredQuestions();
      if (!entries.length) {
        return lang === 'sv'
          ? 'Ingen loggdata att exportera ännu.'
          : 'No log data available to export yet.';
      }

      const exportUrl = createUnansweredExportUrl(entries);
      if (!exportUrl) {
        return lang === 'sv'
          ? 'Kunde inte skapa exportfilen.'
          : 'Could not generate the export file.';
      }

      return lang === 'sv'
        ? `Export klar (${entries.length} poster). Klicka för att ladda ner JSON:\n${exportUrl}`
        : `Export ready (${entries.length} entries). Click to download JSON:\n${exportUrl}`;
    }

    // Context-aware responses for follow-up questions
    if ((message.includes('more') || message.includes('detail') || message.includes('tell me more') || message.includes('elaborate')) && conversationContext.length > 1) {
      const lastContext = conversationContext[conversationContext.length - 2];
      
      if (lastContext.includes('azure') || lastContext.includes('cloud')) {
        const azureProjects = portfolioData.projects.filter(p => 
          p.title.toLowerCase().includes('azure') || p.description.toLowerCase().includes('cloud')
        );
        return `Here are more details about Filmon's Azure work:\n\n${azureProjects.map(p => 
          `**${p.title}**\n${p.period}\n${p.description}`
        ).join('\n\n')}\n\nHe also has experience with ${portfolioData.skills.cybersecurity.filter(s => s.toLowerCase().includes('azure')).join(', ')}.`;
      }
      
      if (lastContext.includes('project')) {
        return `Here are additional projects:\n\n${portfolioData.projects.slice(3, 6).map(p => 
          `• **${p.title}** (${p.period})`
        ).join('\n')}\n\nAsk about any specific project for more details!`;
      }
      
      if (lastContext.includes('skill')) {
        return `Additional technical skills:\n\n${portfolioData.skills.cybersecurity.slice(5, 12).join(', ')}\n\nFilmon continuously expands his skillset through hands-on projects and coursework.`;
      }
    }

    // Skills related
    if (message.includes('skill') || message.includes('färdighet') || message.includes('kompetens') || message.includes('technology') || message.includes('tech stack') || message.includes('know') || message.includes('kan') || message.includes('can you')) {
      if (searchResults.matchedSkills.length > 0) {
        return lang === 'sv' 
          ? `Jag hittade dessa matchande färdigheter:\n\n${searchResults.matchedSkills.slice(0, 8).join(', ')}${searchResults.matchedSkills.length > 8 ? '...' : ''}\n\n${t.askMore} "Azure", "Python", eller "ICS Security" ${t.forMoreDetails}`
          : `I found these matching skills:\n\n${searchResults.matchedSkills.slice(0, 8).join(', ')}${searchResults.matchedSkills.length > 8 ? '...' : ''}\n\n${t.askMore} "Azure", "Python", or "ICS Security" ${t.forMoreDetails}`;
      }
      return `${t.skillsIntro}\n\n🔒 ${t.cybersecurity}: ${portfolioData.skills.cybersecurity.slice(0, 5).join(', ')}...\n\n💻 ${t.programming}: ${portfolioData.skills.programming.slice(0, 6).join(', ')}\n\n🤖 AI: ${portfolioData.skills.ai.slice(0, 4).join(', ')}`;
    }

    // Experience related
    if (message.includes('experience') || message.includes('erfarenhet') || message.includes('work') || message.includes('job') || message.includes('jobba') || message.includes('worked')) {
      if (searchResults.matchedExperience.length > 0) {
        return searchResults.matchedExperience.slice(0, 2).map(exp => 
          `**${exp.role}** ${t.at} ${exp.company}\n${exp.period}\n${exp.description}`
        ).join('\n\n');
      }
      return `${t.experienceAt}\n\n${portfolioData.experience.slice(0, 4).map(exp => 
        `• ${exp.role} ${t.at} ${exp.company} (${exp.period})`
      ).join('\n')}`;
    }

    // Thesis related (Master/Bachelor)
    if (message.includes('thesis') || message.includes('examensarbete') || message.includes('avhandling')) {
      const thesisWork = portfolioData.experience.filter(exp => 
        exp.role.toLowerCase().includes('thesis')
      );
      if (thesisWork.length > 0) {
        return thesisWork.map(thesis => 
          `**${thesis.role}** ${t.at} ${thesis.company}\n${thesis.period}\n\n${thesis.description}`
        ).join('\n\n');
      }
    }

    // Projects related
    if (message.includes('project') || message.includes('projekt') || message.includes('built') || message.includes('developed') || message.includes('byggt')) {
      if (searchResults.matchedProjects.length > 0) {
        return searchResults.matchedProjects.slice(0, 2).map(proj => 
          `**${proj.title}**\n${proj.period}\n${proj.description}`
        ).join('\n\n');
      }
      return lang === 'sv'
        ? `Filmon har arbetat med ${portfolioData.projects.length}+ projekt. Några höjdpunkter:\n\n${portfolioData.projects.slice(0, 3).map(proj => 
            `• ${proj.title}`
          ).join('\n')}\n\nFråga mig om "Azure", "ICS", eller "AI" projekt för mer detaljer!`
        : `Filmon has worked on ${portfolioData.projects.length}+ projects. Some highlights:\n\n${portfolioData.projects.slice(0, 3).map(proj => 
            `• ${proj.title}`
          ).join('\n')}\n\nAsk me about "Azure", "ICS", or "AI" projects for more details!`;
    }

    // Education related
    if (message.includes('education') || message.includes('utbildning') || message.includes('degree') || message.includes('examen') || message.includes('study') || message.includes('university')) {
      return portfolioData.education.map(edu => 
        `**${edu.degree}**\n${edu.institution}\n${edu.period}\n${t.focus}: ${edu.focus || 'General studies'}`
      ).join('\n\n');
    }

    // Certifications
    if (message.includes('certif') || message.includes('certifikat') || message.includes('credential')) {
      return `${t.certifications}\n\n${portfolioData.certifications.map(cert => `✓ ${cert}`).join('\n')}`;
    }

    // Languages
    if (message.includes('language') || message.includes('språk') || message.includes('speak') || message.includes('talar')) {
      return `${t.languages}\n\n${portfolioData.languages.map(l => `• ${l}`).join('\n')}`;
    }

    // Contact related
    if (message.includes('contact') || message.includes('kontakt') || message.includes('email') || message.includes('reach') || message.includes('nå') || message.includes('hire')) {
      return `${t.contact}\n\n📧 ${portfolioData.personal.contact.email}\n🔗 LinkedIn: ${portfolioData.personal.contact.linkedin}\n💻 GitHub: ${portfolioData.personal.contact.github}\n🌐 Portfolio: ${portfolioData.personal.contact.portfolio}`;
    }

    // Interests
    if (message.includes('interest') || message.includes('intresse') || message.includes('passion') || message.includes('focus')) {
      return `${t.interests}\n\n${portfolioData.interests.map(i => `• ${i}`).join('\n')}`;
    }

    // Azure/Cloud specific
    if (message.includes('azure') || message.includes('cloud') || message.includes('moln') || message.includes('aws')) {
      const azureProjects = portfolioData.projects.filter(p => 
        p.title.toLowerCase().includes('azure') || p.description.toLowerCase().includes('azure')
      );
      if (azureProjects.length > 0) {
        return azureProjects.map(p => 
          `**${p.title}**\n${p.period}\n${p.description}`
        ).join('\n\n');
      }
      return lang === 'sv'
        ? "Filmon har erfarenhet av Azure IAM, RBAC, MFA, Key Vault, NSGs och AWS EC2. Kolla in hans Azure IoT Security Lab-projekt!"
        : "Filmon has experience with Azure IAM, RBAC, MFA, Key Vault, NSGs, and AWS EC2. Check out his Azure IoT Security Lab project!";
    }

    // ICS/PLC specific
    if (message.includes('ics') || message.includes('plc') || message.includes('industrial') || message.includes('scada')) {
      const icsProjects = portfolioData.projects.filter(p => 
        p.title.toLowerCase().includes('ics') || p.title.toLowerCase().includes('plc')
      );
      if (icsProjects.length > 0) {
        return `**${icsProjects[0].title}**\n${icsProjects[0].period}\n\n${icsProjects[0].description}`;
      }
      return "Filmon has hands-on experience with ICS security, PLC hardening, Modbus/TCP security, and industrial control system protection.";
    }

    // AI/Computer Vision specific
    if (message.includes('ai') || message.includes('computer vision') || message.includes('yolo') || message.includes('machine learning')) {
      const aiExperience = portfolioData.experience.find(e => e.role.includes('Bachelor Thesis'));
      if (aiExperience) {
        return `**${aiExperience.role}**\n${aiExperience.company}\n${aiExperience.period}\n\n${aiExperience.description}\n\nFilmon also has skills in: ${portfolioData.skills.ai.join(', ')}`;
      }
      return `Filmon has experience with: ${portfolioData.skills.ai.join(', ')}\n\nAsk about his "Bachelor Thesis" for details on his computer vision project!`;
    }

    // Cybersecurity specific
    if (message.includes('security') || message.includes('cyber') || message.includes('penetration') || message.includes('vulnerability')) {
      return `Filmon specializes in Cybersecurity with focus on:\n\n${portfolioData.skills.cybersecurity.slice(0, 12).join(', ')}\n\nHe's currently pursuing his Master's Thesis on SOAR platforms and automated threat response!`;
    }

    // Programming languages
    if (message.includes('python') || message.includes('java') || message.includes('javascript') || message.includes('react') || message.includes('programming')) {
      return `Filmon is proficient in:\n\n${portfolioData.skills.programming.join(', ')}\n\nHe has built projects using these technologies across web, mobile, and backend development.`;
    }

    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('hej') || message.includes('tjena') || message.includes('hallå')) {
      return t.hello;
    }

    // Thanks
    if (message.includes('thank') || message.includes('thanks') || message.includes('tack')) {
      return t.youreWelcome;
    }

    // Help
    if (message.includes('help') || message.includes('hjälp') || message.includes('what can you') || message.includes('vad kan du') || message.includes('commands')) {
      return lang === 'sv'
        ? `${t.helpIntro}\n\n• ${t.skillsTech}\n• ${t.projectsPortfolio}\n• ${t.educationBackground}\n• ${t.workExperience}\n• ${t.interestsSpec}\n• ${t.contactInfo}\n• ${t.certifications}\n• ${t.languages}\n\nAdmin-kommandon:\n• visa obesvarade\n• exportera obesvarade\n• rensa obesvarade\n\n${t.justAsk}`
        : `${t.helpIntro}\n\n• ${t.skillsTech}\n• ${t.projectsPortfolio}\n• ${t.educationBackground}\n• ${t.workExperience}\n• ${t.interestsSpec}\n• ${t.contactInfo}\n• ${t.certifications}\n• ${t.languages}\n\nAdmin commands:\n• show unanswered\n• export unanswered\n• clear unanswered\n\n${t.justAsk}`;
    }

    // Default response with smart search
    if (searchResults.matchedSkills.length > 0 || searchResults.matchedExperience.length > 0 || searchResults.matchedProjects.length > 0) {
      let response = `${t.foundInfo}\n\n`;
      if (searchResults.matchedSkills.length > 0) {
        response += `${t.skills}: ${searchResults.matchedSkills.slice(0, 5).join(', ')}\n\n`;
      }
      if (searchResults.matchedProjects.length > 0) {
        response += `${t.projectsPortfolio}: ${searchResults.matchedProjects[0].title}\n\n`;
      }
      if (searchResults.matchedExperience.length > 0) {
        response += `${t.experience}: ${searchResults.matchedExperience[0].role} ${t.at} ${searchResults.matchedExperience[0].company}`;
      }
      return response;
    }

    if (fuseInstance) {
      const expandedTerms = expandQuery(message);
      const fuzzyResults = fuseInstance.search(expandedTerms.join(' '));
      const bestMatch = fuzzyResults[0];

      if (bestMatch && typeof bestMatch.score === 'number' && bestMatch.score <= 0.45) {
        const item = bestMatch.item;
        if (item.type === 'project') {
          return lang === 'sv'
            ? `Jag tror att du menar projektet **${item.text}**.\n${item.period || ''}\n${item.description || ''}`
            : `I think you're asking about the project **${item.text}**.\n${item.period || ''}\n${item.description || ''}`;
        }

        if (item.type === 'experience') {
          return lang === 'sv'
            ? `Jag tror att du syftar på **${item.text}** på ${item.company}.\n${item.period || ''}\n${item.description || ''}`
            : `I think you're referring to **${item.text}** at ${item.company}.\n${item.period || ''}\n${item.description || ''}`;
        }

        return lang === 'sv'
          ? `Jag tror att du menar färdigheten **${item.text}**.`
          : `I think you're asking about the skill **${item.text}**.`;
      }

      if (bestMatch && typeof bestMatch.score === 'number' && bestMatch.score <= 0.65) {
        const item = bestMatch.item;
        logUnansweredQuestion(userMessage, lang, item.text);
        return lang === 'sv'
          ? `Jag är inte helt säker, men menade du **${item.text}**?\n${item.description || ''}`
          : `I'm not completely sure, but did you mean **${item.text}**?\n${item.description || ''}`;
      }
    }

    // Enhanced error handling with helpful suggestions
    if (searchResults.matchedSkills.length === 0 && 
        searchResults.matchedExperience.length === 0 && 
        searchResults.matchedProjects.length === 0) {
      logUnansweredQuestion(userMessage, lang);
      return `${t.notFound}\n\n• ${t.skillsExample}\n• ${t.projectsExample}\n• ${t.experienceExample}\n• ${t.educationExample}`;
    }

    return lang === 'sv'
      ? 'Jag är här för att hjälpa dig lära dig om Filmon! Du kan fråga mig om hans färdigheter, projekt, utbildning, erfarenhet, eller hur du kontaktar honom. Vad vill du veta?'
      : 'I\'m here to help you learn about Filmon! You can ask me about his skills, projects, education, experience, or how to contact him. What would you like to know?';
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    // Detect language from user input
    const detectedLang = detectLanguage(inputValue);
    setLanguage(detectedLang);

    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Add to conversation context for better follow-up responses
    setConversationContext(prev => [...prev, inputValue.toLowerCase()]);
    
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(currentInput, detectedLang),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'sv' : 'en';
    setLanguage(newLang);
    
    // Update greeting message if it's the first message
    if (messages.length === 1 && messages[0].type === 'bot') {
      setMessages([{
        type: 'bot',
        text: translations[newLang].greeting,
        timestamp: new Date()
      }]);
    }
  };

  const quickQuestions = language === 'sv' 
    ? [
        'Vilka cybersäkerhetsfärdigheter har du?',
        'Berätta om dina Azure-projekt',
        'Vad handlar ditt examensarbete om?',
        'Hur kan jag kontakta dig?'
      ]
    : [
        'What cybersecurity skills do you have?',
        'Tell me about your Azure projects',
        'What is your Master Thesis about?',
        'How can I contact you?'
      ];

  const handleQuickQuestion = (question) => {
    setInputValue(question);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className={`chatbot-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-header-text">
                <h3>{language === 'sv' ? 'Filmons Assistent' : 'Filmon\'s Assistant'}</h3>
                <span className="chatbot-status">{language === 'sv' ? 'Online' : 'Online'}</span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button 
                className="chatbot-lang-toggle" 
                onClick={toggleLanguage}
                title={language === 'sv' ? 'Switch to English' : 'Byt till Svenska'}
                aria-label="Toggle language"
              >
                {language === 'sv' ? '🇬🇧' : '🇸🇪'}
              </button>
              <button className="chatbot-close" onClick={toggleChat}>✕</button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-wrapper">
                  <div className="message-content">
                    {parseTextWithLinks(message.text)}
                  </div>
                  {message.type === 'bot' && (
                    <button 
                      className="copy-message" 
                      onClick={() => copyToClipboard(message.text, index)}
                      title={copiedIndex === index ? "Copied!" : "Copy to clipboard"}
                      aria-label="Copy message to clipboard"
                    >
                      {copiedIndex === index ? '✓' : '📋'}
                    </button>
                  )}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot">
                <div className="message-content typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="quick-questions">
              <div className="quick-questions-label">
                {language === 'sv' ? 'Snabbfrågor:' : 'Quick questions:'}
              </div>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input-container">
            <input
              type="text"
              className="chatbot-input"
              placeholder={language === 'sv' ? 'Fråga mig vad som helst...' : 'Ask me anything...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="chatbot-send"
              onClick={handleSend}
              disabled={inputValue.trim() === ''}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
