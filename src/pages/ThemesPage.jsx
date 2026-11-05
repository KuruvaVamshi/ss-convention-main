import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeVisualizer from '../components/ThemeVisualizer';
import { Palette, ShieldCheck, CheckCircle2, MessageSquare, Calendar, Sparkles, Phone, ArrowRight } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function ThemesPage({ onOpenLightbox, lang }) {
  const [selectedOccasionFilter, setSelectedOccasionFilter] = useState('All');

  const occasionCategories = [
    {
      id: "weddings",
      title: "Traditional Vedic Kalyana Mandapams",
      teluguTitle: "సంప్రదాయ వేద కళ్యాణ మండపం",
      tagline: "Carved Temple Pillars & Sacred Auspicious Vedic Altar",
      description: "Our authentic Vedic Kalyana Mandapams feature towering hand-carved temple stone pillars, rich red and gold floral backdrops, fresh jasmine overhead drapes, and golden deity frames of Lord Balaji and Goddess Padmavathi. Dedicated priest havan and sacred fire platforms ensure your wedding rituals proceed with utmost sanctity.",
      image: "/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_carved_pillars.jpeg",
      secondaryImage: "/assets/08_wedding_mandap_and_rituals/wedding_rituals_groom_priests_balaji_mandap.jpeg",
      recommendedHall: "Hall Vasishta (300 - 600 Pax)",
      hallPath: "/halls/hall-vasishta",
      badge: "Flagship Wedding Stage",
      features: [
        "Hand-carved temple pillar mandap structure with deity backdrops",
        "Fresh fragrant jasmine, tuberose & rose garland canopies",
        "Dedicated Vedic priest, sacred fire (Agni Kundam) & family seating platform",
        "Opulent double-tier crystal chandeliers & 70-ft central bridal walking aisle"
      ]
    },
    {
      id: "receptions",
      title: "Contemporary Reception & Engagement Stages",
      teluguTitle: "గ్రాండ్ రిసెప్షన్ & నిశ్చితార్థం స్టేజ్",
      tagline: "Floral Halo Arches, Royal Couches & Warm Edison Illumination",
      description: "Step into modern royal elegance. Our reception stages feature whimsical circular floral halo arches, glowing warm Edison bulbs, customized neon typography backdrops ('Better Together', 'Two Souls One Heart'), and hand-carved royal violet & gold throne couches framed by theatrical stage par lighting.",
      image: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg",
      secondaryImage: "/assets/09_reception_engagement_stages/stage_better_together_neon_wide_shot.jpeg",
      recommendedHall: "Hall Vasishta or Hall Agasthya",
      hallPath: "/halls/hall-agasthya",
      badge: "Evening Glitz & Glamour",
      features: [
        "Double circular floral halo arch with lush emerald foliage & pastel roses",
        "Carved royal velvet throne couch in rich royal purple & imperial gold",
        "Custom LED neon quote backdrops & vertical golden candle-rod lighting",
        "Theatrical multi-color stage par washes & follow-spot illumination"
      ]
    },
    {
      id: "cradle",
      title: "Suspended Lotus Cradle & Naming Ceremonies",
      teluguTitle: "బారసాల & తామరపువ్వు ఉయ్యాల వేడుక",
      tagline: "Auspicious Barasala Setups for Life's New Blessings",
      description: "Celebrate the arrival of your little blessing in divine majesty. Our signature suspended lotus flower cradle swings create an ethereal focal point, draped with fresh yellow marigold garlands, traditional brass hanging diyas, and pastel balloon accents.",
      image: "/assets/10_cradle_and_birthday_decor/stage_cradle_naming_ceremony_lotus_swing.jpeg",
      secondaryImage: "/assets/10_cradle_and_birthday_decor/birthday_event_aisle_balloon_pillars_live.jpeg",
      recommendedHall: "Hall Koundinya (50 - 200 Pax)",
      hallPath: "/halls/hall-koundinya",
      badge: "Divine Baby Blessings",
      features: [
        "Auspicious suspended lotus swing cradle with cushioned velvet lining",
        "Traditional yellow & orange marigold flower backdrops",
        "Hanging antique brass deepams & cascading floral strings",
        "Comfortable seating setup for maternal elders, priests & close family"
      ]
    },
    {
      id: "birthdays",
      title: "Milestone 1st Birthdays & Playful Themes",
      teluguTitle: "మొదటి పుట్టినరోజు రాయల్ సెలబ్రేషన్",
      tagline: "Giant 3D Marquee Letters, Sunshine & Character Wonderlands",
      description: "Make your child's first milestone an unforgettable wonderland. Featuring towering illuminated 3D 'ONE' marquee letters, customized child name signages, vibrant balloon arches, Sunshine yellow concepts, Cocomelon, and Under-the-Sea themed miniature photo backdrops.",
      image: "/assets/10_cradle_and_birthday_decor/birthday_sunshine_theme_nirvik_one_marquee.jpeg",
      secondaryImage: "/assets/10_cradle_and_birthday_decor/birthday_cocomelon_theme_viyaan_stage.jpeg",
      recommendedHall: "Hall Koundinya (100 - 200 Pax)",
      hallPath: "/halls/hall-koundinya",
      badge: "Kids & Family Delight",
      features: [
        "Giant 4-foot illuminated 3D 'ONE' marquee letters with marquee bulbs",
        "Custom child name acrylic cutouts and organic pastel balloon arches",
        "Themed backdrops: Sunshine, Cocomelon, Jungle Safari, Under The Sea",
        "Dedicated kids' cake-cutting podium and selfie photo booth zones"
      ]
    },
    {
      id: "haldi",
      title: "Festive Haldi & Mehendi Yellow Canopies",
      teluguTitle: "పసుపు & మెహందీ ఉత్సవం",
      tagline: "Marigold Showers, Wisteria Canopies & Auspicious Decor",
      description: "Infuse your pre-wedding celebrations with joyful yellow hues. Our Haldi & Mehendi stages feature authentic brass urli setups for floral baths, cascading white wisteria flower canopies, crystal chandeliers, and sunny marigold floral backdrops.",
      image: "/assets/09_reception_engagement_stages/stage_haldi_mehendi_yellow_canopy_wisteria.jpeg",
      secondaryImage: "/assets/09_reception_engagement_stages/stage_peach_drapes_fairy_lights_divan_sofa.jpeg",
      recommendedHall: "Hall Agasthya or Hall Koundinya",
      hallPath: "/halls/hall-agasthya",
      badge: "Vibrant & Auspicious",
      features: [
        "Traditional brass Urli floral bath arrangement with rose petal showers",
        "Cascading white wisteria ceiling canopy and yellow satin drapery",
        "Comfortable ethnic divan seating for bride and groom",
        "Surround sound setup for festive Telugu folk & Bollywood sangeet beats"
      ]
    },
    {
      id: "sangeet",
      title: "Sangeet Nights, Ring Ceremonies & Banquets",
      teluguTitle: "సంగీత్, నిశ్చితార్థం & కార్పొరేట్ వేడుకలు",
      tagline: "Acoustic Tuning, Moving Head Stage Lights & Wide Dance Floor",
      description: "For high-spirited sangeet celebrations and formal milestone banquets. Hall Agasthya offers studio-tuned acoustic treatment, dynamic DMX stage lighting, a dedicated DJ console platform, and an expansive performance stage for family dance choreography.",
      image: "/assets/09_reception_engagement_stages/stage_better_together_neon_wide_shot.jpeg",
      secondaryImage: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_candle_rods_wide.jpeg",
      recommendedHall: "Hall Agasthya (200 - 350 Pax)",
      hallPath: "/halls/hall-agasthya",
      badge: "Music & Dance Floor",
      features: [
        "Studio-tuned acoustic ceiling panels minimizing echo for live music and DJ sets",
        "DMX moving head stage lighting, strobes, and romantic warm profile spots",
        "Expansive 28-foot performance stage with dedicated green room access",
        "Seamless connectivity to on-premise car parking and dedicated dining floor"
      ]
    }
  ];

  const filterTabs = [
    { id: 'All', label: 'All Occasions' },
    { id: 'weddings', label: 'Weddings & Muhurthams' },
    { id: 'receptions', label: 'Receptions & Engagements' },
    { id: 'cradle', label: 'Cradle (Barasala)' },
    { id: 'birthdays', label: '1st Birthdays' },
    { id: 'haldi', label: 'Haldi & Mehendi' },
    { id: 'sangeet', label: 'Sangeet & Corporate' }
  ];

  const displayedOccasions = selectedOccasionFilter === 'All'
    ? occasionCategories
    : occasionCategories.filter(o => o.id === selectedOccasionFilter);

  return (
    <div className="bg-[#450B17] text-white min-h-screen pt-24">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-[#350710] to-[#450B17] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-serif text-xs sm:text-sm tracking-[0.35em] text-amber-300 uppercase block mb-2 drop-shadow">
            || శ్రీ రస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
          </span>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-4 shadow-md backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Auspicious Occasions & Themes</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.1em] sm:tracking-[0.14em] text-white uppercase mb-4 drop-shadow">
            {lang === 'te' ? 'ప్రతి శుభకార్యానికి రాయల్ వేదిక' : 'CELEBRATE EVERY AUSPICIOUS OCCASION'}
          </h1>
          <p className="text-amber-100/85 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            {lang === 'te'
              ? 'కళ్యాణాలు, రిసెప్షన్లు, బారసాల, మరియు మొదటి పుట్టినరోజులకు ప్రత్యేకంగా రూపొందించిన మా రాయల్ స్టేజ్ డెకర్ థీమ్స్‌ను ఇక్కడ వీక్షించండి.'
              : 'Every milestone deserves a regal setting. Explore our in-house stage décor artistry, from authentic Vedic temple mandaps to modern floral rings and playful 1st birthday wonderlands.'}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedOccasionFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 border cursor-pointer ${
                  selectedOccasionFilter === tab.id
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] border-amber-300 font-bold shadow-md scale-105'
                    : 'bg-[#3A0813] text-amber-200 hover:bg-[#4D0D19] border-[#D4AF37]/35 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Theme Visualizer with Day vs Theatrical Lighting */}
      <ThemeVisualizer onOpenLightbox={onOpenLightbox} lang={lang} />

      {/* Deep Dive Into Each Occasion Category */}
      <section className="py-24 bg-[#3D0A14] border-t border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-3 drop-shadow">
              Crafted by In-House Master Artisans
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal">
              We exclusively use verified in-house florists, carpenters, and lighting engineers to ensure zero setup delays, pristine hygiene, and flawless aesthetics for your auspicious date.
            </p>
          </div>

          <div className="space-y-16">
            {displayedOccasions.map((decor, idx) => (
              <div
                key={decor.id || idx}
                className="bg-[#4A0E17] rounded-[32px] overflow-hidden border-2 border-[#D4AF37]/45 shadow-2xl text-white hover:border-amber-400 transition-all"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Photo Column */}
                  <div className={`lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] bg-black ${
                    idx % 2 === 1 ? 'lg:order-2' : ''
                  }`}>
                    <img
                      src={decor.image}
                      alt={decor.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85" />

                    {/* Occasion Badge */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/80 border border-[#D4AF37]/60 text-amber-300 text-[10px] font-bold tracking-widest uppercase">
                      {decor.badge}
                    </div>

                    {/* Secondary Clickable Detail Thumbnail */}
                    <div
                      onClick={() => onOpenLightbox(decor.secondaryImage, decor.title)}
                      className="absolute bottom-4 right-4 w-32 h-24 sm:w-40 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl cursor-pointer hover:scale-105 transition-transform bg-black"
                      title="Click to view detail image"
                    >
                      <img
                        src={decor.secondaryImage}
                        alt="Stage Detail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-amber-200 bg-black/85 px-2 py-0.5 rounded-full border border-amber-300/40">
                          Zoom Detail
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-[#3A0813] text-white ${
                    idx % 2 === 1 ? 'lg:order-1' : ''
                  }`}>
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold text-amber-300 tracking-[0.2em] uppercase">
                          {decor.tagline}
                        </span>
                        <Link
                          to={decor.hallPath}
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#4D0D19] border border-[#D4AF37]/40 text-amber-300 hover:text-white transition-colors"
                        >
                          {decor.recommendedHall}
                        </Link>
                      </div>

                      <h3 className="font-cinzel text-2xl font-bold text-white mb-1">
                        {decor.title}
                      </h3>
                      {lang === 'te' && (
                        <p className="text-xs text-amber-300 font-semibold mb-2">
                          {decor.teluguTitle}
                        </p>
                      )}
                      <p className="text-amber-100/85 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                        {decor.description}
                      </p>

                      <div className="space-y-2.5 pt-2 border-t border-[#D4AF37]/25">
                        <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-widest mb-2">
                          Key Craft & Service Highlights
                        </h4>
                        {decor.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs text-amber-100/90 font-normal">
                            <div className="w-4 h-4 rounded-full bg-[#24050B] border border-[#D4AF37]/40 flex items-center justify-center text-amber-300 flex-shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-[#D4AF37]/25 flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={`https://wa.me/${venueData.whatsappNumber}?text=${encodeURIComponent(`Hello SS Convention Hall, I would like to inquire about booking dates and decor for: ${decor.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-[11px] uppercase tracking-wider shadow-md flex items-center gap-1.5 hover:scale-105 transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#3D0A14]" />
                        <span>Check Dates for This Occasion</span>
                      </a>
                      <button
                        onClick={() => onOpenLightbox(decor.image, decor.title)}
                        className="text-xs font-bold text-amber-300 hover:text-white underline cursor-pointer"
                      >
                        View Full Screen Photo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why In-House Only Policy Card */}
      <section className="py-20 bg-[#350710] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-[32px] bg-[#4A0E17] border-2 border-[#D4AF37]/45 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#24050B] border border-[#D4AF37]/40 flex items-center justify-center text-amber-300 flex-shrink-0 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-white mb-1">
                Why Outside Décor is Strictly Prohibited
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-normal">
                To safeguard venue architecture, preserve electrical circuit safety, and guarantee punctual setup handovers before auspicious muhurthams, all floral, mandap, and lighting arrangements are managed exclusively by our approved in-house artisans. This eliminates external vendor delays and ensures unmatched quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Décor & Dates Inquiry CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-white text-center border-t border-[#D4AF37]/30 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-3 tracking-wide">
            Planning Your Auspicious Celebration?
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-sm max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Send us your occasion details, target dates, or custom floral moodboard. Our venue coordinators will match the best hall and configure an estimate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#3D0A14]" />
              <span>Book Visit & Check Auspicious Dates</span>
            </Link>
            <a
              href={`tel:${venueData.phones[0].raw}`}
              className="px-8 py-3.5 rounded-full border border-amber-300/60 text-white hover:bg-white/10 font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call +91 89857 00044</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
