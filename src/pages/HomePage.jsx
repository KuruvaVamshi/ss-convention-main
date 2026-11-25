import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import { WhatsAppButton, CallButton } from '../components/ContactButtons';
import SEO from '../components/SEO';
import HeroStorytelling from '../components/HeroStorytelling';
import HomeStory from '../components/HomeStory';
import HomeHalls from '../components/HomeHalls';
import ExperienceStrip from '../components/ExperienceStrip';
import PhotoScroll3D from '../components/PhotoScroll3D';
import GoogleReviewsMapSection from '../components/GoogleReviewsMapSection';
import Reveal from '../components/Reveal';

export default function HomePage({ onOpenLightbox, isEntranceComplete = false }) {
  return (
    <div className="bg-[#450B17] text-latte min-h-screen">
      <SEO
        title="S.S. Convention | Wedding & Function Halls in Meerpet, Hyderabad"
        description="Looking for wedding halls in Meerpet, Hyderabad? S.S. Convention A/C offers luxury banquet & function halls for weddings, receptions, and engagements in Jillelaguda, Meerpet near LB Nagar."
        keywords="S.S. Convention, S.S. Convention Meerpet, S.S. Convention Hyderabad, Wedding Halls in Meerpet, Function Halls in Meerpet, Marriage Halls in Meerpet, Banquet Halls in Meerpet, Best Wedding Halls in Hyderabad, Marriage Halls in Hyderabad, Reception Halls in Hyderabad, AC Function Halls in Hyderabad, Banquet Halls Near Me, Wedding Venues Near Meerpet, Function Halls in LB Nagar, Marriage Halls in Badangpet, Banquet Halls in Almasguda, Function Halls in Jillelaguda, Wedding Venues in Karmanghat, Marriage Halls Near LB Nagar"
        canonical="/"
      />
      <HeroStorytelling onOpenLightbox={onOpenLightbox} isEntranceComplete={isEntranceComplete} />
      <HomeStory />
      <HomeHalls />
      <PhotoScroll3D onOpenLightbox={onOpenLightbox} />
      <ExperienceStrip />
      <GoogleReviewsMapSection />

      <section className="py-24 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] border-t border-[#D4AF37]/35 relative overflow-hidden">
        {[[10,30,0,5],[24,72,1.4,6],[40,20,2.2,4.6],[60,76,0.8,5.6],[76,28,2.8,5],[90,60,1.9,6.2]].map((sp, i) => (
          <span key={i} className="ss-spark" aria-hidden="true" style={{ left: sp[0] + '%', top: sp[1] + '%', animationDelay: sp[2] + 's', animationDuration: sp[3] + 's' }} />
        ))}
        <Reveal className="relative max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-cinzel text-[clamp(1.1rem,5vw,3rem)] whitespace-nowrap font-bold tracking-wide">Ready to celebrate with us?</h2>
          <p className="mt-4 text-mocha leading-relaxed">
            Prime muhurtham and weekend dates book quickly. Reserve a visit and get an instant estimate.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" onClick={() => window.triggerBlessings?.()} className="btn-gold">
              <CalendarCheck className="w-4 h-4" /> Book visit & estimate
            </Link>
            <WhatsAppButton label="Enquire on WhatsApp" message="Hello SS Convention Hall, I would like to book a hall visit and get an estimate." />
            <CallButton />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
