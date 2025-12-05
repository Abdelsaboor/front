import { useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { GloveModel } from './components/GloveModel';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useResponsive } from './hooks/useResponsive';
import { COLORS } from './utils/colors';
import * as THREE from 'three';
import './index.css';

function Scene() {
  const { camera } = useThree();
  const [currentScene, setCurrentScene] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useScrollAnimation({
    camera: camera as THREE.PerspectiveCamera,
    onSceneChange: (scene) => {
      setCurrentScene(scene);
      setScrollProgress((scene - 1) / 4);
    },
  });

  return (
    <>
      {/* Lighting Setup - Cinematic Three-Point Lighting */}
      <ambientLight intensity={0.2} />

      {/* Key Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color={COLORS.keyLight}
        castShadow
      />

      {/* Fill Light */}
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.5}
        color={COLORS.fillLight}
      />

      {/* Rim Light */}
      <directionalLight
        position={[0, 3, -5]}
        intensity={0.8}
        color={COLORS.rimLight}
      />

      {/* 3D Glove Model */}
      <GloveModel scrollProgress={scrollProgress} scene={currentScene} />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Post-processing for glows */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
}

function App() {
  const { isMobile } = useResponsive();

  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      {/* Fixed 3D Canvas */}
      <div className="canvas-container">
        <Canvas
          shadows
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          performance={{ min: 0.5 }}
        >
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
            <p style={{ marginTop: '2rem', opacity: 0.7 }}>
              AI processes signals in real-time
            </p>
            <p style={{ marginTop: '2rem', opacity: 0.7 }}>
              Natural speech output
            </p>
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
            <p style={{ marginTop: '2rem' }}>
              Join the revolution in accessible communication
            </p>
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
