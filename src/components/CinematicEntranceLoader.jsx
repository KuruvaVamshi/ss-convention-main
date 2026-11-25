import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ArrowRight } from 'lucide-react';

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

/* Headline animation style: 'rise' (words slide up from a mask) or 'curtain' (line wiped open L→R) */
const CAPTION_VARIANT = 'rise';

/* Lobby → reception light-wipe */
const WIPE_MS = 1250;
/* Reception → website golden iris */
const IRIS_MS = 1200;
const IRIS_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const WIPE_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

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
function LuxuryCaption({ sceneNum, headline = '', subtext = '', isActive, delay = 250, position = 'bottom', variant = CAPTION_VARIANT }) {
  const words = typeof headline === 'string' && headline ? headline.split(' ') : [];
  const totalWords = words.length;

  /* vertical placement */
  const posClass = position === 'top'
    ? 'top-14 sm:top-16 md:top-20'
    : 'bottom-10 sm:bottom-14 md:bottom-16';

  /* ── timing ──────────────────────────────────────────────────────────
     ENTER: starts `delay` ms after the scene changes, runs ~1s in total.
     EXIT : starts immediately (no delay) and takes ~220ms, so a caption never
            lingers over the next scene's image.
     Using the same easing family everywhere (luxury). */
  const EASE = 'cubic-bezier(0.16,1,0.3,1)';
  const WORD_STAGGER = 55;
  const wordsStart = delay + 80;
  const wordsEnd = wordsStart + totalWords * WORD_STAGGER;

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
          transition: isActive
            ? `opacity 500ms ease-out ${delay}ms, transform 700ms ${EASE} ${delay}ms`
            : 'opacity 220ms ease-in 0ms, transform 0s linear 240ms',
        }}
      >
        <span
          className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.35em] uppercase"
          style={{
            color: '#D4AF37',
            border: '1px solid rgba(212,175,55,0.5)',
            padding: '3px 10px',
            borderRadius: '99px',
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            letterSpacing: '0.35em',
          }}
        >
          {String(sceneNum).padStart(2, '0')}
        </span>
        <div
          style={{
            height: '1px',
            width: isActive ? '64px' : '0px',
            background: 'linear-gradient(90deg, #D4AF37, transparent)',
            transition: isActive ? `width 700ms ${EASE} ${delay + 120}ms` : 'width 0s linear 240ms',
          }}
        />
        <span
          className="font-cinzel text-[8px] sm:text-[9px] tracking-[0.3em] uppercase"
          style={{ color: 'rgba(212,175,55,0.75)', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
        >
          S.S. Convention
        </span>
      </div>

      {/* ── Headline ──
          'rise'    : every word slides up out of an invisible mask (clean editorial line reveal)
          'curtain' : the whole line is wiped open from left to right with a soft gold edge
          RENDERING NOTE: filter + WebkitTextFillColor:transparent on the SAME element makes
          text invisible in Chrome, so drop-shadow lives on the wrapper, never on the gradient span. */}
      <h2
        className="font-cinzel font-black leading-[1.14] tracking-[0.015em]"
        style={{
          fontSize: 'clamp(1.65rem, 5vw, 3.75rem)',
          maxWidth: '880px',
          ...(variant === 'curtain'
            ? {
                clipPath: isActive ? 'inset(-0.2em -0.2em -0.3em 0%)' : 'inset(-0.2em 100% -0.3em 0%)',
                transition: isActive
                  ? `clip-path 1100ms ${EASE} ${wordsStart}ms`
                  : 'clip-path 0s linear 240ms',
              }
            : null),
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block align-top"
            style={{
              marginRight: '0.22em',
              /* generous padding so tall Telugu marks / descenders are never clipped by the mask */
              padding: variant === 'curtain' ? 0 : '0.2em 0.05em 0.3em',
              margin: variant === 'curtain' ? '0 0.22em 0 0' : '-0.2em 0.17em -0.3em -0.05em',
              overflow: variant === 'curtain' ? 'visible' : 'hidden',
              filter: 'drop-shadow(0 2px 14px rgba(0,0,0,0.75))',
            }}
          >
            <span
              className="inline-block will-change-transform"
              style={{
                background: 'linear-gradient(160deg, #FFFDF5 0%, #F6E8C4 45%, #E0B04A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                ...(variant === 'curtain'
                  ? { opacity: 1, transform: 'none' }
                  : {
                      transform: isActive ? 'translateY(0)' : 'translateY(115%)',
                      opacity: isActive ? 1 : 0,
                      transition: isActive
                        ? `transform 850ms ${EASE} ${wordsStart + i * WORD_STAGGER}ms, opacity 450ms ease-out ${wordsStart + i * WORD_STAGGER}ms`
                        : 'opacity 220ms ease-in 0ms, transform 0s linear 240ms',
                    }),
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
          transition: isActive ? `width 800ms ${EASE} ${wordsEnd + 60}ms` : 'width 0s linear 240ms',
        }}
      />

      {/* ── Supporting text ── */}
      <p
        className="font-sans font-light tracking-widest uppercase"
        style={{
          fontSize: 'clamp(0.6rem, 1.4vw, 0.78rem)',
          letterSpacing: '0.22em',
          color: 'rgba(240,226,190,0.95)',
          maxWidth: '520px',
          lineHeight: 1.75,
          textShadow: '0 2px 10px rgba(0,0,0,0.85)',
          opacity: isActive ? 0.95 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(10px)',
          transition: isActive
            ? `opacity 600ms ease-out ${wordsEnd + 120}ms, transform 700ms ${EASE} ${wordsEnd + 120}ms`
            : 'opacity 220ms ease-in 0ms, transform 0s linear 240ms',
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
        <img src={imageSrc} alt={alt} className="w-full h-full object-cover object-center" style={{ filter: 'brightness(1.02) contrast(1.03)' }} />
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
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.22) 100%)',
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

/* ─────────────────────────────────────────────────────────────────────────────
   GOLD MOTES — a few slow-drifting specks of golden light (CSS only, transform/opacity).
   Visible only during the lobby + reception scenes so the stationary shots feel alive.
   ───────────────────────────────────────────────────────────────────────────── */
const MOTE_SEED = Array.from({ length: 18 }, (_, i) => {
  // deterministic pseudo-random so the layout is stable between renders
  const r = (n) => { const x = Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453; return x - Math.floor(x); };
  return { left: 4 + r(1) * 92, bottom: -4 + r(2) * 70, size: 2 + r(3) * 3.2, dur: 6 + r(4) * 6, delay: -r(5) * 8, drift: (r(6) - 0.5) * 60, rise: 90 + r(7) * 160 };
});

function GoldMotes({ active, count = 18 }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[44] pointer-events-none overflow-hidden"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 900ms ease-out' }}
    >
      {MOTE_SEED.slice(0, count).map((m, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${m.left}%`,
            bottom: `${m.bottom}%`,
            width: m.size,
            height: m.size,
            background: 'radial-gradient(circle, #FFF3C4 0%, rgba(238,217,166,0.85) 45%, rgba(212,175,55,0) 72%)',
            boxShadow: '0 0 8px 2px rgba(238,217,166,0.35)',
            opacity: 0,
            animation: `ss-mote ${m.dur}s ease-in-out ${m.delay}s infinite`,
            ['--dx']: `${m.drift}px`,
            ['--dy']: `-${m.rise}px`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}

/* Warm light that blooms over the chandeliers / lamps once a scene lands */
function WarmBloom({ active, x = '50%', y = '30%', delay = 350 }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        mixBlendMode: 'screen',
        background: `radial-gradient(ellipse 62% 48% at ${x} ${y}, rgba(255,210,130,0.34) 0%, rgba(255,190,100,0.12) 45%, transparent 72%)`,
        opacity: active ? 1 : 0,
        transition: `opacity 1600ms ease-out ${active ? delay : 0}ms`,
        animation: active ? 'ss-bloom 4.5s ease-in-out infinite alternate' : 'none',
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function CinematicEntranceLoader({ onComplete }) {
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
    setTimeout(() => { try {
      confetti({ particleCount: 50, spread: 100, origin: { y: 0.36 }, colors: ['#FFDF73','#D4AF37','#FFF9E6','#FFD700','#E63946'], gravity: 0.55, scalar: 1.05, ticks: 180, shapes: ['circle'], zIndex: 100000 });
    } catch (_) {} }, 450);
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
      setTimeout(() => { isTransitioningRef.current = false; }, WIPE_MS + 150);
    } else if (cur === 4) {
      isTransitioningRef.current = true;
      stepRef.current = 5; setStep(5);
      setContainerFading(true);
      setTimeout(() => { unlockAndComplete(); }, IRIS_MS + 60);
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
            setTimeout(() => { unlockAndComplete(); }, IRIS_MS + 60);
          }, 3400);   // scene 4 (reception) hold
        }, 3200);     // scene 3 (lobby) hold
      }, 1300);       // doors swing open
    }, 3400);         // scene 2 (entrance) hold — headline needs ~2s on screen
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
  // ring diameter = 2 × 75% of the clip-path reference length, so ring and iris edge close together
  const irisRing = Math.round(1.5 * Math.hypot(window.innerWidth, window.innerHeight) / Math.SQRT2);

  /* ─────────────────────────── RENDER ─────────────────────────── */
  return (
    <div
      role="dialog"
      aria-label="S.S. Convention Grand Cinematic Walkthrough"
      onClick={advanceToNextScene}
      onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }}
      className={`fixed inset-0 z-[99999] overflow-hidden select-none cursor-pointer bg-[#060106] ${containerFading ? 'pointer-events-none' : ''}`}
      style={{
        /* golden iris: the intro closes toward the centre, revealing the website underneath */
        clipPath: containerFading ? 'circle(0% at 50% 50%)' : 'circle(75% at 50% 50%)',
        transition: containerFading ? `clip-path ${IRIS_MS}ms ${IRIS_EASE}` : 'none',
      }}
    >
      {/* motes of golden light — lobby + reception only */}
      <GoldMotes active={step === 3 || step === 4} count={isMobile ? 10 : 18} />

      {/* light band that sweeps across during the lobby → reception wipe (keyed so it replays) */}
      {step === 4 && (
        <div aria-hidden="true" className="absolute inset-y-0 left-0 z-[44] pointer-events-none w-0" style={{ animation: `ss-wipe-band ${WIPE_MS}ms ${WIPE_EASE} forwards` }}>
          <div className="absolute inset-y-0 -left-[150px] w-[300px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,226,160,0.10) 35%, rgba(255,240,200,0.55) 50%, rgba(255,226,160,0.10) 65%, transparent 100%)', mixBlendMode: 'screen' }} />
          <div className="absolute inset-y-0 -left-px w-[2px]" style={{ background: 'linear-gradient(180deg, transparent, #FFF3C4 20%, #FFF3C4 80%, transparent)', boxShadow: '0 0 28px 6px rgba(255,226,150,0.65)' }} />
        </div>
      )}

      {/* glowing ring that rides the iris edge as the intro closes */}
      {containerFading && (
        <div
          aria-hidden="true"
          className="absolute z-[60] pointer-events-none rounded-full"
          style={{
            left: '50%', top: '50%',
            width: irisRing, height: irisRing,
            marginLeft: -irisRing / 2, marginTop: -irisRing / 2,
            border: '2px solid rgba(255,236,185,0.95)',
            boxShadow: '0 0 36px 6px rgba(238,217,166,0.55), inset 0 0 36px 4px rgba(238,217,166,0.35)',
            animation: `ss-iris-ring ${IRIS_MS}ms ${IRIS_EASE} forwards`,
            willChange: 'transform',
          }}
        />
      )}

      {/* ══════════════════════════════════════════════════════════════
          LAYER 1 — SCENE 4: GRAND RECEPTION (bottom)
          ════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div
          className="w-full h-full will-change-transform"
          style={{
            transform: step >= 4 ? 'scale(1.0)' : 'scale(1.12)',
            transition: step >= 4 ? 'transform 2600ms cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 800ms ease-out',
          }}
        >
          <img src={receptionImage} alt="S.S. Convention Reception" className="w-full h-full object-cover object-center" style={{ filter: 'brightness(1.02) contrast(1.04)' }} />
          <WarmBloom active={step === 4} x="50%" y="26%" delay={500} />
        </div>
        {/* scrims */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-black/45 via-black/12 to-transparent pointer-events-none z-[25]" />
        <div className="absolute bottom-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-[25]" />
        <LuxuryCaption
          sceneNum={4}
          headline={'Your Moments. Our Space.'}
          subtext={'Where grand occasions become beautiful memories, and every celebration finds its perfect setting.'}
          isActive={step === 4}
          position="bottom"
          delay={250}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 2 — SCENE 3: GRAND LOBBY (third image)
          ════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
        style={{
          /* the lobby is wiped away left→right by a band of light, revealing the reception */
          clipPath: step >= 4 ? 'inset(0 0 0 101%)' : 'inset(0 0 0 0%)',
          transition: `clip-path ${WIPE_MS}ms ${WIPE_EASE}`,
        }}
      >
        <div
          className="w-full h-full will-change-transform"
          style={{
            /* step<3: settled start · step 3: slow forward walk-in · step 4: push through as the wipe passes */
            transform: step >= 4 ? 'scale(1.22)' : step === 3 ? 'scale(1.085)' : 'scale(1.0) translateY(0)',
            transition: step >= 4
              ? `transform ${WIPE_MS + 200}ms cubic-bezier(0.5, 0, 0.75, 0)`
              : step === 3
                ? 'transform 7000ms cubic-bezier(0.22, 0.7, 0.4, 1)'
                : 'transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <img src={lobbyImage} alt="S.S. Convention Grand Lobby Lounge" className="w-full h-full object-cover object-center" style={{ filter: 'brightness(1.02) contrast(1.04)' }} />
          <WarmBloom active={step === 3} x="50%" y="34%" delay={600} />
        </div>
        <div className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-black/45 via-black/12 to-transparent pointer-events-none z-[25]" />
        <div className="absolute bottom-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-[25]" />
        <LuxuryCaption
          sceneNum={3}
          headline={'Pause Here. Let Elegance Welcome You.'}
          subtext={'A thoughtful welcome is only the beginning of everything waiting ahead.'}
          isActive={step === 3}
          position="bottom"
          delay={250}
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
        <div className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-black/45 via-black/12 to-transparent pointer-events-none z-[25]" />
        <div className="absolute bottom-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-[25]" />
        <LuxuryCaption
          sceneNum={2}
          headline={'Beyond This Entrance, Something Beautiful Awaits.'}
          subtext={'Step inside. Your experience is just beginning.'}
          isActive={step === 1}
          position="bottom"
          delay={500}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 4 — SCENE 1: EXTERIOR AT NIGHT (top)
          ════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-40 overflow-hidden pointer-events-none"
        style={{
          opacity: step >= 1 ? 0 : 1,
          transition: step >= 1 ? 'opacity 900ms ease-in-out 450ms' : 'opacity 500ms ease-out',
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
          <img src={exteriorImage} alt="S.S. Convention Building Exterior at Night" className="w-full h-full object-cover object-center" style={{ filter: 'brightness(1.02) contrast(1.04)' }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-black/45 via-black/12 to-transparent pointer-events-none z-[25]" />
        <div className="absolute bottom-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-[25]" />
        <LuxuryCaption
          sceneNum={1}
          headline={'A Celebration Begins With a First Impression.'}
          subtext={'Every unforgettable occasion deserves an extraordinary beginning.'}
          isActive={step === 0}
          position="bottom"
          delay={300}
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
            style={{ fontSize: 'clamp(0.7rem, 2vw, 1rem)', color: '#D4AF37', letterSpacing: '0.22em', textShadow: '0 1px 10px rgba(0,0,0,0.85)' }}
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

        <div className="flex items-center gap-2 sm:gap-3">
        {/* Skip intro — always visible so nobody is held behind the animation */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); unlockAndComplete(); }}
          aria-label="Skip intro"
          className="ss-skip font-cinzel font-bold uppercase tracking-[0.2em] cursor-pointer"
          style={{
            fontSize: 'clamp(0.5rem, 1.3vw, 0.66rem)',
            color: 'rgba(238,217,166,0.8)',
            padding: '10px 8px',
            background: 'transparent',
            textShadow: '0 1px 8px rgba(0,0,0,0.9)',
          }}
        >
          {'Skip intro'}
        </button>

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
          <span>{'Enter Venue'}</span>
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ color: '#D4AF37' }}
          />
        </button>
        </div>
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
          {'Scroll to continue'}
        </span>
      </div>

      {/* ── inline keyframe for scroll pulse ── */}
      <style>{`
        @keyframes ss-scroll-pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.7); }
          50%       { opacity: 1;   transform: scaleY(1); }
        }
        @keyframes ss-mote {
          0%   { opacity: 0;    transform: translate3d(0, 0, 0) scale(0.6); }
          15%  { opacity: 0.95; }
          60%  { opacity: 0.7; }
          100% { opacity: 0;    transform: translate3d(var(--dx), var(--dy), 0) scale(1.1); }
        }
        @keyframes ss-bloom {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        @keyframes ss-wipe-band {
          from { transform: translateX(-2px); opacity: 1; }
          to   { transform: translateX(100vw); opacity: 1; }
        }
        @keyframes ss-iris-ring {
          from { transform: scale(1); opacity: 1; }
          80%  { opacity: 1; }
          to   { transform: scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
