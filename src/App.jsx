import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/motion.css';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContactBar from './components/FloatingContactBar';
import ScrollProgress from './components/ScrollProgress';
import CinematicEntranceLoader from './components/CinematicEntranceLoader';

const LightboxModal = lazy(() => import('./components/LightboxModal'));
const GoldenDustCanvas = lazy(() => import('./components/GoldenDustCanvas'));
const AuspiciousBlessingsCanvas = lazy(() => import('./components/AuspiciousBlessingsCanvas'));

// Multi-Page Views
import HomePage from './pages/HomePage';
const loaders = {
  about: () => import('./pages/AboutFacilitiesPage'),
  spaces: () => import('./pages/SpacesPage'),
  hall: () => import('./pages/HallDetailPage'),
  menus: () => import('./pages/MenusPage'),
  gallery: () => import('./pages/GalleryPage'),
  policies: () => import('./pages/PoliciesPage'),
  contact: () => import('./pages/ContactPage'),
};
const AboutFacilitiesPage = lazy(loaders.about);
const SpacesPage = lazy(loaders.spaces);
const HallDetailPage = lazy(loaders.hall);
const MenusPage = lazy(loaders.menus);
const GalleryPage = lazy(loaders.gallery);
const PoliciesPage = lazy(loaders.policies);
const ContactPage = lazy(loaders.contact);

// Thin gold bar shown for the (rare) moment a page is still loading, so a click always gives visible feedback.
function PageLoading() {
  return (
    <div className="min-h-screen bg-[#2A060E]" role="status" aria-label="Loading page">
      <div className="fixed top-0 left-0 right-0 h-[3px] overflow-hidden z-[9999]">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-300 to-transparent ss-loadbar" />
      </div>
    </div>
  );
}

export default function App() {
  const [isEntranceComplete, setIsEntranceComplete] = useState(false);

  // Download the other pages quietly in the background once the initial load has settled, so clicking is instant.
  useEffect(() => {
    const conn = navigator.connection;
    if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return undefined;
    let cancelled = false;
    let timer = null;
    const timers = [];
    const run = () => {
      Object.values(loaders).forEach((load, i) => {
        timers.push(setTimeout(() => { if (!cancelled) load().catch(() => {}); }, i * 160));
      });
    };
    const schedule = () => {
      if (cancelled) return;
      timer = setTimeout(() => {
        if (cancelled) return;
        if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 2500 });
        else run();
      }, 3200);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (timer) clearTimeout(timer);
      timers.forEach(clearTimeout);
    };
  }, []);
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
          <CinematicEntranceLoader onComplete={() => setIsEntranceComplete(true)} />

          {/* Subtle Ambient Drifting Golden Dust Particles */}
          <Suspense fallback={null}>
            <GoldenDustCanvas />
            {/* Auspicious Jasmine & Marigold Petal Physics Canvas */}
            <AuspiciousBlessingsCanvas />
          </Suspense>

          {/* Global Fixed Header with Language Toggle */}
          <ScrollProgress />
          <Navbar />

        {/* Multi-Page Routes */}
        <main className="flex-1 relative z-10">
          <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route
              path="/"
              element={<HomePage onOpenLightbox={openLightbox} isEntranceComplete={isEntranceComplete} />}
            />
            <Route
              path="/about"
              element={<AboutFacilitiesPage />}
            />
            <Route
              path="/spaces"
              element={<SpacesPage onOpenLightbox={openLightbox} />}
            />
            <Route
              path="/halls"
              element={<SpacesPage onOpenLightbox={openLightbox} />}
            />
            <Route
              path="/halls/:id"
              element={<HallDetailPage onOpenLightbox={openLightbox} />}
            />
            <Route
              path="/spaces/:id"
              element={<HallDetailPage onOpenLightbox={openLightbox} />}
            />
            <Route
              path="/facilities"
              element={<Navigate to="/about#facilities" replace />}
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
              element={<MenusPage onOpenLightbox={openLightbox} />}
            />
            <Route
              path="/menus"
              element={<MenusPage onOpenLightbox={openLightbox} />}
            />
            <Route
              path="/gallery"
              element={<GalleryPage onOpenLightbox={openLightbox} />}
            />
            <Route
              path="/policies"
              element={<PoliciesPage />}
            />
            <Route
              path="/contact"
              element={<ContactPage />}
            />
            {/* Fallback route */}
            <Route
              path="*"
              element={<HomePage onOpenLightbox={openLightbox} />}
            />
          </Routes>
          </Suspense>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Quick Action Buttons (Gold Phone left, WhatsApp right) */}
        <FloatingContactBar />

        {/* High-Resolution Zoom Lightbox Modal */}
        {lightbox.isOpen && (
          <Suspense fallback={null}>
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
          </Suspense>
        )}
      </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}
