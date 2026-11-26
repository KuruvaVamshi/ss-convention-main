import manifest from '../data/imageManifest.json';

export function getImageMeta(src) {
  if (!src || typeof src !== 'string') return null;
  if (manifest[src]) return manifest[src];
  try {
    const decoded = decodeURI(src);
    if (manifest[decoded]) return manifest[decoded];
  } catch (_) {}
  return null;
}

export function getWebpSrcSet(src) {
  const meta = getImageMeta(src);
  if (!meta?.s?.length) return null;
  return meta.s.map(([w, url]) => `${encodeURI(url)} ${w}w`).join(', ');
}

export function getPreferredWebp(src, targetWidth = 1280) {
  const meta = getImageMeta(src);
  if (!meta?.s?.length) return src;
  for (const [w, url] of meta.s) {
    if (w >= targetWidth) return encodeURI(url);
  }
  return encodeURI(meta.s[meta.s.length - 1][1]);
}

export function getDprTargetWidth(cssWidth) {
  if (typeof window === 'undefined') return cssWidth;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  return Math.round(cssWidth * dpr);
}
