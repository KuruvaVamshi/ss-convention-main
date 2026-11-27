import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { spacesData } from '../data/spacesData';
import { Sparkles, Building, Users, Snowflake, ArrowRight, Eye, ChevronLeft, ChevronRight, X, Maximize2, Check, ShieldCheck, Zap, UtensilsCrossed, Car, DoorClosed, Layers, Calendar } from 'lucide-react';
import { WhatsAppButton, CallButton } from '../components/ContactButtons';
import ResponsiveImage from '../components/ResponsiveImage';

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
      document.body.style.overflow = '';
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
            <ResponsiveImage
              src={currentImage.src}
              alt={currentImage.title}
              sizes="(max-width: 768px) 160vw, 95vw"
              loading="eager"
              decoding="async"
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
                <ResponsiveImage src={img.src} alt="" sizes="64px" loading="lazy" className="w-full h-full object-cover" />
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
 * Hall photo strip: expanding panels on desktop (hover to open a photo),
 * swipeable cards on phones. Clicking a photo opens the lightbox.
 */
function HallGalleryStrip({
  hallName,
  eyebrow,
  heading,
  description,
  images = [],
  onOpenLightbox
}) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
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

      <div className="flex gap-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-3 lg:pb-0 no-scrollbar">
        {images.map((img, i) => {
          const open = active === i;
          return (
            <button
              key={img.src}
              type="button"
              onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => {
                if (open || !window.matchMedia('(hover: hover)').matches) onOpenLightbox(images, i, hallName);
                else setActive(i);
              }}
              aria-label={`View photo ${i + 1} of ${images.length}: ${img.title}`}
              className={`group relative flex-shrink-0 snap-center overflow-hidden rounded-2xl border text-left cursor-pointer aspect-[4/3] w-[86vw] sm:w-[68vw] lg:aspect-auto lg:h-[520px] lg:w-auto transition-[flex,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? 'lg:flex-[4.5] border-amber-400/70' : 'lg:flex-1 border-[#D4AF37]/25'
              }`}
            >
              <ResponsiveImage
                src={img.src}
                alt={img.title}
                sizes="(max-width: 640px) 115vw, (max-width: 1024px) 75vw, 45vw"
                loading="lazy"
                draggable={false}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-out ${
                  open ? 'scale-105 brightness-100' : 'lg:scale-100 lg:brightness-[0.55] lg:grayscale-[0.35]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0409]/90 via-[#1C0409]/15 to-transparent" />

              <span className="absolute top-3 left-4 sm:top-4 sm:left-5 font-cinzel text-xs sm:text-sm tracking-[0.3em] text-amber-300/90">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-6">
                {/* Phones always show the caption cleanly; desktop shows it on the open panel */}
                <div className={`transition-all duration-700 ${open ? 'lg:opacity-100 lg:translate-y-0' : 'lg:opacity-0 lg:translate-y-3'}`}>
                  {img.category && (
                    <span className="block text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-amber-300">{img.category}</span>
                  )}
                  <span className="mt-0.5 sm:mt-1 block font-cinzel text-sm sm:text-lg font-bold text-latte leading-snug line-clamp-1 sm:line-clamp-2 lg:max-w-md">
                    {img.title}
                  </span>
                  <span className="mt-2 hidden lg:inline-flex items-center gap-1.5 text-xs text-mocha">
                    <Maximize2 className="w-3.5 h-3.5" /> Click to enlarge
                  </span>
                </div>
              </div>
            </button>
          );
        })}
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
  { 
    id: 'hall-vasishta', 
    number: '01',
    label: 'Hall Vasishta', 
    shortLabel: 'Vasishta',
    floor: '2nd Floor',
    capacity: '600 Seated (1,000 Floating)',
    tag: 'Flagship Kalyana Mandapam'
  },
  { 
    id: 'hall-agasthya', 
    number: '02',
    label: 'Hall Agasthya', 
    shortLabel: 'Agasthya',
    floor: '1st Floor',
    capacity: '350 Seated (500 Floating)',
    tag: 'Reception & Sangeet'
  },
  { 
    id: 'hall-koundinya', 
    number: '03',
    label: 'Hall Koundinya', 
    shortLabel: 'Koundinya',
    floor: '3rd Floor',
    capacity: '100–200 Guests',
    tag: 'Boutique Milestones'
  }
];

