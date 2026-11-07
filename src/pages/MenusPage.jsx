import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Leaf, Drumstick, Eye, MessageSquare, AlertCircle, Users } from 'lucide-react';
import { cateringMenus } from '../data/menusData';
import { venueData } from '../data/venueData';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';


const printedCards = [
  { title: 'Menu 01 • Regular Veg (Min 100 Pax)', image: '/assets/03_food_and_catering_menus/menu_01_regular_veg_100pax.jpeg', desc: 'Authentic South Indian spread with Bagara Rice, Paneer Curry, Sambar & Sweet.' },
  { title: 'Menu 02 • Standard Veg (Min 100 Pax)', image: '/assets/03_food_and_catering_menus/menu_02_standard_veg_100pax_with_policies.jpeg', desc: 'Includes Veg Biryani, Mirchi Ka Salan, Paneer Butter Masala, Roti & Dessert.' },
  { title: 'Menu 03 • Premium Veg (Min 200 Pax)', image: '/assets/03_food_and_catering_menus/menu_03_premium_veg_200pax.jpeg', desc: 'Expansive 14-item vegetarian feast with Ghee Sweets, Paneer Delicacies & Live Curries.' },
  { title: 'Menu 04 • Special Veg with Noodles (Min 250 Pax)', image: '/assets/03_food_and_catering_menus/menu_04_special_veg_250pax_noodles.jpeg', desc: 'Grand feast featuring Veg Hakka Noodles, Manchurian, Biryani & Ice Cream.' },
  { title: 'Menu 05 • Standard Non-Veg (Min 100 Pax)', image: '/assets/03_food_and_catering_menus/menu_05_standard_non_veg_100pax.jpeg', desc: 'Authentic Hyderabadi Chicken Dum Biryani with Chicken Curry & Double Ka Meeta.' },
  { title: 'Menu 06 • Premium Non-Veg (Min 200 Pax)', image: '/assets/03_food_and_catering_menus/menu_06_premium_non_veg_200pax.jpeg', desc: 'Our most popular package: Chicken Dum Biryani, Mutton Curry, Rumali Roti & Gulab Jamun.' },
  { title: 'Menu 07 • Special Non-Veg Royal (Min 250 Pax)', image: '/assets/03_food_and_catering_menus/menu_07_special_non_veg_250pax.jpeg', desc: 'The ultimate royal feast: Mutton Dum Biryani, Fish Fry, Chicken Curry, Roti & Ice Cream.' },
];

const pillars = [
  { title: 'Separate Dining Floor', desc: 'Our dining hall is on a dedicated level away from the sacred mandap, keeping the marriage hall odor-free and immaculate for poojas.' },
  { title: '250+ Concurrent Seats', desc: 'Round tables draped in royal maroon and gold linen seat over 250 guests at once, so nobody waits in a queue.' },
  { title: 'Hygienic Modern Kitchen', desc: 'Commercial food warmers, sanitized serving utensils, filtered water stations and dedicated hand-wash areas.' },
  { title: 'Fresh Quality Ingredients', desc: 'Farm-fresh vegetables, premium long-grain Basmati rice and authentic Indian spices ground fresh for each banquet.' },
];

