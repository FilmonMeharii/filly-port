import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './CSS/App.css';
import Header from './components/Header';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';
import ScrollToTop from './components/ScrollToTop';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './components/ThemeContext';
import Timeline from './components/Timeline';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Contact />          
          <ThemeToggle />
          <ScrollToTop />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
