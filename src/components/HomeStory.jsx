import React from 'react';
import { Users, Snowflake, UtensilsCrossed, Car, Zap, Droplets, ShieldCheck, Sparkles } from 'lucide-react';
import { venueData } from '../data/venueData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const icons = { Users, Snowflake, UtensilsCrossed, Car, Zap, Droplets, ShieldCheck, Sparkles };

export default function HomeStory() {
  return (
    <section className="py-20 lg:py-28 bg-[#350710] border-t border-[#D4AF37]/25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Meerpet, Hyderabad" title="A Venue Made for Celebrations">
          Fully air-conditioned wedding and banquet halls for 50 to 500 guests, with an in-house dining hall,
          decor team and uninterrupted power backup, all under one roof.
        </SectionHeader>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#D4AF37]/20 rounded-2xl overflow-hidden border border-[#D4AF37]/25">
          {venueData.highlights.map((item, i) => {
            const Icon = icons[item.icon] || Sparkles;
            return (
              <Reveal key={item.id} delay={i * 0.05} className="bg-[#3D0A14] hover:bg-[#4A0E1B] transition-colors duration-300 p-5 sm:p-6 group">
                <Icon className="w-5 h-5 text-amber-300 mb-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <dt className="font-cinzel text-sm font-bold text-latte leading-snug">{item.label}</dt>
                <dd className="mt-1 text-xs text-mocha leading-relaxed">{item.desc}</dd>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
