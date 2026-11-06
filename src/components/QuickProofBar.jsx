import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18, scale: shouldReduceMotion ? 1 : 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="py-14 sm:py-16 bg-[#350710] border-t border-b border-[#D4AF37]/35 relative z-20 text-white overflow-hidden">
      {/* Background ambient royal glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 border border-[#D4AF37]/40 mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[10px] font-bold text-amber-300 tracking-[0.25em] uppercase font-cinzel">
              {lang === 'te' ? 'ప్రీమియం సదుపాయాలు' : 'PREMIER VENUE AMENITIES'}
            </span>
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow">
            {lang === 'te' ? 'మీ వేడుకకు సంపూర్ణ వసతులు' : 'Engineered for Flawless Celebrations'}
          </h3>
        </motion.div>

        {/* Staggered Animated Grid of 8 Amenity Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4"
        >
          {venueData.highlights.map((item) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 380, damping: 25 }}
                className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-gradient-to-b from-[#450B17] to-[#34070F] border border-[#D4AF37]/35 hover:border-amber-400 hover:shadow-[0_8px_24px_rgba(212,175,55,0.22)] transition-colors duration-300 group shadow-md cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-[#24050B] border border-[#D4AF37]/40 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-amber-400 group-hover:to-amber-300 group-hover:text-[#3D0A14] transition-all duration-300 mb-2.5 shadow-sm">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white leading-tight mb-1 font-cinzel">
                  {item.label}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-amber-100/75 font-normal leading-tight">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
