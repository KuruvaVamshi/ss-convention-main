import React, { useEffect, useRef, useState } from 'react';

/**
 * RoyalCursor - Luxury Joystick Ring & Dazzling Sparkles Cursor
 * S.S Convention Luxury Wedding & Banquet Halls Signature Cursor
 * 
 * Bulletproof Architecture:
 * 1. Outer Circle Ring ("cirecle"):
 *    - 24K imperial gold ring with 4 cardinal dial ticks & ambient glow
 *    - Trails behind mouse with smooth spring inertia
 * 2. Middle Joystick Dot ("middl joystict kind of dot"):
 *    - Sits inside the circle and dynamically tilts/deflects in the direction of movement
 *    - Real analog thumbstick gimbal physics with spring centering
 *    - 24K gold sphere with white-hot diamond specular highlight
 * 3. While Moving Sparkles ("while moving, sparkles should come"):
 *    - Continuous stream of radiant 4-point diamond stars (✦), 8-point bursts & golden stardust
 *    - High-visibility canvas shadow glow, rotation, and buoyant upward drift
 *    - Lingers gracefully for 1.4 - 1.8 seconds with harmonic cosine twinkling
 * 4. Celebratory Wedding Firework on Click:
 *    - Dual golden shockwave rings + 36-star radial firework explosion
 * 5. Dynamic Contextual Hover Reactions (Buttons, Videos, Lightboxes)
 */
