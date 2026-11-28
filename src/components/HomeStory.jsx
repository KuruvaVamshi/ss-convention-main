import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Users, Snowflake, UtensilsCrossed, Car, Zap, Droplets, ShieldCheck, Sparkles } from 'lucide-react';
import { venueData } from '../data/venueData';
import { getPreferredWebp } from '../lib/imageSources';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import CountUp from './CountUp';
import ResponsiveImage from './ResponsiveImage';

const icons = { Users, Snowflake, UtensilsCrossed, Car, Zap, Droplets, ShieldCheck, Sparkles };

const cornerRadiusByIndex = [
  'rounded-tl-2xl',
  'rounded-tr-2xl lg:rounded-tr-none',
  '',
  'lg:rounded-tr-2xl',
  'lg:rounded-bl-2xl',
  '',
  'rounded-bl-2xl lg:rounded-bl-none',
  'rounded-br-2xl',
];

export default function HomeStory() {
  const gridWrapperRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [displayId, setDisplayId] = useState(null);
  const [shouldSlidePos, setShouldSlidePos] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ left: 0, top: -250, width: 410, height: 231, arrowLeft: 205 });

  const [canHover, setCanHover] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  // Gate interactive photo previews exclusively to desktop hover + fine-pointer devices
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const handler = (e) => {
      setCanHover(e.matches);
      if (!e.matches) {
        setHoveredId(null);
        setDisplayId(null);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Preload crisp 800w WebP hover photos during browser idle time on desktop for zero-lag switching
  useEffect(() => {
    if (!canHover) return undefined;
    const conn = navigator.connection;
    if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return undefined;
    const run = () => {
      venueData.highlights.forEach((item) => {
        if (item.hoverImage) {
          const img = new Image();
          img.decoding = 'async';
          img.src = getPreferredWebp(item.hoverImage, 800);
        }
      });
    };
    const timer = 'requestIdleCallback' in window
      ? window.requestIdleCallback(run, { timeout: 2500 })
      : setTimeout(run, 1200);
    return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(timer) : clearTimeout(timer));
  }, [canHover]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = useCallback((id, event) => {
    if (!canHover) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    const cardEl = event.currentTarget;
    const wrapEl = gridWrapperRef.current;
    if (cardEl && wrapEl) {
      const cardLeft = cardEl.offsetLeft;
      const cardTop = cardEl.offsetTop;
      const cardWidth = cardEl.offsetWidth;
      const wrapWidth = wrapEl.clientWidth;

      const previewWidth = Math.min(420, Math.max(320, Math.round(cardWidth * 1.54)));
      const previewHeight = Math.round((previewWidth * 9) / 16);
      const cardCenterX = cardLeft + cardWidth / 2;
      const idealLeft = cardCenterX - previewWidth / 2;
      const clampedLeft = Math.max(0, Math.min(Math.max(0, wrapWidth - previewWidth), idealLeft));
      const arrowLeft = Math.max(24, Math.min(previewWidth - 24, cardCenterX - clampedLeft));

      setShouldSlidePos(Boolean(hoveredId));
      setPopoverPos({
        left: Math.round(clampedLeft),
        top: Math.round(cardTop - previewHeight - 14),
        width: previewWidth,
        height: previewHeight,
        arrowLeft: Math.round(arrowLeft),
      });
    }

    setHoveredId(id);
    setDisplayId(id);
  }, [canHover, hoveredId]);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setDisplayId(null);
    }, 420);
  }, []);

  const isPopoverOpen = canHover && Boolean(hoveredId);
  const activeItem = venueData.highlights.find((h) => h.id === (hoveredId || displayId)) || null;
  const ActiveIcon = activeItem ? icons[activeItem.icon] || Sparkles : Sparkles;

  return (
    <section className="py-20 lg:py-28 bg-[#350710] border-t border-[#D4AF37]/25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Meerpet, Hyderabad" title="A Venue Made for Celebrations">
          Three air-conditioned halls—Hall Agasthya (max 400 guests), Hall Vasishta (max 600 guests) and
          Hall Koundinya (max 250 guests)—with a separate dining hall, in-house decor team and uninterrupted power backup.
        </SectionHeader>

        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-14 text-center">
          {[
            { to: 600, label: 'Max Capacity / Hall' },
            { to: 3, label: 'Halls' },
            { to: 250, suffix: '+', label: 'Dining seats' },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="font-cinzel text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] to-[#C5A059] tabular-nums">
                <CountUp to={stat.to} suffix={stat.suffix} duration={stat.to > 100 ? 2.2 : 1.4} />
              </div>
              <div className="mt-1 text-[11px] sm:text-xs tracking-[0.25em] uppercase text-mocha">{stat.label}</div>
            </Reveal>
          ))}
        </div>

        <div ref={gridWrapperRef} className="relative" onMouseLeave={handleMouseLeave}>
          {/* Desktop-only larger floating architectural preview appearing above the hovered facility card */}
          {canHover && (
            <div
              aria-hidden="true"
              className={`ss-facility-popover pointer-events-none absolute left-0 top-0 z-40 will-change-transform ${
                shouldSlidePos ? 'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]' : ''
              }`}
              style={{
                width: `${popoverPos.width}px`,
                height: `${popoverPos.height}px`,
                transform: `translate3d(${popoverPos.left}px, ${popoverPos.top}px, 0)`,
              }}
            >
              <div
                className={`ss-facility-popover-card relative w-full h-full rounded-2xl overflow-hidden bg-[#190307] border border-[#EED9A6]/80 shadow-[0_28px_68px_rgba(0,0,0,0.88),0_0_28px_rgba(212,175,55,0.22)] transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${
                  isPopoverOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2.5 scale-[0.96]'
                }`}
              >
                {venueData.highlights.map((item) => {
                  const isCurrent = (hoveredId || displayId) === item.id;
                  return item.hoverImage ? (
                    <div
                      key={item.id}
                      className={`ss-facility-slide absolute inset-0 transition-opacity duration-[350ms] ease-out ${
                        isCurrent ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
                      }`}
                    >
                      <ResponsiveImage
                        src={item.hoverImage}
                        alt={item.hoverAlt || item.label}
                        sizes="(min-width: 1024px) 420px, 340px"
                        loading="lazy"
                        decoding="async"
                        style={{
                          objectPosition: item.hoverObjectPosition || '50% 50%',
                          transform: isCurrent && isPopoverOpen ? 'scale(1.04)' : 'scale(1)',
                        }}
                        className="ss-facility-img w-full h-full object-cover brightness-[1.06] contrast-[1.03] saturate-[1.06] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                      />
                    </div>
                  ) : null;
                })}

                {/* Soft bottom caption vignette leaving the photograph 80%+ unobstructed */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-[2]"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(16, 2, 5, 0.90) 0%, rgba(20, 4, 8, 0.54) 55%, rgba(20, 4, 8, 0) 100%)',
                  }}
                />

                {activeItem && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] px-4 py-3 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#2A060E]/90 border border-[#D4AF37]/50 flex items-center justify-center flex-shrink-0">
                      <ActiveIcon className="w-3.5 h-3.5 text-amber-300" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-cinzel text-xs font-bold tracking-wider uppercase text-[#FFF8E7] truncate drop-shadow">
                        {activeItem.label}
                      </p>
                      <p className="text-[11px] text-[#E6D4C0] truncate">{activeItem.desc}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle champagne-gold anchor notch pointing down to the hovered card */}
              <div
                className={`ss-facility-popover-arrow absolute -bottom-1.5 w-3 h-3 rotate-45 bg-[#190307] border-r border-b border-[#EED9A6]/80 transition-opacity duration-300 ${
                  isPopoverOpen ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ left: `${popoverPos.arrowLeft - 6}px` }}
              />
            </div>
          )}

          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#D4AF37]/20 rounded-2xl overflow-hidden border border-[#D4AF37]/25">
            {venueData.highlights.map((item, i) => {
              const Icon = icons[item.icon] || Sparkles;
              const isHovered = canHover && hoveredId === item.id;
              const cornerClass = cornerRadiusByIndex[i] || '';
              return (
                <Reveal
                  key={item.id}
                  delay={i * 0.05}
                  data-facility-card={item.id}
                  className={`ss-facility-card relative overflow-hidden transition-colors duration-300 ${
                    isHovered ? 'bg-[#4E101E]' : 'bg-[#3D0A14]'
                  }`}
                  onMouseEnter={(e) => handleMouseEnter(item.id, e)}
                >
                  {/* Champagne-gold perimeter highlight glow on hover (compositor-only opacity transition) */}
                  {canHover && (
                    <div
                      aria-hidden="true"
                      className={`ss-facility-glow pointer-events-none absolute inset-0 z-[1] border border-[#EED9A6]/75 shadow-[inset_0_0_24px_rgba(212,175,55,0.22)] transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${cornerClass} ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )}

                  {/* Existing card content preserved cleanly */}
                  <div className="relative z-[2] p-5 sm:p-6">
                    <Icon
                      className={`w-5 h-5 mb-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isHovered ? 'text-[#FFE28A] -translate-y-0.5' : 'text-amber-300'
                      }`}
                    />
                    <dt className="font-cinzel text-sm font-bold text-latte leading-snug">{item.label}</dt>
                    <dd className="mt-1 text-xs text-mocha leading-relaxed">{item.desc}</dd>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </div>

      {/* Enforce desktop-only hover presentation and reduced-motion accessibility in CSS */}
      <style>{`
        @media (hover: none), (pointer: coarse) {
          .ss-facility-popover,
          .ss-facility-glow {
            display: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ss-facility-popover,
          .ss-facility-popover-card,
          .ss-facility-popover-arrow,
          .ss-facility-slide,
          .ss-facility-glow,
          .ss-facility-img {
            transition-duration: 50ms !important;
          }
          .ss-facility-img {
            transform: scale(1) !important;
          }
        }
      `}</style>
    </section>
  );
}
