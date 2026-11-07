import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { spacesData } from '../data/spacesData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const ids = ['hall-vasishta', 'hall-agasthya', 'hall-koundinya'];

export default function HomeHalls() {
  const halls = ids.map((id) => spacesData.find((s) => s.id === id)).filter(Boolean);
  return (
    <section id="halls" className="py-20 lg:py-28 bg-[#3D0A14] border-t border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Three Purpose-Built Spaces" title="Our Halls">
          Choose the space that fits your guest list and occasion.
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {halls.map((hall, i) => (
            <Reveal key={hall.id} delay={i * 0.12} className={i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}>
              <Link
                to={`/halls/${hall.id}`}
                className="group block rounded-2xl overflow-hidden bg-[#450B17] border border-[#D4AF37]/30 hover:border-amber-400/80 shadow-xl hover:shadow-[0_14px_40px_rgba(212,175,55,0.18)] transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={hall.hallImage || hall.image}
                    alt={hall.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A0610] via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/55 backdrop-blur-sm border border-[#D4AF37]/40 text-xs text-amber-200">
                    <Users className="w-3.5 h-3.5" /> {hall.capacity} guests{i === 0 ? ' · Flagship' : ''}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-cinzel text-xl font-bold text-latte">{hall.name}</h3>
                  <p className="mt-1 text-sm text-mocha">{hall.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-cinzel font-bold tracking-[0.18em] uppercase text-amber-300 group-hover:gap-3 transition-all duration-300">
                    View hall <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <Link to="/spaces" className="btn-outline-gold">Compare all spaces</Link>
        </Reveal>
      </div>
    </section>
  );
}
