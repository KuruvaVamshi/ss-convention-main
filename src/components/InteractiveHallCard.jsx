import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Snowflake, ArrowRight, Maximize2, Sparkles, Building } from 'lucide-react';

export default function InteractiveHallCard({ hall, onOpenLightbox, lang }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef(null);
  const navigate = useNavigate();

  // 3D Subtle Tilt calculation (Desktop fine pointer only)
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768 || !window.matchMedia('(pointer: fine)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const hallUrl = `/halls/${hall.id}`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#450B17] rounded-[26px] overflow-hidden border border-[#D4AF37]/35 flex flex-col group transition-all duration-300 shadow-2xl hover:border-amber-400 hover:shadow-[0_10px_35px_rgba(212,175,55,0.18)] relative text-white"
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

      {/* Actual Interior Photo Viewport */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
        <img
          src={hall.hallImage || hall.image}
          alt={hall.name}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A0813] via-black/30 to-transparent opacity-90" />

        {/* Capacity Tag at Top-Right */}
        <div className="absolute top-3.5 right-3.5 z-20">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-black/75 border border-[#D4AF37]/40 text-amber-300 backdrop-blur-md shadow-md flex items-center gap-1.5">
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
          className="absolute top-3.5 left-3.5 z-20 w-8 h-8 rounded-full bg-black/75 border border-[#D4AF37]/40 text-amber-300 flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-all duration-300 backdrop-blur-md shadow-md"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Hall Name & Tagline Overlay */}
        <div className="absolute bottom-4 left-5 right-5 z-20">
          <span className="text-[10px] text-amber-300 font-bold tracking-widest uppercase block mb-1">
            {hall.tagline || 'Royal Hall'}
          </span>
          <h3 className="font-cinzel text-2xl font-bold text-white tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            {hall.name}
          </h3>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#3A0813] relative z-20 text-white">
        <div>
          {/* Best For Note */}
          <div className="mb-2 text-xs text-amber-100/90 font-light">
            <span className="text-amber-300 font-semibold uppercase tracking-wider text-[11px] block mb-0.5">
              Ideal Occasions:
            </span>
            <span>{hall.bestFor}</span>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-amber-100/75 font-light leading-relaxed line-clamp-3">
            {hall.shortDescription || hall.description}
          </p>
        </div>

        {/* Features Preview Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#D4AF37]/20 text-[11px]">
          <span className="inline-flex items-center gap-1 text-amber-200/90">
            <Snowflake className="w-3 h-3 text-amber-300" />
            <span>Central A/C</span>
          </span>
          <span className="text-amber-400/40">•</span>
          <span className="inline-flex items-center gap-1 text-amber-200/90">
            <Building className="w-3 h-3 text-amber-300" />
            <span>{hall.dimensions.split('•')[0] || 'Spacious'}</span>
          </span>
        </div>

        {/* Action Link: Dedicated Hall Detail Page */}
        <div className="pt-2">
          <Link
            to={hallUrl}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-[0.16em] hover:scale-[1.02] shadow-lg transition-all group/btn"
          >
            <span>Explore Hall Experience</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
