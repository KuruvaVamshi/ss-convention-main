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
  ['/halls/hall-vasishta', 'Hall Vasishta', '300–600 guests'],
  ['/halls/hall-agasthya', 'Hall Agasthya', '200–350 guests'],
  ['/halls/hall-koundinya', 'Hall Koundinya', '100–200 guests'],
  ['/halls/dining-hall', 'Banquet Dining Hall', '250+ seats'],
];

const heading = 'font-cinzel text-xs font-bold text-amber-300 uppercase tracking-[0.25em] mb-5';
const link = 'text-mocha hover:text-amber-300 transition-colors';

export default function Footer() {
  return (
    <footer className="bg-[#140205] border-t border-[#C5A059]/25 text-latte relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand + actions */}
        <div className="py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-[#C5A059]/20">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-full border border-[#C5A059]/50 flex items-center justify-center bg-black/40 flex-shrink-0">
              <Heart className="w-5 h-5 text-amber-300 fill-[#C5A059]/30" />
            </span>
            <div>
              <p className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.14em]">S.S CONVENTION</p>
              <p className="text-sm text-mocha mt-1">Wedding & banquet halls, Meerpet, Hyderabad</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-gold">
              <CalendarCheck className="w-4 h-4" /> Book a visit
            </Link>
            <a
              href={`https://wa.me/${venueData.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="py-12 grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">
          <nav aria-label="Pages" className="lg:col-span-3">
            <h4 className={heading}>Explore</h4>
            <ul className="grid grid-cols-1 gap-2.5 text-sm">
              {pages.map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className={link}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h4 className={heading}>Our halls</h4>
            <ul className="space-y-3 text-sm">
              {halls.map(([to, name, size]) => (
                <li key={to}>
                  <Link to={to} className="group flex items-baseline justify-between gap-4 max-w-xs">
                    <span className="text-latte group-hover:text-amber-300 transition-colors">{name}</span>
                    <span className="text-xs text-mocha">{size}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-5">
            <h4 className={heading}>Visit us</h4>
            <ul className="space-y-4 text-sm text-mocha">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <span>
                  {venueData.address.line1}, {venueData.address.locality}, {venueData.address.city} – {venueData.address.pincode}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <span className="flex flex-wrap gap-x-5 gap-y-1">
                  {venueData.phones.map((p) => (
                    <a key={p.raw} href={`tel:${p.raw}`} className="font-semibold text-latte hover:text-amber-300 transition-colors">
                      {p.display}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <span>Lunch slots end 3:00 PM · Dinner slots end 11:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-mocha">
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
    </footer>
  );
}
