import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../lib/motion';

// "Palace curtain" reveal: the frame opens from the centre outward while the photo
// settles from a slight zoom. Wrap any <img> (or image block). Plays once.
// clip-path + transform only; falls back to a plain fade for reduced motion.
export default function ImageReveal({ children, className = '', delay = 0, direction = 'x' }) {
  const reduce = useReducedMotion();
  const closed = direction === 'y' ? 'inset(50% 0% 50% 0%)' : 'inset(0% 50% 0% 50%)';
  const open = 'inset(0% 0% 0% 0%)';

  if (reduce) {
    return (
      <motion.div className={className} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: closed }}
      whileInView={{ clipPath: open }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.05, delay, ease: EASE }}
    >
      <motion.div
        className="w-full h-full"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.4, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
