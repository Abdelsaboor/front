// Custom easing functions for cinematic, physical motion
export const easing = {
    // Smooth, natural easing
    easeInOutCubic: (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },

    // Gentle start, smooth end
    easeOutQuart: (t: number): number => {
        return 1 - Math.pow(1 - t, 4);
    },

    // Cinematic camera movement
    easeInOutQuint: (t: number): number => {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    },

    // Elastic for subtle bounce
    easeOutElastic: (t: number): number => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0
            ? 0
            : t === 1
                ? 1
                : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    },
} as const;

// Map scroll progress to scene-specific progress
export const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

// Clamp value between min and max
export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};
