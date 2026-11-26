import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  CalendarCheck,
  ArrowRight,
  Phone,
  Users,
  UtensilsCrossed,
  Sun,
  Flame,
  Maximize2,
  Leaf,
  Drumstick,
  Check,
  ChevronDown,
  FileText,
  MapPin,
  Clock
} from 'lucide-react';
import { venueData } from '../data/venueData';
import { spacesData } from '../data/spacesData';
import { themesData } from '../data/themesData';
import { cateringMenus } from '../data/menusData';
import { WhatsAppButton } from './ContactButtons';
import { whatsappLink } from '../lib/contact';
import ResponsiveImage from './ResponsiveImage';

const CONSOLE_TOPICS = ['halls', 'banquet', 'themes', 'menus', 'contact'];

export default function HeroConsole({ onOpenLightbox, externalSlide = null }) {
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

  const [banquetSeatingBatch, setBanquetSeatingBatch] = useState(250);
  const [selectedHallIdx, setSelectedHallIdx] = useState(0);
  const [hallViewAngle, setHallViewAngle] = useState('hall');
  const [selectedThemeIdx, setSelectedThemeIdx] = useState(0);
  const [lightingMode, setLightingMode] = useState('theatrical');
  const [dietaryType, setDietaryType] = useState('nonVeg');
  const [selectedMenuTier, setSelectedMenuTier] = useState(1);
  const [menuViewMode, setMenuViewMode] = useState('dining');

  const currentHall = spacesData[selectedHallIdx] || spacesData[0];
  const currentTheme = themesData[selectedThemeIdx] || themesData[0];
  const currentMenus = cateringMenus[dietaryType];
  const currentMenu = currentMenus[selectedMenuTier] || currentMenus[0];
  const currentMenuDishes = currentMenu.sections?.flatMap((s) => s.items) || [];

  const switchTabRef = useRef(null);
  const mediaRef = useRef(null);
  const consoleSectionRef = useRef(null);
  const activeTabRef = useRef('halls');

  const handleSwitchTab = (tab) => {
    setActiveConsoleTab(tab);
    if (tab === 'banquet') {
      setCurrentMedia({
        type: 'image',
        src: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg',
        title: 'Royal Banquet Dining Hall (Swarna Bhojanam)',
        caption: '250+ Concurrent Round-Table Seats • Maroon & Gold Damask Linens • Zero Aroma in Mandap'
      });
    } else if (tab === 'halls') {
      const hall = spacesData[selectedHallIdx] || spacesData[0];
      const targetImage = hallViewAngle === 'hall' ? (hall.hallImage || hall.image) : hall.image;
      setCurrentMedia({
        type: 'image',
        src: targetImage,
        title: hall.name,
        caption: hallViewAngle === 'hall' ? `${hall.name} - Chandelier Seating View` : `${hall.name} - Entrance & Foyer View`
      });
    } else if (tab === 'themes') {
      const theme = themesData[selectedThemeIdx] || themesData[0];
      setCurrentMedia({
        type: 'image',
        src: theme.image,
        title: theme.title,
        caption: `${theme.title} (${theme.category})`
      });
    } else if (tab === 'menus') {
      if (menuViewMode === 'rateCard') {
        setCurrentMedia({
          type: 'image',
          src: currentMenu.image,
          title: `${currentMenu.title} (Official Menu Card)`,
          caption: `${currentMenu.badge || 'Banquet Package'} • Min ${currentMenu.minPax} Pax`
        });
      } else {
        setCurrentMedia({
          type: 'image',
          src: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg',
          title: 'Dedicated Banquet Dining Hall',
          caption: '250+ Concurrent Seats • Zero Food Aroma in Ceremony Mandap'
        });
      }
    } else if (tab === 'contact') {
      setCurrentMedia({
        type: 'image',
        src: '/assets/04_exterior_and_entrance/entrance_grand_steps_illuminated_night.jpeg',
        title: 'Grand Welcoming Arch & Entrance',
        caption: 'Raghavendra Nagar Colony, Meerpet, Hyderabad'
      });
    }
  };

  const handleSelectHall = (idx, angle = 'hall') => {
    setSelectedHallIdx(idx);
    setHallViewAngle(angle);
    const hall = spacesData[idx];
    const targetImage = angle === 'hall'
      ? (hall.hallImage || hall.image)
      : (hall.gallery?.[1]?.src || hall.image);
    setCurrentMedia({
      type: 'image',
      src: targetImage,
      title: hall.name,
      caption: angle === 'hall' ? `${hall.name} - Chandelier Seating Overview` : `${hall.name} - Stage Perspective`
    });
  };

  const handleSelectTheme = (idx) => {
    setSelectedThemeIdx(idx);
    const theme = themesData[idx];
    setCurrentMedia({
      type: 'image',
      src: theme.image,
      title: theme.title,
      caption: `${theme.title} (${theme.category})`
    });
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
  mediaRef.current = currentMedia;
  activeTabRef.current = activeConsoleTab;

  const consoleIdx = Math.max(0, CONSOLE_TOPICS.indexOf(activeConsoleTab));
  const scrollConsoleTo = (i) => {
    const next = (i + CONSOLE_TOPICS.length) % CONSOLE_TOPICS.length;
    const id = CONSOLE_TOPICS[next];
    switchTabRef.current?.(id);
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
    <section ref={consoleSectionRef} id="interactive-console" className="relative z-10 bg-[#2A060E] border-t border-[#D4AF37]/30">
      <div className="flex flex-col justify-center overflow-hidden py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">Take a closer look</p>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide text-latte">Explore the Venue</h2>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#C5A059] to-transparent" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 lg:mt-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-14 items-start">
          {/* Pinned viewer */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black aspect-[16/10] max-h-[34vh] lg:max-h-[50vh] w-full">
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentMedia.src}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <ResponsiveImage
                    src={currentMedia.src}
                    alt={currentMedia.title}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    style={getLightingFilter()}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => onOpenLightbox(currentMedia.src, currentMedia.title)}
                  aria-label="View full screen"
                  className="w-9 h-9 rounded-full bg-black/60 border border-white/25 text-white flex items-center justify-center hover:bg-[#7A1F31] transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 right-4 sm:right-5">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-latte drop-shadow line-clamp-1">{currentMedia.title}</h3>
                <p className="text-xs text-mocha line-clamp-1">{currentMedia.caption}</p>
              </div>
            </div>
          </div>

          {/* Topics: dots and arrows choose a topic */}
          <div className="lg:col-span-6 min-w-0">
            <div className="overflow-hidden">
              <motion.div animate={{ x: `-${consoleIdx * 100}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="flex">
                {[
                  ['halls', '01', 'Our Halls'],
                  ['banquet', '02', 'Dining Floor'],
                  ['themes', '03', 'Stage Themes'],
                  ['menus', '04', 'Menus'],
                  ['contact', '05', 'Book a Visit'],
                ].map(([id, num, label]) => {
                  const on = activeConsoleTab === id;
                  return (
                    <article
                      key={id}
                      data-console-block={id}
                      className={`w-full flex-shrink-0 pr-4 sm:pr-8 transition-opacity duration-500 ${
                        on ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <span className="font-cinzel text-sm text-amber-300">{num}</span>
                        <span className="h-px w-10 bg-amber-300/60" />
                        <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide text-latte">{label}</h3>
                      </div>
                      <div onClick={() => !on && handleSwitchTab(id)}>
                        {/* HALLS */}
                        {id === 'halls' && (
                          <div>
                            <div className="flex gap-2">
                              {spacesData.slice(0, 3).map((hall, idx) => (
                                <button
                                  key={hall.id}
                                  onClick={() => handleSelectHall(idx, hallViewAngle)}
                                  className={`flex-1 px-3 py-2.5 rounded-xl border text-center transition-colors ${
                                    selectedHallIdx === idx ? 'bg-[#4A0E1B] border-amber-400/70' : 'border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
                                  }`}
                                >
                                  <span className="block font-cinzel text-xs sm:text-sm font-bold text-latte">{hall.name}</span>
                                  <span className="block text-[11px] text-mocha mt-0.5">{hall.capacity}</span>
                                </button>
                              ))}
                            </div>

                            <h3 className="mt-6 font-cinzel text-2xl font-bold text-latte">{currentHall.name}</h3>
                            <p className="mt-1 text-sm text-amber-300 font-semibold">{currentHall.tagline}</p>
                            <p className="mt-3 text-mocha leading-relaxed line-clamp-4">{currentHall.shortDescription || currentHall.description}</p>
                            <p className="mt-3 text-sm text-latte">
                              <span className="text-[10px] tracking-[0.25em] uppercase text-amber-300 mr-2">Ideal for</span>
                              {currentHall.bestFor}
                            </p>

                            <div className="mt-4 flex items-center gap-2 text-xs text-mocha">
                              <span>View:</span>
                              {[['hall', 'Hall'], ['foyer', 'Stage']].map(([angle, labelBtn]) => (
                                <button
                                  key={angle}
                                  onClick={() => handleSelectHall(selectedHallIdx, angle)}
                                  className={`px-3 py-1 rounded-full border transition-colors ${
                                    hallViewAngle === angle && currentMedia.type === 'image'
                                      ? 'bg-amber-300 text-[#3D0A14] border-amber-300 font-bold'
                                      : 'border-[#D4AF37]/35 hover:text-latte'
                                  }`}
                                >
                                  {labelBtn}
                                </button>
                              ))}
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                              <Link to={`/halls/${currentHall.id}`} className="btn-gold">View hall <ArrowRight className="w-3.5 h-3.5" /></Link>
                              <Link to="/spaces" className="btn-outline-gold">Compare halls</Link>
                            </div>
                          </div>
                        )}

                        {/* DINING */}
                        {id === 'banquet' && (
                          <div>
                            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold">Dedicated dining floor</p>
                            <h3 className="mt-2 font-cinzel text-2xl font-bold text-latte">Swarna Bhojanam</h3>
                            <p className="mt-1 text-sm text-amber-300 font-semibold">Round tables in royal maroon and gold damask · 250+ seats · 3,500 sq.ft</p>
                            <ul className="mt-5 space-y-3">
                              {[
                                ['Zero mandap aroma', 'A separate floor with its own exhaust'],
                                ['12-tap granite handwash', 'Pure RO purified water'],
                                ['Catering service lift', 'Fast, hot food delivery'],
                                ['1,500+ feast capacity', 'Rolling batches of about 25 minutes'],
                              ].map(([t, d]) => (
                                <li key={t} className="flex gap-3">
                                  <Check className="w-4 h-4 text-amber-300 flex-shrink-0 mt-1" />
                                  <span>
                                    <span className="block text-latte font-semibold">{t}</span>
                                    <span className="block text-sm text-mocha">{d}</span>
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-6 flex flex-wrap gap-3">
                              <Link to="/halls/dining-hall" className="btn-gold">Dining floor <ArrowRight className="w-3.5 h-3.5" /></Link>
                              <Link to="/menus" className="btn-outline-gold">View menus</Link>
                            </div>
                          </div>
                        )}

                        {/* THEMES */}
                        {id === 'themes' && (
                          <div>
                            <div className="flex flex-wrap gap-2">
                              {themesData.slice(0, 4).map((theme, idx) => (
                                <button
                                  key={theme.id}
                                  onClick={() => handleSelectTheme(idx)}
                                  className={`px-3.5 py-1.5 rounded-full text-xs border transition-colors ${
                                    selectedThemeIdx === idx && currentMedia.type === 'image'
                                      ? 'bg-amber-300 text-[#3D0A14] border-amber-300 font-bold'
                                      : 'border-[#D4AF37]/35 text-mocha hover:text-latte hover:border-[#D4AF37]/70'
                                  }`}
                                >
                                  {theme.title}
                                </button>
                              ))}
                            </div>

                            <p className="mt-6 text-[11px] tracking-[0.25em] uppercase text-amber-300">{currentTheme.category}</p>
                            <h3 className="mt-1 font-cinzel text-2xl font-bold text-latte">{currentTheme.title}</h3>
                            <p className="mt-3 text-mocha leading-relaxed line-clamp-4">{currentTheme.description}</p>
                            <ul className="mt-4 space-y-2">
                              {currentTheme.highlights?.slice(0, 3).map((h) => (
                                <li key={h} className="flex gap-2.5 text-sm text-latte">
                                  <Check className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" /> {h}
                                </li>
                              ))}
                            </ul>

                            <div className="mt-5 flex items-center gap-2 text-xs text-mocha">
                              <span>Lighting:</span>
                              {[['day', 'Day', Sun], ['theatrical', 'Stage', Sparkles], ['haldi', 'Haldi', Flame]].map(([mode, labelMode, Icon]) => (
                                <button
                                  key={mode}
                                  onClick={() => setLightingMode(mode)}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${
                                    lightingMode === mode ? 'bg-amber-300 text-[#3D0A14] border-amber-300 font-bold' : 'border-[#D4AF37]/35 hover:text-latte'
                                  }`}
                                >
                                  <Icon className="w-3 h-3" /> {labelMode}
                                </button>
                              ))}
                            </div>

                            <div className="mt-6">
                              <Link to="/gallery" className="btn-outline-gold">More decor in the gallery</Link>
                            </div>
                          </div>
                        )}

                        {/* MENUS */}
                        {id === 'menus' && (
                          <div>
                            <div className="inline-flex p-1 rounded-full border border-[#D4AF37]/35 bg-black/25">
                              {[['veg', 'Vegetarian', Leaf, 0], ['nonVeg', 'Non-Veg', Drumstick, 1]].map(([type, labelType, Icon, firstTier]) => (
                                <button
                                  key={type}
                                  onClick={() => {
                                    setDietaryType(type);
                                    setSelectedMenuTier(firstTier);
                                  }}
                                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs transition-colors ${
                                    dietaryType === type ? 'bg-amber-300 text-[#3D0A14] font-bold' : 'text-mocha hover:text-latte'
                                  }`}
                                >
                                  <Icon className="w-3.5 h-3.5" /> {labelType}
                                </button>
                              ))}
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {currentMenus.map((menu, idx) => (
                                <button
                                  key={menu.id}
                                  onClick={() => setSelectedMenuTier(idx)}
                                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                                    selectedMenuTier === idx ? 'bg-[#4A0E1B] border-amber-400/70 text-latte' : 'border-[#D4AF37]/30 text-mocha hover:text-latte'
                                  }`}
                                >
                                  {menu.title}
                                </button>
                              ))}
                            </div>

                            <p className="mt-6 text-[11px] tracking-[0.25em] uppercase text-amber-300">{currentMenu.badge}</p>
                            <h3 className="mt-1 font-cinzel text-2xl font-bold text-latte">{currentMenu.title}</h3>
                            <p className="mt-1 text-sm text-mocha">Minimum {currentMenu.minPax} guests · {currentMenuDishes.length} dishes</p>
                            <p className="mt-3 text-sm text-mocha leading-relaxed line-clamp-4">
                              {currentMenuDishes.slice(0, 12).join(' · ')}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                              <Link to="/menus" className="btn-gold">Full menu <ArrowRight className="w-3.5 h-3.5" /></Link>
                              <button
                                onClick={() => onOpenLightbox(currentMenu.image, `${currentMenu.title} - Official Menu Card`)}
                                className="btn-outline-gold"
                              >
                                <FileText className="w-4 h-4" /> Printed card
                              </button>
                            </div>
                          </div>
                        )}

                        {/* BOOK */}
                        {id === 'contact' && (
                          <div>
                            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold">Visit and book</p>
                            <h3 className="mt-2 font-cinzel text-2xl font-bold text-latte">S.S Convention A/C</h3>
                            <ul className="mt-5 space-y-4 text-sm text-mocha">
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
                            <div className="mt-6 flex flex-wrap gap-3">
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

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {CONSOLE_TOPICS.map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => scrollConsoleTo(i)}
                    aria-label={`Show topic ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeConsoleTab === t ? 'w-8 bg-amber-300' : 'w-3 bg-white/30 hover:bg-white/60'}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollConsoleTo(CONSOLE_TOPICS.indexOf(activeConsoleTab) - 1)}
                  aria-label="Previous topic"
                  className="w-10 h-10 rounded-full border border-[#D4AF37]/40 text-latte flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-colors"
                >
                  <ChevronDown className="w-5 h-5 rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollConsoleTo(CONSOLE_TOPICS.indexOf(activeConsoleTab) + 1)}
                  aria-label="Next topic"
                  className="w-10 h-10 rounded-full border border-[#D4AF37]/40 text-latte flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-colors"
                >
                  <ChevronDown className="w-5 h-5 -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
