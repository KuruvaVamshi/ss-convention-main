import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Images } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { galleryItems } from '../data/galleryData';
import SectionHeader from './SectionHeader';
import ResponsiveImage from './ResponsiveImage';

const SPIN_SECONDS = 96; // one full turn (slow and stately)

// Evenly sample photos across the whole gallery so every area of the venue appears.
function pickPhotos(COUNT) {
  const pool = galleryItems.filter((g) => !['edison_bulbs', 'official_brochure'].some((k) => g.image.includes(k)));
  const step = pool.length / COUNT;
  return Array.from({ length: COUNT }, (_, i) => pool[Math.floor(i * step)]);
}

const SPARKS = [[12,20,0,5],[22,70,1.2,6],[33,35,2.4,4.5],[45,15,0.6,6.5],[58,78,1.8,5],[68,28,3,5.5],[78,62,0.3,4.8],[88,22,2,6],[8,55,3.2,5.2],[93,50,1.1,6.4],[52,50,2.6,4.2],[40,85,0.9,5.8]];

export default function PhotoScroll3D({ onOpenLightbox }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [count, setCount] = useState(8);
  const photos = useMemo(() => pickPhotos(count), [count]);
  const [radius, setRadius] = useState(520);
  const [cardW, setCardW] = useState(280);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      // Mobile uses a landscape-balanced card so wide hall/stage photos are not heavily cropped;
      // tablet/desktop keep tall editorial cards in a full-width ring.
      const n = w < 640 ? 6 : w < 1024 ? 8 : w < 1500 ? 10 : 12;
      const cw = w < 640 ? 216 : w < 1024 ? 230 : w < 1500 ? 290 : 330;
      setCount(n);
      setCardW(cw);
      // radius so neighbouring cards just touch: r = (w/2) / tan(pi/n), plus a small gap
      setRadius(Math.round((cw / 2) / Math.tan(Math.PI / n)) + 28);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Automatic rotation (CSS keyframes, compositor only). Paused on hover / touch and while off-screen.
  const [hovered, setHovered] = useState(false);
  const [touching, setTouching] = useState(false);
  const [inView, setInView] = useState(true);
  const touchTimer = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => () => clearTimeout(touchTimer.current), []);
  const paused = hovered || touching || !inView;
  const onTouchStart = () => { clearTimeout(touchTimer.current); setTouching(true); };
  const onTouchEnd = () => { clearTimeout(touchTimer.current); touchTimer.current = setTimeout(() => setTouching(false), 2500); };

  const step = 360 / count;
  const cardH = Math.round(cardW * (cardW <= 220 ? 0.85 : 1.3));

  return (
    <section ref={ref} className="relative bg-[#2A060E] border-t border-[#D4AF37]/25">
      <div className="py-16 sm:py-20 overflow-hidden flex flex-col justify-center">
        <div className="px-4 pt-16 sm:pt-12 text-center">
          <SectionHeader compact eyebrow="Moments of Grandeur" title="Walk Through the Palace">
            Watch the gallery turn. Hover to pause, tap any photo to view it full screen.
          </SectionHeader>
          <div className="mt-3.5 flex justify-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/50 hover:border-amber-300 bg-black/40 hover:bg-[#3D0A14] text-amber-200 hover:text-white font-cinzel text-xs font-bold tracking-[0.16em] uppercase shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group"
              title="Explore all venue photos"
            >
              <Images className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div
          className="relative mt-6"
          style={{ perspective: '1100px', height: cardH + 100 }}
          onMouseMove={(e) => {
            // pause only while the pointer is over the middle (front) photo
            const r = e.currentTarget.getBoundingClientRect();
            const dx = Math.abs(e.clientX - (r.left + r.width / 2));
            const dy = e.clientY - r.top;
            const over = dx < cardW * 0.5 && dy > 70 && dy < r.height - 20;
            setHovered((h) => (h === over ? h : over));
          }}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
        >
          <div className="ss-ring-glow" aria-hidden="true" />
          <div className="ss-ring-floor" aria-hidden="true" />
          {SPARKS.map((sp, i) => (
            <span key={i} className="ss-spark" aria-hidden="true" style={{ left: sp[0] + '%', top: sp[1] + '%', animationDelay: sp[2] + 's', animationDuration: sp[3] + 's' }} />
          ))}
          <div
            className="absolute left-1/2 top-1/2 ss-ring-float"
            style={{
              width: 0,
              height: 0,
              transformStyle: 'preserve-3d',
              transform: `translateZ(${Math.round(radius * 0.6)}px) rotateX(-6deg)`,
            }}
          >
            <div
              className={reduce ? '' : 'ss-ring-spin'}
              style={{
                width: 0,
                height: 0,
                transformStyle: 'preserve-3d',
                animationDuration: `${SPIN_SECONDS}s`,
                animationPlayState: paused ? 'paused' : 'running',
              }}
            >
            {photos.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onOpenLightbox?.(p.image, p.title)}
                aria-label={`View photo: ${p.title}`}
                className="absolute rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-[0_18px_50px_rgba(0,0,0,0.6)] bg-[#1C0409] group cursor-pointer"
                style={{
                  width: cardW,
                  height: cardH,
                  marginLeft: -cardW / 2,
                  marginTop: -cardH / 2,
                  transform: `rotateY(${i * step}deg) translateZ(-${radius}px)`,
                  backfaceVisibility: 'hidden',
                  WebkitBoxReflect: 'below 6px linear-gradient(transparent 72%, rgba(255,255,255,0.18))',
                }}
              >
                <ResponsiveImage
                  src={p.image}
                  alt={p.title}
                  sizes="(max-width: 640px) 420px, (max-width: 1024px) 340px, 420px"
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C0409]/85 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2.5 right-2.5 text-left text-[11px] sm:text-xs font-cinzel text-latte line-clamp-1 sm:line-clamp-2">
                  {p.title}
                </span>
              </button>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
