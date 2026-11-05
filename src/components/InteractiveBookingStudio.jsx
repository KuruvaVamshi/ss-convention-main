import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Phone,
  Sparkles,
  MessageSquare,
  Users,
  Clock,
  Utensils,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  HeartHandshake
} from 'lucide-react';
import { venueData } from '../data/venueData';

export default function InteractiveBookingStudio({ lang }) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventType, setEventType] = useState('Wedding / Muhurtham');
  const [guestCount, setGuestCount] = useState(300);
  const [eventDate, setEventDate] = useState('');
  const [slot, setSlot] = useState('Dinner (05:00 PM - 11:00 PM)');
  const [menuChoice, setMenuChoice] = useState('Premium Hyderabadi Dum Biryani');

  // Occasions with curated icons & descriptions
  const eventTypes = [
    { id: 'Wedding / Muhurtham', label: 'Wedding / Muhurtham', telugu: 'కళ్యాణం / ముహూర్తం', icon: '💍', badge: 'Vedic Mandap' },
    { id: 'Grand Reception', label: 'Grand Reception', telugu: 'రిసెప్షన్ వేడుక', icon: '👑', badge: 'Red Carpet' },
    { id: 'Engagement Ceremony', label: 'Engagement / Ring Ceremony', telugu: 'నిశ్చితార్థం', icon: '🌸', badge: 'Floral Arch' },
    { id: '1st Milestone Birthday', label: '1st Milestone Birthday', telugu: 'మొదటి పుట్టినరోజు', icon: '🎂', badge: 'Theme Stage' },
    { id: 'Cradle (Barasala)', label: 'Cradle (Barasala)', telugu: 'బారసాల / ఉయ్యాల', icon: '👶', badge: 'Lotus Swing' },
    { id: 'Sangeet & Corporate', label: 'Sangeet & Corporate', telugu: 'సంగీత్ & సమ్మేళనం', icon: '✨', badge: 'Truss Lighting' }
  ];

  // Party Slots
  const slotOptions = [
    {
      id: 'Lunch (09:00 AM - 03:00 PM)',
      title: 'Royal Lunch Slot',
      time: '09:00 AM – 03:00 PM',
      note: 'Vacated strictly by 3:00 PM',
      badge: 'Daylight Celebrations'
    },
    {
      id: 'Dinner (05:00 PM - 11:00 PM)',
      title: 'Grand Dinner Slot',
      time: '05:00 PM – 11:00 PM',
      note: 'Vacated strictly by 11:00 PM',
      badge: 'Evening Illuminations'
    },
    {
      id: 'Full Day (Muhurtham & Reception)',
      title: 'Full Day Grand Muhurtham',
      time: 'Full 24-Hour Access',
      note: 'Continuous Mandap & Green Rooms',
      badge: 'Auspicious All-Day'
    }
  ];

  // Curated Catering Menus
  const menuTiers = [
    {
      id: 'Standard South Indian Veg',
      name: 'Standard Veg Feast',
      items: 'Poori, Veg Biryani, Paneer Curry, Sambar, Rasam, Curd, Sweet',
      badge: 'Pure Veg'
    },
    {
      id: 'Royal Special Veg Banquet',
      name: 'Royal Special Veg',
      items: 'Welcome Drink, 2 Sweets, Paneer Butter Masala, Veg Pulao, Live Counter',
      badge: 'Gourmet Veg'
    },
    {
      id: 'Premium Hyderabadi Dum Biryani',
      name: 'Premium Non-Veg Feast',
      items: 'Hyderabadi Chicken Dum Biryani, Chicken 65, Mirchi Ka Salan, Raita, Double Ka Meetha',
      badge: 'Most Popular'
    },
    {
      id: 'Imperial Royal Mutton Biryani',
      name: 'Imperial Mutton Biryani Gala',
      items: 'Zafrani Mutton Dum Biryani, Apollo Fish / Kebabs, Shahi Tukda, Live Ice Cream Counter',
      badge: 'Ultra Royal'
    }
  ];

  // Dynamic Hall Recommendation
  let currentHall = {
    name: 'Hall Vasishta',
    type: 'Grand Kalyana Mandapam',
    capacityTag: '300 – 600 Seated (1,000 Floating)',
    image: '/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg',
    path: '/halls/hall-vasishta',
    description: 'Double-tier crystal chandeliers, 38-ft stage, red-carpet aisle & 2 VIP bridal suites.'
  };

  if (guestCount <= 180) {
    currentHall = {
      name: 'Hall Koundinya',
      type: 'Intimate Milestone Banquet Hall',
      capacityTag: '50 – 200 Guests',
      image: '/assets/06_main_hall_seating/mini_hall_seating_central_aisle_stage.jpeg',
      path: '/halls/hall-koundinya',
      description: 'Modern wood-slat architectural ceiling, custom milestone stage & private VIP lounge.'
    };
  } else if (guestCount <= 320) {
    currentHall = {
      name: 'Hall Agasthya',
      type: 'Royal Sangeet & Reception Hall',
      capacityTag: '200 – 350 Guests',
      image: '/assets/06_main_hall_seating/main_hall_seating_chandelier_perspective.jpeg',
      path: '/halls/hall-agasthya',
      description: 'Acoustic-treated ceiling, moving head stage lighting & dynamic performance floor.'
    };
  }

  // Minimum date today
  const todayStr = new Date().toISOString().split('T')[0];

  const handleWhatsAppInquiry = (e) => {
    e.preventDefault();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFDF73', '#D4AF37', '#FFF9E6', '#FFD700', '#E63946']
      });
    } catch (_) {}

    const message = `Namaste SS Convention Hall Management,\n\nI would like to inquire about booking my event:\n• Host Name: ${clientName || 'Valued Guest'}\n• Contact Number: ${clientPhone || 'Not provided'}\n• Occasion: ${eventType}\n• Expected Guests: ${guestCount} Pax\n• Selected Hall: ${currentHall.name} (${currentHall.capacityTag})\n• Preferred Date: ${eventDate || 'Date to be discussed'}\n• Time Slot: ${slot}\n• Preferred Catering: ${menuChoice}\n\nPlease verify auspicious date availability and provide the complete quotation and package brochure. Thank you!`;

    const formattedMsg = encodeURIComponent(message);
    setTimeout(() => {
      window.open(`https://wa.me/${venueData.whatsappNumber}?text=${formattedMsg}`, '_blank');
    }, 350);
  };

  return (
    <section id="estimator" className="py-20 sm:py-24 bg-gradient-to-b from-[#350710] via-[#450B17] to-[#2D060E] relative overflow-hidden text-white border-t border-b border-[#D4AF37]/35">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/50 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3.5 shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Booking Concierge</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-3">
            Check Auspicious Dates & Availability
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed">
            Configure your celebration specifications in real time. Our studio dynamically matches the optimal hall, calculates guest spatial comfort, and generates an official WhatsApp Booking Pass.
          </p>
        </div>

        {/* 2-Column Luxury Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Shadcn-Inspired Modern Form Controls */}
          <div className="lg:col-span-7 bg-[#2A050D]/90 backdrop-blur-xl p-6 sm:p-9 rounded-[32px] border-2 border-[#D4AF37]/45 shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-7">
            <form onSubmit={handleWhatsAppInquiry} className="space-y-7">
              {/* 1. Host Contact Info (Floating Modern Inputs) */}
              <div>
                <label className="text-[11px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-[#3D0A14] flex items-center justify-center text-[10px] font-black">1</span>
                  Host Contact Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name (e.g. Ramesh Reddy)"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#3D0A14]/90 border border-[#D4AF37]/40 text-white placeholder-amber-200/40 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number (e.g. 98765 43210)"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#3D0A14]/90 border border-[#D4AF37]/40 text-white placeholder-amber-200/40 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Occasion Selector (Rich Interactive Cards) */}
              <div>
                <label className="text-[11px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-[#3D0A14] flex items-center justify-center text-[10px] font-black">2</span>
                  Select Auspicious Occasion
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {eventTypes.map((item) => {
                    const isSelected = eventType === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setEventType(item.id)}
                        className={`p-3 rounded-2xl text-left border transition-all relative flex flex-col justify-between group ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#5A1220] to-[#7A192C] border-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-[1.02]'
                            : 'bg-[#3D0A14]/70 border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#4D0D19]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl">{item.icon}</span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isSelected ? 'bg-amber-400 text-[#3D0A14]' : 'bg-black/40 text-amber-300/80 border border-[#D4AF37]/30'
                          }`}>
                            {item.badge}
                          </span>
                        </div>
                        <div>
                          <p className={`font-cinzel text-xs font-bold leading-tight ${isSelected ? 'text-amber-200' : 'text-white'}`}>
                            {item.label}
                          </p>
                          <p className="text-[10px] text-amber-200/60 font-medium mt-0.5">
                            {lang === 'te' ? item.telugu : ''}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Guest Count & Capacity Slider with Presets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-amber-400 text-[#3D0A14] flex items-center justify-center text-[10px] font-black">3</span>
                    Expected Guests: <strong className="text-amber-300 text-sm ml-1">{guestCount} Pax</strong>
                  </label>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#4D0D19] border border-[#D4AF37]/45 text-amber-300">
                    Auto-Matched: {currentHall.name}
                  </span>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#4D0D19] rounded-lg appearance-none cursor-pointer accent-amber-400"
                />

                {/* Preset Buttons */}
                <div className="flex items-center justify-between mt-3 gap-2">
                  {[100, 200, 300, 450, 600].map((count) => (
                    <button
                      type="button"
                      key={count}
                      onClick={() => setGuestCount(count)}
                      className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold border transition-all ${
                        guestCount === count
                          ? 'bg-amber-400 text-[#3D0A14] border-amber-300 shadow-sm'
                          : 'bg-[#3D0A14]/70 border-[#D4AF37]/25 text-amber-200 hover:bg-[#4D0D19]'
                      }`}
                    >
                      {count} Pax
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Event Date & Slot Timing */}
              <div>
                <label className="text-[11px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-[#3D0A14] flex items-center justify-center text-[10px] font-black">4</span>
                  Auspicious Date & Celebration Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-[10px] text-amber-200/80 uppercase font-bold tracking-wider mb-1">
                      Choose Desired Date
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#3D0A14]/90 border border-[#D4AF37]/40 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-amber-200/80 uppercase font-bold tracking-wider mb-1">
                      Muhurtham Season Notice
                    </label>
                    <div className="px-3.5 py-3 rounded-2xl bg-[#4D0D19]/80 border border-[#D4AF37]/35 flex items-center gap-2 text-xs text-amber-200">
                      <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>2026-2027 Auspicious Muhurtham Dates Open</span>
                    </div>
                  </div>
                </div>

                {/* Segmented Slot Selector Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {slotOptions.map((opt) => {
                    const isSelected = slot === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setSlot(opt.id)}
                        className={`p-3 rounded-2xl text-left border transition-all ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#5A1220] to-[#7A192C] border-amber-400 shadow-[0_0_12px_rgba(212,175,55,0.35)] ring-1 ring-amber-400'
                            : 'bg-[#3D0A14]/70 border-[#D4AF37]/25 hover:border-[#D4AF37]/50 hover:bg-[#4D0D19]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            {opt.badge}
                          </span>
                        </div>
                        <h4 className="font-cinzel text-xs font-bold text-white mt-1">
                          {opt.title}
                        </h4>
                        <p className="text-[11px] text-amber-300 font-semibold mt-0.5">
                          {opt.time}
                        </p>
                        <p className="text-[9px] text-amber-100/60 mt-1">
                          {opt.note}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Curated Catering Menu Experience */}
              <div>
                <label className="text-[11px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-[#3D0A14] flex items-center justify-center text-[10px] font-black">5</span>
                  Catering & Banquet Dining Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {menuTiers.map((tier) => {
                    const isSelected = menuChoice === tier.id;
                    return (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => setMenuChoice(tier.id)}
                        className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#5A1220] to-[#7A192C] border-amber-400 shadow-[0_0_12px_rgba(212,175,55,0.35)] ring-1 ring-amber-400'
                            : 'bg-[#3D0A14]/70 border-[#D4AF37]/25 hover:border-[#D4AF37]/50 hover:bg-[#4D0D19]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-cinzel text-xs font-bold text-white">
                              {tier.name}
                            </span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                              {tier.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-amber-100/70 leading-relaxed mt-1">
                            {tier.items}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs sm:text-sm tracking-[0.16em] uppercase shadow-[0_4px_25px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2 group hover:scale-[1.01] hover:brightness-110 cursor-pointer border border-[#FFF9E6]"
              >
                <MessageSquare className="w-5 h-5 text-[#3D0A14] group-hover:scale-110 transition-transform" />
                <span>Generate Official WhatsApp Booking Pass</span>
              </button>
            </form>
          </div>

          {/* Right Column: Ultra-Luxury VIP Palace Reservation Boarding Pass */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="rounded-[32px] border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#350710] to-[#25040B] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden text-white backdrop-blur-xl">
              {/* Gold Watermark Crest Overlay */}
              <div className="absolute -top-10 -right-10 w-48 h-48 opacity-10 pointer-events-none rounded-full overflow-hidden">
                <img
                  src="/assets/01_brand_and_logos/ss_convention_royal_gold_crest_emblem.jpeg"
                  alt="Watermark Crest"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Pass Header */}
              <div className="border-b-2 border-dashed border-[#D4AF37]/35 pb-5 mb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-400 text-[#3D0A14] uppercase tracking-wider font-cinzel">
                      VIP Reservation Pass
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-300 tracking-[0.2em] uppercase">
                    SS CONVENTION
                  </span>
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {eventType}
                </h3>
                <p className="text-xs text-amber-100/80 font-normal mt-1">
                  Prospective Host: <strong className="text-amber-300 font-bold">{clientName || 'Honored Guest'}</strong>
                </p>
              </div>

              {/* Recommended Hall Card Preview with Real Image */}
              <div className="mb-5 rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-[#420A15]/80 shadow-md">
                <div className="relative h-36 w-full overflow-hidden group">
                  <img
                    src={currentHall.image}
                    alt={currentHall.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/75 border border-[#D4AF37]/60 text-amber-300 text-[9px] font-bold tracking-wider uppercase backdrop-blur-sm">
                    Recommended Space
                  </div>
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                      {currentHall.name}
                    </h4>
                    <p className="text-[10px] text-amber-200">
                      {currentHall.type} • {currentHall.capacityTag}
                    </p>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between border-t border-[#D4AF37]/25 text-xs">
                  <span className="text-amber-200/80 text-[11px] leading-tight pr-2">
                    {currentHall.description}
                  </span>
                  <Link
                    to={currentHall.path}
                    className="flex-shrink-0 text-[10px] font-bold text-amber-300 hover:text-white flex items-center gap-1 uppercase tracking-wider underline underline-offset-2"
                  >
                    <span>View Hall Specs</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Live Specifications Matrix */}
              <div className="space-y-3 mb-6 text-xs font-normal">
                <div className="flex items-center justify-between py-1.5 border-b border-[#D4AF37]/15">
                  <span className="text-amber-200/70 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    Guest Capacity:
                  </span>
                  <span className="font-bold text-amber-300">{guestCount} Guests</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#D4AF37]/15">
                  <span className="text-amber-200/70 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Selected Slot:
                  </span>
                  <span className="font-bold text-amber-300 text-right">{slot.split('(')[0]}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#D4AF37]/15">
                  <span className="text-amber-200/70 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    Target Date:
                  </span>
                  <span className="font-bold text-amber-300">
                    {eventDate ? new Date(eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Date To Be Confirmed'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-amber-200/70 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-amber-400" />
                    Catering Choice:
                  </span>
                  <span className="font-bold text-amber-300 text-right">{menuChoice}</span>
                </div>
              </div>

              {/* Direct Booking Helpline Card */}
              <div className="p-4 rounded-2xl bg-[#4A0E17]/90 border border-[#D4AF37]/40 shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    Direct Venue Concierge
                  </span>
                  <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                    Instant Connect
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={`tel:${venueData.phones[0].raw}`}
                    className="p-2.5 rounded-xl bg-black/40 border border-[#D4AF37]/30 hover:border-amber-400 text-xs font-bold text-white hover:text-amber-300 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{venueData.phones[0].display}</span>
                    </span>
                    <span className="text-[10px] text-amber-300 font-normal">Primary Booking Line</span>
                  </a>
                  <a
                    href={`tel:${venueData.phones[1].raw}`}
                    className="p-2.5 rounded-xl bg-black/40 border border-[#D4AF37]/30 hover:border-amber-400 text-xs font-bold text-white hover:text-amber-300 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{venueData.phones[1].display}</span>
                    </span>
                    <span className="text-[10px] text-amber-300 font-normal">Secondary Line</span>
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
