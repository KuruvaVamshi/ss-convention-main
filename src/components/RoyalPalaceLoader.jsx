import React, { useState, useEffect, useRef } from 'react';

/**
 * RoyalPalaceLoader - Hyper-Realistic 3D Royal Palace Mahadwaram Doors Opening
 * 
 * Refined Experience:
 * - Automatic ceremonial door opening (No "Enter Now" or "Tap to enter" buttons)
 * - Clean parting in 3D perspective directly revealing the pristine Homepage Hero
 * - Zero lingering center animations or middle obstructions
 * - Persisted with sessionStorage so it only opens once per session
 */
export default function RoyalPalaceLoader({ onComplete }) {
  // Check if doors were already opened in this session
  const isAlreadyOpened = typeof window !== 'undefined' && sessionStorage.getItem('ss_doors_opened') === 'true';

  const [phase, setPhase] = useState(isAlreadyOpened ? 'complete' : 'sealed'); // 'sealed' | 'opening' | 'complete'
  const [shouldRender, setShouldRender] = useState(!isAlreadyOpened);
  const hasTriggeredRef = useRef(false);

  const doorImage = '/assets/04_exterior_and_entrance/royal_palace_mahadwaram_doors.jpeg';

  const triggerDoorOpening = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    setPhase('opening');

    // Dismiss cleanly after doors swing open
    setTimeout(() => {
      setPhase('complete');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ss_doors_opened', 'true');
      }
      setTimeout(() => {
        setShouldRender(false);
        onComplete?.();
      }, 400);
    }, 1300);
  };

  useEffect(() => {
    if (isAlreadyOpened) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    // Respect reduced motion accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldRender(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ss_doors_opened', 'true');
      }
      onComplete?.();
      return;
    }

    // Automatic swift door opening: brief 350ms royal pause, then doors swing open
    const openTimer = setTimeout(() => {
      triggerDoorOpening();
    }, 350);

    // Failsafe watchdog timer (2.5s max)
    const watchdogTimer = setTimeout(() => {
      setPhase('complete');
      setShouldRender(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ss_doors_opened', 'true');
      }
      onComplete?.();
    }, 2500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(watchdogTimer);
    };
  }, [isAlreadyOpened, onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-label="Royal Palace Doors Opening"
      onClick={triggerDoorOpening}
      className={`fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-auto transition-opacity duration-500 ease-out ${
        phase === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        perspective: '1800px',
        backgroundColor: phase === 'opening' ? 'transparent' : '#0D0204'
      }}
    >
      {/* ========================================================
          1. LEFT ROYAL PALACE DOOR (Left 50% Slice)
          Swings outward to the left in 3D around the left hinge
          ======================================================== */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full z-20 origin-left will-change-transform shadow-[30px_0_70px_rgba(0,0,0,0.95)]"
        style={{
          transform: phase === 'opening' ? 'rotateY(-90deg)' : 'rotateY(0deg)',
          opacity: phase === 'opening' ? 0.2 : 1,
          transformStyle: 'preserve-3d',
          transition: 'transform 1200ms cubic-bezier(0.25, 1, 0.5, 1), opacity 1100ms ease-out'
        }}
      >
        <div
          className="absolute inset-0 border-r border-[#D4AF37]/60 overflow-hidden"
          style={{
            backgroundImage: `url(${doorImage})`,
            backgroundSize: '200% 100%',
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/50 pointer-events-none" />
        </div>
      </div>

      {/* ========================================================
          2. RIGHT ROYAL PALACE DOOR (Right 50% Slice)
          Swings outward to the right in 3D around the right hinge
          ======================================================== */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full z-20 origin-right will-change-transform shadow-[-30px_0_70px_rgba(0,0,0,0.95)]"
        style={{
          transform: phase === 'opening' ? 'rotateY(90deg)' : 'rotateY(0deg)',
          opacity: phase === 'opening' ? 0.2 : 1,
          transformStyle: 'preserve-3d',
          transition: 'transform 1200ms cubic-bezier(0.25, 1, 0.5, 1), opacity 1100ms ease-out'
        }}
      >
        <div
          className="absolute inset-0 border-l border-[#D4AF37]/60 overflow-hidden"
          style={{
            backgroundImage: `url(${doorImage})`,
            backgroundSize: '200% 100%',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/50 pointer-events-none" />
        </div>
      </div>

      {/* ========================================================
          3. MINIMAL ROYAL PALACE HEADER INSCRIPTION
          Fades out gracefully as the doors part
          ======================================================== */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 flex flex-col items-center pt-6 pointer-events-none transition-all duration-500 ${
          phase === 'opening' ? '-translate-y-8 opacity-0' : 'translate-y-0 opacity-95'
        }`}
      >
        <span className="font-serif text-xs sm:text-sm tracking-[0.35em] text-amber-200 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          || శ్రీ రస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
        </span>
        <h2 className="font-cinzel text-xs sm:text-sm tracking-[0.28em] uppercase text-amber-300 font-bold drop-shadow mt-1">
          S.S CONVENTION · ROYAL MAHADWARAM
        </h2>
      </div>
    </div>
  );
}
