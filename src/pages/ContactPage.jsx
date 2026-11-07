import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Car, Navigation, Copy, Check, ExternalLink, MessageSquare, Minus, Plus } from 'lucide-react';
import { venueData } from '../data/venueData';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

const eventTypes = [
  'Wedding / Muhurtham',
  'Grand Reception',
  'Engagement Ceremony',
  '1st Milestone Birthday',
  'Cradle (Barasala)',
  'Sangeet & Corporate',
];

const slots = [
  { id: 'Lunch (09:00 AM - 03:00 PM)', title: 'Lunch', time: '09:00 AM – 03:00 PM' },
  { id: 'Dinner (05:00 PM - 11:00 PM)', title: 'Dinner', time: '05:00 PM – 11:00 PM' },
  { id: 'Full Day (Muhurtham & Reception)', title: 'Full day', time: 'Muhurtham & reception' },
];

const menus = [
  'Standard South Indian Veg',
  'Royal Special Veg Banquet',
  'Premium Hyderabadi Dum Biryani',
  'Imperial Royal Mutton Biryani',
];

const travelDistances = [
  { from: 'Karmanghat Ring Road', time: '5 – 7 min', dist: '2.8 km' },
  { from: 'Saroornagar Indoor Stadium', time: '8 – 10 min', dist: '4.1 km' },
  { from: 'LB Nagar Metro Station', time: '10 – 12 min', dist: '5.5 km' },
  { from: 'Santosh Nagar / DMRL', time: '12 – 15 min', dist: '6.2 km' },
  { from: 'Chandrayangutta X Roads', time: '15 – 18 min', dist: '7.8 km' },
  { from: 'Rajiv Gandhi Intl Airport', time: '30 – 35 min', dist: '21 km' },
];

const maxKm = Math.max(...travelDistances.map((t) => parseFloat(t.dist)));

function recommendHall(guests) {
  if (guests <= 180) return { name: 'Hall Koundinya', capacity: '50 – 200 guests' };
  if (guests <= 320) return { name: 'Hall Agasthya', capacity: '200 – 350 guests' };
  return { name: 'Hall Vasishta', capacity: '300 – 600 seated' };
}

