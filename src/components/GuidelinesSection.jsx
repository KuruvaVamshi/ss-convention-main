import React from 'react';
import { ShieldAlert, Clock, CreditCard, Sparkles, Utensils, Globe } from 'lucide-react';
import { venueData } from '../data/venueData';
import { teluguTranslations } from '../data/teluguData';

export default function GuidelinesSection({ lang, setLang }) {
  const isTelugu = lang === 'te';

  const policies = [
    {
      icon: Utensils,
      title: isTelugu ? teluguTranslations.guidelines.foodTitle : "Food & Dining Guidelines",
      teluguNotice: "ఆహార నిబంధనలు",
      desc: isTelugu
        ? teluguTranslations.guidelines.foodDesc
        : "Food prepared for celebrations is to be consumed strictly within the venue premises. Packing and carrying leftover food outside is strictly prohibited to comply with health, hygiene, and venue norms. Hosts and guests are kindly requested to cooperate.",
      badge: "Hygiene & Quality"
    },
    {
      icon: CreditCard,
      title: isTelugu ? teluguTranslations.guidelines.paymentTitle : "Important Payment Policy",
      teluguNotice: "ముఖ్యగమనిక - పేమెంట్ నిబంధనలు",
      desc: isTelugu
        ? teluguTranslations.guidelines.paymentDesc
        : "The full payment for the event must be settled strictly 2 days before the scheduled event date. Note: This rule is strictly enforced by management with no exceptions entertained. Thank you for your cooperation.",
      badge: "Mandatory Term"
    },
    {
      icon: Sparkles,
      title: isTelugu ? teluguTranslations.guidelines.decorTitle : "Decoration Policy",
      teluguNotice: "డెకరేషన్ నిబంధన",
      desc: isTelugu
        ? teluguTranslations.guidelines.decorDesc
        : "Outside decoration vendors are strictly NOT allowed. All stage, mandap, floral, balloon, and lighting arrangements are managed exclusively by our verified in-house decor teams to ensure safety and preserve hall aesthetics.",
      badge: "In-House Only"
    },
    {
      icon: Clock,
      title: isTelugu ? teluguTranslations.guidelines.timingsTitle : "Slot Vacation Timings",
      teluguNotice: "ఈవెంట్ సమయాలు",
      desc: isTelugu
        ? teluguTranslations.guidelines.timingsDesc
        : "Lunch party slots must be vacated strictly by 03:00 PM. Dinner party slots must be vacated strictly by 11:00 PM to facilitate sanitization and setup for subsequent bookings.",
      badge: "Strictly Enforced"
    }
  ];

  return (
    <section id="guidelines" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Official Venue Rules</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-stone-100 tracking-tight mb-4">
            {isTelugu ? teluguTranslations.guidelines.title : "Transparent Policies & Guidelines"}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
            For seamless coordination and high hospitality standards, we adhere strictly to the policies printed on our official agreements.
          </p>

          {/* Quick Language Switcher */}
          <button
            onClick={() => setLang(isTelugu ? 'en' : 'te')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-obsidian-900 border border-gold-500/40 text-gold-300 text-xs font-semibold hover:bg-gold-500/10 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Switch to {isTelugu ? 'English Text' : 'తెలుగు వివరణ (Telugu)'}</span>
          </button>
        </div>

        {/* 4 Policy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {policies.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-gold-500/25 bg-obsidian-900/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-800 text-gold-300 border border-stone-700">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-100 mb-2">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-800 text-[11px] text-stone-400">
                  Ref: SS Convention Official Booking Terms
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

