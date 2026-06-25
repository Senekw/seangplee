"use client";

import { motion, useReducedMotion } from "motion/react";
import { dur, ease, viewportOnce } from "@/lib/motion";

interface RevealTextProps {
  /** Each string is one masked line that wipes up from its frame. */
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Stagger between lines (s). */
  stagger?: number;
  delay?: number;
  id?: string;
}

/**
 * Line-by-line mask reveal: each line sits in an overflow-hidden frame and
 * wipes up into place. Reduced motion → plain static text.
 */
export default function RevealText({
  lines,
  className,
  as = "h2",
  stagger = 0.08,
  delay = 0,
  id,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const Tag = as;

  if (reduced) {
    return (
      <Tag className={className} id={id}>
        {lines.map((line, i) => (
          <span key={i} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <span
          key={i}
          style={{ display: "block", overflow: "hidden", paddingBottom: "0.04em" }}
        >
          <motion.span
            style={{ display: "block", willChange: "transform" }}
            initial={{ y: "115%" }}
            whileInView={{ y: "0%" }}
            viewport={viewportOnce}
            transition={{
              duration: dur.slow,
              ease: ease.outExpo,
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
