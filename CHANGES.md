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


---
# Round 5 — Spec implementation (v5)

1. **Minimum 100 Guests** everywhere (venueData, hero chips, about/spaces/booking/contact/hall pages, index.html). Max capacities untouched. (Remaining "250+" figures are dining seats, not minimums.)
2. **Telugu removed**: toggle, `lang` state/props, `teluguData.js` and all Telugu conditionals. Site is English only; navbar re-aligned. (Only a Telugu brand name remains inside the invisible SEO JSON-LD in index.html.)
3-5. **Contact system**: `lib/contact.js` (single source: venueData phones/whatsappNumber), `BrandIcons.jsx` (official WhatsApp + Instagram glyphs), `ContactButtons.jsx` (`WhatsAppButton`, `CallButton` = `md:hidden`), rewritten `FloatingContactBar` (WhatsApp always, Call mobile only, Instagram only when `venueData.instagramUrl` is filled in). Buttons added to navbar, hero, hall cards, page CTAs, footer, lightbox.
6. **Hall photo sliders** (`HomeHalls.jsx`): seamless-loop autoplay every 3 s, arrows, swipe, hover/focus/touch pause, pauses off-screen and in hidden tabs, one timer per card with cleanup, off under reduced motion.
7. **Ring gallery** (`PhotoScroll3D.jsx`): continuous CSS rotation (52 s/turn), pauses on hover/touch/off-screen, static under reduced motion, no tall pinned section any more.
8. **Less scroll-jacking**: the 360vh pinned "Explore the Venue" console is now a normal section driven by its tabs/arrows; ring gallery un-pinned. Cinematic intro, hero and reveals kept.
9. **Header logo** now uses the favicon image (`ss_convention_official_swan_logo.jpeg`), uncropped (`object-contain`).

Not deployed. No git repo in the supplied zip, so there is no branch to commit to.

## Round 5b — visual clarity
- Page hero photos (Spaces, About, Contact, Facilities, Gallery, Menus, Hall detail): the heavy red/dark overlays were replaced with a light neutral fade, so the photos are clearly visible. The bottom still fades into the page colour and heading text keeps its shadow.
- Cards (hall cards, policy cards, menu cards, contact panel, hall-detail panel, review cards) now use a lighter maroon (#5E1628 / #4A0E1B) than the page background, so they stand out from it. The palette itself is unchanged.

## Round 5c — ring gallery polish + visual treats
- Ring now pauses only when the pointer is over the middle photo (not anywhere in the band), turns slower (96 s per turn), and has a soft gold glow, floor shadow, photo reflections, gentle floating and twinkling gold dust.
- Hall cards: lift + golden light sweep on hover (mouse devices only). Gold dust also added to the final call-to-action section.

## Round 5d — simpler navigation
- The "The Venue" dropdown is gone. Navbar is now: HOME · HALLS · ABOUT & FACILITIES · GALLERY · DINING · CONTACT (desktop and mobile).
- HALLS goes to the halls page (/spaces).
- About and Facilities are one page (/about): About first, Facilities below. /facilities now redirects to /about#facilities and scrolls to that section. Footer and homepage "Facilities" links point there too.
- Below 1280px the label reads "ABOUT" and the round navbar WhatsApp icon is hidden so "ENQUIRE NOW" is not clipped (the floating WhatsApp button is still there).

## Round 5e — faster page switching
- Other pages are now downloaded quietly in the background after the homepage loads, so clicking Halls/About/Gallery is instant.
- If a page is still loading, a gold progress bar shows at the top instead of an unchanged screen.

## Round 5f — full-width ring
- The ring gallery now scales with the screen: 6 photos on phones, 8 on tablets, 10 on laptops, 12 on wide screens, with larger photos, so it fills the whole width instead of the middle half.
