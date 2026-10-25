import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Rocket, 
  Zap, 
  Server, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles,
  type LucideIcon 
} from 'lucide-react';
import './Services.css';
import data from '../data/dummyData.json';

const serviceIcons: Record<string, LucideIcon> = {
  'mvp-dev': Smartphone,
  'store-launch': Rocket,
  'perf-modernization': Zap,
  'fullstack-backend': Server,
};

const Services: React.FC = () => {
  const { services } = data;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="services" className="section services-section">
      <div className="services-bg-glow" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>01</span> — Freelance Services
        </motion.div>

        <div className="services-header-wrap">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            How I Can Help Your Product
          </motion.h2>
          <motion.p
            className="services-header-desc"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Focused, high-velocity mobile engineering packages tailored for founders, startups, and growing teams.
          </motion.p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.id] || Smartphone;
            const isHovered = hoveredId === service.id;

            return (
              <motion.div
                key={service.id}
                className={`service-card glass-card ${isHovered ? 'active-card' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="service-top">
                  <div className="service-icon-box">
                    <Icon size={24} />
                  </div>
                  <div className="service-badges">
                    {service.tag && (
                      <span className="service-tag">
                        <Sparkles size={12} />
                        {service.tag}
                      </span>
                    )}
                    {service.timeline && (
                      <span className="service-timeline">
                        <Clock size={12} />
                        {service.timeline}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>

                <div className="service-deliverables">
                  <span className="deliverables-heading">What's Included:</span>
                  <ul>
                    {service.deliverables.map((item, i) => (
                      <li key={i}>
                        <CheckCircle2 size={15} className="check-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-footer">
                  <a href="#contact" className="service-cta-link">
                    <span>Discuss this project</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Custom inquiry banner */}
        <motion.div
          className="services-custom-banner glass-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="custom-banner-content">
            <h4>Have an existing app or a custom scope?</h4>
            <p>I also offer code audits, dedicated sprint retainers, and custom consulting tailored to your team's needs.</p>
          </div>
          <a href="#contact" className="btn-primary banner-cta">
            <span>Schedule a Free Scope Call</span>
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
