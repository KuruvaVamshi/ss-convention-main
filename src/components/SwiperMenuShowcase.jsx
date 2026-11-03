import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Utensils, Eye, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function SwiperMenuShowcase({ onOpenLightbox, lang }) {
  const cards = [
    {
      id: 'm1',
      title: 'Menu 01 • Regular Veg Feast',
      badge: 'Min 100 Pax • Auspicious South Indian',
      image: '/assets/03_food_and_catering_menus/menu_01_regular_veg_100pax.jpeg',
      courses: ['Watermelon Juice', 'Veg Bullet Starter', 'Paneer Butter Masala', 'Veg Pulao & Bagara Rice', 'Rumali Roti', 'Gulab Jamun'],
      desc: 'Traditional pure vegetarian spread with pure ghee sweets and aromatic rice specialties.'
    },
    {
      id: 'm2',
      title: 'Menu 02 • Standard Veg Feast',
      badge: 'Min 100 Pax • Balanced & Grand',
      image: '/assets/03_food_and_catering_menus/menu_02_standard_veg_100pax_with_policies.jpeg',
      courses: ['Muskmelon Juice', 'Veg Manchurian', 'Kadai Paneer', 'Jeera Pulao', 'Palak Dal', 'Hot Cut Mirchi', 'Vanilla Ice Cream'],
      desc: 'Our classic family package for Upanayanams, Engagements, and Satyanarayana Vratams.'
    },
    {
      id: 'm3',
      title: 'Menu 03 • Premium Veg Feast',
      badge: 'Min 200 Pax • 14-Item Royal Spread',
      image: '/assets/03_food_and_catering_menus/menu_03_premium_veg_200pax.jpeg',
      courses: ['Welcome Drink', 'Paneer 65 Starter', 'Nizami Handi', 'Kaju Biryani', 'Rumali Roti', 'Special Dalcha', 'Ghee Jalebi'],
      desc: 'Lavish spread crafted for grand vegetarian wedding muhurthams with live counter options.'
    },
    {
      id: 'm4',
      title: 'Menu 04 • Special Veg with Noodles',
      badge: 'Min 250 Pax • Modern Fusion & Kids Choice',
      image: '/assets/03_food_and_catering_menus/menu_04_special_veg_250pax_noodles.jpeg',
      courses: ['Veg Hakka Noodles', 'Crispy Corn & Manchurian', 'Paneer Chatpat', 'Special Veg Biryani', 'Butter Naan', 'Strawberry Sundae'],
      desc: 'Ideal for 1st Birthday parties and modern receptions where kids and youngsters love noodles.'
    },
    {
      id: 'm5',
      title: 'Menu 05 • Standard Non-Veg Banquet',
      badge: 'Min 100 Pax • Authentic Hyderabadi',
      image: '/assets/03_food_and_catering_menus/menu_05_standard_non_veg_100pax.jpeg',
      courses: ['Hyderabadi Chicken Dum Biryani', 'Mirchi Ka Salan & Raitha', 'Chicken Curry', 'Rumali Roti', 'Plain Rice & Sambar', 'Double Ka Meeta'],
      desc: 'Authentic Hyderabadi Basmati Dum Biryani cooked with fragrant saffron, ghee, and traditional spices.'
    },
    {
      id: 'm6',
      title: 'Menu 06 • Premium Non-Veg Banquet',
      badge: 'Min 200 Pax • #1 Most Booked Package',
      image: '/assets/03_food_and_catering_menus/menu_06_premium_non_veg_200pax.jpeg',
      courses: ['Chicken Dum Biryani', 'Spicy Mutton Curry', 'Chicken 65 Starter', 'Bagara Rice', 'Rumali Roti', 'Hyderabadi Dalcha', 'Gulab Jamun'],
      desc: 'The gold standard for grand wedding receptions and Sangeet nights across Hyderabad.'
    },
    {
      id: 'm7',
      title: 'Menu 07 • Special Royal Non-Veg',
      badge: 'Min 250 Pax • Ultimate Grand Muhurtham',
      image: '/assets/03_food_and_catering_menus/menu_07_special_non_veg_250pax.jpeg',
      courses: ['Mutton Dum Biryani', 'Apollo Fish Fry', 'Butter Chicken', 'Crispy Starters', 'Rumali Roti', 'Qubani Ka Meeta', 'Royal Ice Cream'],
      desc: 'The peak of royal hospitality with succulent Mutton Dum Biryani, Fish delicacies, and rich Nizam sweets.'
    },
    {
      id: 'dining',
      title: 'Banquet Dining Hall (250+ Seats)',
      badge: 'Separate Floor • Zero Odor in Mandap',
      image: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg',
      courses: ['250+ Round Table Seats', 'Maroon & Gold Silk Linens', 'Filtered RO Drinking Water', 'Direct Hygienic Kitchen Access', 'Zero Aroma in Wedding Hall'],
      desc: 'Comfortable air-cooled banquet floor where guests enjoy hot, relaxed meals without crowds.'
    }
  ];

  return (
    <section className="py-24 bg-[#350710] relative overflow-hidden border-t border-b border-[#D4AF37]/30 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-3 shadow-md backdrop-blur-sm">
            <Utensils className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive 3D Feast Showcase</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-3 drop-shadow">
            7 Official Printed Menu Rate Cards
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm font-normal leading-relaxed">
            Swipe or slide through our transparent catering packages with 3D physical depth. Click any card to inspect the scanned physical menu card in full high resolution.
          </p>
        </div>

        {/* 3D Swiper Coverflow Container */}
        <div className="relative px-2 sm:px-8">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            initialSlide={2}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 120,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              prevEl: '.swiper-btn-prev',
              nextEl: '.swiper-btn-next',
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="w-full py-10"
          >
            {cards.map((card) => (
              <SwiperSlide
                key={card.id}
                className="w-[300px] sm:w-[360px] md:w-[400px] select-none"
              >
                <div className="bg-[#4A0E17] rounded-[32px] overflow-hidden border-2 border-[#D4AF37]/45 shadow-2xl hover:border-amber-400 transition-all flex flex-col justify-between h-[520px] text-white">
                  {/* Photo Preview Container */}
                  <div
                    onClick={() => onOpenLightbox(card.image, card.title)}
                    className="relative h-56 bg-black overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 text-amber-200 text-[10px] font-bold border border-[#D4AF37]/40 shadow-md">
                      {card.badge}
                    </div>

                    <button
                      aria-label="Enlarge Rate Card"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white border border-white/30 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-[#3D0A14] transition-colors shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider block">
                        Tap To Enlarge Card
                      </span>
                      <h4 className="font-cinzel text-base font-bold drop-shadow-sm truncate">
                        {card.title}
                      </h4>
                    </div>
                  </div>

                  {/* Card Content & Delicacies */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-[#3A0813] text-white">
                    <div>
                      <p className="text-xs text-amber-100/85 font-normal leading-relaxed mb-3">
                        {card.desc}
                      </p>

                      <div className="pt-2 border-t border-[#D4AF37]/25">
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mb-2">
                          Key Courses & Delicacies:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {card.courses.map((dish, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-[#24050B] text-amber-200 border border-[#D4AF37]/30 font-medium"
                            >
                              {dish}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between">
                      <button
                        onClick={() => onOpenLightbox(card.image, card.title)}
                        className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Printed Card</span>
                      </button>

                      <Link
                        to="/menus"
                        className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>Full Menu</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button
            aria-label="Previous Slide"
            className="swiper-btn-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#3A0813] border-2 border-[#D4AF37]/45 text-amber-300 flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-all shadow-lg hover:scale-110 hidden sm:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Next Slide"
            className="swiper-btn-next absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#3A0813] border-2 border-[#D4AF37]/45 text-amber-300 flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-all shadow-lg hover:scale-110 hidden sm:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <Link
            to="/menus"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition-all"
          >
            <span>Explore All 7 Rate Cards with Course Breakdown</span>
            <ArrowRight className="w-4 h-4 text-[#3D0A14]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

