import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Phone } from 'lucide-react';
import HeroStorytelling from '../components/HeroStorytelling';
import HomeStory from '../components/HomeStory';
import HomeHalls from '../components/HomeHalls';
import ExperienceStrip from '../components/ExperienceStrip';
import Reveal from '../components/Reveal';
import { venueData } from '../data/venueData';

const VideoReelsStory = lazy(() => import('../components/VideoReelsStory'));

export default function HomePage({ onOpenLightbox, lang }) {
  return (
    <div className="bg-[#450B17] text-latte min-h-screen">
      <HeroStorytelling lang={lang} onOpenLightbox={onOpenLightbox} />
      <HomeStory />
      <HomeHalls />
      <ExperienceStrip />

      <Suspense fallback={<div className="h-96 bg-[#3D0A14]" />}>
        <VideoReelsStory lang={lang} />
      </Suspense>

      <section className="py-24 bg-gradient-to-br from-[#7A1F31] via-[#5F1524] to-[#450B17] border-t border-[#D4AF37]/35">
        <Reveal className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-cinzel text-[clamp(1.1rem,5vw,3rem)] whitespace-nowrap font-bold tracking-wide">Ready to celebrate with us?</h2>
          <p className="mt-4 text-mocha leading-relaxed">
            Prime muhurtham and weekend dates book quickly. Reserve a visit and get an instant estimate.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" onClick={() => window.triggerBlessings?.()} className="btn-gold">
              <CalendarCheck className="w-4 h-4" /> Book visit & estimate
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
