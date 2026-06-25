// 04 — The Record. Includes the CCF poster behind a toggle (the user's most
// recent committed decision). REDACTION FLAG: poster prints the gene panel +
// survival tables — confirm before any public deploy.

interface RecordEntry {
  title: string;
  period: string;
  role: string;
  body: string;
  hasPoster?: boolean;
}

const entries: RecordEntry[] = [
  {
    title: "First-author poster · Cholangiocarcinoma Foundation Annual Conference",
    period: "2026",
    role: "Youngest presenter on record · MD Anderson travel grant",
    body: "A 6-gene pSTAT3 transcriptomic score predicting poor survival in biliary tract cancer (n = 198). The presented poster of record.",
    hasPoster: true,
  },
  {
    title: "Poster Presenter · ESMO Annual Congress",
    period: "2027 · upcoming",
    role: "Singapore · MD Anderson travel grant",
    body: "Presenting “Tumor Phospho-STAT3 Marks a Shared Angiogenic–Fibrotic, Immune-Replete Microenvironment Across Gastrointestinal Cancers: A Multi-Omic Analysis of 1,274 Tumors.”",
  },
  {
    title: "Returning Presenter · Cholangiocarcinoma Foundation Annual Conference",
    period: "2027 · upcoming",
    role: "FGF19–FGFR4 · hepatocellular carcinoma",
    body: "Returning to CCF to present current work on the FGF19–FGFR4 signaling axis — identifying novel therapeutic targets in hepatocellular carcinoma and other GI cancers.",
  },
];

export const record = {
  claim:
    "The youngest presenter — and the only high schooler — in the documented history of the Cholangiocarcinoma Foundation Annual Conference.",
  body:
    "The documented record shows no undergraduate or high-school presenters before me. I cleared that line as a first author. Verifiable from the conference's recorded record.",
  caption: "Class of 2028 · Cinco Ranch High School",

  shots: [
    {
      key: "ccfBallroom",
      alt: "The Grand Ballroom entrance at the Cholangiocarcinoma Foundation 2026 Annual Conference.",
      caption: "CCF 2026 Annual Conference — the Grand Ballroom.",
    },
    {
      key: "ccfBadge",
      alt: "Sean Lee's Cholangiocarcinoma Foundation 2026 Annual Conference badge — Katy, Texas.",
      caption: "My conference credential.",
    },
  ],

  poster: {
    key: "ccfPoster",
    href: "/images/ccf-poster.jpg",
    alt: "First-author research poster: A Novel 6-Gene pSTAT3 Transcriptomic Score Identifies an Immunosuppressive, Chemotherapy-Resistant Phenotype and Predicts Poor Survival in Biliary Tract Cancer — Cholangiocarcinoma Foundation 2026 Annual Conference.",
    caption: "The presented poster of record — CCF 2026. Open in a new tab for full size.",
    labelClosed: "View the poster",
    labelOpen: "Hide the poster",
  },

  entries,

  tags: ["first author", "biliary tract cancer", "computational oncology"],
};
