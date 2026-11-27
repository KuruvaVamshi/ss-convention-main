import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  CalendarCheck,
  ArrowRight,
  Phone,
  Sun,
  Flame,
  Maximize2,
  Leaf,
  Drumstick,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Clock
} from 'lucide-react';
import { venueData } from '../data/venueData';
import { spacesData } from '../data/spacesData';
import { themesData } from '../data/themesData';
import { cateringMenus } from '../data/menusData';
import { WhatsAppButton } from './ContactButtons';
import ResponsiveImage from './ResponsiveImage';

const CONSOLE_TOPICS = ['halls', 'banquet', 'themes', 'menus', 'contact'];
const CONSOLE_TOPIC_META = [
  { id: 'halls', num: '01', label: 'Our Halls', shortLabel: '01 Halls' },
  { id: 'banquet', num: '02', label: 'Dining Floor', shortLabel: '02 Dining' },
  { id: 'themes', num: '03', label: 'Stage Themes', shortLabel: '03 Themes' },
  { id: 'menus', num: '04', label: 'Menus', shortLabel: '04 Menus' },
  { id: 'contact', num: '05', label: 'Book a Visit', shortLabel: '05 Visit' },
];

const AUTO_CYCLE_MS = 3000;

const DINING_VIEWS = [
  {
    id: 'seating',
    label: 'Round Tables',
    sublabel: '250+ Seats',
    src: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg',
    title: 'Royal Banquet Dining Hall (Swarna Bhojanam)',
    caption: '250+ Concurrent Round-Table Seats • Maroon & Gold Damask Linens • Zero Aroma in Mandap'
  },
  {
    id: 'buffet',
    label: 'Live Buffet',
    sublabel: '1,500+ Guests',
    src: '/assets/07_dining_hall/dining_hall_buffet_counter_chafing_dishes_01.jpeg',
    title: 'Stainless Steel Live Buffet Stations',
    caption: 'Twin Parallel Chafing Counters • Italian Marble Wall • Zero Queue Rolling Service'
  },
  {
    id: 'sanctuary',
    label: 'Dining Floor',
    sublabel: '3,500 sq.ft',
    src: '/assets/facilities/03_Banquet_Dining_Floor.png',
    title: 'Dedicated Swarna Bhojanam Dining Floor',
    caption: '12-Tap Granite RO Handwash • Separate Service Lift • Industrial Exhaust Ventilation'
  }
];

const CONTACT_VIEWS = [
  {
    src: '/assets/04_exterior_and_entrance/entrance_grand_steps_illuminated_night.jpeg',
    title: 'Grand Welcoming Arch & Entrance',
    caption: 'Raghavendra Nagar Colony, Meerpet, Hyderabad'
  },
  {
    src: '/assets/04_exterior_and_entrance/royal_palace_mahadwaram_doors.jpeg',
    title: 'Royal Illuminated Palace Doors',
    caption: '60-ft Wide Approach Road • 150+ On-Premise Car & Bike Parking Slots'
  },
  {
    src: '/assets/entrance/reception_foyer_wide_balaji_buddha_lounge_15.jpeg',
    title: 'Grand Reception Foyer & Helpdesk',
    caption: 'Walk-in Tours Open Daily · 09:00 AM – 09:00 PM'
  }
];

