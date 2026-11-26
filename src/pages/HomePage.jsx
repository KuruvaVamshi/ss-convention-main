import React, { lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import { WhatsAppButton, CallButton } from '../components/ContactButtons';
import SEO from '../components/SEO';
import HeroStorytelling from '../components/HeroStorytelling';
import Reveal from '../components/Reveal';

const loadHomeStory = () => import('../components/HomeStory');
const loadHomeHalls = () => import('../components/HomeHalls');
const loadPhotoScroll3D = () => import('../components/PhotoScroll3D');
const loadExperienceStrip = () => import('../components/ExperienceStrip');
const loadGoogleReviewsMapSection = () => import('../components/GoogleReviewsMapSection');

const HomeStory = lazy(loadHomeStory);
const HomeHalls = lazy(loadHomeHalls);
const PhotoScroll3D = lazy(loadPhotoScroll3D);
const ExperienceStrip = lazy(loadExperienceStrip);
const GoogleReviewsMapSection = lazy(loadGoogleReviewsMapSection);

export default function HomePage({ onOpenLightbox, isEntranceComplete = false }) {
  useEffect(() => {
    const conn = navigator.connection;
    if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return undefined;
    let cancelled = false;
    let timer = null;
    const warmBelowFold = () => {
      if (cancelled) return;
      [loadHomeStory, loadHomeHalls, loadPhotoScroll3D, loadExperienceStrip, loadGoogleReviewsMapSection].forEach(
        (load) => load().catch(() => {})
      );
    };
    const schedule = () => {
      if (cancelled) return;
      timer = isEntranceComplete
        ? setTimeout(warmBelowFold, 50)
        : setTimeout(() => {
            if (cancelled) return;
            if ('requestIdleCallback' in window) window.requestIdleCallback(warmBelowFold, { timeout: 3000 });
            else warmBelowFold();
          }, 3500);
    };
    if (isEntranceComplete || document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (timer) clearTimeout(timer);
    };
  }, [isEntranceComplete]);

  return (
    <div className="bg-[#450B17] text-latte min-h-screen">
      <SEO
        title="S.S. Convention | Wedding & Function Halls in Meerpet, Hyderabad"
        description="Looking for wedding halls in Meerpet, Hyderabad? S.S. Convention A/C offers luxury banquet & function halls for weddings, receptions, and engagements in Jillelaguda, Meerpet near LB Nagar."
        keywords="S.S. Convention, S.S. Convention Meerpet, S.S. Convention Hyderabad, Wedding Halls in Meerpet, Function Halls in Meerpet, Marriage Halls in Meerpet, Banquet Halls in Meerpet, Best Wedding Halls in Hyderabad, Marriage Halls in Hyderabad, Reception Halls in Hyderabad, AC Function Halls in Hyderabad, Banquet Halls Near Me, Wedding Venues Near Meerpet, Function Halls in LB Nagar, Marriage Halls in Badangpet, Banquet Halls in Almasguda, Function Halls in Jillelaguda, Wedding Venues in Karmanghat, Marriage Halls Near LB Nagar"
        canonical="/"
      />
      <HeroStorytelling onOpenLightbox={onOpenLightbox} isEntranceComplete={isEntranceComplete} />
      <Suspense fallback={<div className="min-h-[420px] bg-[#450B17]" aria-hidden="true" />}>
        <HomeStory />
        <HomeHalls />
        <PhotoScroll3D onOpenLightbox={onOpenLightbox} />
        <ExperienceStrip />
        <GoogleReviewsMapSection />
      </Suspense>

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
