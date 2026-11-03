import React, { useState } from 'react';
import { cateringMenus, extraItemCharges } from '../data/menusData';
import { Utensils, Leaf, Drumstick, Sparkles, AlertCircle, Eye, Check } from 'lucide-react';

export default function InteractiveBanquetBuilder({ onSelectMenu, onOpenLightbox, lang }) {
  const [dietaryType, setDietaryType] = useState('nonVeg');
  const [selectedMenuIdx, setSelectedMenuIdx] = useState(1); // Premium Non-Veg default

  const currentList = cateringMenus[dietaryType];
  const currentMenu = currentList[selectedMenuIdx] || currentList[0];

  return (
    <section id="menus" className="py-24 relative bg-[#450B17] overflow-hidden text-white border-t border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Utensils className="w-3.5 h-3.5 text-amber-400" />
            <span>Banquet Catering & Feasts</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4">
            The Royal Feast Experience
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed">
            Feasting is the soul of Indian hospitality. Explore our 7 official catering packages, from traditional pure ghee South Indian spreads to royal Hyderabadi Dum Biryani and mutton specialties.
          </p>

          {/* Master Veg / Non-Veg Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-[#3A0813] border border-[#D4AF37]/40 shadow-xl mt-8">
            <button
              onClick={() => {
                setDietaryType('veg');
                setSelectedMenuIdx(0);
              }}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                dietaryType === 'veg'
                  ? 'bg-emerald-700 text-white shadow-md scale-105'
                  : 'text-amber-200/80 hover:text-white'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-300" />
              <span>Pure Vegetarian Feasts</span>
            </button>
            <button
              onClick={() => {
                setDietaryType('nonVeg');
                setSelectedMenuIdx(1);
              }}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                dietaryType === 'nonVeg'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-bold shadow-md scale-105'
                  : 'text-amber-200/80 hover:text-white'
              }`}
            >
              <Drumstick className="w-4 h-4 text-[#3D0A14]" />
              <span>Non-Vegetarian Banquets</span>
            </button>
          </div>
        </div>

        {/* Tier Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {currentList.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setSelectedMenuIdx(idx)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                selectedMenuIdx === idx
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] border-amber-300 font-bold shadow-lg scale-105'
                  : 'bg-[#3A0813] text-amber-100 hover:bg-[#4D0D19] border-[#D4AF37]/35 shadow-sm'
              }`}
            >
              <span>{m.title}</span>
              <span className="ml-2 text-[10px] opacity-80 font-normal">
                (Min {m.minPax} Pax)
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Master Menu Board */}
        <div className="bg-[#3A0813] rounded-[32px] overflow-hidden border-2 border-[#D4AF37]/45 shadow-2xl">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-[#2E070F] border-b border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4D0D19] border border-[#D4AF37]/40 text-amber-300 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentMenu.badge}</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                {currentMenu.title}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/85 mt-1 font-normal">
                Accommodates a minimum of <strong className="text-amber-300">{currentMenu.minPax} Guests</strong>. Includes complete service, crockery & linen.
              </p>
            </div>

            {/* View Printed Physical Card Button */}
            {currentMenu.image && (
              <button
                onClick={() => onOpenLightbox(currentMenu.image, `${currentMenu.title} - Official Printed Card`)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-[#4D0D19] hover:bg-[#D4AF37] hover:text-[#3D0A14] text-amber-200 text-xs font-bold transition-all shadow-md flex-shrink-0"
              >
                <Eye className="w-4 h-4 text-amber-300" />
                <span>View Printed Menu Card</span>
              </button>
            )}
          </div>

          {/* Menu Sections Layout */}
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentMenu.sections?.map((section, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 rounded-2xl bg-[#4D0D19] border border-[#D4AF37]/35 flex flex-col justify-between"
                >
                  <div>
                    <h5 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-3 pb-2 border-b border-[#D4AF37]/25 flex items-center justify-between">
                      <span>{section.name}</span>
                      <span className="text-[10px] text-amber-400 font-bold">Course 0{sIdx + 1}</span>
                    </h5>
                    <ul className="space-y-1.5">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-amber-100/90">
                          <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Item Charges Section */}
            <div className="mt-12 pt-8 border-t border-[#D4AF37]/25">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h4 className="font-cinzel text-lg font-bold text-white">
                    Optional Add-Ons & Extra Item Charges
                  </h4>
                  <p className="text-xs text-amber-100/80 font-normal">
                    Add royal delicacies to any menu package at fixed per-plate rates.
                  </p>
                </div>
                <button
                  onClick={() => onOpenLightbox('/assets/03_food_and_catering_menus/menu_02_standard_veg_100pax_with_policies.jpeg', 'Official Extra Items Rate Card')}
                  className="text-xs font-bold text-amber-300 hover:text-white underline flex items-center gap-1 self-start sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Rate Card Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {extraItemCharges.map((extra, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#4D0D19] border border-[#D4AF37]/30 text-center flex flex-col justify-between"
                  >
                    <span className="text-xs font-semibold text-amber-100 leading-tight mb-2">
                      {extra.item}
                    </span>
                    <span className="text-xs font-extrabold text-amber-300 bg-[#2E070F] py-1 px-2 rounded-lg border border-[#D4AF37]/35 shadow-sm">
                      +₹{extra.price}/plate
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Hygiene Policy Note */}
            <div className="mt-8 p-4 rounded-2xl bg-[#2E070F] border border-amber-500/40 text-amber-100/90 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed font-normal">
                <strong className="text-amber-300 font-bold block mb-0.5">
                  Dining & Hygiene Policy:
                </strong>
                All meals must be consumed on venue premises only in the dedicated banquet dining hall. Packing of food outside is strictly prohibited to ensure hygiene and food safety standards.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
