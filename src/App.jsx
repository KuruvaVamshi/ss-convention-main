import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import RoyalPalaceLoader from './components/RoyalPalaceLoader';
import GoldenDustCanvas from './components/GoldenDustCanvas';
import AuspiciousBlessingsCanvas from './components/AuspiciousBlessingsCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContactBar from './components/FloatingContactBar';
import LightboxModal from './components/LightboxModal';

// Multi-Page Views
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SpacesPage from './pages/SpacesPage';
import HallDetailPage from './pages/HallDetailPage';
import FacilitiesPage from './pages/FacilitiesPage';
import MenusPage from './pages/MenusPage';
import GalleryPage from './pages/GalleryPage';
import PoliciesPage from './pages/PoliciesPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' or 'te'
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    imageSrc: '',
    title: ''
  });

  const openLightbox = (src, title) => {
    setLightbox({
      isOpen: true,
      imageSrc: src,
      title: title || 'SS Convention Hall View'
    });
  };

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      imageSrc: '',
      title: ''
    });
  };

  return (
    <BrowserRouter>
      {/* Lenis + GSAP Smooth Virtual Momentum Scrolling */}
      <SmoothScroll>
        {/* Scroll to Top on every route change */}
        <ScrollToTop />

        <div className="min-h-screen bg-gradient-to-b from-[#1C0409] via-[#24060C] to-[#120104] text-[#FAF6F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0D0204] relative">
          {/* Grand 3D Royal Mahadwaram Doors Opening Reveal (Opens directly onto Homepage Hero) */}
          <RoyalPalaceLoader />

          {/* Subtle Ambient Drifting Golden Dust Particles */}
          <GoldenDustCanvas />

          {/* Auspicious Jasmine & Marigold Petal Physics Canvas */}
          <AuspiciousBlessingsCanvas />

          {/* Global Fixed Header with Language Toggle */}
          <Navbar lang={lang} setLang={setLang} />

        {/* Multi-Page Routes */}
        <main className="flex-1 relative z-10">
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
        </main>

        {/* Global Footer */}
        <Footer lang={lang} />

        {/* Floating Quick Action Buttons (Gold Phone left, WhatsApp right) */}
        <FloatingContactBar lang={lang} />

        {/* High-Resolution Zoom Lightbox Modal */}
        <LightboxModal
          isOpen={lightbox.isOpen}
          imageSrc={lightbox.imageSrc}
          title={lightbox.title}
          onClose={closeLightbox}
        />
      </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}
