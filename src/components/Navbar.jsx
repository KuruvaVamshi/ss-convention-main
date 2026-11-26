import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Building,
  Sparkles,
  Heart,
  ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { whatsappLink, telLink } from '../lib/contact';
import ResponsiveImage from './ResponsiveImage';
import { prefetchHallsResources } from '../lib/prefetchHalls';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(null); // 'venue' | null
  const [mobileExpanded, setMobileExpanded] = useState({ venue: false });

  const location = useLocation();
  const dropdownTimeoutRef = useRef(null);
  const navContainerRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // 10px scroll threshold to filter out trackpad/wheel micro-jitter
  const SCROLL_THRESHOLD = 10;

  // Smart Auto-Hide on Scroll Down, Reveal on Scroll Up
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = Math.max(0, window.scrollY);
          const prevScrollY = lastScrollY.current;
          const diff = currentScrollY - prevScrollY;

          // 1. Scrolled background transition (solidifies past 20px)
          setScrolled(currentScrollY > 20);

          // 2. Always show navbar at the very top of the page
          if (currentScrollY <= 20) {
            setIsVisible(true);
            lastScrollY.current = currentScrollY;
            ticking.current = false;
            return;
          }

          // 3. Keep navbar visible while mobile drawer menu is open
          if (mobileMenuOpen) {
            setIsVisible(true);
            lastScrollY.current = currentScrollY;
            ticking.current = false;
            return;
          }

          // 4. Threshold check: ignore tiny jitter movements (< 10px)
          if (Math.abs(diff) < SCROLL_THRESHOLD) {
            ticking.current = false;
            return;
          }

          // 5. Scroll DOWN -> smoothly slide navbar upwards and hide
          if (diff > 0 && currentScrollY > 80) {
            setIsVisible(false);
            setDesktopDropdown(null); // Ensure dropdown menus close when navbar hides
          }
          // 6. Scroll UP -> smoothly slide navbar back into view from top
          else if (diff < 0) {
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Close menus and ensure navbar is visible on route changes
  useEffect(() => {
    setIsVisible(true);
    setMobileMenuOpen(false);
    setDesktopDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile navigation drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileMenuOpen]);

  // Click outside to dismiss desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setDesktopDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility: Escape to dismiss all menus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDesktopDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Desktop hover intent handlers with grace delay
  const handleMouseEnter = (menuName) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDesktopDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDesktopDropdown(null);
    }, 220);
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setDesktopDropdown(null);
  };

  // Navigate or smooth-scroll directly to Hero Section
  const handleHomeClick = (e) => {
    closeAllMenus();

    // If already on homepage ('/'), smoothly scroll to the Hero section
    if (location.pathname === '/') {
      e.preventDefault();

      const heroEl = document.getElementById('hero') || document.getElementById('homepage-hero-carousel');
      if (heroEl) {
        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
          window.lenis.scrollTo(heroEl, { duration: 1.2, lock: false });
        } else {
          heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
          window.lenis.scrollTo(0, { duration: 1.2, lock: false });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  // Toggle mobile accordion groups
  const toggleMobileAccordion = (group) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // The Venue sub-links (Strictly: About Us, Our Halls, Facilities)
  const venueSubLinks = [
    {
      title: 'About Us',
      desc: 'Heritage story, Buddha foyer & architecture',
      path: '/about',
      icon: Heart
    },
    {
      title: 'Our Halls',
      desc: 'Hall Vasishta, Agasthya, Koundinya & Dining',
      path: '/spaces',
      icon: Building
    },
    {
      title: 'Facilities',
      desc: 'Central Daikin A/C, 2 VIP suites, 100% DG backup',
      path: '/facilities',
      icon: Sparkles
    }
  ];

  // Check if current route is within "The Venue"
  const isVenueActive = ['/about', '/spaces', '/halls', '/facilities'].some((p) =>
    location.pathname.startsWith(p)
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[68px] sm:h-[72px] transform transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none will-change-transform ${
          isVisible ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'
        } ${
          scrolled || mobileMenuOpen
            ? 'bg-[#120104]/96 backdrop-blur-md border-b border-[#D4AF37]/35 shadow-[0_8px_30px_rgba(0,0,0,0.85)]'
            : 'bg-gradient-to-b from-black/55 via-black/20 to-transparent border-b border-[#D4AF37]/15'
        }`}
      >
        <div ref={navContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between gap-3 h-full">
            {/* 1. Brand Logo & Name */}
            <Link
              to="/"
              onClick={handleHomeClick}
              className="flex items-center gap-3 group flex-shrink-0 cursor-pointer"
              title="SS Convention Hall - Return to Hero Section"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black/60 shadow-[0_0_14px_rgba(212,175,55,0.45)] group-hover:scale-105 transition-transform overflow-hidden">
                {/* Same image as the browser favicon (index.html), shown uncropped and undistorted */}
                <ResponsiveImage
                  src="/assets/01_brand_and_logos/ss_convention_official_swan_logo.jpeg"
                  alt="S.S. Convention logo"
                  sizes="44px"
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-sm sm:text-base lg:text-lg font-bold tracking-[0.16em] text-white group-hover:text-amber-300 transition-colors drop-shadow whitespace-nowrap">
                  S.S CONVENTION
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.22em] text-amber-300 font-bold uppercase -mt-0.5 whitespace-nowrap">
                  Royal Wedding & Banquet Halls
                </span>
              </div>
            </Link>

            {/* 2. Desktop Navigation Links (>= lg: 1024px) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0" aria-label="Main Navigation">
              {/* Home */}
              <NavLink
                to="/"
                onClick={handleHomeClick}
                className={({ isActive }) =>
                  `font-cinzel text-xs tracking-[0.2em] font-bold transition-all duration-200 relative py-2 uppercase ${
                    isActive ? 'text-amber-300' : 'ss-navlink text-amber-100/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{'HOME'}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    )}
                  </>
                )}
              </NavLink>

              {/* /spaces */}
              <NavLink
                to="/spaces"
                onMouseEnter={prefetchHallsResources}
                onFocus={prefetchHallsResources}
                onTouchStart={prefetchHallsResources}
                className={({ isActive }) =>
                  `font-cinzel text-xs tracking-[0.2em] font-bold transition-all duration-200 relative py-2 uppercase whitespace-nowrap ${
                    isActive ? 'text-amber-300' : 'ss-navlink text-amber-100/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>HALLS</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    )}
                  </>
                )}
              </NavLink>

              {/* /about */}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `font-cinzel text-xs tracking-[0.2em] font-bold transition-all duration-200 relative py-2 uppercase whitespace-nowrap ${
                    isActive ? 'text-amber-300' : 'ss-navlink text-amber-100/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="xl:hidden">ABOUT</span><span className="hidden xl:inline">ABOUT &amp; FACILITIES</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    )}
                  </>
                )}
              </NavLink>

                            {/* Gallery */}
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `font-cinzel text-xs tracking-[0.2em] font-bold transition-all duration-200 relative py-2 uppercase ${
                    isActive ? 'text-amber-300' : 'ss-navlink text-amber-100/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{'GALLERY'}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    )}
                  </>
                )}
              </NavLink>

              {/* Dining */}
              <NavLink
                to="/dining"
                className={({ isActive }) =>
                  `font-cinzel text-xs tracking-[0.2em] font-bold transition-all duration-200 relative py-2 uppercase ${
                    isActive ? 'text-amber-300' : 'ss-navlink text-amber-100/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{'DINING'}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    )}
                  </>
                )}
              </NavLink>

              {/* Contact */}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `font-cinzel text-xs tracking-[0.2em] font-bold transition-all duration-200 relative py-2 uppercase ${
                    isActive ? 'text-amber-300' : 'ss-navlink text-amber-100/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{'CONTACT'}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    )}
                  </>
                )}
              </NavLink>
            </nav>

            {/* 3. Desktop Right Action Controls (>= lg: 1024px) */}
            <div className="hidden lg:flex items-center gap-3.5 flex-shrink-0">
              {/* WhatsApp enquiry (desktop never shows a call button) */}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                title="Chat on WhatsApp"
                className="hidden xl:flex w-10 h-10 rounded-full border border-[#25D366]/50 bg-black/40 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>

              {/* Primary CTA: ENQUIRE NOW (Bespoke Champagne-Gold Treatment) */}
              <Link
                to="/contact"
                onClick={() => window.triggerBlessings?.()}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37] hover:from-[#F3E5AB] hover:to-[#B8860B] text-[#1E0308] font-cinzel text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_2px_16px_rgba(212,175,55,0.45)] hover:scale-[1.03] border border-[#FFF9E6] whitespace-nowrap cursor-pointer"
              >
                ENQUIRE NOW
              </Link>
            </div>

            {/* 4. Mobile & Tablet Right Controls (< lg: 1024px) */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-2.5">
              {/* Tablet Enquire Now Pill (>= sm) */}
              <Link
                to="/contact"
                onClick={() => {
                  closeAllMenus();
                  window.triggerBlessings?.();
                }}
                className="hidden sm:inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37] text-[#1E0308] font-cinzel text-[10px] font-bold tracking-[0.16em] uppercase shadow-md whitespace-nowrap"
              >
                ENQUIRE NOW
              </Link>

              {/* Hamburger Button (44px standard mobile touch target) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl text-amber-300 hover:text-white bg-black/50 border border-[#D4AF37]/45 hover:border-amber-400 flex items-center justify-center focus:outline-none transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-amber-300" /> : <Menu className="w-5 h-5 text-amber-300" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 5. Mobile & Tablet Navigation Drawer (< lg: 1024px) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden animate-fade-in"
            onClick={closeAllMenus}
          />

          {/* Drawer Menu Panel */}
          <div className="fixed top-[68px] sm:top-[72px] left-0 right-0 z-50 lg:hidden bg-[#140205] border-b-2 border-[#D4AF37]/50 shadow-[0_25px_50px_rgba(0,0,0,0.98)] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 py-5 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <nav className="flex flex-col space-y-1 divide-y divide-[#D4AF37]/15">
                {/* Home */}
                <NavLink
                  to="/"
                  onClick={handleHomeClick}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3.5 px-3 rounded-xl font-cinzel font-bold tracking-[0.16em] text-sm uppercase transition-all ${
                      isActive ? 'bg-[#29050D] text-amber-300 border-l-4 border-amber-400 pl-4' : 'text-amber-100/90'
                    }`
                  }
                >
                  <span>{'HOME'}</span>
                  <span className="text-amber-400 text-xs">→</span>
                </NavLink>

                {/* HALLS */}
                <NavLink
                  to="/spaces"
                  onClick={closeAllMenus}
                  onMouseEnter={prefetchHallsResources}
                  onFocus={prefetchHallsResources}
                  onTouchStart={prefetchHallsResources}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3.5 px-3 rounded-xl font-cinzel font-bold tracking-[0.16em] text-sm uppercase transition-all ${
                      isActive ? 'bg-[#29050D] text-amber-300 border-l-4 border-amber-400 pl-4' : 'text-amber-100/90'
                    }`
                  }
                >
                  <span>HALLS</span>
                  <span className="text-amber-400 text-xs">→</span>
                </NavLink>

                {/* ABOUT &amp; FACILITIES */}
                <NavLink
                  to="/about"
                  onClick={closeAllMenus}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3.5 px-3 rounded-xl font-cinzel font-bold tracking-[0.16em] text-sm uppercase transition-all ${
                      isActive ? 'bg-[#29050D] text-amber-300 border-l-4 border-amber-400 pl-4' : 'text-amber-100/90'
                    }`
                  }
                >
                  <span>ABOUT &amp; FACILITIES</span>
                  <span className="text-amber-400 text-xs">→</span>
                </NavLink>

                                {/* Gallery */}
                <NavLink
                  to="/gallery"
                  onClick={closeAllMenus}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3.5 px-3 rounded-xl font-cinzel font-bold tracking-[0.16em] text-sm uppercase transition-all ${
                      isActive ? 'bg-[#29050D] text-amber-300 border-l-4 border-amber-400 pl-4' : 'text-amber-100/90'
                    }`
                  }
                >
                  <span>{'GALLERY'}</span>
                  <span className="text-amber-400 text-xs">→</span>
                </NavLink>

                {/* Dining */}
                <NavLink
                  to="/dining"
                  onClick={closeAllMenus}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3.5 px-3 rounded-xl font-cinzel font-bold tracking-[0.16em] text-sm uppercase transition-all ${
                      isActive ? 'bg-[#29050D] text-amber-300 border-l-4 border-amber-400 pl-4' : 'text-amber-100/90'
                    }`
                  }
                >
                  <span>{'DINING'}</span>
                  <span className="text-amber-400 text-xs">→</span>
                </NavLink>

                {/* Contact */}
                <NavLink
                  to="/contact"
                  onClick={closeAllMenus}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3.5 px-3 rounded-xl font-cinzel font-bold tracking-[0.16em] text-sm uppercase transition-all ${
                      isActive ? 'bg-[#29050D] text-amber-300 border-l-4 border-amber-400 pl-4' : 'text-amber-100/90'
                    }`
                  }
                >
                  <span>{'CONTACT'}</span>
                  <span className="text-amber-400 text-xs">→</span>
                </NavLink>
              </nav>

              {/* Mobile Quick CTAs */}
              <div className="pt-4 border-t border-[#D4AF37]/25 space-y-2.5">
                <Link
                  to="/contact"
                  onClick={() => {
                    closeAllMenus();
                    window.triggerBlessings?.();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37] text-[#1E0308] font-cinzel text-xs font-black tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                >
                  <span>ENQUIRE NOW</span>
                </Link>

                <div className="flex gap-2.5 pt-1">
                  <a
                    href={telLink(0)}
                    className="md:hidden flex-1 py-2.5 px-3 rounded-xl bg-black/50 border border-[#D4AF37]/35 text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Primary</span>
                  </a>
                  <a
                    href={whatsappLink('Hello SS Convention Hall, I would like to inquire about booking availability.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1.5"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
