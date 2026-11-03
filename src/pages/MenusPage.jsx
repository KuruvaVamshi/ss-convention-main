import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveBanquetBuilder from '../components/InteractiveBanquetBuilder';
import { Utensils, FileText, Eye, MessageSquare } from 'lucide-react';
import { venueData } from '../data/venueData';

export default function MenusPage({ onOpenLightbox, lang }) {
  const allPrintedCards = [
    {
      title: "Menu 01 • Regular Veg (Min 100 Pax)",
      image: "/assets/03_food_and_catering_menus/menu_01_regular_veg_100pax.jpeg",
      desc: "Authentic South Indian spread with Bagara Rice, Paneer Curry, Sambar & Sweet."
    },
    {
      title: "Menu 02 • Standard Veg (Min 100 Pax)",
      image: "/assets/03_food_and_catering_menus/menu_02_standard_veg_100pax_with_policies.jpeg",
      desc: "Includes Veg Biryani, Mirchi Ka Salan, Paneer Butter Masala, Roti & Dessert."
    },
    {
      title: "Menu 03 • Premium Veg (Min 200 Pax)",
      image: "/assets/03_food_and_catering_menus/menu_03_premium_veg_200pax.jpeg",
      desc: "Expansive 14-item vegetarian feast with Ghee Sweets, Paneer Delicacies & Live Curries."
    },
    {
      title: "Menu 04 • Special Veg with Noodles (Min 250 Pax)",
      image: "/assets/03_food_and_catering_menus/menu_04_special_veg_250pax_noodles.jpeg",
      desc: "Grand feast featuring Veg Hakka Noodles, Manchurian, Biryani & Ice Cream."
    },
    {
      title: "Menu 05 • Standard Non-Veg (Min 100 Pax)",
      image: "/assets/03_food_and_catering_menus/menu_05_standard_non_veg_100pax.jpeg",
      desc: "Authentic Hyderabadi Chicken Dum Biryani with Chicken Curry & Double Ka Meeta."
    },
    {
      title: "Menu 06 • Premium Non-Veg (Min 200 Pax)",
      image: "/assets/03_food_and_catering_menus/menu_06_premium_non_veg_200pax.jpeg",
      desc: "Our most popular package: Chicken Dum Biryani, Mutton Curry, Rumali Roti & Gulab Jamun."
    },
    {
      title: "Menu 07 • Special Non-Veg Royal (Min 250 Pax)",
      image: "/assets/03_food_and_catering_menus/menu_07_special_non_veg_250pax.jpeg",
      desc: "The ultimate royal feast: Mutton Dum Biryani, Fish Fry, Chicken Curry, Roti & Ice Cream."
    },
    {
      title: "Extra Items & Add-Ons Rate Card",
      image: "/assets/03_food_and_catering_menus/menu_02_standard_veg_100pax_with_policies.jpeg",
      desc: "Transparent per-plate rates for Mutton Dalcha, Boti Curry, Fish Fry & Live Counters."
    }
  ];

  const culinaryPillars = [
    {
      title: "Separate Dining Floor",
      desc: "Our dining hall is situated on a dedicated level away from the sacred mandap. This keeps the marriage hall completely odor-free and immaculate for poojas."
    },
    {
      title: "250+ Concurrent Seats",
      desc: "Equipped with round tables draped in royal maroon and gold linen, accommodating over 250 guests simultaneously so nobody waits in queue."
    },
    {
      title: "Hygienic Modern Kitchen",
      desc: "Direct access to commercial food warmers, sanitized serving utensils, filtered water stations, and dedicated hand-wash areas."
    },
    {
      title: "Fresh Quality Ingredients",
      desc: "Prepared using farm-fresh vegetables, premium long-grain Basmati rice, and authentic Indian spices ground fresh for each banquet."
    }
  ];

  return (
    <div className="bg-[#450B17] text-white min-h-screen pt-24">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-[#350710] to-[#450B17] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-4 shadow-md backdrop-blur-sm">
            <Utensils className="w-3.5 h-3.5 text-amber-300" />
            <span>Banquet Catering & Menus</span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.12em] text-white uppercase mb-4 drop-shadow">
            ROYAL FEAST & BANQUETS
          </h1>
          <p className="text-amber-100/80 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            In Indian tradition, a celebration is remembered by the feast. S.S Convention A/C presents 7 official tiered catering packages with transparent dish listings, pure ghee South Indian meals, and royal Hyderabadi Dum Biryani banquets.
          </p>
        </div>
      </section>

      {/* Interactive Master Banquet Menu Studio */}
      <InteractiveBanquetBuilder onOpenLightbox={onOpenLightbox} lang={lang} />

      {/* Official Printed Menu Cards Showcase */}
      <section className="py-24 bg-[#3D0A14] border-t border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-3 shadow-md backdrop-blur-sm">
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span>Official Printed Menu Cards</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-3 drop-shadow">
              Authentic Physical Menu Cards
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal">
              We believe in 100% transparency. Click any printed menu card below to view the official scanned card photograph in full high resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allPrintedCards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => onOpenLightbox(card.image, card.title)}
                className="group rounded-[28px] overflow-hidden border-2 border-[#D4AF37]/45 bg-[#4A0E17] shadow-2xl transition-all cursor-pointer flex flex-col justify-between hover:border-amber-400 text-white"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-black">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[#3D0A14] bg-gradient-to-r from-amber-400 to-amber-500 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-md flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Enlarge Card</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-5 bg-[#3A0813]">
                    <h3 className="font-cinzel text-xs font-bold text-white mb-1 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-amber-100/75 font-normal line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 bg-[#3A0813]">
                  <span className="text-[10px] font-bold text-amber-300 flex items-center justify-between border-t border-[#D4AF37]/25 pt-2.5">
                    <span>Inspect Full Dish List</span>
                    <Eye className="w-3 h-3 text-amber-400" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Culinary Standards */}
      <section className="py-24 bg-[#350710] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-3 drop-shadow">
              The 4 Pillars of Our Dining Experience
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal">
              Thoughtfully engineered to give your guests an effortless, royal dining experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culinaryPillars.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-[#4A0E17] border-2 border-[#D4AF37]/40 shadow-2xl flex flex-col justify-between text-white hover:border-amber-400 transition-all"
              >
                <div>
                  <span className="w-8 h-8 rounded-full bg-[#24050B] border border-[#D4AF37]/40 flex items-center justify-center text-xs font-bold text-amber-300 mb-4">
                    0{idx + 1}
                  </span>
                  <h3 className="font-cinzel text-base font-bold text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-amber-100/80 font-normal leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering Inquiry CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-white text-center border-t border-[#D4AF37]/30 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-3 tracking-wide">
            Want to Customize Your Celebration Menu?
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-sm max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Our catering managers are happy to adjust spice levels, substitute dishes, or add specialty live dessert counters to your package.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${venueData.whatsappNumber}?text=${encodeURIComponent('Hello SS Convention Hall, I would like to get a catering quote for my event.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#3D0A14]" />
              <span>Request Catering Quote on WhatsApp</span>
            </a>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full border border-amber-300/60 text-white hover:bg-white/10 font-cinzel font-bold text-xs uppercase tracking-wider transition-all"
            >
              Open Booking Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
