declare module 'canvas-confetti' {
  interface ConfettiConfig {
    particleCount?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    [key: string]: any;
  }

  function confetti(config?: ConfettiConfig): Promise<void>;
  export default confetti;
}

