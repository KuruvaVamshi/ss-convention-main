import React from 'react';
import Reveal from './Reveal';

export default function SectionHeader({ eyebrow, title, children, compact = false }) {
  return (
    <Reveal className={`text-center max-w-2xl mx-auto ${compact ? 'mb-2' : 'mb-12'}`}>
      <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300/90 font-semibold mb-3">{eyebrow}</p>
      <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-latte tracking-wide">{title}</h2>
      <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
      {children && <p className="mt-4 text-sm sm:text-base text-mocha leading-relaxed">{children}</p>}
    </Reveal>
  );
}
