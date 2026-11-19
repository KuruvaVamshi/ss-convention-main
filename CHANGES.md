# Round 3 — lobby, reception and website-launch animation

All in `CinematicEntranceLoader.jsx`. Constants `WIPE_MS`, `IRIS_MS` and the easing strings at the top control the timing.

- **Lobby (scene 3): slow walk-in.** The shot keeps pushing forward very slowly while it is on screen, a warm light blooms over the chandeliers, and a few motes of gold light drift upward.
- **Lobby → reception: light wipe.** A band of golden light sweeps left → right; the lobby is wiped away behind it while it zooms "through" toward the viewer, and the reception is revealed. The reception then pulls back and settles (a push-in followed by a breath out). Confetti now fires as the reception appears (450ms in).
- **Reception → website: golden iris.** Instead of a plain fade the intro closes toward the centre like a lens, with a glowing gold ring riding the edge, revealing the homepage underneath. The loader is removed only after the iris finishes.
- **Fix:** the confetti was drawn *under* the intro overlay (default z-index 100 vs 99999), so it was never visible. It now sits above it.
- Scrolling during the wipe can no longer cut it short.
- Tested with a real `vite build` and in a browser using placeholder photos (wipe band, lobby/reception swap and iris all line up; the loader is removed afterwards and page scroll is restored; no console errors). Not seen with your real photos.

---

# Round 2 — intro & hero fixes

- **No auto-play.** Removed the 9-second idle timer (it was the cause of the intro opening by itself). Scenes now move only on scroll / swipe / tap / key, or when the visitor presses **Enter Venue** (which plays the walkthrough once, with slower holds: 3.4s entrance, 3.2s lobby, 3.4s reception so each headline can be read). Skip intro and Esc still work.
- **Caption timing bug fixed.** The caption's start delay was also being applied when it faded out, so a headline lingered over the next image (the "second image text showing on the third image" problem). Now: exit starts instantly (~0.2s), entry starts 0.25–0.5s after the scene changes (the entrance scene was 1.4s). The exterior→entrance crossfade also starts sooner (0.45s instead of 0.8s) and is shorter, so image and headline arrive together.
- **New headline animation.** Words rise out of an invisible mask with a 55ms stagger, then the gold line draws, then the subtitle fades up. Padding around each word keeps tall Telugu marks from being clipped. A second style, "curtain" (line wiped open left to right), is included: change `CAPTION_VARIANT` at the top of `CinematicEntranceLoader.jsx` to `'curtain'`.
- **Dark corners removed.** Intro: deleted the flat black overlays on every image, brightness 0.9 → 1.02, edge shadows cut to roughly half the height and ~half the strength, vignette 0.72 → 0.22 and starting further out. Homepage hero: deleted the flat black/25 overlay, brightness 0.92 → 1.0, top/bottom shadows shortened and lightened. Navbar over the hero: lighter gradient and no blur at the top of the page.
- Verified with a real `vite build` and a browser test: 12s idle stays on scene 1; after one scroll the old headline is gone in ~0.3s and the new one is fully visible by ~1.1s.

---

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
