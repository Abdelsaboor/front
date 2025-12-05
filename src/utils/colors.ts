import { Color } from 'three';

export const COLORS = {
  background: new Color('#F7FFF7'),
  textPrimary: new Color('#1A535C'),
  accent: new Color('#4ECDC4'),
  highlight: new Color('#FFE66D'),
  alert: new Color('#FF6B6B'),
  
  // Additional colors for 3D scenes
  keyLight: new Color('#ffffff'),
  fillLight: new Color('#b8d4e0'),
  rimLight: new Color('#4ECDC4'),
} as const;

export const COLOR_HEX = {
  background: '#F7FFF7',
  textPrimary: '#1A535C',
  accent: '#4ECDC4',
  highlight: '#FFE66D',
  alert: '#FF6B6B',
} as const;
