import React, { useState } from 'react';
import { Utensils, CreditCard, Sparkles, Clock, RotateCw } from 'lucide-react';
import { teluguTranslations } from '../data/teluguData';

export default function PolicyFlipCards({ lang, setLang }) {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const policies = [
    {
      id: "food",
      icon: Utensils,
      title: "Food Consumption Policy",
      teluguTitle: "ఆహార నిబంధనలు",
      badge: "Hygiene Standard",
      frontDesc: "Strict on-premise consumption guidelines regarding catered meals and packaging.",
      backEn: "Food prepared for celebrations is to be consumed strictly within the venue premises. Packing and carrying leftover food outside is strictly prohibited to comply with health, hygiene, and venue norms. Hosts and guests are kindly requested to cooperate with management.",
      backTe: teluguTranslations.guidelines.foodDesc
    },
    {
      id: "payment",
      icon: CreditCard,
      title: "Settlement Policy",
      teluguTitle: "ముఖ్యగమనిక - పేమెంట్ నిబంధనలు",
      badge: "Mandatory Term",
      frontDesc: "Strict payment clearance schedule required prior to celebration date.",
      backEn: "The full payment for the event must be settled strictly 2 days before the scheduled event date. Note: This rule is strictly enforced by management with no exceptions entertained. Thank you for your cooperation.",
      backTe: teluguTranslations.guidelines.paymentDesc
    },
    {
      id: "decor",
      icon: Sparkles,
      title: "Decoration Exclusivity",
      teluguTitle: "డెకరేషన్ నిబంధన",
      badge: "In-House Only",
      frontDesc: "Policies regarding stage artists, mandap craftsmen, and lighting vendors.",
      backEn: "Outside decoration vendors are strictly NOT allowed. All stage, mandap, floral, balloon, and lighting arrangements are managed exclusively by our verified in-house decor teams to ensure safety and preserve hall aesthetics.",
      backTe: teluguTranslations.guidelines.decorDesc
    },
    {
      id: "timings",
      icon: Clock,
      title: "Slot Vacation Hours",
      teluguTitle: "ఈవెంట్ సమయాలు",
      badge: "Strict Schedule",
      frontDesc: "Prescribed hours for day and evening event transitions.",
      backEn: "Lunch party slots must be vacated strictly by 03:00 PM. Dinner party slots must be vacated strictly by 11:00 PM to facilitate sanitization and setup for subsequent bookings.",
      backTe: teluguTranslations.guidelines.timingsDesc
    }
  ];

  return (
    <section id="guidelines" className="py-24 relative bg-[#450B17] overflow-hidden text-white border-t border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Venue Rules</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4">
            Transparent Guidelines & Policies
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed mb-6">
            To ensure every celebration runs smoothly without miscommunication, we maintain crystal-clear agreements. Click any card below to flip and read the exact English & Telugu terms.
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-200 bg-[#3A0813] px-4 py-2 rounded-full border border-[#D4AF37]/40 shadow-sm">
            <RotateCw className="w-3.5 h-3.5 animate-spin text-amber-400" style={{ animationDuration: '6s' }} />
            <span>Click or Tap Any Card to Flip & Read Official Telugu & English Terms</span>
          </div>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {policies.map((p) => {
            const isFlipped = !!flippedCards[p.id];
            const Icon = p.icon;

            return (
              <div
                key={p.id}
                onClick={() => toggleFlip(p.id)}
                className="relative h-96 cursor-pointer select-none group"
                style={{ perspective: '1200px' }}
              >
                {/* Flipping Container */}
                <div
                  className="w-full h-full relative transition-transform duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* FRONT CARD */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-[28px] p-6 flex flex-col justify-between border-2 border-[#D4AF37]/40 bg-[#3A0813] shadow-xl hover:border-amber-400 transition-colors"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#4D0D19] border border-[#D4AF37]/35 text-amber-200">
                          {p.badge}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-[#4D0D19] flex items-center justify-center text-amber-300 border border-[#D4AF37]/30">
                          <RotateCw className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-[#4D0D19] border border-[#D4AF37]/40 flex items-center justify-center text-amber-300 mb-4 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="font-cinzel text-lg font-bold text-white mb-1 leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-xs font-bold text-amber-300 mb-3">
                        {p.teluguTitle}
                      </p>

                      <p className="text-xs text-amber-100/80 font-normal leading-relaxed">
                        {p.frontDesc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-amber-300 font-bold">
                      <span>Click to Read Exact Policy</span>
                      <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* BACK CARD */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-[28px] p-6 flex flex-col justify-between border-2 border-[#D4AF37]/50 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#3A0813] text-white shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black/25 text-amber-200 border border-amber-300/40">
                          Official Term
                        </span>
                        <span className="text-[10px] font-bold text-amber-300">
                          Click to Flip Back
                        </span>
                      </div>

                      <h4 className="font-cinzel text-sm font-bold text-white mb-2">
                        {p.title}
                      </h4>

                      <div className="space-y-3 overflow-y-auto max-h-56 pr-1 text-left">
                        {/* English Term */}
                        <div className="p-2.5 rounded-xl bg-black/30 border border-white/15 text-[11px] leading-relaxed text-amber-100/90 font-light">
                          <strong className="text-amber-300 block mb-0.5 font-bold">
                            English:
                          </strong>
                          {p.backEn}
                        </div>

                        {/* Telugu Term */}
                        <div className="p-2.5 rounded-xl bg-black/40 border border-amber-300/30 text-[11px] leading-relaxed text-amber-200 font-normal">
                          <strong className="text-amber-300 block mb-0.5 font-bold">
                            తెలుగు (ముఖ్య నిబంధన):
                          </strong>
                          {p.backTe}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-amber-300/25 text-center text-[10px] text-amber-200/80">
                      S.S CONVENTION A/C MANAGEMENT
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
