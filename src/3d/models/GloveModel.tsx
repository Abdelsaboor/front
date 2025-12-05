/**
 * Glove 3D Model Component
 *
 * Loads and renders the smart glove 3D model with:
 * - Continuous natural rotation
 * - Sensor glow effects in Scene 2
 * - Fallback placeholder geometry
 *
 * Architecture:
 * - Isolated model loading logic
 * - Scene-aware rendering
 * - Performance-optimized animations
 */

import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Group } from 'three';

interface GloveModelProps {
  scrollProgress: number;
  scene: number;
}

/**
 * Main Glove Model Component
 *
 * @param scrollProgress - Normalized scroll progress (0-1)
 * @param scene - Current scene number (1-5)
 */
export function GloveModel({ scrollProgress, scene }: GloveModelProps) {
  const groupRef = useRef<Group>(null);

  // Load GLB model with error handling
  let model;
  try {
    model = useGLTF('/models/smart+glove+3d+model.glb');
  } catch (error) {
    console.warn('GLB model not found, using placeholder geometry');
  }

  /**
   * Cinematic continuous rotation
   *
   * Motion Philosophy:
   * - Natural variation (not mechanical)
   * - Breathing rhythm for organic feel
   * - Subtle tilt adds realism
   *
   * Performance: Runs every frame but very lightweight math
   */
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;

      // Smooth Y-axis rotation with slight variation
      // Base: 0.003 rad/frame, Variation: ±0.001 rad/frame
      groupRef.current.rotation.y += 0.003 + Math.sin(time * 0.1) * 0.001;

      // Subtle floating with breathing rhythm
      // Amplitude: 0.08 units, Secondary: 0.03 units
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.08 + Math.cos(time * 0.6) * 0.03;

      // Very subtle tilt for organic feel
      // Amplitude: 0.02 radians
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {model ? (
        <primitive object={model.scene} scale={2} />
      ) : (
        // Fallback placeholder geometry
        <PlaceholderGlove scene={scene} scrollProgress={scrollProgress} />
      )}
    </group>
  );
}

/**
 * Placeholder Glove Geometry
 *
 * Used when GLB model fails to load.
 * Provides basic hand shape with sensor glow capability.
 */
function PlaceholderGlove({ scene, scrollProgress }: { scene: number; scrollProgress: number }) {
  const accentColor = new THREE.Color(0x4ecdc4);
  const primaryColor = new THREE.Color(0x1a535c);

  return (
    <group>
      {/* Palm */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.3, 1.5]} />
        <meshStandardMaterial color={primaryColor} />
      </mesh>

      {/* Fingers */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[-0.3 + i * 0.2, 0.5, 0.3]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
          <meshStandardMaterial color={primaryColor} />
        </mesh>
      ))}

      {/* Thumb */}
      <mesh position={[-0.5, 0.2, -0.3]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color={primaryColor} />
      </mesh>

      {/* Sensor glow areas - only in Scene 2 */}
      {scene === 2 && (
        <>
          <mesh position={[0, 0.1, 0.5]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.5 + Math.sin(scrollProgress * 10) * 0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh position={[0, 0.1, -0.5]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.5 + Math.sin(scrollProgress * 10 + 1) * 0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload('/models/smart+glove+3d+model.glb');
