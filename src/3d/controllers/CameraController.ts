/**
 * Camera Controller
 *
 * Manages all camera movements and transitions throughout the experience.
 *
 * Architecture:
 * - Single source of truth for camera state
 * - Declarative scene-based configuration
 * - Smooth GSAP-driven transitions
 * - No direct camera manipulation from scenes
 *
 * Why this exists:
 * - Centralizes camera logic (easier to debug and adjust)
 * - Prevents conflicting camera updates
 * - Makes timeline adjustments trivial
 * - Separates concerns (scenes describe what, controller does how)
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type * as THREE from 'three';
import { SCENE_TIMELINE, SCROLL_CONFIG } from '../../config/scenes.config';

gsap.registerPlugin(ScrollTrigger);

export interface CameraControllerProps {
  camera: THREE.PerspectiveCamera | null;
  onSceneChange?: (sceneIndex: number) => void;
}

/**
 * Hook: useCameraController
 *
 * Sets up scroll-driven camera animation using GSAP ScrollTrigger.
 *
 * @param camera - Three.js camera instance
 * @param onSceneChange - Callback when scene changes
 *
 * @returns Timeline reference (for debugging/control)
 */
export function useCameraController({ camera, onSceneChange }: CameraControllerProps) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!camera) return;

    // Create master timeline with configured scrub amount
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: SCROLL_CONFIG.triggerElement,
        start: SCROLL_CONFIG.start,
        end: SCROLL_CONFIG.end,
        scrub: SCROLL_CONFIG.scrubAmount,
        onUpdate: (self) => {
          const progress = self.progress;

          // Determine current scene based on scroll progress
          const currentScene = SCENE_TIMELINE.findIndex(
            (scene) => progress >= scene.scrollStart && progress < scene.scrollEnd
          );

          if (currentScene !== -1 && onSceneChange) {
            onSceneChange(currentScene + 1); // 1-indexed for display
          }
        },
      },
    });

    // Build timeline from scene configuration
    let cumulativeDuration = 0;

    SCENE_TIMELINE.forEach((scene) => {
      const { camera: cameraConfig, duration, easing } = scene;

      // Animate camera position
      tl.to(
        camera.position,
        {
          x: cameraConfig.end.position[0],
          y: cameraConfig.end.position[1],
          z: cameraConfig.end.position[2],
          duration,
          ease: easing,
        },
        cumulativeDuration
      );

      // Animate camera rotation
      tl.to(
        camera.rotation,
        {
          x: cameraConfig.end.rotation[0],
          y: cameraConfig.end.rotation[1],
          z: cameraConfig.end.rotation[2],
          duration,
          ease: easing,
        },
        cumulativeDuration
      );

      // Animate FOV if specified
      if (cameraConfig.end.fov) {
        tl.to(
          camera,
          {
            fov: cameraConfig.end.fov,
            duration,
            ease: easing,
            onUpdate: () => camera.updateProjectionMatrix(),
          },
          cumulativeDuration
        );
      }

      cumulativeDuration += duration;
    });

    timelineRef.current = tl;

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [camera, onSceneChange]);

  return timelineRef.current;
}
