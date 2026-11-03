import React from 'react';
import { Users, Snowflake, UtensilsCrossed, Car, Zap, Droplets, ShieldCheck, Sparkles } from 'lucide-react';
import { venueData } from '../data/venueData';

const iconMap = {
  Users,
  Snowflake,
  UtensilsCrossed,
  Car,
  Zap,
  Droplets,
  ShieldCheck,
  Sparkles
};

export default function QuickProofBar({ lang }) {
  return (
    <section className="py-12 bg-[#350710] border-t border-b border-[#D4AF37]/35 relative z-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold text-amber-300 tracking-[0.25em] uppercase">
            {lang === 'te' ? 'ప్రీమియం సదుపాయాలు' : 'PREMIER VENUE AMENITIES'}
          </span>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1 drop-shadow">
            {lang === 'te' ? 'మీ వేడుకకు సంపూర్ణ వసతులు' : 'Engineered for Flawless Celebrations'}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {venueData.highlights.map((item) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#450B17] border-2 border-[#D4AF37]/35 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-[#24050B] border border-[#D4AF37]/40 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-[#3D0A14] transition-all mb-2 shadow-sm">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight mb-0.5">
                  {item.label}
                </h4>
                <p className="text-[10px] sm:text-xs text-amber-100/75 font-normal leading-tight">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
