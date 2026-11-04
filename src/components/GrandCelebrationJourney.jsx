import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building, 
  Heart, 
  Utensils, 
  Sparkles, 
  Baby, 
  ArrowRight, 
  Maximize2, 
  CheckCircle2, 
  Clock, 
  Compass,
  RefreshCw
} from 'lucide-react';
import SplitHeading from './SplitHeading';

gsap.registerPlugin(ScrollTrigger);

export default function GrandCelebrationJourney({ onOpenLightbox, lang }) {
  const [activeChapter, setActiveChapter] = useState(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const sectionRef = useRef(null);

  const chapters = [
    {
      id: "arrival",
      time: "08:00 AM • CHAPTER I",
      title: "The Grand Royal Baraat Arrival",
      teluguTitle: "రాచరిక స్వాగతం & గ్రాండ్ ఎంట్రన్స్",
      tagline: "First Impressions That Command Dignity",
      photos: [
        { src: "/assets/04_exterior_and_entrance/exterior_night_facade_parking_lighting.jpeg", title: "40-Foot Illuminated Architectural Facade & Parking" },
        { src: "/assets/04_exterior_and_entrance/entrance_grand_steps_illuminated_night.jpeg", title: "Illuminated Grand Marble Steps & Approach" },
        { src: "/assets/05_reception_and_lobby/lobby_buddha_water_fountain_feature.jpeg", title: "Serene Buddha Water Fountain Welcoming Foyer" },
        { src: "/assets/05_reception_and_lobby/reception_lounge_teal_sofas_gallery.jpeg", title: "Air-Conditioned VIP Welcoming Lounge" }
      ],
      desc: "Your guests arrive to an illuminated architectural marvel with on-premises CCTV parking, wide approach roads, a grand marble flight of stairs, and a serene Buddha water fountain foyer.",
      highlights: [
        "40-Foot illuminated entrance archway & facade",
        "Dedicated on-premise CCTV monitored parking",
        "Air-conditioned VIP welcoming foyer & water fountain"
      ],
      icon: Building
    },
    {
      id: "vedic",
      time: "10:30 AM • CHAPTER II",
      title: "Sacred Vedic Muhurtham & Mandapam",
      teluguTitle: "వేద కళ్యాణ వేదిక & ముహూర్తం",
      tagline: "Sacred Fire, Lord Balaji & Divine Mantras",
      photos: [
        { src: "/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_carved_pillars.jpeg", title: "Hand-Carved Stone Pillars Traditional Mandap" },
        { src: "/assets/08_wedding_mandap_and_rituals/wedding_rituals_groom_priests_balaji_mandap.jpeg", title: "Sacred Muhurtham Vedic Rituals with Priests" },
        { src: "/assets/08_wedding_mandap_and_rituals/traditional_ganesha_white_gold_draped_stage.jpeg", title: "Traditional Ganesha White-Gold Draped Stage" },
        { src: "/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg", title: "Flagship Kalyana Mandapam with Crystal Chandeliers" }
      ],
      desc: "Step onto a sacred mandap steeped in Vedic grace. Towering carved stone pillars, auspicious deity frames, and central cassette air conditioning keep sacred havan rituals cool and smoke-free.",
      highlights: [
        "Authentic carved temple stone pillars & golden deity frames",
        "Dedicated priest havan platform with direct power points",
        "Central cassette A/C maintaining fresh airflow"
      ],
      icon: Heart
    },
    {
      id: "banquet",
      time: "01:00 PM • CHAPTER III",
      title: "250+ Seat Royal Vindhu Bhojanam",
      teluguTitle: "రాయల్ విందు భోజనం (ప్రత్యేక ఫ్లోర్)",
      tagline: "Separate Floor • Zero Odor in Mandap",
      photos: [
        { src: "/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg", title: "Round Tables with Maroon & Gold Damask Linens" },
        { src: "/assets/03_food_and_catering_menus/menu_06_premium_non_veg_200pax.jpeg", title: "Hyderabadi Dum Biryani Feast Spread & Multi-Course Menu" },
        { src: "/assets/03_food_and_catering_menus/menu_03_premium_veg_200pax.jpeg", title: "South Indian Pure Veg Traditional Vindhu Bhojanam" },
        { src: "/assets/03_food_and_catering_menus/menu_07_special_non_veg_250pax.jpeg", title: "Grand Celebration Multi-Course Banquet Feast" }
      ],
      desc: "Feasting without chaos. Situated on a completely separate dining level, our banquet hall accommodates 250+ guests simultaneously at round tables with zero food aroma in the marriage hall.",
      highlights: [
        "250+ Round table concurrent seats with organza chair bows",
        "Completely isolated dining level (Zero mandap aroma)",
        "12-Tap granite handwash counter with RO water"
      ],
      icon: Utensils
    },
    {
      id: "reception",
      time: "07:00 PM • CHAPTER IV",
      title: "The Chandelier Grand Reception",
      teluguTitle: "దివ్యమైన క్రిస్టల్ షాండ్లియర్స్ & రిసెప్షన్",
      tagline: "Crystal Chandeliers & Royal Velvet Throne",
      photos: [
        { src: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg", title: "Violet Velvet Royal Throne & Floral Ring Arch" },
        { src: "/assets/09_reception_engagement_stages/stage_better_together_neon_wide_shot.jpeg", title: "Custom 'Better Together' Neon Yellow Drapes Stage" },
        { src: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_edison_bulbs.jpeg", title: "Vintage Edison Bulbs & Filigree Chandelier Decor" },
        { src: "/assets/09_reception_engagement_stages/stage_triple_arch_boho_garden_warm_yellow.jpeg", title: "Boho Triple-Arch Pastel Garden Stage Setting" }
      ],
      desc: "Under double circular golden crystal chandeliers, whimsical floral halo arches, and warm Edison bulbs, newlyweds take their place on the violet velvet royal throne sofa.",
      highlights: [
        "Dual circular golden crystal chandeliers & marble aisle",
        "Theatrical multi-color stage par lights & spotlight",
        "Hand-carved violet velvet & gold royal throne couch"
      ],
      icon: Sparkles
    },
    {
      id: "milestone",
      time: "10:00 PM • CHAPTER V",
      title: "Joyous Barasala & 1st Birthday Wonderlands",
      teluguTitle: "బారసాల (ఉయ్యాల) & 1వ పుట్టినరోజు వేడుకలు",
      tagline: "Suspended Lotus Swings to 3D ONE Marquee Letters",
      photos: [
        { src: "/assets/10_cradle_and_birthday_decor/stage_cradle_naming_ceremony_lotus_swing.jpeg", title: "Suspended Lotus Swing for Cradle Ceremony (Barasala)" },
        { src: "/assets/10_cradle_and_birthday_decor/birthday_sunshine_theme_nirvik_one_marquee.jpeg", title: "3D Illuminated 'ONE' Marquee Letters Sunshine Theme" },
        { src: "/assets/10_cradle_and_birthday_decor/birthday_ocean_under_the_sea_theme_stage.jpeg", title: "Under The Sea Ocean Blue Balloon Fantasy Stage" },
        { src: "/assets/10_cradle_and_birthday_decor/birthday_event_aisle_balloon_pillars_live.jpeg", title: "Festive Balloon Pillar Entry Walkway" }
      ],
      desc: "From the auspicious suspended lotus cradle for baby naming (Barasala) adorned with marigolds to giant 4-foot lit-up 'ONE' marquee letters in our intimate boutique celebration hall.",
      highlights: [
        "Auspicious suspended lotus cradle swing for Barasala",
        "Giant 4-foot illuminated 3D 'ONE' marquee letters",
        "Sunshine, Ocean & Character themes with balloon arches"
      ],
      icon: Baby
    }
  ];

  const current = chapters[activeChapter];
  const IconComponent = current.icon;
  const activePhoto = current.photos[activePhotoIdx] || current.photos[0];

  return (
    <section 
      ref={sectionRef}
      id="grand-journey" 
      className="py-24 lg:py-32 bg-[#450B17] relative overflow-hidden border-t border-b border-[#D4AF37]/30 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-3 shadow-md backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>The Owner's Vision • 5-Chapter Storyline</span>
          </div>
          
          <SplitHeading 
            tag="h2" 
            className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4 drop-shadow"
          >
            {lang === 'te' ? 'మీ వివాహ వేడుక ప్రయాణం' : 'The Grand Muhurtham Experience'}
          </SplitHeading>

          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed max-w-2xl mx-auto">
            {lang === 'te'
              ? 'ఉదయం బారాత్ స్వాగతం నుండి రాత్రి రిసెప్షన్ వరకు మీ వేడుక ఒక రాయల్ నవల వలె సాగుతుంది. ప్రతి ఘట్టాన్ని లైవ్‌గా పరిశీలించండి.'
              : 'Every milestone at S.S Convention is choreographed with regal grace. Step through the 5 chapters of your wedding day, from the morning Baraat to the midnight feast.'}
          </p>

          {/* Interactive Chapter Quick Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => {
                  setActiveChapter(idx);
                  setActivePhotoIdx(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
                  activeChapter === idx
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] border-amber-400 shadow-lg scale-105'
                    : 'bg-[#3A0813] text-amber-100 border-[#D4AF37]/35 hover:bg-[#52101C] shadow-sm'
                }`}
              >
                <span>{ch.time.split('•')[0].trim()}</span>
                <span className="hidden md:inline ml-1.5 opacity-90 font-normal">
                  • {ch.title.split(' ')[0]} {ch.title.split(' ')[1]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Master Chapter Showcase Card */}
        <div className="bg-[#3A0813] rounded-[32px] overflow-hidden border-2 border-[#D4AF37]/45 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left 7 Cols: High-Res Perspective Theater with 4-Photo Perspective Strip */}
            <div className="lg:col-span-7 flex flex-col bg-black">
              <div className="relative min-h-[380px] sm:min-h-[460px] flex-1 bg-black overflow-hidden group">
                <img
                  key={activePhoto.src}
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85" />

                {/* Lightbox Zoom Trigger */}
                <button
                  onClick={() => onOpenLightbox(activePhoto.src, activePhoto.title)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center hover:bg-[#7A1F31] transition-all shadow-md z-20"
                  title="Fullscreen Zoom"
                >
                  <Maximize2 className="w-4 h-4 text-amber-300" />
                </button>

                {/* Tagline Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md z-20">
                  <IconComponent className="w-3.5 h-3.5 text-amber-300" />
                  <span>{current.tagline}</span>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-4 left-5 right-5 text-white z-10">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-0.5">
                    {current.time}
                  </span>
                  <h3 className="font-cinzel text-lg sm:text-2xl font-bold drop-shadow-md leading-tight">
                    {activePhoto.title}
                  </h3>
                </div>
              </div>

              {/* 4 Authentic Photo Angle Selector Strip */}
              <div className="bg-[#24050B] p-2.5 border-t border-[#D4AF37]/30 flex items-center gap-2 overflow-x-auto">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider px-1 whitespace-nowrap">
                  4 Angles:
                </span>
                {current.photos.map((p, idx) => {
                  const isSel = activePhotoIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all flex-shrink-0 ${
                        isSel
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] font-bold border-amber-300 shadow-md scale-102'
                          : 'bg-[#3A0813] text-amber-200 border-[#D4AF37]/35 hover:bg-[#52101C]'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-md overflow-hidden flex-shrink-0 border border-white/30">
                        <img src={p.src} alt="Angle" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] whitespace-nowrap">{p.title.split(' ')[0]} {p.title.split(' ')[1]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Cols: Narrative Specs & Owner Highlights */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#3A0813] border-t lg:border-t-0 lg:border-l border-[#D4AF37]/30 text-white">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-amber-300 tracking-[0.25em] uppercase">
                    {current.time}
                  </span>
                  <span className="text-xs font-bold text-amber-200">
                    Chapter 0{activeChapter + 1} of 05
                  </span>
                </div>

                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-1 leading-tight">
                  {current.title}
                </h3>

                <p className="text-xs font-bold text-amber-300 mb-3">
                  {current.teluguTitle}
                </p>

                <p className="text-amber-100/85 text-xs sm:text-sm font-normal leading-relaxed mb-4">
                  {current.desc}
                </p>

                {/* 4 Photo Mini-Grid on Right Side */}
                <div className="grid grid-cols-2 gap-2 my-4">
                  {current.photos.map((photo, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setActivePhotoIdx(i);
                        onOpenLightbox(photo.src, photo.title);
                      }}
                      className="group/mini relative rounded-xl overflow-hidden border border-[#D4AF37]/35 bg-black cursor-pointer aspect-[16/10] hover:border-amber-400 transition-all shadow-md"
                    >
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover/mini:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/mini:bg-transparent transition-colors" />
                      <div className="absolute bottom-1.5 left-2 right-2">
                        <span className="text-[9px] font-medium text-white line-clamp-1 drop-shadow">
                          {photo.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Specific Venue Highlights */}
                <div className="space-y-2 pt-2 border-t border-[#D4AF37]/25">
                  {current.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-amber-100/90 font-normal">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#24050B] border border-[#D4AF37]/40 flex items-center justify-center text-amber-300 flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="mt-6 pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveChapter((prev) => (prev > 0 ? prev - 1 : chapters.length - 1));
                    setActivePhotoIdx(0);
                  }}
                  className="text-xs font-bold text-amber-200/80 hover:text-white transition-colors uppercase tracking-wider"
                >
                  ← Prev Chapter
                </button>

                <button
                  onClick={() => {
                    setActiveChapter((prev) => (prev < chapters.length - 1 ? prev + 1 : 0));
                    setActivePhotoIdx(0);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-bold text-xs uppercase tracking-wider transition-all shadow-md group hover:scale-105"
                >
                  <span>Next Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

