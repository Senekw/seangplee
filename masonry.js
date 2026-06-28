// ============================================================================
// Masonry — React island photo gallery (no build step).
// React + htm + gsap load from a CDN via the import map in index.html.
// To remove: delete this file, masonry.css, and the #masonry-root markup.
//
// Component ported from React Bits (https://reactbits.dev) — JSX swapped for
// htm, and the container height is set explicitly so the absolutely-positioned
// grid takes up real space in the page flow.
// ============================================================================

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import htm from 'htm';

const html = htm.bind(React.createElement);

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };
    let direction = animateFrom;
    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }
    switch (direction) {
      case 'top': return { x: item.x, y: -200 };
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
      case 'left': return { x: -200, y: item.y };
      case 'right': return { x: window.innerWidth + 200, y: item.y };
      case 'center': return { x: containerRect.width / 2 - item.w / 2, y: containerRect.height / 2 - item.h / 2 };
      default: return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const { grid, totalHeight } = useMemo(() => {
    if (!width) return { grid: [], totalHeight: 0 };
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    const placed = items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];
      colHeights[col] += height;
      return { ...child, x, y, w: columnWidth, h: height };
    });
    return { grid: placed, totalHeight: Math.max(0, ...colHeights) };
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' })
        };
        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger
        });
      } else {
        gsap.to(selector, { ...animationProps, duration, ease, overwrite: 'auto' });
      }
    });
    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e, item) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) gsap.to(selector, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover) {
      const overlay = e.currentTarget.querySelector('.color-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (e, item) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) gsap.to(selector, { scale: 1, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover) {
      const overlay = e.currentTarget.querySelector('.color-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return html`
    <div ref=${containerRef} className="masonry-list" style=${{ height: totalHeight ? `${totalHeight}px` : undefined }}>
      ${grid.map((item) => html`
        <div
          key=${item.id}
          data-key=${item.id}
          className="masonry-item-wrapper"
          onClick=${() => window.open(item.url, '_blank', 'noopener')}
          onMouseEnter=${(e) => handleMouseEnter(e, item)}
          onMouseLeave=${(e) => handleMouseLeave(e, item)}
        >
          <div className="masonry-item-img" style=${{ backgroundImage: `url(${item.img})` }}></div>
        </div>
      `)}
    </div>
  `;
};

/* ----- mount: every photography photo (portrait + logos excluded) --------- */
const galleryItems = [
  { id: '1781945253752', img: 'images/orbit/thumb-1781945253752.jpg', url: 'images/orbit/thumb-1781945253752.jpg', height: 338 },
  { id: '300ae717-7b01-456f-b4fa-30394fcd2f33', img: 'images/orbit/thumb-300ae717-7b01-456f-b4fa-30394fcd2f33.jpg', url: 'images/orbit/thumb-300ae717-7b01-456f-b4fa-30394fcd2f33.jpg', height: 691 },
  { id: '5DC015F1-D70F-4B0F-BE5C-E3050C3C46A1', img: 'images/orbit/thumb-5DC015F1-D70F-4B0F-BE5C-E3050C3C46A1.jpg', url: 'images/orbit/thumb-5DC015F1-D70F-4B0F-BE5C-E3050C3C46A1.jpg', height: 781 },
  { id: '790C1125-6A62-474B-8B7C-DC76CC36C69C', img: 'images/orbit/thumb-790C1125-6A62-474B-8B7C-DC76CC36C69C.jpg', url: 'images/orbit/thumb-790C1125-6A62-474B-8B7C-DC76CC36C69C.jpg', height: 693 },
  { id: 'IMG_0184', img: 'images/orbit/thumb-IMG_0184.jpg', url: 'images/orbit/thumb-IMG_0184.jpg', height: 390 },
  { id: 'IMG_3308', img: 'images/orbit/thumb-IMG_3308.jpg', url: 'images/orbit/thumb-IMG_3308.jpg', height: 345 },
  { id: 'IMG_3563', img: 'images/orbit/thumb-IMG_3563.jpg', url: 'images/orbit/thumb-IMG_3563.jpg', height: 345 },
  { id: 'IMG_3846', img: 'images/orbit/thumb-IMG_3846.jpg', url: 'images/orbit/thumb-IMG_3846.jpg', height: 345 },
  { id: 'IMG_3987', img: 'images/orbit/thumb-IMG_3987.jpg', url: 'images/orbit/thumb-IMG_3987.jpg', height: 345 },
  { id: 'IMG_4142', img: 'images/orbit/thumb-IMG_4142.jpg', url: 'images/orbit/thumb-IMG_4142.jpg', height: 390 },
  { id: 'IMG_4159', img: 'images/orbit/thumb-IMG_4159.jpg', url: 'images/orbit/thumb-IMG_4159.jpg', height: 781 },
  { id: 'IMG_4399', img: 'images/orbit/thumb-IMG_4399.jpg', url: 'images/orbit/thumb-IMG_4399.jpg', height: 345 },
  { id: 'IMG_4407', img: 'images/orbit/thumb-IMG_4407.jpg', url: 'images/orbit/thumb-IMG_4407.jpg', height: 781 },
  { id: 'IMG_4410', img: 'images/orbit/thumb-IMG_4410.jpg', url: 'images/orbit/thumb-IMG_4410.jpg', height: 390 },
  { id: 'IMG_4725', img: 'images/orbit/thumb-IMG_4725.jpg', url: 'images/orbit/thumb-IMG_4725.jpg', height: 684 },
  { id: 'IMG_4727', img: 'images/orbit/thumb-IMG_4727.jpg', url: 'images/orbit/thumb-IMG_4727.jpg', height: 781 },
  { id: 'IMG_5015', img: 'images/orbit/thumb-IMG_5015.jpg', url: 'images/orbit/thumb-IMG_5015.jpg', height: 520 },
  { id: 'IMG_5539', img: 'images/orbit/thumb-IMG_5539.jpg', url: 'images/orbit/thumb-IMG_5539.jpg', height: 781 },
  { id: 'IMG_5540', img: 'images/orbit/thumb-IMG_5540.jpg', url: 'images/orbit/thumb-IMG_5540.jpg', height: 345 },
  { id: 'IMG_5655', img: 'images/orbit/thumb-IMG_5655.jpg', url: 'images/orbit/thumb-IMG_5655.jpg', height: 390 },
  { id: 'IMG_5802', img: 'images/orbit/thumb-IMG_5802.jpg', url: 'images/orbit/thumb-IMG_5802.jpg', height: 345 },
  { id: 'IMG_5833', img: 'images/orbit/thumb-IMG_5833.jpg', url: 'images/orbit/thumb-IMG_5833.jpg', height: 345 },
  { id: 'IMG_5861', img: 'images/orbit/thumb-IMG_5861.jpg', url: 'images/orbit/thumb-IMG_5861.jpg', height: 781 },
  { id: 'IMG_5894', img: 'images/orbit/thumb-IMG_5894.jpg', url: 'images/orbit/thumb-IMG_5894.jpg', height: 781 },
  { id: 'IMG_5902', img: 'images/orbit/thumb-IMG_5902.jpg', url: 'images/orbit/thumb-IMG_5902.jpg', height: 345 },
  { id: 'IMG_5996', img: 'images/orbit/thumb-IMG_5996.jpg', url: 'images/orbit/thumb-IMG_5996.jpg', height: 781 },
  { id: 'IMG_6215', img: 'images/orbit/thumb-IMG_6215.jpg', url: 'images/orbit/thumb-IMG_6215.jpg', height: 292 },
  { id: 'IMG_6319', img: 'images/orbit/thumb-IMG_6319.jpg', url: 'images/orbit/thumb-IMG_6319.jpg', height: 292 },
  { id: 'IMG_6477', img: 'images/orbit/thumb-IMG_6477.jpg', url: 'images/orbit/thumb-IMG_6477.jpg', height: 345 },
  { id: 'IMG_6563', img: 'images/orbit/thumb-IMG_6563.jpg', url: 'images/orbit/thumb-IMG_6563.jpg', height: 345 },
  { id: 'IMG_6565', img: 'images/orbit/thumb-IMG_6565.jpg', url: 'images/orbit/thumb-IMG_6565.jpg', height: 781 },
  { id: 'IMG_7682', img: 'images/orbit/thumb-IMG_7682.jpg', url: 'images/orbit/thumb-IMG_7682.jpg', height: 390 },
  { id: 'IMG_8101', img: 'images/orbit/thumb-IMG_8101.jpg', url: 'images/orbit/thumb-IMG_8101.jpg', height: 693 },
  { id: 'IMG_8108', img: 'images/orbit/thumb-IMG_8108.jpg', url: 'images/orbit/thumb-IMG_8108.jpg', height: 693 },
  { id: 'IMG_8891', img: 'images/orbit/thumb-IMG_8891.jpg', url: 'images/orbit/thumb-IMG_8891.jpg', height: 693 },
  { id: 'IMG_8893', img: 'images/orbit/thumb-IMG_8893.jpg', url: 'images/orbit/thumb-IMG_8893.jpg', height: 693 },
  { id: 'c40a448e-a5f5-4ba3-a3ed-db003dd2ded0', img: 'images/orbit/thumb-c40a448e-a5f5-4ba3-a3ed-db003dd2ded0.jpg', url: 'images/orbit/thumb-c40a448e-a5f5-4ba3-a3ed-db003dd2ded0.jpg', height: 390 },
  { id: 'e50a4b9a-1648-4778-aa91-788725508a53', img: 'images/orbit/thumb-e50a4b9a-1648-4778-aa91-788725508a53.jpg', url: 'images/orbit/thumb-e50a4b9a-1648-4778-aa91-788725508a53.jpg', height: 345 }
];

const mount = document.getElementById('masonry-root');
if (mount) {
  createRoot(mount).render(html`
    <${Masonry}
      items=${galleryItems}
      ease="power3.out"
      duration=${0.6}
      stagger=${0.04}
      animateFrom="bottom"
      scaleOnHover=${true}
      hoverScale=${0.96}
      blurToFocus=${true}
      colorShiftOnHover=${false}
    />
  `);
}
