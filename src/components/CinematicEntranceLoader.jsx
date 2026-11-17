import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ArrowRight, ChevronDown } from 'lucide-react';

/**
 * S.S. CONVENTION — CINEMATIC VENUE WALKTHROUGH
 *
 * Scene sequence:
 *   0  Exterior at Night
 *   1  Main Entrance (Google-Maps zoom towards bottom-left)
 *   2  Entrance doors swing open 3D → reveals Lobby
 *   3  Grand Lobby Lounge (stationary showcase)
 *   4  Grand Reception + confetti
 *   5  Dissolve → Homepage Carousel (index 0)
 */

const IMAGES = {
  exteriorDesktop: '/assets/entrance/Illuminated Ganesha Convention Hall at Night.png',
  exteriorMobile:  '/assets/entrance/exterior_mobile_portrait.png',
  entranceDesktop: '/assets/entrance/Grand_Illuminated_Palace_Entrance_Clean.png',
  entranceMobile:  '/assets/entrance/entrance_mobile_portrait.png',
  lobbyDesktop:    '/assets/entrance/reception_foyer_wide_balaji_buddha_lounge_15.jpeg',
  lobbyMobile:     '/assets/entrance/Elegant S.S. Convention Lobby Lounge.png',
  receptionDesktop:'/assets/entrance/Warmly Lit Convention Hall Reception.png',
  receptionMobile: '/assets/entrance/reception_mobile_portrait.png',
};

/* ─────────────────────────────────────────────────────────────────────────────
   LUXURY CAPTION — full cinematic editorial reveal
   · scene number badge (gold, top-left of text block)
   · thin golden rule that slides in from left before the headline
   · headline: oversized Cinzel, masked-line word-by-word lift
   · subtext : Plus Jakarta Sans, delayed fade-up
   · thin decorative rule below
   ───────────────────────────────────────────────────────────────────────────── */
