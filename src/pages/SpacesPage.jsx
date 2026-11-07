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
 * Luxury Cinematic Wedding Photography Exhibition Carousel
 * - Ambient Theater Backlight Glow (radiates the warm colors of the active stage)
 * - Cinema Scope Aspect with Integrated Royal Frosted-Glass Caption Scrim
 * - Prev/Next Directional Sliding Animation with 700ms Luxury Easing
 * - Floating Auspicious Dock containing 5s Progress Bar + Thumbnails
 * - Manual Play/Pause Toggle + Fullscreen Lightbox Integration
 * - Single-window vertical footprint with zero clipping
 */
function LuxuryCinematicHallCarousel({
  hallName,
  eyebrow,
  heading,
  description,
  images = [],
  onOpenLightbox,
  lang = 'en'
}) {
  const shouldReduce = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef(null);

  const total = images.length;
  const currentImage = images[currentIndex] || images[0] || {};

  // 5-second Autoplay with progress bar (resets on change, pauses on hover or manual pause)
  useEffect(() => {
    if (isPaused || isHovered || shouldReduce || total <= 1) return;

    const intervalTime = 50; // ms
    const step = (intervalTime / 5000) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setDirection(1);
          setCurrentIndex((curr) => (curr + 1) % total);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, isHovered, shouldReduce, total]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  };

  const handleSelectIndex = (idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPaused((prev) => !prev);
  };

  // Touch Swipe for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  // 700ms slide variants with luxury easing
  const slideVariants = {
    enter: (dir) => ({
      x: shouldReduce ? 0 : dir > 0 ? '100%' : '-100%',
      opacity: shouldReduce ? 0 : 0.2,
      scale: shouldReduce ? 1 : 1.04
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { duration: shouldReduce ? 0.1 : 0.7, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: shouldReduce ? 0.1 : 0.35 },
        scale: { duration: shouldReduce ? 0.1 : 0.7, ease: [0.16, 1, 0.3, 1] }
      }
    },
    exit: (dir) => ({
      x: shouldReduce ? 0 : dir > 0 ? '-100%' : '100%',
      opacity: shouldReduce ? 0 : 0.2,
      scale: shouldReduce ? 1 : 0.98,
      transition: {
        x: { duration: shouldReduce ? 0.1 : 0.7, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: shouldReduce ? 0.1 : 0.3 }
      }
    })
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="w-full mx-auto focus:outline-none select-none relative"
    >
      {/* 1. Ambient Theatre Backlight Glow (Radiates the warm colors of the active stage) */}
      <div 
        className="absolute inset-0 -m-6 sm:-m-12 rounded-3xl overflow-hidden pointer-events-none opacity-45 blur-3xl transition-all duration-1000 ease-out"
        aria-hidden="true"
      >
        <img 
          src={currentImage.src} 
          alt="" 
          className="w-full h-full object-cover scale-110 filter saturate-150" 
        />
      </div>

      {/* 2. Grand Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-2.5 sm:mb-3.5 px-1">
        <div>
          <span className="text-xs sm:text-sm font-bold tracking-[0.24em] text-champagne-gold uppercase block mb-1">
            {eyebrow || `${hallName.toUpperCase()} · CINEMATIC EXHIBITION`}
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-ivory tracking-wide leading-tight">
            {heading || 'Celebrations, Beautifully Designed.'}
          </h3>
          {description && (
            <p className="text-luxury-parchment/85 text-xs sm:text-sm font-light mt-1">
              {description}
            </p>
          )}
        </div>

        {/* Exhibition Counter & Play/Pause Controls */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={togglePlayPause}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-palace-obsidian/85 border border-champagne-hairline hover:border-champagne-gold text-champagne-light text-xs font-semibold tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer shadow-md"
            title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>Play</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-champagne-gold fill-champagne-gold" />
                <span className="text-[11px] text-champagne-light">{isHovered ? 'Paused' : '5s Auto'}</span>
              </>
            )}
          </button>

          <div className="font-cinzel text-sm sm:text-base font-bold text-champagne-light tracking-widest px-4 py-1.5 rounded-full bg-palace-obsidian/90 border border-champagne-hairline shadow-md">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-luxury-parchment/40 mx-1">/</span>
            <span className="text-luxury-parchment/70">{String(total).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* 3. Grand Cinema Scope Stage (Screen-Full Immersion ~72vh height, up to 1600px width) */}
      <div className="relative group z-10">
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => onOpenLightbox(images, currentIndex, hallName)}
          className="relative h-[60vh] sm:h-[66vh] md:h-[70vh] lg:h-[72vh] min-h-[440px] max-h-[740px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-champagne-hairline/80 shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-palace-obsidian cursor-pointer ring-1 ring-champagne-gold/30"
          title="Click to view full screen"
        >
          {/* Animated Image Slide with Ken Burns Micro Push */}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentImage.src}
                alt={currentImage.title}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Top Badges (Category & Fullscreen Zoom) */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full bg-palace-obsidian/85 border border-champagne-gold/50 text-champagne-gold text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-md pointer-events-auto">
              {currentImage.category}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenLightbox(images, currentIndex, hallName);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-palace-obsidian/85 hover:bg-champagne-gold hover:text-palace-obsidian text-champagne-light border border-champagne-hairline text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg transition-all cursor-pointer pointer-events-auto"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exhibition View</span>
            </button>
          </div>

          {/* Integrated Frosted Glass Caption Veil (Generous & High-Contrast) */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-5 sm:p-7 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-[3px] pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
                transition={{
                  duration: shouldReduce ? 0.1 : 0.4,
                  delay: shouldReduce ? 0 : 0.08,
                  ease: 'easeOut'
                }}
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-2"
              >
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] text-champagne-gold block drop-shadow mb-0.5">
                    {hallName} · AUTHENTIC VENUE RECORD
                  </span>
                  <h4 className="font-cinzel text-lg sm:text-2xl md:text-3xl font-bold text-luxury-ivory tracking-wide leading-tight drop-shadow-md">
                    {currentImage.title}
                  </h4>
                </div>

                <div className="text-xs sm:text-sm text-luxury-parchment font-light flex items-center gap-1.5 drop-shadow flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-champagne-light" />
                  <span>Click to view in 4K resolution</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Side Navigation Arrows (Docked inside frame for wide layout) */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous decoration photograph"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-palace-obsidian/90 hover:bg-[#3D0A14] border-2 border-champagne-gold/60 hover:border-champagne-gold text-champagne-gold hover:text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next decoration photograph"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-palace-obsidian/90 hover:bg-[#3D0A14] border-2 border-champagne-gold/60 hover:border-champagne-gold text-champagne-gold hover:text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
          </>
        )}
      </div>

      {/* 4. Auspicious Floating Dock (Widescreen Segmented Progress Bar + Generous Thumbnails) */}
      <div className="relative z-10 mt-2.5 sm:mt-3 p-2.5 sm:p-3 rounded-2xl bg-palace-obsidian/95 backdrop-blur-xl border border-champagne-hairline/80 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex flex-col gap-2 w-full mx-auto">
        {/* Minimal 5-Second Segmented Progress Bar */}
        <div className="w-full flex items-center gap-1.5 px-1">
          {images.map((_, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectIndex(idx)}
              className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden cursor-pointer relative transition-colors hover:bg-white/20"
              title={`View photo ${idx + 1}`}
            >
              {idx === currentIndex ? (
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-champagne-gold to-amber-500 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              ) : idx < currentIndex ? (
                <div className="h-full bg-champagne-gold/60 w-full" />
              ) : null}
            </div>
          ))}
        </div>

        {/* Generous Widescreen Thumbnail Strip Below for Direct Navigation */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 overflow-x-auto py-1 no-scrollbar">
          {images.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => handleSelectIndex(idx)}
                className={`relative flex-shrink-0 w-20 h-13 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-champagne-gold scale-105 shadow-[0_0_20px_rgba(212,175,55,0.65)] ring-2 ring-champagne-gold/60'
                    : 'border-white/20 opacity-60 hover:opacity-95 hover:border-champagne-hairline'
                }`}
                title={img.title}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
                {isActive && (
                  <div className="absolute inset-0 bg-champagne-gold/15 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * MASTER SPACES / OUR VENUE PAGE
 * Luxury Architectural Showcase for Hall Vasishta, Hall Agasthya, and Hall Koundinya
 */
export default function SpacesPage({ onOpenLightbox, lang = 'en' }) {
  const shouldReduce = useReducedMotion();

  // Active hall tracking for sticky navigator
  const [activeNav, setActiveNav] = useState('hall-vasishta');

  // Smart auto-hide on scroll down, show on scroll up for Our Venues sub-navbar
  const [subnavVisible, setSubnavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const SCROLL_THRESHOLD = 10;

  // Lightbox state
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    hallName: '',
    images: [],
    currentIndex: 0
  });

  // Retrieve hall data from spacesData
  const vasishta = spacesData.find((h) => h.id === 'hall-vasishta') || spacesData[0];
  const agasthya = spacesData.find((h) => h.id === 'hall-agasthya') || spacesData[1];
  const koundinya = spacesData.find((h) => h.id === 'hall-koundinya') || spacesData[2];

  // Open internal multi-image lightbox
  const openGalleryModal = (images, index, hallName) => {
    setLightboxState({
      isOpen: true,
      hallName,
      images,
      currentIndex: index
    });
  };

  const closeGalleryModal = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleNextPhoto = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  const handlePrevPhoto = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  // Scroll spy to highlight active hall + Smart auto-hide for sub-navigator
  useEffect(() => {
    const handleScroll = () => {
      // 1. Scrollspy for active hall pill
      const sections = ['hall-vasishta', 'hall-agasthya', 'hall-koundinya', 'enquire-cta'];
      const scrollPos = window.scrollY + 300;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNav(sections[i]);
          break;
        }
      }

      // 2. Smart auto-hide on scroll down, reveal on scroll up
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = Math.max(0, window.scrollY);
          const prevScrollY = lastScrollY.current;
          const diff = currentScrollY - prevScrollY;

          // Always visible at the top of the page
          if (currentScrollY <= 20) {
            setSubnavVisible(true);
            lastScrollY.current = currentScrollY;
            ticking.current = false;
            return;
          }

          // Ignore micro-scroll jitter (< 10px)
          if (Math.abs(diff) < SCROLL_THRESHOLD) {
            ticking.current = false;
            return;
          }

          // Scroll DOWN -> smoothly slide up and hide
          if (diff > 0 && currentScrollY > 80) {
            setSubnavVisible(false);
          }
          // Scroll UP -> smoothly slide down and reveal
          else if (diff < 0) {
            setSubnavVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Motion easings
  const easeLuxury = [0.22, 1, 0.36, 1];

  return (
    <div className="bg-[#1C0409] text-luxury-ivory min-h-screen selection:bg-champagne-gold selection:text-palace-obsidian">
      {/* ========================================================
          PART 1 – CINEMATIC PAGE INTRODUCTION HERO
          ======================================================== */}
      <section
        id="hero-spaces"
        aria-label="Discover Our Venue"
        className="relative h-[88vh] sm:h-[92vh] min-h-[580px] max-h-[920px] w-full overflow-hidden flex items-center justify-center"
      >
        {/* Background Image with 9s Linear Settle Animation */}
        <motion.div
          initial={{ scale: shouldReduce ? 1.0 : 1.06 }}
          animate={{ scale: 1.0 }}
          transition={{
            duration: shouldReduce ? 0 : 9,
            ease: 'linear'
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg"
            alt="S.S. Convention – Grand Hall Vasishta Overview"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Multi-Layer Cinematic Charcoal & Velvet Vignette Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1C0409] via-[#0D0204]/75 to-[#0D0204]/70 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-radial-gradient from-transparent via-[#0D0204]/40 to-[#0D0204]/90 pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduce ? 0.2 : 0.5,
              delay: shouldReduce ? 0 : 0.2,
              ease: 'easeOut'
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-palace-obsidian/75 border border-champagne-hairline/80 text-champagne-gold text-xs sm:text-[13px] font-semibold tracking-[0.22em] uppercase mb-6 backdrop-blur-md shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne-light" />
            <span>
              {lang === 'te'
                ? 'ఎస్.ఎస్ కన్వెన్షన్ · మీర్‌పేట్, హైదరాబాద్'
                : 'DISCOVER OUR VENUE'}
            </span>
          </motion.div>

          {/* Main Heading – Line-by-Line Reveal */}
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.06em] text-luxury-ivory leading-[1.15] sm:leading-[1.12] mb-6">
            {/* Line 1 */}
            <span className="block overflow-hidden py-1">
              <motion.span
                initial={{ y: shouldReduce ? 0 : 35, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: shouldReduce ? 0.2 : 0.85,
                  delay: shouldReduce ? 0 : 0.3,
                  ease: easeLuxury
                }}
                className="block drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
              >
                {lang === 'te' ? 'మూడు విశిష్ట వేదికలు.' : 'Three Unique Spaces.'}
              </motion.span>
            </span>

            {/* Line 2 */}
            <span className="block overflow-hidden py-1">
              <motion.span
                initial={{ y: shouldReduce ? 0 : 35, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: shouldReduce ? 0.2 : 0.85,
                  delay: shouldReduce ? 0 : 0.43,
                  ease: easeLuxury
                }}
                className="block text-champagne-light drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
              >
                {lang === 'te' ? 'అంతులేని సంబరాలు.' : 'Endless Celebrations.'}
              </motion.span>
            </span>
          </h1>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduce ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduce ? 0.2 : 0.65,
              delay: shouldReduce ? 0 : 0.6,
              ease: 'easeOut'
            }}
            className="text-luxury-parchment/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8 drop-shadow"
          >
            {lang === 'te'
              ? 'మీ జీవితంలోని అత్యంత మధురమైన వేడుకలను రాచరిక వైభవంతో సాకారం చేసే మూడు విశాలమైన కళ్యాణ మండపాలు మరియు ప్రత్యేక డైనింగ్ ఫ్లోర్‌ను అన్వేషించండి.'
              : 'Explore the spaces designed to bring your most memorable celebrations to life.'}
          </motion.p>

          {/* Quick Jump Pills for Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="hidden sm:flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => scrollToSection('hall-vasishta')}
              className="px-4 py-2 rounded-full border border-champagne-hairline/80 bg-palace-obsidian/60 text-xs text-luxury-ivory hover:border-champagne-gold hover:text-champagne-light backdrop-blur-md transition-all font-medium tracking-wider"
            >
              01 · Hall Vasishta (600+)
            </button>
            <button
              onClick={() => scrollToSection('hall-agasthya')}
              className="px-4 py-2 rounded-full border border-champagne-hairline/80 bg-palace-obsidian/60 text-xs text-luxury-ivory hover:border-champagne-gold hover:text-champagne-light backdrop-blur-md transition-all font-medium tracking-wider"
            >
              02 · Hall Agasthya (350+)
            </button>
            <button
              onClick={() => scrollToSection('hall-koundinya')}
              className="px-4 py-2 rounded-full border border-champagne-hairline/80 bg-palace-obsidian/60 text-xs text-luxury-ivory hover:border-champagne-gold hover:text-champagne-light backdrop-blur-md transition-all font-medium tracking-wider"
            >
              03 · Hall Koundinya (200)
            </button>
          </motion.div>
        </div>

        {/* Subtle Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          onClick={() => scrollToSection('hall-vasishta')}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer text-champagne-gold/70 hover:text-champagne-light transition-colors group"
        >
          <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-champagne-gold/80 group-hover:text-champagne-light">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-champagne-gold" />
        </motion.div>
      </section>

      {/* ========================================================
          STICKY MINIMAL NAVIGATOR PILL (DESKTOP & TABLET)
          Smart Auto-Hide on Scroll Down, Reveal on Scroll Up
          ======================================================== */}
      <div
        className={`sticky top-[68px] sm:top-[72px] z-30 w-full py-2.5 px-4 bg-[#1C0409]/95 backdrop-blur-xl border-y border-champagne-hairline/50 shadow-md transform transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-none ${
          subnavVisible
            ? 'translate-y-0 pointer-events-auto'
            : '-translate-y-[calc(100%+80px)] pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-champagne-gold flex-shrink-0">
            <Building className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Our Venues:</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {[
              { id: 'hall-vasishta', label: '01 · Hall Vasishta' },
              { id: 'hall-agasthya', label: '02 · Hall Agasthya' },
              { id: 'hall-koundinya', label: '03 · Hall Koundinya' }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => scrollToSection(nav.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wider transition-all whitespace-nowrap ${
                  activeNav === nav.id
                    ? 'bg-champagne-gold text-palace-obsidian font-bold shadow-md'
                    : 'text-luxury-parchment/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('enquire-cta')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-palace-wine border border-champagne-hairline text-champagne-light text-xs font-bold tracking-wider hover:border-champagne-gold transition-colors flex-shrink-0"
          >
            <span>Enquire</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ========================================================
          PART 2 – HALL 01: HALL VASISHTA SHOWCASE
          Layout: Image LEFT (~58%), Text & Specs RIGHT
          ======================================================== */}
      <section
        id="hall-vasishta"
        aria-label="Hall Vasishta Showcase"
        className="py-20 sm:py-28 relative overflow-hidden"
      >
        <div className="w-full max-w-[96vw] xl:max-w-[1440px] 2xl:max-w-[1620px] mx-auto px-2 sm:px-4 lg:px-6">
          {/* SECTION A – HALL INTRODUCTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
            {/* LEFT: Dominant High-Quality Photograph (58% desktop width = 7 columns) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, ease: easeLuxury }}
              className="lg:col-span-7 group relative"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-champagne-hairline shadow-2xl bg-palace-obsidian aspect-[16/10] sm:aspect-[16/10]">
                <img
                  src={vasishta.hallImage || vasishta.image}
                  alt="Hall Vasishta – Grand Kalyana Mandapam"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Lightbox Zoom Trigger */}
                <button
                  onClick={() => openGalleryModal(vasishta.gallery, 0, vasishta.name)}
                  aria-label="Enlarge Hall Vasishta Photograph"
                  className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-palace-obsidian/80 border border-champagne-gold/50 text-champagne-gold flex items-center justify-center hover:bg-champagne-gold hover:text-palace-obsidian transition-all backdrop-blur-md shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Capacity Pill Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-palace-obsidian/85 border border-champagne-gold/50 text-champagne-light backdrop-blur-md shadow-md flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-champagne-gold" />
                    <span>600 Seated · 1,000 Floating</span>
                  </span>
                </div>

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-4 left-6 right-6 z-10">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-champagne-gold uppercase block mb-1">
                    GENUINE INTERIOR PHOTOGRAPHY
                  </span>
                  <p className="font-cinzel text-base sm:text-lg font-bold text-luxury-ivory drop-shadow">
                    Double-Tier Crystal Chandeliers & 70-ft Auspicious Bridal Aisle
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Editorial Hall Presentation (5 columns) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, delay: 0.15, ease: easeLuxury }}
              className="lg:col-span-5 flex flex-col justify-center space-y-5"
            >
              {/* Eyebrow / Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palace-wine border border-champagne-hairline text-champagne-gold text-xs font-bold tracking-[0.2em] uppercase w-fit">
                <span>THE VENUE · HALL 01</span>
              </div>

              {/* Hall Title */}
              <div>
                <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-ivory tracking-wide leading-tight mb-2">
                  {vasishta.name}
                </h2>
                <p className="text-champagne-light font-cinzel text-sm sm:text-base font-semibold tracking-wider">
                  {vasishta.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-luxury-parchment/90 text-sm sm:text-base leading-relaxed font-light">
                {vasishta.shortDescription || vasishta.description}
              </p>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  '5,500+ Sq.Ft',
                  'Pillarless Span',
                  'Central Cassette A/C',
                  '70-ft Bridal Aisle',
                  '2 VIP Bride/Groom Suites'
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-palace-velvet border border-champagne-hairline/60 text-[11px] font-medium text-champagne-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-champagne-gold to-amber-500 text-palace-obsidian font-cinzel font-bold text-xs uppercase tracking-[0.16em] hover:scale-105 transition-all shadow-lg"
                >
                  <span>Book Hall Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/${venueData.whatsappNumber}?text=Hello%20SS%20Convention,%20I%20would%20like%20to%20enquire%20about%20booking%20Hall%20Vasishta.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-champagne-hairline bg-palace-velvet text-champagne-gold hover:text-white hover:border-champagne-gold font-cinzel font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* SECTION B – SPECIFICATIONS & CAPACITIES GRID */}
          <div className="bg-palace-velvet rounded-2xl sm:rounded-3xl border border-champagne-hairline p-6 sm:p-10 mb-16 sm:mb-20 shadow-xl">
            {/* Capacities Strip with Animated Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 mb-8 border-b border-champagne-hairline/60 text-center">
              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Theatre / Seated
                </span>
                <div className="text-2xl sm:text-3xl font-bold">
                  <AnimatedCounter target={600} suffix=" Guests" shouldReduce={shouldReduce} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Floating Reception
                </span>
                <div className="text-2xl sm:text-3xl font-bold">
                  <AnimatedCounter target={1000} suffix="+ Guests" shouldReduce={shouldReduce} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Round-Table Banquet
                </span>
                <div className="text-2xl sm:text-3xl font-bold">
                  <AnimatedCounter target={350} suffix=" Guests" shouldReduce={shouldReduce} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Floor Area
                </span>
                <div className="text-2xl sm:text-3xl font-cinzel font-bold text-champagne-light">
                  5,500+ <span className="text-sm font-normal">sq.ft</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications Grid with Champagne Hairlines */}
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-luxury-ivory tracking-wider mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-champagne-gold" />
                <span>Hall Vasishta · Architectural & Technical Specifications</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Clear Span & Height
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {vasishta.specs?.ceilingHeight || '16 ft clear height with acoustic false ceiling'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Monumental Stage
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {vasishta.specs?.stageDimensions || '38 ft (W) × 18 ft (D) × 3.5 ft (H) – fits 40-member photo groups'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Climate Control
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {vasishta.specs?.cooling || 'Centralized Daikin Cassette A/C with high-CFM multi-point circulation'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Flooring Architecture
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {vasishta.specs?.flooring || 'High-gloss Italian vitrified mirror-finish tiles with zero glare'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    VIP Green Rooms
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {vasishta.specs?.greenRooms || '2 Executive VIP AC Suites (Bride & Groom) with vanity & attached washrooms'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Power Backup & Sound
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {vasishta.specs?.powerBackup || '100% DG Generator backup with 0-second blackout auto-transfer'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C – LUXURY CINEMATIC WEDDING PHOTOGRAPHY CAROUSEL */}
          <LuxuryCinematicHallCarousel
            hallName={vasishta.name}
            eyebrow="HALL VASISHTA · WEDDING DECOR EXHIBITION"
            heading="Celebrations, Beautifully Designed."
            description="Explore authentic traditional mandaps, carved pillars, reception stages, chandeliers, and ceremonial settings designed in Hall Vasishta."
            images={vasishta.gallery}
            onOpenLightbox={openGalleryModal}
            lang={lang}
          />
        </div>
      </section>

      {/* ========================================================
          ROYAL HALL TRANSITION DIVIDER 01 -> 02
          ======================================================== */}
      <div className="relative py-12 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />
          <div className="px-6 flex items-center gap-3">
            <span className="text-champagne-gold text-xs font-bold tracking-[0.25em] uppercase font-cinzel">
              HALL 01 / 03
            </span>
            <div className="w-2 h-2 rotate-45 border border-champagne-gold bg-palace-wine" />
            <span className="text-luxury-parchment/60 text-xs font-medium tracking-wider">
              NEXT: HALL AGASTHYA
            </span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />
        </div>
      </div>

      {/* ========================================================
          PART 2 – HALL 02: HALL AGASTHYA SHOWCASE
          Layout: Text & Specs LEFT, Image RIGHT (~58% desktop)
          ======================================================== */}
      <section
        id="hall-agasthya"
        aria-label="Hall Agasthya Showcase"
        className="py-20 sm:py-28 relative overflow-hidden bg-palace-wine/30"
      >
        <div className="w-full max-w-[96vw] xl:max-w-[1440px] 2xl:max-w-[1620px] mx-auto px-2 sm:px-4 lg:px-6">
          {/* SECTION A – HALL INTRODUCTION (ALTERNATING COMPOSITION) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
            {/* LEFT on Desktop: Editorial Hall Presentation (5 columns) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, ease: easeLuxury }}
              className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-5"
            >
              {/* Eyebrow / Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palace-wine border border-champagne-hairline text-champagne-gold text-xs font-bold tracking-[0.2em] uppercase w-fit">
                <span>THE VENUE · HALL 02</span>
              </div>

              {/* Hall Title */}
              <div>
                <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-ivory tracking-wide leading-tight mb-2">
                  {agasthya.name}
                </h2>
                <p className="text-champagne-light font-cinzel text-sm sm:text-base font-semibold tracking-wider">
                  {agasthya.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-luxury-parchment/90 text-sm sm:text-base leading-relaxed font-light">
                {agasthya.shortDescription || agasthya.description}
              </p>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  '3,800 Sq.Ft',
                  'Acoustic Ceiling',
                  'Theatrical Stage Lighting',
                  'Central Multi-Zone A/C',
                  '1 VIP Green Room'
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-palace-velvet border border-champagne-hairline/60 text-[11px] font-medium text-champagne-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-champagne-gold to-amber-500 text-palace-obsidian font-cinzel font-bold text-xs uppercase tracking-[0.16em] hover:scale-105 transition-all shadow-lg"
                >
                  <span>Book Hall Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/${venueData.whatsappNumber}?text=Hello%20SS%20Convention,%20I%20would%20like%20to%20enquire%20about%20booking%20Hall%20Agasthya.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-champagne-hairline bg-palace-velvet text-champagne-gold hover:text-white hover:border-champagne-gold font-cinzel font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </motion.div>

            {/* RIGHT on Desktop: Dominant High-Quality Photograph (7 columns = ~58%) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, delay: 0.15, ease: easeLuxury }}
              className="lg:col-span-7 order-1 lg:order-2 group relative"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-champagne-hairline shadow-2xl bg-palace-obsidian aspect-[16/10]">
                <img
                  src={agasthya.hallImage || agasthya.image}
                  alt="Hall Agasthya – Royal Sangeet & Reception Hall"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Lightbox Zoom Trigger */}
                <button
                  onClick={() => openGalleryModal(agasthya.gallery, 0, agasthya.name)}
                  aria-label="Enlarge Hall Agasthya Photograph"
                  className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-palace-obsidian/80 border border-champagne-gold/50 text-champagne-gold flex items-center justify-center hover:bg-champagne-gold hover:text-palace-obsidian transition-all backdrop-blur-md shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Capacity Pill Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-palace-obsidian/85 border border-champagne-gold/50 text-champagne-light backdrop-blur-md shadow-md flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-champagne-gold" />
                    <span>200–350 Seated · 500 Floating</span>
                  </span>
                </div>

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-4 left-6 right-6 z-10">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-champagne-gold uppercase block mb-1">
                    GENUINE INTERIOR PHOTOGRAPHY
                  </span>
                  <p className="font-cinzel text-base sm:text-lg font-bold text-luxury-ivory drop-shadow">
                    Chandelier Perspective & Theatrical Stage Lighting
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* SECTION B – SPECIFICATIONS & CAPACITIES GRID */}
          <div className="bg-palace-velvet rounded-2xl sm:rounded-3xl border border-champagne-hairline p-6 sm:p-10 mb-16 sm:mb-20 shadow-xl">
            {/* Capacities Strip with Animated Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 mb-8 border-b border-champagne-hairline/60 text-center">
              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Theatre / Seated
                </span>
                <div className="text-2xl sm:text-3xl font-bold">
                  <AnimatedCounter target={350} suffix=" Guests" shouldReduce={shouldReduce} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Floating Reception
                </span>
                <div className="text-2xl sm:text-3xl font-bold">
                  <AnimatedCounter target={500} suffix=" Guests" shouldReduce={shouldReduce} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Banquet Round-Table
                </span>
                <div className="text-2xl sm:text-3xl font-bold">
                  <AnimatedCounter target={200} suffix=" Guests" shouldReduce={shouldReduce} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Floor Area
                </span>
                <div className="text-2xl sm:text-3xl font-cinzel font-bold text-champagne-light">
                  3,800 <span className="text-sm font-normal">sq.ft</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications Grid with Champagne Hairlines */}
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-luxury-ivory tracking-wider mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-champagne-gold" />
                <span>Hall Agasthya · Architectural & Technical Specifications</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Clear Height & Ceilings
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {agasthya.specs?.ceilingHeight || '14 ft clear height with linear LED profiles'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Performance Stage
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {agasthya.specs?.stageDimensions || '28 ft (W) × 14 ft (D) × 2.5 ft (H) – DJ console & dance choreography'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Climate Control
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {agasthya.specs?.cooling || 'Central multi-zone climate control with rapid dance-floor cooling'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Flooring Architecture
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {agasthya.specs?.flooring || 'Polished Italian-style vitrified tiles for seamless dance performances'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    VIP Green Suite
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {agasthya.specs?.greenRooms || '1 Executive VIP Air-Conditioned Green Room with attached vanity'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Sound & Stage Lights
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {agasthya.specs?.acoustics || 'Studio-tuned acoustic false ceiling with DMX intelligent wash fixtures'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C – LUXURY CINEMATIC WEDDING PHOTOGRAPHY CAROUSEL */}
          <LuxuryCinematicHallCarousel
            hallName={agasthya.name}
            eyebrow="HALL AGASTHYA · SANGEET & RECEPTION EXHIBITION"
            heading="Celebrations, Beautifully Designed."
            description="Explore contemporary sangeet stages, neon floral arches, pastel boho setups, and dynamic event lighting designed in Hall Agasthya."
            images={agasthya.gallery}
            onOpenLightbox={openGalleryModal}
            lang={lang}
          />
        </div>
      </section>

      {/* ========================================================
          ROYAL HALL TRANSITION DIVIDER 02 -> 03
          ======================================================== */}
      <div className="relative py-12 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />
          <div className="px-6 flex items-center gap-3">
            <span className="text-champagne-gold text-xs font-bold tracking-[0.25em] uppercase font-cinzel">
              HALL 02 / 03
            </span>
            <div className="w-2 h-2 rotate-45 border border-champagne-gold bg-palace-wine" />
            <span className="text-luxury-parchment/60 text-xs font-medium tracking-wider">
              NEXT: HALL KOUNDINYA
            </span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />
        </div>
      </div>

      {/* ========================================================
          PART 2 – HALL 03: HALL KOUNDINYA SHOWCASE
          Layout: Image LEFT (~58%), Text & Specs RIGHT
          ======================================================== */}
      <section
        id="hall-koundinya"
        aria-label="Hall Koundinya Showcase"
        className="py-20 sm:py-28 relative overflow-hidden"
      >
        <div className="w-full max-w-[96vw] xl:max-w-[1440px] 2xl:max-w-[1620px] mx-auto px-2 sm:px-4 lg:px-6">
          {/* SECTION A – HALL INTRODUCTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
            {/* LEFT: Dominant High-Quality Photograph (7 columns = ~58%) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, ease: easeLuxury }}
              className="lg:col-span-7 group relative"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-champagne-hairline shadow-2xl bg-palace-obsidian aspect-[16/10]">
                <img
                  src={koundinya.hallImage || koundinya.image}
                  alt="Hall Koundinya – Intimate Banquet Hall"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Lightbox Zoom Trigger */}
                <button
                  onClick={() => openGalleryModal(koundinya.gallery, 0, koundinya.name)}
                  aria-label="Enlarge Hall Koundinya Photograph"
                  className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-palace-obsidian/80 border border-champagne-gold/50 text-champagne-gold flex items-center justify-center hover:bg-champagne-gold hover:text-palace-obsidian transition-all backdrop-blur-md shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Capacity Pill Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-palace-obsidian/85 border border-champagne-gold/50 text-champagne-light backdrop-blur-md shadow-md flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-champagne-gold" />
                    <span>100–200 Guests</span>
                  </span>
                </div>

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-4 left-6 right-6 z-10">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-champagne-gold uppercase block mb-1">
                    GENUINE INTERIOR PHOTOGRAPHY
                  </span>
                  <p className="font-cinzel text-base sm:text-lg font-bold text-luxury-ivory drop-shadow">
                    Central Aisle & Dedicated Milestone Celebration Stage
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Editorial Hall Presentation (5 columns) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, delay: 0.15, ease: easeLuxury }}
              className="lg:col-span-5 flex flex-col justify-center space-y-5"
            >
              {/* Eyebrow / Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palace-wine border border-champagne-hairline text-champagne-gold text-xs font-bold tracking-[0.2em] uppercase w-fit">
                <span>THE VENUE · HALL 03</span>
              </div>

              {/* Hall Title */}
              <div>
                <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-ivory tracking-wide leading-tight mb-2">
                  {koundinya.name}
                </h2>
                <p className="text-champagne-light font-cinzel text-sm sm:text-base font-semibold tracking-wider">
                  {koundinya.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-luxury-parchment/90 text-sm sm:text-base leading-relaxed font-light">
                {koundinya.shortDescription || koundinya.description}
              </p>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  '2,200 Sq.Ft',
                  'Wood Slat Ceiling',
                  'Milestone Stage',
                  'Silent Cassette A/C',
                  'Family Waiting Lounge'
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-palace-velvet border border-champagne-hairline/60 text-[11px] font-medium text-champagne-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-champagne-gold to-amber-500 text-palace-obsidian font-cinzel font-bold text-xs uppercase tracking-[0.16em] hover:scale-105 transition-all shadow-lg"
                >
                  <span>Book Hall Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/${venueData.whatsappNumber}?text=Hello%20SS%20Convention,%20I%20would%20like%20to%20enquire%20about%20booking%20Hall%20Koundinya.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-champagne-hairline bg-palace-velvet text-champagne-gold hover:text-white hover:border-champagne-gold font-cinzel font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* SECTION B – SPECIFICATIONS & CAPACITIES GRID */}
          <div className="bg-palace-velvet rounded-2xl sm:rounded-3xl border border-champagne-hairline p-6 sm:p-10 mb-16 sm:mb-20 shadow-xl">
            {/* Capacities Strip with Animated Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 mb-8 border-b border-champagne-hairline/60 text-center">
              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Theatre / Seated
                </span>
                <div className="text-2xl sm:text-3xl font-bold">
                  <AnimatedCounter target={200} suffix=" Guests" shouldReduce={shouldReduce} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Floating Reception
                </span>
                <div className="text-2xl sm:text-3xl font-bold">
                  <AnimatedCounter target={250} suffix=" Guests" shouldReduce={shouldReduce} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Banquet Seating
                </span>
                <div className="text-2xl sm:text-3xl font-bold">
                  <AnimatedCounter target={120} suffix=" Guests" shouldReduce={shouldReduce} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-palace-wine/60 border border-champagne-hairline/40">
                <span className="text-[10px] uppercase tracking-widest text-luxury-parchment/80 block mb-1">
                  Floor Area
                </span>
                <div className="text-2xl sm:text-3xl font-cinzel font-bold text-champagne-light">
                  2,200 <span className="text-sm font-normal">sq.ft</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications Grid with Champagne Hairlines */}
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-luxury-ivory tracking-wider mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-champagne-gold" />
                <span>Hall Koundinya · Architectural & Technical Specifications</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Wood Slat Ceiling
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {koundinya.specs?.ceilingHeight || '12.5 ft clear height with architectural vertical wood slats'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Milestone Stage
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {koundinya.specs?.stageDimensions || '20 ft (W) × 12 ft (D) × 2 ft (H) – dedicated cradle & cake platform'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Silent Climate Control
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {koundinya.specs?.cooling || 'Dual cassette air-conditioning engineered for whisper-silent operation'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Non-Slip Vitrified Floor
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {koundinya.specs?.flooring || 'Premium non-slip vitrified tiles safe for elderly relatives & toddlers'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Family Waiting Suite
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {koundinya.specs?.greenRooms || 'VIP waiting lounge with baby care conveniences & plush seating'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-palace-wine/40 border border-champagne-hairline/30 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-bold block">
                    Acoustics & Video
                  </span>
                  <p className="text-luxury-parchment/90 font-light">
                    {koundinya.specs?.acoustics || 'Linear wood ceiling dampening echo for crystal speech & family videos'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C – LUXURY CINEMATIC WEDDING PHOTOGRAPHY CAROUSEL */}
          <LuxuryCinematicHallCarousel
            hallName={koundinya.name}
            eyebrow="HALL KOUNDINYA · CELEBRATION EXHIBITION"
            heading="Celebrations, Beautifully Designed."
            description="Explore authentic 1st birthday sunshine setups, traditional cradle ceremony (Barasala) lotus swings, and milestone family themes designed in Hall Koundinya."
            images={koundinya.gallery}
            onOpenLightbox={openGalleryModal}
            lang={lang}
          />
        </div>
      </section>

      {/* ========================================================
          PART 5 – FINAL VENUE ENQUIRY CTA SECTION
          ======================================================== */}
      <section
        id="enquire-cta"
        aria-label="Enquire About S.S. Convention"
        className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-br from-[#2E060F] via-[#1C0409] to-[#0D0204] border-t border-champagne-hairline"
      >
        {/* Subtle Luxury Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne-gold/10 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-palace-obsidian/80 border border-champagne-hairline text-champagne-gold text-xs font-bold tracking-[0.24em] uppercase mb-5 backdrop-blur-sm shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-champagne-light" />
            <span>PLAN YOUR CELEBRATION</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold text-luxury-ivory tracking-wide leading-tight mb-5">
            Find the Perfect Space for Your Celebration.
          </h2>

          <p className="text-luxury-parchment/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-10">
            Tell us about your occasion and let our experienced venue directors help you choose the right hall, customize stage themes, and reserve auspicious muhurtham dates.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-champagne-gold to-amber-500 text-palace-obsidian font-cinzel font-bold text-xs sm:text-sm uppercase tracking-[0.18em] shadow-[0_10px_30px_rgba(197,160,89,0.3)] hover:scale-105 transition-all"
            >
              Enquire About Your Event
            </Link>

            <a
              href={`https://wa.me/${venueData.whatsappNumber}?text=Hello%20SS%20Convention,%20I%20would%20like%20to%20enquire%20about%20hall%20availability%20and%20booking.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-full border border-champagne-hairline bg-palace-velvet text-champagne-light hover:text-white hover:border-champagne-gold font-cinzel font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Booking Team</span>
            </a>

            <a
              href={`tel:${venueData.phones[0].raw}`}
              className="px-7 py-4 rounded-full border border-champagne-hairline/80 bg-palace-obsidian/60 text-luxury-ivory hover:border-champagne-gold font-cinzel font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-champagne-gold" />
              <span>Call: +91 89857 00044</span>
            </a>
          </div>

          {/* Quick Assurance Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-luxury-parchment/80 pt-4 border-t border-champagne-hairline/40 w-full max-w-3xl">
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-champagne-gold flex-shrink-0" />
              <span>3 Halls + Dining Floor</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Snowflake className="w-4 h-4 text-champagne-gold flex-shrink-0" />
              <span>Central Cassette A/C</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-champagne-gold flex-shrink-0" />
              <span>100% DG Power Backup</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Car className="w-4 h-4 text-champagne-gold flex-shrink-0" />
              <span>150+ Car Parking</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FULLSCREEN INTERACTIVE LIGHTBOX MODAL
          ======================================================== */}
      <HallDecorationLightbox
        isOpen={lightboxState.isOpen}
        images={lightboxState.images}
        currentIndex={lightboxState.currentIndex}
        onClose={closeGalleryModal}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        onSelectIndex={(idx) =>
          setLightboxState((prev) => ({ ...prev, currentIndex: idx }))
        }
        hallName={lightboxState.hallName}
      />
    </div>
  );
}
