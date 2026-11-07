import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Snowflake,
  DoorClosed,
  Zap,
  Car,
  UtensilsCrossed,
  Droplets,
  ShieldCheck,
  Accessibility,
  ArrowUpCircle,
  Phone,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { venueData } from '../data/venueData';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';

const facilitiesList = [
  {
    title: "Centralized Cassette Air Conditioning",
    shortTitle: "Central A/C",
    teluguTitle: "సెంట్రలైజ్డ్ క్యాసెట్ ఎయిర్ కండిషనింగ్",
    category: "Climate & Comfort",
    desc: "Commercial Daikin multi-zone cassette cooling delivers continuous 22°C temperature throughout Hall Vasishta, Hall Agasthya, and Hall Koundinya, keeping guests cool and refreshed even during peak summer weddings.",
    icon: Snowflake,
    badge: "Daikin Cassette",
    highlights: ["Multi-zone airflow control", "Silent operation (no fan noise)", "Continuous fresh air circulation"],
    image: "/assets/facilities/01_Central_AC.png",
    imageAlt: "Daikin Commercial Centralized Cassette Air Conditioning"
  },
  {
    title: "Two Executive VIP Bridal Green Suites",
    shortTitle: "VIP Bridal Suites",
    teluguTitle: "రెండు ఎగ్జిక్యూటివ్ విఐపి గ్రీన్ రూమ్స్",
    category: "Bridal Privacy",
    desc: "Dedicated VIP suites (Bride Suite & Groom Suite) located directly behind the main stage. Features full-length illuminated vanity mirrors, comfortable plush sofas, attached private washrooms, and wardrobe storage.",
    icon: DoorClosed,
    badge: "Private AC Suites",
    highlights: ["Direct private backstage access", "Attached private washrooms", "Professional bridal makeup vanity lighting"],
    image: "/assets/facilities/02_VIP_Bridal_Suites.png",
    imageAlt: "Executive VIP Bridal Green Suite with Illuminated Vanity Mirrors"
  },
  {
    title: "Dedicated Banquet Dining Floor (250+ Seats)",
    shortTitle: "Banquet Dining Floor",
    teluguTitle: "ప్రత్యేక డైనింగ్ హాల్ (250+ సీటింగ్)",
    category: "Dining Comfort",
    desc: "A completely separate banquet dining level featuring round tables and buffet counters. By keeping dining on a dedicated floor, zero food aroma or moisture reaches the sacred marriage mandap.",
    icon: UtensilsCrossed,
    badge: "Zero Smell in Mandap",
    highlights: ["250+ concurrent banquet dining", "Round banquet tables & buffet islands", "Direct elevator and staircase access"],
    image: "/assets/facilities/03_Banquet_Dining_Floor.png",
    imageAlt: "Dedicated Banquet Dining Floor with Round Tables"
  },
  {
    title: "100% Commercial DG Power Generator",
    shortTitle: "Power Backup",
    teluguTitle: "100% ఆటోమేటిక్ జనరేటర్ బ్యాకప్",
    category: "Power Reliability",
    desc: "Heavy-duty soundproof diesel generator system with auto-transfer switch. In case of grid power interruption, backup activates in zero seconds, keeping crystal chandeliers, sound, and A/C uninterrupted.",
    icon: Zap,
    badge: "Zero-Second Blackout",
    highlights: ["Runs full hall A/C & lighting", "Soundproof heavy-duty unit", "Seamless auto-transfer switch"],
    image: "/assets/facilities/04_Power_Backup.png",
    imageAlt: "Heavy-Duty Soundproof Commercial DG Power Generator"
  },
  {
    title: "Ample On-Premises Car & Bike Parking",
    shortTitle: "Car & Bike Parking",
    teluguTitle: "విశాలమైన పార్కింగ్ సదుపాయం",
    category: "Guest Convenience",
    desc: "Spacious on-premises parking capacity for 150+ vehicles. Dedicated security guards and CCTV cameras monitor entry and exit smoothly from Raghavendra Nagar Colony main road.",
    icon: Car,
    badge: "150+ Vehicles",
    highlights: ["On-premises secured lot", "Uniformed parking attendants", "24/7 CCTV surveillance"],
    image: "/assets/facilities/05_Car_and_Bike_Parking.png",
    imageAlt: "Spacious On-Premises Car and Bike Parking Facility"
  },
  {
    title: "High-Speed Passenger Elevator",
    shortTitle: "Passenger Elevator",
    teluguTitle: "హై-స్పీడ్ ప్యాసెంజర్ లిఫ్ట్",
    category: "Accessibility",
    desc: "A modern commercial elevator linking the main entrance foyer, marriage hall, and dining floor. Ensures elderly relatives and guests with mobility challenges transit comfortably with zero stairs.",
    icon: ArrowUpCircle,
    badge: "All Floors Connected",
    highlights: ["Senior citizen friendly", "Wide cabin for family transit", "Smooth automatic leveling"],
    image: "/assets/facilities/06_Passenger_Elevator.png",
    imageAlt: "Commercial High-Speed Passenger Elevator"
  },
  {
    title: "Industrial RO Water Purification Plant",
    shortTitle: "RO Pure Water",
    teluguTitle: "ఆర్వో మంచినీటి ప్లాంట్",
    category: "Hygiene & Health",
    desc: "On-site multi-stage Reverse Osmosis (RO) water purification plant delivering tested, pure drinking water for all dining services, live counters, and guest hydration stations.",
    icon: Droplets,
    badge: "Multi-Stage Tested",
    highlights: ["Tested safe drinking water", "Dedicated water coolers", "Hygienic food preparation supply"],
    image: "/assets/facilities/07_RO_Pure_Water.png",
    imageAlt: "Tested Safe RO Pure Drinking Water"
  },
  {
    title: "24/7 Perimeter CCTV & Security",
    shortTitle: "CCTV & Security",
    teluguTitle: "24/7 సిసిటివి & భద్రత",
    category: "Security & Safety",
    desc: "Round-the-clock perimeter coverage with high-definition digital cameras across all entrances, aisles, stage areas, parking lots, and dining corridors, backed by trained on-site security guards.",
    icon: ShieldCheck,
    badge: "Full Perimeter Coverage",
    highlights: ["High-definition digital cameras", "Live monitoring console", "Trained security personnel"],
    image: "/assets/facilities/08_CCTV_Security.png",
    imageAlt: "24/7 Perimeter High-Definition CCTV Surveillance and Security Scene"
  },
  {
    title: "Wheelchair Accessible Ramps & Entrances",
    shortTitle: "Accessible Entry",
    teluguTitle: "వీల్‌చైర్ యాక్సెసబుల్ ర్యాంప్",
    category: "Inclusivity",
    desc: "Thoughtfully engineered gentle-incline ramps at the grand entrance foyer allow effortless wheelchair and stroller access directly from the parking area into the air-conditioned hall.",
    icon: Accessibility,
    badge: "Step-Free Entry",
    highlights: ["Gentle-incline entrance ramp", "Wide double doors", "Accessible ground level foyer"],
    image: "/assets/facilities/09_Accessible_Entry.png",
    imageAlt: "Gentle Incline Wheelchair Accessible Entrance Ramp"
  }
];

