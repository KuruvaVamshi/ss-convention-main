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

const heading = 'font-cinzel text-xs font-bold tracking-[0.28em] uppercase text-[#8A6B32] mb-5';
const link = 'text-[#5F1524] hover:text-[#B8860B] transition-colors';

// A light footer: cosmic latte background with maroon text, to close the dark pages with contrast.
export default function Footer() {
  return (
    <footer className="relative bg-latte text-[#450B17] border-t-4 border-[#C5A059]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full border border-[#8A6B32]/50 flex items-center justify-center bg-white/60">
                <Heart className="w-5 h-5 text-[#B8860B] fill-[#C5A059]/30" />
              </span>
              <div>
                <p className="font-cinzel text-xl font-bold tracking-[0.14em]">S.S CONVENTION</p>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8A6B32] font-semibold">Wedding & Banquet Halls</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-[#5F1524] max-w-sm">
              We make your celebrations unforgettable: weddings, receptions, birthdays, cradle ceremonies and grand banquets in Meerpet, Hyderabad.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">
                <CalendarCheck className="w-4 h-4" /> Book a visit
              </Link>
              <a
                href={`https://wa.me/${venueData.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#450B17]/40 text-[#450B17] font-cinzel text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#450B17] hover:text-latte transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>

          <nav aria-label="Pages" className="lg:col-span-2 lg:col-start-6">
            <h4 className={heading}>Pages</h4>
            <ul className="space-y-2.5 text-sm">
              {pages.map(([to, label]) => (
                <li key={to}><Link to={to} className={link}>{label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h4 className={heading}>Our halls</h4>
            <ul className="space-y-2.5 text-sm">
              {halls.map(([to, name, size]) => (
                <li key={to}>
                  <Link to={to} className={`group flex items-baseline justify-between gap-4 max-w-[15rem] ${link}`}>
                    <span>{name}</span>
                    <span className="text-xs text-[#8A6B32]">{size}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className={heading}>Visit us</h4>
            <ul className="space-y-3.5 text-sm text-[#5F1524]">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-0.5" />
                <span>{venueData.address.line1}, {venueData.address.locality}, {venueData.address.city} – {venueData.address.pincode}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-0.5" />
                <span className="flex flex-col">
                  {venueData.phones.map((p) => (
                    <a key={p.raw} href={`tel:${p.raw}`} className="font-semibold hover:text-[#B8860B] transition-colors">{p.display}</a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-0.5" />
                <span>Lunch slots end 3:00 PM · Dinner slots end 11:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#450B17]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#5F1524]">
          <p>© {new Date().getFullYear()} S.S Convention A/C. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 hover:text-[#B8860B] transition-colors"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
