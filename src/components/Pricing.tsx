import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  FileCheck2, 
  Zap, 
  Wrench,
  Smartphone,
  Layers,
  HeartHandshake,
  type LucideIcon
} from 'lucide-react';
import './Pricing.css';
import data from '../data/dummyData.json';

const tierIcons: Record<string, LucideIcon> = {
  'quick-tasks': Wrench,
  'feature-dev': Layers,
  'mvp-app': Smartphone,
  'maintenance': HeartHandshake,
};

const Pricing: React.FC = () => {
  const { pricing } = data;
  const [currency, setCurrency] = useState<'inr' | 'usd'>('inr');

  if (!pricing) return null;

  const currentHourly = pricing.hourly[currency];

  return (
    <section id="pricing" className="section pricing-section">
      <div className="pricing-bg-glow" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>04</span> — Pricing & Packages
        </motion.div>

        <div className="pricing-header-wrap">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {pricing.title}
          </motion.h2>
          <motion.p
            className="pricing-header-desc"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {pricing.subtitle}
          </motion.p>

          {/* Currency Switcher */}
          <motion.div 
            className="currency-toggle-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="currency-toggle">
              <button
                className={`currency-btn ${currency === 'inr' ? 'active' : ''}`}
                onClick={() => setCurrency('inr')}
                type="button"
                aria-label="Switch to Indian Rupee (INR)"
              >
                <span>🇮🇳 INR (₹)</span>
              </button>
              <button
                className={`currency-btn ${currency === 'usd' ? 'active' : ''}`}
                onClick={() => setCurrency('usd')}
                type="button"
                aria-label="Switch to US Dollar (USD)"
              >
                <span>🌎 USD ($)</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Hourly Banner Callout */}
        <motion.div
          className="hourly-card glass-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="hourly-left">
            <div className="hourly-icon-box">
              <Clock size={24} />
            </div>
            <div>
              <div className="hourly-badge">Flexible Hourly Billing</div>
              <h3 className="hourly-title">Dedicated Hourly Rate</h3>
              <p className="hourly-desc">{currentHourly.desc}</p>
            </div>
          </div>
          <div className="hourly-right">
            <div className="hourly-price-box">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={currency}
                  className="hourly-price-val"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentHourly.rate}
                </motion.span>
              </AnimatePresence>
              <span className="hourly-price-unit">{currentHourly.unit}</span>
            </div>
            <a href="#contact" className="btn-ghost hourly-cta">
              <span>Book Hourly Sprints</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>

        {/* 4 Pricing Cards Grid */}
        <div className="pricing-grid">
          {pricing.tiers.map((tier, index) => {
            const Icon = tierIcons[tier.id] || Zap;
            const priceVal = tier.price[currency];

            return (
              <motion.div
                key={tier.id}
                className={`pricing-card glass-card ${tier.isPopular ? 'popular-card' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {tier.isPopular && (
                  <div className="popular-badge-strip">
                    <Sparkles size={12} />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div className="pricing-card-header">
                  <div className="pricing-icon-wrap">
                    <Icon size={22} />
                  </div>
                  <span className="tier-tag">{tier.tag}</span>
                </div>

                <h3 className="tier-name">{tier.name}</h3>
                <p className="tier-desc">{tier.description}</p>

                <div className="tier-price-box">
                  <span className="price-prefix">{tier.priceSuffix}</span>
                  <div className="price-number-row">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${currency}-${tier.id}`}
                        className="price-amount"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {priceVal}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="tier-deliverables">
                  <span className="deliverables-title">Included in this package:</span>
                  <ul>
                    {tier.deliverables.map((item, i) => (
                      <li key={i}>
                        <CheckCircle2 size={15} className="tier-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tier-footer">
                  <a
                    href="#contact"
                    className={tier.isPopular ? 'btn-primary tier-cta-btn' : 'btn-secondary tier-cta-btn'}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Payment Terms & Guarantees Container */}
        <div className="pricing-bottom-grid">
          {/* Milestone Payment Structure */}
          <motion.div
            className="payment-milestone-panel glass-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="panel-badge">
              <FileCheck2 size={14} />
              <span>Payment Terms</span>
            </div>
            <h4 className="panel-heading">Transparent 40-30-30 Milestones</h4>
            <p className="panel-sub">Fixed-price projects follow milestone deliverables so you only pay as real progress is proven on your device.</p>

            <div className="milestones-steps">
              {pricing.paymentTerms.map((term, i) => (
                <div key={i} className="milestone-step-card">
                  <div className="milestone-step-number">{term.step}</div>
                  <div className="milestone-step-body">
                    <h5>{term.title}</h5>
                    <p>{term.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Guarantees & Client Protections */}
          <motion.div
            className="guarantees-panel glass-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="panel-badge green-badge">
              <ShieldCheck size={14} />
              <span>Peace of Mind</span>
            </div>
            <h4 className="panel-heading">Standards & Protection From Day One</h4>
            <p className="panel-sub">Every engagement is backed by professional client service standards and direct technical accountability.</p>

            <ul className="guarantees-list">
              {pricing.guarantees.map((item, i) => (
                <li key={i}>
                  <div className="guarantee-icon-wrap">
                    <CheckCircle2 size={16} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="note-card">
              <p>
                <strong>Note:</strong> All listed prices are starting guidelines. Complex third-party services (e.g. video calling, bespoke backend APIs, paid SMS/maps quotas) are scoped transparently before commencement.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
