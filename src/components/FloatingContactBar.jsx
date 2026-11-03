import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function FloatingContactBar({ lang }) {
  const quickWhatsAppMsg = encodeURIComponent(
    `Hello SS Convention Hall, I am interested in booking an event date. Please share venue availability and details.`
  );

  return (
    <>
      {/* Floating Bottom Left: Gold Phone Call Button (from screenshot) */}
      <a
        href={`tel:${venueData.phones[0].raw}`}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-velvet-950 flex items-center justify-center shadow-2xl shadow-gold-500/30 hover:scale-110 active:scale-95 transition-transform duration-300 border border-gold-300 group"
        title="Call Venue: +91 89857 00044"
        aria-label="Call Venue"
      >
        <Phone className="w-6 h-6 fill-velvet-950 text-velvet-950 group-hover:rotate-12 transition-transform" />
      </a>

      {/* Floating Bottom Right: WhatsApp Button (from screenshot) */}
      <a
        href={`https://wa.me/${venueData.whatsappNumber}?text=${quickWhatsAppMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-transform duration-300 border border-white/20 group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-white group-hover:scale-105 transition-transform" />
      </a>
    </>
  );
}
