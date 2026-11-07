import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const tiles = [
  { to: '/gallery', title: 'Decor & Themes', text: 'Stages, mandaps and lighting for every occasion.', img: '/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg' },
  { to: '/menus', title: 'Menus', text: 'Veg and non-veg feasts from 100 to 250 guests.', img: '/assets/03_food_and_catering_menus/menu_03_premium_veg_200pax.jpeg' },
  { to: '/facilities', title: 'Facilities', text: 'Dining hall, parking, power backup and more.', img: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg' },
  { to: '/gallery', title: 'Gallery', text: 'Real photos from real celebrations.', img: '/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_wide_stage.jpeg' },
];

export default function ExperienceStrip() {
  return (
    <section className="py-20 lg:py-28 bg-[#2E060F] border-t border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Plan Your Event" title="Everything You Need" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {tiles.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08}>
              <Link to={t.to} className="group relative block aspect-[3/4] rounded-2xl overflow-hidden border border-[#D4AF37]/30 hover:border-amber-400/80 transition-colors duration-500">
                <img src={t.img} alt={t.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C0409] via-[#1C0409]/40 to-transparent" />
                <div className="absolute bottom-0 p-4 sm:p-5">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-latte">{t.title}</h3>
                  <p className="mt-1 text-xs text-mocha leading-relaxed">{t.text}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
