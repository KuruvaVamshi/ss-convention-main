import React, { useState } from 'react';
import { themesData } from '../data/themesData';
import { Sparkles, Heart, Crown, ArrowUpRight } from 'lucide-react';

export default function ThemesSection({ onOpenLightbox, lang }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Weddings', 'Receptions & Engagements', 'Milestone Birthdays', 'Cradle & Naming'];

  const filteredThemes = activeCategory === 'All'
    ? themesData
    : themesData.filter((t) => t.category.includes(activeCategory) || activeCategory.includes(t.category));

  return (
    <section id="themes" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Event Themes</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-stone-100 tracking-tight mb-4">
            Curated Stage Decorations & Thematic Setups
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            From auspicious Vedic mandaps adorned with temple pillars and fresh floral garlands to modern fairy ring arches and joyful milestone birthday themes—our in-house decor artists tailor every detail to your family's dreams.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gold-shimmer text-obsidian-950 font-bold shadow-md shadow-gold-500/20'
                    : 'bg-obsidian-900 text-stone-300 hover:text-white hover:bg-obsidian-800 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredThemes.map((theme) => (
            <div
              key={theme.id}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border border-gold-500/20 bg-obsidian-900/80"
            >
              {/* Image Preview */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={theme.image}
                  alt={theme.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />
                {/* Badge */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-950/85 backdrop-blur-md border border-gold-500/30 text-gold-300 text-[11px] font-bold">
                  <span>{theme.badge}</span>
                </div>
                {/* Category tag */}
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-stone-300 bg-obsidian-900/80 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  {theme.category}
                </div>
              </div>

              {/* Theme Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-stone-100 group-hover:text-gold-300 transition-colors mb-2">
                    {theme.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {theme.description}
                  </p>
                </div>

                {/* Highlights tags */}
                <div className="pt-3 border-t border-stone-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {theme.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-stone-300 bg-stone-800/60 px-2 py-0.5 rounded border border-stone-700/40"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

