// Shared motion tokens — keep every section on the same easing/duration family.
export const EASE = [0.16, 1, 0.3, 1];        // "luxury"
export const EASE_SETTLE = [0.25, 1, 0.5, 1];  // "luxury-settle"
export const DUR = { fast: 0.18, normal: 0.3, hover: 0.42, reveal: 0.72, settle: 0.85 };

// True on devices with a real hover pointer (mouse/trackpad). Use to gate hover-only effects.
export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
