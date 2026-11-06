import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Building, UtensilsCrossed, Heart } from 'lucide-react';

/**
 * PHASE 4 – ABOUT S.S. CONVENTION
 * Premium Editorial Storytelling Section
 * 
 * Aesthetic: Warm Ivory luxury editorial layout, deep burgundy headings, champagne-gold accents.
 * Composition: Asymmetric two-column composition with two authentic venue photographs.
 * Animations: Exact timing and easing as specified (Mask reveal, line-by-line reveal, expanding gold rule, desktop parallax).
 */
export default function AboutStorytellingSection({ lang = 'en', onOpenLightbox }) {
  const shouldReduceMotion = useReducedMotion();

  // Content configuration with verified venue facts
  const content = {
    eyebrow: lang === 'te' 
      ? 'ఎస్.ఎస్ కన్వెన్షన్ కథనం' 
      : 'THE STORY OF S.S. CONVENTION',
    headingLine1: lang === 'te' 
      ? 'ప్రతి శుభకార్యం ఒక' 
      : 'A Place Where Every Celebration',
    headingLine2: lang === 'te' 
      ? 'శాశ్వత మధుర జ్ఞాపకంగా మారుతుంది.' 
      : 'Becomes a Timeless Memory.',
    description: lang === 'te'
      ? 'హైదరాబాద్ మీర్‌పేట్‌లో వైభవమైన శుభకార్యాలకు సంపూర్ణ చిరునామా ఎస్.ఎస్ కన్వెన్షన్. స్తంభాలు లేని విశాలమైన కళ్యాణ మండపాలు, విందు వాసనలు కలవకుండా ప్రత్యేకంగా నిర్మించిన బాంక్వెట్ డైనింగ్ ఫ్లోర్, మరియు నిరంతర సెంట్రల్ ఎయిర్ కండిషనింగ్‌తో మీ వివాహాలు, రిసెప్షన్లు మరియు కుటుంబ వేడుకలను రాచరిక వైభవంతో నిర్వహిస్తాము.'
      : 'Nestled strategically in Meerpet, Hyderabad, S.S. Convention was designed with a singular devotion: turning sacred muhurthams and family milestones into grand royal memories. Built with pillarless architectural sightlines, our three specialized celebration halls allow every guest an unhindered view of the stage, while our dedicated separate dining level ensures pure ceremonial sanctity with zero food aroma in the sacred mandap.',
    ctaText: lang === 'te' 
      ? 'మా పూర్తి చరిత్ర & వేదికలను చూడండి' 
      : 'EXPLORE OUR STORY & SPACES',
    image1Title: lang === 'te' ? 'హాల్ వశిష్ట – ప్రధాన కళ్యాణ మండపం' : 'Hall Vasishta – Grand Kalyana Mandapam Interior',
    image2Title: lang === 'te' ? 'లాబీ బుద్ధ వాటర్ ఫౌంటైన్' : 'Lobby Buddha Fountain Welcoming Foyer'
  };

  const easeLuxury = [0.22, 1, 0.36, 1];

  return (
    <section 
      id="about-story"
      aria-label="About S.S. Convention"
      className="relative py-24 sm:py-32 bg-[#FAF6F0] text-[#1C0409] overflow-hidden selection:bg-[#C5A059] selection:text-[#0D0204]"
    >
      {/* Subtle Luxury Architectural Watermark / Ambient Texture */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-200/30 to-transparent rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-amber-200/25 to-transparent rounded-full blur-[100px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ANIMATION A: Section Container Entrance on Viewport */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.75, ease: easeLuxury }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >

          {/* ========================================================
              LEFT COLUMN: EDITORIAL TYPOGRAPHY & NARRATIVE
              ======================================================== */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-6">
            
            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C0409]/6 border border-[#C5A059]/40 mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span className="font-cinzel text-[10.5px] sm:text-xs font-bold tracking-[0.24em] text-[#8A6B32] uppercase">
                {content.eyebrow}
              </span>
            </div>

            {/* ANIMATION B: Heading Line-by-Line Reveal */}
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C0409] tracking-tight leading-[1.18] sm:leading-[1.2] mb-5">
              {/* Line 1 inside overflow-hidden */}
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.85, ease: easeLuxury }}
                >
                  {content.headingLine1}
                </motion.span>
              </span>

              {/* Line 2 inside overflow-hidden */}
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block text-[#5F1524]"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    duration: shouldReduceMotion ? 0 : 0.85, 
                    delay: shouldReduceMotion ? 0 : 0.12, 
                    ease: easeLuxury 
                  }}
                >
                  {content.headingLine2}
                </motion.span>
              </span>
            </h2>

            {/* ANIMATION E: Gold Decorative Expanding Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '72px' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ 
                duration: shouldReduceMotion ? 0 : 0.7, 
                delay: shouldReduceMotion ? 0 : 0.3, 
                ease: easeLuxury 
              }}
              className="h-[2px] bg-gradient-to-r from-[#C5A059] to-[#EED9A6] mb-6 sm:mb-8"
              aria-hidden="true"
            />

            {/* Concise Editorial Narrative */}
            <p className="font-sans text-sm sm:text-base text-[#4A3B32] leading-relaxed font-normal mb-8 max-w-xl">
              {content.description}
            </p>

            {/* Verified Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 w-full mb-8 pt-4 border-t border-[#C5A059]/25">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1C0409]/5 border border-[#C5A059]/35 flex items-center justify-center flex-shrink-0 text-[#8A6B32] mt-0.5">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[#1C0409] tracking-wider uppercase">
                    Pillarless Sightlines
                  </h4>
                  <p className="text-[11px] text-[#6B5A4E] leading-snug">
                    Unobstructed view of the wedding mandap
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1C0409]/5 border border-[#C5A059]/35 flex items-center justify-center flex-shrink-0 text-[#8A6B32] mt-0.5">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[#1C0409] tracking-wider uppercase">
                    Isolated Dining Level
                  </h4>
                  <p className="text-[11px] text-[#6B5A4E] leading-snug">
                    250+ seating with zero food aroma in mandap
                  </p>
                </div>
              </div>
            </div>

            {/* ANIMATION & INTERACTION: Refined Text-Style CTA Link */}
            <Link
              to="/about"
              className="group relative inline-flex items-center gap-2.5 font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-[#1C0409] uppercase transition-colors duration-300 hover:text-[#7A1F31] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              <span>{content.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#8A6B32] transition-transform duration-300 ease-out group-hover:translate-x-[5px]" />
              
              {/* Expanding Gold Underline on Hover */}
              <span 
                className="absolute left-0 bottom-[-4px] h-[1.5px] w-0 bg-gradient-to-r from-[#C5A059] to-[#8A6B32] transition-all duration-300 ease-out group-hover:w-full"
                aria-hidden="true" 
              />
            </Link>

          </div>

          {/* ========================================================
              RIGHT COLUMN: ASYMMETRIC OVERLAPPING EDITORIAL PHOTOGRAPHY
              ======================================================== */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* ANIMATION C: MAIN IMAGE MASK REVEAL */}
              <motion.div
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1.0 : 1.06, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, scale: 1.0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: shouldReduceMotion ? 0 : 1.0, ease: easeLuxury }}
                onClick={() => onOpenLightbox?.('/assets/06_main_hall_seating/main_hall_aisle_view_towards_stage.jpeg', content.image1Title)}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(28,4,9,0.18)] border border-[#C5A059]/40 bg-[#1C0409] aspect-[4/3] sm:aspect-[16/11] cursor-pointer group"
              >
                <img
                  src="/assets/06_main_hall_seating/main_hall_aisle_view_towards_stage.jpeg"
                  alt={content.image1Title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle Editorial Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#EED9A6] tracking-widest uppercase font-cinzel block mb-1">
                    Flagship Interior Architecture
                  </span>
                  <p className="font-cinzel text-xs sm:text-sm font-semibold text-white drop-shadow">
                    Hall Vasishta · Double-tier Chandeliers & 70-ft Bridal Walk
                  </p>
                </div>
              </motion.div>

              {/* ANIMATION D & F: SECOND SUPPORTING IMAGE (Overlapping with Parallax) */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: shouldReduceMotion ? 0 : 0.75, 
                  delay: shouldReduceMotion ? 0 : 0.25, 
                  ease: easeLuxury 
                }}
                onClick={() => onOpenLightbox?.('/assets/05_reception_and_lobby/lobby_buddha_water_fountain_feature.jpeg', content.image2Title)}
                className="hidden sm:block absolute -bottom-8 -left-6 sm:-bottom-10 sm:-left-8 w-44 sm:w-56 md:w-64 aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(28,4,9,0.28)] border-2 border-[#FAF6F0] ring-1 ring-[#C5A059]/50 bg-[#1C0409] z-20 cursor-pointer group"
                style={{
                  transform: shouldReduceMotion ? 'none' : 'translateY(0px)',
                  transition: 'transform 0.4s ease-out'
                }}
              >
                <img
                  src="/assets/05_reception_and_lobby/lobby_buddha_water_fountain_feature.jpeg"
                  alt={content.image2Title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 sm:left-3.5 sm:right-3.5">
                  <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider block font-cinzel">
                    Auspicious Welcoming Foyer
                  </span>
                  <span className="text-[10px] text-white/90 font-medium block truncate">
                    Buddha Water Fountain
                  </span>
                </div>
              </motion.div>

              {/* Subtle Gold Stamp / Luxury Emblem Badge */}
              <div 
                className="hidden md:flex absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#1C0409] border border-[#C5A059] shadow-xl items-center justify-center p-2 text-center text-[#EED9A6] z-20 pointer-events-none select-none"
                aria-hidden="true"
              >
                <div className="w-full h-full rounded-full border border-[#C5A059]/40 flex flex-col items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] mb-0.5" />
                  <span className="font-cinzel text-[7.5px] font-bold tracking-widest uppercase">
                    ESTD
                  </span>
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

