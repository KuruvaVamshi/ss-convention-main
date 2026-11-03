import React from 'react';
import { Link } from 'react-router-dom';
import { venueData } from '../data/venueData';
import { MapPin, Phone, Heart, Sparkles, CalendarCheck } from 'lucide-react';

export default function Footer({ lang }) {
  return (
    <footer className="bg-[#3A0813] border-t-2 border-[#D4AF37]/35 pt-16 pb-12 relative text-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full border border-[#D4AF37]/60 flex items-center justify-center text-amber-300 shadow-md bg-white/10">
                <Heart className="w-4 h-4 fill-[#D4AF37]/30 text-amber-300" />
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold tracking-[0.16em] text-white block">
                  S.S CONVENTION
                </span>
                <span className="text-[9px] tracking-[0.25em] text-amber-300 font-bold uppercase block -mt-0.5">
                  Wedding & Banquet Halls
                </span>
              </div>
            </div>
            <p className="text-xs text-amber-100/80 leading-relaxed font-light">
              "We Make Your Celebrations Unforgettable." Hyderabad's premier destination for Weddings, Receptions, 1st Birthdays, Cradle Ceremonies, and Grand Banquets.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 border border-[#D4AF37]/40 text-amber-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Hall Vasishta • Hall Agasthya • Hall Koundinya</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-amber-300 uppercase tracking-[0.2em] mb-4 border-b border-[#D4AF37]/30 pb-1.5 inline-block">
              EXPLORE PAGES
            </h4>
            <ul className="space-y-2 text-xs font-normal text-amber-100/90">
              <li><Link to="/" className="hover:text-amber-300 transition-colors">Home & Single-View Overview</Link></li>
              <li><Link to="/spaces" className="hover:text-amber-300 transition-colors">Halls & Spaces (Vasishta, Agasthya, Koundinya)</Link></li>
              <li><Link to="/themes" className="hover:text-amber-300 transition-colors">Occasions & Stage Décor Themes</Link></li>
              <li><Link to="/menus" className="hover:text-amber-300 transition-colors">7-Tier Banquet Catering Menus</Link></li>
              <li><Link to="/gallery" className="hover:text-amber-300 transition-colors">Photo Gallery & HD Video Tours</Link></li>
              <li><Link to="/policies" className="hover:text-amber-300 transition-colors">Official Telugu & English Policies</Link></li>
              <li><Link to="/contact" className="hover:text-amber-300 transition-colors">Book Visit & Interactive Estimator</Link></li>
            </ul>
          </div>

          {/* Col 3: Dedicated Hall Experiences */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-amber-300 uppercase tracking-[0.2em] mb-4 border-b border-[#D4AF37]/30 pb-1.5 inline-block">
              OUR PREMIER HALLS
            </h4>
            <ul className="space-y-3 text-xs font-normal text-amber-100/90">
              <li>
                <Link to="/halls/hall-vasishta" className="group block">
                  <strong className="text-white group-hover:text-amber-300 transition-colors block font-bold">Hall Vasishta (300–600 Pax) →</strong>
                  <span className="text-[11px] text-amber-200/80">Grand Weddings, Sangeet & Large Receptions</span>
                </Link>
              </li>
              <li>
                <Link to="/halls/hall-agasthya" className="group block">
                  <strong className="text-white group-hover:text-amber-300 transition-colors block font-bold">Hall Agasthya (200–350 Pax) →</strong>
                  <span className="text-[11px] text-amber-200/80">Weddings, Receptions & Engagements</span>
                </Link>
              </li>
              <li>
                <Link to="/halls/hall-koundinya" className="group block">
                  <strong className="text-white group-hover:text-amber-300 transition-colors block font-bold">Hall Koundinya (100–200 Pax) →</strong>
                  <span className="text-[11px] text-amber-200/80">1st Birthdays, Cradle (Barasala) & Corporate</span>
                </Link>
              </li>
              <li>
                <Link to="/halls/dining-hall" className="group block">
                  <strong className="text-white group-hover:text-amber-300 transition-colors block font-bold">Banquet Dining Hall (250+ Pax) →</strong>
                  <span className="text-[11px] text-amber-200/80">Separate Floor for Royal Feasts & Buffets</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-amber-300 uppercase tracking-[0.2em] mb-4 border-b border-[#D4AF37]/30 pb-1.5 inline-block">
              DIRECT INQUIRIES
            </h4>
            <div className="space-y-2.5 text-xs text-amber-100/90 font-normal">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <span>Raghavendra Nagar Colony, Jillelaguda, Meerpet, Hyderabad - 500097</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <a href={`tel:${venueData.phones[0].raw}`} className="font-bold text-white hover:text-amber-200 hover:underline">
                  +91 89857 00044 (Primary)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <a href={`tel:${venueData.phones[1].raw}`} className="font-bold text-white hover:text-amber-200 hover:underline">
                  +91 79816 66692
                </a>
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3A0813] font-cinzel font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>BOOK VISIT NOW</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between text-[11px] text-amber-200/80 gap-4">
          <p>© {new Date().getFullYear()} S.S CONVENTION A/C. All Rights Reserved. Meerpet, Hyderabad.</p>
          <p className="text-amber-300 font-semibold">"We Make Your Celebrations Unforgettable"</p>
        </div>
      </div>
    </footer>
  );
}
