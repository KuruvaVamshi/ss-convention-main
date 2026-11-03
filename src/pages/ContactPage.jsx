import React from 'react';
import InteractiveBookingStudio from '../components/InteractiveBookingStudio';
import ContactLocationSection from '../components/ContactLocationSection';
import { Calendar, Compass } from 'lucide-react';

export default function ContactPage({ lang }) {
  const travelDistances = [
    { from: "Karmanghat Ring Road", time: "5 - 7 Minutes", dist: "2.8 km" },
    { from: "LB Nagar Metro Station", time: "10 - 12 Minutes", dist: "5.5 km" },
    { from: "Santosh Nagar / DMRL", time: "12 - 15 Minutes", dist: "6.2 km" },
    { from: "Saroornagar Indoor Stadium", time: "8 - 10 Minutes", dist: "4.1 km" },
    { from: "Chandrayangutta X Roads", time: "15 - 18 Minutes", dist: "7.8 km" },
    { from: "Rajiv Gandhi Intl Airport (RGIA)", time: "30 - 35 Minutes", dist: "21 km" }
  ];

  return (
    <div className="bg-[#450B17] text-white min-h-screen pt-24">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-[#350710] to-[#450B17] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-4 shadow-md backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>Reservations & Location</span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.12em] text-white uppercase mb-4 drop-shadow">
            RESERVE YOUR DATE
          </h1>
          <p className="text-amber-100/80 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            Configure your celebration itinerary below for real-time quotation and WhatsApp inquiry, or visit us in person at Meerpet, Hyderabad.
          </p>
        </div>
      </section>

      {/* Interactive Booking Studio with Confetti & WhatsApp Ticket */}
      <InteractiveBookingStudio lang={lang} />

      {/* Venue Address, Phone Lines & Google Map */}
      <ContactLocationSection lang={lang} />

      {/* Travel Distances & Proximity Guide */}
      <section className="py-24 bg-[#3D0A14] border-t border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-3 shadow-md backdrop-blur-sm">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>Proximity & Connectivity</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-2 drop-shadow">
              Easy Accessibility for Your Guests
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal">
              Strategically situated in Meerpet / Jillelaguda with wide approach roads connecting smoothly from major city hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelDistances.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[22px] bg-[#4A0E17] border-2 border-[#D4AF37]/40 flex items-center justify-between shadow-xl hover:border-amber-400 transition-all text-white"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                    From {item.from}
                  </span>
                  <h4 className="font-cinzel font-bold text-white text-sm mt-0.5">
                    {item.time} Drive
                  </h4>
                </div>
                <span className="text-xs font-bold text-[#3D0A14] bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1.5 rounded-xl border border-amber-400 shadow-md">
                  {item.dist}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