export default function MenusPage({ onOpenLightbox }) {
  const [diet, setDiet] = useState('nonVeg');
  const [idx, setIdx] = useState(1); // Premium Non-Veg is the most popular
  const list = cateringMenus[diet];
  const menu = list[idx] || list[0];

  const switchDiet = (d) => {
    setDiet(d);
    setIdx(d === 'veg' ? 0 : 1);
  };

  return (
    <div className="bg-[#450B17] text-latte min-h-screen overflow-x-clip selection:bg-[#C5A059] selection:text-[#0D0204]">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pt-32 pb-14 border-b border-[#D4AF37]/30">
        <img
          src="/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#450B17] via-[#1C0409]/75 to-[#1C0409]/55" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">Banquet Catering & Menus</p>
            <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-wide leading-[1.1]">Royal Feast & Banquets</h1>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#C5A059] to-transparent" />
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-mocha leading-relaxed">
              Seven official catering packages with transparent dish lists, from pure ghee South Indian meals to royal Hyderabadi Dum Biryani.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Menu explorer */}
      <section id="menus" className="py-20 sm:py-28 bg-[#3D0A14] border-b border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Choose your feast" title="The Royal Feast Experience" />

          {/* Veg / Non-veg switch */}
          <div className="flex justify-center -mt-4 mb-10">
            <div role="group" aria-label="Diet" className="inline-flex p-1 rounded-full border border-[#D4AF37]/40 bg-black/30">
              <button
                type="button"
                onClick={() => switchDiet('veg')}
                aria-pressed={diet === 'veg'}
                className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-sm font-cinzel tracking-wider transition-colors ${
                  diet === 'veg' ? 'bg-emerald-700 text-white font-bold' : 'text-mocha hover:text-latte'
                }`}
              >
                <Leaf className="w-4 h-4" /> Vegetarian
              </button>
              <button
                type="button"
                onClick={() => switchDiet('nonVeg')}
                aria-pressed={diet === 'nonVeg'}
                className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-sm font-cinzel tracking-wider transition-colors ${
                  diet === 'nonVeg' ? 'bg-gradient-to-r from-[#B8860B] via-[#EED9A6] to-[#C5A059] text-[#1C0409] font-bold' : 'text-mocha hover:text-latte'
                }`}
              >
                <Drumstick className="w-4 h-4" /> Non-Vegetarian
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Package list + summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-3">
              {list.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-pressed={idx === i}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 ${
                    idx === i
                      ? 'bg-[#4A0E1B] border-amber-400/70 shadow-[0_8px_24px_rgba(0,0,0,0.35)]'
                      : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-cinzel text-sm sm:text-base font-bold text-latte">{m.title}</span>
                    <span className="flex items-center gap-1 text-xs text-amber-300 whitespace-nowrap">
                      <Users className="w-3.5 h-3.5" /> {m.minPax}+
                    </span>
                  </span>
                  <span className="block mt-0.5 text-xs text-mocha">{m.badge}</span>
                </button>
              ))}

              {menu.image && (
                <button
                  type="button"
                  onClick={() => onOpenLightbox(menu.image, `${menu.title} - Official Printed Card`)}
                  className="group relative block w-full overflow-hidden rounded-xl border border-[#D4AF37]/30 hover:border-amber-400/70 transition-colors"
                >
                  <img src={menu.image} alt={`${menu.title} printed card`} loading="lazy" className="w-full h-40 object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#1C0409]/90 to-transparent" />
                  <span className="absolute bottom-3 left-4 flex items-center gap-2 text-sm text-latte font-semibold">
                    <Eye className="w-4 h-4 text-amber-300" /> View printed menu card
                  </span>
                </button>
              )}
            </div>

            {/* Courses */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={menu.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold">{menu.badge}</p>
                  <h3 className="mt-2 font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">{menu.title}</h3>
                  <p className="mt-2 text-mocha">
                    For a minimum of <strong className="text-amber-300">{menu.minPax} guests</strong>. Includes complete service, crockery and linen.
                  </p>

                  <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10">
                    {menu.sections?.map((section, sIdx) => (
                      <li key={section.name} className="py-5 border-t border-[#D4AF37]/25">
                        <div className="flex items-baseline justify-between gap-3">
                          <h4 className="font-cinzel text-sm font-bold tracking-wide text-latte">{section.name}</h4>
                          <span className="text-[11px] text-amber-300/70 font-cinzel">0{sIdx + 1}</span>
                        </div>
                        <p className="mt-2 text-sm text-mocha leading-relaxed">{section.items.join(' · ')}</p>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Dining policy note */}
      <section className="py-10 bg-[#350710] border-b border-[#D4AF37]/25">
        <p className="max-w-3xl mx-auto px-4 sm:px-6 flex items-start gap-3 text-sm text-mocha leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-latte">Dining & hygiene policy:</strong> all meals are consumed on the venue premises in the dedicated banquet dining hall. Packing food to take outside is not permitted, to ensure hygiene and food safety.
          </span>
        </p>
      </section>

      {/* Printed cards strip */}
      <section className="py-20 sm:py-24 bg-[#3D0A14] border-b border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="100% transparency" title="Official Printed Menu Cards">
            Tap any card to see the original scanned menu in full resolution.
          </SectionHeader>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar">
            {printedCards.map((c) => (
              <button
                key={c.title}
                type="button"
                onClick={() => onOpenLightbox(c.image, c.title)}
                className="group snap-start flex-shrink-0 w-64 sm:w-72 text-left rounded-xl overflow-hidden border border-[#D4AF37]/30 hover:border-amber-400/70 bg-[#450B17] transition-colors"
              >
                <div className="h-56 overflow-hidden bg-black">
                  <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-cinzel text-sm font-bold leading-snug">{c.title}</h3>
                  <p className="mt-1 text-xs text-mocha line-clamp-2">{c.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 sm:py-28 bg-[#350710]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Dining experience" title="Four Pillars of Our Dining" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D4AF37]/20 rounded-2xl overflow-hidden border border-[#D4AF37]/25">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="bg-[#3D0A14] p-7">
                <span className="font-cinzel text-3xl text-amber-300/70">0{i + 1}</span>
                <h3 className="mt-3 font-cinzel text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-mocha leading-relaxed">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-center border-t border-[#D4AF37]/30">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">Want to customize your menu?</h2>
          <p className="mt-4 text-mocha leading-relaxed">
            Our catering managers can adjust spice levels, substitute dishes or add live dessert counters to your package.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${venueData.whatsappNumber}?text=${encodeURIComponent('Hello SS Convention Hall, I would like to get a catering quote for my event.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <MessageSquare className="w-4 h-4" /> Quote on WhatsApp
            </a>
            <Link to="/contact" className="btn-outline-gold">Open booking studio</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
