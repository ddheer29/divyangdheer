import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <div className="portfolio-app">
      <CustomCursor />
      <nav className="navbar">
        <div className="navbar-container container">
          <a href="#home" className="logo">
            <span className="logo-text">Divyang</span>
            <span className="logo-dot">.</span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#timeline">Journey</a>
            <a href="#skills">Skills</a>
            <a href="#contact" className="nav-btn">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <Timeline />
        <Skills />
        <Contact />
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Divyang Dheer. All rights reserved.</p>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}

export default App;
