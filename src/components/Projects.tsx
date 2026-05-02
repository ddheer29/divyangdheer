import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight, Image as ImageIcon, ArrowRight } from 'lucide-react';
import './Projects.css';
import data from '../data/dummyData.json';

interface FlipCardProps {
  project: (typeof data.projects)[0];
  index: number;
  onClick: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ project, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 8, y: dx * 8 });
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-flip-outer"
      initial={{ opacity: 0, y: 50, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
      onClick={onClick}
    >
      <div className="project-card-3d glass-card">
        {/* Glow overlay on hover */}
        {isHovered && (
          <div
            className="project-glow"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(139,92,246,0.2) 0%, transparent 55%)`,
            }}
          />
        )}

        {/* Corner accent */}
        <div className="project-corner-tl" />
        <div className="project-corner-br" />

        <div className="project-image-wrap">
          <img src={project.thumbnailUrl} alt={project.title} className="project-thumb" />
          <div className="project-img-overlay">
            <div className="project-gallery-pill">
              <ImageIcon size={14} />
              <span>{project.images.length} Screenshots</span>
            </div>
          </div>
        </div>

        <div className="project-body">
          <div className="project-index">0{index + 1}</div>
          <h3 className="project-name">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          <div className="project-cta">
            <span>Explore</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { projects } = data;

  const trimoraImagesMap = import.meta.glob('../assets/trimora/*.png', { eager: true }) as Record<string, { default: string }>;
  const trimoraImageUrls = Object.values(trimoraImagesMap).map(mod => mod.default);

  const projectsWithImages = projects.map(p => {
    if (p.id === 'trimora' && trimoraImageUrls.length > 0) {
      return {
        ...p,
        thumbnailUrl: trimoraImageUrls[0],
        images: trimoraImageUrls
      };
    }
    return p;
  });

  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject)
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject)
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="projects-bg-sphere" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>02</span> — Work
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        <div className="projects-grid">
          {projectsWithImages.map((project, index) => (
            <FlipCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => openModal(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content glass-card"
              initial={{ scale: 0.85, opacity: 0, rotateX: -12, y: 40 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, rotateX: 12, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{ perspective: 1000 }}
            >
              <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                <X size={20} />
              </button>

              <div className="modal-header">
                <h3>{selectedProject.title}</h3>
                {((selectedProject as any).appStoreUrl || (selectedProject as any).playStoreUrl) && (
                  <div className="store-badges">
                    {(selectedProject as any).appStoreUrl && (
                      <a href={(selectedProject as any).appStoreUrl} target="_blank" rel="noopener noreferrer" className="store-badge-btn" aria-label="App Store">
                        <svg viewBox="0 0 512 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor" /></svg>
                        <div className="badge-text"><span className="badge-small">Download on the</span><span className="badge-large">App Store</span></div>
                      </a>
                    )}
                    {(selectedProject as any).playStoreUrl && (
                      <a href={(selectedProject as any).playStoreUrl} target="_blank" rel="noopener noreferrer" className="store-badge-btn" aria-label="Play Store">
                        <svg viewBox="0 0 512 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" /></svg>
                        <div className="badge-text"><span className="badge-small">GET IT ON</span><span className="badge-large">Google Play</span></div>
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="modal-gallery">
                <button className="gallery-nav prev" onClick={prevImage} aria-label="Previous image">
                  <ChevronLeft size={26} />
                </button>
                <div className="gallery-image-container">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                    className="gallery-image"
                    initial={{ opacity: 0, scale: 0.96, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
                <button className="gallery-nav next" onClick={nextImage} aria-label="Next image">
                  <ChevronRight size={26} />
                </button>
              </div>

              <div className="gallery-indicators">
                {selectedProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
