import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import data from '../data/dummyData.json';
import './Contact.css';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-bg" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>05</span> — Contact
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <div className="contact-grid">
          {/* Info panel */}
          <motion.div
            className="contact-info-panel glass-card"
            initial={{ opacity: 0, x: -40, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{ transformPerspective: 900 }}
          >
            <div className="contact-info-top-accent" />
            <h3 className="contact-info-title">Let's build something amazing together</h3>
            <p className="contact-info-sub">
              I'm open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="contact-info-items">
              <a href={`mailto:${data.personal.email}`} className="contact-info-item">
                <div className="contact-info-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="contact-item-label">Email</span>
                  <span className="contact-item-value">{data.personal.email}</span>
                </div>
              </a>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="contact-item-label">Location</span>
                  <span className="contact-item-value">India</span>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="contact-item-label">Phone</span>
                  <span className="contact-item-value">Available upon request</span>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <a
                href="https://github.com/ddheer29"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn"
                aria-label="GitHub"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/divyang-dheer-5731b51b3/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.div
            className="contact-form-panel glass-card"
            initial={{ opacity: 0, x: 40, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ transformPerspective: 900 }}
          >
            <div className="contact-form-top-accent" />
            <h3 className="contact-form-title">Send a Message</h3>

            {sent ? (
              <motion.div
                className="contact-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon">✅</div>
                <p>Message sent! I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="contact-name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Divyang Dheer"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="contact-email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="hello@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    name="message"
                    id="contact-message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <button type="submit" className="btn-primary submit-btn" disabled={sending}>
                  {sending ? (
                    <>
                      <span className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
