import React from 'react';
import { Link } from 'react-router-dom';
import ThemeVisualizer from '../components/ThemeVisualizer';
import { Palette, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function ThemesPage({ onOpenLightbox, lang }) {
  const decorCategories = [
    {
      title: "Traditional Vedic Kalyana Mandapams",
      tagline: "Carved Temple Pillars & Sacred Auspicious Frames",
      description: "Our authentic Vedic Kalyana Mandapams feature towering hand-carved temple stone pillars, rich red and gold floral backdrops, fresh jasmine overhead drapes, and golden deity frames of Lord Balaji and Goddess Padmavathi. Dedicated priest havan and sacred fire platforms ensure your rituals proceed flawlessly.",
      image: "/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_carved_pillars.jpeg",
      secondaryImage: "/assets/08_wedding_mandap_and_rituals/wedding_rituals_groom_priests_balaji_mandap.jpeg",
      features: [
        "Hand-carved temple pillar mandap structure",
        "Fresh jasmine, tuberose & rose garland canopies",
        "Dedicated Vedic priest & havan seating platform",
        "Deity golden frames (Balaji / Padmavathi / Shiva-Parvathi)"
      ]
    },
    {
      title: "Contemporary Reception & Engagement Stages",
      tagline: "Floral Halo Arches, Royal Couches & Edison Glow",
      description: "Step into modern royal elegance. Our reception stages feature whimsical circular floral halo arches, glowing warm Edison bulbs, customized neon typography backdrops ('Better Together', 'Two Souls One Heart'), and hand-carved royal violet & gold throne couches framed by theatrical stage par lighting.",
      image: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg",
      secondaryImage: "/assets/09_reception_engagement_stages/stage_better_together_neon_wide_shot.jpeg",
      features: [
        "Double circular floral halo arch with lush foliage",
        "Carved royal velvet throne couch in rich violet & gold",
        "Custom LED neon quote backdrops & warm Edison bulbs",
        "Theatrical multi-color stage par lights & follow-spot"
      ]
    },
    {
      title: "Suspended Lotus Cradle & Naming Ceremonies",
      tagline: "Auspicious Barasala Setups for New Blessings",
      description: "Celebrate the arrival of your little blessing in divine majesty. Our signature suspended lotus flower cradle swings create an ethereal focal point, draped with fresh yellow marigold garlands, traditional brass hanging diyas, and pastel balloon accents.",
      image: "/assets/10_cradle_and_birthday_decor/stage_cradle_naming_ceremony_lotus_swing.jpeg",
      secondaryImage: "/assets/10_cradle_and_birthday_decor/birthday_event_aisle_balloon_pillars_live.jpeg",
      features: [
        "Auspicious suspended lotus swing cradle with velvet lining",
        "Traditional yellow & orange marigold flower backdrops",
        "Hanging antique brass deepams & floral strings",
        "Comfortable seating setup for maternal elders & guests"
      ]
    },
    {
      title: "1st Milestone Birthdays & Playful Themes",
      tagline: "Giant 3D Marquee Letters, Sunshine & Character Worlds",
      description: "Make your child's first milestone an unforgettable wonderland. Featuring towering illuminated 3D 'ONE' marquee letters, customized child name signages ('NIRVIK', 'AARAV'), vibrant balloon arches, Sunshine yellow concepts, Cocomelon, and Under-the-Sea themed miniature photo backdrops.",
      image: "/assets/10_cradle_and_birthday_decor/birthday_sunshine_theme_nirvik_one_marquee.jpeg",
      secondaryImage: "/assets/10_cradle_and_birthday_decor/birthday_cocomelon_theme_viyaan_stage.jpeg",
      features: [
        "Giant 4-foot illuminated 3D 'ONE' marquee letters",
        "Custom child name acrylic cutouts and lighted arches",
        "Themed backdrops: Sunshine, Cocomelon, Jungle, Ocean",
        "Kids' cake-cutting podium and selfie photo booth zones"
      ]
    }
  ];

  return (
    <div className="bg-[#450B17] text-white min-h-screen pt-24">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-[#350710] to-[#450B17] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-4 shadow-md backdrop-blur-sm">
            <Palette className="w-3.5 h-3.5 text-amber-300" />
            <span>Thematic Stage Artistry</span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.12em] text-white uppercase mb-4 drop-shadow">
            TRANSFORMATIVE STAGE DÉCOR
          </h1>
          <p className="text-amber-100/80 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            Every celebration has its own soul. Explore our portfolio of curated stages, from authentic Vedic temple mandaps to whimsical modern floral rings and playful 1st birthday wonderlands.
          </p>
        </div>
      </section>

      {/* Interactive Theme Visualizer with Day vs Theatrical Lighting */}
      <ThemeVisualizer onOpenLightbox={onOpenLightbox} lang={lang} />

      {/* Deep Dive Into Each Category */}
      <section className="py-24 bg-[#3D0A14] border-t border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-3 drop-shadow">
              Crafted by In-House Master Artisans
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal">
              We exclusively use verified in-house florists, carpenters, and lighting engineers to ensure zero setup delays, pristine hygiene, and flawless aesthetics.
            </p>
          </div>

          <div className="space-y-16">
            {decorCategories.map((decor, idx) => (
              <div
                key={idx}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

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
                      <span className="text-[10px] font-bold text-amber-300 tracking-[0.2em] uppercase block mb-1">
                        {decor.tagline}
                      </span>
                      <h3 className="font-cinzel text-2xl font-bold text-white mb-3">
                        {decor.title}
                      </h3>
                      <p className="text-amber-100/85 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                        {decor.description}
                      </p>

                      <div className="space-y-2.5 pt-2 border-t border-[#D4AF37]/25">
                        <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-widest mb-2">
                          Key Craft Elements
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

                    <div className="mt-8 pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">
                        100% In-House Execution
                      </span>
                      <button
                        onClick={() => onOpenLightbox(decor.image, decor.title)}
                        className="text-xs font-bold text-amber-300 hover:text-white underline flex items-center gap-1"
                      >
                        View Full Screen
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
                To safeguard venue architecture, preserve electrical circuit safety, and guarantee punctual setup handovers before muhurthams, all floral, mandap, and lighting arrangements are managed exclusively by our approved in-house artisans. This eliminates external vendor delays and ensures unmatched quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Décor Inquiry CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-white text-center border-t border-[#D4AF37]/30 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-3 tracking-wide">
            Have a Specific Theme or Color Palette in Mind?
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-sm max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Send us your Pinterest inspiration, wedding moodboard, or custom floral preferences. Our decor coordinators will tailor a stage blueprint for your date.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${venueData.whatsappNumber}?text=${encodeURIComponent('Hello SS Convention Hall, I would like to discuss custom stage décor and themes for my event.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#3D0A14]" />
              <span>Discuss Décor on WhatsApp</span>
            </a>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full border border-amber-300/60 text-white hover:bg-white/10 font-cinzel font-bold text-xs uppercase tracking-wider transition-all"
            >
              Book In-Person Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
