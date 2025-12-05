import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../utils/colors';

interface GloveModelProps {
  scrollProgress: number;
  scene: number;
}

export function GloveModel({ scrollProgress, scene }: GloveModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Try to load the GLB model, fallback to placeholder geometry
  let model;
  try {
    model = useGLTF('/models/smart+glove+3d+model.glb');
  } catch (error) {
    console.warn('GLB model not found, using placeholder geometry');
  }

  // Continuous rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      // Continuous Y-axis rotation
      groupRef.current.rotation.y += 0.005;

      // Subtle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {model ? (
        <primitive object={model.scene} scale={2} />
      ) : (
        // Placeholder geometry - stylized hand shape
        <group>
          {/* Palm */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 0.3, 1.5]} />
            <meshStandardMaterial color={COLORS.textPrimary} />
          </mesh>

          {/* Fingers */}
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[-0.3 + i * 0.2, 0.5, 0.3]}>
              <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
              <meshStandardMaterial color={COLORS.textPrimary} />
            </mesh>
          ))}

          {/* Thumb */}
          <mesh position={[-0.5, 0.2, -0.3]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
            <meshStandardMaterial color={COLORS.textPrimary} />
          </mesh>

          {/* Sensor glow areas */}
          {scene === 2 && (
            <>
              <mesh position={[0, 0.1, 0.5]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                  color={COLORS.accent}
                  emissive={COLORS.accent}
                  emissiveIntensity={0.5 + Math.sin(scrollProgress * 10) * 0.3}
                  transparent
                  opacity={0.6}
                />
              </mesh>
              <mesh position={[0, 0.1, -0.5]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                  color={COLORS.accent}
                  emissive={COLORS.accent}
                  emissiveIntensity={0.5 + Math.sin(scrollProgress * 10 + 1) * 0.3}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            </>
          )}
        </group>
      )}
    </group>
  );
}

// Preload the model
useGLTF.preload('/models/smart+glove+3d+model.glb');