export default function HeroConsole({ onOpenLightbox, externalSlide = null }) {
  const shouldReduce = useReducedMotion();
  const [activeConsoleTab, setActiveConsoleTab] = useState('halls');

  const [currentMedia, setCurrentMedia] = useState({
    type: 'image',
    src: '/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg',
    title: 'Hall Vasishta – Grand Kalyana Mandapam',
    caption: 'Double-Tier Golden Crystal Chandeliers • 70-ft Center Bridal Aisle • 600 Seated Central A/C'
  });

  useEffect(() => {
    if (externalSlide?.src) {
      setCurrentMedia({
        type: 'image',
        src: externalSlide.src,
        title: externalSlide.title,
        caption: externalSlide.caption
      });
    }
  }, [externalSlide]);

  const [selectedHallIdx, setSelectedHallIdx] = useState(0);
  const [hallViewAngle, setHallViewAngle] = useState('hall');
  const [selectedDiningIdx, setSelectedDiningIdx] = useState(0);
  const [selectedThemeIdx, setSelectedThemeIdx] = useState(0);
  const [lightingMode, setLightingMode] = useState('theatrical');
  const [dietaryType, setDietaryType] = useState('nonVeg');
  const [selectedMenuTier, setSelectedMenuTier] = useState(0);
  const [selectedContactIdx, setSelectedContactIdx] = useState(0);

  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => (typeof document === 'undefined' ? true : !document.hidden));
  const [manualTick, setManualTick] = useState(0);

  const currentHall = spacesData[selectedHallIdx] || spacesData[0];
  const currentDining = DINING_VIEWS[selectedDiningIdx] || DINING_VIEWS[0];
  const currentTheme = themesData[selectedThemeIdx] || themesData[0];
  const currentMenus = cateringMenus[dietaryType] || cateringMenus.nonVeg;
  const currentMenu = currentMenus[selectedMenuTier % currentMenus.length] || currentMenus[0];
  const currentMenuDishes = currentMenu?.sections?.flatMap((s) => s.items) || [];

  const switchTabRef = useRef(null);
  const consoleSectionRef = useRef(null);
  const activeTabRef = useRef('halls');

  const syncHallMedia = useCallback((idx, angle = 'hall') => {
    const hall = spacesData[idx] || spacesData[0];
    const targetImage = angle === 'hall'
      ? (hall.hallImage || hall.image)
      : (hall.gallery?.[1]?.src || hall.image);
    setCurrentMedia({
      type: 'image',
      src: targetImage,
      title: hall.name,
      caption: angle === 'hall' ? `${hall.name} - Chandelier Seating View` : `${hall.name} - Stage Perspective`
    });
  }, []);

  const syncDiningMedia = useCallback((idx) => {
    const view = DINING_VIEWS[idx % DINING_VIEWS.length] || DINING_VIEWS[0];
    setCurrentMedia({
      type: 'image',
      src: view.src,
      title: view.title,
      caption: view.caption
    });
  }, []);

  const syncThemeMedia = useCallback((idx) => {
    const theme = themesData[idx] || themesData[0];
    setCurrentMedia({
      type: 'image',
      src: theme.image,
      title: theme.title,
      caption: `${theme.title} (${theme.category})`
    });
  }, []);

  const syncMenuMedia = useCallback((menuObj, idx) => {
    if (!menuObj) return;
    const diningFallback = idx % 2 === 0
      ? DINING_VIEWS[0].src
      : DINING_VIEWS[1].src;
    setCurrentMedia({
      type: 'image',
      src: diningFallback,
      title: `${menuObj.title} • Royal Banquet Feast`,
      caption: `${menuObj.badge || 'Banquet Package'} • Minimum ${menuObj.minPax} Guests`
    });
  }, []);

  const syncContactMedia = useCallback((idx) => {
    const view = CONTACT_VIEWS[idx % CONTACT_VIEWS.length] || CONTACT_VIEWS[0];
    setCurrentMedia({
      type: 'image',
      src: view.src,
      title: view.title,
      caption: view.caption
    });
  }, []);

  const handleSwitchTab = useCallback((tab) => {
    setActiveConsoleTab(tab);
    activeTabRef.current = tab;
    if (tab === 'banquet') {
      syncDiningMedia(selectedDiningIdx);
    } else if (tab === 'halls') {
      syncHallMedia(selectedHallIdx, hallViewAngle);
    } else if (tab === 'themes') {
      syncThemeMedia(selectedThemeIdx);
    } else if (tab === 'menus') {
      syncMenuMedia(currentMenus[selectedMenuTier % currentMenus.length], selectedMenuTier);
    } else if (tab === 'contact') {
      syncContactMedia(selectedContactIdx);
    }
  }, [
    currentMenus,
    hallViewAngle,
    selectedContactIdx,
    selectedDiningIdx,
    selectedHallIdx,
    selectedMenuTier,
    selectedThemeIdx,
    syncContactMedia,
    syncDiningMedia,
    syncHallMedia,
    syncMenuMedia,
    syncThemeMedia,
  ]);

  const handleSelectHall = (idx, angle = 'hall') => {
    setSelectedHallIdx(idx);
    setHallViewAngle(angle);
    setManualTick((t) => t + 1);
    syncHallMedia(idx, angle);
  };

  const handleSelectDining = (idx) => {
    setSelectedDiningIdx(idx);
    setManualTick((t) => t + 1);
    syncDiningMedia(idx);
  };

  const handleSelectTheme = (idx) => {
    setSelectedThemeIdx(idx);
    setManualTick((t) => t + 1);
    syncThemeMedia(idx);
  };

  const handleSelectMenuTier = (idx) => {
    setSelectedMenuTier(idx);
    setManualTick((t) => t + 1);
    syncMenuMedia(currentMenus[idx], idx);
  };

  const getLightingFilter = () => {
    if (currentMedia.type !== 'image') return {};
    switch (lightingMode) {
      case 'day':
        return { filter: 'brightness(1.08) contrast(1.04) saturate(1.05)' };
      case 'haldi':
        return { filter: 'sepia(0.2) saturate(1.3) brightness(0.98)' };
      case 'theatrical':
      default:
        return { filter: 'contrast(1.12) brightness(0.95) saturate(1.15)' };
    }
  };

  switchTabRef.current = handleSwitchTab;
  activeTabRef.current = activeConsoleTab;

  // Inform Lenis & ScrollTrigger of the pinned section height once mounted
  useEffect(() => {
    window.lenis?.resize?.();
    window.gsapScrollTrigger?.refresh?.();
  }, []);

  // Track section visibility & browser tab visibility for clean 3s auto-cycling
  useEffect(() => {
    const el = consoleSectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.12 });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // 3-second auto-advance inside whichever topic is currently open
  useEffect(() => {
    if (!inView || !tabVisible || shouldReduce) return undefined;
    const timer = setInterval(() => {
      if (activeConsoleTab === 'halls') {
        setSelectedHallIdx((prev) => {
          const next = (prev + 1) % 3;
          syncHallMedia(next, hallViewAngle);
          return next;
        });
      } else if (activeConsoleTab === 'banquet') {
        setSelectedDiningIdx((prev) => {
          const next = (prev + 1) % DINING_VIEWS.length;
          syncDiningMedia(next);
          return next;
        });
      } else if (activeConsoleTab === 'themes') {
        setSelectedThemeIdx((prev) => {
          const next = (prev + 1) % 4;
          syncThemeMedia(next);
          return next;
        });
      } else if (activeConsoleTab === 'menus') {
        setSelectedMenuTier((prev) => {
          const list = cateringMenus[dietaryType] || cateringMenus.nonVeg;
          const next = (prev + 1) % list.length;
          syncMenuMedia(list[next], next);
          return next;
        });
      } else if (activeConsoleTab === 'contact') {
        setSelectedContactIdx((prev) => {
          const next = (prev + 1) % CONTACT_VIEWS.length;
          syncContactMedia(next);
          return next;
        });
      }
    }, AUTO_CYCLE_MS);
    return () => clearInterval(timer);
  }, [
    inView,
    tabVisible,
    shouldReduce,
    activeConsoleTab,
    hallViewAngle,
    dietaryType,
    manualTick,
    syncHallMedia,
    syncDiningMedia,
    syncThemeMedia,
    syncMenuMedia,
    syncContactMedia,
  ]);

  // Vertical page scroll drives the horizontal topic track inside the pinned viewport
  const { scrollYProgress: consoleProgress } = useScroll({
    target: consoleSectionRef,
    offset: ['start start', 'end end']
  });
  const consoleX = useTransform(consoleProgress, [0, 1], ['0%', `-${(CONSOLE_TOPICS.length - 1) * 100}%`]);

  useMotionValueEvent(consoleProgress, 'change', (v) => {
    if (shouldReduce) return;
    const idx = Math.max(0, Math.min(CONSOLE_TOPICS.length - 1, Math.round(v * (CONSOLE_TOPICS.length - 1))));
    const id = CONSOLE_TOPICS[idx];
    if (id !== activeTabRef.current) {
      switchTabRef.current?.(id);
    }
  });

  const consoleIdx = Math.max(0, CONSOLE_TOPICS.indexOf(activeConsoleTab));
  const scrollConsoleTo = (i) => {
    const next = (i + CONSOLE_TOPICS.length) % CONSOLE_TOPICS.length;
    setManualTick((t) => t + 1);
    if (shouldReduce) {
      switchTabRef.current?.(CONSOLE_TOPICS[next]);
      return;
    }
    const section = consoleSectionRef.current;
    if (!section) return;
    const last = CONSOLE_TOPICS.length - 1;
    const travel = section.offsetHeight - window.innerHeight;
    if (travel <= 0) {
      switchTabRef.current?.(CONSOLE_TOPICS[next]);
      return;
    }
    const top = section.getBoundingClientRect().top + window.scrollY + (next / last) * travel;
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(top, { duration: 0.9 });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const triggerFlowerShower = () => {
    import('canvas-confetti')
      .then((m) => {
        const confetti = m.default || m;
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#FFDF73', '#7A1F31', '#FF6B8B', '#FFFFFF']
        });
        window.triggerBlessings?.();
      })
      .catch(() => {});
  };

  return (
    <section
      ref={consoleSectionRef}
      id="interactive-console"
      className={`relative z-10 bg-[#2A060E] border-t border-[#D4AF37]/30 ${shouldReduce ? '' : 'h-[360vh]'}`}
    >
      <div className={`${shouldReduce ? 'py-14 sm:py-20' : 'sticky top-0 h-[100dvh] pt-20 sm:pt-24 pb-6'} flex flex-col justify-center overflow-hidden`}>
        {/* TOP HEADER BAR WITH ACCESSIBLE LEFT/RIGHT SWITCHING CONTROLS UP TOP */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-1.5 sm:mb-2">Take a closer look</p>
            <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-latte leading-tight">Explore the Venue</h2>
            <div className="mt-2.5 h-px w-24 bg-gradient-to-r from-[#C5A059] to-transparent" />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start md:self-end" aria-label="Venue sections navigation">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap" role="tablist" aria-label="Venue topics">
              {CONSOLE_TOPIC_META.map((t, i) => {
                const isTabActive = activeConsoleTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={isTabActive}
                    onClick={() => scrollConsoleTo(i)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-cinzel tracking-wider border transition-all cursor-pointer ${
                      isTabActive
                        ? 'bg-amber-300 text-[#3D0A14] border-amber-300 font-bold shadow-[0_0_12px_rgba(251,191,36,0.35)]'
                        : 'border-[#D4AF37]/35 bg-black/25 text-mocha hover:text-latte hover:border-[#D4AF37]/70'
                    }`}
                    title={t.label}
                  >
                    <span className="hidden sm:inline">{t.shortLabel}</span>
                    <span className="sm:hidden">{t.num}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 ml-auto sm:ml-1">
              <button
                type="button"
                onClick={() => scrollConsoleTo(consoleIdx - 1)}
                aria-label="Previous topic"
                title="Previous topic"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/60 bg-black/40 text-amber-200 flex items-center justify-center hover:bg-amber-300 hover:text-[#3D0A14] hover:border-amber-300 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollConsoleTo(consoleIdx + 1)}
                aria-label="Next topic"
                title="Next topic"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/60 bg-black/40 text-amber-200 flex items-center justify-center hover:bg-amber-300 hover:text-[#3D0A14] hover:border-amber-300 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* MAIN PINNED VIEWER + HORIZONTAL SLIDING TOPIC TRACK */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-start"
        >
          {/* Left Pinned Viewer */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black aspect-[16/10] max-h-[26vh] sm:max-h-[34vh] lg:max-h-[48vh] w-full">
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentMedia.src}
                  initial={{ opacity: 0, scale: shouldReduce ? 1 : 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <ResponsiveImage
                    src={currentMedia.src}
                    alt={currentMedia.title}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="eager"
                    decoding="async"
                    style={getLightingFilter()}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenLightbox(currentMedia.src, currentMedia.title)}
                  aria-label="View full screen"
                  className="w-9 h-9 rounded-full bg-black/60 border border-white/25 text-white flex items-center justify-center hover:bg-[#7A1F31] transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 right-4 sm:right-5">
                <h3 className="font-cinzel text-sm sm:text-lg font-bold text-latte drop-shadow line-clamp-1">{currentMedia.title}</h3>
                <p className="text-[11px] sm:text-xs text-mocha line-clamp-1">{currentMedia.caption}</p>
              </div>
            </div>
          </div>

          {/* Right Horizontal Scroll Track */}
          <div className="lg:col-span-6 min-w-0">
            <div className="overflow-hidden">
              <motion.div
                style={shouldReduce ? undefined : { x: consoleX }}
                animate={shouldReduce ? { x: `-${consoleIdx * 100}%` } : undefined}
                transition={shouldReduce ? { duration: 0.35 } : undefined}
                className="flex will-change-transform"
              >
                {CONSOLE_TOPIC_META.map(({ id, num, label }) => {
                  const on = activeConsoleTab === id;
                  return (
                    <article
                      key={id}
                      data-console-block={id}
                      className={`w-full flex-shrink-0 pr-2 sm:pr-6 transition-opacity duration-500 ${
                        on ? 'opacity-100' : 'opacity-35'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
                        <span className="font-cinzel text-xs sm:text-sm text-amber-300">{num}</span>
                        <span className="h-px w-8 sm:w-10 bg-amber-300/60" />
                        <h3 className="font-cinzel text-lg sm:text-2xl font-bold tracking-wide text-latte">{label}</h3>
                      </div>
                      <div onClick={() => !on && scrollConsoleTo(CONSOLE_TOPICS.indexOf(id))}>
                        {/* 01 HALLS */}
                        {id === 'halls' && (
                          <div>
                            <div className="flex gap-2">
                              {spacesData.slice(0, 3).map((hall, idx) => (
                                <button
                                  key={hall.id}
                                  type="button"
                                  onClick={() => handleSelectHall(idx, hallViewAngle)}
                                  className={`flex-1 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                                    selectedHallIdx === idx ? 'bg-[#4A0E1B] border-amber-400/80 shadow-[0_0_16px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
                                  }`}
                                >
                                  <span className="block font-cinzel text-[11px] sm:text-sm font-bold text-latte">{hall.name}</span>
                                  <span className="block text-[10px] sm:text-[11px] text-mocha mt-0.5">{hall.capacity}</span>
                                </button>
                              ))}
                            </div>

                            <h3 className="mt-4 sm:mt-5 font-cinzel text-xl sm:text-2xl font-bold text-latte">{currentHall.name}</h3>
                            <p className="mt-1 text-xs sm:text-sm text-amber-300 font-semibold">{currentHall.tagline}</p>
                            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-mocha leading-relaxed line-clamp-3">{currentHall.shortDescription || currentHall.description}</p>
                            <p className="mt-2.5 text-xs sm:text-sm text-latte line-clamp-1">
                              <span className="text-[10px] tracking-[0.25em] uppercase text-amber-300 mr-2">Ideal for</span>
                              {currentHall.bestFor}
                            </p>

                            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs text-mocha">
                              <span>View:</span>
                              {[['hall', 'Hall'], ['foyer', 'Stage']].map(([angle, labelBtn]) => (
                                <button
                                  key={angle}
                                  type="button"
                                  onClick={() => handleSelectHall(selectedHallIdx, angle)}
                                  className={`px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                                    hallViewAngle === angle && currentMedia.type === 'image'
                                      ? 'bg-amber-300 text-[#3D0A14] border-amber-300 font-bold'
                                      : 'border-[#D4AF37]/35 hover:text-latte'
                                  }`}
                                >
                                  {labelBtn}
                                </button>
                              ))}
                            </div>

                            <div className="mt-4 sm:mt-5 flex flex-wrap gap-2.5 sm:gap-3">
                              <Link to={`/halls/${currentHall.id}`} className="btn-gold">View hall <ArrowRight className="w-3.5 h-3.5" /></Link>
                              <Link to="/spaces" className="btn-outline-gold">Compare halls</Link>
                            </div>
                          </div>
                        )}

                        {/* 02 DINING FLOOR */}
                        {id === 'banquet' && (
                          <div>
                            <div className="flex gap-2 mb-4">
                              {DINING_VIEWS.map((view, idx) => (
                                <button
                                  key={view.id}
                                  type="button"
                                  onClick={() => handleSelectDining(idx)}
                                  className={`flex-1 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                                    selectedDiningIdx === idx ? 'bg-[#4A0E1B] border-amber-400/80 shadow-[0_0_16px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
                                  }`}
                                >
                                  <span className="block font-cinzel text-[11px] sm:text-sm font-bold text-latte">{view.label}</span>
                                  <span className="block text-[10px] sm:text-[11px] text-mocha mt-0.5">{view.sublabel}</span>
                                </button>
                              ))}
                            </div>

                            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold">Dedicated dining floor</p>
                            <h3 className="mt-1.5 font-cinzel text-xl sm:text-2xl font-bold text-latte">{currentDining.title}</h3>
                            <p className="mt-1 text-xs sm:text-sm text-amber-300 font-semibold">Round tables in royal maroon and gold damask · 250+ seats · 3,500 sq.ft</p>
                            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
                              {[
                                ['Zero mandap aroma', 'A separate floor with its own exhaust'],
                                ['12-tap granite handwash', 'Pure RO purified water'],
                                ['Catering service lift', 'Fast, hot food delivery'],
                                ['1,500+ feast capacity', 'Rolling batches of about 25 minutes'],
                              ].map(([t, d]) => (
                                <li key={t} className="flex gap-2.5 text-xs sm:text-sm">
                                  <Check className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                                  <span>
                                    <span className="text-latte font-semibold">{t}</span>
                                    <span className="text-mocha"> — {d}</span>
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 sm:mt-5 flex flex-wrap gap-2.5 sm:gap-3">
                              <Link to="/halls/dining-hall" className="btn-gold">Dining floor <ArrowRight className="w-3.5 h-3.5" /></Link>
                              <Link to="/menus" className="btn-outline-gold">View menus</Link>
                            </div>
                          </div>
                        )}

                        {/* 03 THEMES */}
                        {id === 'themes' && (
                          <div>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {themesData.slice(0, 4).map((theme, idx) => (
                                <button
                                  key={theme.id}
                                  type="button"
                                  onClick={() => handleSelectTheme(idx)}
                                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs border transition-colors cursor-pointer ${
                                    selectedThemeIdx === idx && currentMedia.type === 'image'
                                      ? 'bg-amber-300 text-[#3D0A14] border-amber-300 font-bold'
                                      : 'border-[#D4AF37]/35 text-mocha hover:text-latte hover:border-[#D4AF37]/70'
                                  }`}
                                >
                                  {theme.title}
                                </button>
                              ))}
                            </div>

                            <p className="mt-4 font-cinzel text-[11px] tracking-[0.25em] uppercase text-amber-300">{currentTheme.category}</p>
                            <h3 className="mt-1 font-cinzel text-xl sm:text-2xl font-bold text-latte">{currentTheme.title}</h3>
                            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-mocha leading-relaxed line-clamp-3">{currentTheme.description}</p>
                            <ul className="mt-3 space-y-1.5">
                              {currentTheme.highlights?.slice(0, 3).map((h) => (
                                <li key={h} className="flex gap-2 text-xs sm:text-sm text-latte">
                                  <Check className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" /> {h}
                                </li>
                              ))}
                            </ul>

                            <div className="mt-4 flex items-center gap-2 text-xs text-mocha">
                              <span>Lighting:</span>
                              {[['day', 'Day', Sun], ['theatrical', 'Stage', Sparkles], ['haldi', 'Haldi', Flame]].map(([mode, labelMode, Icon]) => (
                                <button
                                  key={mode}
                                  type="button"
                                  onClick={() => setLightingMode(mode)}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                                    lightingMode === mode ? 'bg-amber-300 text-[#3D0A14] border-amber-300 font-bold' : 'border-[#D4AF37]/35 hover:text-latte'
                                  }`}
                                >
                                  <Icon className="w-3 h-3" /> {labelMode}
                                </button>
                              ))}
                            </div>

                            <div className="mt-4 sm:mt-5">
                              <Link to="/gallery" className="btn-outline-gold">More decor in the gallery</Link>
                            </div>
                          </div>
                        )}

                        {/* 04 MENUS */}
                        {id === 'menus' && (
                          <div>
                            <div className="inline-flex p-1 rounded-full border border-[#D4AF37]/35 bg-black/25">
                              {[['veg', 'Vegetarian', Leaf], ['nonVeg', 'Non-Veg', Drumstick]].map(([type, labelType, Icon]) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => {
                                    setDietaryType(type);
                                    setSelectedMenuTier(0);
                                    setManualTick((t) => t + 1);
                                    const nextList = cateringMenus[type] || [];
                                    syncMenuMedia(nextList[0], 0);
                                  }}
                                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                                    dietaryType === type ? 'bg-amber-300 text-[#3D0A14] font-bold' : 'text-mocha hover:text-latte'
                                  }`}
                                >
                                  <Icon className="w-3.5 h-3.5" /> {labelType}
                                </button>
                              ))}
                            </div>

                            <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                              {currentMenus.map((menu, idx) => (
                                <button
                                  key={menu.id}
                                  type="button"
                                  onClick={() => handleSelectMenuTier(idx)}
                                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs border transition-colors cursor-pointer ${
                                    (selectedMenuTier % currentMenus.length) === idx ? 'bg-[#4A0E1B] border-amber-400/70 text-latte' : 'border-[#D4AF37]/30 text-mocha hover:text-latte'
                                  }`}
                                >
                                  {menu.title}
                                </button>
                              ))}
                            </div>

                            <p className="mt-4 text-[11px] tracking-[0.25em] uppercase text-amber-300">{currentMenu.badge}</p>
                            <h3 className="mt-1 font-cinzel text-xl sm:text-2xl font-bold text-latte">{currentMenu.title}</h3>
                            <p className="mt-1 text-xs sm:text-sm text-mocha">Minimum {currentMenu.minPax} guests · {currentMenuDishes.length} dishes</p>
                            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-mocha leading-relaxed line-clamp-3">
                              {currentMenuDishes.slice(0, 12).join(' · ')}
                            </p>

                            <div className="mt-4 sm:mt-5 flex flex-wrap gap-2.5 sm:gap-3">
                              <Link to="/menus" className="btn-gold">Full menu <ArrowRight className="w-3.5 h-3.5" /></Link>
                              <button
                                type="button"
                                onClick={() => onOpenLightbox(currentMenu.image, `${currentMenu.title} - Official Menu Card`)}
                                className="btn-outline-gold"
                              >
                                <FileText className="w-4 h-4" /> Printed card
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 05 BOOK A VISIT */}
                        {id === 'contact' && (
                          <div>
                            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold">Visit and book</p>
                            <h3 className="mt-1.5 font-cinzel text-xl sm:text-2xl font-bold text-latte">S.S Convention A/C</h3>
                            <ul className="mt-3 sm:mt-4 space-y-3 text-xs sm:text-sm text-mocha">
                              <li className="flex gap-3">
                                <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                                {venueData.address.line1}, {venueData.address.locality}, {venueData.address.city} – {venueData.address.pincode}
                              </li>
                              <li className="flex gap-3">
                                <Phone className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                                <span className="flex flex-col">
                                  {venueData.phones.map((p) => (
                                    <a key={p.raw} href={`tel:${p.raw}`} className="font-semibold text-latte hover:text-amber-300 transition-colors">{p.display}</a>
                                  ))}
                                </span>
                              </li>
                              <li className="flex gap-3">
                                <Clock className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                                Lunch slots end 3:00 PM · Dinner slots end 11:00 PM
                              </li>
                            </ul>
                            <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
                              <Link to="/contact" onClick={triggerFlowerShower} className="btn-gold"><CalendarCheck className="w-4 h-4" /> Check dates</Link>
                              <WhatsAppButton />
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
