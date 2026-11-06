import React from 'react';
import { Link } from 'react-router-dom';
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
  Sparkles,
  Phone,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { venueData } from '../data/venueData';

export default function FacilitiesPage({ lang }) {
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

  return (
    <div className="bg-[#450B17] text-white min-h-screen pt-24">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-[#350710] to-[#450B17] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-serif text-xs sm:text-sm tracking-[0.35em] text-amber-300 uppercase block mb-2 drop-shadow">
            || శ్రీ రస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
          </span>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-widest uppercase mb-4 shadow-md backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>5-Star Infrastructure</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.1em] sm:tracking-[0.14em] text-white uppercase mb-4 drop-shadow">
            {lang === 'te' ? 'రాయల్ సదుపాయాలు & సౌకర్యాలు' : 'FACILITIES & AMENITIES'}
          </h1>
          <p className="text-amber-100/85 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            {lang === 'te'
              ? 'సెంట్రల్ ఎసి, విఐపి గ్రీన్ రూమ్స్, ఆటోమేటిక్ జనరేటర్ మరియు విశాలమైన పార్కింగ్ – మీ అతిథులకు అత్యుత్తమ సౌకర్యాలు.'
              : 'Engineered for seamless guest comfort. From Daikin central climate control and two VIP bridal suites to 100% power generator backup and 150+ parking slots.'}
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24 bg-[#3D0A14] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-3">
              Uncompromising Standards for Your Special Day
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm font-normal">
              Every system is professionally maintained and tested prior to each celebration to guarantee zero glitches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilitiesList.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-[32px] bg-[#450B17] border-2 border-[#D4AF37]/40 shadow-2xl hover:border-amber-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-13 h-13 rounded-2xl bg-[#32060E] border border-[#D4AF37]/50 flex items-center justify-center text-amber-300 shadow-md group-hover:scale-105 transition-transform p-3">
                        <IconComp className="w-7 h-7 text-amber-400" />
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-black/60 border border-[#D4AF37]/40 text-amber-300 uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h3>
                    {lang === 'te' && (
                      <p className="text-xs text-amber-300 font-semibold mb-2">
                        {item.teluguTitle}
                      </p>
                    )}
                    <p className="text-xs text-amber-100/80 leading-relaxed font-normal mb-6">
                      {item.desc}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-[#D4AF37]/20">
                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-amber-200/90 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guidelines & Slot Timings Teaser */}
      <section className="py-20 bg-[#350710] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-10 rounded-[32px] bg-[#450B17] border-2 border-[#D4AF37]/45 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
                Transparency & Rules
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
                Venue Policies & Slot Schedules
              </h3>
              <p className="text-xs text-amber-100/80 max-w-lg leading-relaxed font-normal">
                Review our clear vacation timings (3 PM lunch / 11 PM dinner), outside decor policies, and payment terms for smooth operations.
              </p>
            </div>
            <Link
              to="/policies"
              className="px-6 py-3.5 rounded-full bg-[#32060E] border border-amber-400/60 text-amber-300 hover:bg-amber-400 hover:text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-md"
            >
              View Venue Policies →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Inquiries CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-white text-center border-t border-[#D4AF37]/30 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-3 tracking-wide">
            Experience Our Facilities in Person
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-sm max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Walk through our air-conditioned halls, inspect the VIP green rooms, and see the dedicated dining floor firsthand.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#3D0A14]" />
              <span>Book In-Person Venue Tour</span>
            </Link>
            <a
              href={`tel:${venueData.phones[0].raw}`}
              className="px-8 py-3.5 rounded-full border border-amber-300/60 text-white hover:bg-white/10 font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call +91 89857 00044</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

