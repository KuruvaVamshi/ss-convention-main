import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Snowflake, Building, Zap, ArrowRight, Maximize2 } from 'lucide-react';
import { spacesData } from '../data/spacesData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const ids = ['hall-vasishta', 'hall-agasthya', 'hall-koundinya'];

function HallCard({ hall, featured, onOpenLightbox }) {
  const thumbs = hall.gallery?.length ? hall.gallery.slice(0, 4) : [{ src: hall.hallImage || hall.image, title: hall.name }];
  const [active, setActive] = useState(hall.hallImage || hall.image);

  return (
    <article className="group flex flex-col h-full rounded-2xl overflow-hidden bg-[#450B17] border border-[#D4AF37]/30 hover:border-amber-400/70 shadow-xl hover:shadow-[0_14px_40px_rgba(212,175,55,0.16)] transition-all duration-500">
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          key={active}
          src={active}
          alt={hall.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A0610] via-transparent to-transparent" />

        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-[#D4AF37]/40 text-xs text-amber-200">
          <Users className="w-3.5 h-3.5" /> {hall.capacity}
        </span>
        <button
          type="button"
          onClick={() => onOpenLightbox?.(active, hall.name)}
          aria-label={`Zoom ${hall.name}`}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-[#D4AF37]/40 text-amber-200 flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        <div className="absolute bottom-4 left-5 right-5">
          {featured && <span className="text-[10px] tracking-[0.25em] uppercase text-amber-300 font-semibold">Flagship</span>}
          <h3 className="font-cinzel text-2xl font-bold text-latte drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">{hall.name}</h3>
        </div>
      </div>

      {/* Angles */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#350710] border-b border-[#D4AF37]/20">
        <span className="text-[10px] uppercase tracking-wider text-mocha font-semibold">Angles</span>
        {thumbs.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(t.src)}
            title={t.title}
            aria-label={t.title || `Angle ${i + 1}`}
            className={`w-12 h-9 rounded-md overflow-hidden border flex-shrink-0 transition-all ${
              active === t.src ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-[#D4AF37]/30 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={t.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] tracking-[0.2em] uppercase text-amber-300 font-semibold">{hall.tagline}</p>
        <p className="mt-2 text-sm text-mocha leading-relaxed line-clamp-3">{hall.shortDescription || hall.description}</p>

        <p className="mt-3 text-xs text-latte">
          <span className="text-amber-300 font-semibold uppercase tracking-wider text-[10px] mr-2">Ideal for</span>
          {hall.bestFor}
        </p>

        <ul className="mt-4 pt-4 border-t border-[#D4AF37]/20 flex flex-wrap gap-x-4 gap-y-2 text-xs text-mocha">
          <li className="inline-flex items-center gap-1.5"><Snowflake className="w-3.5 h-3.5 text-amber-300" /> Central A/C</li>
          <li className="inline-flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-amber-300" /> {(hall.dimensions || '').split('•')[0] || 'Spacious'}</li>
          <li className="inline-flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-300" /> 100% DG power</li>
        </ul>

        <Link to={`/halls/${hall.id}`} className="btn-gold mt-auto pt-0 w-full" style={{ marginTop: '1.25rem' }}>
          <span>Explore hall & specs</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default function HomeHalls({ onOpenLightbox }) {
  const halls = ids.map((id) => spacesData.find((s) => s.id === id)).filter(Boolean);
  return (
    <section id="halls" className="py-20 lg:py-28 bg-[#3D0A14] border-t border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Three Purpose-Built Spaces" title="Our Premium Halls">
          Discover our meticulously designed spaces, each offering unique character and capacity to perfectly match your celebration.
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {halls.map((hall, i) => (
            <Reveal key={hall.id} delay={i * 0.12} className="h-full">
              <HallCard hall={hall} featured={i === 0} onOpenLightbox={onOpenLightbox} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/spaces" className="btn-gold">Explore all halls & specs <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/gallery" className="btn-outline-gold">View gallery</Link>
          <Link to="/contact" className="btn-outline-gold">Enquire now</Link>
        </Reveal>
      </div>
    </section>
  );
}
