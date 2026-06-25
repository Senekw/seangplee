"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

interface BlurImageProps {
  img: StaticImageData;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Subtle intra-frame parallax on scroll. */
  parallax?: boolean;
  /** Fixed aspect ratio for the frame, e.g. "21 / 9". Defaults to image ratio. */
  ratio?: string;
  objectPosition?: string;
}

/**
 * next/image wrapper: blur-up placeholder (auto from static import), no CLS,
 * optional gentle parallax inside its frame. Reduced motion → no parallax.
 */
export default function BlurImage({
  img,
  alt,
  caption,
  className,
  sizes = "(max-width: 900px) 100vw, 60vw",
  priority = false,
  parallax = false,
  ratio,
  objectPosition = "center",
}: BlurImageProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const useParallax = parallax && !reduced;

  const frameStyle = ratio ? { aspectRatio: ratio } : undefined;

  return (
    <figure className={`figure ${className ?? ""}`}>
      <div className="figure__frame" ref={ref} style={frameStyle}>
        <motion.div
          style={{
            y: useParallax ? y : 0,
            height: useParallax ? "112%" : "100%",
            position: "relative",
          }}
        >
          <Image
            className="figure__img"
            src={img}
            alt={alt}
            placeholder="blur"
            sizes={sizes}
            priority={priority}
            style={{
              width: "100%",
              height: ratio ? "100%" : "auto",
              objectFit: "cover",
              objectPosition,
            }}
          />
        </motion.div>
      </div>
      {caption ? <figcaption className="figure__cap">{caption}</figcaption> : null}
    </figure>
  );
}
