"use client";

import confetti from "canvas-confetti";

export interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
}

/**
 * Triggers a confetti celebration animation
 * Default configuration is optimized for task completion celebrations
 */
export const celebrate = (options?: ConfettiOptions): void => {
  const defaultOptions: ConfettiOptions = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  };

  const config = { ...defaultOptions, ...options };

  confetti({
    particleCount: config.particleCount,
    spread: config.spread,
    origin: config.origin,
  }).catch(() => {
    // Silently fail if confetti can't be triggered (e.g., in non-browser environments)
  });
};

/**
 * Triggers a more intense confetti explosion
 */
export const celebrateIntense = (): void => {
  celebrate({
    particleCount: 200,
    spread: 90,
    origin: { y: 0.5 },
  });
};

/**
 * Triggers a subtle confetti animation
 */
export const celebrateSubtle = (): void => {
  celebrate({
    particleCount: 50,
    spread: 50,
    origin: { y: 0.8 },
  });
};
