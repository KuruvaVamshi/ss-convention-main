import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    if (window.lenis) {
      if (typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { immediate: true });
      }
      if (typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
    }

    const timer = setTimeout(() => {
      if (window.lenis && typeof window.lenis.resize === 'function') {
        window.lenis.resize();
      }
      window.gsapScrollTrigger?.refresh?.();
    }, 120);

    let tries = 0;
    let hashTimer = null;
    const goToHash = () => {
      const el = hash ? document.getElementById(hash.slice(1)) : null;
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 70;
        if (window.lenis && typeof window.lenis.scrollTo === 'function') window.lenis.scrollTo(y, { duration: 1.1 });
        else window.scrollTo({ top: y, behavior: 'smooth' });
      } else if (hash && tries++ < 20) {
        hashTimer = setTimeout(goToHash, 100);
      }
    };
    if (hash) hashTimer = setTimeout(goToHash, 250);

    return () => { clearTimeout(timer); clearTimeout(hashTimer); };
  }, [pathname, hash]);

  return null;
}
