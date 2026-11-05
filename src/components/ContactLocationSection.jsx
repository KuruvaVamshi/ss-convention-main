import React from 'react';
import { MapPin, Phone, Clock, Navigation, Car } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function ContactLocationSection({ lang }) {
  return (
    <section id="contact" className="py-24 relative bg-[#3D0A14] text-white border-t border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A0E17] border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Visit Our Venue</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4">
            Centrally Located in Meerpet, Hyderabad
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed">
            Conveniently accessible with smooth connecting roads, on-premise car parking, and an illuminated grand entrance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#350710] p-6 sm:p-8 rounded-[32px] border-2 border-[#D4AF37]/40 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-2xl font-bold text-white mb-1">
                  S.S CONVENTION A/C
                </h3>
                <p className="text-xs text-amber-300 font-bold uppercase tracking-[0.2em]">
                  Wedding & Banquet Halls
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#4D0D19] border border-[#D4AF37]/35 flex items-center justify-center text-amber-300 flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                    Venue Address
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-100/85 mt-0.5 leading-snug font-normal">
                    {venueData.address.line1}, {venueData.address.locality}, {venueData.address.city}, Telangana – {venueData.address.pincode}
                  </p>
                </div>
              </div>

              {/* Direct Booking Phones */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#4D0D19] border border-[#D4AF37]/35 flex items-center justify-center text-amber-300 flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                    Direct Booking & Inquiries
                  </h4>
                  <div className="flex flex-col gap-1 mt-1">
                    {venueData.phones.map((phone) => (
                      <a
                        key={phone.raw}
                        href={`tel:${phone.raw}`}
                        className="text-sm font-bold text-amber-300 hover:text-white hover:underline transition-colors flex items-center gap-1.5"
                      >
                        <span>{phone.display}</span>
                        {phone.primary && <span className="text-[10px] bg-amber-400 text-[#3D0A14] px-2 py-0.5 rounded-full font-bold">(Primary)</span>}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#4D0D19] border border-[#D4AF37]/35 flex items-center justify-center text-amber-300 flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                    Party Slot Hours
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-100/85 mt-0.5 font-normal leading-relaxed">
                    <strong className="text-amber-300">Lunch Slots:</strong> Must be vacated by 03:00 PM <br />
                    <strong className="text-amber-300">Dinner Slots:</strong> Must be vacated by 11:00 PM
                  </p>
                </div>
              </div>

              {/* Parking feature */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#4D0D19] border border-[#D4AF37]/35 flex items-center justify-center text-amber-300 flex-shrink-0 mt-0.5">
                  <Car className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                    Ample Parking Space
                  </h4>
                  <p className="text-xs text-amber-100/85 mt-0.5 font-normal">
                    Dedicated on-premises 4-wheeler and 2-wheeler parking with 24/7 CCTV surveillance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D4AF37]/25">
              <a
                href={venueData.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:brightness-110"
              >
                <Navigation className="w-4 h-4 text-[#3D0A14]" />
                <span>Open in Google Maps for Navigation</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Frame */}
          <div className="lg:col-span-7 rounded-[32px] overflow-hidden border-2 border-[#D4AF37]/45 shadow-2xl min-h-[420px] relative bg-[#2E070F] flex flex-col">
            {venueData.googleMapsEmbedUrl ? (
              <iframe
                title="SS Convention Hall Meerpet Map"
                src={venueData.googleMapsEmbedUrl}
                className="w-full h-full min-h-[440px] flex-1 border-0 rounded-[30px]"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="w-full h-full min-h-[440px] flex flex-col items-center justify-center p-8 text-center bg-[#2E070F]">
                <MapPin className="w-12 h-12 text-amber-400 mb-3 animate-bounce" />
                <h4 className="font-cinzel text-xl font-bold text-white mb-2">
                  SS Convention Hall
                </h4>
                <p className="text-sm text-amber-100/80 max-w-md mb-6">
                  {venueData.address.full}
                </p>
                <a
                  href={venueData.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110"
                >
                  Open in Google Maps App
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
