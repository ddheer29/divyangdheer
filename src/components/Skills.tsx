import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';
import data from '../data/dummyData.json';

const Skills: React.FC = () => {
    const { skills } = data;

    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    Tech Stack
                </motion.h2>

                <div className="skills-container">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="skill-pill"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                                borderColor: 'var(--primary-color)',
                                boxShadow: '0 0 15px var(--primary-glow)'
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            {skill}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
