import React, { useEffect } from 'react';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let destroyed = false;
    let rafId;
    let lenis = null;

    const init = async () => {
      try {
        const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
        if (destroyed) return;
        gsap.registerPlugin(ScrollTrigger);
        window.gsapScrollTrigger = ScrollTrigger;

        lenis = new Lenis({
          duration: 0.95,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.2,
          syncTouch: false,
        });

        window.lenis = lenis;
        lenis.on('scroll', ScrollTrigger.update);

        const raf = (time) => {
          if (destroyed || !lenis) return;
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        gsap.ticker.lagSmoothing(0);
      } catch (_) {}
    };

    const scheduleInit = () => {
      if (destroyed) return;
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(init, { timeout: 1500 });
      } else {
        setTimeout(init, 600);
      }
    };

    let timer = null;
    const onLoad = () => {
      timer = setTimeout(scheduleInit, 400);
    };
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => {
      destroyed = true;
      window.removeEventListener('load', onLoad);
      if (timer) clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
