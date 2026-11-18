import React, { useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

// Smoothly rolls from the previous value to the new one (guest counts, prices, capacities).
export default function AnimatedNumber({ value, duration = 0.5, format = (n) => String(Math.round(n)), className = '' }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (reduce) { setShown(value); prev.current = value; return; }
    const controls = animate(prev.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(v),
      onComplete: () => { prev.current = value; },
    });
    return () => { prev.current = value; controls.stop(); };
  }, [value, duration, reduce]);

  return <span className={className}>{format(shown)}</span>;
}
