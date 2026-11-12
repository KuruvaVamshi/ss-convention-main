import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetToTop = () => {
      // If Lenis smooth scroll is running, reset its virtual momentum immediately
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { immediate: true });
      }

      // Standard native scroll reset
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    };

    resetToTop();
    const rafId = requestAnimationFrame(resetToTop);
    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}

