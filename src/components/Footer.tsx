import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';
import data from '../data/dummyData.json';

const Footer: React.FC = () => {
  return (
    <footer className="clean-footer">
      <div className="container">
        <div className="clean-footer-inner">
          <div className="footer-brand-wrap">
            <a href="#home" className="footer-logo">
              <span className="logo-text">Divyang</span>
              <span className="logo-dot">.</span>
            </a>
            <span className="footer-separator">•</span>
            <p className="footer-copy">
              © {new Date().getFullYear()} Divyang Dheer. All rights reserved.
            </p>
          </div>

          <div className="footer-social-links">
            <a
              href="https://www.linkedin.com/in/divyang-dheer-5731b51b3/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="clean-social-link"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/ddheer29"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="clean-social-link"
            >
              <Github size={18} />
            </a>
            <a
              href={`mailto:${data.personal.email}`}
              aria-label="Email"
              className="clean-social-link"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
