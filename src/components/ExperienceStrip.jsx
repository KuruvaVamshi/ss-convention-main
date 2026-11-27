import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import ResponsiveImage from './ResponsiveImage';

const tiles = [
  { to: '/gallery', title: 'Decor & Themes', text: 'Stages, mandaps and lighting for every occasion.', img: '/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg' },
  { to: '/menus', title: 'Menus', text: 'Veg and non-veg feasts from 100 to 250 guests.', img: '/assets/03_food_and_catering_menus/menu_03_premium_veg_200pax.jpeg', objPos: 'object-top' },
  { to: '/about#facilities', title: 'Facilities', text: 'Dining hall, parking, power backup and more.', img: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg' },
  { to: '/gallery', title: 'Gallery', text: 'Real photos from real celebrations.', img: '/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_wide_stage.jpeg' },
];

// Expanding panels: the hovered (or tapped) panel opens wide and reveals its text.
export default function ExperienceStrip() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-[#2E060F] border-t border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Plan Your Event" title="Everything You Need" />

        <Reveal>
          <div className="flex flex-col lg:flex-row gap-3.5 lg:gap-3 lg:h-[460px]">
            {tiles.map((t, i) => {
              const open = active === i;
              return (
                <Link
                  key={t.title}
                  to={t.to}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={(e) => {
                    // On touch screens the first tap opens the panel, the second follows the link.
                    if (!open && window.matchMedia('(hover: none)').matches) {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  className={`group relative overflow-hidden rounded-2xl border transition-[flex,border-color,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? 'h-56 sm:h-64 lg:h-auto lg:flex-[3.2] border-amber-400/70' : 'h-44 sm:h-48 lg:h-auto lg:flex-1 border-[#D4AF37]/30'
                  }`}
                >
                  <ResponsiveImage
                    src={t.img}
                    alt={t.title}
                    sizes="(max-width: 1024px) 105vw, 40vw"
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover ${t.objPos || 'object-center'} transition-all duration-[1200ms] ease-out ${
                      open ? 'scale-105 brightness-100' : 'scale-100 brightness-90 lg:brightness-[0.6] lg:grayscale-[0.3]'
                    }`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#1C0409] ${t.objPos ? 'via-[#1C0409]/65' : 'via-[#1C0409]/35'} to-transparent`} />

                  <span className="absolute top-3.5 left-4 sm:top-4 sm:left-5 font-cinzel text-sm tracking-[0.3em] text-amber-300/95 drop-shadow">
                    0{i + 1}
                  </span>
                  <span
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full border border-[#D4AF37]/50 bg-black/45 backdrop-blur-sm flex items-center justify-center text-latte transition-all duration-500 ${
                      open ? 'opacity-100 scale-100' : 'opacity-75 lg:opacity-0 scale-90 lg:scale-75'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-latte whitespace-nowrap drop-shadow">{t.title}</h3>
                    <p
                      className={`mt-1 text-xs sm:text-sm text-mocha leading-relaxed max-w-sm transition-all duration-700 ${
                        open ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 lg:max-h-0'
                      } overflow-hidden`}
                    >
                      {t.text}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
