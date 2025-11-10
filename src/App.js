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
import Timeline from './components/Timeline';
import CV from './components/CV';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
  <About />
  <CV />
  <Skills />
        <Projects />
        <Timeline />
        <Contact />          
        <ScrollToTop />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
