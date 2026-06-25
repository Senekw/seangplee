"use client";

import { motion, useReducedMotion } from "motion/react";
import { staggerChild, staggerParent, viewportOnce } from "@/lib/motion";

interface TagClusterProps {
  tags: readonly string[];
  label?: string;
  className?: string;
}

/** Inline mono category chips that stagger in left-to-right. */
export default function TagCluster({ tags, label, className }: TagClusterProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <ul className={`tagrow ${className ?? ""}`} aria-label={label}>
        {tags.map((t) => (
          <li className="tag" key={t}>
            {t}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className={`tagrow ${className ?? ""}`}
      aria-label={label}
      variants={staggerParent()}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {tags.map((t) => (
        <motion.li className="tag" key={t} variants={staggerChild}>
          {t}
        </motion.li>
      ))}
    </motion.ul>
  );
}
