import React, { useState } from 'react';
import { spacesData } from '../data/spacesData';
import { Users, Check, ArrowRight } from 'lucide-react';

export default function SpacesSection({ onSelectSpace, lang }) {
  const [activeTab, setActiveTab] = useState(spacesData[0].id);

  const currentSpace = spacesData.find((s) => s.id === activeTab) || spacesData[0];

  return (
    <section id="spaces" className="py-20 lg:py-28 bg-obsidian-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Tailored Event Spaces</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-stone-100 tracking-tight mb-4">
            Designed for Intimate Rituals to Grand Receptions
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Whether welcoming 50 cherished family members or hosting a grand celebration of 500, SS Convention provides thoughtfully engineered spaces with independent air conditioning and dedicated amenities.
          </p>

          {/* Interactive Space Selectors (Tabs) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {spacesData.map((space) => (
              <button
                key={space.id}
                onClick={() => setActiveTab(space.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === space.id
                    ? 'bg-gold-500 text-obsidian-950 font-bold shadow-lg shadow-gold-500/20 scale-105'
                    : 'bg-obsidian-800 text-stone-300 hover:text-white hover:bg-obsidian-700 border border-stone-800'
                }`}
              >
                {space.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Space Spotlight Card */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image Column */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] overflow-hidden group">
              <img
                key={currentSpace.id}
                src={currentSpace.image}
                alt={currentSpace.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent lg:hidden" />
              {/* Capacity Floating Tag */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-obsidian-950/85 backdrop-blur-md border border-gold-500/40 text-gold-300 text-xs font-bold shadow-lg">
                <Users className="w-3.5 h-3.5 text-gold-400" />
                <span>{currentSpace.capacity}</span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-obsidian-950/90">
              <div>
                <span className="text-xs font-bold tracking-widest text-gold-400 uppercase block mb-1">
                  {currentSpace.subtitle}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-100 mb-4">
                  {currentSpace.name}
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {currentSpace.description}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 mb-8">
                  {(currentSpace.features || currentSpace.highlights || []).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200">
                      <div className="w-4 h-4 rounded-full bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block">Available For</span>
                  <span className="text-xs font-semibold text-gold-300">Half-Day & Full-Day Slots</span>
                </div>
                <a
                  href="#estimator"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-bold hover:bg-gold-500 hover:text-obsidian-950 transition-all duration-200"
                >
                  <span>Book Space</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

