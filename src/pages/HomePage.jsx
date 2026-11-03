import React from 'react';
import { Link } from 'react-router-dom';
import HeroStorytelling from '../components/HeroStorytelling';
import QuickProofBar from '../components/QuickProofBar';
import GrandCelebrationJourney from '../components/GrandCelebrationJourney';
import SwiperMenuShowcase from '../components/SwiperMenuShowcase';
import SplitHeading from '../components/SplitHeading';
import InteractiveHallCard from '../components/InteractiveHallCard';
import InteractiveThemeStageStudio from '../components/InteractiveThemeStageStudio';
import InteractiveHomeBanquet from '../components/InteractiveHomeBanquet';
import VideoReelsStory from '../components/VideoReelsStory';
import { Sparkles, ArrowRight, Building, CalendarCheck, Phone } from 'lucide-react';
import { venueData } from '../data/venueData';
import { spacesData } from '../data/spacesData';

export default function HomePage({ onOpenLightbox, lang }) {
  // Top named halls ordered hierarchically: Hall Vasishta (Flagship), Hall Agasthya, Hall Koundinya
  const premierHalls = [
    spacesData.find(s => s.id === 'hall-vasishta') || spacesData[0],
    spacesData.find(s => s.id === 'hall-agasthya') || spacesData[1],
    spacesData.find(s => s.id === 'hall-koundinya') || spacesData[2],
  ];

  return (
    <div className="bg-[#450B17] text-white min-h-screen">
      {/* Chapter 1: Grand Foyer Hero with Video & Atmosphere Switcher */}
      <HeroStorytelling lang={lang} onOpenLightbox={onOpenLightbox} />

      {/* Chapter 2: "OUR PREMIUM HALLS." */}
      <section id="halls" className="py-24 lg:py-32 relative bg-[#3D0A14] overflow-hidden border-t border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Heading styled in Royal Maroon & Imperial Gold aesthetic */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/50 text-amber-200 text-xs font-bold tracking-widest uppercase mb-3 shadow-md backdrop-blur-sm">
              <Building className="w-3.5 h-3.5 text-amber-300" />
              <span>Three Purpose-Built Spaces</span>
            </div>
            <SplitHeading
              as="h2"
              className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.16em] text-white uppercase mb-4 drop-shadow"
            >
              OUR PREMIUM HALLS
            </SplitHeading>
            <p className="text-amber-100/80 text-xs sm:text-sm md:text-base font-normal tracking-wide leading-relaxed">
              Discover our meticulously designed spaces, each offering unique character and capacity to perfectly match your celebration.
            </p>
          </div>

          {/* 3 Interactive Premium Hall Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {premierHalls.map((hall) => (
              <InteractiveHallCard
                key={hall.id}
                hall={hall}
                onOpenLightbox={onOpenLightbox}
                lang={lang}
              />
            ))}
          </div>

          {/* Clear Luxury CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <Link
              to="/spaces"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-xl hover:scale-105"
            >
              <span>Explore All Halls & Specs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-amber-400/70 text-amber-300 hover:bg-white/10 font-cinzel font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-md"
            >
              <span>View Gallery</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/40 text-white hover:text-amber-300 hover:border-amber-400 font-cinzel font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-md"
            >
              <span>Enquire Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8-Point Instant Verification Bar */}
      <QuickProofBar lang={lang} />

      {/* Chapter 3: The Flagship 5-Chapter Storyline Timeline */}
      <GrandCelebrationJourney onOpenLightbox={onOpenLightbox} lang={lang} />

      {/* Chapter 4: Interactive Thematic Stage Décor & Lighting Simulator */}
      <InteractiveThemeStageStudio onOpenLightbox={onOpenLightbox} lang={lang} />

      {/* Chapter 5: 3D Swiper Coverflow Banquet Feasts Showcase */}
      <SwiperMenuShowcase onOpenLightbox={onOpenLightbox} lang={lang} />

      {/* Chapter 6: Interactive Banquets & Feast Customizer */}
      <InteractiveHomeBanquet onOpenLightbox={onOpenLightbox} lang={lang} />

      {/* Chapter 7: Video Walkthroughs in Action */}
      <VideoReelsStory lang={lang} />

      {/* Chapter 8: Big Booking Invitation Banner (Royal Swan Maroon Velvet Feature) */}
      <section className="py-24 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-white relative overflow-hidden border-t border-[#D4AF37]/35 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/30 border border-[#D4AF37]/50 text-amber-200 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Begin Your Auspicious Chapter</span>
          </div>
          <SplitHeading
            as="h2"
            className="font-cinzel text-3xl sm:text-6xl font-bold text-white tracking-wide mb-4 drop-shadow-md"
          >
            Ready to Celebrate at S.S Convention?
          </SplitHeading>
          <p className="text-amber-100/90 text-xs sm:text-base max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Prime wedding muhurthams, auspicious birthdays, and weekend banquet dates book rapidly. Reserve your slot and receive an instant estimate.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              onClick={() => window.triggerBlessings?.()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-sm tracking-[0.18em] uppercase shadow-2xl hover:scale-105 transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>BOOK VISIT & ESTIMATE</span>
            </Link>
            <a
              href={`tel:${venueData.phones[0].raw}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-amber-300/60 hover:bg-white/10 text-white font-cinzel font-bold text-sm tracking-[0.18em] uppercase shadow-lg transition-all"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call +91 89857 00044</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
