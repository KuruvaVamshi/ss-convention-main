import React, { useState } from 'react';
import { Calendar, Users, Clock, Utensils, Send, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function BookingEstimator({ lang }) {
  const [eventType, setEventType] = useState('Wedding / Reception');
  const [guestCount, setGuestCount] = useState(250);
  const [slot, setSlot] = useState('Dinner (Till 11:00 PM)');
  const [menuChoice, setMenuChoice] = useState('Premium Non-Veg Menu');
  const [eventDate, setEventDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const eventTypes = [
    'Wedding / Kalyanam',
    'Reception / Sangeet',
    'Engagement Ceremony',
    '1st Milestone Birthday',
    'Cradle Ceremony (Barasala)',
    'Family Get-Together / Puja'
  ];

  const menuOptions = [
    'Regular Veg Menu (Min 100 Pax)',
    'Standard Veg Menu (Min 100 Pax)',
    'Premium Veg Menu (Min 200 Pax)',
    'Special Veg Menu with Noodles (Min 250 Pax)',
    'Standard Non-Veg Menu (Min 100 Pax)',
    'Premium Non-Veg Menu (Min 200 Pax)',
    'Special Non-Veg Royal Menu (Min 250 Pax)',
    'Venue Booking Only (Custom Catering)'
  ];

  const handleWhatsAppInquiry = (e) => {
    e.preventDefault();
    const formattedMsg = encodeURIComponent(
      `*SS CONVENTION HALL - EVENT BOOKING INQUIRY*\n` +
      `---------------------------------------\n` +
      `👤 *Name:* ${clientName || 'Valued Guest'}\n` +
      `📞 *Phone:* ${clientPhone || 'Not provided'}\n` +
      `🎉 *Event Type:* ${eventType}\n` +
      `📅 *Preferred Date:* ${eventDate || 'To be decided'}\n` +
      `⏰ *Slot:* ${slot}\n` +
      `👥 *Estimated Guests:* ${guestCount} Guests\n` +
      `🍽️ *Preferred Menu:* ${menuChoice}\n` +
      `📍 *Venue:* Raghavendra Nagar Colony, Meerpet, Hyderabad\n` +
      `---------------------------------------\n` +
      `Please confirm slot availability and share a detailed quotation. Thank you!`
    );

    window.open(`https://wa.me/${venueData.whatsappNumber}?text=${formattedMsg}`, '_blank');
  };

  return (
    <section id="estimator" className="py-20 lg:py-28 bg-emerald-950/30 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Instant Date & Availability Check</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-stone-100 tracking-tight mb-4">
            Plan Your Grand Day with Us
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Select your preferences below to receive an instant, personalized booking quotation and date check directly with our venue manager on WhatsApp.
          </p>
        </div>

        {/* Interactive Form Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-gold-500/30 bg-obsidian-900/95 shadow-2xl">
          <form onSubmit={handleWhatsAppInquiry} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Client Phone */}
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98XXXXXXXX"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Event Type */}
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Event Category
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-gold-400"
                >
                  {eventTypes.map((t) => (
                    <option key={t} value={t} className="bg-obsidian-900">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Date */}
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Slot */}
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Slot Timing
                </label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-gold-400"
                >
                  <option value="Lunch (Till 03:00 PM)">Lunch (Till 03:00 PM)</option>
                  <option value="Dinner (Till 11:00 PM)">Dinner (Till 11:00 PM)</option>
                  <option value="Full Day Event">Full Day Event</option>
                </select>
              </div>
            </div>

            {/* Guest Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold-400" />
                  <span>Estimated Guest Count:</span>
                </label>
                <span className="font-cinzel text-lg font-bold text-gold-400">
                  {guestCount} Guests
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>50 Pax (Mini Hall)</span>
                <span>250 Pax (Average)</span>
                <span>500 Pax (Grand Full Hall)</span>
              </div>
            </div>

            {/* Catering Menu Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-gold-400" />
                <span>Preferred Catering Package</span>
              </label>
              <select
                value={menuChoice}
                onChange={(e) => setMenuChoice(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:border-gold-400"
              >
                {menuOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-obsidian-900">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit & WhatsApp Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span>Send WhatsApp Inquiry to 8985700044</span>
              </button>

              <a
                href={`tel:${venueData.phones[1].raw}`}
                className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-obsidian-800 border border-gold-500/30 hover:bg-obsidian-750 text-gold-300 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Manager Directly</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

