import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Play, Film, Clock, Sparkles, X, ArrowRight } from 'lucide-react';
import { videoTours } from '../data/galleryData';
import Reveal from './Reveal';

/**
 * Dedicated Video Gallery Section
 * Centralizes all 6 authentic venue walkthrough videos in a clean, uniform grid.
 * Clicking any video card opens a full-screen cinema modal player with zero page reload.
 */
export default function VideoReelsStory({ lang }) {
  const [activeVideo, setActiveVideo] = useState(null);

  // Keyboard Escape listener to close video modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo]);

  const handleOpenVideo = (tour) => {
    setActiveVideo(tour);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <section id="videos" className="py-20 sm:py-28 bg-[#32060E] relative overflow-hidden border-t border-b border-[#D4AF37]/30 text-white scroll-mt-20">
      {/* Subtle Ambient Golden Glow in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-4 shadow-lg backdrop-blur-md">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'te' ? 'వీడియో టూర్స్ · 6 ప్రత్యేక క్లిప్‌లు' : 'Cinematic Video Tours · 6 Exclusive Clips'}</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4 drop-shadow-md">
              {lang === 'te' ? 'ఎస్.ఎస్ కన్వెన్షన్‌ను ప్రత్యక్షంగా వీక్షించండి' : 'Experience S.S. Convention in Motion'}
            </h2>

            <p className="text-amber-100/80 text-xs sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              {lang === 'te'
                ? 'మా గ్రాండ్ మ్యారేజ్ హాల్, క్రిస్టల్ షాండ్లియర్స్, థియేట్రికల్ లైటింగ్ మరియు బాంక్వెట్ డైనింగ్ ఫ్లోర్ నిజమైన వేడుకల వీడియోలను ఇక్కడ వీక్షించండి.'
                : 'Watch authentic walkthrough video tours showcasing our crystal chandeliers, theatrical stage illumination, royal wedding mandaps, and dedicated banquet dining floor.'}
            </p>
          </Reveal>
        </div>

        {/* Video Cards Grid (Uniform 3-Column Luxury Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videoTours.map((tour, index) => (
            <div
              key={tour.id}
              onClick={() => handleOpenVideo(tour)}
              className="bg-[#26040A] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#D4AF37]/35 hover:border-amber-400/90 flex flex-col shadow-2xl group hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] transition-all duration-300 cursor-pointer text-white"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={tour.thumbnail}
                  alt={tour.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:opacity-85 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-[#D4AF37]/40 uppercase tracking-wider shadow">
                  {tour.badge || `Tour 0${index + 1}`}
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-bold text-amber-200 border border-white/20 flex items-center gap-1 shadow">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{tour.duration}</span>
                </div>

                {/* Pulsing Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-black/60 border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.5)] backdrop-blur-md group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-[#26040A] transition-all duration-300">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#2A050D] to-[#1E0308]">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em] block mb-1">
                    {tour.category}
                  </span>
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors line-clamp-1">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-amber-100/75 font-light leading-relaxed line-clamp-2">
                    {tour.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs">
                  <span className="text-amber-200/70 text-[11px] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Real 4K Footage</span>
                  </span>
                  <span className="font-bold text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Watch Video</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Cinema Video Modal Lightbox */}
      {activeVideo && typeof document !== 'undefined' && createPortal(
        <div
          onClick={handleCloseVideo}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in select-none"
        >
          {/* High-Visibility Floating Close Button */}
          <button
            onClick={handleCloseVideo}
            className="fixed top-4 right-4 sm:top-5 sm:right-6 z-[100000] flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#3D0A14] hover:bg-[#8A1828] border-2 border-[#D4AF37] text-amber-200 hover:text-white shadow-[0_4px_30px_rgba(0,0,0,0.95)] backdrop-blur-md transition-all hover:scale-105 active:scale-95 group cursor-pointer"
            title="Close (Escape)"
            aria-label="Close Video"
          >
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-200 group-hover:text-white">
              CLOSE
            </span>
            <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center border border-amber-400/50">
              <X className="w-3.5 h-3.5 text-amber-300 group-hover:text-white" />
            </div>
          </button>

          {/* Video Player Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[92vh] w-full flex flex-col rounded-[24px] sm:rounded-[28px] overflow-hidden border-2 border-[#D4AF37]/60 bg-black shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
          >
            {/* Top Bar */}
            <div className="p-3.5 sm:p-4 px-5 sm:px-6 border-b border-[#D4AF37]/30 flex items-center justify-between bg-[#3D0A14] text-white pr-28 sm:pr-36">
              <div className="truncate pr-2">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
                  {activeVideo.category} · Real Venue Footage
                </span>
                <h3 className="font-cinzel text-xs sm:text-base font-bold text-white truncate">
                  {activeVideo.title}
                </h3>
              </div>
            </div>

            {/* Video Stage */}
            <div className="relative flex-1 bg-black flex items-center justify-center aspect-video max-h-[75vh]">
              <video
                src={activeVideo.src}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            </div>

            {/* Bottom Caption Bar */}
            <div className="p-3.5 sm:p-4 px-5 sm:px-6 bg-[#26040A] border-t border-[#D4AF37]/25 flex items-center justify-between text-xs text-amber-200/80">
              <p className="line-clamp-1 text-xs text-amber-100/90 font-light">
                {activeVideo.description}
              </p>
              <span className="hidden sm:inline-block font-bold text-amber-300 flex-shrink-0 ml-4">
                S.S Convention A/C, Meerpet
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
