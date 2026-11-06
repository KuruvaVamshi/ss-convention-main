import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
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
  }, [pathname]);

  return null;
}

