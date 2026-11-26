import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let rafId = null;
    const update = () => {
      rafId = null;
      const el = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{ transform: 'scaleX(0)' }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9995] bg-gradient-to-r from-[#B8860B] via-[#EED9A6] to-[#C5A059]"
    />
  );
}
