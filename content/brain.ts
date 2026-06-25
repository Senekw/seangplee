// 05 — The Research Brain.

export const brain = {
  title: "The Research Brain",
  pullquote:
    "I built the best research partner I've ever had by assuming it's lying to me. It's an AI research system layered over a ~1,300-note knowledge base on hepatobiliary and pan-GI oncology, genomics, and drug development. It carried one genomics manuscript into peer review.",

  stats: [
    { num: "1,300+", label: "Interlinked notes" },
    { num: "~30,000", label: "Links" },
    { num: "480+", label: "Methods & datasets" },
    { num: "2,813", label: "Citations, every one web-verified" },
  ],

  graph: {
    key: "researchBrain",
    alt: "Graph view of Sean's research vault — hundreds of interlinked notes on GI oncology, genomics, and drug development.",
    caption: "The vault's graph view — every node a note, every line a verified link.",
  },

  thesis:
    "Everyone's racing to make AI smarter. In cancer research, smarter was never the problem — one fabricated number isn't a typo, it's a retraction. So I built mine to be accountable instead.",

  prose:
    "The accountability isn't a prompt. It's machinery: Claude Code hooks, custom agents, and slash commands that won't let a claim through unless it survives them. Built with custom agents — biostatistician, citation-verifier, falsification-red-team, provenance-auditor, manuscript-drafter, literature-scout — and commands /qc, /verify-claim, and /falsify.",

  splitPhoto: {
    key: "brainCanyon",
    alt: "Looking up out of a red sandstone slot canyon toward a sliver of sky.",
    caption: "A way out, carved in stone — structure found under pressure.",
  },

  principles: [
    {
      k: "Provenance or it didn't happen",
      v: "It can't state a result without pointing to the file that produced it — a claim→script→output ledger.",
    },
    {
      k: "Verified or stamped unverified",
      v: "Every citation is web-verified or marked “unverified.” No middle ground.",
    },
    {
      k: "Confidence is earned",
      v: "Nothing is called “confident” until a separate red-team agent has tried, and failed, to falsify it.",
    },
    {
      k: "No hype, by construction",
      v: "Effect sizes, confidence intervals, and multiple-testing correction enforced as I write.",
    },
    {
      k: "QC on every edit",
      v: "A PostToolUse hook flags a missing result file, an unverified DOI, or drift between a note's numbers and the ledger — as I type.",
    },
  ],

  close:
    "Could it still hallucinate? Of course. The difference is mine has to get past a system built to assume it will.",

  tags: ["Claude Code", "provenance ledger", "falsification red-team", "citation verification"],
} as const;
