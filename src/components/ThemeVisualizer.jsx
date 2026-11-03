import React, { useState } from 'react';
import { themesData } from '../data/themesData';
import { Sparkles, Sun, Moon, Maximize2 } from 'lucide-react';

export default function ThemeVisualizer({ onOpenLightbox, lang }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightingMode, setLightingMode] = useState('theatrical'); // 'theatrical' or 'ambient'

  const categories = ['All', 'Weddings', 'Receptions & Engagements', 'Milestone Birthdays', 'Cradle & Naming'];

  const filteredThemes = activeCategory === 'All'
    ? themesData
    : themesData.filter((t) => t.category.includes(activeCategory) || activeCategory.includes(t.category));

  return (
    <section id="themes" className="py-24 relative bg-[#450B17] overflow-hidden text-white border-t border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Thematic Stage Artistry</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4">
            Curated Stages & Event Décor
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed">
            Every celebration requires its own distinct soul. Switch lighting modes below to visualize our stages under soft ambient light versus grand theatrical stage par lights.
          </p>

          {/* Lighting Ambience Controller */}
          <div className="inline-flex p-1.5 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 shadow-xl mt-8 mb-4">
            <button
              onClick={() => setLightingMode('ambient')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                lightingMode === 'ambient'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-amber-200/80 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Natural Day Ambience</span>
            </button>
            <button
              onClick={() => setLightingMode('theatrical')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                lightingMode === 'theatrical'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-bold shadow-md'
                  : 'text-amber-200/80 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Theatrical Stage Glow</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] border-amber-300 font-bold shadow-md scale-105'
                    : 'bg-[#3A0813] text-amber-100 hover:bg-[#4D0D19] border-[#D4AF37]/35 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredThemes.map((theme) => (
            <div
              key={theme.id}
              className={`bg-[#3A0813] rounded-[28px] overflow-hidden flex flex-col group border-2 transition-all duration-500 shadow-2xl ${
                lightingMode === 'theatrical'
                  ? 'border-[#D4AF37]/60 hover:border-amber-400'
                  : 'border-[#D4AF37]/30 hover:border-amber-400'
              }`}
            >
              {/* Image Preview with Lighting Simulation */}
              <div
                onClick={() => onOpenLightbox(theme.image, theme.title)}
                className="relative h-64 sm:h-72 overflow-hidden cursor-pointer bg-black"
              >
                <img
                  src={theme.image}
                  alt={theme.title}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                    lightingMode === 'theatrical'
                      ? 'contrast-115 brightness-105 saturate-110'
                      : 'contrast-100 brightness-95'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85" />

                {/* Lighting Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-amber-200 border border-white/20 shadow-sm">
                  {lightingMode === 'theatrical' ? 'Theatrical Par Glow' : 'Ambient Soft Light'}
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white border border-white/30 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-4 h-4 text-amber-200" />
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-0.5">
                    {theme.category}
                  </span>
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white leading-tight">
                    {theme.title}
                  </h3>
                </div>
              </div>

              {/* Theme Specifications */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-[#350710] text-white">
                <div>
                  <p className="text-xs text-amber-100/85 font-normal leading-relaxed mb-4">
                    {theme.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {theme.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-[#4D0D19] border border-[#D4AF37]/30 text-amber-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs">
                  <span className="text-amber-200/70 font-normal">In-House Décor:</span>
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Verified Artisans
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
