import React from 'react';
import { Link } from 'react-router-dom';
import { venueData } from '../data/venueData';
import { CalendarCheck, MessageSquare, ArrowUp, ArrowUpRight } from 'lucide-react';

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
  ['/halls/hall-vasishta', 'Hall Vasishta'],
  ['/halls/hall-agasthya', 'Hall Agasthya'],
  ['/halls/hall-koundinya', 'Hall Koundinya'],
  ['/halls/dining-hall', 'Banquet Dining Hall'],
];

const heading = 'text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-5';
const link = 'inline-flex items-center gap-1 text-mocha hover:text-latte transition-colors';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#140205] border-t border-[#C5A059]/25 text-latte">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Statement + actions */}
          <div className="lg:col-span-5">
            <p className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug tracking-wide">
              We make your celebrations{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EED9A6] to-[#C5A059]">unforgettable.</span>
            </p>
            <p className="mt-4 text-mocha max-w-md leading-relaxed">
              Weddings, receptions, birthdays, cradle ceremonies and grand banquets in Meerpet, Hyderabad.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
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

          {/* Link columns */}
          <nav aria-label="Pages" className="lg:col-span-2 lg:col-start-7">
            <h4 className={heading}>Pages</h4>
            <ul className="space-y-3 text-sm">
              {pages.map(([to, label]) => (
                <li key={to}><Link to={to} className={link}>{label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h4 className={heading}>Halls</h4>
            <ul className="space-y-3 text-sm">
              {halls.map(([to, label]) => (
                <li key={to}><Link to={to} className={link}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className={heading}>Contact</h4>
            <ul className="space-y-3 text-sm text-mocha">
              {venueData.phones.map((p) => (
                <li key={p.raw}>
                  <a href={`tel:${p.raw}`} className="font-semibold text-latte hover:text-amber-300 transition-colors">{p.display}</a>
                </li>
              ))}
              <li className="leading-relaxed">
                {venueData.address.line1}, {venueData.address.locality}, {venueData.address.city} – {venueData.address.pincode}
              </li>
              <li>
                <a
                  href={venueData.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-300 hover:text-latte transition-colors"
                >
                  Directions <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-mocha">
          <p>© {new Date().getFullYear()} S.S Convention A/C · Lunch slots end 3 PM, dinner slots end 11 PM</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Oversized wordmark */}
      <p
        aria-hidden="true"
        className="mt-4 select-none text-center font-cinzel font-bold leading-none tracking-[0.06em] whitespace-nowrap text-[13.5vw] sm:text-[11vw] text-transparent bg-clip-text bg-gradient-to-b from-[#C5A059]/35 to-transparent translate-y-[18%]"
      >
        S.S CONVENTION
      </p>
    </footer>
  );
}
