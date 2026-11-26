import React from 'react';
import { getImageMeta, getWebpSrcSet } from '../lib/imageSources';

export default function ResponsiveImage({
  src,
  alt = '',
  sizes = '100vw',
  priority = false,
  loading,
  decoding,
  fetchPriority,
  fetchpriority,
  className = '',
  style,
  pictureClassName = 'contents',
  width,
  height,
  disableDimensions = false,
  imgRef,
  ...rest
}) {
  const meta = getImageMeta(src);
  const webpSrcSet = getWebpSrcSet(src);
  const resolvedLoading = loading ?? (priority ? 'eager' : 'lazy');
  const resolvedDecoding = decoding ?? (priority ? 'sync' : 'async');
  const resolvedFetchPriority = fetchPriority ?? fetchpriority ?? (priority ? 'high' : undefined);
  const w = disableDimensions ? undefined : (width ?? meta?.w);
  const h = disableDimensions ? undefined : (height ?? meta?.h);

  const imgEl = (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading={resolvedLoading}
      decoding={resolvedDecoding}
      {...(resolvedFetchPriority ? { fetchpriority: resolvedFetchPriority } : {})}
      className={className}
      style={style}
      {...rest}
    />
  );

  if (!webpSrcSet) return imgEl;

  return (
    <picture className={pictureClassName}>
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      {imgEl}
    </picture>
  );
}
