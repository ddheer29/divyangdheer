import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import './Hero.css';
import personalData from '../data/dummyData.json';

const Hero: React.FC = () => {
  const { personal } = personalData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section id="home" className="hero-section">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="container hero-container">
        <motion.div
          className="hero-image-wrapper floating"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="hero-image-glow"></div>
          <img src={personal.photoUrl} alt={personal.name} className="hero-image" />
        </motion.div>

        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={itemVariants} className="hero-greeting">
            Hello, I'm
          </motion.h2>
          <motion.h1 variants={itemVariants} className="hero-name">
            {personal.name}
          </motion.h1>
          <motion.h3 variants={itemVariants} className="hero-profession">
            {personal.profession}
          </motion.h3>
          <motion.p variants={itemVariants} className="hero-description">
            Building scalable, production-ready web and mobile applications with cutting-edge technologies. Let's create something extraordinary together.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-actions">
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">
                View Work
              </a>
              {/* TODO: Place your actual resume PDF in the 'public' folder named 'resume.pdf' */}
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <span>Download CV</span>
                <Download size={18} />
              </a>
            </div>
            <div className="hero-socials">
              <a href="https://www.linkedin.com/in/divyang-dheer-5731b51b3/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon"><Linkedin size={22} /></a>
              <a href="https://github.com/ddheer29" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon"><Github size={22} /></a>
              <a href={`mailto:${personal.email}`} aria-label="Email" className="social-icon"><Mail size={22} /></a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <a href="#about" aria-label="Scroll Down">
          <ArrowDown size={24} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
