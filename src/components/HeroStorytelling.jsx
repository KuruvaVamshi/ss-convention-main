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
  // Master Single-View Console Active Tab: 'banquet' | 'halls' | 'themes' | 'menus' | 'contact'
  const [activeConsoleTab, setActiveConsoleTab] = useState('banquet');

  // Video / Visual Theater State: Initialized with the Royal Banquet Dining Hall (Maroon & Gold Damask)
  const [currentMedia, setCurrentMedia] = useState({
    type: 'image',
    src: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg',
    title: lang === 'te' ? 'రాయల్ బాంక్వెట్ డైనింగ్ హాల్ (స్వర్ణ భోజనం - 250+ సీట్లు)' : 'Royal Banquet Dining Hall (Swarna Bhojanam)',
    caption: lang === 'te' ? 'రాయల్ మెరూన్ & గోల్డ్ డామాస్క్ రౌండ్ టేబుల్స్ • ప్రత్యేక డైనింగ్ ఫ్లోర్ • జీరో మండప వాసన' : '250+ Concurrent Round-Table Seats • Maroon & Gold Damask Linens • Zero Aroma in Mandap'
  });

  const [isMuted, setIsMuted] = useState(true);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isTempleAudioActive, setIsTempleAudioActive] = useState(false);
  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioOscillatorsRef = useRef([]);

  // Palace Venue Spotlight Quick Selector Options
  const banquetShowcaseOptions = [
    {
      id: 'dining-hall',
      title: lang === 'te' ? 'రాయల్ బాంక్వెట్ డైనింగ్ హాల్ (250+ సీట్లు)' : 'Royal Banquet Dining Hall (250+ Seats)',
      shortTitle: 'Royal Banquet Hall',
      badge: '250+ Seats',
      src: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg',
      desc: lang === 'te' ? 'రాచరిక మెరూన్ & గోల్డ్ డామాస్క్ రౌండ్ టేబుల్స్ మరియు గోల్డ్ ఓర్గాంజా చైర్ బోస్.' : 'Round banquet tables in royal maroon & gold damask with golden organza chair ties.'
    },
    {
      id: 'hall-vasishta',
      title: lang === 'te' ? 'హాల్ వశిష్ట – గ్రాండ్ కళ్యాణ మండపం (600 Pax)' : 'Hall Vasishta – Grand Kalyana Mandapam (600 Pax)',
      shortTitle: 'Grand Kalyana Mandapam',
      badge: '600 Pax',
      src: '/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg',
      desc: lang === 'te' ? 'డబుల్-టైర్ క్రిస్టల్ షాండ్లియర్స్, ఇటాలియన్ టైల్స్ & 70 అడుగుల బ్రైడల్ ఐల్.' : 'Double-tier crystal chandeliers, Italian vitrified reflections & 70-ft bridal walk.'
    },
    {
      id: 'hall-agasthya',
      title: lang === 'te' ? 'హాల్ అగస్త్య – ఈవెనింగ్ రిసెప్షన్ స్టేజ్ (350 Pax)' : 'Hall Agasthya – Royal Reception Stage (350 Pax)',
      shortTitle: 'Evening Reception Stage',
      badge: '350 Pax',
      src: '/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg',
      desc: lang === 'te' ? 'ఇంపీరియల్ వెల్వెట్ సోఫా, ఫ్లోరల్ రింగ్ ఆర్చ్ & డిజిటల్ స్టేజ్ లైటింగ్.' : 'Imperial velvet sofa, modern floral ring arch & intelligent stage lighting.'
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
      caption: angle === 'hall' ? `${hall.name} - Chandelier Seating Overview` : `${hall.name} - Stage & Aisle Perspective`
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
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 text-white overflow-hidden border-b-2 border-[#D4AF37]/35 min-h-[92vh]">
      {/* ========================================================
          PANORAMIC AMBIENT ROYAL BANQUET HALL BACKDROP
          (Featuring Authentic Round Tables with Maroon & Gold Damask Linens)
          ======================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <img
          src="/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg"
          alt="SS Convention Royal Banquet Hall Atmosphere"
          className="w-full h-full object-cover object-center filter brightness-[0.22] saturate-[1.25] contrast-[1.12] scale-105"
        />
        {/* Layered Imperial Velvet Gradients & Golden Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E070F]/95 via-[#450B17]/90 to-[#2A060E]/98" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,_rgba(212,175,55,0.18),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#1C0308] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1C0308] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            1. PALACE CREST & ROYAL INSIGNIA BANNER
            ======================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          
          {/* Sacred Telugu Heritage Insignia Ribbon */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-[#350710]/90 border border-[#D4AF37]/50 shadow-[0_4px_20px_rgba(212,175,55,0.25)] backdrop-blur-md mb-4 group hover:border-amber-400 transition-all">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.24em] text-amber-200 uppercase">
              {lang === 'te' 
                ? 'శుభం భవతు • మీర్‌పేట్ • జిల్లెలగూడ • హైదరాబాద్' 
                : 'MEERPET • JILLELAGUDA • HYDERABAD — ROYAL A/C CONVENTION'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 hidden sm:inline-block" />
            <span className="text-[10px] font-bold text-amber-300/90 hidden sm:inline-block">
              {lang === 'te' ? '2026-27 ముహూర్త బుకింగ్స్ ఓపెన్' : '2026–2027 Muhurthams Open'}
            </span>
          </div>

          {/* Grand Regal Headline with Metallic Gold Shimmer */}
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.05em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-[1.08] mb-3">
            S.S <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">CONVENTION</span>
          </h1>

          {/* Heritage Tagline (Cinzel & Serif Elegance) */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-amber-200 font-semibold tracking-wide mb-3 drop-shadow">
            {lang === 'te' 
              ? '“మీ జీవితంలోని అత్యంత మధురమైన వేడుకలకు రాజభవనం వంటి వేదిక”' 
              : '“Where Grand Traditions Meet Timeless Luxury”'}
          </p>

          <p className="text-xs sm:text-sm md:text-base text-amber-100/90 max-w-3xl mx-auto font-normal leading-relaxed mb-6">
            {lang === 'te'
              ? 'హైదరాబాద్‌లో 600 మంది అతిథుల సెంట్రల్ A/C గ్రాండ్ హాల్, ప్రత్యేక 250+ సీట్ల విందు భోజన ఫ్లోర్, వేద కళ్యాణ వేదికలు మరియు విశాలమైన పార్కింగ్. క్రింద ఉన్న సింగిల్-విండో థియేటర్‌లో అన్ని హాల్స్, డెకర్ లైట్స్ మరియు బిర్యానీ మెనూలను లైవ్‌గా చూడండి.'
              : 'Meerpet’s premier 600-guest luxury central A/C convention hall featuring Italian marble floors, dual crystal chandeliers, dedicated 250+ banquet dining, and verified in-house decor artisans. Explore everything interactively below.'}
          </p>

          {/* 5 Pillars of Prestige Badge Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 text-amber-200 font-semibold shadow-sm">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>600+ Pax Capacity</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 text-amber-200 font-semibold shadow-sm">
              <Snowflake className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Central Cassette A/C</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-500/20 border border-amber-300 text-amber-200 font-bold shadow-sm">
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-300" />
              <span>Dedicated 250+ Banquet Dining</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 text-amber-200 font-semibold shadow-sm">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              <span>3 Named Luxury Halls</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 text-amber-200 font-semibold shadow-sm">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>Dedicated On-Premise Parking</span>
            </div>
          </div>

          {/* PALACE VENUE SPOTLIGHT QUICK SELECTOR (Direct Instant Switcher) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest mr-1 hidden sm:inline">
              Instant Spotlight:
            </span>
            {banquetShowcaseOptions.map((item) => {
              const isSelected = currentMedia.src === item.src;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentMedia({
                      type: 'image',
                      src: item.src,
                      title: item.title,
                      caption: item.desc
                    });
                    if (item.id === 'dining-hall') setActiveConsoleTab('banquet');
                    else if (item.id === 'hall-agasthya') setActiveConsoleTab('themes');
                    else setActiveConsoleTab('halls');
                  }}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md transition-all duration-300 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] border-amber-300 font-bold scale-105'
                      : 'bg-black/60 hover:bg-[#4D0D19] border-[#D4AF37]/50 text-white'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full overflow-hidden border border-amber-300/80 flex-shrink-0">
                    <img src={item.src} alt={item.shortTitle} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-cinzel text-[11px]">
                    {item.shortTitle}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-[#3D0A14] text-amber-300' : 'bg-black/40 text-amber-300'}`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
            <button
              onClick={() => handleSelectVideo(venueVideos[0])}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-cinzel shadow-md transition-all border ${
                currentMedia.type === 'video'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] border-amber-300 scale-105'
                  : 'bg-black/60 text-amber-300 border-amber-400/60 hover:bg-[#4D0D19]'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>4K Walkthrough</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            2. MASTER SINGLE-VIEW WINDOW CONSOLE (Interactive Cockpit)
            ======================================================== */}
        <div className="bg-[#350710]/95 backdrop-blur-2xl rounded-[32px] border-2 border-[#D4AF37]/60 shadow-[0_24px_70px_rgba(0,0,0,0.7)] overflow-hidden p-4 sm:p-6 lg:p-8 text-white relative">
          
          {/* Top Master Options Switcher Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-[#D4AF37]/35">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleSwitchTab('banquet')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeConsoleTab === 'banquet'
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] shadow-lg shadow-amber-500/30 scale-105 font-extrabold'
                    : 'bg-[#4D0D19] text-amber-100/90 hover:bg-[#631422] border border-[#D4AF37]/40'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>{lang === 'te' ? 'రాయల్ బాంక్వెట్ హాల్ (250+ సీట్లు)' : 'Royal Banquet Dining (250+ Seats)'}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#3D0A14] text-amber-300 font-extrabold">
                  ★
                </span>
              </button>

              <button
                onClick={() => handleSwitchTab('halls')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeConsoleTab === 'halls'
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] shadow-lg shadow-amber-500/30 scale-105 font-extrabold'
                    : 'bg-[#4D0D19] text-amber-100/90 hover:bg-[#631422] border border-[#D4AF37]/40'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>{lang === 'te' ? 'హాల్స్ & సీటింగ్ (3 Halls)' : 'The 3 Halls (Vasishta, Agasthya, Koundinya)'}</span>
              </button>

              <button
                onClick={() => handleSwitchTab('themes')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeConsoleTab === 'themes'
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] shadow-lg shadow-amber-500/30 scale-105 font-extrabold'
                    : 'bg-[#4D0D19] text-amber-100/90 hover:bg-[#631422] border border-[#D4AF37]/40'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>{lang === 'te' ? 'స్టేజ్ డెకర్ & లైట్స్' : 'Themes & Stage Lighting'}</span>
              </button>

              <button
                onClick={() => handleSwitchTab('menus')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeConsoleTab === 'menus'
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] shadow-lg shadow-amber-500/30 scale-105 font-extrabold'
                    : 'bg-[#4D0D19] text-amber-100/90 hover:bg-[#631422] border border-[#D4AF37]/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'te' ? 'విందు భోజనం మెనూలు' : 'Banquet Menus (Dum Biryani & Veg)'}</span>
              </button>

              <button
                onClick={() => handleSwitchTab('contact')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeConsoleTab === 'contact'
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] shadow-lg shadow-amber-500/30 scale-105 font-extrabold'
                    : 'bg-[#4D0D19] text-amber-100/90 hover:bg-[#631422] border border-[#D4AF37]/40'
                }`}
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>{lang === 'te' ? 'ముహూర్తం & బుకింగ్' : 'Instant Date Pass & WhatsApp'}</span>
              </button>
            </div>

            {/* Sacred Palace Temple Drone Ambience Audio Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTempleAudio}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  isTempleAudioActive
                    ? 'bg-amber-400 text-[#3D0A14] border-amber-300 shadow-md animate-pulse'
                    : 'bg-[#4D0D19] text-amber-200 border-[#D4AF37]/40 hover:bg-[#631422]'
                }`}
                title="Toggle Auspicious Palace Tanpura Harmony"
              >
                <Music2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Palace Aura Sound</span>
                <span className="sm:hidden">Aura</span>
                {isTempleAudioActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-ping" />
                ) : null}
              </button>

              {/* 4K Video Player Mode Trigger */}
              <button
                onClick={() => handleSelectVideo(venueVideos[0])}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all border ${
                  currentMedia.type === 'video'
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] shadow-lg shadow-amber-500/25 font-extrabold'
                    : 'bg-[#4D0D19] text-amber-200 border-[#D4AF37]/45 hover:bg-[#631422]'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{lang === 'te' ? 'లైవ్ వీడియో థియేటర్' : 'Stream 4K Walkthrough'}</span>
              </button>
            </div>
          </div>

          {/* Unified 12-Column Single View Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* ========================================================
                LEFT: CRYSTAL-CLEAR CINEMATIC VIDEO & VISUAL THEATER (7 Cols)
                ======================================================== */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              
              {/* Theater Screen with Ultra-Vivid Clarity (Zero muddy overlay!) */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/70 shadow-[0_12px_40px_rgba(212,175,55,0.25)] aspect-[16/10] bg-[#100608] group">
                {currentMedia.type === 'video' ? (
                  <video
                    ref={videoRef}
                    key={currentMedia.src}
                    src={currentMedia.src}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover object-center filter brightness-[1.05] contrast-[1.05] saturate-[1.08]"
                  />
                ) : (
                  <img
                    src={currentMedia.src}
                    alt={currentMedia.title}
                    style={getLightingFilter()}
                    className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
                  />
                )}

                {/* Subtle top & bottom shadow gradient for HUD readability only */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />

                {/* Theater Overlay HUD Top Bar */}
                <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{currentMedia.type === 'video' ? 'Real 4K Walkthrough Video' : 'Real Venue Dimension View'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentMedia.type === 'video' && (
                      <>
                        <button
                          onClick={togglePlayPause}
                          aria-label={isPlayingVideo ? "Pause video" : "Play video"}
                          className="p-2 rounded-full bg-black/80 text-white border border-white/30 hover:bg-[#7A1F31] transition-all shadow-md"
                          title={isPlayingVideo ? "Pause Video" : "Play Video"}
                        >
                          {isPlayingVideo ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />}
                        </button>
                        
                        {/* Audio Unmute Button with Dancing Equalizer Bars */}
                        <button
                          onClick={toggleSound}
                          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border shadow-md transition-all ${
                            isMuted 
                              ? 'bg-black/80 text-amber-200 border-white/30 hover:bg-[#7A1F31]' 
                              : 'bg-emerald-500 text-[#100608] border-emerald-400 font-bold'
                          }`}
                          title={isMuted ? "Unmute Venue Video Sound" : "Mute Video Sound"}
                        >
                          {isMuted ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-amber-300" />
                              <span className="text-[10px] uppercase font-bold">Unmute</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-[#100608]" />
                              <div className="flex items-end gap-0.5 h-3">
                                <span className="w-0.5 bg-[#100608] animate-pulse h-full" />
                                <span className="w-0.5 bg-[#100608] animate-pulse h-2" style={{ animationDelay: '150ms' }} />
                                <span className="w-0.5 bg-[#100608] animate-pulse h-3" style={{ animationDelay: '300ms' }} />
                              </div>
                            </>
                          )}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => onOpenLightbox(currentMedia.src, currentMedia.title)}
                      className="p-2 rounded-full bg-black/80 text-white border border-white/30 hover:bg-[#7A1F31] transition-all shadow-md"
                      title="Fullscreen Lightbox"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-amber-200" />
                    </button>
                  </div>
                </div>

                {/* Theater Overlay Bottom Bar */}
                <div className="absolute bottom-3 left-4 right-4 z-20 flex items-end justify-between">
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {currentMedia.title}
                    </h3>
                    <p className="text-xs text-amber-200 font-medium drop-shadow">
                      {currentMedia.caption}
                    </p>
                  </div>

                  {currentMedia.type === 'video' && (
                    <span className="px-2.5 py-1 rounded-full bg-black/75 border border-[#D4AF37]/50 text-amber-300 text-[10px] font-mono font-bold shadow-md">
                      4K Ultra HD
                    </span>
                  )}
                </div>
              </div>

              {/* 6 Video Walkthrough Reels Selector Ribbon */}
              <div className="p-2 rounded-2xl bg-[#2A060E] border border-[#D4AF37]/40 flex items-center justify-between gap-1.5 overflow-x-auto">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider px-2 whitespace-nowrap">
                  6 Video Tours:
                </span>
                {venueVideos.map((v) => {
                  const isCurrent = currentMedia.src === v.src && currentMedia.type === 'video';
                  return (
                    <button
                      key={v.id}
                      onClick={() => handleSelectVideo(v)}
                      className={`flex-1 min-w-[100px] py-1.5 px-2.5 rounded-xl text-[10px] font-bold tracking-wide transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                        isCurrent
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] font-bold shadow-md scale-105'
                          : 'bg-[#3A0813] text-amber-100 hover:bg-[#52101C] border border-[#D4AF37]/35'
                      }`}
                    >
                      <Play className={`w-2.5 h-2.5 ${isCurrent ? 'fill-[#3D0A14]' : 'text-amber-300'}`} />
                      <span>{v.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================
                RIGHT: INTERACTIVE OPTIONS COCKPIT (5 Cols - Single View)
                ======================================================== */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#2E070F] p-5 sm:p-6 rounded-2xl border-2 border-[#D4AF37]/45 overflow-hidden text-white shadow-xl">
              <AnimatePresence mode="wait">
                
                {/* PANEL 0: ROYAL BANQUET DINING HALL (SWARNA BHOJANAM) */}
                {activeConsoleTab === 'banquet' && (
                  <motion.div
                    key="banquet"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-300 tracking-[0.22em] uppercase flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Dedicated Dining Sanctuary</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/50 border border-amber-400/50 text-amber-300 text-[10px] font-bold shadow-sm">
                        <UtensilsCrossed className="w-3 h-3 text-amber-400" />
                        <span>250+ Seats Concurrently</span>
                      </span>
                    </div>

                    {/* Banquet Highlight Card */}
                    <div className="p-4 rounded-xl bg-[#3A0813] border border-[#D4AF37]/40 shadow-sm space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-cinzel text-lg font-bold text-white leading-tight">
                            {lang === 'te' ? 'స్వర్ణ భోజనం – రాయల్ బాంక్వెట్ హాల్' : 'Swarna Bhojanam – Royal Banquet Floor'}
                          </h4>
                          <span className="text-xs text-amber-300 font-medium block mt-0.5">
                            Round Tables with Royal Maroon & Gold Damask Linens
                          </span>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-black/40 text-amber-200 border border-[#D4AF37]/30 whitespace-nowrap">
                          3,500 sq.ft
                        </span>
                      </div>

                      <p className="text-xs text-amber-100/90 font-light leading-relaxed">
                        {lang === 'te'
                          ? 'ప్రత్యేక అంతస్తులో ఏర్పాటు చేయబడిన ఈ విశాలమైన డైనింగ్ హాల్‌లో 250+ మంది ఒకేసారి రౌండ్ టేబుల్స్‌పై కూర్చుని విందు ఆరగించవచ్చు. పవిత్ర వివాహ మండపంలోకి ఎటువంటి వంట వాసనలు రాకుండా ప్రత్యేక ఎగ్జాస్ట్ వ్యవస్థ కలదు.'
                          : 'Engineered on an independent floor with 250+ concurrent round-table seats draped in imperial maroon and shimmering gold organza. Physically isolated with high-velocity odor exhaust so zero cooking aromas enter the sacred marriage mandap.'}
                      </p>

                      {/* 4 Distinct Banquet Pillars */}
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div className="p-2.5 rounded-lg bg-black/35 border border-[#D4AF37]/25 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block text-[11px]">Zero Mandap Aroma</strong>
                            <span className="text-[10px] text-amber-200/80">Dedicated Floor & Exhaust</span>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-black/35 border border-[#D4AF37]/25 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block text-[11px]">12-Tap Granite Handwash</strong>
                            <span className="text-[10px] text-amber-200/80">Pure RO Purified Water</span>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-black/35 border border-[#D4AF37]/25 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block text-[11px]">Catering Service Lift</strong>
                            <span className="text-[10px] text-amber-200/80">Fast hot food delivery</span>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-black/35 border border-[#D4AF37]/25 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block text-[11px]">1,500+ Feasts Capacity</strong>
                            <span className="text-[10px] text-amber-200/80">Rolling batches ~25 mins</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Guest Count & Batch Estimator */}
                    <div className="p-3.5 rounded-xl bg-[#3A0813] border border-[#D4AF37]/35 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-300">
                          Estimate Seating Batches:
                        </span>
                        <strong className="text-white">
                          {banquetSeatingBatch} Attendees = {Math.ceil(banquetSeatingBatch / 250)} Batch{Math.ceil(banquetSeatingBatch / 250) > 1 ? 'es' : ''}
                        </strong>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[150, 250, 500, 750].map((count) => (
                          <button
                            key={count}
                            onClick={() => setBanquetSeatingBatch(count)}
                            className={`py-1 px-2 rounded-lg text-[10px] font-bold transition-all border ${
                              banquetSeatingBatch === count
                                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] border-amber-300 shadow-sm'
                                : 'bg-[#24050B] text-amber-200 hover:text-white border-[#D4AF37]/30'
                            }`}
                          >
                            {count} Guests
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Banquet CTAs */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        to="/halls/dining-hall"
                        className="block text-center py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105"
                      >
                        Explore Banquet Floor Specs →
                      </Link>
                      <Link
                        to="/menus"
                        className="block text-center py-2.5 rounded-full border border-amber-400/80 text-amber-300 hover:bg-white/10 font-cinzel text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        View Catering Feasts & Menus →
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* PANEL 1: THE 3 HALLS */}
                {activeConsoleTab === 'halls' && (
                  <motion.div
                    key="halls"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-300 tracking-[0.22em] uppercase">
                        Select Hall to Inspect
                      </span>
                      <span className="text-[11px] font-bold text-amber-200">
                        3 Dedicated Spaces
                      </span>
                    </div>

                    {/* 3 Named Hall Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      {spacesData.slice(0, 3).map((hall, idx) => (
                        <button
                          key={hall.id}
                          onClick={() => handleSelectHall(idx, hallViewAngle)}
                          className={`p-2.5 rounded-xl text-center transition-all border ${
                            selectedHallIdx === idx
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] border-amber-400 shadow-md font-bold scale-105'
                              : 'bg-[#3A0813] text-amber-100 border-[#D4AF37]/35 hover:bg-[#52101C]'
                          }`}
                        >
                          <span className="block font-cinzel text-xs font-bold leading-tight">
                            {hall.name}
                          </span>
                          <span className={`text-[10px] block mt-0.5 ${selectedHallIdx === idx ? 'text-[#3D0A14]' : 'text-amber-200/80'}`}>
                            {hall.capacity}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Selected Hall Detail Box */}
                    <div className="p-4 rounded-xl bg-[#3A0813] border border-[#D4AF37]/35 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-cinzel text-base font-bold text-white">
                          {currentHall.name}
                        </h4>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-[10px] font-bold">
                          <Users className="w-3 h-3 text-amber-300" />
                          <span>{currentHall.capacityDisplay}</span>
                        </span>
                      </div>

                      <p className="text-xs text-amber-100/85 font-light leading-relaxed">
                        {currentHall.description}
                      </p>

                      <div className="pt-2 border-t border-[#D4AF37]/25 flex items-center justify-between text-xs">
                        <span className="text-amber-300 font-semibold flex items-center gap-1">
                          <Snowflake className="w-3.5 h-3.5 text-amber-300" />
                          <span>Cassette A/C + Genset</span>
                        </span>
                        <strong className="text-amber-200 font-medium text-[11px]">
                          Best: {currentHall.bestFor}
                        </strong>
                      </div>
                    </div>

                    {/* Dual Interior Perspective Angle Switcher */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#3A0813] border border-[#D4AF37]/35">
                      <span className="text-xs font-bold text-amber-300">
                        Interior Angle:
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleSelectHall(selectedHallIdx, 'hall')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            hallViewAngle === 'hall' && currentMedia.type === 'image'
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] shadow-sm'
                              : 'bg-[#24050B] text-amber-200 hover:text-white'
                          }`}
                        >
                          Chandelier Overview
                        </button>
                        <button
                          onClick={() => handleSelectHall(selectedHallIdx, 'foyer')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            hallViewAngle === 'foyer' && currentMedia.type === 'image'
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] shadow-sm'
                              : 'bg-[#24050B] text-amber-200 hover:text-white'
                          }`}
                        >
                          Stage & Aisle
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        to={`/halls/${currentHall.id}`}
                        className="block text-center py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105"
                      >
                        Explore {currentHall.name} Details →
                      </Link>
                      <Link
                        to="/spaces"
                        className="block text-center py-2.5 rounded-full border border-amber-400/80 text-amber-300 hover:bg-white/10 font-cinzel text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        Compare All Halls →
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* PANEL 2: THEMES & LIGHTING SIMULATOR */}
                {activeConsoleTab === 'themes' && (
                  <motion.div
                    key="themes"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-300 tracking-[0.22em] uppercase">
                        Interactive Stage Lighting
                      </span>
                      <span className="text-[11px] font-bold text-amber-200">
                        Live Color Grade
                      </span>
                    </div>

                    {/* 4 Theme Stage Selector */}
                    <div className="grid grid-cols-2 gap-2">
                      {themesData.slice(0, 4).map((theme, idx) => (
                        <button
                          key={theme.id}
                          onClick={() => handleSelectTheme(idx)}
                          className={`p-2.5 rounded-xl text-left transition-all border ${
                            selectedThemeIdx === idx && currentMedia.type === 'image'
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] border-amber-400 shadow-md font-bold'
                              : 'bg-[#3A0813] text-amber-100 border-[#D4AF37]/35 hover:bg-[#52101C]'
                          }`}
                        >
                          <span className="block font-cinzel text-xs font-bold leading-tight line-clamp-1">
                            {theme.title}
                          </span>
                          <span className={`text-[9px] block mt-0.5 ${selectedThemeIdx === idx ? 'text-[#3D0A14]' : 'text-amber-200/80'}`}>
                            {theme.category}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Interactive Lighting Mode Switcher */}
                    <div className="p-3.5 rounded-xl bg-[#3A0813] border border-[#D4AF37]/35 space-y-2">
                      <span className="text-[11px] font-bold text-amber-300 block uppercase tracking-wider">
                        Simulate Stage Lighting:
                      </span>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => setLightingMode('day')}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                            lightingMode === 'day'
                              ? 'bg-amber-400 text-[#3D0A14] shadow-sm font-bold'
                              : 'bg-[#24050B] text-amber-200 hover:text-white'
                          }`}
                        >
                          <Sun className="w-3 h-3" />
                          <span>Daylight</span>
                        </button>
                        <button
                          onClick={() => setLightingMode('theatrical')}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                            lightingMode === 'theatrical'
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] shadow-sm font-bold'
                              : 'bg-[#24050B] text-amber-200 hover:text-white'
                          }`}
                        >
                          <Moon className="w-3 h-3" />
                          <span>Theatrical</span>
                        </button>
                        <button
                          onClick={() => setLightingMode('haldi')}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                            lightingMode === 'haldi'
                              ? 'bg-amber-600 text-white shadow-sm font-bold'
                              : 'bg-[#24050B] text-amber-200 hover:text-white'
                          }`}
                        >
                          <Flame className="w-3 h-3" />
                          <span>Haldi</span>
                        </button>
                      </div>
                    </div>

                    <Link
                      to="/themes"
                      className="block text-center py-2.5 rounded-full border-2 border-amber-400 text-amber-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-[#3D0A14] font-cinzel text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                    >
                      Explore All 12 Décor Themes & Stages →
                    </Link>
                  </motion.div>
                )}

                {/* PANEL 3: BANQUET FEASTS & GUEST CALCULATOR */}
                {activeConsoleTab === 'menus' && (
                  <motion.div
                    key="menus"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="space-y-3.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-300 tracking-[0.22em] uppercase">
                        Live Feast Customizer
                      </span>
                      <span className="text-[11px] font-bold text-amber-200">
                        Separate Dining Level
                      </span>
                    </div>

                    {/* Veg vs Non-Veg Switcher */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setDietaryType('veg');
                          setSelectedMenuTier(0);
                          if (menuViewMode === 'rateCard') {
                            setCurrentMedia({
                              type: 'image',
                              src: cateringMenus.veg[0].image,
                              title: `${cateringMenus.veg[0].title} (Official Menu Card)`,
                              caption: `${cateringMenus.veg[0].badge} • Min ${cateringMenus.veg[0].minPax} Pax`
                            });
                          }
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          dietaryType === 'veg'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-[#3A0813] text-emerald-300 border border-emerald-500/40 hover:bg-[#52101C]'
                        }`}
                      >
                        <Leaf className="w-3.5 h-3.5" />
                        <span>Pure Veg</span>
                      </button>
                      <button
                        onClick={() => {
                          setDietaryType('nonVeg');
                          setSelectedMenuTier(1);
                          if (menuViewMode === 'rateCard') {
                            setCurrentMedia({
                              type: 'image',
                              src: cateringMenus.nonVeg[1].image,
                              title: `${cateringMenus.nonVeg[1].title} (Official Menu Card)`,
                              caption: `${cateringMenus.nonVeg[1].badge} • Min ${cateringMenus.nonVeg[1].minPax} Pax`
                            });
                          }
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          dietaryType === 'nonVeg'
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] font-bold shadow-sm'
                            : 'bg-[#3A0813] text-amber-200 border border-[#D4AF37]/40 hover:bg-[#52101C]'
                        }`}
                      >
                        <Drumstick className="w-3.5 h-3.5" />
                        <span>Dum Biryani Feast</span>
                      </button>
                    </div>

                    {/* Menu Tier Switcher */}
                    <div className="flex flex-wrap gap-1.5">
                      {currentMenus.map((menu, idx) => (
                        <button
                          key={menu.id}
                          onClick={() => {
                            setSelectedMenuTier(idx);
                            if (menuViewMode === 'rateCard') {
                              setCurrentMedia({
                                type: 'image',
                                src: menu.image,
                                title: `${menu.title} (Official Menu Card)`,
                                caption: `${menu.badge} • Min ${menu.minPax} Pax`
                              });
                            }
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border ${
                            selectedMenuTier === idx
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] border-amber-400 font-bold shadow-sm'
                              : 'bg-[#3A0813] text-amber-100 border-[#D4AF37]/35 hover:bg-[#52101C]'
                          }`}
                        >
                          {menu.title}
                        </button>
                      ))}
                    </div>

                    {/* Screen View Toggle: Dining Hall vs Printed Rate Card */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#3A0813] border border-[#D4AF37]/35">
                      <span className="text-[11px] font-bold text-amber-300">
                        View:
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleSwitchMenuView('dining')}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            menuViewMode === 'dining' && currentMedia.type === 'image'
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] font-bold shadow-sm'
                              : 'bg-[#24050B] text-amber-200 hover:text-white'
                          }`}
                        >
                          Dining Hall (250+ Seats)
                        </button>
                        <button
                          onClick={() => handleSwitchMenuView('rateCard')}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                            menuViewMode === 'rateCard' && currentMedia.type === 'image'
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] font-bold shadow-sm'
                              : 'bg-[#24050B] text-amber-200 hover:text-white'
                          }`}
                        >
                          <FileText className="w-3 h-3" />
                          <span>Printed Rate Card</span>
                        </button>
                      </div>
                    </div>

                    {/* Live Guest Count Slider */}
                    <div className="p-3 rounded-xl bg-[#3A0813] border border-[#D4AF37]/35 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-amber-300">
                          Guests: {guestCount} Pax
                        </span>
                        <span className="text-[10px] text-amber-200 font-bold">
                          {Math.ceil(guestCount / 250)} Seating Batches (250 Seats)
                        </span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="600"
                        step="25"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full h-2 bg-[#24050B] rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>

                    <Link
                      to="/menus"
                      className="block text-center py-2.5 rounded-full border-2 border-amber-400 text-amber-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-[#3D0A14] font-cinzel text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                    >
                      View All 7 Printed Rate Cards →
                    </Link>
                  </motion.div>
                )}

                {/* PANEL 4: BOOK VISIT & DIRECT CONTACT */}
                {activeConsoleTab === 'contact' && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-300 tracking-[0.22em] uppercase">
                        Direct Venue Inquiry
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400">
                        Open Every Day
                      </span>
                    </div>

                    {/* Direct Phone Dial Card */}
                    <a
                      href="tel:918985700044"
                      className="p-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] flex items-center justify-between shadow-lg hover:scale-[1.02] transition-all group"
                    >
                      <div>
                        <span className="text-[10px] text-[#5A101E] block uppercase tracking-wider font-bold">
                          Primary Booking Line
                        </span>
                        <strong className="text-base font-cinzel tracking-wider block mt-0.5">
                          +91 89857 00044
                        </strong>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#3D0A14] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-4 h-4 text-amber-300" />
                      </div>
                    </a>

                    {/* Secondary Phone & WhatsApp */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="https://wa.me/918985700044?text=Hi%20SS%20Convention,%20I%20would%20like%20to%20inquire%20about%20hall%20availability."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-emerald-600 text-white text-center font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:bg-emerald-700 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Chat</span>
                      </a>
                      <a
                        href="tel:917981666692"
                        className="p-3 rounded-xl bg-[#3A0813] border border-[#D4AF37]/35 text-amber-200 text-center font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#52101C] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-300" />
                        <span>+91 79816 66692</span>
                      </a>
                    </div>

                    {/* Location Address */}
                    <div className="p-3 rounded-xl bg-[#3A0813] border border-[#D4AF37]/35 text-xs text-amber-100/90 leading-relaxed">
                      <strong className="text-amber-300 block mb-0.5">Address:</strong>
                      Raghavendra Nagar Colony, Jillelaguda, Meerpet, Hyderabad – 500097
                    </div>

                    <Link
                      to="/contact"
                      onClick={triggerFlowerShower}
                      className="block text-center py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:scale-[1.02]"
                    >
                      Schedule a Free Hall Visit & Estimate →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Quick Action CTAs */}
              <div className="pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between">
                <a
                  href="#halls"
                  className="text-[11px] font-bold tracking-wider text-amber-300 hover:text-white uppercase flex items-center gap-1"
                >
                  <span>Explore Chapters Below</span>
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                </a>

                <Link
                  to="/contact"
                  onClick={triggerFlowerShower}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  <span>Book Date</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. HERO FLOATING ACTION BAR (The Owner's Call to Action)
            ======================================================== */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center">
          <Link
            to="/contact"
            onClick={triggerFlowerShower}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-sm uppercase tracking-[0.16em] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all flex items-center gap-2 group"
          >
            <CalendarCheck className="w-4 h-4 text-[#3D0A14] group-hover:scale-110 transition-transform" />
            <span>BOOK VISIT & INSTANT ESTIMATE</span>
          </Link>

          <a
            href="tel:+918985700044"
            className="px-7 py-4 rounded-full bg-[#350710] hover:bg-[#4D0D19] border-2 border-amber-400 text-amber-300 font-cinzel font-bold text-sm uppercase tracking-[0.16em] shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>CALL +91 89857 00044</span>
          </a>

          <a
            href="https://wa.me/918985700044?text=Namaste%20SS%20Convention%20Management,%20I%20would%20like%20to%20inquire%20about%20hall%20availability%20for%20my%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-cinzel font-bold text-sm uppercase tracking-[0.14em] shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WHATSAPP CHAT</span>
          </a>
        </div>
      </div>
    </section>
  );
}
