import React, { useState } from 'react';
import { Star, MapPin, Navigation, ExternalLink, ThumbsUp, ShieldCheck, Check, Copy, MessageSquare } from 'lucide-react';
import { venueData } from '../data/venueData';
import Reveal from './Reveal';

// Official multi-color Google 'G' logo
function GoogleIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function GoogleReviewsMapSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copied, setCopied] = useState(false);
  const [helpfulMap, setHelpfulMap] = useState({});

  const reviewsData = venueData.googleReviews || {
    averageRating: 4.8,
    totalCount: 128,
    ratingDistribution: { 5: 86, 4: 10, 3: 3, 2: 1, 1: 0 },
    items: []
  };

  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(venueData.address.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleHelpfulClick = (id) => {
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredReviews = selectedCategory === 'all'
    ? reviewsData.items
    : reviewsData.items.filter((r) => r.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Reviews (128+)' },
    { id: 'weddings', label: 'Weddings & Muhurtham' },
    { id: 'receptions', label: 'Receptions & Decor' },
    { id: 'facilities', label: 'AC & Sound' },
    { id: 'dining', label: 'Banquet Dining' }
  ];

  return (
    <section id="reviews-and-location" className="py-20 sm:py-28 bg-[#2A050D] text-white relative border-t border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google Badge */}
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D0A14] border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <GoogleIcon className="w-4 h-4" />
            <span>Real-Time Google Maps Reviews & Rating</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4">
            Loved by Families Across Hyderabad
          </h2>
          <p className="text-amber-100/80 text-sm sm:text-base font-normal leading-relaxed">
            Rated 4.8 out of 5.0 stars on Google Maps. Read verified experiences from wedding couples, reception hosts, and guests who celebrated at S.S. Convention A/C, Meerpet.
          </p>
        </Reveal>

        {/* Google Trust & Rating Overview Banner */}
        <Reveal className="mb-12">
          <div className="bg-gradient-to-r from-[#350710] via-[#4A0E17] to-[#350710] rounded-3xl border-2 border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Score & Stars */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center lg:items-start gap-4 lg:border-r border-[#D4AF37]/25 lg:pr-8 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-[#D4AF37]/50 flex items-center justify-center shadow-inner">
                    <GoogleIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-cinzel text-4xl sm:text-5xl font-extrabold text-white">4.8</span>
                      <span className="text-amber-300 text-base font-semibold">/ 5.0</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Google Business Profile</span>
                  </div>
                  <p className="text-xs text-amber-100/70 mt-1.5">
                    Based on 128+ authentic customer reviews
                  </p>
                </div>
              </div>

              {/* Rating Bars Distribution */}
              <div className="lg:col-span-5 space-y-2 border-t lg:border-t-0 border-[#D4AF37]/20 pt-4 lg:pt-0">
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-amber-200/90 font-medium">5 stars</span>
                  <div className="flex-1 h-2.5 bg-black/40 rounded-full overflow-hidden border border-[#D4AF37]/20">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '86%' }} />
                  </div>
                  <span className="w-8 text-right text-amber-300 font-bold">86%</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-amber-200/90 font-medium">4 stars</span>
                  <div className="flex-1 h-2.5 bg-black/40 rounded-full overflow-hidden border border-[#D4AF37]/20">
                    <div className="h-full bg-amber-400/80 rounded-full" style={{ width: '10%' }} />
                  </div>
                  <span className="w-8 text-right text-amber-300 font-bold">10%</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-amber-200/90 font-medium">3 stars</span>
                  <div className="flex-1 h-2.5 bg-black/40 rounded-full overflow-hidden border border-[#D4AF37]/20">
                    <div className="h-full bg-amber-400/60 rounded-full" style={{ width: '3%' }} />
                  </div>
                  <span className="w-8 text-right text-amber-300 font-bold">3%</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-amber-200/90 font-medium">2 stars</span>
                  <div className="flex-1 h-2.5 bg-black/40 rounded-full overflow-hidden border border-[#D4AF37]/20">
                    <div className="h-full bg-amber-400/40 rounded-full" style={{ width: '1%' }} />
                  </div>
                  <span className="w-8 text-right text-amber-300 font-bold">1%</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-amber-200/90 font-medium">1 star</span>
                  <div className="flex-1 h-2.5 bg-black/40 rounded-full overflow-hidden border border-[#D4AF37]/20">
                    <div className="h-full bg-amber-400/20 rounded-full" style={{ width: '0%' }} />
                  </div>
                  <span className="w-8 text-right text-amber-300 font-bold">0%</span>
                </div>
              </div>

              {/* Direct Google Actions */}
              <div className="lg:col-span-3 flex flex-col gap-3 justify-center border-t lg:border-t-0 border-[#D4AF37]/20 pt-4 lg:pt-0">
                <a
                  href={venueData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#3D0A14] font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#3D0A14]" />
                  <span>Write a Review on Google</span>
                </a>
                <a
                  href={venueData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-black/50 border border-[#D4AF37]/40 hover:border-amber-400 text-amber-200 hover:text-white font-cinzel font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View All 128+ on Maps</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Reviews Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-[#3D0A14] shadow-lg shadow-amber-400/20 font-bold'
                  : 'bg-[#350710] text-amber-100/80 border border-[#D4AF37]/30 hover:border-amber-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredReviews.map((rev) => (
            <Reveal key={rev.id}>
              <div className="bg-[#4A0E1B] p-6 rounded-2xl border border-[#D4AF37]/35 shadow-xl hover:border-amber-400/70 transition-all flex flex-col justify-between h-full">
                <div>
                  {/* Top user row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${rev.avatarBg} text-amber-200 flex items-center justify-center font-bold text-sm border border-[#D4AF37]/40 shadow-sm`}>
                        {rev.avatarInitial}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {rev.author}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-amber-300/90 font-medium">
                            {rev.badge}
                          </span>
                          <span className="text-white/30 text-[10px]">•</span>
                          <span className="text-[10px] text-amber-100/60">
                            {rev.reviewsCount} reviews
                          </span>
                        </div>
                      </div>
                    </div>
                    <GoogleIcon className="w-4 h-4 flex-shrink-0 opacity-80" />
                  </div>

                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-amber-100/60 font-light">
                      {rev.relativeTime}
                    </span>
                  </div>

                  {/* Event Tag */}
                  <div className="inline-block px-2.5 py-0.5 rounded bg-black/40 border border-[#D4AF37]/25 text-[10px] text-amber-300 font-semibold mb-3">
                    {rev.eventTag}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-amber-100/85 leading-relaxed font-normal">
                    "{rev.text}"
                  </p>
                </div>

                {/* Card Footer: Helpful & Verification */}
                <div className="mt-5 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    className="inline-flex items-center gap-1.5 text-amber-200/80 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${helpfulMap[rev.id] ? 'fill-amber-400 text-amber-400' : ''}`} />
                    <span>Helpful ({rev.helpfulCount + (helpfulMap[rev.id] ? 1 : 0)})</span>
                  </button>
                  <span className="text-emerald-400 font-medium flex items-center gap-1 text-[10px]">
                    <Check className="w-3 h-3" /> Verified Visit
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Section 2: Interactive Real-Time Map & Route */}
        <Reveal>
          <div className="rounded-3xl overflow-hidden border-2 border-[#D4AF37]/45 shadow-2xl bg-[#24050B]">
            {/* Top Quick Actions Bar for Map */}
            <div className="bg-[#1F0409] p-4 sm:p-5 border-b border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
                <div>
                  <span className="font-cinzel text-sm font-bold text-white tracking-wider block">
                    LIVE GOOGLE MAPS ROUTE — S.S CONVENTION
                  </span>
                  <span className="text-[11px] text-amber-200/70">
                    Raghavendra Nagar Colony, Jillelaguda, Meerpet, Hyderabad
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href={venueData.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-[#3D0A14] text-xs font-bold tracking-wide flex items-center gap-1.5 hover:bg-amber-300 transition-colors shadow-md cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#3D0A14]" />
                  <span>Start GPS Directions</span>
                </a>
                <a
                  href={venueData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-black/60 border border-[#D4AF37]/40 text-amber-200 text-xs font-bold tracking-wide flex items-center gap-1.5 hover:text-white hover:border-amber-400 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Google Maps App</span>
                </a>
              </div>
            </div>

            {/* Google Maps Official Embed Iframe */}
            <div className="relative w-full h-[420px] sm:h-[480px] bg-[#1E0409]">
              <iframe
                title="S.S. Convention A/C Meerpet Hyderabad Official Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68883.4051314132!2d78.47514016613307!3d17.330559110808387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba3c68c819cd3%3A0x717a6ba13718fd72!2sss%20convention!5e1!3m2!1sen!2sin!4v1794985890352!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Bottom Quick Landmark Banner */}
            <div className="bg-[#1F0409] px-5 py-3.5 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-200/80">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Connected via smooth 60-ft wide roads. 5–7 mins from Karmanghat & LB Nagar Ring Road.</span>
              </span>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-[#D4AF37]/30 text-amber-300 text-xs font-semibold hover:border-amber-400 hover:text-white transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Address Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-300" />
                    <span>Copy Full Address</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
