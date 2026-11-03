import React from 'react';
import { videoTours } from '../data/galleryData';
import { Film } from 'lucide-react';
import SplitHeading from './SplitHeading';

export default function VideoReelsStory({ lang }) {
  return (
    <section id="tours" className="py-24 bg-[#3D0A14] relative overflow-hidden border-t border-b border-[#D4AF37]/30 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-3 shadow-md backdrop-blur-sm">
            <Film className="w-3.5 h-3.5 text-amber-300" />
            <span>Cinematic Walkthrough</span>
          </div>
          <SplitHeading
            as="h2"
            className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4 drop-shadow"
          >
            See It In Motion
          </SplitHeading>
          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed">
            Take a virtual tour through the grand marriage hall, glowing floral arches, and live celebration energy recorded right on our floors.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {videoTours.map((tour, index) => (
            <div
              key={tour.id}
              className="bg-[#4A0E17] rounded-[28px] overflow-hidden border-2 border-[#D4AF37]/45 flex flex-col shadow-2xl group hover:border-amber-400 hover:shadow-amber-500/15 transition-all text-white"
            >
              {/* Responsive Video Frame */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <video
                  src={tour.src}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold text-amber-200 border border-white/20">
                  Video Reel 0{index + 1}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-[#3A0813] text-white">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-amber-100/80 font-normal leading-relaxed">
                    {tour.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between text-xs text-amber-300">
                  <span className="font-bold">S.S Convention A/C</span>
                  <span className="text-amber-200/70 text-[11px] font-medium">Real Footage</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
