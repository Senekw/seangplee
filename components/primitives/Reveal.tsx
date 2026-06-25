"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { dur, ease, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay (s) before the reveal fires. */
  delay?: number;
  as?: "div" | "li" | "p" | "section" | "ul" | "ol";
}

/** Block reveal: fade + translate-up, once in view. Reduced motion → fade only. */
export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={
        reduced
          ? { duration: dur.fast, ease: "linear", delay }
          : { duration: dur.base, ease: ease.outExpo, delay }
      }
    >
      {children}
    </MotionTag>
  );
}
