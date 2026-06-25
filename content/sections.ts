// Ordered section registry: running index, anchor id, mono label/kicker,
// per-section accent (used on pull-quotes + glyphs), and panel tone.
// Tones alternate to give the dark-dominant + white-punctuation contrast.

export type Tone = "dark" | "light";

export interface SectionMeta {
  index: string;
  id: string;
  /** Short mono kicker shown beside the index. */
  kicker: string;
  accent: string;
  tone: Tone;
}

export const sections: SectionMeta[] = [
  { index: "01", id: "sutura", kicker: "The startup", accent: "#2f6bff", tone: "dark" },
  { index: "02", id: "research", kicker: "Research", accent: "#ff4d2e", tone: "light" },
  { index: "03", id: "experience", kicker: "Work experience", accent: "#ffb020", tone: "dark" },
  { index: "04", id: "record", kicker: "The record", accent: "#ffd23f", tone: "dark" },
  { index: "05", id: "brain", kicker: "A system I built", accent: "#9b7cff", tone: "light" },
  { index: "06", id: "approach", kicker: "About", accent: "#34d6c3", tone: "dark" },
  { index: "07", id: "skills", kicker: "Skills & methods", accent: "#3dd6f0", tone: "dark" },
  { index: "08", id: "community", kicker: "Beyond research", accent: "#ff7a66", tone: "light" },
  { index: "09", id: "contact", kicker: "Contact", accent: "#2f6bff", tone: "dark" },
];

export const sectionById = Object.fromEntries(
  sections.map((s) => [s.id, s]),
) as Record<string, SectionMeta>;
