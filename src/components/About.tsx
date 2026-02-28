import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import './About.css';
import data from '../data/dummyData.json';

const About: React.FC = () => {
    const { personal, skillsCategories } = data;

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
        <section id="about" className="section about-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    About Me
                </motion.h2>

                <div className="about-content">
                    <motion.div
                        className="about-text-container glass-card"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="about-text">{personal.about}</p>

                        <div className="stats-container">
                            <div className="stat-item">
                                <span className="stat-number">2+</span>
                                <span className="stat-label">Years of Experience</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">7</span>
                                <span className="stat-label">Production Mobile Apps</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="skills-categories"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {skillsCategories.map((category, index) => (
                            <motion.div key={index} variants={itemVariants} className="category-card glass-card">
                                <h3 className="category-title">{category.title}</h3>
                                <ul className="category-list">
                                    {category.items.map((item, idx) => (
                                        <li key={idx}>
                                            <CheckCircle2 size={16} className="check-icon" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
