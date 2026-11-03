import React from 'react';
import { Link } from 'react-router-dom';
import GallerySection from '../components/GallerySection';
import VideoReelsStory from '../components/VideoReelsStory';
import { Camera, Sparkles } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function GalleryPage({ onOpenLightbox, lang }) {
  return (
    <div className="bg-[#450B17] text-white min-h-screen pt-24">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-[#350710] to-[#450B17] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-4 shadow-md backdrop-blur-sm">
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span>Visual Archive & Live Tours</span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.12em] text-white uppercase mb-4 drop-shadow">
            CELEBRATION ARCHIVE
          </h1>
          <p className="text-amber-100/80 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            Every photograph and video reel presented across this website was captured during actual celebrations at S.S CONVENTION A/C in Meerpet, Hyderabad. Filter by event type or watch live video walkthroughs.
          </p>
        </div>
      </section>

      {/* Main Filterable Photo Gallery */}
      <GallerySection onOpenLightbox={onOpenLightbox} lang={lang} />

      {/* Dedicated Cinematic Video Reels Section */}
      <VideoReelsStory lang={lang} />

      {/* Bottom Visit Invitation */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-white border-t border-[#D4AF37]/30 shadow-2xl text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/25 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Real Venues Look Even Better in Person</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-3 tracking-wide">
            Experience the Opulence With Your Family
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-sm max-w-xl mx-auto mb-8 font-light">
            Photographs capture the moments, but standing beneath the double crystal chandeliers and feeling the central air-conditioning makes the decision effortless.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Plan Your In-Person Visit
            </Link>
            <a
              href={`tel:${venueData.phones[0].raw}`}
              className="px-8 py-3.5 rounded-full border border-amber-300/60 text-white hover:bg-white/10 font-cinzel font-bold text-xs uppercase tracking-wider transition-all"
            >
              Call Venue (+91 89857 00044)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
