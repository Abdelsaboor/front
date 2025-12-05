import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationProps {
  camera: THREE.PerspectiveCamera | null;
  onSceneChange?: (scene: number) => void;
}

export function useScrollAnimation({ camera, onSceneChange }: UseScrollAnimationProps) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!camera) return;

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Determine current scene based on scroll progress
          if (progress < 0.2) onSceneChange?.(1);
          else if (progress < 0.5) onSceneChange?.(2);
          else if (progress < 0.7) onSceneChange?.(3);
          else if (progress < 0.9) onSceneChange?.(4);
          else onSceneChange?.(5);
        },
      },
    });

    // Scene 1: Hero (0-20%)
    tl.to(
      camera.position,
      {
        x: 0,
        y: 0,
        z: 5,
        duration: 1,
        ease: 'power2.inOut',
      },
      0
    );

    // Scene 2: Dolly towards glove (20-50%)
    tl.to(
      camera.position,
      {
        z: 2.5,
        duration: 1.5,
        ease: 'power2.inOut',
      },
      1
    );

    tl.to(
      camera.rotation,
      {
        y: 0.1,
        duration: 1.5,
        ease: 'power2.inOut',
      },
      1
    );

    // Scene 3: Technology flow - orbit view (50-70%)
    tl.to(
      camera.position,
      {
        x: 3,
        y: 2,
        z: 4,
        duration: 1,
        ease: 'power2.inOut',
      },
      2.5
    );

    tl.to(
      camera.rotation,
      {
        y: -0.3,
        x: -0.2,
        duration: 1,
        ease: 'power2.inOut',
      },
      2.5
    );

    // Scene 4: Impact - pull back (70-90%)
    tl.to(
      camera.position,
      {
        x: 0,
        y: 1,
        z: 6,
        duration: 1,
        ease: 'power2.out',
      },
      3.5
    );

    tl.to(
      camera.rotation,
      {
        y: 0,
        x: 0,
        duration: 1,
        ease: 'power2.out',
      },
      3.5
    );

    // Scene 5: Closing - final position (90-100%)
    tl.to(
      camera.position,
      {
        x: 0,
        y: 0.5,
        z: 4,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      4.5
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [camera, onSceneChange]);

  return timelineRef.current;
}