function LuxuryCaption({ sceneNum, headline = '', subtext = '', isActive, delay = 200, position = 'bottom' }) {
  const words = typeof headline === 'string' && headline ? headline.split(' ') : [];
  const totalWords = words.length;

  /* vertical placement */
  const posClass = position === 'top'
    ? 'top-14 sm:top-16 md:top-20'
    : 'bottom-10 sm:bottom-14 md:bottom-16';

  return (
    <div
      aria-hidden={!isActive}
      className={`absolute inset-x-0 ${posClass} z-30 pointer-events-none px-6 sm:px-10 md:px-16 lg:px-24`}
      style={{ textAlign: 'left' }}
    >
      {/* ── scene badge + horizontal rule ── */}
      <div
        className="flex items-center gap-3 mb-3 sm:mb-4"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateX(0)' : 'translateX(-18px)',
          transition: `opacity 600ms ease-out ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }}
      >
        {/* Badge */}
        <span
          className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.35em] uppercase"
          style={{
            color: '#D4AF37',
            border: '1px solid rgba(212,175,55,0.5)',
            padding: '3px 10px',
            borderRadius: '99px',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            letterSpacing: '0.35em',
          }}
        >
          {String(sceneNum).padStart(2, '0')}
        </span>
        {/* Line */}
        <div
          style={{
            height: '1px',
            width: isActive ? '64px' : '0px',
            background: 'linear-gradient(90deg, #D4AF37, transparent)',
            transition: `width 700ms cubic-bezier(0.16,1,0.3,1) ${delay + 120}ms`,
          }}
        />
        {/* Venue name tiny label */}
        <span
          className="font-cinzel text-[8px] sm:text-[9px] tracking-[0.3em] uppercase"
          style={{ color: 'rgba(212,175,55,0.65)' }}
        >
          S.S. Convention
        </span>
      </div>

      {/* ── Headline: word-by-word lift with gold gradient ── */}
      {/*
          RENDERING NOTE:
          filter + WebkitTextFillColor:transparent on the SAME element causes invisible text
          in Chrome. Fix: wrap the gradient-clipped inner span in a drop-shadow wrapper div.
      */}
      <h2
        className="font-cinzel font-black leading-[1.12] tracking-[0.015em]"
        style={{
          fontSize: 'clamp(1.65rem, 5vw, 3.75rem)',
          maxWidth: '880px',
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block align-top"
            style={{
              marginRight: '0.22em',
              paddingBottom: '0.12em',
              overflow: 'visible',
              /* drop-shadow on this wrapper — NOT on the transparent-fill span */
              filter: 'drop-shadow(0 2px 18px rgba(0,0,0,0.95))',
            }}
          >
            <span
              className="inline-block will-change-transform"
              style={{
                background: 'linear-gradient(160deg, #FFFDF5 0%, #F6E8C4 45%, #C8952A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                /* NO filter here — it makes gradient-clipped text invisible in Chrome */
                transform: isActive ? 'translateY(0)' : 'translateY(105%)',
                opacity: isActive ? 1 : 0,
                display: 'inline-block',
                transition: `transform 820ms cubic-bezier(0.16,1,0.3,1) ${delay + 180 + i * 65}ms, opacity 520ms ease ${delay + 180 + i * 65}ms`,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </h2>

      {/* ── thin gold divider ── */}
      <div
        style={{
          width: isActive ? '80px' : '0px',
          height: '1.5px',
          background: 'linear-gradient(90deg, #D4AF37 0%, rgba(212,175,55,0.2) 100%)',
          marginTop: '16px',
          marginBottom: '14px',
          transition: `width 800ms cubic-bezier(0.16,1,0.3,1) ${delay + 180 + totalWords * 65 + 80}ms`,
        }}
      />

      {/* ── Supporting text ── */}
      <p
        className="font-sans font-light tracking-widest uppercase"
        style={{
          fontSize: 'clamp(0.6rem, 1.4vw, 0.78rem)',
          letterSpacing: '0.22em',
          color: 'rgba(234,216,178,0.88)',
          maxWidth: '520px',
          lineHeight: 1.75,
          textShadow: '0 2px 12px rgba(0,0,0,0.95)',
          opacity: isActive ? 0.9 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(10px)',
          transition: `opacity 700ms ease ${delay + 180 + totalWords * 65 + 200}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay + 180 + totalWords * 65 + 200}ms`,
        }}
      >
        {subtext}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DOOR PANEL — 3-D perspective swing open
   ───────────────────────────────────────────────────────────────────────────── */
function DoorPanel({ side, imageSrc, alt, isOpen }) {
  const isLeft = side === 'left';
  return (
    <div
      className={`absolute top-0 ${isLeft ? 'left-0 origin-left' : 'right-0 origin-right'} w-[calc(50%+1px)] h-full overflow-hidden will-change-transform z-20`}
      style={{
        transform: isOpen
          ? `perspective(1400px) rotateY(${isLeft ? '-90deg' : '90deg'}) translateZ(10px)`
          : 'perspective(1400px) rotateY(0deg) translateZ(0px)',
        opacity: isOpen ? 0.02 : 1,
        transformStyle: 'preserve-3d',
        transition: 'transform 1300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease-in 400ms',
        boxShadow: isOpen
          ? isLeft ? '40px 0 80px rgba(0,0,0,0.95)' : '-40px 0 80px rgba(0,0,0,0.95)'
          : 'none',
      }}
    >
      <div className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} w-screen h-full pointer-events-none will-change-transform`}>
        <img src={imageSrc} alt={alt} className="w-full h-full object-cover object-center" style={{ filter: 'brightness(0.96) contrast(1.04)' }} />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>
      <div
        className={`absolute inset-0 pointer-events-none ${isLeft ? 'bg-gradient-to-r from-transparent via-transparent to-black/85' : 'bg-gradient-to-l from-transparent via-transparent to-black/85'}`}
        style={{ opacity: isOpen ? 0.95 : 0, transition: 'opacity 800ms ease' }}
      />
      <div
        className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-[2px] h-full bg-gradient-to-b from-transparent via-[#FFE57F] to-transparent pointer-events-none`}
        style={{ opacity: isOpen ? 0.95 : 0, boxShadow: '0 0 15px #FFE57F', transition: 'opacity 600ms ease' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL VIGNETTE — cinematic four-corner darkness
   ───────────────────────────────────────────────────────────────────────────── */
function Vignette() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-[45]"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.72) 100%)',
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROGRESS DOTS — four scenes
   ───────────────────────────────────────────────────────────────────────────── */
function SceneDots({ step }) {
  const dots = [0, 1, 3, 4]; // scene steps that have a caption
  const active = dots.indexOf(step);
  return (
    <div className="absolute left-6 sm:left-8 inset-y-0 z-50 flex flex-col items-center justify-center gap-2.5 pointer-events-none">
      {dots.map((_, i) => (
        <div
          key={i}
          style={{
            width: i === active ? '2px' : '1px',
            height: i === active ? '28px' : '14px',
            borderRadius: '99px',
            background: i === active
              ? 'linear-gradient(180deg, #D4AF37, rgba(212,175,55,0.3))'
              : 'rgba(255,255,255,0.22)',
            transition: 'all 500ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function CinematicEntranceLoader({ lang = 'en', onComplete }) {
  const [step, setStep]                   = useState(0);
  const [containerFading, setContainerFading] = useState(false);
  const [shouldRender, setShouldRender]   = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('ss_entrance_seen') === 'true') return false;
        if (window.location.pathname !== '/') return false;
      }
    } catch (_) {}
    return true;
  });
  const [isMobile, setIsMobile]           = useState(false);

  const stepRef              = useRef(0);
  const isPlayingRef         = useRef(false);
  const isDismissedRef       = useRef(false);
  const isTransitioningRef   = useRef(false);
  const scrollAccumulatorRef = useRef(0);
  const touchStartYRef       = useRef(0);
  const listenersRef         = useRef({ wheel: null, touchMove: null, touchStart: null, touchEnd: null, keyDown: null, attached: false });

  const location = useLocation();

  /* ── mobile detection ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || window.innerHeight > window.innerWidth);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const exteriorImage  = isMobile ? IMAGES.exteriorMobile  : IMAGES.exteriorDesktop;
  const entranceImage  = isMobile ? IMAGES.entranceMobile  : IMAGES.entranceDesktop;
  const lobbyImage     = isMobile ? IMAGES.lobbyMobile     : IMAGES.lobbyDesktop;
  const receptionImage = isMobile ? IMAGES.receptionMobile : IMAGES.receptionDesktop;

  /* ── preload ── */
  useEffect(() => {
    if (!shouldRender) return;
    const isMob = window.innerWidth < 768 || window.innerHeight > window.innerWidth;
    const set = isMob
      ? [IMAGES.exteriorMobile, IMAGES.entranceMobile, IMAGES.lobbyMobile, IMAGES.receptionMobile]
      : [IMAGES.exteriorDesktop, IMAGES.entranceDesktop, IMAGES.lobbyDesktop, IMAGES.receptionDesktop];
    const img0 = new Image(); img0.src = set[0];
    const t = setTimeout(() => { set.slice(1).forEach(s => { const i = new Image(); i.src = s; }); }, 300);
    return () => clearTimeout(t);
  }, [shouldRender]);

  /* ── scroll reset helper ── */
  const resetScrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  /* ── complete / unlock ── */
  const unlockAndComplete = useCallback(() => {
    if (isDismissedRef.current) return;
    isDismissedRef.current = true;
    try { sessionStorage.setItem('ss_entrance_seen', 'true'); } catch (_) {}
    try { window.dispatchEvent(new CustomEvent('ss-entrance-complete')); } catch (_) {}
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (listenersRef.current.attached) {
      listenersRef.current.attached = false;
      const { wheel, touchMove, touchStart, touchEnd, keyDown } = listenersRef.current;
      if (wheel)      window.removeEventListener('wheel',     wheel,     { capture: true });
      if (touchMove)  window.removeEventListener('touchmove', touchMove, { capture: true });
      if (touchStart) window.removeEventListener('touchstart',touchStart,{ capture: true });
      if (touchEnd)   window.removeEventListener('touchend',  touchEnd,  { capture: true });
      if (keyDown)    window.removeEventListener('keydown',   keyDown,   { capture: true });
    }
    resetScrollToTop();
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      if (typeof window.lenis.start  === 'function') window.lenis.start();
      if (typeof window.lenis.resize === 'function') window.lenis.resize();
    }
    setShouldRender(false);
    onComplete?.();
  }, [resetScrollToTop, onComplete]);

  /* ── dismiss on non-home route or if already seen ── */
  useEffect(() => {
    if (location.pathname !== '/') {
      unlockAndComplete();
    }
  }, [location.pathname, unlockAndComplete]);

  /* ── confetti ── */
  const triggerReceptionConfetti = useCallback(() => {
    try {
      confetti({ particleCount: 50, spread: 100, origin: { y: 0.36 }, colors: ['#FFDF73','#D4AF37','#FFF9E6','#FFD700','#E63946'], gravity: 0.55, scalar: 1.05, ticks: 180, shapes: ['circle'] });
    } catch (_) {}
  }, []);

  /* ── step advance with fluid responsive debounces ── */
  const advanceToNextScene = useCallback(() => {
    if (isDismissedRef.current || isTransitioningRef.current) return;
    const cur = stepRef.current;

    if (cur === 0) {
      isTransitioningRef.current = true;
      stepRef.current = 1; setStep(1);
      setTimeout(() => { isTransitioningRef.current = false; }, 650);
    } else if (cur === 1) {
      isTransitioningRef.current = true;
      stepRef.current = 2; setStep(2);
      setTimeout(() => {
        if (isDismissedRef.current) return;
        stepRef.current = 3; setStep(3);
        setTimeout(() => { isTransitioningRef.current = false; }, 600);
      }, 700);
    } else if (cur === 2 || cur === 3) {
      isTransitioningRef.current = true;
      stepRef.current = 4; setStep(4);
      triggerReceptionConfetti();
      setTimeout(() => { isTransitioningRef.current = false; }, 600);
    } else if (cur === 4) {
      isTransitioningRef.current = true;
      stepRef.current = 5; setStep(5);
      setContainerFading(true);
      setTimeout(() => { unlockAndComplete(); }, 350);
    }
  }, [triggerReceptionConfetti, unlockAndComplete]);

  /* ── auto-walkthrough ── */
  const playCinematicWalkthrough = useCallback(() => {
    if (isPlayingRef.current || isDismissedRef.current) { unlockAndComplete(); return; }
    isPlayingRef.current = true;
    isTransitioningRef.current = true;

    stepRef.current = 1; setStep(1);
    setTimeout(() => {
      if (isDismissedRef.current) return;
      stepRef.current = 2; setStep(2);
      setTimeout(() => {
        if (isDismissedRef.current) return;
        stepRef.current = 3; setStep(3);
        setTimeout(() => {
          if (isDismissedRef.current) return;
          stepRef.current = 4; setStep(4); triggerReceptionConfetti();
          setTimeout(() => {
            if (isDismissedRef.current) return;
            stepRef.current = 5; setStep(5); setContainerFading(true);
            setTimeout(() => { unlockAndComplete(); }, 400);
          }, 1600);
        }, 1600);
      }, 1200);
    }, 1800);
  }, [triggerReceptionConfetti, unlockAndComplete]);

  /* ── scroll delta (supports mouse wheel, trackpad, and touch swipe) ── */
  const handleScrollDelta = useCallback((deltaY) => {
    if (isDismissedRef.current || isTransitioningRef.current) return;
    scrollAccumulatorRef.current += deltaY;

    if (scrollAccumulatorRef.current >= 38) {
      scrollAccumulatorRef.current = 0;
      advanceToNextScene();
    } else if (scrollAccumulatorRef.current <= -38) {
      scrollAccumulatorRef.current = 0;
      if (!isPlayingRef.current) {
        if (stepRef.current === 4) {
          isTransitioningRef.current = true; stepRef.current = 3; setStep(3);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (stepRef.current === 3 || stepRef.current === 2) {
          isTransitioningRef.current = true; stepRef.current = 1; setStep(1);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (stepRef.current === 1) {
          isTransitioningRef.current = true; stepRef.current = 0; setStep(0);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        }
      }
    }
  }, [advanceToNextScene]);

  /* ── event listeners ── */
  useEffect(() => {
    if (!shouldRender) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis && typeof window.lenis.start === 'function') window.lenis.start();
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { unlockAndComplete(); return; }
    if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    resetScrollToTop();
    if (window.lenis && typeof window.lenis.stop === 'function') {
      window.lenis.stop();
      window.lenis.scrollTo(0, { immediate: true });
    }

    const onWheel = (e) => {
      if (isDismissedRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      handleScrollDelta(e.deltaY);
    };
    const onTouchMove = (e) => {
      if (isDismissedRef.current) return;
      e.preventDefault();
      e.stopPropagation();
    };
    const onTouchStart = (e) => {
      if (isDismissedRef.current) return;
      if (e.touches && e.touches.length > 0) touchStartYRef.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (isDismissedRef.current) return;
      if (e.changedTouches && e.changedTouches.length > 0) {
        const dy = touchStartYRef.current - e.changedTouches[0].clientY;
        if (Math.abs(dy) > 20) handleScrollDelta(dy);
      }
    };
    const onKeyDown = (e) => {
      if (isDismissedRef.current) return;
      if (['ArrowDown','PageDown',' ','Enter'].includes(e.key)) { e.preventDefault(); advanceToNextScene(); }
      else if (['ArrowUp','PageUp'].includes(e.key)) { e.preventDefault(); handleScrollDelta(-50); }
      else if (e.key === 'Escape') { e.preventDefault(); unlockAndComplete(); }
    };

    listenersRef.current = { wheel: onWheel, touchMove: onTouchMove, touchStart: onTouchStart, touchEnd: onTouchEnd, keyDown: onKeyDown, attached: true };
    window.addEventListener('wheel',      onWheel,      { passive: false, capture: true });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true,  capture: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true,  capture: true });
    window.addEventListener('keydown',    onKeyDown,    { capture: true });

    return () => {
      // Ensure body and html overflow are ALWAYS restored on unmount
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis && typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
      if (listenersRef.current.attached) {
        listenersRef.current.attached = false;
        window.removeEventListener('wheel',      onWheel,      { capture: true });
        window.removeEventListener('touchmove',  onTouchMove,  { capture: true });
        window.removeEventListener('touchstart', onTouchStart, { capture: true });
        window.removeEventListener('touchend',   onTouchEnd,   { capture: true });
        window.removeEventListener('keydown',    onKeyDown,    { capture: true });
      }
    };
  }, [shouldRender, handleScrollDelta, advanceToNextScene, resetScrollToTop, unlockAndComplete]);

  if (!shouldRender) return null;

  const entranceDoorsOpen = step >= 2;

  /* ─────────────────────────── RENDER ─────────────────────────── */
  return (
    <div
      role="dialog"
      aria-label="S.S. Convention Grand Cinematic Walkthrough"
      onClick={advanceToNextScene}
      onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }}
      className={`fixed inset-0 z-[99999] overflow-hidden select-none cursor-pointer bg-[#060106] transition-opacity duration-500 ease-out ${containerFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >

      {/* ══════════════════════════════════════════════════════════════
          LAYER 1 — SCENE 4: GRAND RECEPTION (bottom)
          ════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div
          className="w-full h-full will-change-transform"
          style={{
            transform: step >= 4 ? 'scale(1.0)' : 'scale(1.04)',
            transition: 'transform 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <img src={receptionImage} alt="S.S. Convention Reception" className="w-full h-full object-cover object-center" style={{ filter: 'brightness(0.9) contrast(1.06)' }} />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </div>
        {/* scrims */}
        <div className="absolute top-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none z-[25]" />
        <div className="absolute bottom-0 inset-x-0 h-56 sm:h-72 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none z-[25]" />
        <LuxuryCaption
          sceneNum={4}
          headline={lang === 'te' ? 'మీ మధుర క్షణాలు. మా రాజప్రాంగణం.' : 'Your Moments. Our Space.'}
          subtext={lang === 'te' ? 'ప్రతి శుభకార్యం ఒక అద్భుత జ్ఞాపకంగా మారే పవిత్ర కల్యాణ వేదిక.' : 'Where grand occasions become beautiful memories, and every celebration finds its perfect setting.'}
          isActive={step === 4}
          position="bottom"
          delay={300}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 2 — SCENE 3: GRAND LOBBY (third image)
          ════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
        style={{ opacity: step >= 4 ? 0 : 1, transition: 'opacity 800ms ease-in-out' }}
      >
        <div
          className="w-full h-full will-change-transform"
          style={{
            transform: step >= 3 ? 'scale(1.0) translateY(0)' : 'scale(1.05) translateY(1%)',
            transition: 'transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <img src={lobbyImage} alt="S.S. Convention Grand Lobby Lounge" className="w-full h-full object-cover object-center" style={{ filter: 'brightness(0.9) contrast(1.06)' }} />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </div>
        <div className="absolute top-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none z-[25]" />
        <div className="absolute bottom-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-[25]" />
        <LuxuryCaption
          sceneNum={3}
          headline={lang === 'te' ? 'క్షణకాలం ఆగండి. వైభవం ఆహ్వానిస్తుంది.' : 'Pause Here. Let Elegance Welcome You.'}
          subtext={lang === 'te' ? 'ఘనమైన ఆతిథ్యం, ముందున్న గొప్ప సంబరానికి ఒక శుభారంభం మాత్రమే.' : 'A thoughtful welcome is only the beginning of everything waiting ahead.'}
          isActive={step === 3}
          position="bottom"
          delay={300}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3 — SCENE 2: ENTRANCE PORTAL + 3D DOORS
          ════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-30 overflow-hidden pointer-events-none"
        style={{ opacity: step >= 4 ? 0 : 1, transition: 'opacity 600ms ease-out' }}
      >
        <div
          className="absolute inset-0 will-change-transform overflow-hidden pointer-events-none"
          style={{
            transform: step >= 1 ? 'scale(1.0) translateY(0)' : 'scale(1.09) translateY(0.8%)',
            transformOrigin: isMobile ? '40% 70%' : '32% 68%',
            opacity: step >= 1 ? 1 : 0.45,
            transition: 'transform 2000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1500ms ease-out',
          }}
        >
          <DoorPanel side="left"  imageSrc={entranceImage} alt="S.S. Convention Grand Entrance Left Door"  isOpen={entranceDoorsOpen} />
          <DoorPanel side="right" imageSrc={entranceImage} alt="S.S. Convention Grand Entrance Right Door" isOpen={entranceDoorsOpen} />
        </div>
        <div className="absolute top-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none z-[25]" />
        <div className="absolute bottom-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-[25]" />
        <LuxuryCaption
          sceneNum={2}
          headline={lang === 'te' ? 'ఈ ప్రవేశద్వారం దాటితే, ఒక దివ్యమైన అనుభూతి.' : 'Beyond This Entrance, Something Beautiful Awaits.'}
          subtext={lang === 'te' ? 'అడుగు ముందుకు వేయండి. మీ రాచరిక అనుభవం ఇప్పుడే మొదలవుతోంది.' : 'Step inside. Your experience is just beginning.'}
          isActive={step === 1}
          position="bottom"
          delay={1400}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 4 — SCENE 1: EXTERIOR AT NIGHT (top)
          ════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-40 overflow-hidden pointer-events-none"
        style={{
          opacity: step >= 1 ? 0 : 1,
          transition: step >= 1 ? 'opacity 1200ms ease-in-out 800ms' : 'opacity 500ms ease-out',
        }}
      >
        <div
          className="w-full h-full overflow-hidden will-change-transform"
          style={{
            transform: step >= 1
              ? (isMobile ? 'scale(1.25)' : 'scale(1.22)')
              : 'scale(1.0)',
            transformOrigin: isMobile ? '40% 70%' : '32% 68%',
            transition: 'transform 2000ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <img src={exteriorImage} alt="S.S. Convention Building Exterior at Night" className="w-full h-full object-cover object-center" style={{ filter: 'brightness(0.9) contrast(1.06)' }} />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>
        <div className="absolute top-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none z-[25]" />
        <div className="absolute bottom-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-[25]" />
        <LuxuryCaption
          sceneNum={1}
          headline={lang === 'te' ? 'వైభవమైన వేడుకకు అద్భుతమైన ఆరంభం.' : 'A Celebration Begins With a First Impression.'}
          subtext={lang === 'te' ? 'ప్రతి మధురమైన సందర్భానికి ఒక చిరస్మరణీయమైన శుభారంభం.' : 'Every unforgettable occasion deserves an extraordinary beginning.'}
          isActive={step === 0}
          position="bottom"
          delay={350}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          GLOBAL VIGNETTE (above all images, below UI)
          ════════════════════════════════════════════════════════════ */}
      <Vignette />

      {/* ══════════════════════════════════════════════════════════════
          SCENE PROGRESS DOTS (left rail)
          ════════════════════════════════════════════════════════════ */}
      <SceneDots step={step} />

      {/* ══════════════════════════════════════════════════════════════
          TOP BAR — brand wordmark + "Enter Venue" button
          ════════════════════════════════════════════════════════════ */}
      <div className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5 sm:py-6">
        {/* Brand wordmark left */}
        <div className="flex flex-col leading-none pointer-events-none">
          <span
            className="font-cinzel font-black tracking-[0.18em] uppercase"
            style={{ fontSize: 'clamp(0.7rem, 2vw, 1rem)', color: '#D4AF37', letterSpacing: '0.22em' }}
          >
            S.S. Convention
          </span>
          <span
            className="font-sans font-light tracking-[0.3em] uppercase"
            style={{ fontSize: 'clamp(0.42rem, 1vw, 0.55rem)', color: 'rgba(212,175,55,0.6)', marginTop: '3px', letterSpacing: '0.3em' }}
          >
            Wedding &amp; Function Halls &mdash; Meerpet
          </span>
        </div>

        {/* Enter Venue button right */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); playCinematicWalkthrough(); }}
          aria-label="Enter venue"
          className="group inline-flex items-center gap-2.5 font-cinzel font-bold uppercase tracking-[0.2em] cursor-pointer"
          style={{
            fontSize: 'clamp(0.55rem, 1.4vw, 0.72rem)',
            color: '#EED9A6',
            border: '1px solid rgba(212,175,55,0.55)',
            borderRadius: '99px',
            padding: '10px 20px',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
            transition: 'background 300ms ease, box-shadow 300ms ease, transform 200ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(90,20,30,0.85)';
            e.currentTarget.style.boxShadow = '0 6px 32px rgba(212,175,55,0.3), inset 0 1px 0 rgba(255,255,255,0.08)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.65)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>{lang === 'te' ? 'వేదికలోకి ప్రవేశించండి' : 'Enter Venue'}</span>
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ color: '#D4AF37' }}
          />
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM — scene instruction + scroll cue
          ════════════════════════════════════════════════════════════ */}
      <div
        className={`absolute bottom-5 inset-x-0 z-50 flex flex-col items-center gap-1 pointer-events-none transition-opacity duration-700 ${step < 5 ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Animated scroll arrow */}
        <div
          style={{
            width: '1px',
            height: '28px',
            background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.7), transparent)',
            animation: 'ss-scroll-pulse 2s ease-in-out infinite',
            marginBottom: '4px',
          }}
        />
        <span
          className="font-cinzel tracking-[0.28em] uppercase"
          style={{ fontSize: '9px', color: 'rgba(212,175,55,0.65)' }}
        >
          {lang === 'te' ? 'స్క్రోల్ చేయండి' : 'Scroll to continue'}
        </span>
      </div>

      {/* ── inline keyframe for scroll pulse ── */}
      <style>{`
        @keyframes ss-scroll-pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.7); }
          50%       { opacity: 1;   transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
