import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import data from '../data/dummyData.json';
import './Contact.css';

const Contact: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate sending form
        alert("Thank you for your message! This is a demo so no email was actually sent.");
        setFormState({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    Get In Touch
                </motion.h2>

                <div className="contact-container glass-card">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3>Let's talk about everything!</h3>
                        <p>
                            I am open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="info-items">
                            <div className="info-item">
                                <div className="info-icon">
                                    <Mail size={20} />
                                </div>
                                <span>{data.personal.email}</span>
                            </div>
                            <div className="info-item">
                                <div className="info-icon">
                                    <MapPin size={20} />
                                </div>
                                <span>India</span>
                            </div>
                            <div className="info-item">
                                <div className="info-icon">
                                    <Phone size={20} />
                                </div>
                                <span>Available upon request</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="contact-form-container"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                />
                                <label htmlFor="name">Your Name</label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    required
                                />
                                <label htmlFor="email">Your Email</label>
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={5}
                                    value={formState.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                                <label htmlFor="message">Your Message</label>
                            </div>
                            <button type="submit" className="btn-primary submit-btn">
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
