import { spacesData } from '../data/spacesData';
import { getPreferredWebp, getDprTargetWidth } from './imageSources';

let prefetched = false;

export function prefetchHallsResources() {
  if (prefetched || typeof window === 'undefined') return;
  prefetched = true;

  const conn = navigator.connection;
  if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') {
    return;
  }

  import('../pages/SpacesPage').catch(() => {});

  const cardWidth = window.innerWidth < 768 ? Math.round(window.innerWidth * 0.92) : 600;
  const targetW = getDprTargetWidth(cardWidth);
  const urls = new Set();

  spacesData.forEach((hall) => {
    if (hall.image) urls.add(getPreferredWebp(hall.image, targetW));
    if (hall.gallery?.[0]?.src) urls.add(getPreferredWebp(hall.gallery[0].src, targetW));
  });

  urls.forEach((url) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
  });
}
