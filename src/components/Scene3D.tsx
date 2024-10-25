import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Scene3DProps {
  activeSection: number;
  sections: Array<{ id: string; title: string; color: string }>;
}

export const Scene3D: React.FC<Scene3DProps> = ({ activeSection, sections }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial
          color={sections[activeSection].color}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      
      <Html position={[0, 2, 0]} center>
        <div className="text-white text-center pointer-events-none">
          <h2 
            className="text-4xl font-bold mb-4 transition-colors duration-500"
            style={{ color: sections[activeSection].color }}
          >
            {sections[activeSection].title}
          </h2>
        </div>
      </Html>
    </group>
  );
};