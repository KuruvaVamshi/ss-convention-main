import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import GoldenDustCanvas from './components/GoldenDustCanvas';
import AuspiciousBlessingsCanvas from './components/AuspiciousBlessingsCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContactBar from './components/FloatingContactBar';
import LightboxModal from './components/LightboxModal';
import ScrollProgress from './components/ScrollProgress';
import CinematicEntranceLoader from './components/CinematicEntranceLoader';

// Multi-Page Views
import HomePage from './pages/HomePage';
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SpacesPage = lazy(() => import('./pages/SpacesPage'));
const HallDetailPage = lazy(() => import('./pages/HallDetailPage'));
const FacilitiesPage = lazy(() => import('./pages/FacilitiesPage'));
const MenusPage = lazy(() => import('./pages/MenusPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const PoliciesPage = lazy(() => import('./pages/PoliciesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' or 'te'
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    items: [],
    index: 0
  });

  // items (optional): [{ src, title }] lets the viewer step through a set of photos
  const openLightbox = (src, title, items) => {
    const list = Array.isArray(items) && items.length ? items : [{ src, title: title || 'SS Convention Hall View' }];
    const found = list.findIndex((i) => i.src === src);
    setLightbox({ isOpen: true, items: list, index: found >= 0 ? found : 0 });
  };

  const closeLightbox = () => setLightbox({ isOpen: false, items: [], index: 0 });

  const stepLightbox = (delta) =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + delta + prev.items.length) % prev.items.length
    }));

  const current = lightbox.items[lightbox.index];

  return (
    <BrowserRouter>
      {/* Lenis + GSAP Smooth Virtual Momentum Scrolling */}
      <SmoothScroll>
        {/* Scroll to Top on every route change */}
        <ScrollToTop />

        <div className="min-h-screen bg-gradient-to-b from-[#1C0409] via-[#24060C] to-[#120104] text-[#FAF6F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0D0204] relative">
          {/* Scroll-Controlled First Load Entrance (Exterior Doors -> Reception Doors -> Hero Page) */}
          <CinematicEntranceLoader lang={lang} />

          {/* Subtle Ambient Drifting Golden Dust Particles */}
          <GoldenDustCanvas />

          {/* Auspicious Jasmine & Marigold Petal Physics Canvas */}
          <AuspiciousBlessingsCanvas />

          {/* Global Fixed Header with Language Toggle */}
          <ScrollProgress />
          <Navbar lang={lang} setLang={setLang} />

        {/* Multi-Page Routes */}
        <main className="flex-1 relative z-10">
          <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route
              path="/"
              element={<HomePage onOpenLightbox={openLightbox} lang={lang} />}
            />
            <Route
              path="/about"
              element={<AboutPage lang={lang} />}
            />
            <Route
              path="/spaces"
              element={<SpacesPage onOpenLightbox={openLightbox} lang={lang} />}
            />
            <Route
              path="/halls"
              element={<SpacesPage onOpenLightbox={openLightbox} lang={lang} />}
            />
            <Route
              path="/halls/:id"
              element={<HallDetailPage onOpenLightbox={openLightbox} lang={lang} />}
            />
            <Route
              path="/spaces/:id"
              element={<HallDetailPage onOpenLightbox={openLightbox} lang={lang} />}
            />
            <Route
              path="/facilities"
              element={<FacilitiesPage lang={lang} />}
            />
            {/* Deprecated occasions routes redirect seamlessly to gallery */}
            <Route
              path="/occasions"
              element={<Navigate to="/gallery" replace />}
            />
            <Route
              path="/themes"
              element={<Navigate to="/gallery" replace />}
            />
            <Route
              path="/dining"
              element={<MenusPage onOpenLightbox={openLightbox} lang={lang} />}
            />
            <Route
              path="/menus"
              element={<MenusPage onOpenLightbox={openLightbox} lang={lang} />}
            />
            <Route
              path="/gallery"
              element={<GalleryPage onOpenLightbox={openLightbox} lang={lang} />}
            />
            <Route
              path="/policies"
              element={<PoliciesPage lang={lang} setLang={setLang} />}
            />
            <Route
              path="/contact"
              element={<ContactPage lang={lang} />}
            />
            {/* Fallback route */}
            <Route
              path="*"
              element={<HomePage onOpenLightbox={openLightbox} lang={lang} />}
            />
          </Routes>
          </Suspense>
        </main>

        {/* Global Footer */}
        <Footer lang={lang} />

        {/* Floating Quick Action Buttons (Gold Phone left, WhatsApp right) */}
        <FloatingContactBar lang={lang} />

        {/* High-Resolution Zoom Lightbox Modal */}
        <LightboxModal
          isOpen={lightbox.isOpen}
          imageSrc={current?.src}
          title={current?.title}
          index={lightbox.index}
          total={lightbox.items.length}
          onPrev={() => stepLightbox(-1)}
          onNext={() => stepLightbox(1)}
          onClose={closeLightbox}
        />
      </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}
