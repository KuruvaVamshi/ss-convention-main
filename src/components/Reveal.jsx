import React, { useEffect, useRef, useState } from 'react';

// Lightweight viewport-once scroll reveal matching luxury cubic-bezier(0.22, 1, 0.36, 1)
export default function Reveal({ children, delay = 0, className = '', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (visible) return undefined;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
