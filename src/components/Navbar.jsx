import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Heart } from 'lucide-react';

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navLinks = [
    { name: lang === 'te' ? 'హోమ్' : 'HOME', path: '/' },
    { name: lang === 'te' ? 'మా హాల్స్' : 'OUR HALLS', path: '/spaces' },
    { name: lang === 'te' ? 'గ్యాలరీ' : 'GALLERY', path: '/gallery' },
    { name: lang === 'te' ? 'వేడుకలు & థీమ్స్' : 'OCCASIONS', path: '/themes' },
    { name: lang === 'te' ? 'క్యాటరింగ్ మెనూ' : 'MENUS', path: '/menus' },
    { name: lang === 'te' ? 'సదుపాయాలు' : 'FACILITIES', path: '/facilities' },
    { name: lang === 'te' ? 'సంప్రదించండి' : 'CONTACT', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#350710]/95 backdrop-blur-md border-b border-[#D4AF37]/40 py-2.5 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/35 to-transparent backdrop-blur-[4px] border-b border-[#D4AF37]/25 py-2.5 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#D4AF37] p-0.5 flex items-center justify-center bg-black/40 shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-all overflow-hidden">
              <img
                src="/assets/01_brand_and_logos/ss_convention_royal_gold_crest_emblem.jpeg"
                alt="SS Convention Royal Crest"
                className="w-full h-full object-cover rounded-full filter brightness-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.16em] text-white group-hover:text-amber-300 transition-colors drop-shadow">
                S.S CONVENTION
              </span>
              <span className="text-[9px] tracking-[0.25em] text-amber-300 font-bold uppercase -mt-0.5">
                Royal Wedding & Banquet Halls
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs tracking-[0.16em] font-bold transition-all duration-200 relative py-1 uppercase ${
                    isActive
                      ? 'text-amber-300'
                      : 'text-amber-100/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-sm" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action: Language Toggle + BOOK VISIT Pill Button */}
          <div className="hidden sm:flex items-center gap-3.5">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border border-[#D4AF37]/50 bg-black/30 text-amber-200 hover:bg-[#5F1524] transition-colors shadow-sm"
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

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="p-1.5 text-xs text-amber-200 font-bold border border-[#D4AF37]/50 rounded-lg bg-black/30"
            >
              {lang === 'en' ? 'తె' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-amber-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#450B17]/98 border-b border-[#D4AF37]/45 px-6 py-6 space-y-4 backdrop-blur-xl shadow-2xl animate-fade-in text-white">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm tracking-[0.15em] font-bold transition-colors py-1 ${
                    isActive ? 'text-amber-300' : 'text-amber-100/80 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#D4AF37]/25">
            <Link
              to="/contact"
              onClick={() => window.triggerBlessings?.()}
              className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-bold text-xs tracking-[0.2em] uppercase shadow-lg"
            >
              BOOK VISIT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
