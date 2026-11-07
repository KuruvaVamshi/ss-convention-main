import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Utensils, CreditCard, Sparkles, Clock, Plus, AlertCircle, Phone } from 'lucide-react';
import { venueData } from '../data/venueData';
import { teluguTranslations } from '../data/teluguData';
import Reveal from '../components/Reveal';

const rules = [
  {
    icon: Utensils,
    badge: 'Hygiene standard',
    title: 'Food Consumption',
    teluguTitle: teluguTranslations.guidelines.foodTitle,
    en: 'Food prepared for celebrations is to be consumed strictly within the venue premises. Packing and carrying leftover food outside is strictly prohibited to comply with health, hygiene, and venue norms. Hosts and guests are kindly requested to cooperate with management.',
    te: teluguTranslations.guidelines.foodDesc,
  },
  {
    icon: CreditCard,
    badge: 'Mandatory term',
    title: 'Payment Settlement',
    teluguTitle: teluguTranslations.guidelines.paymentTitle,
    en: 'The full payment for the event must be settled strictly 2 days before the scheduled event date. This rule is strictly enforced by management with no exceptions entertained. Thank you for your cooperation.',
    te: teluguTranslations.guidelines.paymentDesc,
  },
  {
    icon: Sparkles,
    badge: 'In-house only',
    title: 'Decoration Exclusivity',
    teluguTitle: teluguTranslations.guidelines.decorTitle,
    en: 'Outside decoration vendors are strictly NOT allowed. All stage, mandap, floral, balloon, and lighting arrangements are managed exclusively by our verified in-house decor teams to ensure safety and preserve hall aesthetics.',
    te: teluguTranslations.guidelines.decorDesc,
  },
];

const slots = [
  {
    label: 'Daytime slot',
    title: 'Lunch Parties & Muhurthams',
    text: 'All lunch events, dining service and guest departures must be completed and vacated strictly by',
    time: '03:00 PM',
  },
  {
    label: 'Evening slot',
    title: 'Dinner Parties & Receptions',
    text: 'All evening receptions, dinner banquets and music programs must conclude and vacate strictly by',
    time: '11:00 PM',
  },
];

const faqs = [
  {
    q: 'Why are outside decorators not permitted at S.S Convention?',
    a: "Outside decorators often use nails, unverified tape, and excessive wiring that damage the hall's false ceilings, Italian marble floor, and wall paneling. Additionally, external vendors frequently fail to complete stage setup before auspicious muhurthams. Our verified in-house decor teams guarantee punctual completion, safety standards, and flawless aesthetics.",
  },
  {
    q: 'Why is takeaway / packing of catered food strictly prohibited?',
    a: 'In accordance with municipal health, sanitation, and banquet hygiene regulations, all food prepared for events must be served and consumed exclusively within the venue premises. Packing leftover food for outside transport poses health and spoilage hazards and is strictly against venue policy.',
  },
  {
    q: 'What is the payment clearance timeline for booking an event?',
    a: 'The complete event payment must be settled strictly two (2) days before the scheduled event date. This policy is strictly enforced by management with no exceptions entertained, ensuring all catering, decor, and operational staff are provisioned in advance.',
  },
  {
    q: 'What are the strict slot vacation timings for lunch and dinner?',
    a: 'Lunch slots must be vacated strictly by 03:00 PM. Dinner slots must be vacated strictly by 11:00 PM. These strict timings allow our housekeeping and maintenance teams to thoroughly sanitize the halls, reset the air conditioning, and prepare for the subsequent booking.',
  },
  {
    q: 'Is there power backup in case of electricity outage?',
    a: 'Yes. S.S Convention is equipped with heavy-duty commercial silent diesel generators providing 100% automatic power backup for central air conditioning, chandeliers, stage lighting, and sound systems.',
  },
  {
    q: 'What parking arrangements are provided for guests?',
    a: 'We have dedicated on-premises parking for four-wheelers and two-wheelers with security personnel and 24/7 CCTV surveillance monitoring.',
  },
];

