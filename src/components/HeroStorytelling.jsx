import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, ArrowRight, Users, Snowflake, UtensilsCrossed, Building, ChevronDown, Music2 } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { whatsappLink } from '../lib/contact';
import ResponsiveImage from './ResponsiveImage';

const loadHeroConsole = () => import('./HeroConsole');
const HeroConsole = lazy(loadHeroConsole);

export default function HeroStorytelling({ onOpenLightbox, isEntranceComplete = false }) {
  const [selectedSlideOverride, setSelectedSlideOverride] = useState(null);
  const [isTempleAudioActive, setIsTempleAudioActive] = useState(false);
  const audioContextRef = useRef(null);
  const audioOscillatorsRef = useRef([]);

  const banquetShowcaseOptions = [
    {
      id: 'hall-vasishta',
      title: 'Hall Vasishta – Grand Kalyana Mandapam (600 Pax)',
      shortTitle: 'Grand Kalyana Mandapam',
      badge: 'Premier Hall',
      src: '/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg',
      desc: 'Double-tier crystal chandeliers, Italian vitrified reflections & 70-ft bridal walk.'
    },
    {
      id: 'dining-hall',
      title: 'Royal Banquet Dining Hall (250+ Seats)',
      shortTitle: 'Royal Banquet Floor',
      badge: '250+ Seats',
      src: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg',
      desc: 'Round banquet tables in royal maroon & gold damask with golden organza chair ties.'
    },
    {
      id: 'hall-agasthya',
      title: 'Hall Agasthya – Royal Reception Stage (350 Pax)',
      shortTitle: 'Royal Velvet Stage',
      badge: '350 Pax',
      src: '/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg',
      desc: 'Imperial velvet sofa, modern floral ring arch & intelligent stage lighting.'
    },
    {
      id: 'entrance',
      title: 'Grand Illuminated Palace Entrance & Facade',
      shortTitle: 'Illuminated Palace Entrance',
      badge: '40-ft Facade',
      src: '/assets/04_exterior_and_entrance/entrance_grand_steps_illuminated_night.jpeg',
      desc: 'Illuminated marble grand steps, 40-foot palace facade, and on-premise car parking.'
    },
    {
      id: 'hall-koundinya',
      title: 'Hall Koundinya – Celebrations Hall (200 Pax)',
      shortTitle: 'Cradle & Birthday Hall',
      badge: '200 Pax',
      src: '/assets/06_hall_koundinya/hall_koundinya_mini_hall_aisle_stage_01.jpeg',
      desc: 'Intimate boutique hall with wood slat ceiling, milestone stage & crisp acoustics.'
    }
  ];

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [entranceDone, setEntranceDone] = useState(Boolean(isEntranceComplete));

  useEffect(() => {
    if (isEntranceComplete) {
      setActiveSlideIdx(0);
      setEntranceDone(true);
    }
  }, [isEntranceComplete]);

  useEffect(() => {
    const handleEntranceComplete = () => {
      setActiveSlideIdx(0);
      setEntranceDone(true);
    };
    window.addEventListener('ss-entrance-complete', handleEntranceComplete);
    return () => window.removeEventListener('ss-entrance-complete', handleEntranceComplete);
  }, []);

  useEffect(() => {
    if (!entranceDone) setActiveSlideIdx(0);
  }, [entranceDone]);

  useEffect(() => {
    if (entranceDone) {
      loadHeroConsole().catch(() => {});
      return undefined;
    }
    const conn = navigator.connection;
    if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return undefined;
    let cancelled = false;
    let timer = null;
    const warm = () => {
      if (cancelled) return;
      timer = setTimeout(() => {
        if (!cancelled) loadHeroConsole().catch(() => {});
      }, 3200);
    };
    if (document.readyState === 'complete') warm();
    else window.addEventListener('load', warm, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', warm);
      if (timer) clearTimeout(timer);
    };
  }, [entranceDone]);

  useEffect(() => {
    if (!entranceDone) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const interval = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % banquetShowcaseOptions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [entranceDone, banquetShowcaseOptions.length]);

  const currentSlide = banquetShowcaseOptions[activeSlideIdx] || banquetShowcaseOptions[0];

  const handleSelectSlide = (idx) => {
    setActiveSlideIdx(idx);
    const item = banquetShowcaseOptions[idx];
    setSelectedSlideOverride({
      src: item.src,
      title: item.title,
      caption: item.desc
    });
  };

  const handleNextSlide = () => {
    handleSelectSlide((activeSlideIdx + 1) % banquetShowcaseOptions.length);
  };

  const handlePrevSlide = () => {
    handleSelectSlide((activeSlideIdx - 1 + banquetShowcaseOptions.length) % banquetShowcaseOptions.length);
  };

  const toggleTempleAudio = () => {
    try {
      if (isTempleAudioActive) {
        if (audioContextRef.current) {
          audioContextRef.current.close().catch(() => {});
          audioContextRef.current = null;
        }
        audioOscillatorsRef.current = [];
        setIsTempleAudioActive(false);
      } else {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.2);
        masterGain.connect(ctx.destination);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(360, ctx.currentTime);
        filter.connect(masterGain);

        const notes = [130.81, 196.00, 261.63];
        const oscs = [];

        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.detune.setValueAtTime((i - 1) * 3, ctx.currentTime);

          const oscGain = ctx.createGain();
          oscGain.gain.setValueAtTime(0.4 / (i + 1), ctx.currentTime);

          osc.connect(oscGain);
          oscGain.connect(filter);
          osc.start();
          oscs.push(osc);
        });

        audioOscillatorsRef.current = oscs;
        setIsTempleAudioActive(true);
      }
    } catch (_) {}
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative text-white overflow-x-clip border-b-2 border-[#D4AF37]/35">
      {/* ========================================================
          CHAPTER 1: FULL-SCREEN CINEMATIC LUXURY HERO SECTION
          (Grand Royal Symmetrical Palace Hero with 5-Image Carousel, 5s Auto-Crossfade)
          ======================================================== */}
      <section id="hero" data-carousel-id="homepage-hero-carousel" className="relative h-[100dvh] max-h-[100dvh] min-h-[640px] flex flex-col justify-between pt-16 sm:pt-20 pb-4 overflow-hidden select-none">
        {/* Full-Screen Background Image with 1s Smooth Crossfade */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {banquetShowcaseOptions.map((item, idx) => (
            idx === 0 || entranceDone ? (
              <ResponsiveImage
                key={item.id}
                src={item.src}
                alt={item.title}
                sizes="(max-width: 767px) 160vw, 100vw"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding={idx === 0 && entranceDone ? 'sync' : 'async'}
                fetchPriority={idx === 0 ? (entranceDone ? 'high' : 'low') : undefined}
                style={{
                  transform: activeSlideIdx === idx ? 'scale(1.04)' : 'scale(1)',
                  transition: 'opacity 1000ms ease-in-out, transform 8000ms linear'
                }}
                className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-100 contrast-[1.04] saturate-[1.1] transition-opacity duration-1000 ease-in-out will-change-transform ${
                  activeSlideIdx === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ) : null
          ))}

          {/* Symmetrical Palace Ambient Lighting Scrim */}
          <div className="absolute top-0 left-0 right-0 h-48 sm:h-40 bg-gradient-to-b from-black/75 via-black/30 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-56 sm:h-56 bg-gradient-to-t from-black/80 via-black/35 to-transparent z-10" />
        </div>

        {/* UPPER TIER: BRAND */}
        <div className="max-w-4xl mx-auto px-4 relative z-20 text-center pt-4">
          <p className="font-serif text-[11px] sm:text-sm tracking-[0.22em] sm:tracking-[0.3em] text-[#FFF6D1]/95 mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            || Sri Rastu • Shubhamastu • Avighnamastu ||
          </p>

          <h1 className="font-cinzel text-[clamp(1.7rem,8vw,2.5rem)] sm:text-6xl md:text-7xl font-bold tracking-[0.09em] sm:tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] via-[#EED9A6] to-[#C5A059] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] leading-[1.08] whitespace-nowrap sm:whitespace-normal">
            S.S CONVENTION
            <span className="sr-only"> – Wedding & Banquet Halls in Meerpet, Hyderabad</span>
          </h1>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4" aria-hidden="true">
            <span className="h-px w-8 sm:w-20 bg-gradient-to-r from-transparent to-[#C5A059]/80" />
            <span className="text-[10px] sm:text-sm font-cinzel tracking-[0.2em] sm:tracking-[0.28em] uppercase text-latte drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Wedding & Banquet Halls · Meerpet, Hyderabad
            </span>
            <span className="h-px w-8 sm:w-20 bg-gradient-to-l from-transparent to-[#C5A059]/80" />
          </div>

          <p className="mt-3 sm:mt-4 font-serif italic text-xs sm:text-lg text-[#FFF6D1]/95 tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            {'“Where Grand Traditions Meet Timeless Luxury”'}
          </p>
        </div>

        <div className="flex-1 min-h-[120px] sm:min-h-[200px] pointer-events-none" />

        {/* LOWER TIER: FACTS, ACTIONS, SLIDE CONTROLS */}
        <div className="max-w-4xl mx-auto px-4 relative z-20 text-center pb-3 w-full">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-1 text-xs sm:text-sm text-latte mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {[
              [Users, 'Minimum 100 Guests'],
              [Snowflake, 'Central A/C'],
              [UtensilsCrossed, '250+ seat dining hall'],
              [Building, '3 halls'],
            ].map(([Icon, text], i) => (
              <li key={text} className={`flex items-center gap-2 ${i > 2 ? 'hidden sm:flex' : ''}`}>
                <Icon className="w-4 h-4 text-amber-300" />
                {text}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
            <Link to="/contact" className="btn-gold ss-shimmer !px-4 sm:!px-6 !text-[11px] sm:!text-xs whitespace-nowrap">
              <span className="ss-shimmer-sweep" aria-hidden="true" />
              <CalendarCheck className="w-4 h-4" />
              <span>{'Book a hall visit'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={whatsappLink('Hello SS Convention Hall, I would like to book a hall visit and check date availability.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp"
              title="Enquire on WhatsApp"
              className="w-11 h-11 flex-shrink-0 inline-flex items-center justify-center rounded-full border border-[#25D366]/60 bg-black/30 text-[#25D366] backdrop-blur-md hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>

            <button
              onClick={toggleTempleAudio}
              aria-label={isTempleAudioActive ? 'Mute palace ambience' : 'Play palace ambience'}
              className={`w-11 h-11 flex-shrink-0 inline-flex items-center justify-center rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                isTempleAudioActive
                  ? 'bg-amber-400 text-[#3D0A14] border-amber-300 animate-pulse'
                  : 'bg-black/30 text-latte border-[#C5A059]/50 hover:border-[#C5A059]'
              }`}
            >
              <Music2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevSlide}
              aria-label="Previous view"
              className="text-latte/80 hover:text-amber-300 transition-colors text-lg leading-none cursor-pointer"
            >
              ‹
            </button>
            <div className="flex items-center gap-2">
              {banquetShowcaseOptions.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSlide(idx)}
                  aria-label={item.shortTitle}
                  title={item.shortTitle}
                  className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                    activeSlideIdx === idx ? 'w-8 bg-amber-300' : 'w-3 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNextSlide}
              aria-label="Next view"
              className="text-latte/80 hover:text-amber-300 transition-colors text-lg leading-none cursor-pointer"
            >
              ›
            </button>
            <span className="hidden sm:inline text-xs font-cinzel tracking-widest text-mocha min-w-[140px] text-left">
              {currentSlide.shortTitle}
            </span>
          </div>

          <a
            href="#interactive-console"
            aria-label="Scroll to explore"
            className="mt-4 inline-flex flex-col items-center text-amber-300/80 hover:text-amber-300"
          >
            <span className="block w-px h-8 bg-gradient-to-b from-amber-300/0 to-amber-300 animate-pulse" />
            <ChevronDown className="w-4 h-4 -mt-1" />
          </a>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 2: EXPLORE THE VENUE (lazy interactive console)
          ======================================================== */}
      <Suspense fallback={<div id="interactive-console" className="min-h-screen bg-[#2A060E] border-t border-[#D4AF37]/30" aria-hidden="true" />}>
        <HeroConsole onOpenLightbox={onOpenLightbox} externalSlide={selectedSlideOverride} />
      </Suspense>
    </div>
  );
}
