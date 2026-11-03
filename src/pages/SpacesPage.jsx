import React from 'react';
import { Link } from 'react-router-dom';
import SpacesExplorer3D from '../components/SpacesExplorer3D';
import { spacesData } from '../data/spacesData';
import { venueData } from '../data/venueData';
import { Building, Eye, ArrowRight, Users, Snowflake, Sparkles } from 'lucide-react';

export default function SpacesPage({ onOpenLightbox, lang }) {
  const comparisonData = [
    {
      id: 'hall-vasishta',
      name: 'Hall Vasishta',
      capacity: '300–600 Guests',
      area: '5,500+ sq.ft',
      ac: 'Central Cassette A/C',
      idealFor: 'Grand Weddings, Sangeet & Large Receptions',
      keyFeature: 'Double-tier Crystal Chandeliers, 70-ft Central Aisle & Carved Mandap'
    },
    {
      id: 'hall-agasthya',
      name: 'Hall Agasthya',
      capacity: '200–350 Guests',
      area: '3,800 sq.ft',
      ac: 'Centralized Multi-Zone A/C',
      idealFor: 'Sangeet Nights, Engagements & Chic Receptions',
      keyFeature: 'Acoustic Ceiling, Stage Theatrical Lighting & Dynamic Layout'
    },
    {
      id: 'hall-koundinya',
      name: 'Hall Koundinya',
      capacity: '100–200 Guests',
      area: '2,200 sq.ft',
      ac: 'Dual Silent Cassette A/C',
      idealFor: '1st Birthdays, Cradle Ceremonies (Barasala), Upanayanam & Corporate',
      keyFeature: 'Wood Slat Ceiling, Milestone Stage Platform & Cozy Ambiance'
    },
    {
      id: 'dining-hall',
      name: 'Banquet Dining Hall',
      capacity: '250+ Concurrent Seats',
      area: '3,500 sq.ft',
      ac: 'Industrial Odor-Evacuation Ventilation',
      idealFor: 'Traditional Vindhu Bhojanam, Buffets & Feasts',
      keyFeature: 'Separate Dedicated Floor (Zero Aroma in Mandap) & Round Tables'
    }
  ];

  // Verified Actual Interior Photography Only
  const spacesGallery = [
    {
      title: 'Hall Vasishta – Grand Overview, Chandeliers & Aisle',
      category: 'Main Kalyana Mandapam',
      image: '/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg'
    },
    {
      title: 'Hall Agasthya – Ceiling Illumination & Stage Perspective',
      category: 'Sangeet & Reception Hall',
      image: '/assets/06_main_hall_seating/main_hall_seating_chandelier_perspective.jpeg'
    },
    {
      title: 'Hall Koundinya – Central Aisle & Milestone Celebration Stage',
      category: 'Intimate Banquet Hall',
      image: '/assets/06_main_hall_seating/mini_hall_seating_central_aisle_stage.jpeg'
    },
    {
      title: 'Swarna Bhojanam – Round Banquet Tables with Damask Linens',
      category: 'Dedicated Dining Floor',
      image: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg'
    },
    {
      title: 'Hall Vasishta – Traditional Wedding Mandap with Carved Gold Pillars',
      category: 'Ceremonial Stage',
      image: '/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_carved_pillars.jpeg'
    },
    {
      title: 'Hall Agasthya – Modern Floral Ring Arch & Velvet Sofa Stage',
      category: 'Evening Reception Decor',
      image: '/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg'
    }
  ];

  return (
    <div className="bg-[#450B17] text-white min-h-screen pt-20 selection:bg-[#D4AF37] selection:text-[#3A0813]">
      {/* Page Header */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-[#350710] to-[#450B17] border-b border-[#D4AF37]/30 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/45 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-md backdrop-blur-sm">
            <Building className="w-3.5 h-3.5 text-amber-400" />
            <span>Dedicated Luxury Venues</span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.14em] text-white uppercase mb-4 drop-shadow">
            OUR PREMIER HALLS
          </h1>
          <p className="text-amber-100/90 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-light">
            Every celebration requires its own distinct identity, spatial acoustic balance, and capacity. Explore our four purpose-designed venues—each equipped with centralized air conditioning, authentic interior craftsmanship, and dedicated amenities.
          </p>
        </div>
      </section>

      {/* ========================================================
          1. INDIVIDUAL HALL EXPERIENCE SHOWCASE (DEDICATED CARDS)
          ======================================================== */}
      <section className="py-24 bg-[#3D0A14] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Distinct Venues</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-3">
              Explore Each Dedicated Hall
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm md:text-base font-light">
              Click any hall to view high-resolution photography, stage dimensions, technical specifications, and custom booking options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {spacesData.map((hall, idx) => (
              <div
                key={hall.id}
                className="bg-[#480E19] rounded-[28px] overflow-hidden border-2 border-[#D4AF37]/35 flex flex-col group hover:border-amber-400 hover:shadow-[0_10px_35px_rgba(212,175,55,0.18)] transition-all duration-300 shadow-2xl"
              >
                {/* Real Interior Photography */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-black">
                  <img
                    src={hall.hallImage || hall.image}
                    alt={hall.name}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A0813] via-black/35 to-transparent opacity-90" />

                  {/* Capacity Pill (Top-Right) */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-black/80 border border-[#D4AF37]/50 text-amber-300 backdrop-blur-md shadow-md flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>{hall.capacity}</span>
                    </span>
                  </div>

                  {/* Lightbox Zoom Button (Top-Left) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(hall.hallImage || hall.image, hall.name);
                    }}
                    aria-label={`Zoom ${hall.name}`}
                    className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/80 border border-[#D4AF37]/50 text-amber-300 flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-all backdrop-blur-md shadow-md"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Hall Name & Tagline */}
                  <div className="absolute bottom-5 left-6 right-6 z-10">
                    <span className="text-xs font-bold tracking-widest text-amber-300 uppercase block mb-1">
                      {hall.tagline || 'Royal Hall'}
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide drop-shadow-md">
                      {hall.name}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 bg-[#3A0813]">
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-amber-100/90 font-light leading-relaxed">
                      {hall.shortDescription || hall.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-black/30 p-4 rounded-xl border border-[#D4AF37]/20">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-amber-300/80 block">Capacity</span>
                        <strong className="text-white font-semibold">{(hall.capacityDisplay || hall.capacity || '').split('(')[0]}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-amber-300/80 block">Dimensions</span>
                        <strong className="text-white font-semibold">{(hall.dimensions || '').split('•')[0]}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between">
                    <Link
                      to={`/halls/${hall.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-[0.16em] hover:scale-105 transition-all shadow-md"
                    >
                      <span>Explore Dedicated Hall</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-200/90 font-medium">
                      <Snowflake className="w-3.5 h-3.5 text-amber-400" />
                      <span>Central A/C</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Interactive Perspective Tour with Hotspots */}
      <SpacesExplorer3D onOpenLightbox={onOpenLightbox} lang={lang} />

      {/* ========================================================
          2. HALL COMPARISON MATRIX
          ======================================================== */}
      <section className="py-24 bg-[#3D0A14] border-t border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-3 drop-shadow">
              Hall Comparison Matrix
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal">
              Compare spatial dimensions, air-conditioning specifications, and optimal guest counts side-by-side.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comparisonData.map((hall, idx) => (
              <div
                key={idx}
                className="bg-[#4A0E17] p-6 rounded-[24px] border border-[#D4AF37]/35 flex flex-col justify-between shadow-2xl text-white hover:border-amber-400 transition-all"
              >
                <div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-black/40 border border-[#D4AF37]/35 text-amber-300 uppercase tracking-wider block w-fit mb-3">
                    Venue 0{idx + 1}
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

                <div className="space-y-3 pt-3 border-t border-[#D4AF37]/25">
                  <div className="text-xs font-normal text-amber-100/90 bg-[#3A0813] p-3 rounded-xl border border-[#D4AF37]/30">
                    <span className="font-bold text-amber-300 block text-[10px] uppercase tracking-wider">Highlight:</span>
                    {hall.keyFeature}
                  </div>

                  <Link
                    to={`/halls/${hall.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-amber-400/60 hover:bg-amber-400 hover:text-[#3D0A14] text-amber-300 font-cinzel font-bold text-[11px] uppercase tracking-wider transition-all"
                  >
                    <span>View Hall Specs</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. AUTHENTIC INTERIOR PHOTOGRAPHY GALLERY
          ======================================================== */}
      <section className="py-24 bg-[#350710] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide mb-2 drop-shadow">
              Inside Our Architectural Spaces
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-light">
              Verified interior photographs of our wedding mandap stages, reception settings, chandeliers, and dining banquet floor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spacesGallery.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onOpenLightbox(item.image, item.title)}
                className="group relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/35 bg-black shadow-xl cursor-pointer hover:border-amber-400 transition-all"
              >
                <div className="h-64 overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-85" />
                <div className="absolute bottom-4 left-4 right-4">
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