export default function PoliciesPage({ lang }) {
  const [openFaq, setOpenFaq] = useState(0);
  const te = lang === 'te';

  return (
    <div className="bg-[#450B17] text-latte min-h-screen overflow-hidden selection:bg-[#C5A059] selection:text-[#0D0204]">
      {/* Header */}
      <section className="relative pt-36 pb-16 bg-gradient-to-b from-[#2E060F] to-[#450B17] border-b border-[#D4AF37]/30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-40 bg-amber-500/10 rounded-full blur-[110px] pointer-events-none" />
        <Reveal className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">Official Rules & Agreements</p>
          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-wide">Transparent Guidelines</h1>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
          <p className="mt-5 text-base sm:text-lg text-mocha leading-relaxed">
            Clear policies make for stress-free celebrations. Read the terms for catering, payments, stage decor and slot timings.
          </p>

        </Reveal>
      </section>

      {/* Core rules */}
      <section id="guidelines" className="py-20 sm:py-28 bg-[#3D0A14] border-b border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {rules.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={i * 0.1} className="h-full">
                <article className="group relative h-full rounded-2xl bg-[#450B17] border border-[#D4AF37]/30 hover:border-amber-400/70 p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(212,175,55,0.14)]">
                  <span className="absolute top-5 right-6 font-cinzel text-5xl font-bold text-amber-300/10 group-hover:text-amber-300/20 transition-colors">
                    0{i + 1}
                  </span>
                  <span className="w-12 h-12 rounded-xl bg-[#350710] border border-[#D4AF37]/40 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-amber-300" />
                  </span>
                  <p className="mt-5 text-[11px] tracking-[0.25em] uppercase text-amber-300">{r.badge}</p>
                  <h3 className="mt-1 font-cinzel text-xl font-bold">{te ? r.teluguTitle : r.title}</h3>
                  <p className="mt-4 text-mocha leading-relaxed">{te ? r.te : r.en}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Slot timings */}
      <section className="py-20 sm:py-28 bg-[#350710] border-b border-[#D4AF37]/25">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-12">
            <span className="inline-flex w-12 h-12 rounded-xl bg-[#450B17] border border-[#D4AF37]/40 items-center justify-center">
              <Clock className="w-6 h-6 text-amber-300" />
            </span>
            <h2 className="mt-4 font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">Slot Vacation Schedule</h2>
            {te && <p className="mt-2 text-sm text-amber-300">{teluguTranslations.guidelines.timingsTitle}</p>}
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#D4AF37]/25 rounded-2xl overflow-hidden border border-[#D4AF37]/25">
            {slots.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="bg-[#450B17] p-8 sm:p-10 h-full">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-amber-300">{s.label}</p>
                  <h3 className="mt-1 font-cinzel text-lg font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm text-mocha leading-relaxed">{s.text}</p>
                  <p className="mt-4 font-cinzel text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] to-[#C5A059]">
                    {s.time} <span className="text-base font-normal text-mocha">sharp</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-6 flex items-start gap-2.5 text-sm text-mocha leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-latte">Note to hosts:</strong> please plan rituals, cake cutting and banquet service to finish before these cut-off hours.
              {te && <span className="block mt-2 text-amber-200">{teluguTranslations.guidelines.timingsDesc}</span>}
            </span>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-[#450B17]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-12">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">Frequently Asked Questions</h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
          </Reveal>

          <div className="border-t border-[#D4AF37]/25">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="border-b border-[#D4AF37]/25">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  >
                    <span className="font-semibold text-base text-latte group-hover:text-amber-200 transition-colors leading-snug">{faq.q}</span>
                    <Plus className={`w-5 h-5 text-amber-300 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-8 text-mocha leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-center border-t border-[#D4AF37]/30">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">Need clarification on any policy?</h2>
          <p className="mt-4 text-mocha leading-relaxed">
            We are happy to explain every detail before you place your booking.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={`tel:${venueData.phones[0].raw}`} className="btn-gold">
              <Phone className="w-4 h-4" /> Speak to management
            </a>
            <Link to="/contact" className="btn-outline-gold">Go to booking studio</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
