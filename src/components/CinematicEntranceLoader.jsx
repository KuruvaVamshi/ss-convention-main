import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, ChevronDown } from 'lucide-react';

/**
 * S.S. CONVENTION — CINEMATIC SLOW TWO-IMAGE PALACE ENTRANCE
 * 
 * On clicking "Enter Venue" (or anywhere on the screen, or scrolling down):
 * 1. Image 1 (Building Exterior at Night) double doors swing open SLOWLY in 3D (1600ms).
 * 2. Reveals Image 2 (Grand Reception with Lord Ganesha & "A GRAND WELCOME AWAITS").
 * 3. Image 2 (Reception) double doors swing open SLOWLY in 3D (1600ms) with golden flower petals.
 * 4. Gracefully hands over to the Homepage Hero Page at scroll y = 0.
 */

const EXTERIOR_IMAGE = '/assets/entrance/Illuminated Ganesha Convention Hall at Night.png';
const RECEPTION_IMAGE = '/assets/entrance/Warmly Lit Convention Hall Reception.png';

/**
 * DoorPanel - Symmetrical half-slice of a full-screen photograph.
 * When closed: 1px subpixel overlap ensures 100% seamless, continuous photo with zero lines.
 * When opening: Swings smoothly and slowly in 3D perspective around outer hinges.
 */
function DoorPanel({ side, imageSrc, alt, isOpen }) {
  const isLeft = side === 'left';

  return (
    <div
      className={`absolute top-0 ${
        isLeft ? 'left-0 origin-left' : 'right-0 origin-right'
      } w-[calc(50%+1px)] h-full overflow-hidden will-change-transform z-20`}
      style={{
        transform: isOpen
          ? `perspective(1400px) rotateY(${isLeft ? '-92deg' : '92deg'}) translateZ(10px)`
          : 'perspective(1400px) rotateY(0deg) translateZ(0px)',
        opacity: isOpen ? 0.05 : 1,
        transformStyle: 'preserve-3d',
        transition: 'transform 1600ms cubic-bezier(0.25, 1, 0.35, 1), opacity 1000ms ease-in 600ms',
        boxShadow: isOpen
          ? isLeft
            ? '40px 0 80px rgba(0,0,0,0.95)'
            : '-40px 0 80px rgba(0,0,0,0.95)'
          : 'none'
      }}
    >
      {/* Full-width image pinned to screen boundaries */}
      <div
        className={`absolute top-0 ${
          isLeft ? 'left-0' : 'right-0'
        } w-screen h-full pointer-events-none`}
      >
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* 3D Depth Shading dynamically active during door swing */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isLeft
            ? 'bg-gradient-to-r from-transparent via-transparent to-black/85'
            : 'bg-gradient-to-l from-transparent via-transparent to-black/85'
        }`}
        style={{ opacity: isOpen ? 0.95 : 0 }}
      />

      {/* Golden Vertical Light Edge along meeting stile — invisible when closed */}
      <div
        className={`absolute top-0 ${
          isLeft ? 'right-0' : 'left-0'
        } w-[2px] h-full bg-gradient-to-b from-transparent via-[#FFE57F] to-transparent shadow-[0_0_15px_#FFE57F] pointer-events-none transition-opacity duration-700`}
        style={{ opacity: isOpen ? 0.95 : 0 }}
      />
    </div>
  );
}

