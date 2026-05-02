import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField: React.FC = () => {
  const mesh = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const count = 2200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const t = Math.random();
      // Purple to cyan gradient palette
      colors[i * 3] = 0.34 + t * 0.22;      // R
      colors[i * 3 + 1] = 0.23 + t * 0.48;  // G
      colors[i * 3 + 2] = 0.96 - t * 0.13;  // B
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.018;
    mesh.current.rotation.x = Math.sin(t * 0.011) * 0.12;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
};

const FloatingOrbs: React.FC = () => {
  const orb1 = useRef<THREE.Mesh>(null!);
  const orb2 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    orb1.current.position.x = Math.sin(t * 0.3) * 8;
    orb1.current.position.y = Math.cos(t * 0.2) * 5;
    orb2.current.position.x = Math.cos(t * 0.25) * 10;
    orb2.current.position.y = Math.sin(t * 0.35) * 6;
  });

  return (
    <>
      <mesh ref={orb1} position={[-6, 3, -10]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#8B5CF6"
          transparent
          opacity={0.08}
          wireframe={false}
        />
      </mesh>
      <mesh ref={orb2} position={[8, -4, -15]}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshStandardMaterial
          color="#06B6D4"
          transparent
          opacity={0.06}
          wireframe={false}
        />
      </mesh>
    </>
  );
};

const Scene3D: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#8B5CF6" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#06B6D4" />
        <ParticleField />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
};

export default Scene3D;
