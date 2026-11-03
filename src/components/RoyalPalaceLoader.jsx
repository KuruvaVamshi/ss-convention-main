import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Crown, ArrowRight } from 'lucide-react';

/**
 * RoyalPalaceLoader - Grand Mahadwaram Palace Entrance Experience
 * S.S Convention Luxury Wedding & Banquet Halls
 * 
 * Features:
 * - First-load only experience (tracked via sessionStorage)
 * - Deep Royal Velvet Maroon split palace curtains/doors (#450B17 to #2B050C)
 * - 24K Royal Gold filigree crest emblem with sacred Telugu blessing
 * - Smooth luxury progress counter 0% -> 100% (1.1s duration budget)
 * - Split-curtain grand palace gate reveal (sliding open left & right)
 * - Subtle celebratory gold & champagne blessing petals as gates part
 * - Accessible skip button & universal prefers-reduced-motion fallback
 */
export default function RoyalPalaceLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'opening' | 'complete'
  const [shouldRender, setShouldRender] = useState(true);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // 1. Accessibility Check: Skip for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    // 2. Session Check: Only display on fresh session / first visit
    const alreadySeen = sessionStorage.getItem('ss_palace_loader_shown');
    if (alreadySeen === 'true') {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    // 3. Smooth Non-Linear Progress Engine (0 to 100 in ~1150ms)
    const startTime = performance.now();
    const duration = 1150; // Milliseconds

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic curve
      const easedProgress = Math.floor(100 * (1 - Math.pow(1 - t, 3)));
      setProgress(easedProgress);

      if (t < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        handleGateOpening();
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  const handleGateOpening = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // Transition to 'opening' phase (doors slide open)
    setPhase('opening');

    // Mark as seen for this session
    sessionStorage.setItem('ss_palace_loader_shown', 'true');

    // Trigger subtle golden wedding blessing shower
    try {
      confetti({
        particleCount: 28,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#D4AF37', '#FFDF73', '#FFFFFF', '#F59E0B', '#FFF9E6'],
        ticks: 120,
        gravity: 0.7,
        scalar: 0.9,
        shapes: ['circle']
      });
    } catch {
      // Ignore if canvas-confetti is not available
    }

    // Complete transition and remove loader from DOM after doors slide open (750ms)
    setTimeout(() => {
      setPhase('complete');
      setShouldRender(false);
      onComplete?.();
    }, 750);
  };

  const handleSkip = () => {
    handleGateOpening();
  };

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden select-none"
    >
      {/* ========================================================
          LEFT PALACE CURTAIN / GATE (Slides Left on Complete)
          ======================================================== */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#4D0D19] via-[#3A0813] to-[#24050B] border-r border-[#D4AF37]/40 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform ${
          phase === 'opening' || phase === 'complete'
            ? '-translate-x-full'
            : 'translate-x-0'
        }`}
      >
        {/* Ornate Gold Damask Lace on Gate Edge */}
        <div className="absolute top-0 right-0 w-12 h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_right,_rgba(212,175,55,0.8)_0,_transparent_70%)]" />
        
        {/* Vertical Royal Gold Seam Line */}
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
      </div>

      {/* ========================================================
          RIGHT PALACE CURTAIN / GATE (Slides Right on Complete)
          ======================================================== */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#4D0D19] via-[#3A0813] to-[#24050B] border-l border-[#D4AF37]/40 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform ${
          phase === 'opening' || phase === 'complete'
            ? 'translate-x-full'
            : 'translate-x-0'
        }`}
      >
        {/* Ornate Gold Damask Lace on Gate Edge */}
        <div className="absolute top-0 left-0 w-12 h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_left,_rgba(212,175,55,0.8)_0,_transparent_70%)]" />

        {/* Vertical Royal Gold Seam Line */}
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
      </div>

      {/* ========================================================
          CENTERPIECE: ROYAL GOLD CREST, TELUGU BLESSING & COUNTER
          ======================================================== */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 transition-all duration-400 will-change-transform ${
          phase === 'opening' || phase === 'complete'
            ? 'opacity-0 scale-95 pointer-events-none'
            : 'opacity-100 scale-100'
        }`}
      >
        {/* Ambient Diya Halo Glow */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-amber-400/15 via-[#7A1F31]/30 to-amber-500/15 blur-3xl pointer-events-none" />

        {/* Sacred Sanskrit & Telugu Ribbon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/50 text-amber-200 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>శుభం భవతు • కల్యాణ వైభోగమే</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        {/* The Royal Gold Crest Emblem */}
        <div className="relative mb-5 group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#D4AF37]/80 p-1 shadow-[0_0_35px_rgba(212,175,55,0.45)] bg-gradient-to-br from-[#5F1524] via-[#350710] to-[#24050B] flex items-center justify-center relative overflow-hidden">
            <img
              src="/assets/01_brand_and_logos/ss_convention_royal_gold_crest_emblem.jpeg"
              alt="S.S Convention Royal Crest"
              className="w-full h-full object-cover rounded-full filter drop-shadow-md"
            />
            {/* Shimmer Light Flare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>

          {/* Golden Crown Badge */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#350710] border border-[#D4AF37] flex items-center justify-center shadow-lg">
            <Crown className="w-3.5 h-3.5 text-amber-300" />
          </div>
        </div>

        {/* Majestic Typography */}
        <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold tracking-[0.2em] text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-2">
          S.S CONVENTION <span className="text-amber-400">A/C</span>
        </h1>
        <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-200/90 font-light mb-8 max-w-md">
          Luxury Wedding & Banquet Halls • Hyderabad
        </p>

        {/* High-Fashion Slim Golden Progress Bar */}
        <div className="w-48 sm:w-64 h-[3px] bg-black/60 rounded-full overflow-hidden border border-[#D4AF37]/40 relative mb-4 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_#D4AF37]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage & Status */}
        <div className="flex items-center justify-between w-48 sm:w-64 text-[10px] sm:text-xs font-cinzel font-semibold tracking-wider text-amber-200/80">
          <span className="uppercase text-[9px] text-amber-300/70">మహాద్వార ప్రవేశం</span>
          <span className="font-mono text-white text-xs">{progress}%</span>
        </div>
      </div>

      {/* ========================================================
          FAST SKIP ACCESS PILL (Top Right Corner)
          ======================================================== */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/70 border border-amber-300/40 hover:border-amber-400 text-amber-200/80 hover:text-white text-[11px] font-cinzel tracking-wider uppercase backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg group"
        title="Skip Entrance and Enter Hall"
      >
        <span>ప్రవేశించు</span>
        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-amber-400" />
      </button>
    </div>
  );
}
