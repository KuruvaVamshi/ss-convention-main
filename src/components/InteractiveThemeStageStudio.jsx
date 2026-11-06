import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SplitHeading from './SplitHeading';
import { Sparkles, Sun, Moon, Flame, ArrowRight, CheckCircle2, Maximize2, Palette } from 'lucide-react';
import { themesData } from '../data/themesData';

export default function InteractiveThemeStageStudio({ onOpenLightbox, lang }) {
  const [activeThemeId, setActiveThemeId] = useState(themesData[0]?.id || 'theme-vedic-kalyanam');
  const [lightingMode, setLightingMode] = useState('theatrical'); // 'day' | 'theatrical' | 'haldi'

  const activeTheme = themesData.find((t) => t.id === activeThemeId) || themesData[0];

  // Lighting overlay filters and classes
  const getLightingStyles = () => {
    switch (lightingMode) {
      case 'day':
        return {
          filter: 'brightness(1.08) contrast(1.04) saturate(1.05)',
          overlayBg: 'from-amber-500/10 via-transparent to-transparent',
          label: lang === 'te' ? 'సహజ పగటి కాంతి (ముహూర్తం)' : 'Natural Day Muhurtham Light',
          tag: 'Daylight 5500K'
        };
      case 'haldi':
        return {
          filter: 'sepia(0.2) saturate(1.3) brightness(0.98)',
          overlayBg: 'from-yellow-500/15 via-transparent to-transparent',
          label: lang === 'te' ? 'పసుపు & మెహందీ గోల్డెన్ గ్లో' : 'Haldi & Marigold Amber Glow',
          tag: 'Amber Warm 2700K'
        };
      case 'theatrical':
      default:
        return {
          filter: 'contrast(1.12) brightness(0.95) saturate(1.15)',
          overlayBg: 'from-purple-900/15 via-transparent to-transparent',
          label: lang === 'te' ? 'థియేట్రికల్ స్టేజ్ పార్ లైట్స్' : 'Royal Evening Theatrical Glow',
          tag: 'Theatrical RGB + Edison'
        };
    }
  };

  const lighting = getLightingStyles();

  return (
    <section id="stage-studio" className="py-24 bg-[#3D0A14] relative overflow-hidden border-t border-b border-[#D4AF37]/30 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-3 shadow-md backdrop-blur-sm">
            <Palette className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'te' ? 'స్టేజ్ డెకర్ & లైటింగ్ స్టూడియో' : 'Thematic Stage Artistry'}</span>
          </div>
          <SplitHeading
            as="h2"
            className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-3 drop-shadow"
          >
            {lang === 'te' ? 'అలంకరణ & లైటింగ్ అనుకరణ' : 'Interactive Stage Décor & Lighting'}
          </SplitHeading>
          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed max-w-2xl mx-auto">
            {lang === 'te'
              ? 'మీ వేడుకకు అనుగుణంగా లైటింగ్ మూడ్ మార్చండి. పగటి ముహూర్తం, రాయల్ ఈవినింగ్ సంగీత్, మరియు హల్దీ గోల్డెన్ కాంతులను ప్రత్యక్షంగా అనుభవించండి.'
              : 'Toggle lighting modes below to experience how our stages transform under natural day muhurtham light, opulent royal theatrical stage pars, or golden haldi ambiance.'}
          </p>

          {/* Master Interactive Lighting Controller */}
          <div className="inline-flex p-1.5 rounded-full bg-[#24050B] border border-[#D4AF37]/50 shadow-md mt-8">
            <button
              onClick={() => setLightingMode('day')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                lightingMode === 'day'
                  ? 'bg-amber-400 text-[#3D0A14] shadow-md scale-105'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Daylight</span>
            </button>
            <button
              onClick={() => setLightingMode('theatrical')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                lightingMode === 'theatrical'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] shadow-md scale-105'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Theatrical Stage</span>
            </button>
            <button
              onClick={() => setLightingMode('haldi')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                lightingMode === 'haldi'
                  ? 'bg-amber-600 text-white shadow-md scale-105'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Haldi Amber</span>
            </button>
          </div>
        </div>

        {/* Interactive Stage Canvas Card */}
        <div className="bg-[#3A0813] rounded-[32px] overflow-hidden border border-[#D4AF37]/45 shadow-2xl p-6 sm:p-8 lg:p-10 mb-10 text-white">
          {/* Visual Stage Selector Strip with Authentic Photo Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8">
            {themesData.map((theme) => {
              const isSelected = activeThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setActiveThemeId(theme.id)}
                  className={`flex items-center gap-2.5 p-2 pr-4 rounded-2xl border transition-all flex-shrink-0 text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] font-bold border-amber-300 shadow-lg scale-102'
                      : 'bg-[#24050B] text-amber-100 hover:bg-[#420B16] border-[#D4AF37]/35'
                  }`}
                >
                  <div className="w-12 h-10 rounded-xl overflow-hidden border border-white/20 flex-shrink-0 bg-black">
                    <img src={theme.image} alt={theme.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="block font-cinzel text-xs font-bold leading-tight">
                      {theme.title.split('(')[0].slice(0, 24)}
                    </span>
                    <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-[#3D0A14]' : 'text-amber-300'}`}>
                      {theme.badge || theme.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Display Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Viewport with Interactive Lighting Grade */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-xl aspect-[16/10] bg-[#140407] group">
              <img
                src={activeTheme.image}
                alt={activeTheme.title}
                style={{ filter: lighting.filter }}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${lighting.overlayBg} transition-all duration-700 pointer-events-none`} />

              {/* Lighting Badge Pill */}
              <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/75 border border-[#D4AF37]/50 text-amber-200 text-xs font-bold shadow-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{lighting.label}</span>
              </div>

              {/* Zoom Lightbox Trigger */}
              <button
                onClick={() => onOpenLightbox(activeTheme.image, activeTheme.title)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/75 border border-[#D4AF37]/50 text-amber-300 flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-all shadow-md"
                title="Zoom Stage Photo"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Stage Title Bar */}
              <div className="absolute bottom-4 left-5 right-5 z-20">
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                  {activeTheme.title}
                </h3>
                <span className="text-xs text-amber-200 font-bold tracking-wider drop-shadow">
                  {activeTheme.category}
                </span>
              </div>
            </div>

            {/* Stage Description & Craft Details */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-[10px] font-bold text-amber-300 tracking-[0.25em] uppercase">
                  {lighting.tag}
                </span>
                <h4 className="font-cinzel text-2xl font-bold text-white mt-1 mb-3">
                  {activeTheme.title}
                </h4>
                <p className="text-amber-100/80 text-xs sm:text-sm font-light leading-relaxed">
                  {activeTheme.description}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-3 border-t border-[#D4AF37]/25">
                <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase block">
                  Décor Highlights Included
                </span>
                {(activeTheme.highlights || activeTheme.features || []).map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-amber-100/90 font-normal">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  <span>View Grand Gallery</span>
                  <ArrowRight className="w-4 h-4 text-[#3D0A14]" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-amber-400/50 text-amber-200 hover:bg-amber-400 hover:text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Customize Décor</span>
                </Link>
              </div>
            </div>
          </div>

          {/* More Authentic Reception & Mandap Stage Inspirations (Photo Strip) */}
          <div className="mt-8 pt-6 border-t border-[#D4AF37]/25">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-amber-300 tracking-[0.2em] uppercase">
                Explore More Authentic Stage Designs:
              </span>
              <span className="text-[10px] text-amber-200/80">
                Click any photo to zoom
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { title: "Boho Triple-Arch Pastel Garden", src: "/assets/09_reception_engagement_stages/stage_triple_arch_boho_garden_warm_yellow.jpeg" },
                { title: "Romantic Candle Wall & Amber Glow", src: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_candle_rods_wide.jpeg" },
                { title: "Edison Vintage Bulbs & Filigree", src: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_edison_bulbs.jpeg" },
                { title: "Peach Drapes & Fairy Lights Divan", src: "/assets/09_reception_engagement_stages/stage_peach_drapes_fairy_lights_divan_sofa.jpeg" },
                { title: "Magenta & White Floral Pedestals", src: "/assets/09_reception_engagement_stages/stage_magenta_white_drapes_floral_pedestals.jpeg" },
                { title: "Pink Floral Monogram Arch", src: "/assets/09_reception_engagement_stages/stage_pink_drapes_floral_arch_as_monogram.jpeg" }
              ].map((stage, idx) => (
                <div
                  key={idx}
                  onClick={() => onOpenLightbox(stage.src, stage.title)}
                  className="group/st relative rounded-xl overflow-hidden border border-[#D4AF37]/35 bg-black cursor-pointer aspect-[4/3] hover:border-amber-400 transition-all shadow-md"
                >
                  <img
                    src={stage.src}
                    alt={stage.title}
                    className="w-full h-full object-cover group-hover/st:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-1.5 left-2 right-2">
                    <span className="text-[9px] font-medium text-white line-clamp-1 drop-shadow">
                      {stage.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
