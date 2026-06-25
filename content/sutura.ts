// 01 — Sutura Genomics (flagship). All copy verbatim from the prior build.

export const sutura = {
  badge: "Accepted to Y Combinator Startup School 2026 · Co-founder",
  title: "Sutura Genomics",
  pullquote:
    "Automated non-rigid tissue alignment for spatial transcriptomics, built with graph deep learning to solve the one case where every existing method structurally fails: tissue tearing.",

  intro:
    "Sutura Genomics is a startup I co-founded with Rushil Maniar; it was accepted to Y Combinator's Startup School (San Francisco, July 25–26, 2026). We submitted and were accepted under our original name, Arca, and have since renamed the company to Sutura Genomics.",

  blocks: [
    {
      heading: "The problem",
      body: "Spatial transcriptomics maps gene expression across tissue at cellular resolution — the technology now reshaping cancer research, neuroscience, and drug discovery. To build a 3D picture, tissue is cut into thin slices, and those slices warp, stretch, and tear during prep. Before any analysis, the slices have to be aligned back together — a step called tissue registration. Today's state-of-the-art tools, PASTE2 and STalign, use Optimal Transport, which handles smooth warps but breaks on tears: the math literally cannot represent the discontinuity a tear creates. It's a structural limitation, not a tuning problem — and tearing is one of the most common failure modes in real experiments, with no existing tool that handles it well.",
    },
    {
      heading: "What we built",
      body: "A graph deep-learning approach to tissue registration: we represent each slice as a graph rather than a continuous field and learn the alignment directly from the data. Because a tear becomes a break in the graph instead of a region the math is forced to smooth over, the model can represent the discontinuity that Optimal Transport structurally cannot — which is exactly where today's tools fail. Full architecture and training details are kept private ahead of publication.",
    },
  ],

  proven: {
    heading: "What we've proven",
    claim:
      "Roughly 7× lower registration error than PASTE2 under tissue tearing — measured head-to-head on matched warps.",
    body: "Benchmarked against PASTE2 on matched torn-tissue cases, our graph model holds roughly 7× lower registration error under tearing and stays markedly flatter as the tearing gets worse. The result is specific to the tearing regime; smooth warps are not the case we built for. Full benchmark protocol and numbers are kept private ahead of publication.",
  },

  stats: [
    { num: "~7×", label: "Lower error than PASTE2 under tearing" },
    { num: "Holds", label: "Stays flat as tearing worsens" },
    { num: "SOTA", label: "Benchmarked vs PASTE2 / STalign" },
    { num: "3 / 3", label: "Acceptance tests passed" },
  ],

  versus: {
    head: ["Head-to-head · same warps", "Sutura", "PASTE2 (SOTA)"],
    rows: [
      {
        metric: "Error under tearing",
        a: "~7× lower",
        b: "baseline (current SOTA)",
      },
      {
        metric: "As tearing worsens",
        a: "stays markedly flatter",
        b: "degrades faster",
      },
      {
        metric: "Smooth warp (not our target)",
        a: "not the case we built for",
        b: "robust",
      },
      { metric: "Self-control (no warp)", a: "matches PASTE2", b: "matches Sutura" },
      { metric: "Method class", a: "graph deep learning", b: "Optimal Transport" },
    ],
  },

  caveats: {
    cap: "Honest status",
    items: [
      "Early-stage results — broader validation across more evaluation settings and tissue sources is in progress.",
      "Not yet published or peer-reviewed; no preprint is up yet, and the codebase isn't public.",
    ],
  },

  why: {
    heading: "Why it matters",
    body: "Every multi-slice 3D tissue study needs alignment first, and spatial transcriptomics is on track to be a foundational technology of the next decade of biology — with datasets from 10x Genomics Visium, Slide-seq, and MERFISH growing fast across hundreds of labs. Alignment gates everything downstream, and tearing — one of the most common ways real tissue fails — is the case the field still can't handle. Fix the alignment layer and the analysis above it gets to run on data that currently has to be thrown away. That's the gap Sutura is built for.",
    findings: [
      "Cancer research — 3D tumor maps of invasion and immune evasion.",
      "Drug discovery — resolving which cells respond to a therapy versus resist it.",
      "Neuroscience — brain atlases assembled from thousands of sections.",
      "Developmental biology — mapping tissue formation across stages.",
    ],
  },

  roadmap: {
    heading: "Where it's going",
    phases: [
      {
        k: "Phase 1",
        when: "→12 months",
        v: "the best open-source tissue-alignment tool — cited, used by 10+ labs, with the preprint published.",
      },
      {
        k: "Phase 2",
        when: "12–24 months",
        v: "a managed cloud platform — upload data, align in the cloud, download results, no bioinformatics setup, priced per project or dataset.",
      },
      {
        k: "Phase 3",
        when: "24+ months",
        v: "a full spatial-omics analysis platform spanning cell-type annotation, trajectory analysis, and multi-sample integration.",
      },
    ],
    bet: "The bet: spatial transcriptomics becomes as standard as single-cell RNA-seq, every lab doing it needs alignment, and Sutura is the alignment layer.",
  },

  team: [
    {
      name: "Rushil Maniar",
      role: "Co-founder — pipeline, model architecture, training",
    },
    {
      name: "Sean Lee",
      role: "Co-founder — website, outreach, preprint, early user research",
    },
  ],

  finehint:
    "Accepted to Y Combinator's Startup School — a two-day founder program — in San Francisco on July 25–26, 2026. To be precise: this is acceptance to the Startup School program; Sutura is not YC-funded and is not a YC-batch company.",

  tags: [
    "spatial transcriptomics",
    "graph deep learning",
    "tissue registration",
    "non-rigid alignment",
    "open source",
  ],
} as const;
