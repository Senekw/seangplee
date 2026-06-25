// Shared motion tokens + variants. Easing/timing mirrors the design spec (§4.8).
import type { Variants, Transition } from "motion/react";

export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

export const dur = {
  fast: 0.15,
  base: 0.5,
  slow: 0.8,
};

export const stagger = 0.07;

// Block reveal: fade + translate up. Honors reduced motion at the call site.
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.base, ease: ease.outExpo },
  },
};

// A single masked heading line wiping up from its overflow-hidden frame.
export const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: dur.slow, ease: ease.outExpo },
  },
};

// Container that staggers its children (tag clusters, stat strips, lists).
export const staggerParent = (delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: dur.base, ease: ease.outExpo } },
};

// Standard whileInView viewport config — fire once, slightly before fully in view.
export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;

export const reducedFade: Transition = { duration: dur.fast, ease: "linear" };
