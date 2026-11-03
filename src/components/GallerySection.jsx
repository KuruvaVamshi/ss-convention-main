import React, { useState } from 'react';
import { galleryItems } from '../data/galleryData';
import { Camera, Maximize2 } from 'lucide-react';

export default function GallerySection({ onOpenLightbox, lang }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'hall', label: 'Main Hall & Seating' },
    { id: 'mandap', label: 'Wedding Mandaps' },
    { id: 'reception', label: 'Reception Stages' },
    { id: 'birthday', label: 'Birthdays & Cradle' },
    { id: 'exterior', label: 'Facade & Lobby' }
  ];

  const filteredImages = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 relative bg-[#450B17] overflow-hidden text-white border-t border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Real Moments & Architecture</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4">
            A Glimpse into Our Celebrations
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed">
            Every photo presented here was taken from actual celebrations hosted at S.S Convention A/C. Explore the halls, floral craftsmanship, and heartfelt memories.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] border-amber-300 font-bold shadow-md scale-105'
                    : 'bg-[#3A0813] text-amber-100 hover:bg-[#4D0D19] border-[#D4AF37]/35 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item.image, item.title)}
              className="group relative rounded-[28px] overflow-hidden border-2 border-[#D4AF37]/40 bg-[#350710] shadow-xl cursor-pointer transition-all duration-300 hover:border-amber-400 hover:shadow-2xl"
            >
              <div className="h-64 sm:h-72 w-full overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Gradient & Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white border border-white/30 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4 text-amber-200" />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-0.5">
                  {item.categoryLabel}
                </span>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-amber-100 transition-colors">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
