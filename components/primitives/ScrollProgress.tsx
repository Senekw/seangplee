"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Thin accent progress bar pinned to the top edge. */
export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });
  // Under reduced motion, track position directly with no spring lag/overshoot.
  const scaleX = reduced ? scrollYProgress : smooth;

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
