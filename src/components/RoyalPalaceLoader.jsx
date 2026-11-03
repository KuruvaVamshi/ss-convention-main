import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/**
 * RoyalPalaceLoader - Hyper-Realistic 3D Royal Palace Mahadwaram Doors Opening
 * 
 * Engineering:
 * - Uses 8K photorealistic architectural photograph of authentic Royal Palace Mahadwaram Doors
 * - Left Door: Left 50% slice of photorealistic carved Indian teakwood & antique brass door
 * - Right Door: Right 50% slice of photorealistic carved Indian teakwood & antique brass door
 * - Center Seam: Sealed with golden lion/swan royal crest & volumetric crepuscular light beam
 * - 3D Perspective Swing: Heavy double doors swing outward in 3D (rotateY -84deg & +84deg)
 * - BEHIND THE DOORS: Actual illuminated interior of SS Convention Hall with crystal chandeliers
 * - Golden blessing flower petals cascade through the opening
 * - Triggers on every load, with instant tap-to-open and top-right bypass [ENTER PALACE ✦]
 */
export default function RoyalPalaceLoader({ onComplete }) {
  // 'sealed' -> 'unlocking' -> 'opening' -> 'complete'
  const [phase, setPhase] = useState('sealed');
  const [shouldRender, setShouldRender] = useState(true);
  const hasTriggeredRef = useRef(false);

  const doorImage = '/assets/04_exterior_and_entrance/royal_palace_mahadwaram_doors.jpeg';

  useEffect(() => {
    // Reset trigger flag on mount so it plays on every load
    hasTriggeredRef.current = false;
    setPhase('sealed');

    // Accessibility check: Skip for users with reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    // Majestic Royal Palace Door Timeline (~2.0 seconds total):
    // 0.0s - 0.35s: Doors closed, golden ray intensifies along the central meeting seam
    // 0.35s - 0.85s: Royal gold crest seal unclasps with radiant volumetric lens flare
    // 0.85s - 1.95s: Heavy teakwood double doors swing wide open in 3D perspective
    const timer1 = setTimeout(() => {
      setPhase('unlocking');
    }, 350);

    const timer2 = setTimeout(() => {
      triggerDoorOpening();
    }, 850);

    // Guaranteed hard watchdog fallback (never get stuck under any circumstances)
    const watchdogTimer = setTimeout(() => {
      triggerDoorOpening();
      setPhase('complete');
      setShouldRender(false);
      onComplete?.();
    }, 2200);

    // If tab was backgrounded or inactive, immediately dismiss on return
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        triggerDoorOpening();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(watchdogTimer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [onComplete]);

  const triggerDoorOpening = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    setPhase('opening');

    // Shower of auspicious golden wedding blessing petals as the royal doors part
    try {
      confetti({
        particleCount: 50,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#FFDF73', '#D4AF37', '#FFF9E6', '#FFD700', '#E63946'],
        gravity: 0.65,
        scalar: 1.05,
        ticks: 140,
        shapes: ['circle']
      });
    } catch {
      // Ignore
    }

    // Dismiss after doors swing fully open (1100ms)
    setTimeout(() => {
      setPhase('complete');
      setShouldRender(false);
      onComplete?.();
    }, 1100);
  };

  const handleInstantOpen = () => {
    triggerDoorOpening();
  };

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={handleInstantOpen}
      className={`fixed inset-0 z-[99999] overflow-hidden select-none cursor-pointer transition-opacity duration-600 bg-black ${
        phase === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ perspective: '1800px' }}
      title="Click anywhere to enter SS Convention"
    >
      {/* ========================================================
          1. REAL VENUE REVEAL BEHIND THE DOORS
          (Actual SS Convention Hall Interior with Chandeliers)
          ======================================================== */}
      <div className="absolute inset-0 bg-black overflow-hidden pointer-events-none">
        <img
          src="/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg"
          alt="SS Convention Grand Hall Interior"
          className={`w-full h-full object-cover object-center filter brightness-105 transition-transform duration-1000 ease-out ${
            phase === 'opening' ? 'scale-100' : 'scale-110'
          }`}
        />
        {/* Warm Golden Haze over venue interior */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#450B17]/65 via-transparent to-black/45" />

        {/* Volumetric Sunbeams / God-Rays pouring through the opening doors */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            phase === 'opening' ? 'opacity-95' : phase === 'unlocking' ? 'opacity-70' : 'opacity-10'
          }`}
        >
          <div className="w-[850px] h-[850px] rounded-full bg-gradient-to-r from-amber-300/35 via-white/45 to-amber-400/35 blur-3xl animate-pulse" />
        </div>
      </div>

      {/* ========================================================
          2. LEFT ROYAL PALACE DOOR (Photorealistic Left 50% Slice)
          Swings open outward to the left in 3D around left hinge
          ======================================================== */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full z-20 origin-left transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform shadow-[30px_0_70px_rgba(0,0,0,0.95)]"
        style={{
          transform: phase === 'opening' ? 'rotateY(-84deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Photorealistic Left Half of Royal Doors */}
        <div
          className="absolute inset-0 border-r-2 border-[#D4AF37] overflow-hidden"
          style={{
            backgroundImage: `url(${doorImage})`,
            backgroundSize: '200% 100%',
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Depth Shading & Dynamic Lighting Falloff */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 pointer-events-none transition-opacity duration-700 ${
              phase === 'opening' ? 'opacity-80' : 'opacity-30'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

          {/* Golden Vertical Light Edge along meeting stile */}
          <div className="absolute top-0 right-0 w-[2.5px] h-full bg-gradient-to-b from-transparent via-[#FFE57F] to-transparent shadow-[0_0_18px_#FFE57F]" />
        </div>
      </div>

      {/* ========================================================
          3. RIGHT ROYAL PALACE DOOR (Photorealistic Right 50% Slice)
          Swings open outward to the right in 3D around right hinge
          ======================================================== */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full z-20 origin-right transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform shadow-[-30px_0_70px_rgba(0,0,0,0.95)]"
        style={{
          transform: phase === 'opening' ? 'rotateY(84deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Photorealistic Right Half of Royal Doors */}
        <div
          className="absolute inset-0 border-l-2 border-[#D4AF37] overflow-hidden"
          style={{
            backgroundImage: `url(${doorImage})`,
            backgroundSize: '200% 100%',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Depth Shading & Dynamic Lighting Falloff */}
          <div
            className={`absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/60 pointer-events-none transition-opacity duration-700 ${
              phase === 'opening' ? 'opacity-80' : 'opacity-30'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

          {/* Golden Vertical Light Edge along meeting stile */}
          <div className="absolute top-0 left-0 w-[2.5px] h-full bg-gradient-to-b from-transparent via-[#FFE57F] to-transparent shadow-[0_0_18px_#FFE57F]" />
        </div>
      </div>

      {/* ========================================================
          4. CENTRAL GOLDEN ROYAL SEAL & UNLOCKING LIGHT BURST
          ======================================================== */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none z-30 transition-all duration-700 ${
          phase === 'opening'
            ? 'scale-150 opacity-0'
            : phase === 'unlocking'
            ? 'scale-110 opacity-100'
            : 'scale-100 opacity-100'
        }`}
      >
        {/* Intense Vertical Seam Light Flare */}
        <div
          className={`absolute w-1.5 h-full bg-gradient-to-b from-transparent via-white to-transparent transition-all duration-500 shadow-[0_0_35px_#FFE57F] ${
            phase === 'unlocking' ? 'opacity-100 scale-y-100' : 'opacity-60 scale-y-85'
          }`}
        />

        {/* Center Royal Gold Medallion Lock */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-tr from-[#996515] via-[#FFF4BD] to-[#B38728] shadow-[0_0_70px_rgba(255,223,115,0.9)] flex items-center justify-center border-2 border-[#FFE57F]">
            <div className="w-full h-full rounded-full overflow-hidden bg-black/95 p-1 flex items-center justify-center shadow-2xl">
              <img
                src="/assets/01_brand_and_logos/ss_convention_royal_gold_crest_emblem.jpeg"
                alt="SS Convention Royal Seal"
                className="w-full h-full object-cover rounded-full filter brightness-110"
              />
            </div>

            {/* Glowing Golden Ring Pulse */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-amber-300 transition-all duration-700 ${
                phase === 'unlocking' ? 'scale-125 opacity-100 animate-ping' : 'opacity-0'
              }`}
            />
          </div>

          {/* Interactive Tap Prompt */}
          <div className="mt-4 px-4 py-1.5 rounded-full bg-black/85 border border-[#D4AF37]/70 backdrop-blur-md shadow-2xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.25em] text-amber-200 uppercase">
              {phase === 'unlocking' ? 'OPENING PALACE DOORS...' : 'TAP TO ENTER PALACE'}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          PALACE HEADER INSCRIPTION
          ======================================================== */}
      <div
        className={`absolute top-0 left-0 right-0 z-40 flex flex-col items-center pt-5 sm:pt-7 pointer-events-none transition-all duration-700 ${
          phase === 'opening' ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <span className="font-serif text-xs sm:text-sm tracking-[0.35em] text-amber-200 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          || శ్రీ రస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
        </span>
        <h2 className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-400 font-bold drop-shadow mt-1">
          THE ROYAL MAHADWARAM OF S.S CONVENTION
        </h2>
      </div>

      {/* ========================================================
          TOP-RIGHT LUXURY BYPASS BUTTON
          ======================================================== */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleInstantOpen();
        }}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-50 px-5 py-2 rounded-full bg-black/75 border border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:text-[#3D0A14] text-amber-300 font-cinzel text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer flex items-center gap-2 group"
      >
        <span>ENTER NOW</span>
        <span className="text-amber-400 group-hover:text-[#3D0A14] group-hover:translate-x-1 transition-transform">✦</span>
      </button>

      {/* ========================================================
          BOTTOM SUBTITLE
          ======================================================== */}
      <div
        className={`absolute bottom-6 left-0 right-0 z-40 text-center pointer-events-none transition-all duration-700 ${
          phase === 'opening' ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-300 font-light drop-shadow">
          MEERPET, HYDERABAD • ROYAL WEDDING & BANQUET PALACE
        </p>
      </div>
    </div>
  );
}
