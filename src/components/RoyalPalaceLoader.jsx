import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/**
 * RoyalPalaceLoader - Hyper-Realistic 3D Royal Palace Mahadwaram Doors Opening
 * 
 * Refined Experience:
 * - Warm, regal, auspicious traditional greeting (Namaste / Swagatham)
 * - Automatic ceremonial door opening (No "Enter Now" or "Tap to enter" buttons)
 * - Greeting gracefully dissolves as the doors swing open, leaving the homepage hero 100% clean
 * - Swift unmounting from the DOM with zero lingering center obstructions
 */
export default function RoyalPalaceLoader({ onComplete }) {
  // 'sealed' -> 'opening' -> 'complete'
  const [phase, setPhase] = useState('sealed');
  const [shouldRender, setShouldRender] = useState(true);
  const hasTriggeredRef = useRef(false);

  const doorImage = '/assets/04_exterior_and_entrance/royal_palace_mahadwaram_doors.jpeg';

  const triggerDoorOpening = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    setPhase('opening');

    // Shower of auspicious golden flower petals as doors part
    try {
      confetti({
        particleCount: 55,
        spread: 110,
        origin: { y: 0.35 },
        colors: ['#FFDF73', '#D4AF37', '#FFF9E6', '#FFD700', '#E63946'],
        gravity: 0.5,
        scalar: 1.05,
        ticks: 200,
        shapes: ['circle']
      });
    } catch {
      // Ignore if canvas-confetti is unavailable
    }

    // Dismiss cleanly as doors finish opening
    setTimeout(() => {
      setPhase('complete');
      setTimeout(() => {
        setShouldRender(false);
        onComplete?.();
      }, 600);
    }, 2800);
  };

  useEffect(() => {
    hasTriggeredRef.current = false;
    setPhase('sealed');
    setShouldRender(true);

    // Respect reduced motion accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    // Automatic Regal Welcome Timeline:
    // 0.0s - 1.2s: Royal greeting & palace doors stand with auspicious blessing
    // 1.2s+: Greeting dissolves and doors smoothly swing open in 3D perspective
    const openTimer = setTimeout(() => {
      triggerDoorOpening();
    }, 1200);

    // Failsafe watchdog timer (6s max)
    const watchdogTimer = setTimeout(() => {
      setPhase('complete');
      setShouldRender(false);
      onComplete?.();
    }, 6000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(watchdogTimer);
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-label="S.S. Convention Royal Palace Mahadwaram Doors Opening"
      onClick={triggerDoorOpening}
      className={`fixed inset-0 z-[99999] overflow-hidden select-none cursor-pointer transition-opacity duration-[600ms] ease-out ${
        phase === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        perspective: '1800px',
        backgroundColor: phase === 'opening' ? 'transparent' : '#0D0204'
      }}
    >
      {/* ========================================================
          1. LEFT ROYAL PALACE DOOR (Photorealistic Left 50% Slice)
          Swings outward to the left in 3D around the left hinge
          ======================================================== */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full z-20 origin-left will-change-transform shadow-[30px_0_70px_rgba(0,0,0,0.95)]"
        style={{
          transform: phase === 'opening' ? 'rotateY(-92deg)' : 'rotateY(0deg)',
          opacity: phase === 'opening' ? 0.05 : 1,
          transformStyle: 'preserve-3d',
          transition: 'transform 2800ms cubic-bezier(0.45, 0.05, 0.25, 1), opacity 1200ms ease-in 1600ms'
        }}
      >
        <div
          className="absolute inset-0 border-r-2 border-[#D4AF37]/80 overflow-hidden"
          style={{
            backgroundImage: `url(${doorImage})`,
            backgroundSize: '200% 100%',
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Depth Shading */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          
          {/* Golden Vertical Light Edge along meeting stile */}
          <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#FFE57F] to-transparent shadow-[0_0_15px_#FFE57F]" />
        </div>
      </div>

      {/* ========================================================
          2. RIGHT ROYAL PALACE DOOR (Photorealistic Right 50% Slice)
          Swings outward to the right in 3D around the right hinge
          ======================================================== */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full z-20 origin-right will-change-transform shadow-[-30px_0_70px_rgba(0,0,0,0.95)]"
        style={{
          transform: phase === 'opening' ? 'rotateY(92deg)' : 'rotateY(0deg)',
          opacity: phase === 'opening' ? 0.05 : 1,
          transformStyle: 'preserve-3d',
          transition: 'transform 2800ms cubic-bezier(0.45, 0.05, 0.25, 1), opacity 1200ms ease-in 1600ms'
        }}
      >
        <div
          className="absolute inset-0 border-l-2 border-[#D4AF37]/80 overflow-hidden"
          style={{
            backgroundImage: `url(${doorImage})`,
            backgroundSize: '200% 100%',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Depth Shading */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/50 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          
          {/* Golden Vertical Light Edge along meeting stile */}
          <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#FFE57F] to-transparent shadow-[0_0_15px_#FFE57F]" />
        </div>
      </div>

      {/* ========================================================
          3. REGAL AUSPICIOUS GREETING (Dissolves Cleanly as Doors Open)
          Warm traditional greeting welcoming every royal guest
          ======================================================== */}
      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center px-4 pointer-events-none transition-all duration-[700ms] ease-out ${
          phase === 'opening'
            ? 'scale-105 opacity-0'
            : 'scale-100 opacity-100'
        }`}
      >
        {/* Floating Greeting Backdrop Plaque */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-black/75 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_0_60px_rgba(0,0,0,0.85)] max-w-md mx-auto">
          
          {/* Auspicious Vedic Shloka Header */}
          <span className="font-serif text-xs sm:text-sm tracking-[0.3em] text-amber-200 uppercase drop-shadow block mb-2">
            || శ్రీ రస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
          </span>

          {/* Traditional Telugu & English Greeting */}
          <span className="font-cinzel text-xs font-bold tracking-[0.28em] text-amber-300 uppercase block mb-1">
            నమస్కారం · NAMASTE
          </span>

          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.14em] text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mb-2">
            WELCOME TO S.S. CONVENTION
          </h1>

          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFE57F] to-transparent my-2" />

          <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.22em] text-amber-100/90 uppercase font-light">
            Royal Wedding & Banquet Palace · Meerpet, Hyderabad
          </p>

          <span className="text-[10px] text-amber-300/80 tracking-widest uppercase mt-3 font-mono">
            ✦ An Auspicious Celebration Awaits ✦
          </span>
        </div>
      </div>

      {/* ========================================================
          4. TOP INVOCATION HEADER
          ======================================================== */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 flex flex-col items-center pt-6 pointer-events-none transition-all duration-[700ms] ${
          phase === 'opening' ? '-translate-y-6 opacity-0' : 'translate-y-0 opacity-80'
        }`}
      >
        <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-amber-200 drop-shadow">
          THE ROYAL MAHADWARAM
        </span>
      </div>
    </div>
  );
}
