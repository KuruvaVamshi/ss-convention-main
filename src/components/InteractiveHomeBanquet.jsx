import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SplitHeading from './SplitHeading';
import { Utensils, Leaf, Drumstick, Users, ArrowRight, Maximize2 } from 'lucide-react';
import { cateringMenus } from '../data/menusData';

export default function InteractiveHomeBanquet({ onOpenLightbox, lang }) {
  const [dietaryType, setDietaryType] = useState('nonVeg');
  const [selectedTierIdx, setSelectedTierIdx] = useState(1); // Premium default
  const [guestCount, setGuestCount] = useState(250);
  const [activeDiningPhotoIdx, setActiveDiningPhotoIdx] = useState(0);

  const currentMenus = cateringMenus[dietaryType];
  const activeMenu = currentMenus[selectedTierIdx] || currentMenus[0];
  const activeDishes = activeMenu.sections?.flatMap(s => s.items) || [];

  const diningGallery = [
    {
      src: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg',
      title: 'Swarna Bhojanam – 250+ Round Table Seats',
      tag: 'Round Tables'
    },
    {
      src: '/assets/03_food_and_catering_menus/menu_06_premium_non_veg_200pax.jpeg',
      title: 'Grand Hyderabadi Dum Biryani Feast Spread',
      tag: 'Biryani Feast'
    },
    {
      src: '/assets/03_food_and_catering_menus/menu_03_premium_veg_200pax.jpeg',
      title: 'South Indian Pure Vegetarian Vindhu Bhojanam',
      tag: 'Pure Veg Feast'
    },
    {
      src: activeMenu.image,
      title: `${activeMenu.title} – Official Printed Rate Card`,
      tag: 'Printed Rate Card'
    }
  ];

  const currentPhoto = diningGallery[activeDiningPhotoIdx] || diningGallery[0];

  // Calculate concurrent dining batches (250 capacity)
  const diningBatches = Math.ceil(guestCount / 250);

  return (
    <section className="py-24 bg-[#450B17] relative overflow-hidden border-t border-b border-[#D4AF37]/30 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#3A0813] rounded-[32px] overflow-hidden border-2 border-[#D4AF37]/45 p-6 sm:p-10 lg:p-12 shadow-2xl text-white">
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-3 shadow-md backdrop-blur-sm">
              <Utensils className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'te' ? 'రాయల్ విందు భోజనం' : 'Interactive Banquet Feast Customizer'}</span>
            </div>
            <SplitHeading
              as="h2"
              className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide text-white leading-tight mb-3 drop-shadow"
            >
              {lang === 'te' ? '7 రుచికరమైన క్యాటరింగ్ ప్యాకేజీలు' : '7 Tiered Catering Packages & Dedicated Dining'}
            </SplitHeading>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed">
              {lang === 'te'
                ? 'ప్రత్యేక డైనింగ్ హాల్ (మండపంలో వాసన రాకుండా). ప్రామాణిక హైదరాబాదీ దమ్ బిర్యానీ, ప్యూర్ నెయ్యి స్వీట్లు మరియు వేడి వేడి రోటీలు.'
                : 'Served in our separate banquet dining hall seating over 250 guests concurrently with zero food aroma in the ceremony hall. Customize your feast and guest count interactively.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Customizer Controls (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Veg / Non-Veg Switcher */}
              <div>
                <span className="text-[10px] font-bold text-amber-300 tracking-[0.22em] uppercase block mb-2.5">
                  1. Select Culinary Style
                </span>
                <div className="inline-flex p-1.5 rounded-full bg-[#24050B] border border-[#D4AF37]/40 shadow-sm">
                  <button
                    onClick={() => {
                      setDietaryType('veg');
                      setSelectedTierIdx(0);
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                      dietaryType === 'veg'
                        ? 'bg-emerald-600 text-white shadow-md scale-105'
                        : 'text-emerald-300 hover:text-white'
                    }`}
                  >
                    <Leaf className="w-4 h-4 text-emerald-200" />
                    <span>Pure Veg Feasts</span>
                  </button>
                  <button
                    onClick={() => {
                      setDietaryType('nonVeg');
                      setSelectedTierIdx(1);
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                      dietaryType === 'nonVeg'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] font-bold shadow-md scale-105'
                        : 'text-amber-200 hover:text-white'
                    }`}
                  >
                    <Drumstick className="w-4 h-4" />
                    <span>Hyderabadi Dum Biryani</span>
                  </button>
                </div>
              </div>

              {/* Package Tier Switcher */}
              <div>
                <span className="text-[10px] font-bold text-amber-300 tracking-[0.22em] uppercase block mb-2.5">
                  2. Choose Menu Tier
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {currentMenus.map((menu, idx) => (
                    <button
                      key={menu.id}
                      onClick={() => setSelectedTierIdx(idx)}
                      className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-300 border ${
                        selectedTierIdx === idx
                          ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] border-amber-400 font-bold shadow-md scale-105'
                          : 'bg-[#24050B] text-amber-200 hover:text-white border-[#D4AF37]/35'
                      }`}
                    >
                      <span>{menu.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Guest Count Slider */}
              <div className="p-5 rounded-2xl bg-[#24050B] border border-[#D4AF37]/35">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Guest Count: {guestCount} Guests</span>
                  </span>
                  <span className="text-[11px] text-amber-200 font-bold">
                    {diningBatches === 1 ? '1 Simultaneous Batch' : `${diningBatches} Relaxed Batches (250/batch)`}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-2 bg-[#3A0813] rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-amber-200/70 mt-1 font-mono">
                  <span>50 Guests</span>
                  <span className="font-bold text-amber-300">250 Seats (Dedicated Hall)</span>
                  <span>600 Max Capacity</span>
                </div>
              </div>

              {/* Dishes Preview Pill Grid */}
              <div>
                <span className="text-[10px] font-bold text-amber-300 tracking-[0.22em] uppercase block mb-2.5">
                  Signature Delicacies in {activeMenu.title}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeDishes.slice(0, 10).map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#24050B] border border-[#D4AF37]/30 text-[11px] text-amber-200 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                  {activeDishes.length > 10 && (
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/60 text-[11px] text-amber-300 font-bold">
                      +{activeDishes.length - 10} more items
                    </span>
                  )}
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/menus"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                >
                  <span>View All 7 Printed Rate Cards</span>
                  <ArrowRight className="w-4 h-4 text-[#3D0A14]" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-amber-400 text-amber-300 hover:bg-white/10 font-cinzel font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Get Quote for {guestCount} Guests</span>
                </Link>
              </div>
            </div>

            {/* Dining Hall & Feasts Photo Showcase (Right 5 Cols) */}
            <div className="lg:col-span-5 relative space-y-3">
              <div
                className="rounded-2xl overflow-hidden border-2 border-[#D4AF37]/45 shadow-2xl aspect-[4/3] group cursor-pointer relative bg-black"
                onClick={() => onOpenLightbox(currentPhoto.src, currentPhoto.title)}
              >
                <img
                  key={currentPhoto.src}
                  src={currentPhoto.src}
                  alt={currentPhoto.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80" />

                {/* Floating Lightbox Trigger */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/40 text-white flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-all shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/75 border border-[#D4AF37]/50 text-amber-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                    {currentPhoto.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-5 right-5">
                  <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white drop-shadow">
                    {currentPhoto.title}
                  </h4>
                  <p className="text-[11px] text-amber-100/90 font-light mt-0.5">
                    Click to zoom in 4K resolution
                  </p>
                </div>
              </div>

              {/* 4 Authentic Photo Switcher Strip */}
              <div className="grid grid-cols-4 gap-2">
                {diningGallery.map((photo, idx) => {
                  const isSel = activeDiningPhotoIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveDiningPhotoIdx(idx)}
                      className={`relative rounded-xl overflow-hidden aspect-[4/3] border transition-all ${
                        isSel
                          ? 'border-amber-400 ring-2 ring-amber-400/60 scale-102'
                          : 'border-[#D4AF37]/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.src} alt={photo.tag} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-end p-1">
                        <span className="text-[8px] font-bold text-white uppercase tracking-wider line-clamp-1">
                          {photo.tag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 3 Quick Assurance Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-[#24050B] border border-[#D4AF37]/35 text-center shadow-sm">
                  <span className="block text-[11px] font-bold text-amber-300">250+ Seats</span>
                  <span className="text-[9px] text-amber-200/70">Concurrent</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#24050B] border border-[#D4AF37]/35 text-center shadow-sm">
                  <span className="block text-[11px] font-bold text-amber-300">Zero Odor</span>
                  <span className="text-[9px] text-amber-200/70">Separate Floor</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#24050B] border border-[#D4AF37]/35 text-center shadow-sm">
                  <span className="block text-[11px] font-bold text-amber-300">Pure RO Water</span>
                  <span className="text-[9px] text-amber-200/70">12-Tap Counter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
