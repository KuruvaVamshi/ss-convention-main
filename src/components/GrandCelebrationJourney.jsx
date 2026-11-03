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
  const [swappedView, setSwappedView] = useState(false);
  const sectionRef = useRef(null);

  const chapters = [
    {
      id: "arrival",
      time: "08:00 AM • CHAPTER I",
      title: "The Grand Royal Baraat Arrival",
      teluguTitle: "రాచరిక స్వాగతం & గ్రాండ్ ఎంట్రన్స్",
      tagline: "First Impressions That Command Dignity",
      image: "/assets/04_exterior_and_entrance/exterior_night_facade_parking_lighting.jpeg",
      secondaryImage: "/assets/05_reception_and_lobby/lobby_buddha_water_fountain_feature.jpeg",
      desc: "Your guests arrive to an illuminated architectural marvel. With on-premises 4-wheeler and 2-wheeler parking, wide approach roads from Karmanghat and LB Nagar, a grand marble flight of stairs, and a serene Buddha water fountain foyer, every family entry feels majestic.",
      highlights: [
        "40-Foot illuminated entrance archway & facade",
        "Dedicated on-premise CCTV monitored parking",
        "Air-conditioned VIP welcoming foyer & water fountain",
        "Smooth wide approach roads from Karmanghat & LB Nagar"
      ],
      icon: Building
    },
    {
      id: "vedic",
      time: "10:30 AM • CHAPTER II",
      title: "Sacred Vedic Muhurtham & Mandapam",
      teluguTitle: "వేద కళ్యాణ వేదిక & ముహూర్తం",
      tagline: "Sacred Fire, Lord Balaji & Divine Mantras",
      image: "/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_carved_pillars.jpeg",
      secondaryImage: "/assets/08_wedding_mandap_and_rituals/wedding_rituals_groom_priests_balaji_mandap.jpeg",
      desc: "Step onto a sacred mandap steeped in Vedic grace. Towering hand-carved stone pillars, auspicious deity frames of Lord Balaji and Goddess Padmavathi, and fragrant fresh jasmine garlands set the stage. Central cassette air conditioning keeps sacred havan rituals cool and smoke-free.",
      highlights: [
        "Authentic carved temple stone pillars & golden deity frames",
        "Dedicated priest havan platform with direct power points",
        "Even central cassette A/C maintaining fresh airflow",
        "Private VIP bridal & groom green rooms backstage"
      ],
      icon: Heart
    },
    {
      id: "banquet",
      time: "01:00 PM • CHAPTER III",
      title: "250+ Seat Royal Vindhu Bhojanam",
      teluguTitle: "రాయల్ విందు భోజనం (ప్రత్యేక ఫ్లోర్)",
      tagline: "Separate Floor • Zero Odor in Mandap",
      image: "/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg",
      secondaryImage: "/assets/03_food_and_catering_menus/menu_06_premium_non_veg_200pax.jpeg",
      desc: "Feasting without chaos. Situated on a completely separate dining level, our banquet hall accommodates 250+ guests simultaneously at round tables draped in royal maroon and gold linen. Authentic Hyderabadi Dum Biryani, pure ghee sweets, and hot curries are served with zero food aroma in the marriage hall.",
      highlights: [
        "250+ Round table concurrent seats with silk bows",
        "Completely isolated dining level (Zero mandap aroma)",
        "Direct commercial kitchen warmers & RO filtered water",
        "7 Printed catering packages from Pure Veg to Mutton Dum Biryani"
      ],
      icon: Utensils
    },
    {
      id: "reception",
      time: "07:00 PM • CHAPTER IV",
      title: "The Chandelier Grand Reception",
      teluguTitle: "దివ్యమైన క్రిస్టల్ షాండ్లియర్స్ & రిసెప్షన్",
      tagline: "Crystal Chandeliers & Royal Velvet Throne",
      image: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg",
      secondaryImage: "/assets/09_reception_engagement_stages/stage_better_together_neon_wide_shot.jpeg",
      desc: "As twilight sets in, the hall transforms into a fairy-tale palace. Under double circular golden crystal chandeliers, whimsical circular floral halo arches, and warm Edison bulbs, the newlyweds take their place on the violet velvet royal throne sofa.",
      highlights: [
        "Dual circular golden crystal chandeliers & marble aisle",
        "Theatrical multi-color stage par lights & spotlight",
        "Hand-carved violet velvet & gold royal throne couch",
        "Custom LED neon typography ('Better Together', 'Two Souls One Heart')"
      ],
      icon: Sparkles
    },
    {
      id: "milestone",
      time: "10:00 PM • CHAPTER V",
      title: "Joyous Barasala & 1st Birthday Wonderlands",
      teluguTitle: "బారసాల (ఉయ్యాల) & 1వ పుట్టినరోజు వేడుకలు",
      tagline: "Suspended Lotus Swings to 3D ONE Marquee Letters",
      image: "/assets/10_cradle_and_birthday_decor/birthday_sunshine_theme_nirvik_one_marquee.jpeg",
      secondaryImage: "/assets/10_cradle_and_birthday_decor/stage_cradle_naming_ceremony_lotus_swing.jpeg",
      desc: "Every milestone deserves timeless celebration. From the auspicious suspended lotus cradle for baby naming (Barasala) adorned with marigolds to giant 4-foot lit-up 'ONE' marquee letters and Cocomelon adventures in our intimate halls.",
      highlights: [
        "Auspicious suspended lotus cradle swing for Barasala",
        "Giant 4-foot illuminated 3D 'ONE' marquee letters",
        "Sunshine, Cocomelon, Jungle & Under-the-Sea themes",
        "Dedicated kids' cake-cutting podium and selfie photo zones"
      ],
      icon: Baby
    }
  ];

  const current = chapters[activeChapter];
  const IconComponent = current.icon;
  const activePhoto = swappedView ? current.secondaryImage : current.image;
  const thumbPhoto = swappedView ? current.image : current.secondaryImage;

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
                  setSwappedView(false);
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
            {/* Left 7 Cols: High-Res Perspective Theater with Perspective Swap */}
            <div className="lg:col-span-7 relative min-h-[400px] sm:min-h-[520px] bg-black overflow-hidden group">
              <img
                key={activePhoto}
                src={activePhoto}
                alt={current.title}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85" />

              {/* Inset Secondary Thumbnail - Click to Swap Perspective */}
              <div
                onClick={() => setSwappedView(!swappedView)}
                className="absolute bottom-5 right-5 w-36 h-28 sm:w-48 sm:h-36 rounded-2xl overflow-hidden border-2 border-white shadow-2xl cursor-pointer hover:scale-105 transition-all bg-black group/thumb z-20"
                title="Click to swap perspective"
              >
                <img
                  src={thumbPhoto}
                  alt="Alternate angle"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-transparent transition-colors flex items-center justify-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-amber-200" />
                  <span className="text-[10px] font-bold text-white bg-black/80 px-2.5 py-1 rounded-full border border-white/30">
                    Swap Angle
                  </span>
                </div>
              </div>

              {/* Lightbox Zoom Trigger */}
              <button
                onClick={() => onOpenLightbox(activePhoto, current.title)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center hover:bg-[#7A1F31] transition-all shadow-md z-20"
                title="Fullscreen Zoom"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Tagline Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md z-20">
                <IconComponent className="w-3.5 h-3.5 text-amber-300" />
                <span>{current.tagline}</span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-52 text-white z-10">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-0.5">
                  {current.time}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold drop-shadow-md leading-tight">
                  {current.title}
                </h3>
              </div>
            </div>

            {/* Right 5 Cols: Narrative Specs & Owner Highlights */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-[#3A0813] border-t lg:border-t-0 lg:border-l border-[#D4AF37]/30 text-white">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-amber-300 tracking-[0.25em] uppercase">
                    {current.time}
                  </span>
                  <span className="text-xs font-bold text-amber-200">
                    Chapter 0{activeChapter + 1} of 05
                  </span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight">
                  {current.title}
                </h3>

                <p className="text-xs font-bold text-amber-300 mb-4">
                  {current.teluguTitle}
                </p>

                <p className="text-amber-100/85 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                  {current.desc}
                </p>

                {/* Specific Venue Highlights */}
                <div className="space-y-3 pt-4 border-t border-[#D4AF37]/25">
                  <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-[0.18em]">
                    Venue Architectural Proof Points:
                  </h4>
                  {current.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-amber-100/90 font-normal">
                      <div className="w-4 h-4 rounded-full bg-[#24050B] border border-[#D4AF37]/40 flex items-center justify-center text-amber-300 flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="mt-8 pt-6 border-t border-[#D4AF37]/25 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveChapter((prev) => (prev > 0 ? prev - 1 : chapters.length - 1));
                    setSwappedView(false);
                  }}
                  className="text-xs font-bold text-amber-200/80 hover:text-white transition-colors uppercase tracking-wider"
                >
                  ← Previous Chapter
                </button>

                <button
                  onClick={() => {
                    setActiveChapter((prev) => (prev < chapters.length - 1 ? prev + 1 : 0));
                    setSwappedView(false);
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

