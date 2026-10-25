import Scene3D from './components/Scene3D';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import Services from './components/Services';
import WhyWorkWithMe from './components/WhyWorkWithMe';
import Projects from './components/Projects';
import Pricing from './components/Pricing';
import About from './components/About';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <div className="portfolio-app">
      {/* Global 3D particle background */}
      <Scene3D />

      <CustomCursor />

      {/* Glassmorphic Navbar */}
      <nav className="navbar">
        <div className="navbar-container container">
          <a href="#home" className="logo">
            <span className="logo-text">Divyang</span>
            <span className="logo-dot">.</span>
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#why-me">Why Me</a>
            <a href="#projects">Work</a>
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
            <a href="#contact" className="nav-btn">Start a Project</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <WhyWorkWithMe />
        <Projects />
        <Pricing />
        <About />
        <Timeline />
        <Skills />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}

export default App;
