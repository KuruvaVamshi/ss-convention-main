import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PolicyFlipCards from '../components/PolicyFlipCards';
import { ShieldAlert, Clock, ChevronDown, AlertCircle } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function PoliciesPage({ lang, setLang }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "Why are outside decorators not permitted at S.S Convention?",
      a: "Outside decorators often use nails, unverified tape, and excessive wiring that damage the hall's false ceilings, Italian marble floor, and wall paneling. Additionally, external vendors frequently fail to complete stage setup before auspicious muhurthams. Our verified in-house decor teams guarantee punctual completion, safety standards, and flawless aesthetics."
    },
    {
      q: "Why is takeaway / packing of catered food strictly prohibited?",
      a: "In accordance with municipal health, sanitation, and banquet hygiene regulations, all food prepared for events must be served and consumed exclusively within the venue premises. Packing leftover food for outside transport poses health and spoilage hazards and is strictly against venue policy."
    },
    {
      q: "What is the payment clearance timeline for booking an event?",
      a: "The complete event payment must be settled strictly two (2) days before the scheduled event date. This policy is strictly enforced by management with no exceptions entertained, ensuring all catering, decor, and operational staff are provisioned in advance."
    },
    {
      q: "What are the strict slot vacation timings for lunch and dinner?",
      a: "Lunch slots must be vacated strictly by 03:00 PM. Dinner slots must be vacated strictly by 11:00 PM. These strict timings allow our housekeeping and maintenance teams to thoroughly sanitize the halls, reset the air conditioning, and prepare for the subsequent booking."
    },
    {
      q: "Is there power backup in case of electricity outage?",
      a: "Yes. S.S Convention is equipped with heavy-duty commercial silent diesel generators providing 100% automatic power backup for central air conditioning, chandeliers, stage lighting, and sound systems."
    },
    {
      q: "What parking arrangements are provided for guests?",
      a: "We have dedicated on-premises parking for four-wheelers and two-wheelers with security personnel and 24/7 CCTV surveillance monitoring."
    }
  ];

  return (
    <div className="bg-[#450B17] text-white min-h-screen pt-24">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-[#450B17] via-[#5F1524] to-[#450B17] border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Rules & Agreements</span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.12em] text-white uppercase mb-4 drop-shadow">
            TRANSPARENT GUIDELINES
          </h1>
          <p className="text-amber-100/80 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            Crystal-clear policies are the foundation of stress-free celebrations. Review our official English and Telugu guidelines (*ముఖ్యగమనిక*, *ఆహార నిబంధనలు*) regarding catering, payments, stage decor, and party slot timings.
          </p>
        </div>
      </section>

      {/* 3D Flip Cards Section */}
      <PolicyFlipCards lang={lang} setLang={setLang} />

      {/* Official Timings Detailed Banner */}
      <section className="py-24 bg-[#3D0A14] border-t border-b border-[#D4AF37]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-10 rounded-[32px] bg-[#350710] border-2 border-[#D4AF37]/45 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#4D0D19] border border-[#D4AF37]/40 flex items-center justify-center text-amber-300">
                <Clock className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="font-cinzel text-2xl font-bold text-white">
                  Strict Slot Vacation Schedule
                </h3>
                <span className="text-xs font-bold text-amber-300">
                  ఈవెంట్ ముగింపు సమయాలు (దయచేసి గమనించగలరు)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-[24px] bg-[#4D0D19] border border-[#D4AF37]/35 shadow-md">
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#3A0813] text-amber-300 border border-[#D4AF37]/40 uppercase tracking-wider block w-fit mb-2 shadow-sm">
                  Daytime Slot
                </span>
                <h4 className="font-cinzel text-lg font-bold text-white mb-1">
                  Lunch Parties & Muhurthams
                </h4>
                <p className="text-xs text-amber-100/80 mb-3 leading-relaxed font-normal">
                  All lunch events, dining service, and guest departures must be completed and vacated strictly by:
                </p>
                <div className="text-3xl font-extrabold text-amber-400 font-cinzel">
                  03:00 PM Sharp
                </div>
              </div>

              <div className="p-6 rounded-[24px] bg-[#4D0D19] border border-[#D4AF37]/35 shadow-md">
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#3A0813] text-amber-300 border border-[#D4AF37]/40 uppercase tracking-wider block w-fit mb-2 shadow-sm">
                  Evening Slot
                </span>
                <h4 className="font-cinzel text-lg font-bold text-white mb-1">
                  Dinner Parties & Receptions
                </h4>
                <p className="text-xs text-amber-100/80 mb-3 leading-relaxed font-normal">
                  All evening receptions, dinner banquets, and music programs must conclude and vacate strictly by:
                </p>
                <div className="text-3xl font-extrabold text-amber-400 font-cinzel">
                  11:00 PM Sharp
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#2E070F] border border-amber-500/40 text-xs text-amber-100/90 flex items-start gap-2.5 font-normal">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-amber-300 font-bold">Note to Hosts:</strong> Please schedule rituals, cake cuttings, and banquet service with your guests to comfortably conclude prior to these cut-off hours. Management deeply appreciates your cooperation.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 bg-[#450B17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal">
              Clear answers to help you plan your event with complete confidence.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-[20px] border-2 border-[#D4AF37]/35 bg-[#3A0813] overflow-hidden transition-all shadow-lg"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#4D0D19] transition-colors"
                >
                  <span className="font-bold text-sm text-white leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180 text-amber-300' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs text-amber-100/90 leading-relaxed border-t border-[#D4AF37]/25 bg-[#2E070F] font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Clarification CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-white text-center border-t border-[#D4AF37]/30 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-2 tracking-wide">
            Need Clarification on Any Policy?
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-sm max-w-lg mx-auto mb-8 font-light">
            We are always here to assist you and explain every detail before you place your booking.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${venueData.phones[0].raw}`}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Speak to Management (+91 89857 00044)
            </a>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full border border-amber-300/60 text-white hover:bg-white/10 font-cinzel font-bold text-xs uppercase tracking-wider transition-all"
            >
              Go to Booking Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
