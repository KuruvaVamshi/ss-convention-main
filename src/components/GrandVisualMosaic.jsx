import React, { useState } from 'react';
import { Eye, Sparkles, Filter, Maximize2, Heart, Camera, ChevronRight } from 'lucide-react';
import SplitHeading from './SplitHeading';

export default function GrandVisualMosaic({ onOpenLightbox, lang }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: lang === 'te' ? 'అన్ని ఫొటోలు' : 'All Moments', icon: Sparkles },
    { id: 'mandap', label: lang === 'te' ? 'కళ్యాణ మండపం & పూజలు' : 'Mandap & Vedic Rituals', icon: Heart },
    { id: 'reception', label: lang === 'te' ? 'రిసెప్షన్ స్టేజ్ డెకర్స్' : 'Reception & Stage Decor', icon: Sparkles },
    { id: 'dining', label: lang === 'te' ? 'రాయల్ విందు & మెనూలు' : 'Royal Banquets & Feasts', icon: Camera },
    { id: 'birthdays', label: lang === 'te' ? 'బారసాల & 1వ పుట్టినరోజులు' : 'Cradle & 1st Birthdays', icon: Camera },
    { id: 'facade', label: lang === 'te' ? 'ఎంట్రన్స్ & లాబీ' : 'Entrance, Lobby & Facade', icon: Camera },
  ];

  // 32 Authentic Real Photographs Only
  const photos = [
    // Mandap & Vedic Rituals
    {
      id: 'm1',
      src: '/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_carved_pillars.jpeg',
      title: 'Traditional Wedding Mandap with Carved Stone Pillars',
      category: 'mandap',
      tag: 'Vedic Mandap',
      span: 'col-span-1 md:col-span-2 row-span-2',
      aspect: 'aspect-square md:aspect-auto h-full'
    },
    {
      id: 'm2',
      src: '/assets/08_wedding_mandap_and_rituals/wedding_rituals_groom_priests_balaji_mandap.jpeg',
      title: 'Sacred Muhurtham Vedic Rituals on Stage with Priests',
      category: 'mandap',
      tag: 'Sacred Rituals',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'm3',
      src: '/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg',
      title: 'Grand Kalyana Mandapam with Crystal Chandeliers & 70-ft Aisle',
      category: 'mandap',
      tag: 'Flagship Hall',
      span: 'col-span-1 md:col-span-2',
      aspect: 'aspect-[16/9]'
    },
    {
      id: 'm4',
      src: '/assets/08_wedding_mandap_and_rituals/traditional_ganesha_white_gold_draped_stage.jpeg',
      title: 'Traditional Ganesha White & Gold Draped Stage',
      category: 'mandap',
      tag: 'Deity Stage',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'm5',
      src: '/assets/06_main_hall_seating/main_hall_guest_seating_rows_facing_stage.jpeg',
      title: 'Italian Marble Seating Reflections & Guest Rows',
      category: 'mandap',
      tag: 'Guest Seating',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'm6',
      src: '/assets/08_wedding_mandap_and_rituals/traditional_ganesha_medallion_purple_gold_stage.jpeg',
      title: 'Ganesha Medallion Purple & Gold Auspicious Stage',
      category: 'mandap',
      tag: 'Ceremonial Stage',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },

    // Reception & Stages
    {
      id: 'r1',
      src: '/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg',
      title: 'Imperial Velvet Sofa & Floral Ring Arch Stage',
      category: 'reception',
      tag: 'Royal Throne',
      span: 'col-span-1 md:col-span-2 row-span-2',
      aspect: 'aspect-square md:aspect-auto h-full'
    },
    {
      id: 'r2',
      src: '/assets/09_reception_engagement_stages/stage_better_together_neon_wide_shot.jpeg',
      title: 'Modern Neon "Better Together" Floral Stage',
      category: 'reception',
      tag: 'Neon Decor',
      span: 'col-span-1 md:col-span-2',
      aspect: 'aspect-[16/9]'
    },
    {
      id: 'r3',
      src: '/assets/09_reception_engagement_stages/stage_floral_ring_arch_edison_bulbs.jpeg',
      title: 'Vintage Edison Bulbs & Filigree Chandelier Setting',
      category: 'reception',
      tag: 'Warm Illumination',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'r4',
      src: '/assets/09_reception_engagement_stages/stage_triple_arch_boho_garden_warm_yellow.jpeg',
      title: 'Boho Triple-Arch Pastel Garden Stage Setting',
      category: 'reception',
      tag: 'Pastel Garden',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'r5',
      src: '/assets/09_reception_engagement_stages/stage_haldi_mehendi_yellow_canopy_wisteria.jpeg',
      title: 'Festive Haldi & Mehendi Yellow Canopy with Wisteria',
      category: 'reception',
      tag: 'Haldi & Sangeet',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'r6',
      src: '/assets/09_reception_engagement_stages/stage_floral_ring_arch_candle_rods_wide.jpeg',
      title: 'Romantic Candle Rods & Amber Ambient Wall',
      category: 'reception',
      tag: 'Candlelit Stage',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'r7',
      src: '/assets/09_reception_engagement_stages/stage_peach_drapes_fairy_lights_divan_sofa.jpeg',
      title: 'Peach Draping with Cascading Fairy Light Canopy',
      category: 'reception',
      tag: 'Fairy Lights',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'r8',
      src: '/assets/09_reception_engagement_stages/stage_pink_drapes_floral_arch_as_monogram.jpeg',
      title: 'Pink Floral Monogram Arch for Ring Ceremonies',
      category: 'reception',
      tag: 'Engagement Arch',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },

    // Dining & Feasts
    {
      id: 'd1',
      src: '/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg',
      title: 'Swarna Bhojanam Round Tables with Maroon & Gold Damask Linens',
      category: 'dining',
      tag: '250+ Seats Dining',
      span: 'col-span-1 md:col-span-2 row-span-2',
      aspect: 'aspect-square md:aspect-auto h-full'
    },
    {
      id: 'd2',
      src: '/assets/03_food_and_catering_menus/menu_06_premium_non_veg_200pax.jpeg',
      title: 'Hyderabadi Dum Biryani Feast Spread & Multi-Course Menu',
      category: 'dining',
      tag: 'Biryani Feasts',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'd3',
      src: '/assets/03_food_and_catering_menus/menu_03_premium_veg_200pax.jpeg',
      title: 'South Indian Pure Vegetarian Vindhu Bhojanam Menu',
      category: 'dining',
      tag: 'Pure Veg Feast',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'd4',
      src: '/assets/03_food_and_catering_menus/menu_07_special_non_veg_250pax.jpeg',
      title: 'Grand Royal Multi-Course Non-Veg Celebration Package',
      category: 'dining',
      tag: 'Grand Buffet',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'd5',
      src: '/assets/03_food_and_catering_menus/menu_01_regular_veg_100pax.jpeg',
      title: 'Standard Traditional South Indian Feast Configuration',
      category: 'dining',
      tag: 'Banquet Package',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },

    // Birthdays & Cradle
    {
      id: 'b1',
      src: '/assets/10_cradle_and_birthday_decor/stage_cradle_naming_ceremony_lotus_swing.jpeg',
      title: 'Traditional Cradle Ceremony (Barasala) with Lotus Swing Stage',
      category: 'birthdays',
      tag: 'Lotus Cradle',
      span: 'col-span-1 md:col-span-2',
      aspect: 'aspect-[16/9]'
    },
    {
      id: 'b2',
      src: '/assets/10_cradle_and_birthday_decor/birthday_sunshine_theme_nirvik_one_marquee.jpeg',
      title: 'Milestone 1st Birthday with 3D ONE Marquee Letters',
      category: 'birthdays',
      tag: '1st Birthday',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'b3',
      src: '/assets/10_cradle_and_birthday_decor/birthday_ocean_under_the_sea_theme_stage.jpeg',
      title: 'Under the Sea Ocean Blue Balloon Fantasy Stage',
      category: 'birthdays',
      tag: 'Ocean Theme',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'b4',
      src: '/assets/10_cradle_and_birthday_decor/birthday_event_aisle_balloon_pillars_live.jpeg',
      title: 'Festive Balloon Pillar Entry Walkway',
      category: 'birthdays',
      tag: 'Balloon Aisle',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'b5',
      src: '/assets/10_cradle_and_birthday_decor/birthday_cocomelon_theme_viyaan_stage.jpeg',
      title: 'Custom Cocomelon Milestone Birthday Celebration Stage',
      category: 'birthdays',
      tag: 'Cocomelon Theme',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },

    // Architecture & Facade
    {
      id: 'f1',
      src: '/assets/04_exterior_and_entrance/entrance_grand_steps_illuminated_night.jpeg',
      title: 'Illuminated Grand Entrance Steps & Approach',
      category: 'facade',
      tag: 'Night Arrival',
      span: 'col-span-1 md:col-span-2',
      aspect: 'aspect-[16/9]'
    },
    {
      id: 'f2',
      src: '/assets/04_exterior_and_entrance/exterior_night_facade_parking_lighting.jpeg',
      title: '40-Foot Grand Architectural Facade & CCTV Car Parking',
      category: 'facade',
      tag: 'Palace Facade',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'f3',
      src: '/assets/05_reception_and_lobby/lobby_buddha_water_fountain_feature.jpeg',
      title: 'Serene Buddha Water Fountain Welcoming Foyer',
      category: 'facade',
      tag: 'Lobby Fountain',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'f4',
      src: '/assets/05_reception_and_lobby/reception_lounge_teal_sofas_gallery.jpeg',
      title: 'VIP Guest Reception Lounge with Teal Velvet Sofas',
      category: 'facade',
      tag: 'VIP Lounge',
      span: 'col-span-1',
      aspect: 'aspect-[4/3]'
    }
  ];

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  return (
    <section id="palace-gallery-mosaic" className="py-24 lg:py-32 bg-[#2F060E] relative overflow-hidden text-white border-t border-b border-[#D4AF37]/35">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-[#D4AF37]/50 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-md backdrop-blur-sm">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'te' ? 'నిజమైన ఛాయాచిత్రాలు' : 'Verified Authentic Venue Photography'}</span>
          </div>

          <SplitHeading
            as="h2"
            className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-white uppercase mb-4 drop-shadow"
          >
            {lang === 'te' ? 'రాచరిక వేడుకల చిత్రమాలిక' : 'Moments of Grandeur'}
          </SplitHeading>

          <p className="text-amber-100/90 text-xs sm:text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            {lang === 'te'
              ? 'ఎస్.ఎస్ కన్వెన్షన్‌లో జరిగిన వివాహాలు, రిసెప్షన్లు, విందులు మరియు వేడుకల వాస్తవిక దృశ్యాలు. ప్రతి చిత్రం మా నాణ్యతకు నిదర్శనం.'
              : 'Every corner of S.S Convention is built to inspire wonder. Explore our authentic stage decor, crystal chandeliers, royal banquet dining, and serene foyers.'}
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all duration-300 border ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] border-amber-300 font-bold shadow-lg scale-105'
                      : 'bg-[#3A0813] text-amber-100 hover:bg-[#52101C] border-[#D4AF37]/40 shadow-sm'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#3D0A14]' : 'text-amber-300'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Real Photo Count Indicator */}
          <div className="mt-4 text-[11px] font-mono tracking-wider text-amber-300/80 uppercase">
            Showing {filteredPhotos.length} Authentic Photographs • Click Any Photo to Zoom Fullscreen
          </div>
        </div>

        {/* Dynamic Bento Photo Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(photo.src, photo.title)}
              className={`group relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/35 bg-black shadow-xl cursor-pointer hover:border-amber-400 hover:shadow-[0_12px_35px_rgba(212,175,55,0.25)] transition-all duration-500 ${
                activeCategory === 'all' ? photo.span : 'col-span-1'
              }`}
            >
              <div className={`overflow-hidden bg-[#150408] ${activeCategory === 'all' ? photo.aspect : 'aspect-[4/3]'}`}>
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[1.02] contrast-[1.03]"
                />
              </div>

              {/* Shading Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

              {/* Category Pill Tag (Top-Left) */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/75 border border-[#D4AF37]/50 text-amber-300 backdrop-blur-md shadow-sm">
                  {photo.tag}
                </span>
              </div>

              {/* Lightbox Zoom Icon Button (Top-Right) */}
              <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/75 border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-md">
                <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
              </div>

              {/* Photo Title & Lightbox Action (Bottom) */}
              <div className="absolute bottom-3.5 left-4 right-4 z-10">
                <h3 className="font-cinzel text-xs sm:text-sm font-bold text-white drop-shadow-md leading-snug line-clamp-2 group-hover:text-amber-200 transition-colors">
                  {photo.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-300/80 font-bold uppercase tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View in 4K Fullscreen</span>
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-4 rounded-2xl bg-[#3A0813] border border-[#D4AF37]/40 shadow-xl max-w-2xl mx-auto">
            <span className="text-xs text-amber-100 font-normal">
              Want to see these stages and halls in person before booking?
            </span>
            <a
              href="https://wa.me/918985700044?text=Namaste%20SS%20Convention,%20I%20would%20like%20to%20schedule%20an%20in-person%20hall%20walkthrough."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              Book In-Person Walkthrough →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

