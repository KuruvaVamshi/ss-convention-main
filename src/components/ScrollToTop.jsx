import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 1. Clear any stuck body / html overflow locks from previous routes
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    // 2. Standard native scroll reset
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    // 3. Reset Lenis smooth scroll
    if (window.lenis) {
      if (typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { immediate: true });
      }
      if (typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
    }

    // 4. Clean up any unmounted ScrollTriggers and recalibrate layout for the new page
    const timer = setTimeout(() => {
      if (window.lenis && typeof window.lenis.resize === 'function') {
        window.lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

