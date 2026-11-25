import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from './BrandIcons';
import { whatsappLink, telLink, instagramLink } from '../lib/contact';
import { venueData } from '../data/venueData';

/*
  Floating contact cluster
  - WhatsApp: every screen size (bottom-right, the only button with a pulse).
  - Call: phones only (hidden from the md breakpoint up, so desktop never sees it).
  - Instagram: rendered ONLY when venueData.instagramUrl has a real link.
  On the homepage the buttons stay out of the way until the visitor scrolls past the hero.
*/
export default function FloatingContactBar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const instagram = instagramLink();

  useEffect(() => {
    if (!isHome) return;
    let ticking = false;
    const update = () => { setScrolled(window.scrollY > 360); ticking = false; };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const hidden = isHome && !scrolled;
  const common = {
    'data-hidden': hidden,
    tabIndex: hidden ? -1 : undefined,
    'aria-hidden': hidden || undefined,
  };
  const safeBottom = { bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' };
  const btn = 'ss-float w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform';

  return (
    <>
      {/* Call — mobile only */}
      <a
        {...common}
        href={telLink(0)}
        style={safeBottom}
        className={`${btn} md:hidden fixed left-4 z-40 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-[#2D060E] border border-amber-200 shadow-[0_4px_20px_rgba(212,175,55,0.4)]`}
        aria-label={`Call ${venueData.phones[0].display}`}
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp (+ Instagram when available) */}
      <div style={safeBottom} className="fixed right-4 sm:right-6 z-40 flex flex-col items-center gap-3 pointer-events-none">
        {instagram && (
          <a
            {...common}
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn} pointer-events-auto text-white border border-white/30`}
            style={{ background: 'linear-gradient(45deg,#F9CE34 0%,#EE2A7B 50%,#6228D7 100%)' }}
            aria-label="Follow us on Instagram"
          >
            <InstagramIcon className="w-6 h-6" />
          </a>
        )}
        <a
          {...common}
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} ss-ring pointer-events-auto bg-[#25D366] text-white border border-white/30 shadow-[0_4px_20px_rgba(37,211,102,0.4)]`}
          aria-label="Chat with us on WhatsApp"
        >
          <WhatsAppIcon className="w-7 h-7" />
        </a>
      </div>
    </>
  );
}
