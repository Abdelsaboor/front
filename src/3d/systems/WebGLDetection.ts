/**
 * WebGL Capability Detection System
 *
 * Detects WebGL support and capabilities to provide appropriate fallbacks.
 *
 * Architecture Decision:
 * - Check capabilities on app init
 * - Store results for reuse
 * - Provide graceful degradation path
 * - No silent failures - always inform user
 */

export interface WebGLCapabilities {
  supported: boolean;
  version: 1 | 2 | null;
  maxTextureSize: number;
  maxAnisotropy: number;
  renderer: string;
}

/**
 * Detect WebGL support and version
 *
 * @returns WebGL capabilities object
 */
export function detectWebGLCapabilities(): WebGLCapabilities {
  const canvas = document.createElement('canvas');

  // Try WebGL 2 first
  let gl: WebGL2RenderingContext | WebGLRenderingContext | null = canvas.getContext('webgl2');
  let version: 1 | 2 | null = 2;

  // Fallback to WebGL 1
  if (!gl) {
    const webgl1 = canvas.getContext('webgl');
    const experimental = canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    gl = webgl1 || experimental;
    version = gl ? 1 : null;
  }

  if (!gl) {
    return {
      supported: false,
      version: null,
      maxTextureSize: 0,
      maxAnisotropy: 0,
      renderer: 'none',
    };
  }

  // Get capabilities
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown';

  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

  // Get max anisotropy
  const anisoExt = gl.getExtension('EXT_texture_filter_anisotropic');
  const maxAnisotropy = anisoExt ? gl.getParameter(anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 1;

  return {
    supported: true,
    version,
    maxTextureSize,
    maxAnisotropy,
    renderer,
  };
}

/**
 * Determine if device can handle full 3D experience
 *
 * Criteria:
 * - WebGL 2 support
 * - Reasonable texture size (>= 4096)
 * - Not a known low-power device
 */
export function canHandleFullExperience(capabilities: WebGLCapabilities): boolean {
  if (!capabilities.supported) return false;
  if (capabilities.version !== 2) return false;
  if (capabilities.maxTextureSize < 4096) return false;

  // Check for known low-power GPUs
  const lowPowerIndicators = ['intel', 'integrated', 'swiftshader'];
  const isLowPower = lowPowerIndicators.some((indicator) =>
    capabilities.renderer.toLowerCase().includes(indicator)
  );

  return !isLowPower;
}

/**
 * Get recommended quality settings based on capabilities
 */
export function getRecommendedQuality(capabilities: WebGLCapabilities): {
  dpr: [number, number];
  shadows: boolean;
  postProcessing: boolean;
  particleCount: number;
} {
  if (!capabilities.supported) {
    return {
      dpr: [1, 1],
      shadows: false,
      postProcessing: false,
      particleCount: 0,
    };
  }

  const canHandleFull = canHandleFullExperience(capabilities);

  if (canHandleFull) {
    return {
      dpr: [1, 2],
      shadows: true,
      postProcessing: true,
      particleCount: 1000,
    };
  }

  // Medium quality for WebGL 1 or lower-end devices
  return {
    dpr: [1, 1.5],
    shadows: false,
    postProcessing: false,
    particleCount: 500,
  };
}
