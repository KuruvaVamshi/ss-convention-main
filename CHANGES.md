# S.S. Convention — animation & polish update

## New files
- `src/styles/motion.css` — shared motion layer: gold shimmer, nav hover underline, floating-bar slide, WhatsApp ring pulse, global reduced-motion rules, hover-only effects off on touch.
- `src/lib/motion.js` — shared easing/duration tokens + pointer / reduced-motion helpers.
- `src/components/ImageReveal.jsx` — "palace curtain" photo reveal (opens from centre, settles from slight zoom).
- `src/components/AnimatedNumber.jsx` — smooth number roll.

## Changed files
- `App.jsx` — imports motion.css; wraps app in `<MotionConfig reducedMotion="user">` (every Framer Motion animation now respects reduced motion).
- `CinematicEntranceLoader.jsx` — visible **Skip intro** button; if the visitor does nothing for 9s the walkthrough plays on its own. (Already existed: once per session, Esc to skip, reduced-motion skip.)
- `AuspiciousBlessingsCanvas.jsx` — no petals for reduced-motion users; mouse tracking only while petals fall; fixed a divide-by-zero when a petal sits exactly under the cursor.
- `SectionHeader.jsx` — gold hairline draws outward from a diamond ornament.
- `Navbar.jsx` — active-link underline glides between links (shared layoutId); inactive links get a slide-in hover underline (desktop only).
- `FloatingContactBar.jsx` — on the homepage it appears after the first scroll and slides in; one gentle ring pulse on WhatsApp. Always visible on other pages.
- `HeroStorytelling.jsx` — shimmer sweep on "Book a hall visit"; hero auto-rotation off for reduced-motion users.
- `PhotoScroll3D.jsx` — pinned scroll height 320vh → 210vh (phone) / 260vh (tablet) / 320vh (desktop).
- `GallerySection.jsx` — staggered card reveal.
- `AboutSection.jsx` — curtain reveal on the main lobby photo, lazy-loaded.
- `BookingEstimator.jsx` — guest count rolls smoothly with the slider.

## Not changed (needs files that weren't in the zip)
Image renames/compression, translation-file clean-up, merging the overlapping "studio" components, and a check of the pages/ folder.
`VideoTourSection.jsx` (empty) and `RoyalPalaceLoader.jsx` (not imported in App.jsx) were left in place because pages/ may import them.
