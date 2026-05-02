import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Code2, Globe, Server, Rocket } from 'lucide-react';
import './About.css';
import data from '../data/dummyData.json';
import profilePhoto from '../assets/profile/profile_photo.png';

const categoryIcons = [Code2, Globe, Server, Rocket];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 12, y: dx * 12 });
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.03 : 1})`,
        transition: isHovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
    >
      {isHovered && (
        <div
          className="card-glow-spot"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(139,92,246,0.18) 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

const About: React.FC = () => {
  const { personal, skillsCategories } = data;

  return (
    <section id="about" className="section about-section">
      <div className="about-bg-sphere" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>01</span> — About
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          {/* Left: Bio */}
          <TiltCard className="about-bio-card glass-card" delay={0.1}>
            <div className="about-bio-top">
              <div className="about-avatar">
                <img
                  src={profilePhoto || personal.photoUrl}
                  alt={personal.name}
                  className="about-avatar-img"
                />
                <div className="about-avatar-ring" />
              </div>
              <div className="about-bio-header">
                <h3>{personal.name}</h3>
                <p className="about-role">{personal.profession}</p>
              </div>
            </div>
            <p className="about-text">{personal.about}</p>
            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat-n">2+</span>
                <span className="about-stat-l">Years Exp.</span>
              </div>
              <div className="about-stat-divider" />
              <div className="about-stat">
                <span className="about-stat-n">7</span>
                <span className="about-stat-l">Production Apps</span>
              </div>
              <div className="about-stat-divider" />
              <div className="about-stat">
                <span className="about-stat-n">10+</span>
                <span className="about-stat-l">Technologies</span>
              </div>
            </div>
          </TiltCard>

          {/* Right: Skill category cards */}
          <div className="skills-categories">
            {skillsCategories.map((category, index) => {
              const Icon = categoryIcons[index] || Code2;
              return (
                <TiltCard key={index} className="category-card glass-card" delay={index * 0.1 + 0.2}>
                  <div className="category-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <h3 className="category-title">{category.title}</h3>
                  <ul className="category-list">
                    {category.items.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={14} className="check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
