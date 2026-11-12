import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  spacesData,
  getHallById
} from '../data/spacesData';
import { venueData } from '../data/venueData';
import {
  Users,
  Snowflake,
  Maximize2,
  Calendar,
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  DoorClosed,
  Volume2,
  Lightbulb,
  Zap,
  UtensilsCrossed,
  Car,
  Accessibility,
  Flame,
  Droplets,
  HelpCircle,
  Eye,
  Building,
  Clock,
  Compass
} from 'lucide-react';

// Icon Map for dynamic amenities
const iconMap = {
  Snowflake,
  DoorClosed,
  Volume2,
  Lightbulb,
  Zap,
  UtensilsCrossed,
  Car,
  Accessibility,
  Flame,
  Droplets,
  HelpCircle,
  ShieldCheck,
  Users,
  Sparkles
};

export default function HallDetailPage({ onOpenLightbox, lang }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find hall or fallback to first hall
  const hall = getHallById(id) || spacesData[0];

  // Active gallery filter
  const [activeTab, setActiveTab] = useState('all');
  const [activeLayout, setActiveLayout] = useState('theatre');

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Wedding & Reception',
    eventDate: '',
    guestCount: hall.capacity.split('–')[0] || '300',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll to top on hall switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSubmitted(false);
  }, [id]);

  // Sibling halls for navigation
  const otherHalls = spacesData.filter((h) => h.id !== hall.id);

  // Handle Form Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Enquiry Submit via WhatsApp / Direct
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    const message = `*SS Convention Hall Enquiry - ${hall.name}*\n\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Phone:* ${formData.phone}\n` +
      `• *Selected Hall:* ${hall.name} (${hall.capacityDisplay})\n` +
      `• *Event Type:* ${formData.eventType}\n` +
      `• *Expected Date:* ${formData.eventDate || 'To be decided'}\n` +
      `• *Expected Guests:* ${formData.guestCount}\n` +
      `• *Special Notes:* ${formData.notes || 'None'}\n\n` +
      `Please provide availability and a royal booking estimate.`;

    const whatsappUrl = `https://wa.me/${venueData.whatsapp.raw}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  const seoConfig = {
    'hall-vasishta': {
      title: 'Hall Vasishta – Grand Wedding & Reception Hall in Meerpet | S.S. Convention',
      description: 'Book Hall Vasishta at S.S. Convention Meerpet, Hyderabad. Ideal for grand weddings & receptions with 300–600 seated capacity, crystal chandeliers, central A/C.',
      keywords: 'Hall Vasishta, Banquet Hall Meerpet, Wedding & Reception Hall, Kalyana Mandapam Hyderabad, Marriage Hall Meerpet, Wedding Venue Meerpet, Function Halls in Meerpet',
      h1Sub: 'Grand Kalyana Mandapam & Wedding Hall · Meerpet, Hyderabad'
    },
    'hall-agasthya': {
      title: 'Hall Agasthya – Luxury Banquet & Sangeet Hall Meerpet | S.S. Convention',
      description: 'Hall Agasthya is premier banquet and function hall in Meerpet, Hyderabad for sangeet, engagements, and cocktail receptions with 150–350 guest capacity.',
      keywords: 'Hall Agasthya, Function Hall Meerpet, Banquet Hall Meerpet, Engagement Hall Hyderabad, Sangeet Venue Hyderabad, Marriage Halls in Hyderabad',
      h1Sub: 'Banquet & Sangeet Reception Hall · Meerpet, Hyderabad'
    },
    'hall-koundinya': {
      title: 'Hall Koundinya – Mini Banquet & Marriage Hall Meerpet | S.S. Convention',
      description: 'Hall Koundinya at S.S. Convention Meerpet is an intimate mini banquet hall for cradle ceremonies, birthday parties, and compact weddings (50–150 guests).',
      keywords: 'Hall Koundinya, Marriage Hall Meerpet, Mini Banquet Hall Hyderabad, Birthday Party Halls in Hyderabad, Engagement Halls in Hyderabad',
      h1Sub: 'Mini Banquet & Marriage Hall · Meerpet, Hyderabad'
    },
    'banquet-dining-hall': {
      title: 'Royal Banquet Dining Hall in Meerpet | S.S. Convention Hyderabad',
      description: 'Dedicated 250+ capacity banquet dining hall at S.S. Convention in Jillelaguda, Meerpet. Features round-table setup and zero aroma transfer into ceremony halls.',
      keywords: 'Banquet Dining Hall Meerpet, Dining Hall Hyderabad, Wedding Feast Meerpet, Banquet Catering Hyderabad',
      h1Sub: 'Dedicated Banquet Dining Hall · Meerpet, Hyderabad'
    }
  };

  const currentSeo = seoConfig[hall.id] || {
    title: `${hall.name} | S.S. Convention Meerpet, Hyderabad`,
    description: hall.shortDescription || hall.subtitle,
    keywords: `${hall.name}, Function Halls in Meerpet, Wedding Halls in Meerpet, Banquet Halls in Hyderabad`,
    h1Sub: 'Luxury Celebration Sanctuary · Meerpet, Hyderabad'
  };

  const hallStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    'name': `${hall.name} - S.S. Convention A/C`,
    'description': hall.shortDescription || hall.subtitle,
    'image': `https://www.ssconvention.in${hall.image}`,
    'maximumAttendeeCapacity': hall.capacity,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Raghavendra Nagar Colony, Jillelaguda',
      'addressLocality': 'Meerpet',
      'addressRegion': 'Telangana',
      'postalCode': '500097',
      'addressCountry': 'IN'
    }
  };

  return (
    <div className="bg-[#450B17] text-white min-h-screen pt-20 selection:bg-[#D4AF37] selection:text-[#3A0813]">
      <SEO
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        canonical={`/halls/${hall.id}`}
        ogImage={hall.image}
        structuredData={hallStructuredData}
      />
      
      {/* ========================================================
          1. CINEMATIC HALL HERO SECTION
          ======================================================== */}
      <section className="relative min-h-[75vh] lg:min-h-[82vh] flex items-end pb-16 pt-24 overflow-hidden border-b border-[#D4AF37]/35">
        {/* Full-width Real Interior Background Photo */}
        <div className="absolute inset-0 bg-black">
          <img
            src={hall.coverImage || hall.image}
            alt={`${hall.name} luxury wedding & banquet hall interior at S.S. Convention Meerpet`}
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow brightness-90"
          />
          {/* Multi-layered Royal Velvet & Dark Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#450B17] via-[#450B17]/75 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3A0813]/90 via-transparent to-[#3A0813]/70" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-200/80 uppercase mb-4">
            <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/spaces" className="hover:text-amber-300 transition-colors">Our Halls</Link>
            <span>/</span>
            <span className="text-amber-300 font-bold">{hall.name}</span>
          </div>

          <div className="max-w-4xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#D4AF37]/60 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-xl backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{hall.tagline || 'Royal Celebration Sanctuary'}</span>
            </div>

            {/* Hall Title with SEO H1 */}
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-white uppercase mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-tight">
              {hall.name}
              <span className="block text-xs sm:text-sm md:text-base font-cinzel text-amber-300 tracking-[0.22em] uppercase font-normal mt-2">
                {currentSeo.h1Sub}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-amber-100/90 text-sm sm:text-lg md:text-xl font-light tracking-wide leading-relaxed mb-6 max-w-3xl drop-shadow">
              {hall.subtitle}
            </p>

            {/* Capacity & Highlights Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 border border-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md">
                <Users className="w-4 h-4 text-amber-300" />
                <span>{hall.capacityDisplay}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 border border-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md">
                <Compass className="w-4 h-4 text-amber-300" />
                <span>{hall.dimensions}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 border border-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md">
                <Snowflake className="w-4 h-4 text-amber-300" />
                <span>Centralized A/C</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#enquiry-section"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs sm:text-sm tracking-[0.16em] uppercase shadow-2xl hover:scale-105 hover:shadow-amber-500/25 transition-all flex items-center gap-2"
              >
                <span>Enquire For This Hall</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => onOpenLightbox(hall.coverImage || hall.image, hall.name)}
                className="px-6 py-4 rounded-full bg-black/60 border border-[#D4AF37]/50 text-amber-200 hover:text-white hover:bg-black/80 font-cinzel font-bold text-xs sm:text-sm tracking-[0.14em] uppercase transition-all backdrop-blur-md flex items-center gap-2"
              >
                <Maximize2 className="w-4 h-4 text-amber-300" />
                <span>View Fullscreen Tour</span>
              </button>

              <a
                href={`tel:${venueData.phones[0].raw}`}
                className="px-6 py-4 rounded-full border border-white/30 hover:border-amber-400 text-white hover:text-amber-300 font-cinzel font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call Venue Manager</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          2. SPECIFICATIONS AT-A-GLANCE BAR
          ======================================================== */}
      <section className="bg-[#350710] border-b border-[#D4AF37]/25 py-8 text-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-black/30 border border-[#D4AF37]/20">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300/80 block mb-1">
                Seating Capacity
              </span>
              <p className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                {hall.capacity}
              </p>
              <span className="text-[11px] text-amber-100/70">Banquet & Theatre</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-[#D4AF37]/20">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300/80 block mb-1">
                Floor Dimensions
              </span>
              <p className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                {hall.dimensions.split('•')[0] || 'Spacious'}
              </p>
              <span className="text-[11px] text-amber-100/70">Unobstructed Sightlines</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-[#D4AF37]/20">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300/80 block mb-1">
                Stage Dimensions
              </span>
              <p className="font-cinzel text-lg sm:text-xl font-bold text-white">
                {hall.specs?.stageDimensions?.split('×')[0] || 'Full Stage'}
              </p>
              <span className="text-[11px] text-amber-100/70">Theatrical Lighting Truss</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-[#D4AF37]/20">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300/80 block mb-1">
                Climate Control
              </span>
              <p className="font-cinzel text-lg sm:text-xl font-bold text-white">
                Centralized A/C
              </p>
              <span className="text-[11px] text-amber-100/70">100% Generator Backup</span>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          3. COMPREHENSIVE AUTHENTIC INTERIOR PHOTO GALLERY
          ======================================================== */}
      <section className="py-24 bg-[#3D0A14] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Interior Photography</span>
              </div>
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white uppercase tracking-wide">
                Inside {hall.name}
              </h2>
              <p className="text-amber-100/80 text-xs sm:text-base mt-2 max-w-2xl font-light">
                Actual high-definition interior photographs showcasing the chandelier perspectives, aisle, stage arrangements, and seating layout.
              </p>
            </div>

            <div className="mt-4 md:mt-0 text-xs text-amber-200/70 font-medium">
              Click any photograph to inspect in full-screen zoom.
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hall.gallery?.map((item, index) => (
              <div
                key={index}
                onClick={() => onOpenLightbox(item.src, `${hall.name} - ${item.title}`)}
                className="group relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/35 bg-black cursor-pointer shadow-xl hover:border-amber-400 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="h-64 overflow-hidden bg-black">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase block mb-1">
                    {item.category}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-white leading-snug line-clamp-2">
                    {item.title}
                  </p>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-[#D4AF37]/50 text-amber-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================
          4. ARCHITECTURAL HIGHLIGHTS & AMBIANCE
          ======================================================== */}
      <section className="py-24 bg-[#450B17] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story & Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Architectural Ambiance</span>
              </div>

              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white uppercase tracking-wide leading-tight">
                Designed for Grandeur, Crafted for Sacred Memories
              </h2>

              <p className="text-amber-100/90 text-sm sm:text-base font-light leading-relaxed">
                {hall.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-3 pt-4">
                <h3 className="font-cinzel text-lg font-bold text-amber-300 tracking-wider uppercase">
                  Key Venue Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hall.highlights?.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-black/25 border border-[#D4AF37]/25 text-xs text-amber-100/90">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Technical Specifications Card */}
            <div className="lg:col-span-5 bg-[#380812] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/45 shadow-2xl">
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-6 tracking-wide border-b border-[#D4AF37]/30 pb-3 flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" />
                <span>Technical Specifications</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-[#D4AF37]/20">
                  <span className="text-amber-200/80 font-medium">Floor Area</span>
                  <span className="text-white font-bold text-right">{hall.specs?.floorArea || hall.dimensions}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#D4AF37]/20">
                  <span className="text-amber-200/80 font-medium">Clear Ceiling Height</span>
                  <span className="text-white font-bold text-right">{hall.specs?.ceilingHeight || '16 ft'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#D4AF37]/20">
                  <span className="text-amber-200/80 font-medium">Stage Dimensions</span>
                  <span className="text-white font-bold text-right">{hall.specs?.stageDimensions || 'Generous'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#D4AF37]/20">
                  <span className="text-amber-200/80 font-medium">Air Conditioning</span>
                  <span className="text-white font-bold text-right">{hall.specs?.cooling || 'Centralized'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#D4AF37]/20">
                  <span className="text-amber-200/80 font-medium">Power Backup</span>
                  <span className="text-white font-bold text-right">{hall.specs?.powerBackup || '100% DG Backup'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#D4AF37]/20">
                  <span className="text-amber-200/80 font-medium">Flooring</span>
                  <span className="text-white font-bold text-right">{hall.specs?.flooring || 'Italian Vitrified'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-amber-200/80 font-medium">Green Rooms</span>
                  <span className="text-white font-bold text-right">{hall.specs?.greenRooms || 'VIP Suites'}</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D4AF37]/30 text-center">
                <a
                  href="#enquiry-section"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-widest shadow-lg hover:brightness-110 transition-all"
                >
                  <span>Request Floor Plan & Quote</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          5. SEATING CONFIGURATIONS & CAPACITIES
          ======================================================== */}
      {hall.capacities && (
        <section className="py-20 bg-[#350710] border-b border-[#D4AF37]/30 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-3">
                Seating & Capacity Layouts
              </h2>
              <p className="text-amber-100/80 text-xs sm:text-base font-light">
                Tailored arrangements engineered for unobstructed guest viewing and fluid movement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(hall.capacities).map(([key, value], idx) => (
                <div
                  key={key}
                  className="p-6 rounded-2xl bg-black/40 border border-[#D4AF37]/35 hover:border-amber-400 transition-all text-center flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-cinzel text-lg font-bold text-amber-300 uppercase tracking-wider mb-2">
                      {key === 'theatre' ? 'Theatre Layout' :
                       key === 'floating' ? 'Floating Reception' :
                       key === 'roundTable' ? 'Round Table Banquet' :
                       key === 'mandapAudience' ? 'Ceremonial Mandap' :
                       key === 'sangeetCluster' ? 'Sangeet Cluster' :
                       key === 'traditionalPanti' ? 'Panti Style Feast' :
                       key === 'buffetCapacity' ? 'Rolling Buffet' :
                       key.toUpperCase()}
                    </h3>
                    <p className="font-bold text-white text-base sm:text-lg mb-2">
                      {value}
                    </p>
                  </div>
                  <span className="text-[10px] text-amber-200/70 uppercase tracking-widest block pt-2 border-t border-[#D4AF37]/20">
                    Optimal Visibility
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ========================================================
          6. FACILITIES & AMENITIES MATRIX
          ======================================================== */}
      <section className="py-24 bg-[#3D0A14] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Amenities</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-3">
              Hall Amenities & Facilities
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-base font-light">
              Every detail is engineered to ensure seamless execution for family, guests, and vendors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hall.amenities?.map((amenity, idx) => {
              const IconComp = iconMap[amenity.icon] || Sparkles;
              return (
                <div
                  key={idx}
                  className="bg-[#480D1A] p-6 rounded-2xl border border-[#D4AF37]/35 shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-black/40 border border-[#D4AF37]/40 text-amber-300 flex items-center justify-center mb-4">
                      <IconComp className="w-5 h-5 text-amber-300" />
                    </div>
                    <h3 className="font-cinzel text-base font-bold text-white mb-2">
                      {amenity.name}
                    </h3>
                    <p className="text-xs text-amber-100/80 leading-relaxed font-light">
                      {amenity.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ========================================================
          7. SUITABLE OCCASIONS & EVENT CATEGORIES
          ======================================================== */}
      <section className="py-24 bg-[#450B17] border-b border-[#D4AF37]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Celebration Spectrum</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-3">
              Events Perfectly Suited for {hall.name}
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-base font-light">
              From auspicious sacred muhurthams to high-energy evening receptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hall.suitableEvents?.map((event, idx) => (
              <div
                key={idx}
                className="bg-[#3A0813] p-6 rounded-2xl border-2 border-[#D4AF37]/30 hover:border-amber-400 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase block mb-2">
                    Occasion 0{idx + 1}
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-100/80 font-light leading-relaxed">
                    {event.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#D4AF37]/20 flex items-center gap-2 text-xs text-amber-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Custom stage decor & theme available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================
          8. DEDICATED BOOKING & ENQUIRY SECTION
          ======================================================== */}
      <section id="enquiry-section" className="py-24 bg-gradient-to-b from-[#350710] to-[#28040B] text-white border-b border-[#D4AF37]/40 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 block mb-2">
              Reserve Your Auspicious Date
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-4">
              Enquire For {hall.name}
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-base font-light leading-relaxed">
              Connect directly with our senior venue management team. We will review availability, arrange an in-person walkthrough, and provide a transparent, all-inclusive estimate.
            </p>
          </div>

          {/* Booking Card Form */}
          <div className="bg-[#450B17] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  Enquiry Dispatched Successfully!
                </h3>
                <p className="text-amber-100/90 text-sm max-w-md mx-auto">
                  Your enquiry has been transmitted via WhatsApp to our venue coordinators. We will respond promptly with date confirmation and pricing details.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-amber-300 text-amber-300 text-xs uppercase font-bold tracking-wider hover:bg-white/10 transition-all"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#D4AF37]/40 text-white placeholder-amber-100/40 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#D4AF37]/40 text-white placeholder-amber-100/40 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    />
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                      Occasion / Event Category
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#28040B] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    >
                      <option value="Grand Wedding & Muhurtham">Grand Wedding & Muhurtham</option>
                      <option value="Evening Reception Gala">Evening Reception Gala</option>
                      <option value="Sangeet / Mehendi Night">Sangeet / Mehendi Night</option>
                      <option value="Engagement / Ring Ceremony">Engagement / Ring Ceremony</option>
                      <option value="1st Birthday / Milestone Celebration">1st Birthday / Milestone Celebration</option>
                      <option value="Cradle Ceremony (Barasala)">Cradle Ceremony (Barasala)</option>
                      <option value="Half-Saree / Dhoti Ceremony">Half-Saree / Dhoti Ceremony</option>
                      <option value="Corporate Banquet / Meeting">Corporate Banquet / Meeting</option>
                    </select>
                  </div>

                  {/* Expected Date */}
                  <div>
                    <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#28040B] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    />
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                      Expected Guest Count
                    </label>
                    <input
                      type="text"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      placeholder="e.g. 500 Guests"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#D4AF37]/40 text-white placeholder-amber-100/40 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    />
                  </div>

                  {/* Selected Hall Indicator */}
                  <div>
                    <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                      Selected Hall
                    </label>
                    <div className="w-full px-4 py-3 rounded-xl bg-black/60 border border-amber-400/60 text-amber-300 font-bold text-sm">
                      {hall.name} ({hall.capacityDisplay.split('(')[0]})
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                    Additional Requests or Special Requirements
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Tell us about catering requirements, decoration preferences, or any specific muhurtham timings..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#D4AF37]/40 text-white placeholder-amber-100/40 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                  ></textarea>
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#3D0A14] font-cinzel font-bold text-xs sm:text-sm tracking-[0.16em] uppercase shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Send Enquiry via WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${venueData.phones[0].raw}`}
                    className="w-full sm:w-auto px-6 py-4 rounded-full border border-amber-300/60 hover:bg-white/10 text-white font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>Call +91 89857 00044</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>


      {/* ========================================================
          9. SISTER HALLS DISCOVERY (EXPLORE OTHER VENUES)
          ======================================================== */}
      <section className="py-24 bg-[#3D0A14] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-2">
                More Spaces at SS Convention
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white uppercase tracking-wide">
                Explore Other Halls
              </h2>
            </div>

            <Link
              to="/spaces"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-300 hover:text-white transition-colors"
            >
              <span>View All Spaces & Comparison</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherHalls.map((siblingHall) => (
              <div
                key={siblingHall.id}
                className="bg-[#480E19] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/35 flex flex-col group hover:border-amber-400 transition-all duration-300 shadow-xl"
              >
                <div className="h-56 relative overflow-hidden bg-black">
                  <img
                    src={siblingHall.image}
                    alt={siblingHall.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                      {siblingHall.capacityDisplay}
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-white">
                      {siblingHall.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-amber-100/80 font-light line-clamp-3">
                    {siblingHall.shortDescription || siblingHall.description}
                  </p>

                  <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between">
                    <Link
                      to={`/halls/${siblingHall.id}`}
                      className="text-xs font-bold text-amber-300 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore {siblingHall.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

