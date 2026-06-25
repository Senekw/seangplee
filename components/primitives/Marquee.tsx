"use client";

import { useReducedMotion } from "motion/react";

interface MarqueeProps {
  items: readonly string[];
  label?: string;
  durationSec?: number;
}

/**
 * Slow, calm auto-scrolling mono strip; pauses on hover. Under reduced motion
 * the track is static (no animation) and shows a single wrapped set.
 */
export default function Marquee({ items, label, durationSec = 42 }: MarqueeProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="marquee" aria-label={label}>
        <div className="marquee__track" style={{ animation: "none", flexWrap: "wrap" }}>
          <span className="marquee__item">{items.join("  ✳  ")}</span>
        </div>
      </div>
    );
  }

  // Duplicate the set so the -50% translate loops seamlessly.
  const doubled = [...items, ...items];

  return (
    <div className="marquee" aria-label={label}>
      <div
        className="marquee__track"
        style={{ ["--marquee-dur" as string]: `${durationSec}s` }}
      >
        {doubled.map((item, i) => (
          <span className="marquee__item" key={i} aria-hidden={i >= items.length}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
