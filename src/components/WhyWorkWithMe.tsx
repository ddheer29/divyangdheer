import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Code2, Smartphone, Check, Sparkles, type LucideIcon } from 'lucide-react';
import './WhyWorkWithMe.css';
import data from '../data/dummyData.json';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  ShieldCheck,
  Code2,
  Smartphone,
};

const WhyWorkWithMe: React.FC = () => {
  const { whyMe } = data;

  if (!whyMe) return null;

  return (
    <section id="why-me" className="section why-me-section">
      <div className="why-me-bg-radial" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>02</span> — The Freelance Advantage
        </motion.div>

        <div className="why-me-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {whyMe.title}
          </motion.h2>
          <motion.p
            className="why-me-subtitle"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {whyMe.subtitle}
          </motion.p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="why-pillars-grid">
          {whyMe.pillars.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon] || Zap;

            return (
              <motion.div
                key={idx}
                className="pillar-card glass-card"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="pillar-top">
                  <div className="pillar-icon-wrap">
                    <Icon size={22} />
                  </div>
                  <span className="pillar-number">0{idx + 1}</span>
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-description">{pillar.description}</p>
                <div className="pillar-footer">
                  <div className="pillar-badge">
                    <Check size={12} />
                    <span>Verified standard</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats highlight strip */}
        <motion.div
          className="why-stats-strip glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="stats-strip-badge">
            <Sparkles size={14} />
            <span>Track Record</span>
          </div>
          <div className="stats-strip-items">
            {whyMe.stats.map((stat, i) => (
              <div key={i} className="strip-item">
                <span className="strip-val">{stat.value}</span>
                <span className="strip-lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWorkWithMe;
