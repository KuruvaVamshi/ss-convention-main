import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  MapPin,
  CheckCircle2,
  Phone,
  Calendar,
  Building,
  Heart,
  ShieldCheck,
  Award,
  Users
} from 'lucide-react';
import { venueData } from '../data/venueData';

export default function AboutPage({ lang }) {
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    {
      title: "Pillar-Free Grand Architecture",
      desc: "Engineered with unobstructed clear-span sightlines so every single wedding guest has an unhindered direct view of the sacred Kalyana Mandapam and stage rituals.",
      icon: Building
    },
    {
      title: "Separate Mandap & Dining Floors",
      desc: "Our dedicated dining floor is architecturally separated from the ceremonial hall, ensuring pure Vedic sanctity and zero culinary aroma in the marriage mandap.",
      icon: Sparkles
    },
    {
      title: "100% Guaranteed Power & Climate",
      desc: "Heavy-duty commercial silent generators paired with Daikin centralized cassette air-conditioning guarantee continuous 22°C comfort and zero blackouts.",
      icon: ShieldCheck
    },
    {
      title: "Bespoke In-House Artisanship",
      desc: "Master florists, carpenters, and lighting engineers manage every detail in-house, ensuring punctual stage handovers before auspicious muhurthams.",
      icon: Award
    }
  ];

  const easeLuxury = [0.22, 1, 0.36, 1];

  return (
    <div className="bg-[#450B17] text-white min-h-screen pt-24 overflow-hidden selection:bg-[#C5A059] selection:text-[#0D0204]">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-[#350710] to-[#450B17] border-b border-[#D4AF37]/30 text-white relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-amber-500/10 rounded-full blur-[110px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeLuxury }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <span className="font-serif text-xs sm:text-sm tracking-[0.35em] text-amber-300 uppercase block mb-2 drop-shadow">
            || శ్రీ రస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
          </span>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-4 shadow-md backdrop-blur-sm">
            <Heart className="w-3.5 h-3.5 text-amber-400" />
            <span>Heritage & Hospitality</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.1em] sm:tracking-[0.14em] text-white uppercase mb-4 drop-shadow">
            {lang === 'te' ? 'మా గురించి – ఎస్.ఎస్ కన్వెన్షన్ హాల్' : 'ABOUT S.S CONVENTION'}
          </h1>
          <p className="text-amber-100/85 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            {lang === 'te'
              ? 'హైదరాబాద్ మీర్‌పేట్‌లో వైభవమైన శుభకార్యాలు మరియు వేడుకలకు రాయల్ వేదిక. సంప్రదాయం మరియు ఆధునిక సదుపాయాల కలయిక.'
              : 'Located strategically in Meerpet, Hyderabad, S.S Convention A/C was founded on a singular commitment: every grand milestone deserves an unforgettable, royal setting.'}
          </p>
        </motion.div>
      </section>

      {/* Narrative Section with Authentic Photos */}
      <section className="py-20 sm:py-24 bg-[#3D0A14] border-b border-[#D4AF37]/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column with Staggered Entrance */}
            <motion.div 
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: easeLuxury }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/45 shadow-2xl group bg-black">
                <img
                  src="/assets/05_reception_and_lobby/lobby_buddha_water_fountain_feature.jpeg"
                  alt="Lobby Buddha Water Fountain at SS Convention"
                  className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 shadow-xl">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-0.5 font-cinzel">
                    Auspicious Foyer & Reception
                  </span>
                  <p className="text-xs text-amber-100/90 font-medium">
                    Serene stone Buddha waterfall fountain blessing every guest upon entering.
                  </p>
                </div>
              </div>

              {/* Backlit Signboard Feature */}
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
                className="p-5 rounded-2xl bg-[#4A0E17] border border-[#D4AF37]/35 flex items-center gap-4 shadow-xl transition-all"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#D4AF37]/40 flex-shrink-0 bg-black">
                  <img
                    src="/assets/05_reception_and_lobby/lobby_backlit_wooden_signboard.jpeg"
                    alt="Backlit Wooden Signboard"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                    "We Make Your Celebrations Unforgettable"
                  </h4>
                  <p className="text-[11px] text-amber-200/80 mt-1">
                    Raghavendra Nagar Colony, Jillelaguda, Meerpet, Hyderabad
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Narrative Column with Smooth Fade-Up */}
            <motion.div 
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: easeLuxury }}
              className="lg:col-span-6 space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-2 font-cinzel">
                  Our Founding Philosophy
                </span>
                <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide leading-snug">
                  Where Sacred Traditions Meet Timeless Luxury
                </h2>
              </div>

              <p className="text-amber-100/85 text-xs sm:text-sm leading-relaxed font-normal">
                At S.S Convention A/C, we understand that Indian weddings and milestone ceremonies are not merely events—they are sacred family legacies. Located conveniently in Raghavendra Nagar Colony, Jillelaguda (Meerpet), our venue was architected to eliminate the common pain points of traditional function halls.
              </p>

              <p className="text-amber-100/85 text-xs sm:text-sm leading-relaxed font-normal">
                From our flagship <strong>Hall Vasishta</strong> (accommodating up to 600 seated guests with double-tier golden crystal chandeliers) to our intimate <strong>Hall Koundinya</strong> with designer wood-slat acoustic ceilings for birthdays and cradle ceremonies, our three named halls adapt effortlessly to celebrations of 50 to 500+ guests.
              </p>

              {/* Checklist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Dual Halls: Flagship & Boutique Spaces",
                  "Dedicated 250+ Banquet Dining Level",
                  "Centralized Cassette Air Conditioning",
                  "2 Luxury Air-Conditioned Bridal Suites",
                  "High-Speed Passenger Lift to All Floors",
                  "150+ Car & Bike Parking with 24/7 CCTV"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-amber-100/90 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  to="/spaces"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                >
                  Explore Our Halls & Specs
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-full border border-amber-400/60 text-amber-200 hover:bg-white/10 font-cinzel font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Schedule an In-Person Visit
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Architectural Pillars with Staggered Motion */}
      <section className="py-20 bg-[#350710] border-b border-[#D4AF37]/30 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeLuxury }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide mb-3">
              Built Specifically for Grand Celebrations
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal">
              Every square foot of S.S Convention is purpose-built to deliver an unmatched celebratory experience for both hosts and guests.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {pillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.7, ease: easeLuxury }
                    }
                  }}
                  whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
                  className="p-6 rounded-[28px] bg-[#450B17] border-2 border-[#D4AF37]/35 shadow-xl hover:border-amber-400 hover:shadow-[0_12px_30px_rgba(212,175,55,0.22)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#350710] border border-[#D4AF37]/40 flex items-center justify-center text-amber-300 mb-4 shadow-md">
                      <IconComp className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="font-cinzel text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-amber-100/80 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Quick Inquiries CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-white text-center border-t border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: easeLuxury }}
          className="max-w-4xl mx-auto px-4 relative z-10"
        >
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-3 tracking-wide">
            Ready to Plan Your Auspicious Event?
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-sm max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Our management team is happy to guide you through an in-person tour, verify muhurtham dates, and configure custom packages.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#3D0A14]" />
              <span>Book Venue Walkthrough & Check Dates</span>
            </Link>
            <a
              href={`tel:${venueData.phones[0].raw}`}
              className="px-8 py-3.5 rounded-full border border-amber-300/60 text-white hover:bg-white/10 font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call +91 89857 00044</span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