const quickFacts = [
  { to: 22, suffix: '°C', label: 'Steady cooling' },
  { to: 250, suffix: '+', label: 'Dining seats' },
  { to: 150, suffix: '+', label: 'Parking spots' },
  { to: 0, suffix: ' sec', label: 'Blackout' },
];

export default function FacilitiesPage({ lang }) {
  const [active, setActive] = useState(0);
  const shouldReduce = useReducedMotion();

  // Preload all facility images for instantaneous zero-lag switching
  useEffect(() => {
    facilitiesList.forEach((facility) => {
      const img = new Image();
      img.src = facility.image;
    });
  }, []);

  return (
    <div className="bg-[#450B17] text-latte min-h-screen overflow-hidden selection:bg-[#C5A059] selection:text-[#0D0204]">
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pt-32 pb-14 border-b border-[#D4AF37]/30">
        <img
          src="/assets/07_dining_hall/dining_hall_round_tables_maroon_gold.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#450B17] via-[#1C0409]/75 to-[#1C0409]/55" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">5-Star Infrastructure</p>
            <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-wide leading-[1.1]">
              {lang === 'te' ? 'రాయల్ సదుపాయాలు & సౌకర్యాలు' : 'Facilities & Amenities'}
            </h1>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#C5A059] to-transparent" />
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-mocha leading-relaxed">
              {lang === 'te'
                ? 'సెంట్రల్ ఎసి, విఐపి గ్రీన్ రూమ్స్, ఆటోమేటిక్ జనరేటర్ మరియు విశాలమైన పార్కింగ్ – మీ అతిథులకు అత్యుత్తమ సౌకర్యాలు.'
                : 'Engineered for seamless guest comfort, from Daikin central climate control and two VIP bridal suites to 100% generator backup and 150+ parking slots.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-12 bg-[#2E060F] border-b border-[#D4AF37]/25">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {quickFacts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <div className="font-cinzel text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] to-[#C5A059] tabular-nums">
                <CountUp to={f.to} suffix={f.suffix} duration={1.6} />
              </div>
              <div className="mt-1 text-[11px] tracking-[0.25em] uppercase text-mocha">{f.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Facilities: pick on the left, details on the right */}
      <section className="py-20 sm:py-28 bg-[#3D0A14] border-b border-[#D4AF37]/25">
        <div className="max-w-7xl xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">Uncompromising Standards</h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            <p className="mt-4 text-mocha leading-relaxed max-w-2xl mx-auto">
              Every system is maintained and tested before each celebration, so nothing glitches on your special day.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Picker: scrolls sideways on phones, stacks on desktop */}
            <div
              role="tablist"
              aria-label="Facilities"
              className="lg:col-span-4 xl:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar"
            >
              {facilitiesList.map((item, idx) => {
                const IconComp = item.icon;
                const isActive = active === idx;
                return (
                  <button
                    key={item.title}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(idx)}
                    onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(idx)}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl border text-left flex-shrink-0 lg:flex-shrink transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#4A0E1B] border-amber-400/80 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-amber-400/30'
                        : 'bg-transparent border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#4A0E1B]/30'
                    }`}
                  >
                    <IconComp className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-amber-300' : 'text-mocha'}`} />
                    <span className={`text-xs sm:text-sm font-cinzel font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${isActive ? 'text-latte' : 'text-mocha group-hover:text-latte'}`}>
                      {item.shortTitle}
                    </span>
                    <span className={`ml-auto hidden lg:block font-cinzel text-xs font-semibold ${isActive ? 'text-amber-300' : 'text-mocha/60'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail panel: Integrated Two-Column Facility Showcase Card */}
            <div className="lg:col-span-8 xl:col-span-8 lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4A0E1B] via-[#380A14] to-[#24050C] border border-[#D4AF37]/35 shadow-[0_24px_60px_rgba(0,0,0,0.55)] p-6 sm:p-8 lg:p-9 min-h-[490px]">
                {/* Subtle Decorative Background Watermark */}
                {(() => {
                  const WatermarkIcon = facilitiesList[active].icon;
                  return (
                    <WatermarkIcon
                      aria-hidden="true"
                      className="absolute -right-8 -bottom-8 w-64 h-64 text-amber-300/[0.03] pointer-events-none select-none"
                    />
                  );
                })()}

                <AnimatePresence mode="wait">
                  {(() => {
                    const item = facilitiesList[active];
                    const IconComp = item.icon;
                    return (
                      <motion.article
                        key={item.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: shouldReduce ? 0.05 : 0.2, ease: 'easeOut' }}
                        className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch h-full"
                      >
                        {/* Left portion – Facility Information (~58%) */}
                        <div className="md:col-span-7 flex flex-col justify-between">
                          <div>
                            {/* Top header row: Icon, Category label, and Badge */}
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <div className="flex items-center gap-3">
                                <span className="w-12 h-12 rounded-xl bg-[#2A0610] border border-[#D4AF37]/45 flex items-center justify-center shadow-inner flex-shrink-0">
                                  <IconComp className="w-6 h-6 text-amber-300" />
                                </span>
                                <div>
                                  <p className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-amber-300 font-semibold font-cinzel">
                                    {item.category}
                                  </p>
                                  <span className="text-xs text-mocha/80 font-medium">Facility 0{active + 1} of 09</span>
                                </div>
                              </div>
                              <span className="text-[11px] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 bg-black/30 text-amber-200 font-cinzel tracking-wider whitespace-nowrap shadow-sm">
                                {item.badge}
                              </span>
                            </div>

                            {/* Facility Title */}
                            <h3 className="mt-3 font-cinzel text-xl sm:text-2xl lg:text-3xl font-bold leading-snug text-latte text-balance">
                              {item.title}
                            </h3>
                            {lang === 'te' && (
                              <p className="mt-1 text-sm text-amber-300/90 font-medium">{item.teluguTitle}</p>
                            )}

                            {/* Facility Description */}
                            <p className="mt-3.5 text-sm sm:text-base text-mocha leading-relaxed">
                              {item.desc}
                            </p>
                          </div>

                          {/* Subtle Divider & Key Facility Highlights */}
                          <div className="mt-6 pt-5 border-t border-[#D4AF37]/25">
                            <ul className="space-y-2.5">
                              {item.highlights.map((h) => (
                                <li key={h} className="flex items-center gap-2.5 text-xs sm:text-sm text-latte">
                                  <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Right portion – Facility Image (~42%) */}
                        <div className="md:col-span-5 flex items-center">
                          <div className="relative w-full h-[280px] sm:h-[340px] md:h-full min-h-[280px] sm:min-h-[340px] md:min-h-[400px] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_16px_40px_rgba(0,0,0,0.6)] bg-[#190307] group flex flex-col justify-between">
                            {/* Ambient illumination glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-amber-200/5 pointer-events-none z-10" />

                            {/* Subtle dark vignette gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none z-10" />

                            {/* The Facility Image */}
                            <img
                              src={item.image}
                              alt={item.imageAlt || item.title}
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            {/* Small, Elegant Facility Number Indicator (01-09) */}
                            <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-[#1C0409]/90 backdrop-blur-md border border-[#D4AF37]/50 text-amber-300 shadow-md">
                              <span className="font-cinzel text-xs font-bold tracking-widest">
                                0{active + 1}
                              </span>
                              <span className="text-[10px] text-mocha/70">/ 09</span>
                            </div>

                            {/* Bottom Subtle Caption Tag */}
                            <div className="relative z-20 p-3 mt-auto">
                              <span className="inline-block px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-sm border border-[#D4AF37]/35 text-[10px] font-cinzel font-semibold uppercase tracking-[0.2em] text-amber-200/90 truncate max-w-full drop-shadow">
                                {item.shortTitle}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policies teaser */}
      <section className="py-16 bg-[#350710] border-b border-[#D4AF37]/25">
        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-2">Transparency & Rules</p>
            <h3 className="font-cinzel text-2xl font-bold">Venue Policies & Slot Schedules</h3>
            <p className="mt-2 text-mocha max-w-lg leading-relaxed">
              Slot timings (3 PM lunch, 11 PM dinner), outside decor policy and payment terms.
            </p>
          </div>
          <Link to="/policies" className="btn-outline-gold">View venue policies →</Link>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-center">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">See our facilities in person</h2>
          <p className="mt-4 text-mocha leading-relaxed">
            Walk through the air-conditioned halls, inspect the VIP green rooms and see the dining floor firsthand.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold">
              <Calendar className="w-4 h-4" /> Book a venue tour
            </Link>
            <a href={`tel:${venueData.phones[0].raw}`} className="btn-outline-gold">
              <Phone className="w-4 h-4 text-amber-300" /> {venueData.phones[0].display}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
