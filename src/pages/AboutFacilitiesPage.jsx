import React from 'react';
import AboutPage from './AboutPage';
import FacilitiesPage from './FacilitiesPage';

// One page for "About" followed by "Facilities" (the navbar has a single About & Facilities link).
export default function AboutFacilitiesPage() {
  return (
    <>
      <AboutPage hideCta />
      <FacilitiesPage embedded />
    </>
  );
}
