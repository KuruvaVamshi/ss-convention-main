import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, Snowflake, ArrowRight, Maximize2 } from 'lucide-react';

export default function InteractiveHallCard({ hall, onOpenLightbox, lang }) {
  const [viewMode, setViewMode] = useState('primary'); // 'primary' or 'interior'
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef(null);

  // 3D Tilt calculation (Desktop fine pointer only)
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768 || !window.matchMedia('(pointer: fine)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6deg tilt
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const currentImage = viewMode === 'primary' ? hall.image : (hall.hallImage || hall.image);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#450B17] rounded-[28px] overflow-hidden border-2 border-[#D4AF37]/45 flex flex-col group transition-all duration-300 shadow-2xl hover:border-amber-400 hover:shadow-amber-500/15 relative text-white"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: rotate.x === 0 && rotate.y === 0 ? 'transform 0.5s ease-out' : 'none'
      }}
    >
      {/* Dynamic Cursor Glare Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, rgba(212, 175, 55, 0.25), transparent 70%)`
        }}
      />

      {/* Image Viewport with Dual Perspective Switcher */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
        <img
          src={currentImage}
          alt={hall.name}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90" />

        {/* Interactive Dual-View Perspective Switcher (Top-Right) */}
        {hall.hallImage && (
          <div className="absolute top-3.5 right-3.5 z-20 flex items-center p-1 rounded-full bg-black/75 border border-[#D4AF37]/40 backdrop-blur-md shadow-md">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('primary');
              }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300 ${
                viewMode === 'primary'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] font-bold shadow-sm'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Foyer
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('interior');
              }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300 ${
                viewMode === 'interior'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] font-bold shadow-sm'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Hall View
            </button>
          </div>
        )}

        {/* Lightbox Zoom Button (Top-Left) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox(currentImage, hall.name);
          }}
          aria-label={`Zoom ${hall.name}`}
          className="absolute top-3.5 left-3.5 z-20 w-8 h-8 rounded-full bg-black/75 border border-[#D4AF37]/40 text-amber-300 flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-all duration-300 backdrop-blur-md shadow-md"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Hall Name Overlay */}
        <div className="absolute bottom-4 left-5 right-5 z-20">
          <h3 className="font-cinzel text-2xl font-bold text-white tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            {hall.name}
          </h3>
          <span className="text-[10px] text-amber-200 font-semibold tracking-widest uppercase">
            {viewMode === 'primary' ? 'Entrance / Grand Foyer' : 'Chandelier Marriage Hall'}
          </span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#3A0813] relative z-20 text-white">
        <div>
          {/* Capacity Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 border border-[#D4AF37]/35 text-amber-200 text-xs font-bold tracking-wider mb-2.5 shadow-sm">
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span>{hall.capacityDisplay}</span>
          </div>

          {/* Best For Note */}
          <p className="text-xs text-amber-100/90 font-normal leading-relaxed mb-2">
            <strong className="text-amber-300 font-bold">Best For:</strong> {hall.bestFor}
          </p>

          <p className="text-[11px] text-amber-100/70 font-normal leading-relaxed line-clamp-2">
            {hall.description}
          </p>
        </div>

        {/* Short Description & Link */}
        <div className="pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between">
          <Link
            to="/spaces"
            className="text-xs font-bold tracking-wider text-amber-300 hover:text-white uppercase flex items-center gap-1.5 transition-colors group/link"
          >
            <span>Explore 3D Specs</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform text-amber-400" />
          </Link>
          <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-bold">
            <Snowflake className="w-3 h-3 text-amber-300" />
            <span>Central A/C</span>
          </span>
        </div>
      </div>
    </div>
  );
}
