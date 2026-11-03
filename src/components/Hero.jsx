import React, { useState } from 'react';
import { Sparkles, Calendar, Utensils, MapPin, Eye, Play, ShieldCheck } from 'lucide-react';
import { venueData } from '../data/venueData';
import { teluguTranslations } from '../data/teluguData';

export default function Hero({ lang }) {
  const [activeHeroView, setActiveHeroView] = useState('hall'); // 'hall' or 'facade'

  const heroImages = {
    hall: {
      src: "/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg",
      label: "Grand Chandelier Hall",
      subtitle: "500-Capacity Central A/C Hall with Italian Marble & Crystal Chandeliers"
    },
    facade: {
      src: "/assets/04_exterior_and_entrance/exterior_night_facade_parking_lighting.jpeg",
      label: "Illuminated Night Facade",
      subtitle: "Iconic Contemporary Architecture with Ambient Step Lights & Ample Parking"
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image Crossfade */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImages[activeHeroView].src}
          alt={heroImages[activeHeroView].label}
          className="w-full h-full object-cover object-center transition-all duration-700 scale-105"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/70 to-obsidian-950/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-obsidian-950/40 to-obsidian-950/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Live Status Badge (Max 1 pulsing indicator) */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md mb-6 shadow-lg shadow-emerald-950/50">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-emerald-200 tracking-wide uppercase">
            {lang === 'te' ? '2026 - 2027 బుకింగ్స్ ప్రారంభం' : 'Now Booking Auspicious Dates for 2026 - 2027'}
          </span>
        </div>

        {/* Venue Location Sub-Heading */}
        <div className="flex items-center gap-1.5 text-gold-400 text-xs sm:text-sm font-medium tracking-widest uppercase mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Jillelaguda • Meerpet • Hyderabad</span>
        </div>

        {/* Grand Headline (Serif Luxury) */}
        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 max-w-4xl leading-tight sm:leading-tight mb-5">
          {lang === 'te' ? (
            <span>{teluguTranslations.hero.title}</span>
          ) : (
            <>
              Where Grand Traditions Meet{' '}
              <span className="gold-gradient-text block sm:inline">Unforgettable Celebrations</span>
            </>
          )}
        </h1>

        {/* Tagline / Subtitle */}
        <p className="text-stone-300 text-sm sm:text-lg max-w-2xl font-normal leading-relaxed mb-8 text-stone-200/90">
          {lang === 'te'
            ? teluguTranslations.hero.subtitle
            : "Hyderabad's premier central air-conditioned destination for Weddings, Receptions, 1st Birthdays, Cradle Ceremonies, and Grand Banquets for 50 to 500 guests."
          }
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-10 w-full max-w-md sm:max-w-none">
          <a
            href="#estimator"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gold-shimmer text-obsidian-950 font-bold text-sm tracking-wider uppercase shadow-xl shadow-gold-500/25 hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            <Calendar className="w-4 h-4" />
            <span>{lang === 'te' ? teluguTranslations.hero.bookBtn : 'Book Your Date Today'}</span>
          </a>

          <a
            href="#menus"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-obsidian-900/80 hover:bg-obsidian-800 text-stone-100 font-semibold text-sm border border-gold-500/30 hover:border-gold-400 backdrop-blur-md transition-all duration-200"
          >
            <Utensils className="w-4 h-4 text-gold-400" />
            <span>{lang === 'te' ? teluguTranslations.hero.menuBtn : 'Explore Catering Menus'}</span>
          </a>

          <a
            href="#tours"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-semibold text-stone-300 hover:text-gold-300 transition-colors"
          >
            <Play className="w-3.5 h-3.5 text-gold-400" />
            <span>Watch Hall Tour Video</span>
          </a>
        </div>

        {/* View Switcher Toggle (Grand Hall vs Night Facade) */}
        <div className="inline-flex p-1 rounded-full bg-obsidian-900/90 border border-gold-500/25 backdrop-blur-md shadow-lg">
          <button
            onClick={() => setActiveHeroView('hall')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              activeHeroView === 'hall'
                ? 'bg-gold-500 text-obsidian-950 font-bold shadow-md'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Grand Hall View</span>
          </button>
          <button
            onClick={() => setActiveHeroView('facade')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              activeHeroView === 'facade'
                ? 'bg-gold-500 text-obsidian-950 font-bold shadow-md'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Night Facade View</span>
          </button>
        </div>
      </div>
    </section>
  );
}