const field =
  'w-full px-4 py-3 rounded-xl bg-[#3D0A14] border border-[#D4AF37]/35 text-latte placeholder-mocha/60 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300/50 transition-colors';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState(eventTypes[0]);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState(slots[1].id);
  const [guests, setGuests] = useState(300);
  const [menu, setMenu] = useState(menus[2]);
  const [copied, setCopied] = useState(false);

  const hall = recommendHall(guests);
  const today = new Date().toISOString().split('T')[0];

  const copyAddress = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(venueData.address.full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const submit = (e) => {
    e.preventDefault();
    try {
      confetti({ particleCount: 90, spread: 95, origin: { y: 0.6 }, colors: ['#FFDF73', '#D4AF37', '#FFF9E6', '#FFD700', '#E63946'] });
    } catch (_) {
      /* confetti is decorative */
    }
    const message = `Namaste SS Convention Hall Management,\n\nI would like to inquire about booking my event:\n• Host Name: ${name || 'Valued Guest'}\n• Contact Number: ${phone || 'Not provided'}\n• Occasion: ${eventType}\n• Expected Guests: ${guests} Pax\n• Selected Hall: ${hall.name} (${hall.capacity})\n• Preferred Date: ${date || 'Date to be discussed'}\n• Time Slot: ${slot}\n• Preferred Catering: ${menu}\n\nPlease verify auspicious date availability and provide the complete quotation and package brochure. Thank you!`;
    setTimeout(() => {
      window.open(`https://wa.me/${venueData.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }, 350);
  };

  return (
    <div className="bg-[#450B17] text-latte min-h-screen overflow-x-clip selection:bg-[#C5A059] selection:text-[#0D0204]">
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end pt-32 pb-12 border-b border-[#D4AF37]/30">
        <img
          src="/assets/04_exterior_and_entrance/royal_palace_mahadwaram_doors.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#450B17] via-[#1C0409]/75 to-[#1C0409]/55" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">Reservations & Location</p>
            <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-wide leading-[1.1]">Reserve Your Date</h1>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#C5A059] to-transparent" />
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-mocha leading-relaxed">
              Tell us about your celebration and we will confirm availability on WhatsApp, or visit us in Meerpet, Hyderabad.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Enquiry + contact details */}
      <section id="estimator" className="py-16 sm:py-24 bg-[#3D0A14] border-b border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide">Booking enquiry</h2>
            <div className="mt-3 h-px w-20 bg-gradient-to-r from-[#C5A059] to-transparent" />

            <form onSubmit={submit} className="mt-8 space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs tracking-[0.2em] uppercase text-amber-300">Your name</span>
                  <input className={`${field} mt-2`} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ramesh Reddy" autoComplete="name" />
                </label>
                <label className="block">
                  <span className="text-xs tracking-[0.2em] uppercase text-amber-300">Mobile number</span>
                  <input className={`${field} mt-2`} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 98765 43210" inputMode="tel" autoComplete="tel" />
                </label>
              </div>

              <fieldset>
                <legend className="text-xs tracking-[0.2em] uppercase text-amber-300 mb-3">Occasion</legend>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setEventType(t)}
                      aria-pressed={eventType === t}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                        eventType === t
                          ? 'bg-gradient-to-r from-[#B8860B] via-[#EED9A6] to-[#C5A059] text-[#1C0409] border-transparent font-semibold'
                          : 'border-[#D4AF37]/35 text-mocha hover:text-latte hover:border-[#D4AF37]/70'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs tracking-[0.2em] uppercase text-amber-300">Preferred date</span>
                  <input type="date" min={today} className={`${field} mt-2`} value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-amber-300">Guests</span>
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-[#D4AF37]/35 bg-[#3D0A14] px-2 py-1.5">
                    <button type="button" aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(50, g - 25))} className="w-10 h-10 rounded-lg hover:bg-[#5A1322] flex items-center justify-center">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-cinzel text-xl font-bold tabular-nums">{guests}</span>
                    <button type="button" aria-label="More guests" onClick={() => setGuests((g) => Math.min(600, g + 25))} className="w-10 h-10 rounded-lg hover:bg-[#5A1322] flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-mocha">
                    Suggested: <strong className="text-latte">{hall.name}</strong> ({hall.capacity})
                  </p>
                </div>
              </div>

              <fieldset>
                <legend className="text-xs tracking-[0.2em] uppercase text-amber-300 mb-3">Time slot</legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {slots.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSlot(s.id)}
                      aria-pressed={slot === s.id}
                      className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                        slot === s.id ? 'bg-[#4A0E1B] border-amber-400/70' : 'border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
                      }`}
                    >
                      <span className="block font-cinzel text-sm font-bold">{s.title}</span>
                      <span className="block text-xs text-mocha mt-0.5">{s.time}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="text-xs tracking-[0.2em] uppercase text-amber-300">Preferred catering</span>
                <select className={`${field} mt-2`} value={menu} onChange={(e) => setMenu(e.target.value)}>
                  {menus.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </label>

              <button type="submit" className="btn-gold w-full sm:w-auto">
                <MessageSquare className="w-4 h-4" /> Send enquiry on WhatsApp
              </button>
              <p className="text-xs text-mocha">This opens WhatsApp with your details filled in. Nothing is stored on this website.</p>
            </form>
          </Reveal>

          {/* Contact details */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 rounded-2xl bg-[#450B17] border border-[#D4AF37]/30 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-cinzel text-2xl font-bold">S.S Convention A/C</h2>
                <p className="text-xs tracking-[0.25em] uppercase text-amber-300 mt-1">Wedding & Banquet Halls</p>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-amber-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-latte leading-relaxed">
                    {venueData.address.line1}, {venueData.address.locality}, {venueData.address.city}, Telangana – {venueData.address.pincode}
                  </p>
                  <button type="button" onClick={copyAddress} className="mt-2 inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-latte transition-colors">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Address copied' : 'Copy address'}
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-amber-300 flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  {venueData.phones.map((p) => (
                    <a key={p.raw} href={`tel:${p.raw}`} className="block text-sm font-semibold text-latte hover:text-amber-300 transition-colors">
                      {p.display}
                      {p.primary && <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-[#3D0A14] font-bold">Primary</span>}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-5 h-5 text-amber-300 flex-shrink-0 mt-1" />
                <p className="text-sm text-mocha leading-relaxed">
                  <strong className="text-latte">Lunch</strong> slots vacated by 03:00 PM<br />
                  <strong className="text-latte">Dinner</strong> slots vacated by 11:00 PM
                </p>
              </div>

              <div className="flex gap-4">
                <Car className="w-5 h-5 text-amber-300 flex-shrink-0 mt-1" />
                <p className="text-sm text-mocha leading-relaxed">On-premises 4-wheeler and 2-wheeler parking with 24/7 CCTV.</p>
              </div>

              <a href={venueData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold w-full">
                <Navigation className="w-4 h-4" /> Get directions
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section id="contact" className="py-16 sm:py-24 bg-[#350710] border-b border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Visit our venue" title="Centrally Located in Meerpet">
            Smooth 60-ft connecting roads, on-premises parking and an illuminated grand entrance. Landmark: Raghavendra Nagar Colony, Jillelaguda.
          </SectionHeader>
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-[#22040A]">
              <iframe
                title="SS Convention Hall Meerpet map location"
                src="https://maps.google.com/maps?q=17.3323,78.5273+(SS+Convention+Hall+Meerpet)&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[380px] sm:h-[460px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-5 py-3 border-t border-[#D4AF37]/30 bg-[#24050B] flex flex-wrap items-center justify-between gap-3 text-sm text-mocha">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-300" /> Near Karmanghat & LB Nagar Ring Road</span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(venueData.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-latte transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Open in Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Travel times */}
      <section className="py-16 sm:py-24 bg-[#3D0A14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="Proximity & connectivity" title="Easy for Your Guests">
            How far each landmark is from the venue. Tap a row to open the route in Google Maps.
          </SectionHeader>

          <ul className="space-y-3">
            {travelDistances.map((t, i) => {
              const km = parseFloat(t.dist);
              // Square-root scale so the 2.8 km and 21 km bars are both readable
              const pct = Math.max(14, Math.round((Math.sqrt(km) / Math.sqrt(maxKm)) * 100));
              return (
                <li key={t.from}>
                  <motion.a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${t.from}, Hyderabad`)}&destination=${encodeURIComponent(venueData.address.full)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group block rounded-xl border border-[#D4AF37]/20 hover:border-amber-400/60 bg-[#350710]/60 hover:bg-[#4A0E1B]/70 px-4 sm:px-5 py-4 transition-colors"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-latte text-sm sm:text-base">{t.from}</span>
                      <span className="flex items-baseline gap-3 whitespace-nowrap">
                        <span className="text-xs sm:text-sm text-mocha">{t.time}</span>
                        <span className="font-cinzel font-bold text-amber-300">{t.dist}</span>
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="relative flex-1 h-1.5 rounded-full bg-[#D4AF37]/15 overflow-hidden">
                        <motion.span
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 1.1, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#B8860B] to-[#EED9A6]"
                        />
                      </span>
                      <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0" />
                      <ExternalLink className="w-3.5 h-3.5 text-mocha opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                  </motion.a>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-center text-sm text-mocha">
            Prefer to talk? <a href={`tel:${venueData.phones[0].raw}`} className="text-amber-300 hover:text-latte">{venueData.phones[0].display}</a>
            {' · '}
            <Link to="/policies" className="text-amber-300 hover:text-latte">Venue policies</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
