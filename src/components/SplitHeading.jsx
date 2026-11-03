import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function SplitHeading({ 
  children, 
  className = '', 
  tag: Tag = 'h2', 
  splitBy = 'words', // 'words' | 'chars'
  delay = 0,
  stagger = 0.04
}) {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let splitInstance;
    try {
      splitInstance = new SplitType(el, {
        types: splitBy === 'chars' ? 'chars,words' : 'words',
        tagName: 'span'
      });

      const targets = splitBy === 'chars' ? splitInstance.chars : splitInstance.words;

      if (targets && targets.length > 0) {
        gsap.fromTo(
          targets,
          {
            y: 30,
            opacity: 0,
            rotateX: -20
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: stagger,
            delay: delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      }
    } catch (_) {}

    return () => {
      if (splitInstance) {
        try {
          splitInstance.revert();
        } catch (_) {}
      }
    };
  }, [splitBy, delay, stagger]);

  return (
    <Tag ref={headingRef} className={`${className} will-change-transform`}>
      {children}
    </Tag>
  );
}

