import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { spacesData } from '../data/spacesData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const ids = ['hall-vasishta', 'hall-agasthya', 'hall-koundinya'];

const arrowClass =
  'absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 border border-[#D4AF37]/40 text-latte flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-amber-400 hover:text-[#3D0A14]';

function HallCard({ hall, featured }) {
  const photos = hall.gallery?.length ? hall.gallery.slice(0, 4).map((g) => g.src) : [hall.hallImage || hall.image];
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const next = (i + photos.length) % photos.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
    setIdx(next);
  };
  const onScroll = (e) => {
    const el = e.currentTarget;
    setIdx(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <article className="group flex flex-col h-full rounded-2xl overflow-hidden bg-[#450B17] border border-[#D4AF37]/30 hover:border-amber-400/70 shadow-xl hover:shadow-[0_14px_40px_rgba(212,175,55,0.16)] transition-all duration-500">
      {/* Scrollable photos */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex h-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${hall.name} - ${hall.role || 'Wedding & Function Hall'} at S.S. Convention Meerpet, Hyderabad (Photo ${i + 1})`}
              loading="lazy"
              draggable={false}
              className="w-full h-full flex-shrink-0 snap-center object-cover"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A0610] via-transparent to-transparent pointer-events-none" />

        {photos.length > 1 && (
          <>
            <button type="button" onClick={() => goTo(idx - 1)} aria-label="Previous photo" className={`${arrowClass} left-2`}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => goTo(idx + 1)} aria-label="Next photo" className={`${arrowClass} right-2`}>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 right-4 flex gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${i === idx ? 'w-5 bg-amber-300' : 'w-2 bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        <span className="absolute top-3 right-3 pointer-events-none inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-[#D4AF37]/40 text-xs text-amber-200">
          <Users className="w-3.5 h-3.5" /> {hall.capacity}
        </span>

        <div className="absolute bottom-4 left-5 right-20 pointer-events-none">
          {featured && <span className="text-[10px] tracking-[0.25em] uppercase text-amber-300 font-semibold">Flagship</span>}
          <h3 className="font-cinzel text-2xl font-bold text-latte drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">{hall.name}</h3>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-sm text-amber-300 font-semibold">{hall.tagline}</p>
        <p className="mt-2 text-sm text-mocha leading-relaxed line-clamp-2">{hall.shortDescription || hall.description}</p>

        <Link to={`/halls/${hall.id}`} className="btn-gold mt-auto w-full" style={{ marginTop: '1.25rem' }}>
          <span>View hall</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

export default function HomeHalls() {
  const halls = ids.map((id) => spacesData.find((s) => s.id === id)).filter(Boolean);
  return (
    <section id="halls" className="py-20 lg:py-28 bg-[#3D0A14] border-t border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Three Purpose-Built Spaces" title="Our Premium Halls">
          Each hall has its own character and capacity. Pick the one that fits your celebration.
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {halls.map((hall, i) => (
            <Reveal key={hall.id} delay={i * 0.12} className="h-full">
              <HallCard hall={hall} featured={i === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/spaces" className="btn-gold">Explore all halls & specs <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/contact" className="btn-outline-gold">Enquire now</Link>
        </Reveal>
      </div>
    </section>
  );
}