export default function CinematicEntranceLoader({ lang = 'en', onComplete }) {
  // Step: 0 = Exterior, 1 = Reception, 2 = Completing/Hero
  const [step, setStep] = useState(0);
  const [containerFading, setContainerFading] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const stepRef = useRef(0);
  const isPlayingRef = useRef(false);
  const isDismissedRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const touchStartYRef = useRef(0);

  // References to event listeners for clean immediate detachment
  const listenersRef = useRef({
    wheel: null,
    touchMove: null,
    touchStart: null,
    touchEnd: null,
    keyDown: null,
    attached: false
  });

  // Absolute scroll reset ensuring hero always starts from y = 0
  const resetScrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }
  }, []);

  // Complete unlock function: fully restores scroll and resumes Lenis
  const unlockAndComplete = useCallback(() => {
    if (isDismissedRef.current) return;
    isDismissedRef.current = true;

    // 1. Restore body overflow so homepage can scroll freely
    document.body.style.overflow = '';

    // 2. Remove all window capture listeners immediately
    if (listenersRef.current.attached) {
      listenersRef.current.attached = false;
      if (listenersRef.current.wheel) {
        window.removeEventListener('wheel', listenersRef.current.wheel, { capture: true });
      }
      if (listenersRef.current.touchMove) {
        window.removeEventListener('touchmove', listenersRef.current.touchMove, { capture: true });
      }
      if (listenersRef.current.touchStart) {
        window.removeEventListener('touchstart', listenersRef.current.touchStart, { capture: true });
      }
      if (listenersRef.current.touchEnd) {
        window.removeEventListener('touchend', listenersRef.current.touchEnd, { capture: true });
      }
      if (listenersRef.current.keyDown) {
        window.removeEventListener('keydown', listenersRef.current.keyDown, { capture: true });
      }
    }

    // 3. Anchor to top of hero
    resetScrollToTop();

    // 4. Resume Lenis smooth scrolling
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      if (typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
    }

    // 5. Hide component and notify parent
    setShouldRender(false);
    onComplete?.();
  }, [resetScrollToTop, onComplete]);

  // Preload authentic photographs
  useEffect(() => {
    [EXTERIOR_IMAGE, RECEPTION_IMAGE].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Slowly opens the two images sequentially
  const playSlowOpeningSequence = useCallback(() => {
    if (isPlayingRef.current || isDismissedRef.current) return;
    isPlayingRef.current = true;
    resetScrollToTop();

    if (stepRef.current === 0) {
      // 1. Open Image 1 (Exterior) slowly
      stepRef.current = 1;
      setStep(1);
      resetScrollToTop();

      // 2. Let visitor admire the Grand Reception (1900ms pause)
      setTimeout(() => {
        if (isDismissedRef.current) return;

        // 3. Open Image 2 (Reception) slowly
        resetScrollToTop();
        stepRef.current = 2;
        setStep(2);

        // Shower of celebratory golden petals
        try {
          confetti({
            particleCount: 50,
            spread: 110,
            origin: { y: 0.38 },
            colors: ['#FFDF73', '#D4AF37', '#FFF9E6', '#FFD700', '#E63946'],
            gravity: 0.55,
            scalar: 1.05,
            ticks: 200,
            shapes: ['circle']
          });
        } catch (_) {}

        // 4. Fade container out after Reception doors have fully swung open
        setTimeout(() => {
          resetScrollToTop();
          setContainerFading(true);
          setTimeout(() => {
            unlockAndComplete();
          }, 600);
        }, 1800);
      }, 1900);
    } else if (stepRef.current === 1) {
      // Already at Reception, open Reception doors slowly
      resetScrollToTop();
      stepRef.current = 2;
      setStep(2);

      try {
        confetti({
          particleCount: 50,
          spread: 110,
          origin: { y: 0.38 },
          colors: ['#FFDF73', '#D4AF37', '#FFF9E6', '#FFD700', '#E63946'],
          gravity: 0.55,
          scalar: 1.05,
          ticks: 200,
          shapes: ['circle']
        });
      } catch (_) {}

      setTimeout(() => {
        resetScrollToTop();
        setContainerFading(true);
        setTimeout(() => {
          unlockAndComplete();
        }, 600);
      }, 1800);
    }
  }, [resetScrollToTop, unlockAndComplete]);

  // Handle scroll delta from mouse wheel or touch swipe
  const handleScrollDelta = useCallback((deltaY) => {
    if (isDismissedRef.current) return;
    const now = Date.now();
    // 700ms throttle to match the slow 1600ms door motion
    if (now - lastScrollTimeRef.current < 700) return;

    if (deltaY > 15) {
      // Scrolling DOWN -> trigger next slow opening step
      lastScrollTimeRef.current = now;
      if (stepRef.current === 0) {
        stepRef.current = 1;
        setStep(1);
        resetScrollToTop();
      } else if (stepRef.current === 1) {
        playSlowOpeningSequence();
      }
    } else if (deltaY < -15) {
      // Scrolling UP (reverse back to exterior)
      lastScrollTimeRef.current = now;
      if (stepRef.current === 1 && !isPlayingRef.current) {
        stepRef.current = 0;
        setStep(0);
        resetScrollToTop();
      }
    }
  }, [playSlowOpeningSequence, resetScrollToTop]);

  // Register window scroll event listeners ONCE on mount
  useEffect(() => {
    // Clear lingering URL anchor hashes that could force auto-scroll
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Disable browser automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Lock body scroll while loader is visible so the background page stays locked at y = 0
    document.body.style.overflow = 'hidden';

    // Pause Lenis and reset scroll position immediately
    resetScrollToTop();
    if (window.lenis && typeof window.lenis.stop === 'function') {
      window.lenis.stop();
      window.lenis.scrollTo(0, { immediate: true });
    }

    // Capture phase listener halts wheel events BEFORE they reach Lenis or background scroll
    const onWheel = (e) => {
      if (isDismissedRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      resetScrollToTop();
      handleScrollDelta(e.deltaY);
    };

    // Prevent touch scrolling of background page while loader is open
    const onTouchMove = (e) => {
      if (isDismissedRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      resetScrollToTop();
    };

    const onTouchStart = (e) => {
      if (isDismissedRef.current) return;
      if (e.touches && e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const onTouchEnd = (e) => {
      if (isDismissedRef.current) return;
      if (e.changedTouches && e.changedTouches.length > 0) {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartYRef.current - touchEndY;
        if (Math.abs(deltaY) > 25) {
          handleScrollDelta(deltaY);
        }
      }
    };

    const onKeyDown = (e) => {
      if (isDismissedRef.current) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        playSlowOpeningSequence();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handleScrollDelta(-40);
      }
    };

    listenersRef.current = {
      wheel: onWheel,
      touchMove: onTouchMove,
      touchStart: onTouchStart,
      touchEnd: onTouchEnd,
      keyDown: onKeyDown,
      attached: true
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
    window.addEventListener('keydown', onKeyDown, { capture: true });

    return () => {
      if (listenersRef.current.attached) {
        listenersRef.current.attached = false;
        window.removeEventListener('wheel', onWheel, { capture: true });
        window.removeEventListener('touchmove', onTouchMove, { capture: true });
        window.removeEventListener('touchstart', onTouchStart, { capture: true });
        window.removeEventListener('touchend', onTouchEnd, { capture: true });
        window.removeEventListener('keydown', onKeyDown, { capture: true });
      }
    };
  }, [handleScrollDelta, playSlowOpeningSequence, resetScrollToTop]);

  if (!shouldRender) return null;

  const exteriorDoorsOpen = step >= 1;
  const receptionDoorsOpen = step >= 2;

  return (
    <div
      role="dialog"
      aria-label="S.S. Convention Grand Cinematic Welcome"
      onClick={playSlowOpeningSequence}
      onTouchMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={`fixed inset-0 z-[99999] overflow-hidden select-none cursor-pointer bg-[#0A0204] transition-opacity duration-800 ease-out ${
        containerFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ========================================================
          SCENE 2: GRAND RECEPTION & LORD GANESHA (16:9 Full Screen)
          Revealed directly as Exterior doors swing open slowly
          ======================================================== */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {/* Reception Double Doors (Swing open into Hero Page on next step) */}
        <DoorPanel
          side="left"
          imageSrc={RECEPTION_IMAGE}
          alt="S.S. Convention Reception Left"
          isOpen={receptionDoorsOpen}
        />
        <DoorPanel
          side="right"
          imageSrc={RECEPTION_IMAGE}
          alt="S.S. Convention Reception Right"
          isOpen={receptionDoorsOpen}
        />

        {/* Ambient Darkening Scrims */}
        <div className="absolute top-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none z-25" />
        <div className="absolute bottom-0 inset-x-0 h-52 sm:h-64 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-25" />

        {/* Scene 2 Typography — A Grand Welcome Awaits */}
        <div
          className={`absolute bottom-16 sm:bottom-20 inset-x-0 text-center pointer-events-none px-4 transition-all duration-1000 ease-out z-30 ${
            step === 1
              ? 'opacity-100 translate-y-0 delay-300'
              : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          <p className="font-serif text-xs sm:text-sm tracking-[0.3em] text-[#FFF6D1]/90 mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            || శ్రీరస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
          </p>
          <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF5] via-[#F4E3BA] to-[#C5A059] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] uppercase leading-tight">
            {lang === 'te' ? 'ఘనమైన స్వాగతం' : 'A GRAND WELCOME AWAITS'}
          </h2>
          <p className="mt-2 font-cinzel text-xs sm:text-sm text-[#E6C687] tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-medium">
            S.S. Convention · Meerpet, Hyderabad
          </p>
        </div>

        {/* Scene 2 Prompt Cue */}
        <div
          className={`absolute bottom-6 sm:bottom-8 inset-x-0 z-30 flex flex-col items-center justify-center pointer-events-none text-amber-300/85 transition-opacity duration-700 ${
            step === 1 && !isPlayingRef.current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-cinzel font-semibold tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            {lang === 'te' ? 'హాల్స్‌లోకి ప్రవేశించడానికి క్లిక్ చేయండి' : 'Click or scroll to enter wedding halls'}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce mt-1 text-amber-300 drop-shadow" />
        </div>
      </div>

      {/* ========================================================
          SCENE 1: BUILDING EXTERIOR AT NIGHT (TOP LAYER)
          First view upon load; click or scroll opens doors slowly into Reception
          ======================================================== */}
      <div
        className={`absolute inset-0 z-30 overflow-hidden pointer-events-none transition-opacity duration-700 ${
          receptionDoorsOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Exterior Double Doors */}
        <DoorPanel
          side="left"
          imageSrc={EXTERIOR_IMAGE}
          alt="S.S. Convention Building Exterior Left"
          isOpen={exteriorDoorsOpen}
        />
        <DoorPanel
          side="right"
          imageSrc={EXTERIOR_IMAGE}
          alt="S.S. Convention Building Exterior Right"
          isOpen={exteriorDoorsOpen}
        />

        {/* Ambient Darkening Scrims */}
        <div className="absolute top-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none z-25" />
        <div className="absolute bottom-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-25" />

        {/* Scene 1 Typography — High in the night sky (Zero overlap with building facade) */}
        <div
          className={`absolute top-16 sm:top-20 md:top-24 inset-x-0 text-center pointer-events-none px-4 transition-all duration-1000 ease-out z-30 ${
            step === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'
          }`}
        >
          <p className="font-serif text-xs sm:text-sm tracking-[0.3em] text-[#FFF6D1]/90 mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            || శ్రీరస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
          </p>
          <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF5] via-[#F4E3BA] to-[#C5A059] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-tight">
            {lang === 'te' ? 'ఎస్.ఎస్. కన్వెన్షన్‌కు స్వాగతం' : 'WELCOME TO S.S. CONVENTION'}
          </h1>
          <p className="mt-2 font-cinzel text-xs sm:text-sm md:text-base text-[#D4AF37] tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-medium">
            {lang === 'te' ? 'ప్రతి శుభకార్యానికి వైభవమైన ప్రారంభం' : 'Where Every Celebration Begins'}
          </p>
        </div>

        {/* Scene 1 Prompt Cue */}
        <div
          className={`absolute bottom-6 sm:bottom-8 inset-x-0 z-35 flex flex-col items-center justify-center pointer-events-none text-amber-300/85 transition-opacity duration-700 ${
            step === 0 && !isPlayingRef.current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-cinzel font-semibold tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            {lang === 'te' ? 'వేదికలోకి ప్రవేశించడానికి క్లిక్ చేయండి' : 'Click or scroll down to open venue'}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce mt-1 text-amber-300 drop-shadow" />
        </div>
      </div>

      {/* ========================================================
          USER CONTROLS: "ENTER VENUE →" ACTION BUTTON
          ======================================================== */}
      <div className="absolute top-6 right-6 z-50">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playSlowOpeningSequence();
          }}
          aria-label="Enter venue"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/80 hover:bg-[#7A1F31] border border-[#D4AF37]/80 text-amber-200 text-xs sm:text-sm font-cinzel font-semibold tracking-wider backdrop-blur-md transition-all shadow-[0_4px_24px_rgba(0,0,0,0.85)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>{lang === 'te' ? 'వేదికలోకి ప్రవేశించండి' : 'Enter Venue'}</span>
          <ArrowRight className="w-4 h-4 text-[#FFDF73]" />
        </button>
      </div>

      {/* Subtle Hint */}
      <div className="absolute bottom-1 inset-x-0 z-40 text-center pointer-events-none">
        <span className="text-[9px] font-cinzel tracking-[0.2em] uppercase text-amber-200/50 drop-shadow">
          {lang === 'te' ? 'వేదిక ప్రారంభానికి ఎక్కడైనా క్లిక్ చేయండి' : 'Click anywhere on venue to begin'}
        </span>
      </div>
    </div>
  );
}
