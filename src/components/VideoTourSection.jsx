import React from 'react';
import { videoTours } from '../data/galleryData';
import { Film, Play, Sparkles } from 'lucide-react';

export default function VideoTourSection({ lang }) {
  return (
    <section id="tours" className="py-20 lg:py-28 bg-obsidian-900/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>Virtual Walkthrough Experience</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-stone-100 tracking-tight mb-4">
            Experience S.S Convention in Motion
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Watch short video tours showcasing the venue's crystal chandelier ceiling, theatrical stage illumination, and celebratory ambience.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {videoTours.map((tour) => (
            <div
              key={tour.id}
              className="glass-panel rounded-2xl overflow-hidden border border-gold-500/25 bg-obsidian-950 flex flex-col shadow-2xl"
            >
              {/* Responsive Video Container */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <video
                  src={tour.src}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Video Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel text-base font-bold text-stone-100 mb-2">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {tour.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-[11px] text-gold-400 font-medium">SS Convention Tour Clip</span>
                  <span className="text-[10px] text-stone-400">Tap play to watch</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

