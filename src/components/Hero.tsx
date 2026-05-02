import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, MeshDistortMaterial, Float, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import './Hero.css';
import personalData from '../data/dummyData.json';
import * as THREE from 'three';

const HeroOrb: React.FC = () => {
  const orbRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orbRef.current) {
      orbRef.current.rotation.y = t * 0.4;
      orbRef.current.rotation.z = t * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.5;
      ringRef.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.3;
      ring2Ref.current.rotation.z = t * 0.4;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={orbRef} args={[1.6, 64, 64]}>
          <MeshDistortMaterial
            color="#8B5CF6"
            attach="material"
            distort={0.45}
            speed={2.5}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </Float>

      {/* Orbit ring 1 */}
      <Torus ref={ringRef} args={[2.4, 0.025, 16, 100]}>
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={1.5}
          transparent
          opacity={0.7}
        />
      </Torus>

      {/* Orbit ring 2 */}
      <Torus ref={ring2Ref} args={[2.9, 0.015, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={1.2}
          transparent
          opacity={0.5}
        />
      </Torus>

      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#8B5CF6" />
      <pointLight position={[-4, -4, 4]} intensity={1.5} color="#06B6D4" />
      <pointLight position={[0, 0, 6]} intensity={0.8} color="#ffffff" />
    </>
  );
};

const Hero: React.FC = () => {
  const { personal } = personalData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="home" className="hero-section">
      {/* 3D Canvas */}
      <div className="hero-3d-canvas">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }}>
          <HeroOrb />
        </Canvas>
      </div>

      {/* Ambient glow blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="hero-grid-overlay" />

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="badge-dot" />
            Available for work
          </motion.div>

          <motion.h2 variants={itemVariants} className="hero-greeting">
            Hello, I'm
          </motion.h2>
          <motion.h1 variants={itemVariants} className="hero-name">
            {personal.name}
          </motion.h1>
          <motion.div variants={itemVariants} className="hero-profession-wrap">
            <span className="hero-profession-tag">{personal.profession}</span>
          </motion.div>
          <motion.p variants={itemVariants} className="hero-description">
            Building scalable, production-ready web and mobile applications with
            cutting-edge technologies. Let's create something extraordinary together.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-actions">
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">
                View Work
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <span>Download CV</span>
                <Download size={16} />
              </a>
            </div>
            <div className="hero-socials">
              <a
                href="https://www.linkedin.com/in/divyang-dheer-5731b51b3/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/ddheer29"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-icon"
              >
                <Github size={20} />
              </a>
              <a href={`mailto:${personal.email}`} aria-label="Email" className="social-icon">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="hero-stat-card">
            <span className="hero-stat-number">2+</span>
            <span className="hero-stat-label">Years Experience</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-card">
            <span className="hero-stat-number">7</span>
            <span className="hero-stat-label">Production Apps</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-card">
            <span className="hero-stat-number">10+</span>
            <span className="hero-stat-label">Technologies</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <a href="#about" aria-label="Scroll Down">
          <div className="scroll-arrow">
            <ArrowDown size={20} />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
