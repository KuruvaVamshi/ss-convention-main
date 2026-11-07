import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
  CheckCircle2,
  Plus
} from 'lucide-react';
import { venueData } from '../data/venueData';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';

const facilitiesList = [
  {
    title: "Centralized Cassette Air Conditioning",
    teluguTitle: "సెంట్రలైజ్డ్ క్యాసెట్ ఎయిర్ కండిషనింగ్",
    category: "Climate & Comfort",
    desc: "Commercial Daikin multi-zone cassette cooling delivers continuous 22°C temperature throughout Hall Vasishta, Hall Agasthya, and Hall Koundinya, keeping guests cool and refreshed even during peak summer weddings.",
    icon: Snowflake,
    badge: "Daikin Cassette",
    highlights: ["Multi-zone airflow control", "Silent operation (no fan noise)", "Continuous fresh air circulation"]
  },
  {
    title: "Two Executive VIP Bridal Green Suites",
    teluguTitle: "రెండు ఎగ్జిక్యూటివ్ విఐపి గ్రీన్ రూమ్స్",
    category: "Bridal Privacy",
    desc: "Dedicated VIP suites (Bride Suite & Groom Suite) located directly behind the main stage. Features full-length illuminated vanity mirrors, comfortable plush sofas, attached private washrooms, and wardrobe storage.",
    icon: DoorClosed,
    badge: "Private AC Suites",
    highlights: ["Direct private backstage access", "Attached private washrooms", "Professional bridal makeup vanity lighting"]
  },
  {
    title: "Dedicated Banquet Dining Floor (250+ Seats)",
    teluguTitle: "ప్రత్యేక డైనింగ్ హాల్ (250+ సీటింగ్)",
    category: "Dining Comfort",
    desc: "A completely separate banquet dining level featuring round tables and buffet counters. By keeping dining on a dedicated floor, zero food aroma or moisture reaches the sacred marriage mandap.",
    icon: UtensilsCrossed,
    badge: "Zero Smell in Mandap",
    highlights: ["250+ concurrent banquet dining", "Round banquet tables & buffet islands", "Direct elevator and staircase access"]
  },
  {
    title: "100% Commercial DG Power Generator",
    teluguTitle: "100% ఆటోమేటిక్ జనరేటర్ బ్యాకప్",
    category: "Power Reliability",
    desc: "Heavy-duty soundproof diesel generator system with auto-transfer switch. In case of grid power interruption, backup activates in zero seconds, keeping crystal chandeliers, sound, and A/C uninterrupted.",
    icon: Zap,
    badge: "Zero-Second Blackout",
    highlights: ["Runs full hall A/C & lighting", "Soundproof heavy-duty unit", "Seamless auto-transfer switch"]
  },
  {
    title: "Ample On-Premises Car & Bike Parking",
    teluguTitle: "విశాలమైన పార్కింగ్ సదుపాయం",
    category: "Guest Convenience",
    desc: "Spacious on-premises parking capacity for 150+ vehicles. Dedicated security guards and CCTV cameras monitor entry and exit smoothly from Raghavendra Nagar Colony main road.",
    icon: Car,
    badge: "150+ Vehicles",
    highlights: ["On-premises secured lot", "Uniformed parking attendants", "24/7 CCTV surveillance"]
  },
  {
    title: "High-Speed Passenger Elevator",
    teluguTitle: "హై-స్పీడ్ ప్యాసెంజర్ లిఫ్ట్",
    category: "Accessibility",
    desc: "A modern commercial elevator linking the main entrance foyer, marriage hall, and dining floor. Ensures elderly relatives and guests with mobility challenges transit comfortably with zero stairs.",
    icon: ArrowUpCircle,
    badge: "All Floors Connected",
    highlights: ["Senior citizen friendly", "Wide cabin for family transit", "Smooth automatic leveling"]
  },
  {
    title: "Industrial RO Water Purification Plant",
    teluguTitle: "ఆర్వో మంచినీటి ప్లాంట్",
    category: "Hygiene & Health",
    desc: "On-site multi-stage Reverse Osmosis (RO) water purification plant delivering tested, pure drinking water for all dining services, live counters, and guest hydration stations.",
    icon: Droplets,
    badge: "Multi-Stage Tested",
    highlights: ["Tested safe drinking water", "Dedicated water coolers", "Hygienic food preparation supply"]
  },
  {
    title: "24/7 Perimeter CCTV & Security",
    teluguTitle: "24/7 సిసిటివి & భద్రత",
    category: "Security & Safety",
    desc: "Round-the-clock perimeter coverage with high-definition digital cameras across all entrances, aisles, stage areas, parking lots, and dining corridors, backed by trained on-site security guards.",
    icon: ShieldCheck,
    badge: "Full Perimeter Coverage",
    highlights: ["High-definition digital cameras", "Live monitoring console", "Trained security personnel"]
  },
  {
    title: "Wheelchair Accessible Ramps & Entrances",
    teluguTitle: "వీల్‌చైర్ యాక్సెసబుల్ ర్యాంప్",
    category: "Inclusivity",
    desc: "Thoughtfully engineered gentle-incline ramps at the grand entrance foyer allow effortless wheelchair and stroller access directly from the parking area into the air-conditioned hall.",
    icon: Accessibility,
    badge: "Step-Free Entry",
    highlights: ["Gentle-incline entrance ramp", "Wide double doors", "Accessible ground level foyer"]
  }
];

const quickFacts = [
  { to: 22, suffix: '°C', label: 'Steady cooling' },
  { to: 250, suffix: '+', label: 'Dining seats' },
  { to: 150, suffix: '+', label: 'Parking spots' },
  { to: 0, suffix: ' sec', label: 'Blackout' },
];

export default function FacilitiesPage({ lang }) {
  const [open, setOpen] = useState(0);

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

      {/* Facilities list */}
      <section className="py-20 sm:py-28 bg-[#3D0A14] border-b border-[#D4AF37]/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">Uncompromising Standards</h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            <p className="mt-4 text-mocha leading-relaxed">
              Every system is maintained and tested before each celebration, so nothing glitches on your special day.
            </p>
          </Reveal>

          <div className="border-t border-[#D4AF37]/25">
            {facilitiesList.map((item, idx) => {
              const IconComp = item.icon;
              const isOpen = open === idx;
              return (
                <div key={item.title} className="border-b border-[#D4AF37]/25">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="group w-full flex items-center gap-4 sm:gap-6 py-5 sm:py-6 text-left"
                  >
                    <span className="font-cinzel text-lg text-amber-300/60 group-hover:text-amber-300 transition-colors w-8">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="w-11 h-11 rounded-xl bg-[#350710] border border-[#D4AF37]/35 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400 transition-colors">
                      <IconComp className="w-5 h-5 text-amber-300" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[10px] tracking-[0.25em] uppercase text-amber-300/80">{item.category}</span>
                      <span className="block font-cinzel text-base sm:text-xl font-bold leading-snug">{item.title}</span>
                    </span>
                    <span className="hidden md:inline-block text-[11px] px-3 py-1 rounded-full border border-[#D4AF37]/35 text-mocha font-cinzel tracking-wider">
                      {item.badge}
                    </span>
                    <Plus className={`w-5 h-5 text-amber-300 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-12 sm:pl-[5.25rem] pr-2 sm:pr-10">
                          {lang === 'te' && <p className="text-sm text-amber-300 font-semibold mb-2">{item.teluguTitle}</p>}
                          <p className="text-mocha leading-relaxed">{item.desc}</p>
                          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2">
                            {item.highlights.map((h) => (
                              <li key={h} className="flex items-start gap-2 text-sm text-latte">
                                <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
