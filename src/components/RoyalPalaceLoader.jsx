import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/**
 * RoyalPalaceLoader - Hyper-Realistic 3D Royal Palace Mahadwaram Doors Opening
 * 
 * Perfected Experience:
 * - Plays automatically on initial load & refresh with cinematic royal timing
 * - NO "Enter Now", NO "Open Now", NO "Tap to Enter" buttons
 * - NO artificial black circle or lingering center obstruction
 * - Clean 3D door swing that parts seamlessly directly into the homepage hero
 * - Unmounts completely from the DOM as soon as doors open
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
        particleCount: 50,
        spread: 100,
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
      }, 500);
    }, 2000);
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

    // Automatic Regal Timeline:
    // 0.0s - 0.7s: Palace doors stand majestically sealed
    // 0.7s+: Doors smoothly swing open outward in 3D perspective
    const openTimer = setTimeout(() => {
      triggerDoorOpening();
    }, 700);

    // Failsafe watchdog timer (3.5s max)
    const watchdogTimer = setTimeout(() => {
      setPhase('complete');
      setShouldRender(false);
      onComplete?.();
    }, 3500);

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
      className={`fixed inset-0 z-[99999] overflow-hidden select-none cursor-pointer transition-opacity duration-600 ease-out ${
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
          opacity: phase === 'opening' ? 0 : 1,
          transformStyle: 'preserve-3d',
          transition: 'transform 2000ms cubic-bezier(0.25, 1, 0.5, 1), opacity 1800ms ease-out'
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
          opacity: phase === 'opening' ? 0 : 1,
          transformStyle: 'preserve-3d',
          transition: 'transform 2000ms cubic-bezier(0.25, 1, 0.5, 1), opacity 1800ms ease-out'
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
          3. ROYAL PALACE TOP INSCRIPTION
          Fades out gracefully as the doors swing open
          ======================================================== */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 flex flex-col items-center pt-6 sm:pt-8 pointer-events-none transition-all duration-700 ${
          phase === 'opening' ? '-translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <span className="font-serif text-xs sm:text-sm tracking-[0.35em] text-amber-200 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          || శ్రీ రస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
        </span>
        <h2 className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-300 font-bold drop-shadow mt-1">
          THE ROYAL MAHADWARAM OF S.S CONVENTION
        </h2>
      </div>

      {/* ========================================================
          4. BOTTOM SUBTITLE
          Fades out gracefully as doors open
          ======================================================== */}
      <div
        className={`absolute bottom-6 left-0 right-0 z-30 text-center pointer-events-none transition-all duration-700 ${
          phase === 'opening' ? 'translate-y-6 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.3em] uppercase text-amber-200/90 font-light drop-shadow">
          MEERPET, HYDERABAD • ROYAL WEDDING & BANQUET PALACE
        </p>
      </div>
    </div>
  );
}