export default function RoyalCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Mouse Target Position
  const mousePos = useRef({ x: -400, y: -400 });
  const magneticTarget = useRef(null);

  // Outer Ring Physics (Fluid Trailing Lag)
  const ringPos = useRef({ x: -400, y: -400, vx: 0, vy: 0 });

  // Middle Joystick Dot Physics (Dynamic Joystick Tilt)
  const joyPos = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  // Ambient Diya Warm Glow Pos
  const glowPos = useRef({ x: -400, y: -400 });

  // Sparkles & Shockwaves
  const sparklesRef = useRef([]);
  const ripplesRef = useRef([]);
  const idleCounter = useRef(0);

  const lastTimeRef = useRef(performance.now());
  const rafId = useRef(null);

  // DOM Refs
  const ringWrapperRef = useRef(null);
  const joystickDotRef = useRef(null);
  const gimbalLineRef = useRef(null);
  const glowWrapperRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Mount only on desktop fine-pointer devices
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setMounted(true);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        ringPos.current = { x: e.clientX, y: e.clientY, vx: 0, vy: 0 };
        joyPos.current = { x: 0, y: 0, vx: 0, vy: 0 };
        glowPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);

      const originX = ringPos.current.x + joyPos.current.x;
      const originY = ringPos.current.y + joyPos.current.y;

      // 1. Dual Concentric Golden Diamond Shockwave Rings
      ripplesRef.current.push({
        x: originX,
        y: originY,
        radius: 6,
        maxRadius: 75,
        opacity: 1.0,
        lineWidth: 2.5,
        color: '255, 223, 115'
      });
      ripplesRef.current.push({
        x: originX,
        y: originY,
        radius: 4,
        maxRadius: 52,
        opacity: 0.9,
        lineWidth: 1.8,
        color: '255, 255, 255'
      });

      // 2. Celebratory Wedding Firework Radial Diamond Starburst (36 sparkles)
      const count = 36;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
        const speed = Math.random() * 6.2 + 3.0;
        sparklesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 9.5 + 5.0,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.28,
          phase: Math.random() * Math.PI * 2,
          life: 1.0,
          decay: Math.random() * 0.014 + 0.009,
          type: Math.random() > 0.3 ? 'diamond_star' : 'burst',
          color: Math.random() > 0.4 ? '#FFDF73' : (Math.random() > 0.5 ? '#FFF9E6' : '#FFFFFF')
        });
      }
    };

    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      magneticTarget.current = null;
    };
    const handleMouseEnter = () => setIsVisible(true);

    // Interactive Hover Context Detector
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // 1. Sliders & Draggables
      if (target.closest('input[type="range"], .swiper, .cursor-grab, [data-cursor="drag"]')) {
        setCursorState('drag');
        magneticTarget.current = null;
        return;
      }

      // 2. Video triggers
      if (target.closest('video, [data-cursor="play"], .video-trigger')) {
        setCursorState('play');
        magneticTarget.current = null;
        return;
      }

      // 3. Images, gallery cards, lightboxes
      if (
        target.closest('[data-cursor="view"], .group[onClick], [onClick], img') &&
        !target.closest('button, a, input, select')
      ) {
        setCursorState('view');
        magneticTarget.current = null;
        return;
      }

      // 4. Interactive Buttons, links, CTAs with magnetic snap
      const interactiveEl = target.closest('button, a, [role="button"], input[type="submit"], input[type="button"]');
      if (interactiveEl) {
        setCursorState('button');
        const rect = interactiveEl.getBoundingClientRect();
        if (rect.width < 340 && rect.height < 140) {
          magneticTarget.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };
        } else {
          magneticTarget.current = null;
        }
        return;
      }

      // 5. Text inputs
      if (target.closest('input[type="text"], input[type="email"], input[type="tel"], textarea')) {
        setCursorState('text');
        magneticTarget.current = null;
        return;
      }

      setCursorState('default');
      magneticTarget.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Sync canvas resolution
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // ========================================================
    // 120fps FLUID JOYSTICK & CONTINUOUS SPARKLE LOOP
    // ========================================================
    const render = (currentTime) => {
      if (document.hidden) {
        lastTimeRef.current = currentTime;
        rafId.current = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = currentTime;

      const ring = ringPos.current;
      const joy = joyPos.current;

      // 1. OUTER RING SPRING PHYSICS
      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;

      if (magneticTarget.current) {
        targetX = magneticTarget.current.x * 0.8 + mousePos.current.x * 0.2;
        targetY = magneticTarget.current.y * 0.8 + mousePos.current.y * 0.2;
      }

      const ringStiffness = magneticTarget.current ? 320 : 190;
      const ringDamping = magneticTarget.current ? 26 : 17;

      const ax = (targetX - ring.x) * ringStiffness - ring.vx * ringDamping;
      const ay = (targetY - ring.y) * ringStiffness - ring.vy * ringDamping;

      ring.vx += ax * dt;
      ring.vy += ay * dt;
      ring.x += ring.vx * dt;
      ring.y += ring.vy * dt;

      const ringSpeed = Math.hypot(ring.vx, ring.vy);

      // 2. MIDDLE JOYSTICK DOT PHYSICS (Analog Thumbstick Dynamic Tilt)
      const deltaX = targetX - ring.x;
      const deltaY = targetY - ring.y;
      const dist = Math.hypot(deltaX, deltaY);

      const MAX_JOYSTICK_RADIUS = 13.5;
      let targetJoyX = 0;
      let targetJoyY = 0;

      if (dist > 0.5) {
        const clampedThrow = Math.min(dist * 0.42, MAX_JOYSTICK_RADIUS);
        targetJoyX = (deltaX / dist) * clampedThrow;
        targetJoyY = (deltaY / dist) * clampedThrow;
      }

      const joyStiffness = 300;
      const joyDamping = 20;
      const joyAx = (targetJoyX - joy.x) * joyStiffness - joy.vx * joyDamping;
      const joyAy = (targetJoyY - joy.y) * joyStiffness - joy.vy * joyDamping;

      joy.vx += joyAx * dt;
      joy.vy += joyAy * dt;
      joy.x += joy.vx * dt;
      joy.y += joy.vy * dt;

      // Update DOM Positions
      if (ringWrapperRef.current) {
        ringWrapperRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      if (joystickDotRef.current) {
        joystickDotRef.current.style.transform = `translate3d(${joy.x}px, ${joy.y}px, 0)`;
      }

      if (gimbalLineRef.current) {
        const joyDist = Math.hypot(joy.x, joy.y);
        const joyAngle = (Math.atan2(joy.y, joy.x) * 180) / Math.PI;
        gimbalLineRef.current.style.width = `${joyDist}px`;
        gimbalLineRef.current.style.transform = `rotate(${joyAngle}deg)`;
        gimbalLineRef.current.style.opacity = joyDist > 1.5 ? Math.min(joyDist / 10, 0.6) : 0;
      }

      // 3. WHILE MOVING SPARKLES ("while moving, sparkles should come")
      idleCounter.current++;

      if (ringSpeed > 4 && sparklesRef.current.length < 140) {
        const spawnCount = ringSpeed > 220 ? 4 : (ringSpeed > 60 ? 2 : 1);
        for (let k = 0; k < spawnCount; k++) {
          const originX = ring.x + joy.x + (Math.random() - 0.5) * 8;
          const originY = ring.y + joy.y + (Math.random() - 0.5) * 8;

          const scatterAngle = Math.atan2(-ring.vy, -ring.vx) + (Math.random() - 0.5) * 0.9;
          const scatterSpeed = Math.random() * 2.6 + 0.8;

          sparklesRef.current.push({
            x: originX,
            y: originY,
            vx: Math.cos(scatterAngle) * scatterSpeed + (Math.random() - 0.5) * 0.8,
            vy: Math.sin(scatterAngle) * scatterSpeed - 0.35,
            size: Math.random() * 7.5 + 4.5,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.25,
            phase: Math.random() * Math.PI * 2,
            life: 1.0,
            decay: Math.random() * 0.015 + 0.010,
            type: Math.random() > 0.35 ? 'diamond_star' : (Math.random() > 0.5 ? 'burst' : 'stardust'),
            color: Math.random() > 0.35 ? '#FFDF73' : (Math.random() > 0.45 ? '#FFF6D6' : '#FFFFFF')
          });
        }
      } else if (idleCounter.current % 16 === 0 && sparklesRef.current.length < 40) {
        sparklesRef.current.push({
          x: ring.x + (Math.random() - 0.5) * 10,
          y: ring.y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -(Math.random() * 0.8 + 0.3),
          size: Math.random() * 5.5 + 3.5,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.15,
          phase: Math.random() * Math.PI * 2,
          life: 1.0,
          decay: 0.012,
          type: Math.random() > 0.5 ? 'diamond_star' : 'stardust',
          color: Math.random() > 0.4 ? '#FFE57F' : '#FFFFFF'
        });
      }

      // 4. Ambient Diya Spotlight Glow Drift
      const glowFactor = 1 - Math.exp(-6 * dt);
      glowPos.current.x += (ring.x - glowPos.current.x) * glowFactor;
      glowPos.current.y += (ring.y - glowPos.current.y) * glowFactor;

      if (glowWrapperRef.current) {
        glowWrapperRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0)`;
      }

      // 5. CANVAS DRAWING (Continuous Sparkles + Ripples)
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Click Shockwave Ripples
        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          const r = ripplesRef.current[i];
          r.radius += (r.maxRadius - r.radius) * 0.16;
          r.opacity *= 0.88;

          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r.color}, ${r.opacity})`;
          ctx.lineWidth = r.lineWidth;
          ctx.stroke();

          if (r.opacity < 0.02) {
            ripplesRef.current.splice(i, 1);
          }
        }

        // 4-Point Diamond Sparkles (✦) & 8-Point Royal Bursts
        ctx.shadowColor = 'rgba(255, 223, 115, 0.95)';
        ctx.shadowBlur = 10;

        for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
          const s = sparklesRef.current[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vx *= 0.95;
          s.vy *= 0.95;
          s.rotation += s.vRot;
          s.life -= s.decay;

          if (s.life > 0) {
            const twinkle = 0.7 + 0.3 * Math.sin(currentTime * 0.02 + s.phase);
            const currentOpacity = Math.max(s.life * twinkle, 0);

            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.rotation);

            if (s.type === 'diamond_star') {
              ctx.fillStyle = s.color;
              ctx.globalAlpha = currentOpacity;

              ctx.beginPath();
              const size = s.size * s.life;
              const inner = size * 0.18;
              for (let p = 0; p < 4; p++) {
                const a = (p * Math.PI) / 2;
                ctx.lineTo(Math.cos(a) * size, Math.sin(a) * size);
                ctx.lineTo(Math.cos(a + Math.PI / 4) * inner, Math.sin(a + Math.PI / 4) * inner);
              }
              ctx.closePath();
              ctx.fill();

              ctx.beginPath();
              ctx.arc(0, 0, size * 0.32, 0, Math.PI * 2);
              ctx.fillStyle = '#FFFFFF';
              ctx.globalAlpha = Math.max(currentOpacity * 0.95, 0);
              ctx.fill();
            } else if (s.type === 'burst') {
              ctx.fillStyle = s.color;
              ctx.globalAlpha = currentOpacity;

              ctx.beginPath();
              const size = s.size * s.life;
              const inner = size * 0.22;
              for (let p = 0; p < 8; p++) {
                const a = (p * Math.PI) / 4;
                const r = p % 2 === 0 ? size : size * 0.6;
                ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
                ctx.lineTo(Math.cos(a + Math.PI / 8) * inner, Math.sin(a + Math.PI / 8) * inner);
              }
              ctx.closePath();
              ctx.fill();

              ctx.beginPath();
              ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
              ctx.fillStyle = '#FFFFFF';
              ctx.globalAlpha = Math.max(currentOpacity * 0.95, 0);
              ctx.fill();
            } else {
              ctx.beginPath();
              ctx.arc(0, 0, s.size * 0.5 * s.life, 0, Math.PI * 2);
              ctx.fillStyle = s.color;
              ctx.globalAlpha = currentOpacity;
              ctx.fill();
            }

            ctx.restore();
          } else {
            sparklesRef.current.splice(i, 1);
          }
        }

        ctx.shadowBlur = 0;
      }

      rafId.current = requestAnimationFrame(render);
    };

    lastTimeRef.current = performance.now();
    rafId.current = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', updateCanvasSize);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 0. Canvas Layer for Sparkles Stream & Shockwaves */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9995]"
      />

      {/* 1. Ambient Palace Diya Candle Spotlight Glow */}
      <div
        ref={glowWrapperRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9990] transition-opacity duration-500 will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, rgba(122, 31, 49, 0.05) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* 2. THE OUTER CIRCLE & MIDDLE JOYSTICK DOT */}
      <div
        ref={ringWrapperRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* ========================================================
            STATE A: DEFAULT - LUXURY OUTER CIRCLE & MIDDLE JOYSTICK DOT
            ======================================================== */}
        {cursorState === 'default' && (
          <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center select-none w-10 h-10">
            {/* Outer Luxury Circle Ring ("cirecle") */}
            <div 
              className={`absolute inset-0 rounded-full border-[1.5px] border-[#D4AF37] transition-all duration-150 ${
                isClicking 
                  ? 'scale-90 border-amber-200 bg-amber-400/15' 
                  : 'scale-100 shadow-[0_0_16px_rgba(212,175,55,0.45),inset_0_0_8px_rgba(212,175,55,0.2)]'
              }`}
            >
              {/* 4 Cardinal Astrological Dial Ticks (12, 3, 6, 9 o'clock) */}
              <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_4px_#FFDF73]" />
              <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_4px_#FFDF73]" />
              <div className="absolute top-1/2 -left-[2px] -translate-y-1/2 w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_4px_#FFDF73]" />
              <div className="absolute top-1/2 -right-[2px] -translate-y-1/2 w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_4px_#FFDF73]" />
            </div>

            {/* Micro Gimbal Tension Line (from center to joystick dot) */}
            <div 
              ref={gimbalLineRef}
              className="absolute left-1/2 top-1/2 origin-left h-[1px] bg-gradient-to-r from-amber-400/80 to-white pointer-events-none"
              style={{ width: 0 }}
            />

            {/* Middle Joystick Kind of Dot ("middl joystict kind of dot") */}
            <div 
              ref={joystickDotRef}
              className={`relative flex items-center justify-center rounded-full transition-transform duration-75 ${
                isClicking ? 'scale-75' : 'scale-100'
              }`}
            >
              {/* Glowing 24K Gold Sphere with White Diamond Specular Center */}
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#FFDF73] to-[#D4AF37] shadow-[0_0_8px_#FFFFFF,0_0_16px_#D4AF37]" />
            </div>
          </div>
        )}

        {/* ========================================================
            STATE B: BUTTON / INTERACTIVE CTA - ROYAL MAGNETIC SEAL
            ======================================================== */}
        {cursorState === 'button' && (
          <div 
            className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out ${
              isClicking 
                ? 'w-12 h-12 bg-amber-400/40 border-2 border-white' 
                : 'w-16 h-16 bg-gradient-to-br from-amber-400/30 via-[#7A1F31]/40 to-amber-500/30 border-2 border-amber-300 backdrop-blur-[2px] shadow-[0_0_35px_rgba(212,175,55,0.85)]'
            }`}
            style={{ borderRadius: '14px' }}
          >
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-300" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-300" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-300" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-300" />

            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#FFFFFF] animate-ping" />
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#D4AF37]" />
          </div>
        )}

        {/* ========================================================
            STATE C: VIDEO / WALKTHROUGH - FLOATING PLAY BADGE
            ======================================================== */}
        {cursorState === 'play' && (
          <div className="-translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-[#4D0D19]/95 text-white border-2 border-amber-300 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.7)] flex items-center gap-2 select-none">
            <span className="text-amber-300 text-sm font-bold">▶</span>
            <span className="text-[10px] font-cinzel font-bold tracking-wider text-amber-200">PLAY TOUR</span>
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-amber-400 animate-pulse h-full" />
              <span className="w-0.5 bg-amber-400 animate-pulse h-2" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 bg-amber-400 animate-pulse h-2.5" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* ========================================================
            STATE D: GALLERY / LIGHTBOX - MAGNIFYING LENS
            ======================================================== */}
        {cursorState === 'view' && (
          <div className="-translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#4D0D19]/95 text-white border-2 border-amber-300 backdrop-blur-md shadow-[0_0_35px_rgba(212,175,55,0.65)] flex flex-col items-center justify-center select-none">
            <span className="text-[11px] font-cinzel font-bold text-amber-300 tracking-[0.2em] uppercase drop-shadow">
              VIEW
            </span>
            <span className="text-[9px] text-amber-200 font-mono">⛶ ZOOM</span>
          </div>
        )}

        {/* ========================================================
            STATE E: SLIDER / DRAGGABLE - DIRECTIONAL SLIDE BEACON
            ======================================================== */}
        {cursorState === 'drag' && (
          <div className="-translate-x-1/2 -translate-y-1/2 w-20 h-9 rounded-full bg-[#350710]/95 text-amber-200 border-2 border-amber-300 backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.55)] flex items-center justify-between px-2.5 select-none font-bold text-xs">
            <span className="animate-pulse">◀</span>
            <span className="text-[9px] uppercase tracking-wider text-amber-100 font-cinzel">SLIDE</span>
            <span className="animate-pulse">▶</span>
          </div>
        )}

        {/* ========================================================
            STATE F: TEXT INPUT - GOLDEN BEACON QUILL
            ======================================================== */}
        {cursorState === 'text' && (
          <div className="-translate-x-1/2 -translate-y-1/2 w-1.5 h-7 rounded-full bg-gradient-to-b from-white via-amber-200 to-amber-500 shadow-[0_0_16px_#D4AF37]" />
        )}
      </div>
    </>
  );
}
