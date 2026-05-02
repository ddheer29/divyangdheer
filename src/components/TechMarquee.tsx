import React from 'react';
import { motion } from 'framer-motion';
import './TechMarquee.css';

const techs = [
  { name: 'React Native', emoji: '📱' },
  { name: 'React.js', emoji: '⚛️' },
  { name: 'Node.js', emoji: '🟢' },
  { name: 'TypeScript', emoji: '🔷' },
  { name: 'MongoDB', emoji: '🍃' },
  { name: 'JavaScript', emoji: '🟡' },
  { name: 'Redux', emoji: '🔴' },
  { name: 'Git', emoji: '🔀' },
  { name: 'REST API', emoji: '🔗' },
  { name: 'Tailwind CSS', emoji: '🎨' },
  { name: 'Expo', emoji: '🚀' },
  { name: 'Firebase', emoji: '🔥' },
];

const TechMarquee: React.FC = () => {
  return (
    <div className="marquee-section">
      <div className="marquee-fade-left" />
      <div className="marquee-fade-right" />

      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {[...techs, ...techs].map((tech, i) => (
          <div key={i} className="marquee-pill">
            <span className="marquee-emoji">{tech.emoji}</span>
            <span className="marquee-name">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
