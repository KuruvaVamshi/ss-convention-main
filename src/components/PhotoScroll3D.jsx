import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Images } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { galleryItems } from '../data/galleryData';
import SectionHeader from './SectionHeader';

const COUNT = 6;

// Evenly sample photos across the whole gallery so every area of the venue appears.
function pickPhotos() {
  const pool = galleryItems.filter((g) => !['edison_bulbs', 'official_brochure'].some((k) => g.image.includes(k)));
  const step = pool.length / COUNT;
  return Array.from({ length: COUNT }, (_, i) => pool[Math.floor(i * step)]);
}

export default function PhotoScroll3D({ onOpenLightbox }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const photos = useMemo(pickPhotos, []);
  const [radius, setRadius] = useState(520);
  const [cardW, setCardW] = useState(280);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const cw = w < 640 ? 170 : w < 1024 ? 230 : 280;
      setCardW(cw);
      // radius so neighbouring cards just touch: r = (w/2) / tan(pi/n), plus a small gap
      setRadius(Math.round((cw / 2) / Math.tan(Math.PI / COUNT)) + 24);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -330]);
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [-8, -4, -8]);

  const step = 360 / COUNT;
  const cardH = Math.round(cardW * 1.3);

  return (
    <section ref={ref} className={`relative bg-[#2A060E] border-t border-[#D4AF37]/25 ${reduce ? '' : 'h-[320vh]'}`}>
      <div className={`${reduce ? 'py-20' : 'sticky top-0 h-screen'} overflow-hidden flex flex-col justify-center`}>
        <div className="px-4 pt-16 sm:pt-12 text-center">
          <SectionHeader compact eyebrow="Moments of Grandeur" title="Walk Through the Palace">
            Scroll to turn the gallery. Tap any photo to view it full screen.
          </SectionHeader>
          <div className="mt-3.5 flex justify-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/50 hover:border-amber-300 bg-black/40 hover:bg-[#3D0A14] text-amber-200 hover:text-white font-cinzel text-xs font-bold tracking-[0.16em] uppercase shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group"
              title="Explore all venue photos and videos"
            >
              <Images className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="relative" style={{ perspective: '1100px', height: cardH + 140 }}>
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{
              width: 0,
              height: 0,
              transformStyle: 'preserve-3d',
              rotateY: reduce ? 0 : rotate,
              z: Math.round(radius * 0.6),
              rotateX: reduce ? 0 : tilt,
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
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C0409]/90 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 right-3 text-left text-[11px] sm:text-xs font-cinzel text-latte line-clamp-2">
                  {p.title}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
