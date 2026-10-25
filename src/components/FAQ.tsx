import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageSquare, ArrowRight } from 'lucide-react';
import './FAQ.css';
import data from '../data/dummyData.json';

const FAQ: React.FC = () => {
  const { faqs } = data;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="section faq-section">
      <div className="faq-bg-ambient" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>08</span> — Client Questions
        </motion.div>

        <div className="faq-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="faq-subtitle"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Clear answers on timelines, store approvals, development workflow, and post-launch support.
          </motion.p>
        </div>

        <div className="faq-layout">
          {/* FAQ Accordion */}
          <div className="faq-accordion">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  className={`faq-item glass-card ${isOpen ? 'faq-item-open' : ''}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-question-left">
                      <span className="faq-number">0{index + 1}</span>
                      <span className="faq-question-text">{faq.question}</span>
                    </div>
                    <div className={`faq-toggle-icon ${isOpen ? 'icon-rotated' : ''}`}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-answer-wrap"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="faq-answer-inner">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Quick ask card */}
          <motion.div
            className="faq-sidebar glass-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="faq-sidebar-icon">
              <MessageSquare size={26} />
            </div>
            <h3>Have a specific question?</h3>
            <p>
              Every product has unique requirements. Send me a quick message and I’ll get back to you with honest technical advice within 24 hours.
            </p>
            <a href="#contact" className="btn-primary faq-sidebar-btn">
              <span>Ask Me Directly</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
