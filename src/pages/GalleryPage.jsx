import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, Phone, Calendar } from 'lucide-react';
import { galleryItems, videoTours } from '../data/galleryData';
import VideoReelsStory from '../components/VideoReelsStory';
import Reveal from '../components/Reveal';
import { venueData } from '../data/venueData';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'hall', label: 'Main Hall & Seating' },
  { id: 'mandap', label: 'Wedding Mandaps' },
  { id: 'reception', label: 'Reception Stages' },
  { id: 'birthday', label: 'Birthdays & Cradle' },
  { id: 'exterior', label: 'Facade & Lobby' },
];

export default function GalleryPage({ onOpenLightbox, lang }) {
  const [active, setActive] = useState('all');

  const counts = useMemo(() => {
    const c = { all: galleryItems.length };
    galleryItems.forEach((g) => {
      c[g.category] = (c[g.category] || 0) + 1;
    });
    return c;
  }, []);

  const items = active === 'all' ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <div className="bg-[#450B17] text-latte min-h-screen overflow-x-clip selection:bg-[#C5A059] selection:text-[#0D0204]">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pt-32 pb-14 border-b border-[#D4AF37]/30">
        <img
          src="/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_wide_stage.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#450B17] via-[#1C0409]/75 to-[#1C0409]/55" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">Visual Archive</p>
            <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-wide leading-[1.1]">Celebration Archive</h1>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#C5A059] to-transparent" />
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-mocha leading-relaxed">
              Every photo and video here was captured at real celebrations at S.S Convention A/C, Meerpet.
              <span className="block mt-1 text-sm text-amber-300/90">
                {galleryItems.length} photos · {videoTours.length} video tours
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[68px] sm:top-[72px] z-30 bg-[#1C0409]/95 backdrop-blur-xl border-b border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              aria-pressed={active === cat.id}
              className={`relative px-4 py-3.5 text-sm font-cinzel tracking-wider whitespace-nowrap transition-colors ${
                active === cat.id ? 'text-latte' : 'text-mocha hover:text-latte'
              }`}
            >
              {cat.label}
              <span className="ml-1.5 text-[11px] text-amber-300/70">{counts[cat.id] || 0}</span>
              {active === cat.id && (
                <motion.span layoutId="gallery-underline" className="absolute left-3 right-3 bottom-0 h-0.5 bg-amber-300 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry */}
      <section id="gallery" className="py-12 sm:py-16 bg-[#3D0A14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 [&>*]:mb-4 sm:[&>*]:mb-5"
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpenLightbox(item.image, item.title)}
                  aria-label={`View photo: ${item.title}`}
                  className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl border border-[#D4AF37]/25 hover:border-amber-400/70 bg-[#350710] text-left cursor-pointer transition-colors duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C0409]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/55 border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4 text-amber-200" />
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="block text-[10px] tracking-[0.25em] uppercase text-amber-300">{item.categoryLabel}</span>
                    <span className="block mt-1 text-sm font-semibold text-latte leading-snug">{item.title}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Video tours */}
      <VideoReelsStory lang={lang} />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-center border-t border-[#D4AF37]/30">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">See it in person</h2>
          <p className="mt-4 text-mocha leading-relaxed">
            Photos capture the moments, but standing beneath the crystal chandeliers makes the decision effortless.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold">
              <Calendar className="w-4 h-4" /> Plan your visit
            </Link>
            <a href={`tel:${venueData.phones[0].raw}`} className="btn-outline-gold">
              <Phone className="w-4 h-4 text-amber-300" /> {venueData.phones[0].display}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
