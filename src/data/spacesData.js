/**
 * S.S Convention Hall - Master Spatial Architecture & Hall Data
 * 
 * Image Accuracy Policy:
 * - Only verified interior photographs of the respective halls are assigned as primary hall images.
 * - Hall Vasishta: Grand main marriage hall with crystal chandeliers, Italian vitrified flooring & carved mandap.
 * - Hall Agasthya: Grand reception & sangeet hall with stage lighting, neon arches & acoustic ceiling.
 * - Hall Koundinya: Intimate mini banquet hall with modern linear wood ceiling, cradle & birthday stage setups.
 * - Banquet Dining Hall: Dedicated dining floor with round banquet tables dressed in maroon & gold linen.
 */

export const spacesData = [
  {
    id: "hall-vasishta",
    slug: "hall-vasishta",
    name: "Hall Vasishta",
    title: "Hall Vasishta – Grand Kalyana Mandapam",
    tagline: "Grand Kalyana Mandapam & Royal Marriage Hall",
    subtitle: "Regal Marriage Hall with Golden Crystal Chandeliers & Auspicious Central Aisle",
    shortDescription: "Our crowning flagship marriage hall engineered for grand royal weddings, muhurthams, and mega receptions with centralized cassette air-conditioning and opulent crystal chandeliers.",
    
    // Accurate Real Interior Photography
    image: "/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg",
    hallImage: "/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg",
    coverImage: "/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg",
    
    // Comprehensive Gallery (Real Authentic Photos Only)
    gallery: [
      {
        src: "/assets/06_main_hall_seating/main_hall_grand_overview_chandeliers_aisle.jpeg",
        title: "Grand Overview of Hall Vasishta with Crystal Chandeliers & Central Aisle",
        category: "Main Hall Interior"
      },
      {
        src: "/assets/06_main_hall_seating/main_hall_aisle_view_towards_stage.jpeg",
        title: "Regal Central Aisle Looking Towards the Grand Stage",
        category: "Bridal Aisle"
      },
      {
        src: "/assets/06_main_hall_seating/main_hall_seating_chandelier_perspective.jpeg",
        title: "Architectural Ceiling & Golden Chandelier Perspective",
        category: "Lighting & Ceiling"
      },
      {
        src: "/assets/06_main_hall_seating/main_hall_guest_seating_rows_facing_stage.jpeg",
        title: "Guest Seating Rows with High-Gloss Vitrified Tile Reflections",
        category: "Guest Seating"
      },
      {
        src: "/assets/08_wedding_mandap_and_rituals/traditional_wedding_mandap_carved_pillars.jpeg",
        title: "Traditional Carved Gold Pillars Wedding Mandap on Stage",
        category: "Wedding Mandap"
      },
      {
        src: "/assets/08_wedding_mandap_and_rituals/wedding_rituals_groom_priests_balaji_mandap.jpeg",
        title: "Sacred Muhurtham Vedic Rituals on Stage with Priests",
        category: "Ceremony Stage"
      },
      {
        src: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_royal_sofa_clean.jpeg",
        title: "Evening Luxury Reception Stage Setup with Velvet Sofa",
        category: "Reception Setup"
      },
      {
        src: "/assets/06_main_hall_seating/main_hall_seating_perspective_arch_stage.jpeg",
        title: "Perspective Angle from Guest Area Towards Stage Arch",
        category: "Hall Perspective"
      }
    ],

    // Capacity Matrix
    capacity: "300–600",
    capacityDisplay: "Capacity: 300–600 Seated (1,000 Floating)",
    capacities: {
      theatre: "600 Guests Seated",
      floating: "1,000+ Reception Guests",
      roundTable: "350 Banquet Guests",
      mandapAudience: "500 Guests with unobstructed sightlines"
    },
    
    // Spatial & Technical Specifications
    dimensions: "5,500+ sq.ft • 600 Seated",
    specs: {
      floorArea: "5,500+ sq. ft. unobstructed pillar-free clear span",
      ceilingHeight: "16 ft clear height with acoustic false ceiling",
      stageDimensions: "38 ft (Width) × 18 ft (Depth) × 3.5 ft (Height)",
      cooling: "Centralized Daikin Cassette Air Conditioning with high-CFM multi-point circulation",
      flooring: "High-gloss Italian vitrified mirror-finish tiles with zero glare",
      powerBackup: "100% DG Generator backup with seamless auto-transfer switch (0-second blackout)",
      greenRooms: "2 Executive VIP AC Suites (Bride Suite & Groom Suite) with private vanity & attached washrooms",
      acoustics: "Acoustic absorption wall panels & ceiling baffles for feedback-free Vedic chanting",
      lighting: "Double-tier golden crystal chandeliers, DMX intelligent stage spot lighting & warm ambient LED coves"
    },

    bestFor: "Grand Royal Weddings, Mega Receptions, Traditional Muhurthams",
    suitableEvents: [
      { title: "Grand Traditional Weddings", desc: "Vedic rituals, sacred Agni Kundam setups, and large floral mandaps." },
      { title: "Evening Reception Galas", desc: "Red-carpet bridal processions, velvet sofa stage backdrops, and musical ensembles." },
      { title: "Sangeet & Cocktail Nights", desc: "Spacious dance performance stage with intelligent theatrical lighting." },
      { title: "Engagement Ceremonies", desc: "Grand ring exchange ceremonies with family banquet seating." },
      { title: "Corporate Conventions", desc: "Annual general meetings, leadership summits, and brand galas." }
    ],

    highlights: [
      "Monumental 38-ft wide stage capable of accommodating large 40-member family photo groups",
      "Expansive 70-ft central aisle designed for dramatic bridal walks and royal entry palanquins",
      "Two dedicated VIP green room suites with private access directly to the backstage",
      "Double-tier sparkling crystal chandeliers creating a warm, golden celebratory glow",
      "Dedicated high-speed elevator and internal staircase directly linking to the Dining Floor",
      "Auspicious entrance foyer featuring the Lord Venkateswara and serene Buddha water fountain"
    ],
    features: [
      "Seating capacity: 300 to 600 banquet guests (1,000+ floating)",
      "Centralized Daikin Cassette Air Conditioning throughout",
      "Double-tier crystal chandeliers & cove illumination",
      "Wide red-carpet center aisle for grand bridal walks",
      "Direct backstage access to private Bride & Groom suites",
      "Dedicated high-speed elevator linking to the Dining Floor"
    ],

    amenities: [
      { name: "Central Cassette A/C", desc: "Continuous climate control maintaining 22°C even during peak summer", icon: "Snowflake" },
      { name: "2 Luxury Green Rooms", desc: "Private suites with vanity mirrors, attached washrooms, and wardrobe storage", icon: "DoorClosed" },
      { name: "Acoustic Sound System", desc: "JBL audio infrastructure with Shure wireless handheld and lapel mics", icon: "Volume2" },
      { name: "Theatrical Truss Lighting", desc: "Warm white profile spots, RGB LED stage washes, and halo backlights", icon: "Lightbulb" },
      { name: "100% Generator Backup", desc: "Heavy-duty soundproof DG generator ensuring zero interruption", icon: "Zap" },
      { name: "Separate Dining Floor", desc: "Immediate elevator access to the 250+ capacity dining level (zero food smell in mandap)", icon: "UtensilsCrossed" },
      { name: "150+ Car Parking", desc: "Spacious on-premise car & bike parking lot with security personnel", icon: "Car" },
      { name: "Wheelchair Accessible", desc: "Ramp access at main entrance and elevator access to all levels", icon: "Accessibility" }
    ],

    description: "Hall Vasishta is the crowning jewel of S.S Convention Hall. Named after the revered Vedic Sage Vasishta, this flagship venue represents the zenith of architectural grandeur and celebratory elegance. Spanning over 5,500 square feet of pillar-free space, it features magnificent double-tier crystal chandeliers, high-gloss Italian tile flooring with mirror reflections, and an expansive 70-foot central aisle for unforgettable bridal processions. Equipped with an expansive 38-foot stage, dedicated VIP bride & groom green suites, and centralized cassette air-conditioning, Hall Vasishta provides an unmatched royal sanctuary for life's most sacred vows."
  },
  {
    id: "hall-agasthya",
    slug: "hall-agasthya",
    name: "Hall Agasthya",
    title: "Hall Agasthya – Royal Sangeet & Reception Hall",
    tagline: "Contemporary Sangeet, Engagement & Reception Hall",
    subtitle: "Majestic Celebration Space with Modern Lighting, Acoustic Panels & Dynamic Stage",
    shortDescription: "A versatile, high-energy luxury venue tailored for festive sangeet evenings, chic engagement galas, and medium-scale wedding receptions of 200 to 350 guests.",

    // Accurate Real Interior Photography
    image: "/assets/06_main_hall_seating/main_hall_seating_chandelier_perspective.jpeg",
    hallImage: "/assets/06_main_hall_seating/main_hall_seating_chandelier_perspective.jpeg",
    coverImage: "/assets/06_main_hall_seating/main_hall_seating_chandelier_perspective.jpeg",

    // Comprehensive Gallery (Real Authentic Photos Only)
    gallery: [
      {
        src: "/assets/06_main_hall_seating/main_hall_seating_chandelier_perspective.jpeg",
        title: "Hall Agasthya Grand Interior View & Chandelier Perspective",
        category: "Interior View"
      },
      {
        src: "/assets/09_reception_engagement_stages/stage_better_together_neon_wide_shot.jpeg",
        title: "Modern Neon Floral Ring Arch Stage for Receptions",
        category: "Reception Stage"
      },
      {
        src: "/assets/09_reception_engagement_stages/stage_triple_arch_boho_garden_front.jpeg",
        title: "Pastel Boho Triple-Arch Engagement Stage Setup",
        category: "Engagement Decor"
      },
      {
        src: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_candle_rods_wide.jpeg",
        title: "Warm Romantic Candle Wall Stage Illumination",
        category: "Stage Lighting"
      },
      {
        src: "/assets/09_reception_engagement_stages/stage_floral_ring_arch_edison_bulbs.jpeg",
        title: "Edison Vintage Bulb Hanging Chandelier Stage Design",
        category: "Contemporary Decor"
      },
      {
        src: "/assets/09_reception_engagement_stages/stage_peach_drapes_fairy_lights_divan_sofa.jpeg",
        title: "Peach Draping with Cascading Fairy Light Canopy",
        category: "Drapes & Canopy"
      },
      {
        src: "/assets/09_reception_engagement_stages/stage_haldi_mehendi_yellow_canopy_wisteria.jpeg",
        title: "Festive Haldi & Mehendi Yellow Floral Stage",
        category: "Haldi / Mehendi"
      },
      {
        src: "/assets/06_main_hall_seating/main_hall_seating_perspective_arch_stage.jpeg",
        title: "Audience Perspective Towards Ceremonial Arch Stage",
        category: "Guest Perspective"
      }
    ],

    // Capacity Matrix
    capacity: "200–350",
    capacityDisplay: "Capacity: 200–350 Seated (500 Floating)",
    capacities: {
      theatre: "350 Guests Seated",
      floating: "500 Reception Guests",
      roundTable: "200 Banquet Guests",
      sangeetCluster: "250 Guests with central dance floor"
    },

    // Spatial & Technical Specifications
    dimensions: "3,800 sq.ft • 200–350 Guests",
    specs: {
      floorArea: "3,800 sq. ft. thoughtfully partitioned celebration floor",
      ceilingHeight: "14 ft clear height with linear LED profiles",
      stageDimensions: "28 ft (Width) × 14 ft (Depth) × 2.5 ft (Height)",
      cooling: "Central multi-zone climate control with continuous air circulation",
      flooring: "Polished Italian-style vitrified tiles for seamless dance performances",
      powerBackup: "100% continuous DG Generator backup system",
      greenRooms: "1 Executive VIP Air-Conditioned Green Room with attached vanity",
      acoustics: "Studio-tuned acoustic treatment optimized for live music and DJ sets",
      lighting: "Multi-directional warm white LED wash fixtures and moving head stage lighting"
    },

    bestFor: "Sangeet Nights, Engagement Ceremonies, Cocktail Receptions, Intimate Weddings",
    suitableEvents: [
      { title: "Sangeet & Dance Celebrations", desc: "Generous dance floor space with soundproof acoustic environment." },
      { title: "Engagement / Ring Ceremonies", desc: "Warm, photogenic backdrops with ambient Edison and candle lighting." },
      { title: "Half-Saree / Langa Voni Functions", desc: "Festive traditional milestone rituals with family seating." },
      { title: "Cocktail & Networking Evenings", desc: "Flexible lounge seating, high cocktail tables, and stage presentations." },
      { title: "Corporate Awards & Galas", desc: "Audio-visual projection, speaker podium, and banquet dining." }
    ],

    highlights: [
      "Optimized stage with professional DJ console wiring and performance sound capabilities",
      "Contemporary interior architecture featuring warm wood accents and linear lighting",
      "Seamless integration with modern decor concepts like neon signage and floral arches",
      "Dedicated VIP Green Room for quick wardrobe changes during sangeet dance numbers",
      "Direct transit corridor to the on-premise car parking and illuminated grand entrance"
    ],
    features: [
      "Comfortable capacity for 200 to 350 guests (500 floating)",
      "Acoustic false ceiling with multi-directional lighting fixtures",
      "Spacious performance stage for sangeet dance choreography",
      "1 Executive VIP air-conditioned green room with attached vanity",
      "Independent climate control and full generator backup",
      "Seamless connectivity to on-premise car parking"
    ],

    amenities: [
      { name: "Central Climate Control", desc: "Rapid cooling system tailored for active dance parties and gatherings", icon: "Snowflake" },
      { name: "1 VIP Green Suite", desc: "Air-conditioned green room with private mirror and dress changing area", icon: "DoorClosed" },
      { name: "Performance Audio", desc: "Surround sound infrastructure with digital mixer and dual wireless mics", icon: "Volume2" },
      { name: "Party Stage Illumination", desc: "DMX controlled stage lighting with RGB washes and spotlighting", icon: "Lightbulb" },
      { name: "100% Power Generator", desc: "Automatic generator backup keeping the music and A/C uninterrupted", icon: "Zap" },
      { name: "Direct Dining Access", desc: "Effortless access to the dining floor for after-party buffets", icon: "UtensilsCrossed" },
      { name: "Ample Guest Parking", desc: "Convenient parking facilities with security supervision", icon: "Car" }
    ],

    description: "Named after the venerated Sage Agasthya, this versatile hall blends ceremonial warmth with contemporary celebratory energy. With an open floor plan of 3,800 square feet, Hall Agasthya is designed for high-spirited celebrations where dance, music, and elegance coalesce. Featuring an acoustically treated ceiling, dynamic stage lighting, and flexible floor layouts for cabaret or theatre seating, it is the premier choice for memorable Sangeet dance parties, glamorous engagement ceremonies, and sophisticated evening banquets."
  },
  {
    id: "hall-koundinya",
    slug: "hall-koundinya",
    name: "Hall Koundinya",
    title: "Hall Koundinya – Celebrations & Mini Banquet Hall",
    tagline: "Intimate Banquet Hall for Milestones & Family Ceremonies",
    subtitle: "Modern Intimate Hall with Designer Wood Slat Ceilings & Dedicated Milestone Stage",
    shortDescription: "A chic, warm, and air-conditioned boutique venue crafted specifically for 1st birthdays, cradle ceremonies (Barasala), upanayanam, dhoti functions, and corporate meetings of 100 to 200 guests.",

    // Accurate Real Interior Photography
    image: "/assets/06_main_hall_seating/mini_hall_seating_central_aisle_stage.jpeg",
    hallImage: "/assets/06_main_hall_seating/mini_hall_seating_central_aisle_stage.jpeg",
    coverImage: "/assets/06_main_hall_seating/mini_hall_seating_central_aisle_stage.jpeg",

    // Comprehensive Gallery (Real Authentic Photos Only)
    gallery: [
      {
        src: "/assets/06_main_hall_seating/mini_hall_seating_central_aisle_stage.jpeg",
        title: "Hall Koundinya Central Aisle & Stage Overview",
        category: "Mini Hall Seating"
      },
      {
        src: "/assets/10_cradle_and_birthday_decor/stage_cradle_naming_ceremony_lotus_swing.jpeg",
        title: "Traditional Cradle Ceremony (Barasala) with Lotus Swing Stage",
        category: "Cradle Ceremony"
      },
      {
        src: "/assets/10_cradle_and_birthday_decor/birthday_sunshine_theme_nirvik_one_marquee.jpeg",
        title: "Milestone 1st Birthday Sunshine Theme with 3D ONE Marquee Letters",
        category: "1st Birthday"
      },
      {
        src: "/assets/10_cradle_and_birthday_decor/birthday_event_aisle_balloon_pillars_live.jpeg",
        title: "Festive Aisle Entry with Balloon Pillars & Custom Cutouts",
        category: "Aisle Decoration"
      },
      {
        src: "/assets/10_cradle_and_birthday_decor/birthday_sunshine_theme_stage_wide_shot.jpeg",
        title: "Sunshine Theme Stage Full Width View & Cake Cutting Area",
        category: "Cake Cutting Stage"
      },
      {
        src: "/assets/10_cradle_and_birthday_decor/birthday_ocean_under_the_sea_theme_stage.jpeg",
        title: "Under The Sea Ocean Blue Theme Setup with Balloon Arches",
        category: "Thematic Birthday"
      },
      {
        src: "/assets/06_main_hall_seating/main_hall_seating_cocomelon_backdrop.jpeg",
        title: "Custom Character Theme Backdrop & Stage Seating",
        category: "Character Themes"
      }
    ],

    // Capacity Matrix
    capacity: "100–200",
    capacityDisplay: "Capacity: 100–200 Guests",
    capacities: {
      theatre: "200 Guests Seated",
      floating: "250 Guests",
      roundTable: "120 Banquet Guests",
      familyCluster: "150 Guests with dedicated play/photo area"
    },

    // Spatial & Technical Specifications
    dimensions: "2,200 sq.ft • 100–200 Guests",
    specs: {
      floorArea: "2,200 sq. ft. intimate boutique floor",
      ceilingHeight: "12.5 ft clear height with architectural wood slat styling",
      stageDimensions: "20 ft (Width) × 12 ft (Depth) × 2 ft (Height)",
      cooling: "High-speed dual cassette air conditioning with silent operation",
      flooring: "Premium non-slip vitrified tiles safe for elderly guests and toddlers",
      powerBackup: "100% automatic generator backup support",
      greenRooms: "VIP waiting lounge with baby changing and comfortable seating",
      acoustics: "Linear wood slat ceiling dampening echo for clear speech and family videos",
      lighting: "Warm architectural downlights, adjustable track spots & cake spotlight"
    },

    bestFor: "1st Birthdays, Cradle Ceremonies (Barasala), Dhoti Functions, Upanayanam, Small Gatherings",
    suitableEvents: [
      { title: "Milestone 1st Birthdays", desc: "Dedicated stage platform for 3D ONE marquee letters, balloon arches, and cake cutting." },
      { title: "Cradle Ceremonies (Barasala)", desc: "Auspicious setups for golden cradle swings, lotus swings, and family blessings." },
      { title: "Dhoti & Half-Saree Ceremonies", desc: "Intimate family gathering for coming-of-age celebrations." },
      { title: "Shashti Poorthi (60th Birthday)", desc: "Comfortable seating and accessible ramps for senior family members." },
      { title: "Corporate Workshops & Seminars", desc: "Classroom or boardroom seating with projector and speech audio." }
    ],

    highlights: [
      "Modern architectural linear wood slat ceiling providing warmth and superior sound clarity",
      "Dedicated raised stage platform ideal for cradle installations, cake-cutting tables, and photo backdrops",
      "Compact, cozy layout ensuring all family members stay closely connected during rituals",
      "Plug-and-play multimedia system for displaying baby photo montages, family videos, and music",
      "Direct adjacent access to the reception lounge and assistance helpdesk"
    ],
    features: [
      "Optimized for intimate gatherings of 100 to 200 guests",
      "Modern wood slat ceiling with architectural linear lighting",
      "Dedicated stage area for cake cutting, cradles, and sound",
      "Separate VIP waiting lounge with plush seating",
      "High-speed climate control and acoustic dampening",
      "Convenient photo-booth and baby milestone decor space"
    ],

    amenities: [
      { name: "Silent Cassette A/C", desc: "Rapid cooling climate control that stays completely whisper-quiet", icon: "Snowflake" },
      { name: "Family Waiting Lounge", desc: "Comfortable plush seating area with baby-care convenience", icon: "DoorClosed" },
      { name: "Speech & Music PA", desc: "Clear vocal microphone setup and Bluetooth connectivity for family playlists", icon: "Volume2" },
      { name: "Spotlight for Cake Cutting", desc: "Focused lighting on the center stage for high-quality photography", icon: "Lightbulb" },
      { name: "100% Generator Backup", desc: "Seamless generator changeover preventing ceremony pauses", icon: "Zap" },
      { name: "Dining Hall Connection", desc: "Direct route to the banquet dining level for celebratory family feasts", icon: "UtensilsCrossed" },
      { name: "Dedicated Helpdesk", desc: "Staff assistance counter right outside the hall for guest queries", icon: "HelpCircle" }
    ],

    description: "Hall Koundinya is an intimate and stylish boutique banquet space named after the revered Sage Koundinya. Crafted specifically for heartwarming family milestones, this 2,200 square foot venue features contemporary vertical wood slat ceilings, warm linear chandeliers, and custom acoustic dampening. Whether you are welcoming a newborn in a traditional Cradle Ceremony (Barasala), celebrating a child's milestone 1st birthday with vibrant marquee decor, or hosting an auspicious Upanayanam, Hall Koundinya envelops your loved ones in intimacy, comfort, and luxury."
  },
  {
    id: "dining-hall",
    slug: "dining-hall",
    name: "Banquet Dining Hall",
    title: "Swarna Bhojanam – Royal Banquet Dining Hall",
    tagline: "Dedicated Dining Floor with Round Tables & Damask Linens",
    subtitle: "Dedicated Dining Sanctuary with Round Banquet Tables & Zero Food Aroma in Mandap",
    shortDescription: "An expansive, hygienically engineered dining floor seating 250+ guests concurrently, physically isolated to ensure zero cooking aromas enter the ceremonial halls.",

    // Accurate Real Interior Photography
    image: "/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg",
    hallImage: "/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg",
    coverImage: "/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg",

    // Comprehensive Gallery (Real Authentic Photos Only)
    gallery: [
      {
        src: "/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg",
        title: "Swarna Bhojanam Dining Floor with Maroon & Gold Damask Linens",
        category: "Dining Hall"
      },
      {
        src: "/assets/03_food_and_catering_menus/menu_06_premium_non_veg_200pax.jpeg",
        title: "Grand Non-Vegetarian Feast Spread & Multi-Course Menu",
        category: "Catering Menu"
      },
      {
        src: "/assets/03_food_and_catering_menus/menu_03_premium_veg_200pax.jpeg",
        title: "Traditional South Indian Vegetarian Vindhu Bhojanam Menu",
        category: "Pure Veg Feasts"
      },
      {
        src: "/assets/03_food_and_catering_menus/menu_01_regular_veg_100pax.jpeg",
        title: "Standard Vegetarian Banquet Feast Configuration",
        category: "Banquet Menus"
      }
    ],

    // Capacity Matrix
    capacity: "250+ Concurrent",
    capacityDisplay: "Capacity: 250+ Seated Simultaneously (1,500+ Rolling Feasts)",
    capacities: {
      roundTable: "250+ Guests Seated Concurrently",
      traditionalPanti: "200 Guests Traditional Banana Leaf / Panti Style",
      buffetCapacity: "Continuous rolling buffet servicing 1,500+ guests without waiting queues",
      serviceSpeed: "Average banquet turnaround under 25 minutes per batch"
    },

    // Spatial & Technical Specifications
    dimensions: "3,500 sq.ft • 250+ Seated Simultaneously",
    specs: {
      floorArea: "3,500 sq. ft. dedicated banquet dining level",
      ceilingHeight: "13 ft clear height with high-velocity industrial exhaust ventilation",
      tableLayout: "Round 6-seater and 8-seater banquet tables + parallel buffet counters",
      cooling: "High-volume air movement systems with dedicated climate ventilation",
      flooring: "Stain-resistant vitrified tiles with continuous housekeeping drainage",
      kitchenFacilities: "Commercial stainless steel prep area, heavy-duty gas banks, and food warmers",
      handwashStation: "12-tap granite handwash counter with liquid soap & automatic dryers",
      waterQuality: "Multi-stage Reverse Osmosis (RO) drinking water plant with chilled dispensaries"
    },

    bestFor: "Traditional Vindhu Bhojanam, Grand Wedding Buffets, Royal Feasts & Catering",
    suitableEvents: [
      { title: "Traditional Telugu Vindhu Bhojanam", desc: "Elaborate multi-course feasts served on pristine banana leaves or fine crockery." },
      { title: "Grand Wedding Buffet Receptions", desc: "Twin parallel buffet counters ensuring zero waiting lines for guests." },
      { title: "Vegetarian & Non-Veg Banquets", desc: "Separate designated serving counters preserving strict culinary preferences." },
      { title: "Corporate Buffet Luncheons", desc: "Fast, efficient meal service for business gatherings and delegates." }
    ],

    highlights: [
      "Physical isolation on a separate floor guarantees zero food cooking aromas reach the sacred mandap",
      "Elegantly dressed round banquet tables with royal maroon table covers and shimmering golden organza bows",
      "Ergonomically cushioned banquet chairs ensuring senior family members dine with utter comfort",
      "Dedicated commercial service elevator allowing caterers to transport hot dishes smoothly without crossing guest areas",
      "12-tap granite handwash facility preventing after-meal congestion"
    ],
    features: [
      "Dedicated separate dining floor (Zero food aroma in the mandap)",
      "Accommodates over 250 guests seated concurrently at round tables",
      "Round banquet tables dressed with royal maroon & gold linen",
      "Direct access to commercial food warmers & stainless steel kitchen",
      "Dedicated 12-tap granite handwash counter with RO purified water",
      "Catering service elevator for rapid hot food transportation"
    ],

    amenities: [
      { name: "Zero Mandap Aroma", desc: "Separate dedicated floor ensures the sacred wedding hall stays 100% fragrant and pure", icon: "ShieldCheck" },
      { name: "250+ Concurrent Seats", desc: "Spacious layout with wide aisles between tables for food servers and guests", icon: "Users" },
      { name: "Linen & Chair Dressing", desc: "Royal maroon and gold damask table cloths with gold organza chair ties", icon: "Sparkles" },
      { name: "Stainless Steel Kitchen", desc: "Industrial catering kitchen with high-pressure burners and deep sinks", icon: "Flame" },
      { name: "RO Chilled Water", desc: "Commercial multi-stage RO water plant providing pure, safe drinking water", icon: "Droplets" },
      { name: "12-Tap Handwash Station", desc: "Spacious granite washing counter with liquid dispensers and paper towels", icon: "Sparkles" },
      { name: "Catering Service Elevator", desc: "Heavy service lift directly linking kitchen to the dining buffet zones", icon: "ArrowUpCircle" }
    ],

    description: "Food is the soul of any Indian celebration, and Swarna Bhojanam provides the royal banquet setting it deserves. Spanning 3,500 square feet on an independent floor, this dedicated dining sanctuary comfortably seats over 250 guests concurrently, allowing you to feed over 1,500 attendees smoothly in rolling batches. Featuring beautifully dressed round banquet tables in royal maroon and gold linen, clean stainless steel buffet stations, industrial odor-evacuating ventilation, and a spacious 12-tap granite handwash station, your guests will cherish every morsel of your hospitality."
  }
];

export const getHallById = (id) => {
  if (id === 'banquet-dining-hall' || id === 'dining-hall') {
    return spacesData.find((h) => h.id === 'dining-hall' || h.slug === 'dining-hall');
  }
  return spacesData.find((hall) => hall.id === id || hall.slug === id);
};
