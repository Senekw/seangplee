// 07 — Skills & Methods.

export const skills = {
  title: "Skills & Methods",
  pullquote:
    "The stack I use to take patient genomic data from raw matrix to first-author result.",

  groups: [
    {
      label: "Languages & tools",
      items: ["Python", "R", "Bioconductor", "NumPy", "Pandas", "scikit-learn", "SimpleITK"],
    },
    {
      label: "Genomics & bioinformatics",
      items: [
        "TCGA data analysis",
        "RPPA proteomics",
        "Transcriptomic analysis",
        "GSVA",
        "MCP-counter",
        "Spatial EcoTyper",
      ],
    },
    {
      label: "Statistics & survival",
      items: [
        "Survival modeling",
        "Kaplan–Meier",
        "Cox proportional hazards",
        "Biostatistics",
        "Multiple-testing correction",
      ],
    },
    {
      label: "Imaging & radiomics",
      items: ["PyRadiomics", "GLCM radiomics", "3D Slicer"],
    },
    {
      label: "Domains",
      items: ["Computational biology", "Cancer genomics", "Tumor immunology"],
    },
    {
      label: "Communication",
      items: ["Research writing", "Manuscript preparation", "Public speaking"],
    },
  ],

  // Affiliations / datasets / tools — the marquee strip (spec §5.05).
  affiliations: [
    "MD Anderson Cancer Center",
    "Baylor College of Medicine",
    "University of Houston",
    "TCGA PanCancer Atlas",
    "CPTAC",
    "Molecular Oncology",
    "Scientific Reports",
    "Cholangiocarcinoma Foundation",
    "Y Combinator Startup School",
    "10x Genomics Visium",
    "Slide-seq",
    "MERFISH",
  ],
} as const;
