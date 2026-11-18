import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function FloatingContactBar({ lang }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  // On the homepage keep the hero clean; reveal the quick actions after the first scroll.
  useEffect(() => {
    if (!isHome) return;
    let ticking = false;
    const update = () => { setScrolled(window.scrollY > 360); ticking = false; };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const visible = !isHome || scrolled;
  const hidden = !visible;

  const quickWhatsAppMsg = encodeURIComponent(
    `Hello SS Convention Hall, I am interested in booking an event date. Please share venue availability and details.`
  );

  return (
    <>
      {/* Floating Bottom Left: Gold Phone Call Button */}
      <a
        href={`tel:${venueData.phones[0].raw}`}
        data-hidden={hidden}
        tabIndex={hidden ? -1 : undefined}
        aria-hidden={hidden || undefined}
        className="ss-float fixed bottom-5 sm:bottom-6 left-4 sm:left-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-[#2D060E] flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-110 active:scale-95 border border-amber-200 group"
        title="Call Venue: +91 89857 00044"
        aria-label="Call Venue"
      >
        <Phone className="w-5 h-5 fill-[#2D060E] text-[#2D060E] group-hover:rotate-12 transition-transform" />
      </a>

      {/* Floating Bottom Right: WhatsApp Button (the one pulsing element) */}
      <a
        href={`https://wa.me/${venueData.whatsappNumber}?text=${quickWhatsAppMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        data-hidden={hidden}
        tabIndex={hidden ? -1 : undefined}
        aria-hidden={hidden || undefined}
        className="ss-float ss-ring fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 border border-white/30 group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-white group-hover:scale-110 transition-transform" />
      </a>
    </>
  );
}
