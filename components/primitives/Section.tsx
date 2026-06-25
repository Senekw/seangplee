"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { SectionMeta } from "@/content/sections";
import PixelGlyph from "@/components/decor/PixelGlyph";

interface SectionProps {
  meta: SectionMeta;
  children: ReactNode;
  /** Use the slightly-raised dark surface tone. */
  raised?: boolean;
  /** Extra class on the inner <section>. */
  className?: string;
  /** Hide the running mono kicker (e.g. contact). */
  hideKicker?: boolean;
  labelledBy?: string;
}

/**
 * One rounded panel in the rise-and-replace stack. Sets the per-section accent,
 * applies the tone (dark/light), and recedes slightly (scale + dim) as the next
 * panel rises over it — revealing the glitch texture in the gutters. Reduced
 * motion → no transform.
 */
export default function Section({
  meta,
  children,
  raised,
  className,
  hideKicker,
  labelledBy,
}: SectionProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.62]);

  const toneClass = meta.tone === "light" ? "panel--light" : "panel--dark";
  const style = { "--accent": meta.accent } as CSSProperties;

  return (
    <motion.section
      ref={ref}
      id={meta.id}
      aria-labelledby={labelledBy}
      className={`panel ${toneClass} ${raised ? "panel--raised" : ""}`}
      style={
        reduced ? style : { ...style, scale, opacity, transformOrigin: "center top" }
      }
    >
      <div className={`section ${className ?? ""}`}>
        <div className="shell">
          <div className="rail" aria-hidden="true">
            <span>{meta.index}</span>
          </div>
          <div className="section__content">
            {!hideKicker && (
              <p className="kicker">
                <span className="kicker__num">{meta.index}</span>
                <span>{meta.kicker}</span>
                <PixelGlyph className="kicker__glyph" variant="square" size={12} />
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
