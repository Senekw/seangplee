// 02 — Research. Verbatim copy. Redaction note: keep R = 0.498 and sample
// sizes; the "6-gene" score is named only as it appears in the poster title of
// record (no gene list, no per-gene panel, no downstream-target names).

interface Author {
  name: string;
  aff: string;
  lead: boolean;
}

interface Paper {
  lead: boolean;
  status: string;
  title: string;
  titleSmall?: boolean;
  venue: string;
  authors: Author[];
  body: string;
  findings: string[];
}

const papers: Paper[] = [
  {
    lead: true,
    status: "Manuscript · under review · 2026",
    title:
      "Tumor Phospho-STAT3 Marks a Shared Angiogenic–Fibrotic, Immune-Replete Microenvironment Across Gastrointestinal Cancers: A Multi-Omic Analysis of 1,274 Tumors",
    venue: "Molecular Oncology · FEBS Press / Wiley · gold open access",
    authors: [
      { name: "Sean G. P. Lee", aff: "first & corresponding author", lead: true },
      { name: "Sunyoung Lee, MD", aff: "MD Anderson Cancer Center", lead: false },
    ],
    body: "I asked whether tumor pSTAT3 is written into the genome or into the tissue around the cells. Across 1,274 primary tumors and six GI cancers, no somatic mutation reached significance in any cohort — and the cohorts were well-powered, so that null is informative. The phenotype is microenvironmental, not genetically encoded: a shared angiogenic–fibrotic core where independent methods converge. It also reframes a field assumption — these tumors are immune-replete, not immune-excluded. Cytotoxic CD8 and NK cells are not depleted and are often increased; the immune compartment is reorganized, not absent. On its own the program is survival-neutral; prognosis instead tracks the net stromal-over-immune balance, not total microenvironment burden. I built it on a claim→script→output provenance ledger with falsification tests pre-committed before execution, and it cleared independent biostatistics, falsification red-team, and provenance-audit review.",
    findings: [
      "No somatic gene reached significance in any cohort — an informative null.",
      "A shared angiogenic–fibrotic core, convergent across independent methods.",
      "Immune-replete, not immune-excluded — CD8/NK not depleted, often increased.",
      "Prognosis tracks the net stromal-over-immune balance.",
      "External validation held under a non-transcriptomic purity control.",
    ],
  },
  {
    lead: false,
    status: "Manuscript · under review at Scientific Reports · 2026",
    title:
      "An Identifiability Framework for Compartment-Resolved STAT3 Attribution from Bulk Tumors: the pSTAT3 “Immune-Enriched Fibrotic” Signal Is Stroma-Borne in Colorectal Cancer",
    venue: "Scientific Reports · sole author",
    authors: [
      {
        name: "Sean G. P. Lee",
        aff: "sole author, first & corresponding (Cinco Ranch High School)",
        lead: true,
      },
    ],
    body: "A bulk pSTAT3 reading can't tell whether the signal comes from the cancer cell or the stroma around it — every tumor is a mixture of the two. I deconvolved TCGA GI tumors against single-cell references, recovered the STAT3 program separately in the malignant and stromal compartments, and asked which one carries the “immune-enriched fibrotic” signal. The catch: both compartment scores come from the same mixture, so they're collinear by construction, and the usual partial-correlation “fix” can sign-reverse into a fake suppression effect. So I gated every verdict on an explicit identifiability criterion and read attribution from raw associations and a variance partition. The contrast was identifiable in only the colorectal cohort — and there the immune signal was carried more strongly by stromal STAT3, with measured pSTAT3 tracking cancer-associated-fibroblast abundance. Bulk pSTAT3 in GI cancers marks a STAT3-active microenvironment, not a tumor-cell-autonomous program.",
    findings: [
      "1,116 tumors across 5 GI cohorts; deconvolution validated by pseudobulk recovery, an orthogonal method, and an external purity estimate.",
      "Malignant-vs-stromal STAT3 was identifiable in only one cohort — collinearity made the rest unidentifiable.",
      "In colorectal, the immune association was carried more strongly by stromal than malignant STAT3.",
      "Partial correlations could sign-reverse under collinearity — a net-suppression artifact, not biology.",
      "Robust to gene set, deconvolution setting, abundance residualization, and leave-one-out.",
    ],
  },
  {
    lead: false,
    status: "Conference poster · first author · 2026",
    title:
      "A Novel 6-Gene pSTAT3 Transcriptomic Score Identifies an Immunosuppressive, Chemotherapy-Resistant Phenotype and Predicts Poor Survival in Biliary Tract Cancer",
    venue: "Cholangiocarcinoma Foundation 2026 Annual Conference",
    authors: [
      { name: "Sean GP Lee", aff: "Cinco Ranch High School", lead: true },
      {
        name: "Mohamed Nuh, Monica Hsiang, Akhila Madulapalli Reddy",
        aff: "Baylor College of Medicine",
        lead: false,
      },
      { name: "Sunyoung Lee", aff: "MD Anderson Cancer Center", lead: false },
    ],
    body: "As first author, I led a 6-gene pSTAT3 activity score, validated against protein-level STAT3 phosphorylation measured by RPPA (R = 0.498, p = 0.005). Applied to 198 biliary tract cancer patients, a high score predicted significantly worse progression-free and overall survival across all stages. High-score tumors showed an immunosuppressive, chemotherapy-resistant microenvironment — including a candidate chemoresistance mechanism — and first-line chemo-immunotherapy did not rescue prognosis.",
    findings: [
      "6-gene score validated against RPPA STAT3_pY705 (R = 0.498).",
      "High score predicts worse PFS and OS across all stages.",
      "A candidate chemoresistance mechanism identified in high-score tumors.",
      "Microenvironment profiled with a published immune-signature panel.",
    ],
  },
  {
    lead: false,
    status: "Current work · in progress",
    title: "FGF19–FGFR4 signaling axis",
    titleSmall: true,
    venue: "MD Anderson · research mentorship",
    authors: [],
    body: "Investigating the FGF19–FGFR4 axis to identify novel therapeutic targets in GI cancers. Same approach as before: build the model, run the analysis, and assume it's lying to me until it survives falsification.",
    findings: [],
  },
];

export const research = {
  pullquote:
    "I build computational models of cancer from genomic data and present them as first author. I write the code, run the analysis, and own the claims down to the script.",
  intro:
    "I study pSTAT3 — a signaling state tied to inflammation in tumors — across six gastrointestinal cancers. The question I keep asking: what kind of tumor microenvironment does this state actually mark, and does it predict who lives longer?",
  stats: [
    { num: "1,274", label: "Primary tumors analyzed" },
    { num: "6", label: "GI cancer types" },
    { num: "4", label: "Molecular data layers" },
    { num: "3", label: "First-author works" },
  ],
  papers,
  methodsFoot:
    "Stack: R 4.6 / Bioconductor 3.23, Python, GSVA, MCP-counter, Spatial EcoTyper, Cox / Kaplan–Meier survival modeling. Discovery on the TCGA PanCancer Atlas; validation on CPTAC proteogenomic cohorts. An organ-conditional direction remains a stated testable prediction, not yet demonstrated.",
  tags: [
    "multi-omics",
    "tumor microenvironment",
    "GI oncology",
    "survival modeling",
    "reproducible provenance",
  ],
};
