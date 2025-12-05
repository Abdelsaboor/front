/**
 * Lighting System
 *
 * Centralized lighting configuration for cinematic quality.
 *
 * Architecture:
 * - All lights defined in one place
 * - Easy to adjust globally
 * - Documented rationale for each light
 * - Reusable across scenes
 *
 * Lighting Philosophy:
 * - Three-point lighting (key, fill, rim)
 * - Stronger key for definition
 * - Softer fill for depth
 * - Accent rim for separation
 * - Subtle ambient for base illumination
 */

export interface LightConfig {
  type: 'ambient' | 'directional' | 'point' | 'spot';
  color: string | number;
  intensity: number;
  position?: [number, number, number];
  castShadow?: boolean;
  shadowConfig?: {
    mapSize: [number, number];
    camera: {
      near: number;
      far: number;
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    bias: number;
  };
}

/**
 * Key Light
 *
 * Primary light source - creates main shadows and definition.
 * Positioned high and to the side for dramatic effect.
 *
 * Intensity: 2.0 - Strong enough to define form
 * Color: Pure white for neutral tone
 * Shadows: Enabled with high-quality settings
 */
export const KEY_LIGHT: LightConfig = {
  type: 'directional',
  color: 0xffffff,
  intensity: 2.0,
  position: [6, 6, 4],
  castShadow: true,
  shadowConfig: {
    mapSize: [2048, 2048],
    camera: {
      near: 0.5,
      far: 50,
      left: -10,
      right: 10,
      top: 10,
      bottom: -10,
    },
    bias: -0.0001,
  },
};

/**
 * Fill Light
 *
 * Secondary light - softens shadows and adds depth.
 * Positioned opposite key light with cooler tone.
 *
 * Intensity: 0.4 - Subtle, not competing with key
 * Color: Cool blue-tinted for depth perception
 */
export const FILL_LIGHT: LightConfig = {
  type: 'directional',
  color: 0xb8d4e0,
  intensity: 0.4,
  position: [-4, 3, -3],
  castShadow: false,
};

/**
 * Rim Light
 *
 * Accent light - creates separation from background.
 * Positioned behind subject with accent color.
 *
 * Intensity: 1.2 - Strong enough to create edge definition
 * Color: Accent cyan for brand consistency
 */
export const RIM_LIGHT: LightConfig = {
  type: 'directional',
  color: 0x4ecdc4,
  intensity: 1.2,
  position: [-2, 4, -6],
  castShadow: false,
};

/**
 * Ambient Light
 *
 * Base illumination - prevents pure black shadows.
 * Very subtle to maintain contrast.
 *
 * Intensity: 0.15 - Just enough to lift shadows
 * Color: Slightly warm to balance cool fill
 */
export const AMBIENT_LIGHT: LightConfig = {
  type: 'ambient',
  color: 0xf0f4f8,
  intensity: 0.15,
};

/**
 * Accent Point Light
 *
 * Subtle glow from below - adds depth and interest.
 * Only visible in certain camera angles.
 *
 * Intensity: 0.3 - Very subtle
 * Color: Accent cyan for consistency
 */
export const ACCENT_POINT_LIGHT: LightConfig = {
  type: 'point',
  color: 0x4ecdc4,
  intensity: 0.3,
  position: [0, -2, -4],
};

/**
 * Complete lighting setup
 * Export as array for easy iteration
 */
export const LIGHTING_SETUP: LightConfig[] = [
  AMBIENT_LIGHT,
  KEY_LIGHT,
  FILL_LIGHT,
  RIM_LIGHT,
  ACCENT_POINT_LIGHT,
];
