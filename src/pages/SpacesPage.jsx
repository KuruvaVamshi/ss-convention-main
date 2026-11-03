import React from 'react';
import { Link } from 'react-router-dom';
import SpacesExplorer3D from '../components/SpacesExplorer3D';
import { Building, Eye } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function SpacesPage({ onOpenLightbox, lang }) {
  const comparisonData = [
    {
      name: 'Hall Vasishta',
      capacity: '300–600 Guests',
      area: '5,000+ sq.ft',
      ac: 'Central Cassette A/C',
      idealFor: 'Grand Weddings, Sangeet & Large Receptions',
      keyFeature: 'Lord Venkateswara Foyer, Double-tier Chandeliers & Marble Aisle'
    },
    {
      name: 'Hall Agasthya',
      capacity: '200–300 Guests',
      area: '3,800 sq.ft',
      ac: 'Centralized A/C',
      idealFor: 'Weddings, Receptions, Engagements',
      keyFeature: 'Illuminated Facade, Grand Entry Stairs & Flexible Stage'
    },
    {
      name: 'Hall Koundinya',
      capacity: '100–200 Guests',
      area: '2,200 sq.ft',
      ac: 'High-Speed A/C',
      idealFor: '1st Birthdays, Cradle Ceremonies (Barasala), Sangeet & Corporate',
      keyFeature: 'Wood Slat Ceiling, Designer Chandeliers & Modern Reception'
    },
    {
      name: 'Banquet Dining Hall',
      capacity: '250+ Concurrent Seats',
      area: '3,500 sq.ft',
      ac: 'Dedicated Ventilation & Cooling',
      idealFor: 'Vindhu Bhojanam, Buffets & Traditional Sit-down Feast',
      keyFeature: 'Round Tables with Maroon/Gold Linen & Zero Aroma in Mandap'
    }
  ];

  const spacesGallery = [
    {
      title: 'Hall Vasishta - Chandelier & Seating View',
      category: 'Main Hall',
      image: '/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg'
    },
    {
      title: 'Hall Agasthya - Night Exterior Facade',
      category: 'Entrance & Facade',
      image: '/assets/04_exterior_and_entrance/exterior_night_facade_parking_lighting.jpeg'
    },
    {
      title: 'Hall Koundinya - Modern Reception Desk',
      category: 'Lobby & Reception',
      image: '/assets/05_reception_and_lobby/reception_helpdesk_booking_counter.jpeg'
    },
    {
      title: 'Grand Foyer - Lord Balaji & Buddha Water Fountain',
      category: 'Foyer',
      image: '/assets/05_reception_and_lobby/lobby_buddha_water_fountain_feature.jpeg'
    },
    {
      title: 'Banquet Dining Hall - Round Tables & Gold Bows',
      category: 'Dining Level',
      image: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg'
    },
    {
      title: 'Hall Ceiling & Golden Chandeliers Perspective',
      category: 'Architecture',
      image: '/assets/06_main_hall_seating/main_hall_seating_chandelier_perspective.jpeg'
    }
  ];

  return (
    <div className="bg-[#450B17] text-white min-h-screen pt-24">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-[#350710] to-[#450B17] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-4 shadow-md backdrop-blur-sm">
            <Building className="w-3.5 h-3.5 text-amber-300" />
            <span>Spatial Architecture & Capacity</span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.12em] text-white uppercase mb-4 drop-shadow">
            OUR PREMIUM HALLS
          </h1>
          <p className="text-amber-100/80 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            Designed to offer distinct grandeur and capacity for every auspicious milestone. Explore <strong>Hall Vasishta</strong>, <strong>Hall Agasthya</strong>, <strong>Hall Koundinya</strong>, and our <strong>Banquet Dining Floor</strong>.
          </p>
        </div>
      </section>

      {/* 3D Interactive Perspective Tour with Hotspots */}
      <SpacesExplorer3D onOpenLightbox={onOpenLightbox} lang={lang} />

      {/* Hall Comparison Matrix */}
      <section className="py-24 bg-[#3D0A14] border-t border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-3 drop-shadow">
              Hall Comparison Matrix
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal">
              Select the optimal venue dimensions tailored for your guest count and ceremony rituals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comparisonData.map((hall, idx) => (
              <div
                key={idx}
                className="bg-[#4A0E17] p-6 rounded-[28px] border-2 border-[#D4AF37]/45 flex flex-col justify-between shadow-2xl text-white hover:border-amber-400 transition-all"
              >
                <div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-black/40 border border-[#D4AF37]/35 text-amber-200 uppercase tracking-wider block w-fit mb-3">
                    Zone 0{idx + 1}
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                    {hall.name}
                  </h3>
                  <div className="space-y-2 mb-4 text-xs">
                    <p className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-1 text-amber-100/80">
                      <span>Capacity:</span>
                      <strong className="text-amber-300 font-bold">{hall.capacity}</strong>
                    </p>
                    <p className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-1 text-amber-100/80">
                      <span>Air Conditioning:</span>
                      <strong className="text-amber-300 font-bold">{hall.ac}</strong>
                    </p>
                    <p className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-1 text-amber-100/80">
                      <span>Floor Area:</span>
                      <strong className="text-amber-300 font-bold">{hall.area}</strong>
                    </p>
                  </div>
                  <div className="text-xs text-amber-100/80 mb-3 font-normal leading-relaxed">
                    <strong className="text-amber-300 block mb-0.5 font-bold">Best Suited For:</strong>
                    <span>{hall.idealFor}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/25 text-xs font-normal text-amber-100/90 bg-[#3A0813] p-3 rounded-xl border border-[#D4AF37]/30">
                  <span className="font-bold text-amber-300 block text-[10px] uppercase tracking-wider">Standout Highlight:</span>
                  {hall.keyFeature}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Spaces Photo Showcase */}
      <section className="py-24 bg-[#350710] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide mb-2 drop-shadow">
              Inside Our Architectural Spaces
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal">
              Click any photo to inspect in high-resolution full screen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spacesGallery.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onOpenLightbox(item.image, item.title)}
                className="group relative rounded-[28px] overflow-hidden border-2 border-[#D4AF37]/35 bg-black shadow-xl cursor-pointer hover:border-amber-400 transition-all"
              >
                <div className="h-64 overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-0.5">
                    {item.category}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {item.title}
                  </p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4 text-amber-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Walkthrough Scheduler Banner */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-white text-center border-t border-[#D4AF37]/30 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-3 tracking-wide">
            Want to Walk Through the Halls in Person?
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-sm max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Our venue managers are available 7 days a week to guide you and your family through Hall Vasishta, Hall Agasthya, Hall Koundinya, and the Dining Floor.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              onClick={() => window.triggerBlessings?.()}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Book In-Person Walkthrough
            </Link>
            <a
              href={`tel:${venueData.phones[0].raw}`}
              className="px-8 py-3.5 rounded-full border border-amber-300/60 text-white hover:bg-white/10 font-cinzel font-bold text-xs uppercase tracking-wider transition-all"
            >
              Call Manager (+91 89857 00044)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
