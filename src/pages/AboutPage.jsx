import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Phone, Calendar } from 'lucide-react';
import { venueData } from '../data/venueData';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';

const pillars = [
  {
    title: 'Pillar-Free Grand Architecture',
    desc: 'Clear-span sightlines give every guest an unhindered view of the Kalyana Mandapam and stage rituals.',
  },
  {
    title: 'Separate Mandap & Dining Floors',
    desc: 'The dining floor is separate from the ceremonial hall, so the mandap stays sacred and free of cooking aromas.',
  },
  {
    title: '100% Power & Climate',
    desc: 'Silent generators and Daikin centralized cassette A/C keep a steady 22°C and zero blackouts.',
  },
  {
    title: 'In-House Artisanship',
    desc: 'Florists, carpenters and lighting engineers work in-house, so stages are handed over before the muhurtham.',
  },
];

const checklist = [
  'Three halls, flagship to boutique',
  '250+ seat banquet dining level',
  'Centralized cassette A/C',
  '2 air-conditioned bridal suites',
  'Passenger lift to all floors',
  '150+ car & bike parking, 24/7 CCTV',
];

const stats = [
  { to: 600, label: 'Max guests' },
  { to: 3, label: 'Halls' },
  { to: 250, suffix: '+', label: 'Dining seats' },
  { to: 150, suffix: '+', label: 'Parking spots' },
];

export default function AboutPage({ lang }) {
  return (
    <div className="bg-[#450B17] text-latte min-h-screen overflow-hidden selection:bg-[#C5A059] selection:text-[#0D0204]">
      <SEO
        title="About S.S. Convention | Premier Wedding Venue in Hyderabad"
        description="Learn about S.S. Convention in Meerpet, Hyderabad: a premier wedding and banquet destination engineered for grand traditions, pillar-free sightlines, and 50 to 600 guest celebrations."
        keywords="About S.S. Convention, Wedding Venue Hyderabad, Marriage Hall Meerpet History, Banquet Halls in Hyderabad, Best Function Halls Meerpet"
        canonical="/about"
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pt-32 pb-16 border-b border-[#D4AF37]/30">
        <img
          src="/assets/04_exterior_and_entrance/royal_palace_mahadwaram_doors.jpeg"
          alt="S.S. Convention Grand Mahadwaram Royal Palace Entrance in Meerpet Hyderabad"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#450B17] via-[#1C0409]/70 to-[#1C0409]/50" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-serif text-xs sm:text-sm tracking-[0.3em] text-amber-300 mb-4">
              || శ్రీ రస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
            </p>
            <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.1em] uppercase">
              {lang === 'te' ? 'మా గురించి | S.S. కన్వెన్షన్' : 'About S.S. Convention'}
            </h1>
            <p className="text-xs sm:text-sm font-cinzel text-amber-300/90 tracking-widest mt-2 uppercase">
              {lang === 'te' ? 'మీర్పేట్, హైదరాబాద్ లో ప్రీమియర్ కళ్యాణ వేదిక' : 'Premier Wedding & Banquet Destination · Meerpet, Hyderabad'}
            </p>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#C5A059] to-transparent" />
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-mocha leading-relaxed">
              {lang === 'te'
                ? 'హైదరాబాద్ మీర్‌పేట్‌లో వైభవమైన శుభకార్యాలు మరియు వేడుకలకు రాయల్ వేదిక. సంప్రదాయం మరియు ఆధునిక సదుపాయాల కలయిక.'
                : 'In Meerpet, Hyderabad, built on one commitment: every grand milestone deserves an unforgettable, royal setting.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-28 bg-[#3D0A14] border-b border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <div className="relative pb-10 pr-6 sm:pr-10">
              <div className="rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black group">
                <img
                  src="/assets/05_reception_and_lobby/lobby_buddha_water_fountain_feature.jpeg"
                  alt="Lobby Buddha water fountain at S.S Convention"
                  loading="lazy"
                  className="w-full h-[360px] sm:h-[460px] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-40 sm:w-52 aspect-[4/3] rounded-2xl overflow-hidden border-4 border-[#3D0A14] shadow-xl">
                <img
                  src="/assets/05_reception_and_lobby/lobby_backlit_wooden_signboard.jpeg"
                  alt="Backlit wooden signboard"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="mt-2 text-xs tracking-[0.2em] uppercase text-mocha">
              The foyer, blessing every guest on arrival
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">Our Philosophy</p>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide leading-snug">
              Where Sacred Traditions Meet Timeless Luxury
            </h2>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#C5A059] to-transparent" />

            <p className="mt-5 text-mocha leading-relaxed">
              Indian weddings and milestone ceremonies are sacred family legacies. Our venue in Raghavendra Nagar Colony,
              Jillelaguda (Meerpet) removes the usual pain points of function halls. Hall Vasishta seats up to 600 under
              double-tier golden chandeliers, while intimate Hall Koundinya suits birthdays and cradle ceremonies. Together
              the three halls fit celebrations of 50 to 600 guests.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-latte">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/spaces" className="btn-gold">Explore our halls</Link>
              <Link to="/contact" className="btn-outline-gold">Schedule a visit</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-[#2E060F] border-b border-[#D4AF37]/25">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="font-cinzel text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] to-[#C5A059] tabular-nums">
                <CountUp to={s.to} suffix={s.suffix} duration={s.to > 100 ? 2.2 : 1.4} />
              </div>
              <div className="mt-1 text-[11px] tracking-[0.25em] uppercase text-mocha">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 sm:py-28 bg-[#350710] border-b border-[#D4AF37]/25">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">Built for Grand Celebrations</h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
          </Reveal>

          <div className="divide-y divide-[#D4AF37]/20 border-y border-[#D4AF37]/20">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="group grid grid-cols-12 gap-4 items-baseline py-7 sm:py-9 transition-colors duration-300 hover:bg-[#3D0A14]/60 px-2 sm:px-4">
                  <span className="col-span-2 sm:col-span-1 font-cinzel text-2xl sm:text-3xl text-amber-300/70 group-hover:text-amber-300 transition-colors">
                    0{i + 1}
                  </span>
                  <h3 className="col-span-10 sm:col-span-4 font-cinzel text-lg sm:text-xl font-bold">{p.title}</h3>
                  <p className="col-span-12 sm:col-span-7 text-mocha leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-center">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">Ready to plan your event?</h2>
          <p className="mt-4 text-mocha leading-relaxed">
            Our team will guide you through a tour, verify muhurtham dates and set up a custom package.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold">
              <Calendar className="w-4 h-4" /> Book a walkthrough
            </Link>
            <a href={`tel:${venueData.phones[0].raw}`} className="btn-outline-gold">
              <Phone className="w-4 h-4 text-amber-300" /> {venueData.phones[0].display}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
