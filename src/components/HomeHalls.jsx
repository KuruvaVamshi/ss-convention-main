import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { spacesData } from '../data/spacesData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { WhatsAppButton } from './ContactButtons';

const ids = ['hall-vasishta', 'hall-agasthya', 'hall-koundinya'];

const AUTOPLAY_MS = 3000;

// Arrows: shown on hover for mouse users, always visible on touch screens (where there is no hover).
const arrowClass =
  'absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 border border-[#D4AF37]/40 text-latte flex items-center justify-center opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 focus:opacity-100 transition-opacity hover:bg-amber-400 hover:text-[#3D0A14]';

function HallCard({ hall, featured, order = 0 }) {
  const photos = hall.gallery?.length ? hall.gallery.slice(0, 4).map((g) => g.src) : [hall.hallImage || hall.image];
  const n = photos.length;
  const looped = n > 1;
  // Seamless loop: [last, ...photos, first]. The two clones are never visible for more than a
  // moment; after every slide we silently jump from a clone to its real twin.
  const slides = looped ? [photos[n - 1], ...photos, photos[0]] : photos;

  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const articleRef = useRef(null);
  const domIdxRef = useRef(looped ? 1 : 0);
  const settleTimer = useRef(null);
  const [idx, setIdx] = useState(0);           // logical (0..n-1) index, used for the dots
  const [hovered, setHovered] = useState(false);
  const [touching, setTouching] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  const width = () => trackRef.current?.clientWidth || 1;

  // start on the first real photo (index 1 of the cloned track)
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (el && looped) el.scrollLeft = el.clientWidth;
  }, [looped]);

  // keep the same photo in view when the card is resized
  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => { el.scrollLeft = domIdxRef.current * el.clientWidth; });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const jumpTo = (dom) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.scrollSnapType = 'none';
    el.scrollLeft = dom * el.clientWidth;
    domIdxRef.current = dom;
    requestAnimationFrame(() => { el.style.scrollSnapType = ''; });
  };

  // called once the track has stopped moving (after our own slide OR a finger swipe)
  const settle = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    let dom = Math.round(el.scrollLeft / el.clientWidth);
    if (looped) {
      if (dom <= 0) { dom = n; jumpTo(dom); }
      else if (dom >= n + 1) { dom = 1; jumpTo(dom); }
    }
    domIdxRef.current = dom;
    setIdx(looped ? (dom - 1 + n) % n : 0);
  }, [looped, n]);

  const onScroll = () => {
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(settle, 110);
  };
  useEffect(() => () => clearTimeout(settleTimer.current), []);

  const slideBy = useCallback((delta) => {
    const el = trackRef.current;
    if (!el || !looped) return;
    const current = Math.round(el.scrollLeft / el.clientWidth);
    el.scrollTo({ left: (current + delta) * el.clientWidth, behavior: 'smooth' });
  }, [looped]);

  const goToLogical = (i) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: (i + 1) * el.clientWidth, behavior: 'smooth' });
  };

  // only animate while the card is on screen and the tab is visible
  useEffect(() => {
    const el = articleRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return undefined; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Autoplay: one timer per card, slide every 3s. Cards start 0.6s apart so they never all move at once.
  const nextRef = useRef(() => {});
  nextRef.current = () => slideBy(1);
  const active = looped && !reduceMotion && inView && tabVisible && !hovered && !touching;
  useEffect(() => {
    if (!active) return undefined;
    let interval = null;
    const first = setTimeout(() => {
      nextRef.current();
      interval = setInterval(() => nextRef.current(), AUTOPLAY_MS);
    }, AUTOPLAY_MS + order * 600);
    return () => { clearTimeout(first); if (interval) clearInterval(interval); };
  }, [active, order]);

  // touch: pause while a finger is down and for a moment afterwards
  const touchTimer = useRef(null);
  const onTouchStart = () => { clearTimeout(touchTimer.current); setTouching(true); };
  const onTouchEnd = () => { clearTimeout(touchTimer.current); touchTimer.current = setTimeout(() => setTouching(false), 2500); };
  useEffect(() => () => clearTimeout(touchTimer.current), []);

  return (
    <article
      ref={articleRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group ss-lift ss-sheen flex flex-col h-full rounded-2xl overflow-hidden bg-[#5E1628] border border-[#D4AF37]/30 hover:border-amber-400/70 shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_14px_40px_rgba(212,175,55,0.16)] transition-all duration-500"
    >
      {/* Photos: auto-slides every 3s, pauses on hover, swipe on touch screens */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <div
          ref={trackRef}
          onScroll={onScroll}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          className="flex h-full overflow-x-auto snap-x snap-mandatory overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((src, i) => {
            const isClone = looped && (i === 0 || i === slides.length - 1);
            const real = looped ? (i - 1 + n) % n : i;
            return (
              <img
                key={`${src}-${i}`}
                src={src}
                alt={isClone ? '' : `${hall.name} - ${hall.role || 'Wedding & Function Hall'} at S.S. Convention Meerpet, Hyderabad (Photo ${real + 1})`}
                aria-hidden={isClone || undefined}
                loading="lazy"
                draggable={false}
                className="w-full h-full flex-shrink-0 snap-center object-cover"
              />
            );
          })}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A0610] via-transparent to-transparent pointer-events-none" />

        {looped && (
          <>
            <button type="button" onClick={() => slideBy(-1)} aria-label="Previous photo" className={`${arrowClass} left-2`}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => slideBy(1)} aria-label="Next photo" className={`${arrowClass} right-2`}>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 right-4 flex gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToLogical(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${i === idx ? 'w-5 bg-amber-300' : 'w-2 bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        <span className="absolute top-3 right-3 pointer-events-none inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-[#D4AF37]/40 text-xs text-amber-200">
          <Users className="w-3.5 h-3.5" /> {hall.capacity}
        </span>

        <div className="absolute bottom-4 left-5 right-20 pointer-events-none">
          {featured && <span className="text-[10px] tracking-[0.25em] uppercase text-amber-300 font-semibold">Flagship</span>}
          <h3 className="font-cinzel text-2xl font-bold text-latte drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">{hall.name}</h3>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-sm text-amber-300 font-semibold">{hall.tagline}</p>
        <p className="mt-2 text-sm text-mocha leading-relaxed line-clamp-2">{hall.shortDescription || hall.description}</p>

        <div className="mt-auto flex items-stretch gap-2.5" style={{ marginTop: '1.25rem' }}>
          <Link to={`/halls/${hall.id}`} className="btn-gold flex-1">
            <span>View hall</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <WhatsAppButton
            iconOnly
            label={`Enquire about ${hall.name} on WhatsApp`}
            message={`Hello SS Convention Hall, I would like to enquire about ${hall.name} (${hall.capacity} guests).`}
            className="!px-4"
          />
        </div>
      </div>
    </article>
  );
}

export default function HomeHalls() {
  const halls = ids.map((id) => spacesData.find((s) => s.id === id)).filter(Boolean);
  return (
    <section id="halls" className="py-20 lg:py-28 bg-[#3D0A14] border-t border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Three Purpose-Built Spaces" title="Our Premium Halls">
          Each hall has its own character and capacity. Pick the one that fits your celebration.
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {halls.map((hall, i) => (
            <Reveal key={hall.id} delay={i * 0.12} className="h-full">
              <HallCard hall={hall} featured={i === 0} order={i} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/spaces" className="btn-gold">Explore all halls & specs <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/contact" className="btn-outline-gold">Enquire now</Link>
          <WhatsAppButton label="Chat on WhatsApp" message="Hello SS Convention Hall, I would like help choosing the right hall for my event." />
        </Reveal>
      </div>
    </section>
  );
}
