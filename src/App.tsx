/**
 * Main Application Component
 *
 * Orchestrates the entire 3D experience:
 * - WebGL capability detection
 * - Scene rendering with Three.js
 * - Scroll-driven camera animation
 * - UI overlay (nav, content, footer)
 *
 * Architecture:
 * - Separates 3D rendering from UI
 * - Uses professional controller pattern
 * - Handles fallbacks gracefully
 */

import { useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Components
import { GloveModel } from '@3d/models/GloveModel';
import { Navbar } from '@components/Navbar';
import { Footer } from '@components/Footer';

// Controllers & Systems
import { useCameraController } from '@3d/controllers/CameraController';
import { LIGHTING_SETUP } from '@3d/systems/Lights';

// Hooks
import { useResponsive } from '@hooks/useResponsive';

// Styles
import './index.css';

/**
 * 3D Scene Component
 *
 * Renders the Three.js scene with lighting, model, and effects.
 * Separated from App for clean architecture.
 */
function Scene() {
  const { camera } = useThree();
  const [currentScene, setCurrentScene] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use professional camera controller
  useCameraController({
    camera: camera as THREE.PerspectiveCamera,
    onSceneChange: (scene) => {
      setCurrentScene(scene);
      setScrollProgress((scene - 1) / 4);
    },
  });

  return (
    <>
      {/* Lighting from centralized configuration */}
      {LIGHTING_SETUP.map((light, index) => {
        if (light.type === 'ambient') {
          return <ambientLight key={index} intensity={light.intensity} color={light.color} />;
        }
        if (light.type === 'directional') {
          return (
            <directionalLight
              key={index}
              position={light.position as [number, number, number]}
              intensity={light.intensity}
              color={light.color}
              castShadow={light.castShadow}
              shadow-mapSize-width={light.shadowConfig?.mapSize[0]}
              shadow-mapSize-height={light.shadowConfig?.mapSize[1]}
              shadow-camera-far={light.shadowConfig?.camera.far}
              shadow-camera-left={light.shadowConfig?.camera.left}
              shadow-camera-right={light.shadowConfig?.camera.right}
              shadow-camera-top={light.shadowConfig?.camera.top}
              shadow-camera-bottom={light.shadowConfig?.camera.bottom}
              shadow-bias={light.shadowConfig?.bias}
            />
          );
        }
        if (light.type === 'point') {
          return (
            <pointLight
              key={index}
              position={light.position as [number, number, number]}
              intensity={light.intensity}
              color={light.color}
            />
          );
        }
        return null;
      })}

      {/* 3D Glove Model */}
      <GloveModel scrollProgress={scrollProgress} scene={currentScene} />

      {/* Environment for subtle reflections */}
      <Environment preset="city" environmentIntensity={0.3} />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.92} luminanceSmoothing={0.95} mipmapBlur />
      </EffectComposer>
    </>
  );
}

/**
 * Main App Component
 */
function App() {
  const { isMobile } = useResponsive();

  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      {/* Fixed 3D Canvas */}
      <div className="canvas-container">
        <Canvas shadows dpr={isMobile ? [1, 1.5] : [1, 2]} performance={{ min: 0.5 }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <Scene />
        </Canvas>
      </div>

      {/* Scrollable Content Overlay */}
      <div id="scroll-container" className="content-overlay">
        {/* Scene 1: Hero */}
        <section id="hero" className="scene-section" style={{ height: '100vh' }}>
          <div className="text-overlay">
            <h1>The Future of Silent Communication</h1>
            <p>Empowering voices through gesture recognition technology</p>
          </div>
        </section>

        {/* Scene 2: Gesture → Data → Voice */}
        <section id="technology" className="scene-section" style={{ height: '150vh' }}>
          <div className="text-overlay">
            <h2>From Gesture to Voice</h2>
            <p>Advanced sensors capture every movement</p>
            <p style={{ marginTop: '2rem', opacity: 0.7 }}>AI processes signals in real-time</p>
            <p style={{ marginTop: '2rem', opacity: 0.7 }}>Natural speech output</p>
          </div>
        </section>

        {/* Scene 3: Technology Flow */}
        <section className="scene-section" style={{ height: '100vh' }}>
          <div className="text-overlay">
            <h2>Powered by Innovation</h2>
            <p>Hardware → AI → Cloud → Voice</p>
          </div>
        </section>

        {/* Scene 4: Impact */}
        <section id="impact" className="scene-section" style={{ height: '100vh' }}>
          <div className="text-overlay">
            <h2>Breaking Barriers</h2>
            <p>Empowering Voices</p>
            <p>Inclusive Technology</p>
          </div>
        </section>

        {/* Scene 5: Closing */}
        <section id="contact" className="scene-section" style={{ height: '100vh' }}>
          <div className="text-overlay">
            <h2>Voice of Silence</h2>
            <p style={{ marginTop: '2rem' }}>Join the revolution in accessible communication</p>
            <button className="cta-button" style={{ marginTop: '2rem' }}>
              Get Started
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
