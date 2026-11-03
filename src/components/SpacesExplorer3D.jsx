import React, { useState, useRef } from 'react';
import { spacesData } from '../data/spacesData';
import { Users, Snowflake, Sparkles, Check, ArrowUpRight } from 'lucide-react';

export default function SpacesExplorer3D({ onOpenLightbox, lang }) {
  const [activeSpaceId, setActiveSpaceId] = useState(spacesData[0].id);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const currentSpace = spacesData.find((s) => s.id === activeSpaceId) || spacesData[0];

  // 3D Perspective Tilt Handler (Desktop only with pointer discipline)
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4; // max 4deg tilt
    const rotateY = ((x - centerX) / centerX) * 4;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // Interactive Hotspots on the Grand Hall
  const hotspots = [
    { id: 1, top: '22%', left: '48%', label: 'Crystal Chandeliers', desc: 'Dual circular golden crystal chandeliers providing opulent ceiling illumination' },
    { id: 2, top: '15%', left: '82%', label: 'Central Cassette A/C', desc: 'Even multi-directional climate control keeping 500+ guests refreshed' },
    { id: 3, top: '75%', left: '50%', label: 'Polished Italian Floor', desc: 'High-gloss marble reflections magnifying stage decorations and lighting' },
    { id: 4, top: '55%', left: '22%', label: 'VIP Banquet Seating', desc: 'Beige linen slipcovers with royal maroon tied ribbon accents' },
    { id: 5, top: '48%', left: '12%', label: 'Bride & Groom Suites', desc: 'Direct backstage private air-conditioned changing and makeup suites' }
  ];

  return (
    <section id="spaces" className="py-24 relative bg-[#450B17] overflow-hidden text-white border-t border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Spatial Architecture</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4">
            Explore Every Venue Dimension
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed">
            Switch between Hall Vasishta, Hall Agasthya, Hall Koundinya, and our Banquet Dining Hall. Inspect architectural details, central air conditioning, and guest seating ergonomics.
          </p>

          {/* Space Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {spacesData.map((space) => (
              <button
                key={space.id}
                onClick={() => {
                  setActiveSpaceId(space.id);
                  setActiveHotspot(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-cinzel tracking-wider uppercase transition-all duration-300 border ${
                  activeSpaceId === space.id
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] border-amber-300 font-bold shadow-md scale-105'
                    : 'bg-[#3A0813] text-amber-100 hover:bg-[#4D0D19] border-[#D4AF37]/35 shadow-sm'
                }`}
              >
                {space.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Stage Canvas */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="bg-[#3A0813] rounded-[32px] overflow-hidden border-2 border-[#D4AF37]/45 shadow-2xl relative group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* 3D Canvas Image Viewport with Hotspots */}
            <div className="lg:col-span-8 relative min-h-[380px] sm:min-h-[520px] overflow-hidden bg-black">
              <img
                src={currentSpace.image}
                alt={currentSpace.name}
                className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              {/* Interactive Hotspot Pins (Enabled on Hall Vasishta) */}
              {activeSpaceId === 'hall-vasishta' &&
                hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    style={{ top: spot.top, left: spot.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin"
                  >
                    <button
                      onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        activeHotspot === spot.id
                          ? 'bg-[#D4AF37] text-[#3D0A14] scale-125 ring-4 ring-[#D4AF37]/50 shadow-lg'
                          : 'bg-black/80 text-amber-300 hover:scale-110 shadow-lg border border-amber-300/60'
                      }`}
                      aria-label={spot.label}
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>

                    {/* Hotspot Floating Tooltip */}
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 sm:w-64 p-3 rounded-2xl bg-[#3D0A14]/95 text-white backdrop-blur-md border border-[#D4AF37]/60 shadow-2xl text-left pointer-events-none transition-all duration-300 z-30 ${
                        activeHotspot === spot.id
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 translate-y-2 scale-95 hidden group-hover/pin:block group-hover/pin:opacity-100 group-hover/pin:translate-y-0'
                      }`}
                    >
                      <span className="text-[9px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
                        Architecture Detail
                      </span>
                      <h4 className="text-xs font-bold text-white mb-1">
                        {spot.label}
                      </h4>
                      <p className="text-[11px] text-amber-100/90 font-light leading-snug">
                        {spot.desc}
                      </p>
                    </div>
                  </div>
                ))}

              {/* Zoom & Inspection Indicator */}
              <button
                onClick={() => onOpenLightbox(currentSpace.image, currentSpace.name)}
                className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-amber-200 border border-white/30 text-xs font-bold flex items-center gap-1.5 hover:bg-[#7A1F31] hover:text-white shadow-md transition-all"
              >
                <span>Full Screen View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 font-medium text-amber-200">
                  {currentSpace.dimensions}
                </span>
                {activeSpaceId === 'hall-vasishta' && (
                  <span className="bg-[#D4AF37] text-[#3D0A14] px-3 py-1 rounded-full font-bold shadow-md text-[11px]">
                    Click Gold Pins to Inspect
                  </span>
                )}
              </div>
            </div>

            {/* Sidebar Details Column */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#350710] border-t lg:border-t-0 lg:border-l border-[#D4AF37]/30 text-white">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D0D19] border border-[#D4AF37]/35 text-amber-300 text-xs font-bold mb-3">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentSpace.capacityDisplay}</span>
                </div>

                <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
                  {currentSpace.name}
                </h3>
                <p className="text-xs sm:text-sm text-amber-100/85 leading-relaxed mb-6 font-normal">
                  {currentSpace.description}
                </p>

                {/* Architecture Features */}
                <div className="space-y-3 pt-4 border-t border-[#D4AF37]/20">
                  <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
                    Hall Specifications
                  </h4>
                  {(currentSpace.features || currentSpace.highlights || []).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-amber-100/90 font-normal">
                      <div className="w-4 h-4 rounded-full bg-[#4D0D19] border border-[#D4AF37]/40 flex items-center justify-center text-amber-300 flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-amber-400" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Climate & Power Backup Notice */}
              <div className="mt-8 p-4 rounded-2xl bg-[#4D0D19] border border-[#D4AF37]/30">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
                  <Snowflake className="w-4 h-4 text-amber-400" />
                  <span>100% Climate & Power Protection</span>
                </div>
                <p className="text-[11px] text-amber-100/80 font-normal leading-relaxed">
                  All celebration halls, dining floors, and VIP groom/bridal suites feature fully independent central air conditioning with 100% generator power backup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
