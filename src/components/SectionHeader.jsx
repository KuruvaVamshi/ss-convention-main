import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import { EASE } from '../lib/motion';

export default function SectionHeader({ eyebrow, title, children, compact = false }) {
  const reduce = useReducedMotion();
  const draw = (delay) => ({
    initial: { scaleX: reduce ? 1 : 0 },
    whileInView: { scaleX: 1 },
    viewport: { once: true, amount: 0.8 },
    transition: { duration: 0.9, delay, ease: EASE },
  });
  return (
    <Reveal className={`text-center max-w-2xl mx-auto ${compact ? 'mb-2' : 'mb-12'}`}>
      <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300/90 font-semibold mb-3">{eyebrow}</p>
      <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-latte tracking-wide">{title}</h2>
      {/* Gold hairline draws outward from a small diamond */}
      <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
        <motion.span {...draw(0.15)} style={{ originX: 1 }} className="block h-px w-12 sm:w-16 bg-gradient-to-l from-[#C5A059] to-transparent" />
        <motion.span
          initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4, rotate: 45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="block w-1.5 h-1.5 bg-[#C5A059]"
        />
        <motion.span {...draw(0.15)} style={{ originX: 0 }} className="block h-px w-12 sm:w-16 bg-gradient-to-r from-[#C5A059] to-transparent" />
      </div>
      {children && <p className="mt-4 text-sm sm:text-base text-mocha leading-relaxed">{children}</p>}
    </Reveal>
  );
}
