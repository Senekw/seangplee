"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { dur, ease } from "@/lib/motion";
import GrainField from "@/components/decor/GrainField";

export default function Hero() {
  const reduced = useReducedMotion();
  const style = { "--accent": "#2f6bff" } as CSSProperties;

  const lines = site.hero.headline;
  const lastIdx = lines.length - 1;

  const MaskLine = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
    if (reduced) return <span style={{ display: "block" }}>{children}</span>;
    return (
      <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.04em" }}>
        <motion.span
          style={{ display: "block", willChange: "transform" }}
          initial={{ y: "115%" }}
          animate={{ y: "0%" }}
          transition={{ duration: dur.slow, ease: ease.outExpo, delay }}
        >
          {children}
        </motion.span>
      </span>
    );
  };

  const fade = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: dur.fast, delay } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: dur.base, ease: ease.outExpo, delay },
        };

  return (
    <section className="hero" id="hero" aria-label="Introduction" style={style}>
      <div className="hero__bg">
        <GrainField />
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__inner">
        <motion.div className="hero__row hero__row--top" {...fade(0.1)}>
          <p className="hero__eyebrow">
            <span className="dot" aria-hidden="true" /> {site.hero.eyebrow}
          </p>
          <a className="hero__email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </motion.div>

        <h1 className="hero__headline">
          {lines.map((line, i) => {
            const isLast = i === lastIdx;
            const showDot = isLast && line.endsWith(".");
            const text = showDot ? line.slice(0, -1) : line;
            return (
              <MaskLine key={i} delay={0.18 + i * 0.08}>
                {text}
                {showDot && <span className="accent">.</span>}
              </MaskLine>
            );
          })}
          <motion.span className="hero__headline-dim" {...fade(0.18 + lines.length * 0.08 + 0.05)}>
            {site.hero.headlineDim}
          </motion.span>
        </h1>

        <motion.div className="hero__row hero__row--bottom" {...fade(0.5)}>
          <p className="hero__name">{site.name}</p>
          <ul className="hero__facts">
            {site.hero.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      <a className="hero__cue" href="#sutura" aria-label="Scroll down">
        Scroll <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
