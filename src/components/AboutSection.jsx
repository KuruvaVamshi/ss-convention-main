import React from 'react';
import { Award, HeartHandshake, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function AboutSection({ lang }) {
  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-glow pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Asset Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Visual: Lobby Buddha Water Fountain */}
              <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl group">
                <img
                  src="/assets/05_reception_and_lobby/lobby_buddha_water_fountain_feature.jpeg"
                  alt="SS Convention Lobby Waterfall and Buddha"
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-obsidian-900/90 backdrop-blur-md border border-gold-500/20">
                  <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider mb-0.5">
                    Foyer & Reception Experience
                  </p>
                  <p className="text-sm font-medium text-stone-200">
                    Tranquil stone Buddha waterfall fountain welcoming every honored guest.
                  </p>
                </div>
              </div>

              {/* Floating Accent Card: Official Backlit Brand Emblem */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 sm:w-56 rounded-2xl overflow-hidden border-2 border-gold-400/60 shadow-2xl bg-obsidian-900/95 p-1 backdrop-blur-xl animate-float">
                <img
                  src="/assets/05_reception_and_lobby/lobby_backlit_wooden_signboard.jpeg"
                  alt="SS Convention Backlit Signage"
                  className="w-full h-36 object-cover rounded-xl"
                />
                <div className="p-2 text-center">
                  <p className="text-[11px] font-bold text-gold-300">
                    "We Make Your Celebrations Unforgettable"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 self-start">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About S.S Convention A/C</span>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-stone-100 tracking-tight leading-snug mb-6">
              A Sanctum of Elegance, Warmth, & Seamless Celebrations
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
              Located conveniently in <span className="text-gold-300 font-semibold">Raghavendra Nagar Colony, Jillelaguda (Meerpet)</span>, S.S Convention A/C was architected with a singular philosophy: every milestone—from sacred Vedic marriage vows to joyful first birthdays—deserves a grand, hassle-free setting.
            </p>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
              We eliminate the compromises common to conventional function halls. With dual-level event spaces, seamless cassette central air conditioning, pristine separate dining halls, in-house theme decor, and dedicated bridal preparation suites, your family and guests enjoy pure royal hospitality.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              {[
                "Strategic Meerpet / Jillelaguda Location",
                "Spacious Layout: 50 to 500 Capacity",
                "Pure Ghee & Authentic Catering Options",
                "Separate Ceremony & Dining Levels",
                "Dedicated Event Manager & Staff Support",
                "Crystal Chandeliers & Modern Cove Lighting"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Stat Counters Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-800">
              <div>
                <p className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-400">500+</p>
                <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">Events Celebrated</p>
              </div>
              <div>
                <p className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-400">50-500</p>
                <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">Guest Capacity</p>
              </div>
              <div>
                <p className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-400">100%</p>
                <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">Climate Controlled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

