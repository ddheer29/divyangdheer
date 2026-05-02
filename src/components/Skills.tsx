import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import './Skills.css';
import data from '../data/dummyData.json';

const skillIcons: Record<string, string> = {
  'React Native': '📱',
  'Node.js': '🟢',
  'MongoDB': '🍃',
  'REST API': '🔗',
  'JavaScript': '🟡',
  'TypeScript': '🔷',
  'React.js': '⚛️',
  'Tailwind CSS': '🎨',
  'Git': '🔀',
  'Redux': '🔴',
};

/* ---- Three.js Orbit Ring Scene ---- */
const OrbitScene: React.FC = () => {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);
  const core = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ring1.current.rotation.x = t * 0.4;
    ring1.current.rotation.y = t * 0.25;
    ring2.current.rotation.x = -t * 0.3;
    ring2.current.rotation.z = t * 0.35;
    ring3.current.rotation.y = t * 0.5;
    ring3.current.rotation.z = -t * 0.2;
    core.current.rotation.y = t * 0.6;
    core.current.rotation.x = Math.sin(t * 0.4) * 0.3;
  });

  return (
    <>
      {/* Core sphere */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={0.6}
          emissive="#8B5CF6"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ring1}>
        <torusGeometry args={[1.7, 0.022, 16, 100]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={1.5} transparent opacity={0.8} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.1, 0.016, 16, 100]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1.2} transparent opacity={0.65} />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ring3} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.012, 16, 100]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1.0} transparent opacity={0.5} />
      </mesh>

      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#8B5CF6" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#06B6D4" />
    </>
  );
};

const Skills: React.FC = () => {
  const { skills } = data;

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>04</span> — Stack
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Tech Stack
        </motion.h2>

        <div className="skills-layout">
          {/* Left: 3D Canvas */}
          <motion.div
            className="skills-3d-canvas"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }}>
              <OrbitScene />
            </Canvas>
            <div className="skills-canvas-label">Tech Orbit</div>
          </motion.div>

          {/* Right: Skill pills */}
          <div className="skills-pills-wrap">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-pill-3d"
                initial={{ opacity: 0, x: 40, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{
                  scale: 1.08,
                  rotateY: 5,
                  z: 20,
                  boxShadow: '0 8px 30px rgba(139,92,246,0.4)',
                }}
              >
                <span className="skill-icon">{skillIcons[skill] || '⚡'}</span>
                <span className="skill-name">{skill}</span>
                <div className="skill-glow" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
