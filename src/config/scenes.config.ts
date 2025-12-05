/**
 * Scene Configuration
 *
 * Defines scroll ranges, camera positions, and timing for each scene.
 * All values are normalized (0-1) for scroll progress.
 *
 * Architecture:
 * - Each scene owns its scroll range
 * - Camera positions are defined explicitly
 * - Easing functions are named and explained
 * - No magic numbers - everything is documented
 */

export type Vector3Tuple = [number, number, number];
export type EulerTuple = [number, number, number];

export interface CameraKeyframe {
  position: Vector3Tuple;
  rotation: EulerTuple;
  fov?: number;
}

export interface SceneConfig {
  id: string;
  name: string;
  scrollStart: number; // 0-1 normalized scroll position
  scrollEnd: number; // 0-1 normalized scroll position
  duration: number; // Duration in timeline units
  camera: {
    start: CameraKeyframe;
    end: CameraKeyframe;
  };
  easing: string; // GSAP easing function name
  description: string; // Why this camera movement exists
}

/**
 * Master Scene Timeline
 *
 * Total scroll height is divided into 5 scenes:
 * - Scene 1 (Hero): 0-20% - Establishing shot
 * - Scene 2 (Flow): 20-50% - Dolly in to show detail
 * - Scene 3 (Tech): 50-70% - Orbit to show technology
 * - Scene 4 (Impact): 70-90% - Pull back for message
 * - Scene 5 (Close): 90-100% - Final resting position
 */
export const SCENE_TIMELINE: SceneConfig[] = [
  {
    id: 'hero',
    name: 'Hero Introduction',
    scrollStart: 0,
    scrollEnd: 0.2,
    duration: 1.2,
    camera: {
      start: { position: [0, 0, 5], rotation: [0, 0, 0] },
      end: { position: [0, 0, 5], rotation: [0, 0, 0] },
    },
    easing: 'power1.inOut',
    description: 'Static establishing shot - let the model speak for itself',
  },
  {
    id: 'gesture-flow',
    name: 'Gesture to Voice Flow',
    scrollStart: 0.2,
    scrollEnd: 0.5,
    duration: 2.0,
    camera: {
      start: { position: [0, 0, 5], rotation: [0, 0, 0] },
      end: { position: [0, 0.2, 2.8], rotation: [0, 0.08, 0] },
    },
    easing: 'power1.inOut',
    description: 'Slow dolly in - intentional approach to show sensor detail',
  },
  {
    id: 'technology',
    name: 'Technology Architecture',
    scrollStart: 0.5,
    scrollEnd: 0.7,
    duration: 1.5,
    camera: {
      start: { position: [0, 0.2, 2.8], rotation: [0, 0.08, 0] },
      end: { position: [2.5, 1.5, 4], rotation: [-0.15, -0.25, 0] },
    },
    easing: 'power1.inOut',
    description: 'Heavier orbit movement - reveals the full system',
  },
  {
    id: 'impact',
    name: 'Social Impact',
    scrollStart: 0.7,
    scrollEnd: 0.9,
    duration: 1.3,
    camera: {
      start: { position: [2.5, 1.5, 4], rotation: [-0.15, -0.25, 0] },
      end: { position: [0, 0.8, 6], rotation: [-0.05, 0, 0] },
    },
    easing: 'power1.out',
    description: 'Pull back with stillness - moment of calm for the message',
  },
  {
    id: 'closing',
    name: 'Call to Action',
    scrollStart: 0.9,
    scrollEnd: 1.0,
    duration: 0.8,
    camera: {
      start: { position: [0, 0.8, 6], rotation: [-0.05, 0, 0] },
      end: { position: [0, 0.3, 4.5], rotation: [0, 0, 0] },
    },
    easing: 'power1.inOut',
    description: 'Final resting position - confident ending',
  },
];

/**
 * Scroll Configuration
 *
 * Controls how scroll maps to animation timeline
 */
export const SCROLL_CONFIG = {
  /**
   * Scrub value for GSAP ScrollTrigger
   * Higher = smoother, heavier feel
   * Lower = more responsive, lighter feel
   *
   * 2 = Cinematic, intentional camera movement
   */
  scrubAmount: 2,

  /**
   * Trigger element for scroll detection
   */
  triggerElement: '#scroll-container',

  /**
   * Start/end points for scroll trigger
   */
  start: 'top top',
  end: 'bottom bottom',
} as const;
