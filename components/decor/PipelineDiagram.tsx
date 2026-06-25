"use client";

import { motion, useReducedMotion } from "motion/react";
import { dur, ease, viewportOnce } from "@/lib/motion";

/**
 * Original line-diagram of the tissue-registration pipeline: slices → graph
 * encode → (a tear becomes a graph break, where Optimal Transport fails) →
 * learned alignment → registered 3D. Themeable inline SVG; connectors draw in
 * on entry. Reduced motion → static.
 */
export default function PipelineDiagram({ caption }: { caption?: string }) {
  const reduced = useReducedMotion();

  const Path = ({ d, i, dashed }: { d: string; i: number; dashed?: boolean }) =>
    reduced ? (
      <path d={d} fill="none" stroke="currentColor" strokeWidth={1.5} strokeDasharray={dashed ? "4 4" : undefined} />
    ) : (
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray={dashed ? "4 4" : undefined}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: dur.slow, ease: ease.outExpo, delay: 0.15 + i * 0.18 }}
      />
    );

  const Node = ({
    x,
    y,
    w,
    label,
    accent,
    i,
  }: {
    x: number;
    y: number;
    w: number;
    label: string;
    accent?: boolean;
    i: number;
  }) => {
    const inner = (
      <>
        <rect
          x={x}
          y={y}
          width={w}
          height={34}
          rx={8}
          fill="none"
          stroke={accent ? "var(--accent)" : "currentColor"}
          strokeWidth={accent ? 2 : 1.2}
        />
        <text
          x={x + w / 2}
          y={y + 21}
          textAnchor="middle"
          fontSize="11"
          fontFamily="var(--font-mono)"
          letterSpacing="0.04em"
          fill={accent ? "var(--accent)" : "currentColor"}
        >
          {label}
        </text>
      </>
    );
    return reduced ? (
      <g>{inner}</g>
    ) : (
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: dur.base, ease: ease.outExpo, delay: 0.1 + i * 0.12 }}
      >
        {inner}
      </motion.g>
    );
  };

  return (
    <figure className="figure">
      <div
        className="figure__frame"
        style={{ color: "var(--fg)", padding: "clamp(1rem,3vw,2rem)" }}
      >
        <svg
          viewBox="0 0 360 300"
          width="100%"
          role="img"
          aria-label="Diagram: tissue slices are encoded as graphs; a tear becomes a graph break that Optimal Transport cannot represent, which the graph model learns to align into a registered 3D stack."
          style={{ display: "block" }}
        >
          {/* stippled blob backdrop */}
          <defs>
            <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="currentColor" opacity="0.18" />
            </pattern>
          </defs>
          <path
            d="M40 60 C 20 130, 30 220, 120 250 S 330 250, 330 170 S 280 30, 180 40 S 60 20, 40 60 Z"
            fill="url(#dots)"
            stroke="none"
          />

          <Node x={26} y={28} w={120} label="Tissue slices" i={0} />
          <Path d="M86 62 C 86 86, 250 70, 250 92" i={0} />
          <Node x={210} y={92} w={120} label="Graph encode" i={1} />

          <Path d="M270 126 C 270 150, 150 138, 150 158" i={1} dashed />
          <Node x={86} y={158} w={128} label="Tear → graph break" accent i={2} />
          <circle cx="150" cy="158" r="3.5" fill="var(--accent)" />

          <Path d="M150 192 C 150 214, 250 206, 250 224" i={2} />
          <Node x={206} y={224} w={128} label="Learn alignment" i={3} />

          <Path d="M206 241 C 120 250, 90 250, 70 232" i={3} />
          <Node x={20} y={224} w={120} label="Registered 3D" i={4} />

          {/* accent joints */}
          <circle cx="86" cy="62" r="3" fill="currentColor" />
          <circle cx="270" cy="126" r="3" fill="currentColor" />
        </svg>
      </div>
      {caption ? <figcaption className="figure__cap">{caption}</figcaption> : null}
    </figure>
  );
}
