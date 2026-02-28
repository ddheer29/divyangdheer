import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import './Timeline.css';
import data from '../data/dummyData.json';

const Timeline: React.FC = () => {
    const { timeline } = data;

    return (
        <section id="timeline" className="section timeline-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    My Journey
                </motion.h2>

                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    {timeline.map((item, index) => {
                        const isEducation = item.title.includes("B.Tech");

                        return (
                            <motion.div
                                key={index}
                                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="timeline-icon">
                                    {isEducation ? <GraduationCap size={20} /> : <Briefcase size={20} />}
                                </div>

                                <div className="timeline-content glass-card">
                                    <div className="timeline-date">
                                        <Calendar size={14} />
                                        <span>{item.period}</span>
                                    </div>
                                    <h3 className="timeline-title">{item.title}</h3>
                                    <h4 className="timeline-role">{item.role}</h4>
                                    <p className="timeline-desc">{item.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
