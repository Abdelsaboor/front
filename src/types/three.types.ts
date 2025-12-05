/**
 * Type Definitions for Three.js Entities
 *
 * Provides strict typing for 3D objects, cameras, and materials
 * to eliminate 'any' types throughout the codebase.
 */

import type * as THREE from 'three';

/**
 * Vector and Rotation Types
 */
export type Vector3Tuple = [number, number, number];
export type EulerTuple = [number, number, number];
export type Vector2Tuple = [number, number];

/**
 * Camera Types
 */
export interface CameraState {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  fov: number;
}

export interface CameraConfig {
  initialPosition: Vector3Tuple;
  initialRotation: EulerTuple;
  fov: number;
  near: number;
  far: number;
}

/**
 * Lighting Configuration
 */
export interface LightConfig {
  type: 'ambient' | 'directional' | 'point' | 'spot';
  color: string | number;
  intensity: number;
  position?: Vector3Tuple;
  castShadow?: boolean;
  shadowConfig?: ShadowConfig;
}

export interface ShadowConfig {
  mapSize: Vector2Tuple;
  camera: {
    near: number;
    far: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  bias: number;
}

/**
 * Model Loading
 */
export interface ModelConfig {
  path: string;
  scale?: number | Vector3Tuple;
  position?: Vector3Tuple;
  rotation?: EulerTuple;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export interface LoadedModel {
  scene: THREE.Group;
  animations?: THREE.AnimationClip[];
}

/**
 * Material Configuration
 */
export interface MaterialConfig {
  type: 'standard' | 'physical' | 'basic' | 'shader';
  color?: string | number;
  metalness?: number;
  roughness?: number;
  emissive?: string | number;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
}

/**
 * Scene State
 */
export interface SceneState {
  currentScene: number;
  scrollProgress: number;
  isTransitioning: boolean;
}

/**
 * Performance Metrics
 */
export interface PerformanceMetrics {
  fps: number;
  drawCalls: number;
  triangles: number;
  geometries: number;
  textures: number;
}

/**
 * WebGL Capability Detection
 */
export interface WebGLCapabilities {
  supported: boolean;
  version: 1 | 2 | null;
  maxTextureSize: number;
  maxAnisotropy: number;
  renderer: string;
}