// Per-hall rich metadata & companion interior photographs
const HALL_META = {
  'hall-vasishta': {
    floor: '2nd Floor',
    hallBadge: 'Crown Flagship Kalyana Mandapam · 2nd Floor',
    capacityPill: '600 Seated · 1,000 Floating',
    caption: 'Double-Tier Golden Crystal Chandeliers & 70-ft Auspicious Bridal Aisle',
    chips: ['5,500+ Sq.Ft', 'Pillarless Span', 'Central Cassette A/C', '70-ft Bridal Aisle', '2 VIP Bride/Groom Suites'],
    counters: [
      { label: 'Theatre / Seated', target: 600, suffix: '', icon: Users },
      { label: 'Floating Reception', target: 1000, suffix: '+', icon: Sparkles },
      { label: 'Round-Table Banquet', target: 350, suffix: '', icon: UtensilsCrossed },
      { label: 'Floor Area', target: 5500, suffix: ' sq.ft', icon: Building }
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
    carouselText: 'Explore authentic traditional mandaps, carved pillars, reception stages, chandeliers, and ceremonial settings designed in Hall Vasishta.',
    companionPhotos: [
      {
        src: '/assets/05_hall_vasishta/hall_vasishta_stage_right_reflection_02.jpeg',
        title: 'Stage & Reflections',
        caption: 'High-gloss Italian vitrified reflections and Om mural'
      },
      {
        src: '/assets/06_main_hall_seating/main_hall_seating_lotus_stage_backdrop_07.jpeg',
        title: 'Lotus Stage Setup',
        caption: 'Auspicious Lotus Stage Backdrop & Central Crystal Chandelier'
      },
      {
        src: '/assets/06_main_hall_seating/main_hall_aisle_view_towards_stage.jpeg',
        title: '70-Ft Bridal Walk',
        caption: 'Regal central procession aisle looking towards the grand stage'
      }
    ]
  },
  'hall-agasthya': {
    floor: '1st Floor',
    hallBadge: 'Royal Sangeet & Reception Hall · 1st Floor',
    capacityPill: '200–350 Seated · 500 Floating',
    caption: 'Chandelier Perspective & Moving Head Theatrical Stage Lighting',
    chips: ['3,800 Sq.Ft', 'Acoustic Ceiling', 'Theatrical Stage Lighting', 'Central Multi-Zone A/C', '1 VIP Green Room'],
    counters: [
      { label: 'Theatre / Seated', target: 350, suffix: '', icon: Users },
      { label: 'Floating Reception', target: 500, suffix: '', icon: Sparkles },
      { label: 'Banquet Round-Table', target: 200, suffix: '', icon: UtensilsCrossed },
      { label: 'Floor Area', target: 3800, suffix: ' sq.ft', icon: Building }
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
    carouselText: 'Explore contemporary sangeet stages, neon floral arches, pastel boho setups, and dynamic event lighting designed in Hall Agasthya.',
    companionPhotos: [
      {
        src: '/assets/04_hall_agasthya/hall_agasthya_center_aisle_stage_view_03.jpeg',
        title: 'Central Aisle View',
        caption: 'Performance stage perspective with acoustic ceiling'
      },
      {
        src: '/assets/04_hall_agasthya/hall_agasthya_glass_entrance_doors_01.jpeg',
        title: 'Glass Double Doors',
        caption: 'Private grand entrance portal entering Hall Agasthya'
      },
      {
        src: '/assets/09_reception_engagement_stages/stage_better_together_neon_wide_shot.jpeg',
        title: 'Sangeet Party Stage',
        caption: 'Neon floral ring arch and dynamic stage lighting'
      }
    ]
  },
  'hall-koundinya': {
    floor: '3rd Floor',
    hallBadge: 'Milestone Celebrations & Boutique Banquet · 3rd Floor',
    capacityPill: '100–200 Guests',
    caption: 'Vertical Wood Slat Ceilings & Dedicated Milestone Celebration Stage',
    chips: ['2,200 Sq.Ft', 'Wood Slat Ceiling', 'Milestone Stage', 'Silent Cassette A/C', 'Family Waiting Lounge'],
    counters: [
      { label: 'Theatre / Seated', target: 200, suffix: '', icon: Users },
      { label: 'Floating Reception', target: 250, suffix: '', icon: Sparkles },
      { label: 'Banquet Round-Table', target: 120, suffix: '', icon: UtensilsCrossed },
      { label: 'Floor Area', target: 2200, suffix: ' sq.ft', icon: Building }
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
    carouselText: 'Explore authentic 1st birthday sunshine setups, traditional cradle ceremony (Barasala) lotus swings, and milestone family themes designed in Hall Koundinya.',
    companionPhotos: [
      {
        src: '/assets/06_hall_koundinya/hall_koundinya_mini_hall_stage_to_audience_02.jpeg',
        title: 'Stage to Audience',
        caption: 'Looking into comfortable dressed banquet seating'
      },
      {
        src: '/assets/06_hall_koundinya/hall_koundinya_mini_hall_sign_side_view_03.jpeg',
        title: 'Architectural View',
        caption: 'Boutique wood slat styling with official architectural signage'
      },
      {
        src: '/assets/10_cradle_and_birthday_decor/stage_cradle_naming_ceremony_lotus_swing.jpeg',
        title: 'Barasala Cradle Stage',
        caption: 'Traditional lotus swing naming ceremony stage installation'
      }
    ]
  }
};

/**
 * Grand Hall Interactive Showcase Component
 * Features:
 * - Dominant, commanding architectural presentation with luxury gold frame
 * - Multi-perspective instant switcher (Main Grand Overview + 3 Real Architectural Angles)
 * - Smooth crossfade transitions with Framer Motion
 * - Floating badges (Floor, Hall No., Capacity pill)
 * - Click-to-enlarge full-resolution lightbox trigger
 * - Mobile-optimized vertical presentation with touch-friendly perspective pills
 */
function HallInteractiveShowcase({ hall, meta, hallNumber, onOpenLightbox }) {
  const shouldReduce = useReducedMotion();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Combine main hall cover photograph + 3 verified companion interior perspectives
  const showcasePhotos = [
    {
      src: hall.hallImage || hall.image,
      title: `${hall.name} · Grand Overview`,
      caption: meta.caption,
      tag: 'Grand Interior'
    },
    ...(meta.companionPhotos || []).map((cp) => ({
      src: cp.src,
      title: `${hall.name} · ${cp.title}`,
      caption: cp.caption,
      tag: cp.title
    }))
  ];

  const currentPhoto = showcasePhotos[activePhotoIdx] || showcasePhotos[0];

  return (
    <div className="relative group w-full flex flex-col">
      {/* Primary Dominant Showcase Frame */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#D4AF37]/45 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-[#100205] w-full">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden">
          {/* Animated Image with Subtle Ken Burns / Smooth Crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.src}
              initial={{ opacity: 0, scale: shouldReduce ? 1 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.98 }}
              transition={{ duration: shouldReduce ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <ResponsiveImage
                src={currentPhoto.src}
                alt={currentPhoto.title}
                sizes="(max-width: 767px) 125vw, (max-width: 1024px) 100vw, 55vw"
                loading="lazy"
                className="w-full h-full object-cover select-none"
              />
            </motion.div>
          </AnimatePresence>

          {/* Cinematic Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#100205]/50 sm:from-[#100205] via-transparent sm:via-[#100205]/20 to-black/35 pointer-events-none" />
          <div className="hidden sm:block absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />

          {/* Architectural Gold Filigree Accent Corners (desktop/tablet) */}
          <div className="hidden sm:block absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="hidden sm:block absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="hidden sm:block absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="hidden sm:block absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-auto gap-2">
            {/* Hall Number & Floor Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#180307]/85 border border-[#D4AF37]/60 backdrop-blur-md shadow-lg">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#FFE57F] animate-pulse" />
              <span className="font-cinzel text-[10px] sm:text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] to-[#D4AF37] tracking-wider uppercase">
                Hall 0{hallNumber} · {meta.floor}
              </span>
            </div>

            {/* Quick Enlarge & Lightbox Trigger */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#180307]/85 border border-[#D4AF37]/50 text-amber-200 backdrop-blur-md shadow-lg">
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> {meta.capacityPill}
              </span>
              <button
                onClick={() => onOpenLightbox(showcasePhotos, activePhotoIdx, hall.name)}
                aria-label={`Enlarge ${currentPhoto.title} in high resolution`}
                className="group/btn flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#2C060F]/90 hover:bg-[#8A1828] border border-[#D4AF37]/70 text-amber-200 hover:text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37] group-hover/btn:text-white transition-colors" />
                <span className="text-[11px] font-bold uppercase tracking-wider hidden md:inline">Expand</span>
              </button>
            </div>
          </div>

          {/* Bottom Editorial Caption — overlaid on sm+ screens */}
          <div className="hidden sm:block absolute bottom-4 left-4 right-4 pointer-events-none">
            <div className="max-w-xl p-3 sm:p-4 rounded-xl bg-[#140205]/85 border border-[#D4AF37]/35 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{currentPhoto.title}</span>
              </div>
              <p className="mt-1 font-cinzel text-xs sm:text-sm font-semibold text-[#FFFDF5] leading-snug drop-shadow line-clamp-2">
                {currentPhoto.caption}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Caption Strip Below Photo — keeps 100% of the photo unobstructed on phones */}
        <div className="sm:hidden px-3.5 py-2.5 bg-[#140205] border-t border-[#D4AF37]/30">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
            <Sparkles className="w-3 h-3 text-amber-300 flex-shrink-0" />
            <span className="truncate">{currentPhoto.title}</span>
          </div>
          <p className="mt-0.5 font-cinzel text-xs font-semibold text-[#FFFDF5] leading-snug line-clamp-1">
            {currentPhoto.caption}
          </p>
        </div>
      </div>

      {/* Multi-Angle Architectural Perspective Selector Rail */}
      <div className="mt-3.5 pt-1">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]/90 font-semibold flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#D4AF37]" /> Architectural Perspectives ({showcasePhotos.length} Views)
          </span>
          <span className="text-[10px] text-mocha">Click thumbnail to switch view</span>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {showcasePhotos.map((photo, pIdx) => {
            const isActive = pIdx === activePhotoIdx;
            return (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActivePhotoIdx(pIdx)}
                className={`group/thumb relative rounded-xl overflow-hidden border-2 transition-all duration-300 aspect-[16/10] text-left cursor-pointer ${
                  isActive
                    ? 'border-[#FFE57F] shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-[1.02]'
                    : 'border-[#D4AF37]/30 hover:border-[#D4AF37]/80 opacity-75 hover:opacity-100 hover:scale-[1.01]'
                }`}
                title={`Switch view: ${photo.tag}`}
              >
                <ResponsiveImage
                  src={photo.src}
                  alt={photo.tag}
                  sizes="(max-width: 640px) 25vw, 180px"
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isActive ? 'scale-105 brightness-105' : 'group-hover/thumb:scale-105 brightness-90'
                  }`}
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isActive
                      ? 'bg-gradient-to-t from-black/80 via-transparent to-transparent'
                      : 'bg-black/40 group-hover/thumb:bg-black/10'
                  }`}
                />
                {isActive && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFE57F] shadow-[0_0_6px_#FFE57F]" />
                )}
                <div className="absolute bottom-1.5 left-2 right-2">
                  <p
                    className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider truncate ${
                      isActive ? 'text-[#FFE57F]' : 'text-white/80'
                    }`}
                  >
                    {photo.tag}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function SpacesPage({ onOpenLightbox }) {
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
    const isReversed = hallNumber % 2 === 0;

    const specsWithIcons = [
      { label: 'Clear Span & Height', value: hall.specs?.ceilingHeight || meta.specFallback.ceilingHeight, icon: Layers },
      { label: 'Ceremony Stage', value: hall.specs?.stageDimensions || meta.specFallback.stageDimensions, icon: Sparkles },
      { label: 'Climate Control', value: hall.specs?.cooling || meta.specFallback.cooling, icon: Snowflake },
      { label: 'Flooring & Surface', value: hall.specs?.flooring || meta.specFallback.flooring, icon: Building },
      { label: 'VIP Green Rooms', value: hall.specs?.greenRooms || meta.specFallback.greenRooms, icon: DoorClosed },
      { label: meta.soundLabel, value: hall.specs?.[meta.specKey] || meta.specFallback.sound, icon: Zap }
    ];

    return (
      <motion.section
        key={hall.id}
        id={hall.id}
        aria-label={`${hall.name} showcase`}
        initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 0.75, ease: easeLuxury }}
        className="py-16 sm:py-24 scroll-mt-36 border-b border-[#D4AF37]/20 relative"
      >
        <div className="w-full max-w-[96vw] xl:max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
          {/* Main Hero Grid: Alternating Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
            {/* Image Showcase Column */}
            <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
              <HallInteractiveShowcase
                hall={hall}
                meta={meta}
                hallNumber={hallNumber}
                onOpenLightbox={openGalleryModal}
              />
            </div>

            {/* Hall Story & Quick Actions Column */}
            <div className={`lg:col-span-5 flex flex-col space-y-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
              {/* Category Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE57F] shadow-[0_0_6px_#FFE57F]" />
                <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-bold">
                  The Venue · Hall 0{hallNumber}
                </p>
              </div>

              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2C060F] border border-[#D4AF37]/45 text-amber-200 mb-3 shadow-md">
                  {meta.hallBadge}
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF5] via-[#F4E8C1] to-[#D4AF37]">
                  {hall.name}
                </h2>
                <p className="mt-2 font-cinzel text-sm sm:text-base text-amber-200/90 font-medium">
                  {hall.tagline}
                </p>
              </div>

              <div className="h-px w-24 bg-gradient-to-r from-[#D4AF37] to-transparent" />

              <p className="text-mocha text-sm sm:text-base leading-relaxed">
                {hall.shortDescription || hall.description}
              </p>

              {/* Verified Feature Chips */}
              <ul className="flex flex-wrap gap-2 pt-1">
                {meta.chips.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A050D] border border-[#D4AF37]/35 text-xs text-latte shadow-sm"
                  >
                    <Check className="w-3 h-3 text-[#D4AF37]" />
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>

              {/* Direct Booking & Venue Actions */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link to="/contact" className="btn-gold shadow-lg shadow-amber-950/50">
                  <span>Schedule Hall Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <WhatsAppButton
                  label="WhatsApp Venue"
                  message={`Hello SS Convention, I would like to enquire about reserving ${hall.name} on the ${meta.floor}.`}
                />
                <CallButton label="Direct Call" />
              </div>
            </div>
          </div>

          {/* Capacities Section */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-cinzel text-lg sm:text-xl font-bold tracking-wide text-latte">
                  Hall Seating & Guest Capacities
                </h3>
              </div>
              <span className="text-xs text-amber-300/80 font-semibold tracking-wider uppercase hidden sm:inline">
                {meta.floor} Allocation
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {meta.counters.map((c) => {
                const IconComponent = c.icon || Users;
                return (
                  <div
                    key={c.label}
                    className="group relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#2D060F] via-[#22040B] to-[#180307] border border-[#D4AF37]/35 shadow-xl hover:border-[#D4AF37]/70 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="p-2 rounded-lg bg-[#3D0A14] border border-[#D4AF37]/30 text-[#D4AF37]">
                        <IconComponent className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-amber-300/70 font-semibold">
                        Verified
                      </span>
                    </div>
                    <div className="font-cinzel text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF5] to-[#D4AF37] tabular-nums">
                      <AnimatedCounter target={c.target} suffix={c.suffix} shouldReduce={shouldReduce} />
                    </div>
                    <div className="mt-1 text-xs tracking-[0.18em] uppercase text-mocha font-medium">
                      {c.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide">
                    Architectural & Engineering Specifications
                  </h3>
                </div>
                <p className="mt-1 text-xs text-mocha">
                  Comprehensive structural and utility details for {hall.name} ({meta.floor})
                </p>
              </div>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-[#D4AF37] to-transparent mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {specsWithIcons.map(({ label, value, icon: IconComponent }) => (
                <div
                  key={label}
                  className="rounded-xl p-4 sm:p-5 bg-[#20040A]/85 border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 transition-colors shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="p-1.5 rounded-md bg-[#350710] border border-[#D4AF37]/30 text-amber-300">
                      <IconComponent className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-amber-300 font-bold">
                      {label}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-mocha leading-relaxed pl-8">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Hall Photography Exhibition */}
          <HallGalleryStrip
            hallName={hall.name}
            eyebrow={meta.carouselEyebrow}
            heading="Celebrations, Beautifully Designed."
            description={meta.carouselText}
            images={hall.gallery}
            onOpenLightbox={openGalleryModal}

          />
        </div>
      </motion.section>
    );
  };

  return (
    <div className="bg-[#450B17] text-latte min-h-screen overflow-x-clip selection:bg-[#C5A059] selection:text-[#0D0204]">
      <SEO
        title="Wedding & Function Halls in Meerpet | S.S. Convention Hyderabad"
        description="Explore 3 luxury air-conditioned halls at S.S. Convention in Meerpet, Hyderabad: Hall Vasishta (600 guests), Hall Agasthya (350 guests), and Hall Koundinya (150 guests) with separate dining."
        keywords="Function Halls in Meerpet, Wedding Venue in Hyderabad, Wedding Halls in Meerpet, Marriage Halls in Hyderabad, Banquet Halls in Meerpet, AC Function Halls in Hyderabad, Function Halls in LB Nagar, Marriage Halls in Badangpet, Banquet Halls in Almasguda, Function Halls in Jillelaguda"
        canonical="/spaces"
      />
      {/* Hero */}
      <section className="relative min-h-[42vh] sm:min-h-[55vh] flex items-end pt-24 pb-10 sm:pt-32 sm:pb-14 border-b border-[#D4AF37]/30">
        {/* Slowly scrolling strip of venue photos */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="flex h-full w-max animate-marquee-x">
            {[...HERO_PHOTOS, ...HERO_PHOTOS].map((src, i) => (
              <ResponsiveImage key={i} src={src} alt="S.S. Convention wedding and function hall interior view" sizes="(max-width: 640px) 130vw, (max-width: 1024px) 60vw, 28vw" loading={i < 4 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : undefined} decoding={i === 0 ? 'sync' : 'async'} draggable={false} className="h-full w-[86vw] sm:w-[46vw] lg:w-[28vw] flex-shrink-0 object-cover" />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A060E] via-black/40 sm:via-black/20 to-black/25 sm:to-black/10" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeLuxury }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">
              {'Wedding & Banquet Halls · Meerpet'}
            </p>
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide leading-[1.1]">
              {'Wedding & Function Halls in Meerpet'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#EED9A6] to-[#C5A059] text-xl sm:text-3xl lg:text-4xl mt-2">
                {'Three Distinct Halls at S.S. Convention, Hyderabad'}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-mocha leading-relaxed">
              {'Explore the spaces designed to bring your most memorable celebrations to life.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upgraded Luxury Hall Switcher Navigation */}
      <div
        id="hall-tabs"
        className={`sticky top-[68px] sm:top-[74px] z-30 w-full py-2.5 sm:py-3 px-3 sm:px-6 bg-[#120205]/92 backdrop-blur-2xl border-b border-[#D4AF37]/35 shadow-[0_10px_35px_rgba(0,0,0,0.7)] transition-transform duration-300 ${
          subnavVisible ? 'translate-y-0' : '-translate-y-[calc(100%+80px)] pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Venue Hall Indicator Badge (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 text-xs text-amber-200/90 font-cinzel tracking-wider border-r border-[#D4AF37]/30 pr-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-bold text-latte">3 Distinct Halls</span>
          </div>

          {/* Interactive Tabs Rail with Spring Motion Capsule */}
          <nav aria-label="Halls navigation" className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto no-scrollbar py-1 flex-1 sm:flex-initial">
            {HALL_TABS.map((t, i) => {
              const isActive = activeNav === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => scrollToSection(t.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-cinzel tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 group cursor-pointer ${
                    isActive
                      ? 'text-[#FFFDF5] font-bold shadow-lg'
                      : 'text-mocha hover:text-[#FFFDF5] hover:bg-white/5'
                  }`}
                >
                  {/* Active Tab Sliding Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-hall-capsule"
                      className="absolute inset-0 bg-gradient-to-r from-[#8A1828] via-[#5F1524] to-[#3D0A14] rounded-full border border-[#D4AF37]/80 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}

                  {/* Number Badge */}
                  <span
                    className={`relative z-10 text-[10px] sm:text-xs font-mono font-semibold px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-[#FFE57F]/25 text-[#FFE57F] border border-[#FFE57F]/40'
                        : 'text-amber-300/60 group-hover:text-amber-300'
                    }`}
                  >
                    0{i + 1}
                  </span>

                  {/* Hall Title and Metadata */}
                  <span className="relative z-10 flex flex-col items-start leading-none">
                    <span className={`transition-colors ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF5] to-[#D4AF37]' : ''}`}>
                      {t.label}
                    </span>
                    <span className="hidden md:inline-block text-[9px] text-amber-200/70 tracking-normal font-sans mt-0.5">
                      {t.floor} · {t.capacity.split(' ')[0]} guests
                    </span>
                  </span>

                  {/* Active Pulsing Dot */}
                  {isActive && (
                    <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#FFE57F] shadow-[0_0_6px_#FFE57F] animate-pulse ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Desktop Quick CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection('enquire-cta')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-cinzel font-bold text-amber-200 hover:text-white bg-[#30050E] hover:bg-[#450B17] border border-[#D4AF37]/50 shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Book Visit</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
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
            <WhatsAppButton message="Hello SS Convention, I would like to enquire about hall availability and booking." />
            <CallButton />
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