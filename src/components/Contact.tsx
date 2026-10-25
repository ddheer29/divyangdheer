import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import data from "../data/dummyData.json";
import "./Contact.css";

const projectTypes = [
  "Custom Mobile App MVP",
  "Feature Development",
  "Quick Task / Bug Fix",
  "Ongoing Maintenance",
  "Hourly Sprint",
  "App Store Launch",
];

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    selectedType: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey =
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
    (data.personal as { web3formsAccessKey?: string }).web3formsAccessKey ||
    "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSelectType = (type: string) => {
    setFormState((prev) => ({
      ...prev,
      selectedType: prev.selectedType === type ? "" : type,
      message:
        prev.message ||
        `Hi Divyang, I'm interested in working together on a ${type}. `,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // If access key is missing, warn with a direct mailto action
    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "Email service key is not configured. Add your free Web3Forms access key to .env or send directly via email below.",
      );
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `🚀 Client Inquiry [${formState.selectedType || "Mobile App"}]: from ${formState.name}`,
          from_name: "Divyang Dheer Portfolio",
          name: formState.name,
          email: formState.email,
          project_type: formState.selectedType || "Not specified",
          message: formState.message,
          botcheck: false,
        }),
      });

      const res = await response.json();

      if (res.success) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "", selectedType: "" });
      } else {
        setStatus("error");
        setErrorMessage(
          res.message ||
            "Unable to deliver message right now. Please try again or use direct email.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network connection error. Please try sending via your email app.",
      );
    }
  };

  const mailtoFallback = `mailto:${data.personal.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${formState.selectedType || "Mobile Development"} - from ${formState.name || "Client"}`,
  )}&body=${encodeURIComponent(
    `Name: ${formState.name}\nEmail: ${formState.email}\nProject Type: ${formState.selectedType}\n\nProject Scope:\n${formState.message}`,
  )}`;

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-bg" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>09</span> — Start a Project
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Let's Build Your App
        </motion.h2>

        <div className="contact-grid">
          {/* Info panel */}
          <motion.div
            className="contact-info-panel glass-card"
            initial={{ opacity: 0, x: -40, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            style={{ transformPerspective: 900 }}
          >
            <div className="contact-info-top-accent" />
            <div className="contact-availability-badge">
              <span className="availability-dot" />
              <span>Available for Q2/Q3 Freelance Projects</span>
            </div>

            <h3 className="contact-info-title">Have a project in mind?</h3>
            <p className="contact-info-sub">
              Whether you need a complete 0-to-1 mobile MVP, an App Store
              release, or a technical consultation, I'm ready to help you ship.
            </p>

            <div className="contact-info-items">
              <a
                href={`mailto:${data.personal.email}`}
                className="contact-info-item"
              >
                <div className="contact-info-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="contact-item-label">Direct Email</span>
                  <span className="contact-item-value">
                    {data.personal.email}
                  </span>
                </div>
              </a>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="contact-item-label">Response Time</span>
                  <span className="contact-item-value">Within 24 Hours</span>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="contact-item-label">Location</span>
                  <span className="contact-item-value">
                    Remote (Worldwide Clients)
                  </span>
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
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ transformPerspective: 900 }}
          >
            <div className="contact-form-top-accent" />
            <h3 className="contact-form-title">Tell Me About Your Product</h3>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success-message"
                  className="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="success-badge-icon">
                    <CheckCircle2 size={44} />
                  </div>
                  <h4 className="success-title">Project Inquiry Received!</h4>
                  <p className="success-desc">
                    Thank you! Your project scope has been dispatched straight
                    to my primary inbox (
                    <span className="highlight-email">
                      {data.personal.email}
                    </span>
                    ).
                  </p>
                  <div className="success-sla">
                    <Clock size={16} />
                    <span>Guaranteed personal response within 24 hours.</span>
                  </div>
                  <button
                    type="button"
                    className="btn-secondary reset-form-btn"
                    onClick={() => setStatus("idle")}
                  >
                    <RotateCcw size={15} />
                    <span>Send another inquiry</span>
                  </button>
                </motion.div>
              ) : (
                <form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="contact-form"
                >
                  {/* Honeypot spam field */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {status === "error" && (
                    <motion.div
                      className="contact-error-banner"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="error-left">
                        <AlertCircle size={18} className="error-icon" />
                        <p>{errorMessage}</p>
                      </div>
                      <a href={mailtoFallback} className="error-fallback-link">
                        <span>Send via Email App</span>
                        <ArrowRight size={13} />
                      </a>
                    </motion.div>
                  )}

                  <div className="form-type-selector">
                    <label className="selector-label">
                      What are you looking for?
                    </label>
                    <div className="type-chips">
                      {projectTypes.map((type) => (
                        <button
                          type="button"
                          key={type}
                          className={`type-chip ${formState.selectedType === type ? "active-chip" : ""}`}
                          onClick={() => handleSelectType(type)}
                        >
                          {formState.selectedType === type && (
                            <CheckCircle2 size={13} />
                          )}
                          <span>{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="contact-name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Miller"
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
                        placeholder="alex@company.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-message">
                      Project Scope / Message
                    </label>
                    <textarea
                      name="message"
                      id="contact-message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Briefly describe what you're building, target platform, and expected timeline..."
                      required
                    />
                  </div>

                  <div className="form-submit-row">
                    <button
                      type="submit"
                      className="btn-primary submit-btn"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="spinner" />
                          <span>Delivering...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Inquiry</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                    <span className="form-secure-note">
                      <Sparkles size={13} />
                      <span>Direct delivery to {data.personal.email}</span>
                    </span>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
