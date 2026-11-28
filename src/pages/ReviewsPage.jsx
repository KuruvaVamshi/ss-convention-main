import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Quote,
  ShieldCheck,
  MessageSquare,
  ExternalLink,
  Calendar,
  ArrowRight,
  ThumbsUp,
  Check,
  Sparkles,
  Users
} from 'lucide-react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import ResponsiveImage from '../components/ResponsiveImage';
import GoogleReviewsMapSection from '../components/GoogleReviewsMapSection';
import { WhatsAppButton, CallButton } from '../components/ContactButtons';
import { venueData } from '../data/venueData';
import { spacesData } from '../data/spacesData';

const EMPTY_SLOT_SPACES = spacesData.slice(0, 3);

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [helpfulMap, setHelpfulMap] = useState({});

  const reviewsData = venueData.googleReviews || {
    averageRating: null,
    totalCount: 0,
    items: []
  };
  const verifiedReviews = Array.isArray(reviewsData.items) ? reviewsData.items : [];
  const hasVerifiedReviews = verifiedReviews.length > 0;

  const categories = [
    { id: 'all', label: `All Reviews (${verifiedReviews.length})` },
    { id: 'weddings', label: 'Weddings & Muhurtham' },
    { id: 'receptions', label: 'Receptions & Decor' },
    { id: 'facilities', label: 'AC & Amenities' },
    { id: 'dining', label: 'Banquet Dining' }
  ];

  const filteredReviews = selectedCategory === 'all'
    ? verifiedReviews
    : verifiedReviews.filter((r) => r.category === selectedCategory);

  const toggleHelpful = (id) => {
    setHelpfulMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-[#450B17] text-latte min-h-screen overflow-x-clip selection:bg-[#C5A059] selection:text-[#0D0204]">
      <SEO
        title="Guest Reviews & Testimonials | S.S. Convention Meerpet, Hyderabad"
        description="Read verified experiences and share feedback for S.S. Convention A/C in Jillelaguda, Meerpet, Hyderabad — Hall Agasthya (Max 400 Guests), Hall Vasishta (Max 600 Guests), and Hall Koundinya (Max 250 Guests)."
        keywords="S.S. Convention Reviews, SS Convention Meerpet Reviews, Wedding Hall Reviews Meerpet, Function Hall Feedback Hyderabad, Banquet Hall Reviews Jillelaguda"
        canonical="/reviews"
      />

      {/* Hero Banner */}
      <section className="relative min-h-[38vh] sm:min-h-[50vh] flex items-end pt-24 pb-10 sm:pt-32 sm:pb-14 border-b border-[#D4AF37]/30">
        <ResponsiveImage
          src="/assets/03_reception/reception_lord_balaji_buddha_foyer_10.jpeg"
          alt="S.S. Convention Grand Welcome Foyer and Guest Reception Lounge in Meerpet, Hyderabad"
          sizes="(max-width: 767px) 140vw, 100vw"
          priority
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A060E] via-black/40 sm:via-black/25 to-black/20 sm:to-black/10" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3">
              Hospitality & Celebrations · Meerpet
            </p>
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide leading-[1.1] uppercase">
              WHAT OUR GUESTS SAY
              <span className="block normal-case text-transparent bg-clip-text bg-gradient-to-r from-[#EED9A6] to-[#C5A059] text-xl sm:text-3xl mt-2 font-normal">
                Reflections & Stories from S.S. Convention, Hyderabad
              </span>
            </h1>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#C5A059] to-transparent" />
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-mocha leading-relaxed">
              Every family milestone deserves genuine care, spotless maintenance, and gracious service. Explore authentic guest reviews and share your experience with us.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Testimonials Section */}
      <section className="py-14 sm:py-20 bg-[#3D0A14] border-b border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Guest Voices & Reflections" title="Verified Guest Testimonials">
            Dedicated to genuine customer testimonials from celebrations hosted across Hall Agasthya, Hall Vasishta, and Hall Koundinya.
          </SectionHeader>

          {hasVerifiedReviews ? (
            <>
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-cinzel tracking-wider transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-[#B8860B] via-[#EED9A6] to-[#C5A059] text-[#1C0409] font-bold shadow-lg'
                        : 'bg-[#350710] text-mocha border border-[#D4AF37]/30 hover:border-amber-400/70 hover:text-latte'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Verified Testimonials Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((rev, i) => (
                  <Reveal key={rev.id} delay={i * 0.06} className="h-full">
                    <article className="ss-lift h-full rounded-2xl bg-[#5E1628] border border-[#D4AF37]/35 hover:border-amber-400/70 p-6 sm:p-7 shadow-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${rev.avatarBg || 'bg-amber-800'} text-amber-200 flex items-center justify-center font-bold text-sm border border-[#D4AF37]/40`}>
                              {rev.avatarInitial || rev.author?.[0] || 'G'}
                            </div>
                            <div>
                              <h3 className="font-cinzel text-sm font-bold text-latte">{rev.author}</h3>
                              {rev.badge && <p className="text-[11px] text-amber-300/90">{rev.badge}</p>}
                            </div>
                          </div>
                          <Quote className="w-5 h-5 text-[#D4AF37]/45 flex-shrink-0" aria-hidden="true" />
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(rev.rating || 5)].map((_, idx) => (
                              <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          {rev.relativeTime && (
                            <span className="text-[11px] text-mocha/80">{rev.relativeTime}</span>
                          )}
                        </div>

                        {rev.eventTag && (
                          <span className="inline-block px-2.5 py-0.5 rounded bg-black/35 border border-[#D4AF37]/25 text-[10px] text-amber-300 font-semibold mb-3">
                            {rev.eventTag}
                          </span>
                        )}

                        <p className="text-sm text-amber-100/90 leading-relaxed">
                          &ldquo;{rev.text}&rdquo;
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px]">
                        <button
                          type="button"
                          onClick={() => toggleHelpful(rev.id)}
                          className="inline-flex items-center gap-1.5 text-amber-200/80 hover:text-amber-300 transition-colors cursor-pointer"
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${helpfulMap[rev.id] ? 'fill-amber-400 text-amber-400' : ''}`} />
                          <span>Helpful ({(rev.helpfulCount || 0) + (helpfulMap[rev.id] ? 1 : 0)})</span>
                        </button>
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Verified Guest
                        </span>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            /* Editorial Empty Testimonials Architecture — Ready for Genuine Reviews */
            <div className="space-y-10">
              <Reveal>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#350710] via-[#4E101E] to-[#26040A] border border-[#D4AF37]/45 p-8 sm:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.55)] text-center">
                  {/* Architectural Corner Hairlines */}
                  <div className="hidden sm:block absolute top-4 left-4 w-5 h-5 border-t border-l border-[#D4AF37]/50 pointer-events-none" />
                  <div className="hidden sm:block absolute top-4 right-4 w-5 h-5 border-t border-r border-[#D4AF37]/50 pointer-events-none" />
                  <div className="hidden sm:block absolute bottom-4 left-4 w-5 h-5 border-b border-l border-[#D4AF37]/50 pointer-events-none" />
                  <div className="hidden sm:block absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[#D4AF37]/50 pointer-events-none" />

                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>Genuine Reviews Policy</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-5" aria-hidden="true">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]/65" />
                    ))}
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <Quote className="w-8 h-8 text-[#D4AF37]/55 mx-auto mb-3" aria-hidden="true" />
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-latte tracking-wide">
                      Ready for Verified Guest Testimonials
                    </h3>
                    <p className="mt-4 text-sm sm:text-base text-mocha leading-relaxed">
                      No sample quotes or unverified ratings are published on this page. Genuine customer feedback submitted on Google Maps or shared with our team after celebrations will appear here.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                    <a
                      href={venueData.googleMapsReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Write a Review on Google</span>
                    </a>
                    <a
                      href={venueData.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-gold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Google Maps Listing</span>
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* 3-Column Testimonial Layout Ready for Authentic Submissions (Halls in Official Order) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EMPTY_SLOT_SPACES.map((hall, i) => (
                  <Reveal key={hall.id} delay={i * 0.08} className="h-full">
                    <article className="h-full rounded-2xl bg-[#350710]/90 border border-[#D4AF37]/30 p-6 sm:p-7 flex flex-col justify-between shadow-lg">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="text-[11px] font-cinzel font-bold tracking-[0.22em] uppercase text-amber-300">
                            0{i + 1} · {hall.name}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-200/80 px-2.5 py-0.5 rounded-full bg-black/35 border border-[#D4AF37]/25">
                            <Users className="w-3 h-3 text-amber-300" />
                            {hall.capacity}
                          </span>
                        </div>

                        <div className="rounded-xl border border-dashed border-[#D4AF37]/30 bg-[#2A050D]/70 p-5 text-center">
                          <Sparkles className="w-5 h-5 text-[#D4AF37]/60 mx-auto mb-2.5" aria-hidden="true" />
                          <p className="font-cinzel text-xs uppercase tracking-[0.18em] text-amber-200/80 font-semibold">
                            Awaiting Verified Review
                          </p>
                          <p className="mt-2 text-xs text-mocha leading-relaxed">
                            Space reserved for authentic host &amp; guest feedback from celebrations in {hall.name} ({hall.capacity}).
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs">
                        <span className="text-mocha/75 truncate pr-2">{hall.tagline}</span>
                        <Link
                          to={`/halls/${hall.id}`}
                          className="inline-flex items-center gap-1 text-amber-300 hover:text-white font-semibold whitespace-nowrap transition-colors"
                        >
                          <span>View Hall</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Google Maps Business Location Reference */}
      <GoogleReviewsMapSection showReviewsBlock={false} showMapBlock={true} />

      {/* Closing CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] text-center">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide">
            Celebrate With Us &amp; Share Your Story
          </h2>
          <p className="mt-4 text-mocha leading-relaxed">
            Visit S.S. Convention in Meerpet to tour Hall Agasthya, Hall Vasishta, and Hall Koundinya in person.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold">
              <Calendar className="w-4 h-4" /> Schedule a venue tour
            </Link>
            <WhatsAppButton
              label="Chat on WhatsApp"
              message="Hello S.S. Convention Hall, I would like to share feedback or enquire about booking a hall visit."
            />
            <CallButton />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
