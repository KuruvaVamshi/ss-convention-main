import React, { useState } from 'react';
import { cateringMenus, extraItemCharges } from '../data/menusData';
import { Utensils, Leaf, Drumstick, Check, ArrowRight, FileText, Sparkles, AlertCircle } from 'lucide-react';

export default function MenuExplorer({ onSelectMenu, onOpenLightbox, lang }) {
  const [dietaryType, setDietaryType] = useState('veg'); // 'veg' or 'nonVeg'
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  const activeMenusList = cateringMenus[dietaryType];
  const currentMenu = activeMenusList[selectedMenuIndex] || activeMenusList[0];

  return (
    <section id="menus" className="py-20 lg:py-28 bg-emerald-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>Banquet Catering & Feasts</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-stone-100 tracking-tight mb-4">
            Authentic Flavors, Royal Hospitality
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            From authentic Hyderabadi Dum Biryani and tender Telangana curries to pure ghee South Indian spreads and live noodle stations. Browse our 7 official catering packages.
          </p>

          {/* Primary Dietary Toggle: Veg vs Non-Veg */}
          <div className="inline-flex p-1.5 rounded-full bg-obsidian-900 border border-gold-500/30 shadow-xl mt-8">
            <button
              onClick={() => {
                setDietaryType('veg');
                setSelectedMenuIndex(0);
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                dietaryType === 'veg'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-300" />
              <span>Pure Vegetarian Menus</span>
            </button>
            <button
              onClick={() => {
                setDietaryType('nonVeg');
                setSelectedMenuIndex(0);
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                dietaryType === 'nonVeg'
                  ? 'bg-crimson-700 text-white shadow-lg shadow-crimson-950/60'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Drumstick className="w-4 h-4 text-crimson-300" />
              <span>Non-Vegetarian Banquets</span>
            </button>
          </div>
        </div>

        {/* Tier Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {activeMenusList.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setSelectedMenuIndex(idx)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                selectedMenuIndex === idx
                  ? 'bg-gold-500 text-obsidian-950 border-gold-400 font-bold shadow-md'
                  : 'bg-obsidian-900/90 text-stone-300 hover:text-white border-stone-800 hover:border-gold-500/40'
              }`}
            >
              <span>{m.title}</span>
              <span className="ml-2 text-[10px] opacity-75 font-normal">
                (Min {m.minPax} Pax)
              </span>
            </button>
          ))}
        </div>

        {/* Active Menu Detail Card */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl bg-obsidian-900/90">
          {/* Menu Header Bar */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border-b border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 text-gold-300 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentMenu.badge}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-3xl font-bold text-stone-100">
                {currentMenu.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                Designed for gatherings with a minimum of <strong className="text-gold-300">{currentMenu.minPax} Guests</strong>. Fully customizable.
              </p>
            </div>

            {/* Menu Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenLightbox(currentMenu.image, currentMenu.title)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-obsidian-800 border border-gold-500/30 text-stone-200 text-xs font-semibold hover:bg-obsidian-700 hover:text-gold-300 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-gold-400" />
                <span>View Original Card</span>
              </button>
              <a
                href="#estimator"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gold-shimmer text-obsidian-950 text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md shadow-gold-500/20"
              >
                <span>Select Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Itemized Courses Grid */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentMenu.sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-obsidian-950/70 border border-stone-800/80 hover:border-gold-500/30 transition-colors"
                >
                  <h4 className="text-xs font-bold tracking-wider text-gold-400 uppercase mb-3 pb-2 border-b border-stone-800 flex items-center justify-between">
                    <span>{sec.name}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {sec.items.map((dish, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                        <span className="leading-snug">{dish}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Additional Charges / Rate Card Footer */}
            <div className="mt-8 pt-6 border-t border-stone-800">
              <h4 className="text-xs font-bold tracking-wider text-stone-300 uppercase mb-3 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-gold-400" />
                <span>Official Extra Items Rate Card (Per Head Additional)</span>
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {extraItemCharges.map((item) => (
                  <div
                    key={item.item}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian-950 border border-stone-800 text-xs"
                  >
                    <span className="text-stone-300">{item.item}:</span>
                    <span className="text-gold-300 font-bold">₹{item.price}/-</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

