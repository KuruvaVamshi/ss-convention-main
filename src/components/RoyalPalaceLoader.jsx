import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';

/**
 * RoyalPalaceLoader - Hyper-Realistic 3D Royal Palace Mahadwaram Doors Opening
 * 
 * Engineering:
 * - Only mounts on root path '/' and only once per session via sessionStorage.
 * - Complies with Core Motion Standard #2: Never Gate Content (interactive in <1s).
 * - Instant tap-to-open and top-right bypass [ENTER NOW ✦].
 * - Automatically unloads so subsequent navigation never freezes or blocks pages.
 */
export default function RoyalPalaceLoader({ onComplete }) {
  const location = useLocation();

  // Only run on homepage and only if not seen in current session
  const isHomePage = location.pathname === '/';
  const hasSeen = typeof window !== 'undefined' && window.sessionStorage?.getItem('ss_palace_loader_seen') === 'true';

  const [phase, setPhase] = useState('sealed');
  const [shouldRender, setShouldRender] = useState(!hasSeen && isHomePage);
  const hasTriggeredRef = useRef(false);

  const doorImage = '/assets/04_exterior_and_entrance/royal_palace_mahadwaram_doors.jpeg';

  useEffect(() => {
    if (!isHomePage || hasSeen) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    // Accessibility check: Skip for users with reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      try { window.sessionStorage?.setItem('ss_palace_loader_seen', 'true'); } catch (_) {}
      setShouldRender(false);
      onComplete?.();
      return;
    }

    // Swift, majestic auto-timeline (content visible in ~1.2s):
    const timer1 = setTimeout(() => {
      setPhase('unlocking');
    }, 600);

    const timer2 = setTimeout(() => {
      triggerDoorOpening();
    }, 1300);

    // Hard fallback watchdog
    const watchdogTimer = setTimeout(() => {
      try { window.sessionStorage?.setItem('ss_palace_loader_seen', 'true'); } catch (_) {}
      setPhase('complete');
      setShouldRender(false);
      onComplete?.();
    }, 3800);

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
  }, [isHomePage, hasSeen, onComplete]);

  const triggerDoorOpening = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    try { window.sessionStorage?.setItem('ss_palace_loader_seen', 'true'); } catch (_) {}

    setPhase('opening');

    // Shower of auspicious golden wedding blessing petals as royal doors part
    try {
      confetti({
        particleCount: 70,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#FFDF73', '#D4AF37', '#FFF9E6', '#FFD700', '#E63946'],
        gravity: 0.45,
        scalar: 1.1,
        ticks: 200,
        shapes: ['circle']
      });
    } catch {
      // Ignore
    }

    // Dismiss smoothly after swing
    setTimeout(() => {
      setPhase('complete');
      setTimeout(() => {
        setShouldRender(false);
        onComplete?.();
      }, 500);
    }, 1800);
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
      className={`fixed inset-0 z-[99999] overflow-hidden select-none cursor-pointer ${
        phase === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        perspective: '1800px',
        transition: 'opacity 720ms ease-out'
      }}
      title="Click anywhere to enter SS Convention"
    >
      {/* ========================================================
          1. VOLUMETRIC SUNBEAMS POURING THROUGH THE PARTING DOORS
          Reveals the Live Homepage Hero Section Directly Underneath
          ======================================================== */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
          phase === 'opening' ? 'opacity-75' : phase === 'unlocking' ? 'opacity-40' : 'opacity-0'
        }`}
        style={{
          transition: 'opacity 1080ms ease-out'
        }}
      >
        <div className="w-[850px] h-[850px] rounded-full bg-gradient-to-r from-amber-300/30 via-white/40 to-amber-400/30 blur-3xl animate-pulse" />
      </div>

      {/* ========================================================
          2. LEFT ROYAL PALACE DOOR (Photorealistic Left 50% Slice)
          Swings open outward to the left in 3D around left hinge
          Majestic 2.88s swing (10% faster calibration)
          ======================================================== */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full z-20 origin-left will-change-transform shadow-[30px_0_70px_rgba(0,0,0,0.95)]"
        style={{
          transform: phase === 'opening' ? 'rotateY(-85deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
          transition: 'transform 2880ms cubic-bezier(0.4, 0, 0.25, 1)'
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
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 pointer-events-none transition-opacity duration-1000 ${
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
          Majestic 2.88s unhurried swing (10% faster calibration)
          ======================================================== */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full z-20 origin-right will-change-transform shadow-[-30px_0_70px_rgba(0,0,0,0.95)]"
        style={{
          transform: phase === 'opening' ? 'rotateY(85deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
          transition: 'transform 2880ms cubic-bezier(0.4, 0, 0.25, 1)'
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
            className={`absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/60 pointer-events-none transition-opacity duration-1000 ${
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
        className={`absolute inset-0 flex items-center justify-center pointer-events-none z-30 ${
          phase === 'opening'
            ? 'scale-150 opacity-0'
            : phase === 'unlocking'
            ? 'scale-110 opacity-100'
            : 'scale-100 opacity-100'
        }`}
        style={{
          transition: 'all 900ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
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
          try { window.sessionStorage?.setItem('ss_palace_loader_seen', 'true'); } catch (_) {}
          setPhase('complete');
          setShouldRender(false);
          onComplete?.();
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
