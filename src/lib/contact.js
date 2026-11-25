import { venueData } from '../data/venueData';

// One place for every enquiry destination, built from the official details in venueData.
export const DEFAULT_WA_MESSAGE =
  'Hello SS Convention Hall, I would like to enquire about hall availability and booking.';

export const whatsappLink = (message = DEFAULT_WA_MESSAGE) =>
  `https://wa.me/${venueData.whatsappNumber}?text=${encodeURIComponent(message)}`;

// E.164 style so the dialer treats it as a full Indian number on any phone.
export const telLink = (index = 0) => `tel:+${venueData.phones[index].raw}`;

// Instagram stays hidden until a real URL is added to venueData.instagramUrl.
export const instagramLink = () => (venueData.instagramUrl || '').trim();
