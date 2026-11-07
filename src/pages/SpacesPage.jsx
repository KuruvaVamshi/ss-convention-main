import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { spacesData } from '../data/spacesData';
import { venueData } from '../data/venueData';
import {
  Sparkles,
  Building,
  Users,
  Snowflake,
  ArrowRight,
  Eye,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Check,
  ShieldCheck,
  Zap,
  UtensilsCrossed,
  Car,
  Volume2,
  Lightbulb,
  DoorClosed,
  Layers,
  Compass,
  Calendar,
  Play,
  Pause,
  LayoutGrid,
  Film
} from 'lucide-react';

/**
 * Animated Counter Component for Luxury Capacity Numbers
 * Supports instant display if reduced motion is requested.
 */
function AnimatedCounter({ target, suffix = '', shouldReduce = false }) {
  const [count, setCount] = useState(shouldReduce ? target : 0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (shouldReduce) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = target;
          const duration = 1200; // ms
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeOut = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(easeOut * end);
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated, shouldReduce]);

  return (
    <span ref={ref} className="font-cinzel font-bold text-champagne-light">
      {count}
      {suffix}
    </span>
  );
}

/**
 * Fullscreen Interactive Lightbox for Hall Decoration Photography
 */
function HallDecorationLightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onSelectIndex,
  hallName
}) {
  const shouldReduce = useReducedMotion();
  const touchStartX = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !images || images.length === 0) return null;
  if (typeof document === 'undefined') return null;

  const currentImage = images[currentIndex] || images[0];

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      onNext(); // swiped left
    } else if (diff < -50) {
      onPrev(); // swiped right
    }
    touchStartX.current = null;
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: shouldReduce ? 0.1 : 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[99999] flex flex-col justify-between bg-black/98 backdrop-blur-2xl text-white p-3 sm:p-6 select-none"
      >
        {/* Prominent High-Visibility Floating Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-5 sm:right-6 z-[100000] flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#3D0A14] hover:bg-[#8A1828] border-2 border-champagne-gold text-champagne-light hover:text-white shadow-[0_4px_30px_rgba(0,0,0,0.95)] backdrop-blur-md transition-all hover:scale-105 active:scale-95 group cursor-pointer"
          title="Close (Escape)"
          aria-label="Close Lightbox"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-champagne-light group-hover:text-white">
            CLOSE
          </span>
          <div className="w-5 h-5 rounded-full bg-champagne-gold/25 flex items-center justify-center border border-champagne-gold/60">
            <X className="w-3.5 h-3.5 text-champagne-gold group-hover:text-white" />
          </div>
        </button>

        {/* Top Header Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-between border-b border-champagne-hairline/60 pb-3 sm:pb-4 pt-1 px-2 pr-32 sm:pr-44"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-champagne-gold">
                {hallName}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-[10px] sm:text-xs text-luxury-parchment/80 font-medium">
                Photo {currentIndex + 1} of {images.length}
              </span>
            </div>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-luxury-ivory truncate max-w-[280px] sm:max-w-md md:max-w-xl mt-0.5">
              {currentImage.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={currentImage.src}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-full border border-champagne-hairline bg-palace-wine/60 text-champagne-gold hover:text-white hover:border-champagne-gold transition-colors"
              title="Open Full Resolution"
            >
              <Maximize2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Main Image Stage */}
        <div
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative flex-1 flex items-center justify-center p-2 sm:p-4 my-auto overflow-hidden"
        >
          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={onPrev}
              aria-label="Previous photograph"
              className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-palace-obsidian/80 border border-champagne-gold/40 text-champagne-gold hover:text-white hover:bg-champagne-gold/20 flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Current Photograph */}
          <motion.div
            key={currentImage.src}
            initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: shouldReduce ? 0.1 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[70vh] sm:max-h-[74vh] max-w-[94vw] sm:max-w-[85vw] flex items-center justify-center"
          >
            <img
              src={currentImage.src}
              alt={currentImage.title}
              className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl border border-champagne-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            />
          </motion.div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={onNext}
              aria-label="Next photograph"
              className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-palace-obsidian/80 border border-champagne-gold/40 text-champagne-gold hover:text-white hover:bg-champagne-gold/20 flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="border-t border-champagne-hairline/60 pt-3 pb-1 px-2"
        >
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-4xl mx-auto no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onSelectIndex(idx)}
                className={`relative flex-shrink-0 w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-champagne-gold scale-105 ring-2 ring-champagne-gold/40'
                    : 'border-white/20 opacity-60 hover:opacity-90 hover:border-champagne-light'
                }`}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/**
 * Hall photo ribbons: two rows of photos drifting in opposite directions.
 * Hovering a row pauses it; clicking a photo opens the lightbox.
 */
