import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, Phone, Calendar, Film } from 'lucide-react';
import SEO from '../components/SEO';
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

  // Filter bar hides when scrolling down and returns when scrolling up
  const [barVisible, setBarVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);
        const diff = y - lastY.current;
        if (y <= 20) setBarVisible(true);
        else if (Math.abs(diff) >= 10) setBarVisible(diff < 0);
        if (y <= 20 || Math.abs(diff) >= 10) lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const counts = useMemo(() => {
    const c = { all: galleryItems.length };
    galleryItems.forEach((g) => {
      c[g.category] = (c[g.category] || 0) + 1;
    });
    return c;
  }, []);

  const items = active === 'all' ? galleryItems : galleryItems.filter((g) => g.category === active);
  // The photos currently shown, so the viewer can step left and right through them
  const lightboxItems = items.map((g) => ({ src: g.image, title: g.title }));

  return (
    <div className="bg-[#450B17] text-latte min-h-screen overflow-x-clip selection:bg-[#C5A059] selection:text-[#0D0204]">
      <SEO
        title="Wedding Hall Photos & Reception Decorations | S.S. Convention Meerpet"
        description="Browse genuine photographs of luxury wedding mandaps, reception stages, sangeet decor, and banquet celebrations at S.S. Convention in Meerpet, Hyderabad."
        keywords="Wedding Hall Photos, Reception Decorations, S.S. Convention Gallery, Function Hall Photos Meerpet, Wedding Stage Decor Hyderabad, Mandap Photos Hyderabad"
        canonical="/gallery"
      />
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pt-32 pb-14 border-b border-[#D4AF37]/30">
        <img
          src="/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_wide_stage.jpeg"
          alt="Traditional wedding mandap stage decorations at S.S. Convention Meerpet"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#450B17] via-[#1C0409]/75 to-[#1C0409]/55" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">Authentic Visual Archive</p>
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide leading-[1.1]">
              Wedding Hall Photos & Reception Decorations
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#EED9A6] to-[#C5A059] text-xl sm:text-3xl mt-2 font-normal">
                Real Celebration Gallery · S.S. Convention Meerpet
              </span>
            </h1>
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

      {/* Filters: floating pill bar that slides away on scroll down */}
      <div
        className={`sticky top-[76px] sm:top-[80px] z-30 px-3 pointer-events-none transform transition-transform duration-300 ${
          barVisible ? 'translate-y-0' : '-translate-y-[calc(100%+96px)]'
        }`}
      >
        <div className="max-w-full mx-auto mt-4 flex justify-center">
          <div
            role="group"
            aria-label="Filter photos"
            className="pointer-events-auto max-w-full flex items-center gap-1 p-1.5 rounded-full bg-[#1C0409]/80 backdrop-blur-xl border border-[#D4AF37]/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] overflow-x-auto no-scrollbar"
          >
            {categories.map((cat) => {
              const on = active === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  aria-pressed={on}
                  className={`relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-cinzel tracking-wider whitespace-nowrap transition-colors ${
                    on ? 'text-[#1C0409] font-bold' : 'text-mocha hover:text-latte'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="gallery-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B8860B] via-[#EED9A6] to-[#C5A059]"
                    />
                  )}
                  <span className="relative">{cat.label}</span>
                  <span className={`relative text-[10px] px-1.5 py-0.5 rounded-full ${on ? 'bg-[#1C0409]/15' : 'bg-white/10 text-amber-300'}`}>
                    {counts[cat.id] || 0}
                  </span>
                </button>
              );
            })}

            <div className="h-5 w-px bg-[#D4AF37]/30 mx-1" />

            <button
              type="button"
              onClick={() => {
                document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-cinzel tracking-wider whitespace-nowrap text-amber-300 hover:text-white border border-[#D4AF37]/40 hover:border-amber-400 bg-black/40 hover:bg-[#3D0A14] transition-all cursor-pointer shadow-sm"
              title="Jump to video walkthrough tours"
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Video Tours</span>
              <span className="relative text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                {videoTours.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Masonry */}
      <section id="gallery" className="py-12 sm:py-16 bg-[#3D0A14]">
        <div className="w-full px-4 sm:px-8 lg:px-12">
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
                  onClick={() => onOpenLightbox(item.image, item.title, lightboxItems)}
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
      <VideoReelsStory lang={lang} onOpenLightbox={onOpenLightbox} />

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
