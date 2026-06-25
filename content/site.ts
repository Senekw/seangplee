// Global site data: identity, metadata, navigation, hero, contact.
// All copy extracted verbatim from the previous build — nothing invented.

export const site = {
  name: "Sean Lee",
  fullName: "Sean GP Lee",
  formalName: "Sean G. P. Lee",
  role: "Computational Cancer Biology",
  location: "Katy, Texas",
  email: "seangplee@gmail.com",
  url: "https://seangplee.com",

  meta: {
    title: "Sean Lee — Computational Cancer Biology",
    description:
      "Sean Lee — cancer-genomics researcher and co-founder of Sutura Genomics (accepted to YC Startup School 2026). First-author work across 1,274 tumors and six GI cancers; graph deep learning for spatial-transcriptomics tissue alignment.",
    ogTitle: "Sean Lee — Computational Cancer Biology",
    ogDescription:
      "Co-founder of Sutura Genomics (accepted to YC Startup School 2026) and first-author computational-oncology researcher. I build computational models of cancer from patient genomic data.",
  },

  hero: {
    eyebrow: "Computational cancer biology — Katy, Texas",
    // Headline rendered line-by-line with a mask reveal.
    headline: [
      "I build computational models of cancer",
      "from patient genomic data.",
    ],
    headlineDim:
      "First author across 1,274 tumors — and co-founder of a spatial-genomics startup.",
    facts: ["Co-founder, Sutura Genomics", "YC Startup School 2026", "MD Anderson"],
  },

  // Index/anchor map for the top bar + scroll-spy.
  nav: [
    { id: "sutura", label: "Sutura" },
    { id: "research", label: "Research" },
    { id: "experience", label: "Work" },
    { id: "record", label: "Record" },
    { id: "brain", label: "Brain" },
  ],

  contact: {
    lede:
      "Reach out directly — collaboration, a question about the work, or just to talk. Email is best.",
    socials: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/sean-lee-ab5645383/",
      },
    ],
  },
} as const;

export type Site = typeof site;
