import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Phone, Sparkles, MessageSquare } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function InteractiveBookingStudio({ lang }) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventType, setEventType] = useState('Wedding / Muhurtham');
  const [guestCount, setGuestCount] = useState(300);
  const [eventDate, setEventDate] = useState('');
  const [slot, setSlot] = useState('Dinner (Till 11:00 PM)');
  const [menuChoice, setMenuChoice] = useState('Premium Non-Veg (Dum Biryani)');

  const eventTypes = [
    'Wedding / Muhurtham',
    'Grand Reception',
    'Engagement / Ring Ceremony',
    '1st Milestone Birthday',
    'Cradle (Barasala)',
    'Corporate / Sangeet'
  ];

  const menuOptions = [
    'Standard Veg (100 Pax)',
    'Special Veg (250 Pax)',
    'Standard Non-Veg (Chicken Biryani)',
    'Premium Non-Veg (Dum Biryani)',
    'Royal Non-Veg (Mutton Dum Biryani)'
  ];

  // Dynamic Hall Recommendation
  let recommendedHall = 'Hall Vasishta (300-600 Pax)';
  if (guestCount <= 180) {
    recommendedHall = 'Hall Koundinya (100-200 Pax)';
  } else if (guestCount <= 280) {
    recommendedHall = 'Hall Agasthya (200-300 Pax)';
  }

  const handleWhatsAppInquiry = (e) => {
    e.preventDefault();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (_) {}

    const message = `Namaste SS Convention Hall Management,\n\nI would like to inquire about booking my event:\n• Name: ${clientName || 'Guest'}\n• Phone: ${clientPhone || 'Not provided'}\n• Event Type: ${eventType}\n• Expected Guests: ${guestCount} Pax\n• Target Date: ${eventDate || 'Not specified'}\n• Time Slot: ${slot}\n• Preferred Catering: ${menuChoice}\n• Recommended Space: ${recommendedHall}\n\nPlease confirm date availability and provide an estimate. Thank you!`;

    const formattedMsg = encodeURIComponent(message);
    setTimeout(() => {
      window.open(`https://wa.me/${venueData.whatsappNumber}?text=${formattedMsg}`, '_blank');
    }, 400);
  };

  return (
    <section id="estimator" className="py-24 bg-[#450B17] relative overflow-hidden text-white border-t border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Booking Studio</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4">
            Check Auspicious Dates & Pricing
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed">
            Configure your dream celebration in real-time. Watch your booking itinerary generate live and send it directly to our venue management via WhatsApp.
          </p>
        </div>

        {/* 2-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 bg-[#3A0813] p-6 sm:p-10 rounded-[32px] border-2 border-[#D4AF37]/45 shadow-2xl">
            <form onSubmit={handleWhatsAppInquiry} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Reddy"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#4D0D19] border border-[#D4AF37]/35 text-white placeholder-amber-200/40 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#4D0D19] border border-[#D4AF37]/35 text-white placeholder-amber-200/40 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>
              </div>

              {/* Event Type Select */}
              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                  Select Occasion / Ceremony
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {eventTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setEventType(type)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                        eventType === type
                          ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-bold shadow-md scale-105 border-amber-300'
                          : 'bg-[#4D0D19] text-amber-100 border-[#D4AF37]/30 hover:bg-[#5D1220]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                    Expected Guests (Pax)
                  </label>
                  <span className="text-sm font-bold text-amber-300 bg-[#4D0D19] px-3 py-1 rounded-full border border-[#D4AF37]/35">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-2 bg-[#4D0D19] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[11px] text-amber-200/70 mt-1 font-normal">
                  <span>50 (Hall Koundinya)</span>
                  <span className="text-amber-300 font-bold">250 (Hall Agasthya)</span>
                  <span>600 (Hall Vasishta)</span>
                </div>
              </div>

              {/* Event Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                    Preferred Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#4D0D19] border border-[#D4AF37]/35 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                    Party Slot Time
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#4D0D19] border border-[#D4AF37]/35 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Lunch (Till 03:00 PM)" className="bg-[#3A0813] text-white">Lunch Slot (Vacated by 3:00 PM)</option>
                    <option value="Dinner (Till 11:00 PM)" className="bg-[#3A0813] text-white">Dinner Slot (Vacated by 11:00 PM)</option>
                    <option value="Full Day (Auspicious Muhurtham)" className="bg-[#3A0813] text-white">Full Day Booking</option>
                  </select>
                </div>
              </div>

              {/* Catering Selection */}
              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                  Preferred Catering Menu
                </label>
                <select
                  value={menuChoice}
                  onChange={(e) => setMenuChoice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#4D0D19] border border-[#D4AF37]/35 text-white text-sm focus:outline-none focus:border-amber-400"
                >
                  {menuOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#3A0813] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-sm tracking-[0.16em] uppercase shadow-xl transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] hover:brightness-110"
              >
                <MessageSquare className="w-5 h-5 text-[#3D0A14] group-hover:scale-110 transition-transform" />
                <span>Send Booking Inquiry on WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Right Column: Live Booking Itinerary Pass */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-[32px] border-2 border-[#D4AF37]/45 bg-[#3A0813] p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white">
              {/* Pass Header */}
              <div className="border-b-2 border-dashed border-[#D4AF37]/30 pb-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] uppercase tracking-wider">
                    Live Booking Pass
                  </span>
                  <span className="text-[10px] font-bold text-amber-300 tracking-widest">
                    S.S CONVENTION
                  </span>
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  {eventType}
                </h3>
                <p className="text-xs text-amber-100/80 font-normal">
                  Client: <strong className="text-amber-300 font-bold">{clientName || 'Prospective Host'}</strong>
                </p>
              </div>

              {/* Live Specifications */}
              <div className="space-y-4 mb-6 text-xs font-normal">
                <div className="flex items-center justify-between py-1 border-b border-[#D4AF37]/15">
                  <span className="text-amber-200/70">Recommended Hall:</span>
                  <span className="font-bold text-amber-300 text-right">{recommendedHall}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#D4AF37]/15">
                  <span className="text-amber-200/70">Guest Count:</span>
                  <span className="font-bold text-amber-300">{guestCount} Guests</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#D4AF37]/15">
                  <span className="text-amber-200/70">Slot Timing:</span>
                  <span className="font-bold text-amber-300">{slot}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#D4AF37]/15">
                  <span className="text-amber-200/70">Target Date:</span>
                  <span className="font-bold text-amber-300">{eventDate || 'Date Not Selected'}</span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-amber-200/70">Catering Choice:</span>
                  <span className="font-bold text-amber-300 text-right">{menuChoice}</span>
                </div>
              </div>

              {/* Direct Booking Phone Numbers Card */}
              <div className="p-4 rounded-2xl bg-[#4D0D19] border border-[#D4AF37]/35">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
                  Direct Inquiries & Walkthroughs:
                </span>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+918985700044"
                    className="text-xs font-bold text-white hover:text-amber-300 flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>+91 89857 00044 (Primary)</span>
                  </a>
                  <a
                    href="tel:+917981666692"
                    className="text-xs font-bold text-white hover:text-amber-300 flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>+91 79816 66692</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
