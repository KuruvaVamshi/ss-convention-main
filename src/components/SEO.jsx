import React, { useEffect } from 'react';

/**
 * S.S. Convention — High-Performance On-Page SEO Component
 * 
 * Dynamically updates document metadata:
 * - document.title
 * - meta description
 * - meta keywords
 * - canonical link
 * - Open Graph (og:title, og:description, og:url, og:image, og:type)
 * - Twitter Cards (twitter:title, twitter:description, twitter:image)
 * - Schema.org JSON-LD structured data
 */

const BASE_URL = 'https://www.ssconvention.in';
const DEFAULT_IMAGE = `${BASE_URL}/assets/01_brand_and_logos/ss_convention_official_swan_logo.jpeg`;

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  structuredData
}) {
  const fullCanonical = canonical?.startsWith('http') ? canonical : `${BASE_URL}${canonical || ''}`;
  const fullOgImage = ogImage?.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

  useEffect(() => {
    // 1. Update Document Title
    if (title) {
      document.title = title;
    }

    // Helper to update or create a <meta> tag
    const setMetaTag = (selector, attributeName, attributeValue, content) => {
      if (!content) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);

    // 3. Canonical Tag
    if (fullCanonical) {
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', fullCanonical);
    }

    // 4. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullCanonical);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', fullOgImage);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'S.S. Convention A/C');
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN');

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', fullOgImage);

    // 6. Page-Specific Structured Data (JSON-LD)
    let scriptEl = document.getElementById('seo-page-structured-data');
    if (structuredData) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'seo-page-structured-data';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(structuredData);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Cleanup page-specific script on unmount
      const existing = document.getElementById('seo-page-structured-data');
      if (existing) existing.remove();
    };
  }, [title, description, keywords, fullCanonical, fullOgImage, ogType, structuredData]);

  return null;
}