function PhotoRibbon({ items, images, hallName, onOpenLightbox, reverse = false, duration = 60 }) {
  // Four copies so the track is wider than any screen; it moves by half its width, which is a whole number of sets
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="group/row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className="flex w-max gap-4 animate-marquee-x group-hover/row:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {loop.map(({ img, index }, k) => (
          <button
            key={`${img.src}-${k}`}
            type="button"
            onClick={() => onOpenLightbox(images, index, hallName)}
            aria-label={`View photo ${index + 1} of ${images.length}: ${img.title}`}
            aria-hidden={k >= items.length ? true : undefined}
            tabIndex={k >= items.length ? -1 : 0}
            className="group relative flex-shrink-0 w-[260px] sm:w-[340px] h-[190px] sm:h-[240px] overflow-hidden rounded-2xl border border-[#D4AF37]/25 hover:border-amber-400/70 cursor-pointer transition-colors duration-300"
          >
            <img
              src={img.src}
              alt={k < items.length ? img.title : ''}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C0409]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              {img.category && <span className="block text-[10px] tracking-[0.25em] uppercase text-amber-300">{img.category}</span>}
              <span className="mt-1 block font-cinzel text-sm font-bold text-latte leading-snug line-clamp-2">{img.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function HallGalleryStrip({
  hallName,
  eyebrow,
  heading,
  description,
  images = [],
  onOpenLightbox
}) {
  if (!images.length) return null;
  const indexed = images.map((img, index) => ({ img, index }));
  const half = Math.ceil(indexed.length / 2);
  const rowA = indexed.slice(0, half);
  const rowB = indexed.slice(half);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold">{eyebrow}</p>
          <h3 className="mt-2 font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">{heading}</h3>
          <p className="mt-3 text-mocha leading-relaxed">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => onOpenLightbox(images, 0, hallName)}
          className="btn-outline-gold self-start md:self-auto"
        >
          <Eye className="w-4 h-4" /> View all {images.length} photos
        </button>
      </div>

      {/* Full-bleed ribbons */}
      <div className="space-y-4 -mx-2 sm:-mx-4 lg:-mx-6">
        <PhotoRibbon items={rowA} images={images} hallName={hallName} onOpenLightbox={onOpenLightbox} duration={55} />
        {rowB.length > 0 && (
          <PhotoRibbon items={rowB} images={images} hallName={hallName} onOpenLightbox={onOpenLightbox} reverse duration={65} />
        )}
      </div>
    </div>
  );
}


// Venue photos for the hero strip: the first photos of each hall, interleaved
const HERO_PHOTOS = (() => {
  const lists = spacesData.slice(0, 3).map((h) => h.gallery.slice(0, 4).map((g) => g.src));
  const out = [];
  for (let i = 0; i < 4; i++) lists.forEach((l) => l[i] && out.push(l[i]));
  return out;
})();

const HALL_TABS = [
  { id: 'hall-vasishta', label: 'Hall Vasishta' },
  { id: 'hall-agasthya', label: 'Hall Agasthya' },
  { id: 'hall-koundinya', label: 'Hall Koundinya' }
];

// Per-hall copy that is not in spacesData
const HALL_META = {
  'hall-vasishta': {
    capacityPill: '600 Seated · 1,000 Floating',
    caption: 'Double-Tier Crystal Chandeliers & 70-ft Auspicious Bridal Aisle',
    chips: ['5,500+ Sq.Ft', 'Pillarless Span', 'Central Cassette A/C', '70-ft Bridal Aisle', '2 VIP Bride/Groom Suites'],
    counters: [
      { label: 'Theatre / Seated', target: 600, suffix: '' },
      { label: 'Floating Reception', target: 1000, suffix: '+' },
      { label: 'Round-Table Banquet', target: 350, suffix: '' }
    ],
    area: '5,500+',
    soundLabel: 'Power Backup & Sound',
    specKey: 'powerBackup',
    specFallback: {
      ceilingHeight: '16 ft clear height with acoustic false ceiling',
      stageDimensions: '38 ft (W) × 18 ft (D) × 3.5 ft (H) – fits 40-member photo groups',
      cooling: 'Centralized Daikin Cassette A/C with high-CFM multi-point circulation',
      flooring: 'High-gloss Italian vitrified mirror-finish tiles with zero glare',
      greenRooms: '2 Executive VIP AC Suites (Bride & Groom) with vanity & attached washrooms',
      sound: '100% DG Generator backup with 0-second blackout auto-transfer'
    },
    carouselEyebrow: 'HALL VASISHTA · WEDDING DECOR EXHIBITION',
    carouselText: 'Explore authentic traditional mandaps, carved pillars, reception stages, chandeliers, and ceremonial settings designed in Hall Vasishta.'
  },
  'hall-agasthya': {
    capacityPill: '200–350 Seated · 500 Floating',
    caption: 'Chandelier Perspective & Theatrical Stage Lighting',
    chips: ['3,800 Sq.Ft', 'Acoustic Ceiling', 'Theatrical Stage Lighting', 'Central Multi-Zone A/C', '1 VIP Green Room'],
    counters: [
      { label: 'Theatre / Seated', target: 350, suffix: '' },
      { label: 'Floating Reception', target: 500, suffix: '' },
      { label: 'Banquet Round-Table', target: 200, suffix: '' }
    ],
    area: '3,800',
    soundLabel: 'Acoustics & Lighting',
    specKey: 'acoustics',
    specFallback: {
      ceilingHeight: '14 ft clear height with linear LED profiles',
      stageDimensions: '28 ft (W) × 14 ft (D) × 2.5 ft (H) – DJ console & dance choreography',
      cooling: 'Central multi-zone climate control with rapid dance-floor cooling',
      flooring: 'Polished Italian-style vitrified tiles for seamless dance performances',
      greenRooms: '1 Executive VIP Air-Conditioned Green Room with attached vanity',
      sound: 'Studio-tuned acoustic false ceiling with DMX intelligent wash fixtures'
    },
    carouselEyebrow: 'HALL AGASTHYA · SANGEET & RECEPTION EXHIBITION',
    carouselText: 'Explore contemporary sangeet stages, neon floral arches, pastel boho setups, and dynamic event lighting designed in Hall Agasthya.'
  },
  'hall-koundinya': {
    capacityPill: '100–200 Guests',
    caption: 'Central Aisle & Dedicated Milestone Celebration Stage',
    chips: ['2,200 Sq.Ft', 'Wood Slat Ceiling', 'Milestone Stage', 'Silent Cassette A/C', 'Family Waiting Lounge'],
    counters: [
      { label: 'Theatre / Seated', target: 200, suffix: '' },
      { label: 'Floating Reception', target: 250, suffix: '' },
      { label: 'Banquet Round-Table', target: 120, suffix: '' }
    ],
    area: '2,200',
    soundLabel: 'Acoustics & Video',
    specKey: 'acoustics',
    specFallback: {
      ceilingHeight: '12.5 ft clear height with architectural vertical wood slats',
      stageDimensions: '20 ft (W) × 12 ft (D) × 2 ft (H) – dedicated cradle & cake platform',
      cooling: 'Dual cassette air-conditioning engineered for whisper-silent operation',
      flooring: 'Premium non-slip vitrified tiles safe for elderly relatives & toddlers',
      greenRooms: 'VIP waiting lounge with baby care conveniences & plush seating',
      sound: 'Linear wood ceiling dampening echo for crystal speech & family videos'
    },
    carouselEyebrow: 'HALL KOUNDINYA · CELEBRATION EXHIBITION',
    carouselText: 'Explore authentic 1st birthday sunshine setups, traditional cradle ceremony (Barasala) lotus swings, and milestone family themes designed in Hall Koundinya.'
  }
};

export default function SpacesPage({ onOpenLightbox, lang = 'en' }) {
  const shouldReduce = useReducedMotion();
  const [activeNav, setActiveNav] = useState('hall-vasishta');

  // Smart auto-hide on scroll down, show on scroll up for the hall switcher
  const [subnavVisible, setSubnavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const SCROLL_THRESHOLD = 10;

  const [lightboxState, setLightboxState] = useState({ isOpen: false, hallName: '', images: [], currentIndex: 0 });


  const openGalleryModal = (images, index, hallName) =>
    setLightboxState({ isOpen: true, hallName, images, currentIndex: index });
  const closeGalleryModal = () => setLightboxState((prev) => ({ ...prev, isOpen: false }));
  const handleNextPhoto = () =>
    setLightboxState((prev) => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }));
  const handlePrevPhoto = () =>
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      window.requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);
        const diff = y - lastScrollY.current;
        if (y <= 20) {
          setSubnavVisible(true);
        } else if (Math.abs(diff) >= SCROLL_THRESHOLD) {
          if (diff > 0 && y > 80) setSubnavVisible(false);
          else if (diff < 0) setSubnavVisible(true);
        } else {
          ticking.current = false;
          return;
        }
        lastScrollY.current = y;
        ticking.current = false;
      });
      ticking.current = true;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight the tab of the hall currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveNav(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    HALL_TABS.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const easeLuxury = [0.22, 1, 0.36, 1];

  const renderHall = (hall) => {
    const meta = HALL_META[hall.id] || HALL_META['hall-vasishta'];
    const hallNumber = HALL_TABS.findIndex((t) => t.id === hall.id) + 1;
  const specs = [
    ['Clear Span & Height', hall.specs?.ceilingHeight || meta.specFallback.ceilingHeight],
    ['Stage', hall.specs?.stageDimensions || meta.specFallback.stageDimensions],
    ['Climate Control', hall.specs?.cooling || meta.specFallback.cooling],
    ['Flooring', hall.specs?.flooring || meta.specFallback.flooring],
    ['VIP Green Rooms', hall.specs?.greenRooms || meta.specFallback.greenRooms],
    [meta.soundLabel, hall.specs?.[meta.specKey] || meta.specFallback.sound]
  ];
    return (
<motion.section
      key={hall.id}
      id={hall.id}
      aria-label={`${hall.name} showcase`}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: easeLuxury }}
      className="py-16 sm:py-24 scroll-mt-32 border-b border-[#D4AF37]/15"
    >
          <div className="w-full max-w-[96vw] xl:max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
            {/* Intro */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
              <div className="lg:col-span-7 group relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-black aspect-[16/10]">
                  <img
                    src={hall.hallImage || hall.image}
                    alt={hall.name}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  <button
                    onClick={() => openGalleryModal(hall.gallery, 0, hall.name)}
                    aria-label={`Enlarge ${hall.name} photograph`}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/60 border border-[#C5A059]/50 text-amber-200 flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/60 border border-[#C5A059]/50 text-amber-200 backdrop-blur-md">
                    <Users className="w-3.5 h-3.5" /> {meta.capacityPill}
                  </span>
                  <p className="absolute bottom-5 left-6 right-6 font-cinzel text-base sm:text-lg font-bold text-latte drop-shadow">
                    {meta.caption}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col space-y-5">
                <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold">
                  The Venue · Hall 0{hallNumber}
                </p>
                <div>
                  <h2 className="font-cinzel text-4xl lg:text-5xl font-bold tracking-wide leading-tight">{hall.name}</h2>
                  <p className="mt-2 font-cinzel text-sm sm:text-base text-amber-200">{hall.tagline}</p>
                </div>
                <p className="text-mocha text-base leading-relaxed">{hall.shortDescription || hall.description}</p>

                <ul className="flex flex-wrap gap-2">
                  {meta.chips.map((tag) => (
                    <li key={tag} className="px-3 py-1 rounded-lg bg-[#350710] border border-[#D4AF37]/30 text-xs text-latte">
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link to="/contact" className="btn-gold">
                    <span>Book hall visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={`https://wa.me/${venueData.whatsappNumber}?text=${encodeURIComponent(
                      `Hello SS Convention, I would like to enquire about booking ${hall.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Capacities */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#D4AF37]/20 rounded-2xl overflow-hidden border border-[#D4AF37]/25 mb-16 sm:mb-20">
              {meta.counters.map((c) => (
                <div key={c.label} className="bg-[#3D0A14] p-5 sm:p-7 text-center">
                  <div className="font-cinzel text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] to-[#C5A059] tabular-nums">
                    <AnimatedCounter target={c.target} suffix={c.suffix} shouldReduce={shouldReduce} />
                  </div>
                  <div className="mt-1 text-[11px] tracking-[0.22em] uppercase text-mocha">{c.label}</div>
                </div>
              ))}
              <div className="bg-[#3D0A14] p-5 sm:p-7 text-center">
                <div className="font-cinzel text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] to-[#C5A059]">
                  {meta.area} <span className="text-sm font-normal text-mocha">sq.ft</span>
                </div>
                <div className="mt-1 text-[11px] tracking-[0.22em] uppercase text-mocha">Floor Area</div>
              </div>
            </div>

            {/* Specifications */}
            <div className="mb-16 sm:mb-20">
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide mb-2">Specifications</h3>
              <div className="h-px w-20 bg-gradient-to-r from-[#C5A059] to-transparent mb-8" />
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
                {specs.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-12 gap-4 py-5 border-b border-[#D4AF37]/20">
                    <dt className="col-span-4 text-[11px] uppercase tracking-[0.2em] text-amber-300 font-semibold pt-0.5">{label}</dt>
                    <dd className="col-span-8 text-sm text-mocha leading-relaxed">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <HallGalleryStrip
              hallName={hall.name}
              eyebrow={meta.carouselEyebrow}
              heading="Celebrations, Beautifully Designed."
              description={meta.carouselText}
              images={hall.gallery}
              onOpenLightbox={openGalleryModal}
              lang={lang}
            />
          </div>
        </motion.section>
    );
  };

  return (
    <div className="bg-[#450B17] text-latte min-h-screen overflow-x-clip selection:bg-[#C5A059] selection:text-[#0D0204]">
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pt-32 pb-14 border-b border-[#D4AF37]/30">
        {/* Slowly scrolling strip of venue photos */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="flex h-full w-max animate-marquee-x">
            {[...HERO_PHOTOS, ...HERO_PHOTOS].map((src, i) => (
              <img key={i} src={src} alt="" loading={i < 4 ? 'eager' : 'lazy'} draggable={false} className="h-full w-[70vw] sm:w-[40vw] lg:w-[28vw] flex-shrink-0 object-cover" />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#450B17] via-[#1C0409]/75 to-[#1C0409]/60" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeLuxury }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">
              {lang === 'te' ? 'మా వేదికను కనుగొనండి' : 'Discover our venue'}
            </p>
            <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-wide leading-[1.1]">
              {lang === 'te' ? 'మూడు విశిష్ట వేదికలు.' : 'Three Unique Spaces.'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#EED9A6] to-[#C5A059]">
                {lang === 'te' ? 'అంతులేని సంబరాలు.' : 'Endless Celebrations.'}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-mocha leading-relaxed">
              {lang === 'te'
                ? 'మీ మరపురాని వేడుకలకు రూపకల్పన చేసిన వేదికలను అన్వేషించండి.'
                : 'Explore the spaces designed to bring your most memorable celebrations to life.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hall switcher */}
      <div
        id="hall-tabs"
        className={`sticky top-[68px] sm:top-[72px] z-30 w-full py-3 px-4 bg-[#1C0409]/95 backdrop-blur-xl border-b border-[#D4AF37]/25 transform transition-transform duration-300 ${
          subnavVisible ? 'translate-y-0' : '-translate-y-[calc(100%+80px)] pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {HALL_TABS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => scrollToSection(t.id)}
                className={`relative px-4 py-2 text-sm font-cinzel tracking-wider whitespace-nowrap transition-colors ${
                  activeNav === t.id ? 'text-latte' : 'text-mocha hover:text-latte'
                }`}
              >
                <span className="text-amber-300/70 mr-2 text-xs">0{i + 1}</span>
                {t.label}
                {activeNav === t.id && (
                  <motion.span layoutId="hall-underline" className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-amber-300 rounded-full" />
                )}
              </button>
            ))}
          </div>
          <button onClick={() => scrollToSection('enquire-cta')} className="hidden sm:inline-flex items-center gap-1.5 text-sm text-amber-300 hover:text-latte transition-colors">
            Enquire <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* All three halls */}
      {HALL_TABS.map((t) => renderHall(spacesData.find((h) => h.id === t.id) || spacesData[0]))}

      {/* Enquiry */}
      <section id="enquire-cta" aria-label="Enquire about S.S. Convention" className="py-24 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] border-t border-[#D4AF37]/30 text-center">
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center">
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide leading-tight">
            Find the Perfect Space for Your Celebration
          </h2>
          <p className="mt-5 text-mocha text-base sm:text-lg leading-relaxed max-w-2xl">
            Tell us about your occasion and our venue directors will help you choose the right hall, customize stage themes and reserve auspicious muhurtham dates.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold">Enquire about your event</Link>
            <a
              href={`https://wa.me/${venueData.whatsappNumber}?text=${encodeURIComponent(
                'Hello SS Convention, I would like to enquire about hall availability and booking.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </a>
            <a href={`tel:${venueData.phones[0].raw}`} className="btn-outline-gold">
              <Phone className="w-4 h-4 text-amber-300" /> {venueData.phones[0].display}
            </a>
          </div>

          <ul className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-mocha pt-6 border-t border-[#D4AF37]/30 w-full">
            <li className="flex items-center justify-center gap-1.5"><ShieldCheck className="w-4 h-4 text-amber-300" /> 3 Halls + Dining Floor</li>
            <li className="flex items-center justify-center gap-1.5"><Snowflake className="w-4 h-4 text-amber-300" /> Central Cassette A/C</li>
            <li className="flex items-center justify-center gap-1.5"><Zap className="w-4 h-4 text-amber-300" /> 100% DG Power Backup</li>
            <li className="flex items-center justify-center gap-1.5"><Car className="w-4 h-4 text-amber-300" /> 150+ Car Parking</li>
          </ul>
        </div>
      </section>

      <HallDecorationLightbox
        isOpen={lightboxState.isOpen}
        images={lightboxState.images}
        currentIndex={lightboxState.currentIndex}
        onClose={closeGalleryModal}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        onSelectIndex={(idx) => setLightboxState((prev) => ({ ...prev, currentIndex: idx }))}
        hallName={lightboxState.hallName}
      />
    </div>
  );
}