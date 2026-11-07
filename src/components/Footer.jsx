import React from 'react';
import { Link } from 'react-router-dom';
import { venueData } from '../data/venueData';
import { MapPin, Phone, Heart, CalendarCheck, MessageSquare, ArrowUp, Clock } from 'lucide-react';

const pages = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/spaces', 'Halls & Spaces'],
  ['/facilities', 'Facilities'],
  ['/gallery', 'Gallery'],
  ['/menus', 'Dining & Menus'],
  ['/policies', 'Policies'],
  ['/contact', 'Contact'],
];

const halls = [
  ['/halls/hall-vasishta', 'Hall Vasishta', '300–600'],
  ['/halls/hall-agasthya', 'Hall Agasthya', '200–350'],
  ['/halls/hall-koundinya', 'Hall Koundinya', '100–200'],
  ['/halls/dining-hall', 'Banquet Dining', '250+ seats'],
];

export default function Footer() {
  return (
    <footer className="relative text-latte">
      {/* Invitation band over a venue photo */}
      <div className="relative overflow-hidden border-t border-[#C5A059]/30">
        <img
          src="/assets/04_exterior_and_entrance/royal_palace_mahadwaram_doors.jpeg"
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140205]/85 via-[#140205]/75 to-[#140205]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-amber-300 font-semibold">Your celebration awaits</p>
          <h2 className="mt-4 font-cinzel text-3xl sm:text-5xl font-bold tracking-wide leading-tight">
            Let&apos;s create your perfect day
          </h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold">
              <CalendarCheck className="w-4 h-4" /> Book a visit
            </Link>
            <a
              href={`https://wa.me/${venueData.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold backdrop-blur-md bg-black/30"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp us
            </a>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-[#140205]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          {/* Brand */}
          <div className="flex flex-col items-center text-center pb-10">
            <span className="w-14 h-14 rounded-full border border-[#C5A059]/50 flex items-center justify-center bg-black/40">
              <Heart className="w-6 h-6 text-amber-300 fill-[#C5A059]/30" />
            </span>
            <p className="mt-4 font-cinzel text-2xl font-bold tracking-[0.16em]">S.S CONVENTION</p>
            <p className="mt-1 text-sm text-mocha">Wedding & banquet halls · Meerpet, Hyderabad</p>
          </div>

          {/* Page links */}
          <nav aria-label="Pages" className="py-6 border-y border-[#C5A059]/20">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              {pages.map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-mocha hover:text-amber-300 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Halls */}
          <ul aria-label="Our halls" className="py-8 flex flex-wrap items-center justify-center gap-3">
            {halls.map(([to, name, size]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#C5A059]/30 hover:border-amber-400/70 hover:bg-[#2A0610] transition-colors"
                >
                  <span className="text-sm text-latte group-hover:text-amber-300 transition-colors">{name}</span>
                  <span className="text-xs text-mocha">{size}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C5A059]/20 rounded-2xl overflow-hidden border border-[#C5A059]/20">
            <div className="bg-[#140205] p-6 text-center">
              <MapPin className="w-5 h-5 text-amber-300 mx-auto" />
              <p className="mt-3 text-xs tracking-[0.25em] uppercase text-amber-300">Address</p>
              <p className="mt-2 text-sm text-mocha leading-relaxed">
                {venueData.address.line1}, {venueData.address.locality}, {venueData.address.city} – {venueData.address.pincode}
              </p>
            </div>
            <div className="bg-[#140205] p-6 text-center">
              <Phone className="w-5 h-5 text-amber-300 mx-auto" />
              <p className="mt-3 text-xs tracking-[0.25em] uppercase text-amber-300">Call</p>
              <p className="mt-2 text-sm space-y-1">
                {venueData.phones.map((p) => (
                  <a key={p.raw} href={`tel:${p.raw}`} className="block font-semibold text-latte hover:text-amber-300 transition-colors">
                    {p.display}
                  </a>
                ))}
              </p>
            </div>
            <div className="bg-[#140205] p-6 text-center">
              <Clock className="w-5 h-5 text-amber-300 mx-auto" />
              <p className="mt-3 text-xs tracking-[0.25em] uppercase text-amber-300">Slot timings</p>
              <p className="mt-2 text-sm text-mocha leading-relaxed">
                Lunch slots end 3:00 PM<br />Dinner slots end 11:00 PM
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-mocha">
            <p>© {new Date().getFullYear()} S.S Convention A/C. All rights reserved.</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors"
            >
              Back to top <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
