import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Sparkles, 
  Heart, 
  Utensils, 
  Baby, 
  ArrowRight, 
  CheckCircle2, 
  Maximize2,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

export default function StoryWalkthrough({ onOpenLightbox, lang }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [swappedImage, setSwappedImage] = useState(false);

  const storySteps = [
    {
      id: "arrival",
      time: "Chapter I • The Royal Arrival",
      title: "Grand Illuminated Facade & Welcoming Aisle",
      tagline: "First Impressions That Command Awe",
      image: "/assets/04_exterior_and_entrance/exterior_night_facade_parking_lighting.jpeg",
      secondaryImage: "/assets/05_reception_and_lobby/lobby_buddha_water_fountain_feature.jpeg",
      desc: "Your guests arrive to an illuminated architectural marvel. With on-premises 4-wheeler and 2-wheeler parking, a grand marble flight of stairs, and an auspicious Buddha water fountain foyer, every family entry feels majestic and dignified.",
      highlights: ["Illuminated evening facade & arch", "Dedicated on-premise CCTV parking", "Grand welcoming foyer with water features"],
      icon: Building
    },
    {
      id: "sacred",
      time: "Chapter II • The Sacred Vows",
      title: "Vedic Kalyana Mandapams with Carved Temple Pillars",
      tagline: "Sacred Fire, Lord Balaji & Vedic Blessings",
      image: "/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_carved_pillars.jpeg",
      secondaryImage: "/assets/08_wedding_mandap_and_rituals/wedding_rituals_groom_priests_balaji_mandap.jpeg",
      desc: "Step onto a mandap steeped in Vedic divinity. Towering hand-carved stone pillars, golden deity frames of Lord Venkateswara, and fragrant jasmine garlands set the stage for timeless wedding rituals under peaceful central climate control.",
      highlights: ["Hand-carved temple stone pillars", "Auspicious Lord Balaji deity frames", "Central cassette A/C keeping sacred havan cool"],
      icon: Heart
    },
    {
      id: "reception",
      time: "Chapter III • The Grand Reception",
      title: "Theatrical Par Lighting & Floral Ring Stages",
      tagline: "Crystal Chandeliers & Royal Violet Throne Couches",
      image: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg",
      secondaryImage: "/assets/09_reception_engagement_stages/stage_better_together_neon_wide_shot.jpeg",
      desc: "Celebrate together with 600 of your dearest guests. Under double circular golden crystal chandeliers, whimsical floral halo arches, and soft neon typography, your wedding reception turns into an unforgettable royal court.",
      highlights: ["Double golden crystal chandeliers", "Whimsical circular floral halo arch", "Violet velvet & gold hand-carved throne sofa"],
      icon: Sparkles
    },
    {
      id: "feast",
      time: "Chapter IV • The Royal Banquet",
      title: "250+ Seat Separate Dining Floor & Dum Biryani",
      tagline: "Zero Odor in Mandap • Pure Ghee Feasts",
      image: "/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg",
      secondaryImage: "/assets/03_food_and_catering_menus/menu_06_premium_non_veg_200pax.jpeg",
      desc: "Feasting without chaos. Our separate banquet dining hall seats over 250 guests concurrently at round tables dressed in maroon and gold, serving authentic Hyderabadi Mutton & Chicken Dum Biryani, Telangana curries, and warm Double Ka Meeta.",
      highlights: ["Separate dining level (Zero aroma in mandap)", "Seats 250+ guests simultaneously", "Direct hygienic catering kitchen access"],
      icon: Utensils
    },
    {
      id: "milestones",
      time: "Chapter V • Joyous Milestones",
      title: "Cradle Ceremonies & 1st Birthday Spectacles",
      tagline: "From Lotus Swings to 3D ONE Marquee Letters",
      image: "/assets/10_cradle_and_birthday_decor/birthday_sunshine_theme_nirvik_one_marquee.jpeg",
      secondaryImage: "/assets/10_cradle_and_birthday_decor/stage_cradle_naming_ceremony_lotus_swing.jpeg",
      desc: "Celebrate every blessing. From the auspicious suspended lotus cradle for baby naming (Barasala) to giant lit-up 'ONE' marquee letters, Cocomelon, and Under the Sea birthday adventures in our dedicated intimate hall.",
      highlights: ["Suspended lotus cradle swings", "Giant 3D marquee letter lights", "Tailored themes (Sunshine, Cocomelon, Ocean)"],
      icon: Baby
    }
  ];

  const current = storySteps[activeStep];
  const IconComponent = current.icon;

  // Auto-Tour interval (5.5 seconds per chapter when playing)
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => (prev < storySteps.length - 1 ? prev + 1 : 0));
        setSwappedImage(false);
      }, 5500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, storySteps.length]);

  const activeMainImage = swappedImage ? current.secondaryImage : current.image;
  const activeThumbImage = swappedImage ? current.image : current.secondaryImage;

  return (
    <section id="story" className="py-24 lg:py-32 relative bg-[#FFFDF9] overflow-hidden border-t border-b border-[#D4AF37]/25 text-[#2B1C1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Storytelling Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#D4AF37]/40 text-[#7A1F31] text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#A98018]" />
            <span>The Celebration Storyline</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#5F1524] tracking-wide mb-4">
            A Walk Through Your Grand Day
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed max-w-2xl mx-auto">
            Every celebration at S.S Convention is choreographed like a royal narrative. Follow the journey from the grand arrival to the sacred vows and the celebratory feast.
          </p>

          {/* Interactive Auto-Tour Toggle Pill */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 border ${
                isPlaying
                  ? 'bg-[#7A1F31] text-white border-[#7A1F31] shadow-md'
                  : 'bg-white border-[#D4AF37]/40 text-[#7A1F31] hover:bg-gold-50 shadow-sm'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Auto-Tour: Playing' : 'Start Auto Story Tour'}</span>
            </button>
          </div>

          {/* Interactive Chapter Steps Bar */}
          <div className="flex items-center justify-between max-w-2xl mx-auto mt-8 relative px-2">
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-[#D4AF37]/25 -translate-y-1/2 z-0 rounded-full" />
            <div
              className="absolute top-1/2 left-4 h-0.5 bg-[#7A1F31] -translate-y-1/2 z-0 transition-all duration-500 rounded-full"
              style={{ width: `calc(${(activeStep / (storySteps.length - 1)) * 100}% - 16px)` }}
            />

            {storySteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(idx);
                  setSwappedImage(false);
                }}
                aria-label={`Go to ${step.time}`}
                className={`relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                  activeStep === idx
                    ? 'bg-[#7A1F31] text-white ring-4 ring-[#7A1F31]/30 shadow-lg scale-110'
                    : idx < activeStep
                    ? 'bg-[#A98018] text-white font-bold'
                    : 'bg-white border-2 border-[#D4AF37]/40 text-[#5F1524] hover:bg-gold-50 shadow-sm'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="text-xs font-bold text-[#A98018] mt-4 tracking-[0.2em] uppercase">
            {current.time}
          </div>
        </div>

        {/* Story Spotlight Canvas */}
        <div className="bg-white rounded-[32px] overflow-hidden border-2 border-[#D4AF37]/35 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Column with Interactive Dual-Photo Swap */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] overflow-hidden group bg-black">
              <img
                src={activeMainImage}
                alt={current.title}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              {/* Inset Interactive Secondary Thumbnail - Click to Swap Perspectives */}
              <div
                onClick={() => setSwappedImage(!swappedImage)}
                className="absolute bottom-4 right-4 w-32 h-24 sm:w-44 sm:h-32 rounded-2xl overflow-hidden border-2 border-white/80 shadow-2xl cursor-pointer hover:scale-105 transition-transform bg-black group/thumb"
                title="Click to swap perspective views"
              >
                <img
                  src={activeThumbImage}
                  alt="Alternate view"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-transparent transition-colors flex items-center justify-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-amber-200" />
                  <span className="text-[10px] font-bold text-white bg-black/75 px-2 py-0.5 rounded-full border border-white/30">
                    Swap View
                  </span>
                </div>
              </div>

              {/* Lightbox Trigger Top-Right */}
              <button
                onClick={() => onOpenLightbox(activeMainImage, current.title)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center hover:bg-[#7A1F31] transition-all shadow-md z-20"
                title="View High-Res"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Step Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md z-20">
                <IconComponent className="w-3.5 h-3.5 text-amber-300" />
                <span>{current.tagline}</span>
              </div>
            </div>

            {/* Narrative Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                <span className="text-[10px] font-bold text-[#A98018] tracking-[0.25em] uppercase">
                  {current.time}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#5F1524] mt-2 mb-4 leading-tight">
                  {current.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                  {current.desc}
                </p>

                {/* Key Experience Highlights */}
                <div className="space-y-3 pt-3 border-t border-[#D4AF37]/20">
                  <h4 className="text-[11px] font-bold text-[#7A1F31] uppercase tracking-[0.18em]">
                    Experience Highlights
                  </h4>
                  {current.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-stone-700 font-normal">
                      <div className="w-4 h-4 rounded-full bg-[#FAF6F0] border border-[#D4AF37]/40 flex items-center justify-center text-[#7A1F31] flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveStep((prev) => (prev > 0 ? prev - 1 : storySteps.length - 1));
                    setSwappedImage(false);
                  }}
                  className="text-xs font-bold text-stone-500 hover:text-[#5F1524] transition-colors uppercase tracking-wider flex items-center gap-1"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    setActiveStep((prev) => (prev < storySteps.length - 1 ? prev + 1 : 0));
                    setSwappedImage(false);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7A1F31] text-white hover:bg-[#5F1524] font-bold text-xs uppercase tracking-wider transition-all shadow-md group hover:scale-105"
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
