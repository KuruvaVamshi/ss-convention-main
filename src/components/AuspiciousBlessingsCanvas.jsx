import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Flower2 } from 'lucide-react';

export default function AuspiciousBlessingsCanvas() {
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafId = useRef(null);

  // Trigger burst of 45 auspicious petals and golden coins
  const triggerBlessings = () => {
    setIsActive(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const count = 45;
    const types = ['jasmine', 'marigold', 'goldCoin', 'stardust'];

    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 80,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        size: Math.random() * 10 + 8,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: 1,
        life: 1.0,
        decay: Math.random() * 0.005 + 0.003
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop with physics (gravity, air drift, mouse deflection)
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        // Gravity & drift
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.02) * 0.8;
        p.rotation += p.vRot;
        p.life -= p.decay;

        // Mouse deflection
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.vx += (dx / dist) * force * 1.5;
          p.vy += (dy / dist) * force * 1.5;
        }

        // Draw particle based on auspicious type
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.life);

        if (p.type === 'marigold') {
          // Orange/yellow marigold petal
          ctx.fillStyle = '#FFA000';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'jasmine') {
          // Pure white/cream jasmine flower petal
          ctx.fillStyle = '#FFFDF0';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.8, p.size * 0.45, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'goldCoin') {
          // Imperial gold coin
          ctx.fillStyle = '#D4AF37';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#8C6A18';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Golden sparkle
          ctx.fillStyle = '#FFE082';
          ctx.fillRect(-p.size * 0.25, -p.size * 0.25, p.size * 0.5, p.size * 0.5);
        }

        ctx.restore();

        // Remove dead particles
        if (p.y > height + 50 || p.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      if (particlesRef.current.length === 0) {
        setIsActive(false);
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    // Expose trigger globally so any booking or contact button can call it
    window.triggerBlessings = triggerBlessings;

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      delete window.triggerBlessings;
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9990]"
      />

      {/* Interactive Trigger Button Floating in Bottom Right */}
      <button
        onClick={triggerBlessings}
        className="fixed bottom-24 right-6 z-40 px-3.5 py-2 rounded-full bg-[#3A0813]/95 backdrop-blur-md border-2 border-[#D4AF37] text-amber-200 font-bold text-xs shadow-2xl flex items-center gap-1.5 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-[#3D0A14] transition-all group hover:scale-105"
        title="Shower Auspicious Floral Blessings"
      >
        <Flower2 className="w-3.5 h-3.5 text-amber-300 group-hover:text-[#3D0A14] animate-spin-slow" />
        <span className="hidden sm:inline">Shower Blessings</span>
      </button>
    </>
  );
}

