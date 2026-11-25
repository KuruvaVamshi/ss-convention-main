import React from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { whatsappLink, telLink, DEFAULT_WA_MESSAGE } from '../lib/contact';
import { venueData } from '../data/venueData';

// WhatsApp enquiry. `variant`: 'gold' (filled) | 'outline' (default).
export function WhatsAppButton({ message = DEFAULT_WA_MESSAGE, label = 'WhatsApp', variant = 'outline', className = '', iconOnly = false, onClick }) {
  const base = variant === 'gold' ? 'btn-gold' : 'btn-outline-gold';
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={iconOnly ? label : undefined}
      className={`${base} ${className}`}
    >
      <WhatsAppIcon className={`w-4 h-4 ${variant === 'gold' ? 'text-[#128C4A]' : 'text-[#25D366]'}`} />
      {!iconOnly && <span>{label}</span>}
    </a>
  );
}

// Phone call. Mobile only: it is removed from the layout from the `md` breakpoint up.
export function CallButton({ label, variant = 'outline', className = '', index = 0 }) {
  const base = variant === 'gold' ? 'btn-gold' : 'btn-outline-gold';
  return (
    <a href={telLink(index)} className={`${base} md:hidden ${className}`}>
      <Phone className="w-4 h-4" />
      <span>{label || venueData.phones[index].display}</span>
    </a>
  );
}
