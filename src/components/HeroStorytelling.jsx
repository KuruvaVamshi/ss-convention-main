import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SplitHeading from './SplitHeading';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  CalendarCheck, 
  ArrowRight, 
  Phone, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Image as ImageIcon, 
  Users, 
  Snowflake, 
  UtensilsCrossed, 
  Car, 
  Sun, 
  Moon, 
  Flame, 
  Maximize2, 
  Leaf, 
  Drumstick, 
  Check, 
  MessageSquare,
  Building,
  Palette,
  Eye,
  ChevronDown,
  FileText,
  MapPin,
  Clock,
  Compass,
  Music2
} from 'lucide-react';
import { venueData } from '../data/venueData';
import { spacesData } from '../data/spacesData';
import { themesData } from '../data/themesData';
import { cateringMenus } from '../data/menusData';

export default function HeroStorytelling({ lang, onOpenLightbox }) {
  // Master Single-View Console Active Tab: 'halls' | 'banquet' | 'themes' | 'menus' | 'contact'
  const [activeConsoleTab, setActiveConsoleTab] = useState('halls');

  // Video / Visual Theater State: Initialized with the Flagship Kalyana Mandapam (Crystal Chandeliers & Bridal Aisle)
  const [currentMedia, setCurrentMedia] = useState({
    type: 'image',
    src: '/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg',
    title: lang === 'te' ? 'హాల్ వశిష్ట – గ్రాండ్ కళ్యాణ మండపం (రాయల్ షాండ్లియర్స్ & బ్రైడల్ ఐల్)' : 'Hall Vasishta – Grand Kalyana Mandapam',
    caption: lang === 'te' ? 'డబుల్-టైర్ గోల్డెన్ క్రిస్టల్ షాండ్లియర్స్ • 70-అడుగుల బ్రైడల్ ఐల్ • ఇటాలియన్ మార్బుల్ ఫ్లోరింగ్' : 'Double-Tier Golden Crystal Chandeliers • 70-ft Center Bridal Aisle • 600 Seated Central A/C'
  });

  const [isMuted, setIsMuted] = useState(true);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isTempleAudioActive, setIsTempleAudioActive] = useState(false);
  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioOscillatorsRef = useRef([]);

  // Palace Venue Spotlight Quick Selector Options (The 5 Absolute Best Photos)
  const banquetShowcaseOptions = [
    {
      id: 'hall-vasishta',
      title: lang === 'te' ? 'హాల్ వశిష్ట – గ్రాండ్ కళ్యాణ మండపం (600 Pax)' : 'Hall Vasishta – Grand Kalyana Mandapam (600 Pax)',
      shortTitle: 'Grand Kalyana Mandapam',
      badge: '★ Best Overall',
      src: '/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg',
      desc: lang === 'te' ? 'డబుల్-టైర్ క్రిస్టల్ షాండ్లియర్స్, ఇటాలియన్ టైల్స్ & 70 అడుగుల బ్రైడల్ ఐల్.' : 'Double-tier crystal chandeliers, Italian vitrified reflections & 70-ft bridal walk.'
    },
    {
      id: 'dining-hall',
      title: lang === 'te' ? 'రాయల్ బాంక్వెట్ డైనింగ్ హాల్ (250+ సీట్లు)' : 'Royal Banquet Dining Hall (250+ Seats)',
      shortTitle: 'Royal Banquet Floor',
      badge: '250+ Seats',
      src: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg',
      desc: lang === 'te' ? 'రాచరిక మెరూన్ & గోల్డ్ డామాస్క్ రౌండ్ టేబుల్స్ మరియు గోల్డ్ ఓర్గాంజా చైర్ బోస్.' : 'Round banquet tables in royal maroon & gold damask with golden organza chair ties.'
    },
    {
      id: 'hall-agasthya',
      title: lang === 'te' ? 'హాల్ అగస్త్య – ఈవెనింగ్ రిసెప్షన్ స్టేజ్ (350 Pax)' : 'Hall Agasthya – Royal Reception Stage (350 Pax)',
      shortTitle: 'Royal Velvet Stage',
      badge: '350 Pax',
      src: '/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg',
      desc: lang === 'te' ? 'ఇంపీరియల్ వెల్వెట్ సోఫా, ఫ్లోరల్ రింగ్ ఆర్చ్ & డిజిటల్ స్టేజ్ లైటింగ్.' : 'Imperial velvet sofa, modern floral ring arch & intelligent stage lighting.'
    },
    {
      id: 'entrance',
      title: lang === 'te' ? 'ఎస్.ఎస్ కన్వెన్షన్ నైట్ ఫసాడ్ & గ్రాండ్ ఎంట్రన్స్' : 'Grand Illuminated Palace Entrance & Facade',
      shortTitle: 'Illuminated Palace Entrance',
      badge: '40-ft Facade',
      src: '/assets/04_exterior_and_entrance/entrance_grand_steps_illuminated_night.jpeg',
      desc: lang === 'te' ? 'రాత్రి వేళ వెలిగిపోయే రాయల్ మెట్లు, 40 అడుగుల ఫసాడ్ మరియు విశాలమైన పార్కింగ్.' : 'Illuminated marble grand steps, 40-foot palace facade, and on-premise car parking.'
    },
    {
      id: 'hall-koundinya',
      title: lang === 'te' ? 'హాల్ కౌండిన్య – మైల్‌స్టోన్ సెలబ్రేషన్స్ హాల్ (200 Pax)' : 'Hall Koundinya – Celebrations Hall (200 Pax)',
      shortTitle: 'Cradle & Birthday Hall',
      badge: '200 Pax',
      src: '/assets/06_main_hall_seating/mini_hall_seating_central_aisle_stage.jpeg',
      desc: lang === 'te' ? '1వ పుట్టినరోజులు, బారసాల మరియు సన్నిహిత కుటుంబ వేడుకలకు వుడ్ స్లాట్ సీలింగ్ హాల్.' : 'Intimate boutique hall with wood slat ceiling, milestone stage & crisp acoustics.'
    }
  ];

  // Auto-Changing Hero Venue Views Carousel (changes smoothly every 5 seconds)
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);

  useEffect(() => {
    if (!isAutoPlayActive) return;
    const interval = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % banquetShowcaseOptions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlayActive, banquetShowcaseOptions.length]);

  const currentSlide = banquetShowcaseOptions[activeSlideIdx] || banquetShowcaseOptions[0];

  const handleSelectSlide = (idx) => {
    setActiveSlideIdx(idx);
    const item = banquetShowcaseOptions[idx];
    setCurrentMedia({
      type: 'image',
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

  // Tab 1: Banquet Hall state
  const [banquetSeatingBatch, setBanquetSeatingBatch] = useState(250);

  // Tab 2: Halls state
  const [selectedHallIdx, setSelectedHallIdx] = useState(0); // Hall Vasishta default
  const [hallViewAngle, setHallViewAngle] = useState('hall'); // 'hall' | 'foyer'

  // Tab 2: Themes & Lighting state
  const [selectedThemeIdx, setSelectedThemeIdx] = useState(0);
  const [lightingMode, setLightingMode] = useState('theatrical'); // 'day' | 'theatrical' | 'haldi'

  // Tab 3: Banquet Feasts state
  const [dietaryType, setDietaryType] = useState('nonVeg');
  const [guestCount, setGuestCount] = useState(250);
  const [selectedMenuTier, setSelectedMenuTier] = useState(1); // Premium default
  const [menuViewMode, setMenuViewMode] = useState('dining'); // 'dining' | 'rateCard'

  const currentHall = spacesData[selectedHallIdx] || spacesData[0];
  const currentTheme = themesData[selectedThemeIdx] || themesData[0];
  const currentMenus = cateringMenus[dietaryType];
  const currentMenu = currentMenus[selectedMenuTier] || currentMenus[0];
  const currentMenuDishes = currentMenu.sections?.flatMap(s => s.items) || [];

  // 6 Real Venue Video Clips for Instant Walkthrough Navigation
  const venueVideos = [
    {
      id: 'v1',
      title: '01 Grand Walkthrough',
      label: 'Grand Hall',
      src: '/assets/11_event_videos/video_highlight_01_walkthrough.mp4',
      caption: 'Full Central A/C Marriage Hall & Aisle'
    },
    {
      id: 'v2',
      title: '02 Interior Architecture',
      label: 'Chandeliers & Stage',
      src: '/assets/11_event_videos/video_highlight_03_hall_interior_tour.mp4',
      caption: 'Crystal Chandeliers & Stage Architecture'
    },
    {
      id: 'v3',
      title: '03 Theatrical Stage Lighting',
      label: 'Stage Lighting',
      src: '/assets/11_event_videos/video_highlight_04_stage_lighting_walkthrough.mp4',
      caption: 'Theatrical Stage Lighting & Backdrop'
    },
    {
      id: 'v4',
      title: '04 Welcoming Foyer Tour',
      label: 'Reception Foyer',
      src: '/assets/11_event_videos/video_highlight_05_reception_tour.mp4',
      caption: 'Grand Reception & Guest Welcoming Lobby'
    },
    {
      id: 'v5',
      title: '05 Banquet Dining Celebration',
      label: 'Dining & Feasts',
      src: '/assets/11_event_videos/video_highlight_06_banquet_celebration.mp4',
      caption: 'Dedicated 250+ Seating Dining Floor'
    },
    {
      id: 'v6',
      title: '06 Auspicious Celebration Ambience',
      label: 'Event Ambience',
      src: '/assets/11_event_videos/video_highlight_02_event_ambience.mp4',
      caption: 'Joyous Wedding Muhurtham Ambience'
    }
  ];

  // Sound toggle handler for video
  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Video play/pause toggle
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlayingVideo(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlayingVideo(false);
      }
    }
  };

  // Switch video clip
  const handleSelectVideo = (v) => {
    setCurrentMedia({
      type: 'video',
      src: v.src,
      title: v.title,
      caption: v.caption
    });
    setIsPlayingVideo(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  // Scroll-driven console: the topic in the middle of the screen drives the pinned viewer.
  // Refs keep the observer callback pointing at the latest handler and media.
  const switchTabRef = useRef(null);
  const mediaRef = useRef(null);
  // Switch console tab and dynamically sync visual theater
  const handleSwitchTab = (tab) => {
    setActiveConsoleTab(tab);
    if (tab === 'banquet') {
      setCurrentMedia({
        type: 'image',
        src: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg',
        title: lang === 'te' ? 'రాయల్ బాంక్వెట్ డైనింగ్ హాల్ (స్వర్ణ భోజనం - 250+ సీట్లు)' : 'Royal Banquet Dining Hall (Swarna Bhojanam)',
        caption: lang === 'te' ? 'రాయల్ మెరూన్ & గోల్డ్ డామాస్క్ రౌండ్ టేబుల్స్ • ప్రత్యేక డైనింగ్ ఫ్లోర్ • జీరో మండప వాసన' : '250+ Concurrent Round-Table Seats • Maroon & Gold Damask Linens • Zero Aroma in Mandap'
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
          title: lang === 'te' ? 'ప్రత్యేక డైనింగ్ హాల్ (250+ సీట్లు)' : 'Dedicated Banquet Dining Hall',
          caption: lang === 'te' ? 'రాయల్ రౌండ్ టేబుల్స్ & ప్రత్యేక విందు ఫ్లోర్' : '250+ Concurrent Seats • Zero Food Aroma in Ceremony Mandap'
        });
      }
    } else if (tab === 'contact') {
      setCurrentMedia({
        type: 'image',
        src: '/assets/04_exterior_and_entrance/entrance_grand_steps_illuminated_night.jpeg',
        title: lang === 'te' ? 'ఎస్.ఎస్ కన్వెన్షన్ ప్రధాన ద్వారం' : 'Grand Welcoming Arch & Entrance',
        caption: lang === 'te' ? 'రాఘవేంద్ర నగర్ కాలనీ, జిల్లెలగూడ, మీర్‌పేట్' : 'Raghavendra Nagar Colony, Meerpet, Hyderabad'
      });
    }
  };

  // Toggle between Dining Hall perspective and Printed Menu Card
  const handleSwitchMenuView = (mode) => {
    setMenuViewMode(mode);
    if (mode === 'rateCard') {
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
        title: lang === 'te' ? 'ప్రత్యేక డైనింగ్ హాల్ (250+ సీట్లు)' : 'Dedicated Banquet Dining Hall',
        caption: lang === 'te' ? 'రాయల్ రౌండ్ టేబుల్స్ & ప్రత్యేక విందు ఫ్లోర్' : '250+ Concurrent Seats • Zero Food Aroma in Ceremony Mandap'
      });
    }
  };

  // Sync theater when hall is selected
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

  // Sync theater when theme is selected
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

  // Lighting filter for image theater
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

  // Auspicious Temple/Palace Drone Synthesizer via Web Audio API (Zero dependencies!)
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

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.2);
        masterGain.connect(ctx.destination);

        // Warm Low-pass Filter for meditative resonance
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(360, ctx.currentTime);
        filter.connect(masterGain);

        // Frequencies for royal Indian palace tanpura scale: C3 (130.81Hz), G3 (196.00Hz), C4 (261.63Hz)
        const notes = [130.81, 196.00, 261.63];
        const oscs = [];

        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle harmonic detuning for sacred organic palace chorus
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
    } catch (_) {
      // Audio autoplay gracefully handled
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  switchTabRef.current = handleSwitchTab;
  mediaRef.current = currentMedia;

  useEffect(() => {
    const blocks = document.querySelectorAll('[data-console-block]');
    if (!blocks.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const id = en.target.getAttribute('data-console-block');
          // Don't replace a video the visitor is watching; only move the highlight
          if (mediaRef.current?.type === 'video') setActiveConsoleTab(id);
          else switchTabRef.current?.(id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  const triggerFlowerShower = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#FFDF73', '#7A1F31', '#FF6B8B', '#FFFFFF']
      });
      window.triggerBlessings?.();
    } catch (_) {}
  };

  return (
    <div className="relative text-white overflow-x-clip border-b-2 border-[#D4AF37]/35">
      {/* ========================================================
          CHAPTER 1: FULL-SCREEN CINEMATIC LUXURY HERO SECTION
          (Grand Royal Symmetrical Palace Hero with Open Architectural Stage)
          ======================================================== */}
      <section className="relative h-[100dvh] max-h-[100dvh] min-h-[640px] flex flex-col justify-between pt-16 sm:pt-20 pb-4 overflow-hidden select-none">
        
        {/* ========================================================
            FULL-SCREEN HERO BACKGROUND IMAGE WITH SMOOTH CROSSFADE
            (Auto-changes smoothly every 5 seconds across 5 authentic angles)
            ======================================================== */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {banquetShowcaseOptions.map((item, idx) => (
            <img
              key={item.id}
              src={item.src}
              alt={item.title}
              style={{ transform: activeSlideIdx === idx ? "scale(1.07)" : "scale(1)", transition: "opacity 1000ms ease-in-out, transform 8000ms linear" }}
              className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08] saturate-[1.12] transition-opacity duration-1000 ease-in-out will-change-transform ${
                activeSlideIdx === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}

          {/* Symmetrical Palace Ambient Lighting Scrim */}
          <div className="absolute inset-0 bg-black/25 z-10" />
          <div className="absolute top-0 left-0 right-0 h-44 sm:h-52 bg-gradient-to-b from-black/85 via-black/40 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-56 sm:h-64 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
        </div>

        {/* UPPER TIER: BRAND */}
        <div className="max-w-4xl mx-auto px-4 relative z-20 text-center pt-4">
          <p className="font-serif text-xs sm:text-sm tracking-[0.3em] text-[#FFF6D1]/90 mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            || శ్రీరస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
          </p>

          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] via-[#EED9A6] to-[#C5A059] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] leading-[1.05]">
            S.S CONVENTION
          </h1>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-[#C5A059]/80" />
            <span className="text-[11px] sm:text-sm font-cinzel tracking-[0.28em] uppercase text-latte drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Wedding & Banquet Halls · Meerpet, Hyderabad
            </span>
            <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-[#C5A059]/80" />
          </div>

          <p className="mt-4 font-serif italic text-sm sm:text-lg text-mocha tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {lang === 'te'
              ? '“మీ జీవితంలోని అత్యంత మధురమైన వేడుకలకు రాజభవనం వంటి వేదిక”'
              : '“Where Grand Traditions Meet Timeless Luxury”'}
          </p>
        </div>

        <div className="flex-1 min-h-[120px] sm:min-h-[200px] pointer-events-none" />

        {/* LOWER TIER: FACTS, ACTIONS, SLIDE CONTROLS */}
        <div className="max-w-4xl mx-auto px-4 relative z-20 text-center pb-3 w-full">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-1 text-xs sm:text-sm text-latte mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {[
              [Users, '50–600 guests'],
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

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <Link to="/contact" className="btn-gold">
              <CalendarCheck className="w-4 h-4" />
              <span>{lang === 'te' ? 'హాల్ విజిట్ బుక్ చేయండి' : 'Book a hall visit'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button onClick={() => { handleSelectVideo(venueVideos[0]); document.getElementById('interactive-console')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-outline-gold backdrop-blur-md bg-black/30">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Video tour</span>
            </button>

            <button
              onClick={toggleTempleAudio}
              aria-label={isTempleAudioActive ? 'Mute palace ambience' : 'Play palace ambience'}
              className={`w-11 h-11 inline-flex items-center justify-center rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                isTempleAudioActive
                  ? 'bg-amber-400 text-[#3D0A14] border-amber-300 animate-pulse'
                  : 'bg-black/30 text-latte border-[#C5A059]/50 hover:border-[#C5A059]'
              }`}
            >
              <Music2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button onClick={handlePrevSlide} aria-label="Previous view" className="text-latte/80 hover:text-amber-300 transition-colors text-lg leading-none cursor-pointer">‹</button>
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
            <button onClick={handleNextSlide} aria-label="Next view" className="text-latte/80 hover:text-amber-300 transition-colors text-lg leading-none cursor-pointer">›</button>
            <span className="hidden sm:inline text-xs font-cinzel tracking-widest text-mocha min-w-[140px] text-left">{currentSlide.shortTitle}</span>
          </div>

          <a href="#interactive-console" aria-label="Scroll to explore" className="mt-4 inline-flex flex-col items-center text-amber-300/80 hover:text-amber-300">
            <span className="block w-px h-8 bg-gradient-to-b from-amber-300/0 to-amber-300 animate-pulse" />
            <ChevronDown className="w-4 h-4 -mt-1" />
          </a>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 2: EXPLORE THE VENUE (interactive console)
          Scroll-driven: the viewer stays pinned on the left while the five
          topics scroll past on the right and switch what the viewer shows.
          ======================================================== */}
      <section id="interactive-console" className="relative z-10 bg-[#2A060E] border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">Take a closer look</p>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide text-latte">Explore the Venue</h2>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#C5A059] to-transparent" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">
          {/* Pinned viewer */}
          <div className="lg:col-span-6 sticky top-[72px] lg:top-24 z-20 pt-4 pb-3 lg:py-8 bg-[#2A060E] lg:bg-transparent">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black h-[34vh] sm:h-[44vh] lg:h-auto lg:aspect-[4/5] lg:max-h-[72vh] w-full">
              {currentMedia.type === 'video' ? (
                <video
                  ref={videoRef}
                  key={currentMedia.src}
                  src={currentMedia.src}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <AnimatePresence mode="sync">
                  <motion.img
                    key={currentMedia.src}
                    src={currentMedia.src}
                    alt={currentMedia.title}
                    style={getLightingFilter()}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              )}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

              <div className="absolute top-3 right-3 flex items-center gap-2">
                {currentMedia.type === 'video' && (
                  <>
                    <button
                      onClick={togglePlayPause}
                      aria-label={isPlayingVideo ? 'Pause video' : 'Play video'}
                      className="w-9 h-9 rounded-full bg-black/60 border border-white/25 text-white flex items-center justify-center hover:bg-[#7A1F31] transition-colors"
                    >
                      {isPlayingVideo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={toggleSound}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                      className="w-9 h-9 rounded-full bg-black/60 border border-white/25 text-white flex items-center justify-center hover:bg-[#7A1F31] transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </>
                )}
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

            {/* Video tours */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] tracking-[0.25em] uppercase text-amber-300 whitespace-nowrap pr-1">Video tours</span>
              {venueVideos.map((v) => {
                const on = currentMedia.src === v.src && currentMedia.type === 'video';
                return (
                  <button
                    key={v.id}
                    onClick={() => handleSelectVideo(v)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition-colors ${
                      on ? 'bg-amber-300 text-[#3D0A14] border-amber-300 font-bold' : 'border-[#D4AF37]/35 text-mocha hover:text-latte hover:border-[#D4AF37]/70'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" /> {v.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topics that scroll past the pinned viewer */}
          <div className="lg:col-span-6">
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
                  className={`min-h-[55vh] lg:min-h-[78vh] flex flex-col justify-center py-10 border-b border-[#D4AF37]/15 last:border-b-0 transition-opacity duration-500 ${
                    on ? 'opacity-100' : 'opacity-40 hover:opacity-80'
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
                {[['hall', 'Hall'], ['foyer', 'Stage']].map(([angle, label]) => (
                  <button
                    key={angle}
                    onClick={() => handleSelectHall(selectedHallIdx, angle)}
                    className={`px-3 py-1 rounded-full border transition-colors ${
                      hallViewAngle === angle && currentMedia.type === 'image'
                        ? 'bg-amber-300 text-[#3D0A14] border-amber-300 font-bold'
                        : 'border-[#D4AF37]/35 hover:text-latte'
                    }`}
                  >
                    {label}
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
                {[['day', 'Day', Sun], ['theatrical', 'Stage', Sparkles], ['haldi', 'Haldi', Flame]].map(([mode, label, Icon]) => (
                  <button
                    key={mode}
                    onClick={() => setLightingMode(mode)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${
                      lightingMode === mode ? 'bg-amber-300 text-[#3D0A14] border-amber-300 font-bold' : 'border-[#D4AF37]/35 hover:text-latte'
                    }`}
                  >
                    <Icon className="w-3 h-3" /> {label}
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
                {[['veg', 'Vegetarian', Leaf, 0], ['nonVeg', 'Non-Veg', Drumstick, 1]].map(([type, label, Icon, firstTier]) => (
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
                    <Icon className="w-3.5 h-3.5" /> {label}
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
                <a
                  href={`https://wa.me/${venueData.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
  </div>
  );
}
