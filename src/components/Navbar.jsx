import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Phone, Calendar, Sparkles } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure mobile menu closes whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: lang === 'te' ? 'హోమ్' : 'HOME', path: '/' },
    { name: lang === 'te' ? 'మా హాల్స్' : 'OUR HALLS', path: '/spaces' },
    { name: lang === 'te' ? 'గ్యాలరీ' : 'GALLERY', path: '/gallery' },
    { name: lang === 'te' ? 'వేడుకలు & థీమ్స్' : 'OCCASIONS', path: '/themes' },
    { name: lang === 'te' ? 'క్యాటరింగ్ మెనూ' : 'MENUS', path: '/menus' },
    { name: lang === 'te' ? 'సదుపాయాలు' : 'FACILITIES', path: '/facilities' },
    { name: lang === 'te' ? 'సంప్రదించండి' : 'CONTACT', path: '/contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-[#28050C]/95 backdrop-blur-xl border-b border-[#D4AF37]/40 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent backdrop-blur-[6px] border-b border-[#D4AF37]/25 py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Brand Logo & Name */}
            <Link
              to="/"
              onClick={handleLinkClick}
              className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-[#D4AF37] p-0.5 flex items-center justify-center bg-black/50 shadow-[0_0_15px_rgba(212,175,55,0.45)] group-hover:scale-105 transition-all overflow-hidden">
                <img
                  src="/assets/01_brand_and_logos/ss_convention_royal_gold_crest_emblem.jpeg"
                  alt="SS Convention Royal Crest"
                  className="w-full h-full object-cover rounded-full filter brightness-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-base sm:text-lg lg:text-xl font-bold tracking-[0.14em] sm:tracking-[0.16em] text-white group-hover:text-amber-300 transition-colors drop-shadow">
                  S.S CONVENTION
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] text-amber-300 font-bold uppercase -mt-0.5">
                  Royal Wedding & Banquet Halls
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (>= lg: 1024px) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs tracking-[0.15em] font-bold transition-all duration-200 relative py-1 uppercase ${
                      isActive
                        ? 'text-amber-300'
                        : 'text-amber-100/75 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Right Actions (>= lg: 1024px) */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border border-[#D4AF37]/50 bg-black/40 text-amber-200 hover:bg-[#4D0D19] transition-all shadow-sm hover:border-amber-400"
                title="Toggle English / Telugu"
              >
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'en' ? 'తెలుగు' : 'English'}</span>
              </button>

              {/* Book Visit Button */}
              <Link
                to="/contact"
                onClick={() => window.triggerBlessings?.()}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#B8860B] via-[#FFE57F] to-[#D4AF37] hover:from-[#FFE57F] hover:to-[#B8860B] text-[#24040A] font-cinzel text-xs font-black tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_2px_15px_rgba(212,175,55,0.45)] hover:scale-105 border border-[#FFF9E6]"
              >
                BOOK VISIT
              </Link>
            </div>

            {/* Mobile & Tablet Controls (< lg: 1024px) */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-[#D4AF37]/50 bg-black/40 text-amber-200 hover:bg-[#4D0D19] transition-colors"
                title="Toggle English / Telugu"
              >
                {lang === 'en' ? 'తె' : 'EN'}
              </button>

              {/* Book Visit Pill (visible on tablet >= sm) */}
              <Link
                to="/contact"
                onClick={() => {
                  handleLinkClick();
                  window.triggerBlessings?.();
                }}
                className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#B8860B] via-[#FFE57F] to-[#D4AF37] text-[#24040A] font-cinzel text-[11px] font-bold tracking-[0.12em] uppercase shadow-md"
              >
                BOOK VISIT
              </Link>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-amber-300 hover:text-white bg-black/40 border border-[#D4AF37]/40 hover:border-amber-400 focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Full-Screen Backdrop Drawer (< lg: 1024px) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col pt-20">
          {/* Dark Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md -z-10 animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu Container */}
          <div className="bg-[#2D060E] border-b-2 border-[#D4AF37]/50 px-6 py-6 mx-3 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[calc(100vh-6rem)] overflow-y-auto space-y-5 animate-slide-down">
            {/* Navigation Links with explicit onClick */}
            <nav className="flex flex-col divide-y divide-[#D4AF37]/15">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3.5 px-3 rounded-xl font-bold tracking-[0.15em] text-sm uppercase transition-all ${
                      isActive
                        ? 'bg-amber-400/15 text-amber-300 border-l-4 border-amber-400 pl-4'
                        : 'text-amber-100/80 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <span className="text-amber-400/60 text-xs">→</span>
                </NavLink>
              ))}
            </nav>

            {/* Quick Actions Footer inside Drawer */}
            <div className="pt-3 border-t border-[#D4AF37]/30 space-y-3">
              <Link
                to="/contact"
                onClick={() => {
                  handleLinkClick();
                  window.triggerBlessings?.();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs tracking-[0.2em] uppercase shadow-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              >
                <Calendar className="w-4 h-4 text-[#3D0A14]" />
                <span>BOOK HALL VISIT / CHECK DATES</span>
              </Link>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${venueData.phones[0].raw}`}
                  className="py-2.5 px-3 rounded-xl bg-[#4A0E17] border border-[#D4AF37]/40 text-amber-200 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#5D1220] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Venue</span>
                </a>
                <button
                  onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                  className="py-2.5 px-3 rounded-xl bg-[#4A0E17] border border-[#D4AF37]/40 text-amber-200 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#5D1220] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'en' ? 'తెలుగు మోడ్' : 'English Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
