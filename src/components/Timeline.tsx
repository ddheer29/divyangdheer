import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import './Timeline.css';
import data from '../data/dummyData.json';

const Timeline: React.FC = () => {
  const { timeline } = data;

  return (
    <section id="timeline" className="section timeline-section">
      <div className="timeline-bg-grid" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>03</span> — Journey
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          My Journey
        </motion.h2>

        <div className="timeline-track">
          {/* Central line */}
          <div className="timeline-rail">
            <motion.div
              className="timeline-rail-fill"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>

          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isEducation = item.title.includes('B.Tech');

            return (
              <motion.div
                key={index}
                className={`timeline-item-3d ${isLeft ? 'tl-left' : 'tl-right'}`}
                initial={{
                  opacity: 0,
                  x: isLeft ? -60 : 60,
                  rotateY: isLeft ? -15 : 15,
                }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
              >
                {/* Node dot */}
                <div className="timeline-node">
                  <div className="timeline-node-icon">
                    {isEducation
                      ? <GraduationCap size={16} />
                      : <Briefcase size={16} />
                    }
                  </div>
                  <div className="timeline-node-ring" />
                </div>

                {/* Card */}
                <motion.div
                  className="timeline-card glass-card"
                  whileHover={{
                    scale: 1.02,
                    rotateY: isLeft ? 2 : -2,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 25px rgba(139,92,246,0.25)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transformPerspective: 800 }}
                >
                  {/* Top accent line */}
                  <div className="timeline-card-accent" />

                  <div className="timeline-meta">
                    <div className="timeline-date">
                      <Calendar size={12} />
                      <span>{item.period}</span>
                    </div>
                    <div className="timeline-location">
                      <MapPin size={12} />
                      <span>India</span>
                    </div>
                  </div>

                  <h3 className="timeline-company">{item.title}</h3>
                  <h4 className="timeline-role">{item.role}</h4>
                  <p className="timeline-desc">{item.description}</p>

                  {/* Status badge */}
                  {index === 0 && (
                    <div className="timeline-current-badge">
                      <span className="badge-dot" />
                      Current
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
