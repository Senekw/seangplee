// 03 — Work experience.

interface ExperienceEntry {
  title: string;
  titleHref?: string;
  period: string;
  role: string;
  body?: string;
  stat?: string;
  link?: { label: string; href: string };
}

const entries: ExperienceEntry[] = [
  {
    title: "Sutura Genomics · Co-Founder & CTO",
    period: "Apr 2026 – present",
    role: "Formerly Arca · spatial transcriptomics",
    body: "Automated non-rigid tissue alignment for spatial transcriptomics, built with graph deep learning to solve the one case where every existing method structurally fails: tissue tearing.",
  },
  {
    title: "Throughway · Co-Founder & CFO",
    period: "Apr 2026 – present",
    role: "Nonprofit · cancer-patient financial access",
    body: "A nonprofit reducing financial toxicity and improving insurance access for cancer patients. We're mentored by the MD Anderson Financial Clearance Center. I'm using MD Anderson and Cholangiocarcinoma Foundation connections to expand partnerships and the donor network, with growth planned around the CCF 2027 Annual Conference.",
    stat: "Mentored by the MD Anderson Financial Clearance Center",
  },
  {
    title: "Cancer Research Society · Founder & President",
    titleHref: "https://cancerresearchsociety.science/",
    period: "Jan 2026 – present",
    role: "Student org · 120+ members",
    body: "I founded and lead a student org — now 120+ members — that connects aspiring researchers with real cancer-research opportunities. I mentor members through the full process: developing ideas, cold-emailing professors and PIs, building relationships. 25+ have already secured research positions at Stanford, Yale, MIT, MD Anderson, Google, and UT — across psychology, neuroscience, cancer, and virology, from incoming freshmen to college undergraduates.",
    stat: "120+ members · 25+ placed in research",
    link: { label: "cancerresearchsociety.science", href: "https://cancerresearchsociety.science/" },
  },
  {
    title: "MD Anderson Cancer Center · Research Intern",
    period: "Jan 2024 – present",
    role: "Computational cancer genomics · GI Medical Oncology",
    body: "Computational cancer-genomics research under a GI medical oncologist and associate professor at MD Anderson — the home of essentially all my research. Through the lab I'm given access to MD Anderson clinical and molecular data that isn't open to the public — the kind of resource you can't get anywhere else. I write the code, build the models, and run the analysis on patient genomic data: pSTAT3 signaling and the tumor microenvironment across six gastrointestinal cancers, with discovery and validation on public cohorts (TCGA, CPTAC).",
  },
  {
    title: "MD Anderson Cancer Center · Research Apprentice",
    period: "Sep 2024 – Oct 2024",
    role: "One-on-one mentorship · GI Medical Oncology",
    body: "One-on-one apprenticeship shadowing a top 1% GI medical oncologist at MD Anderson — the translational side of my computational research, and access most people my age never get. Traveled with the faculty I shadow to the DAVAonco conference (Bermuda), where one MD Anderson faculty is invited each year.",
  },
  {
    title: "Self-funded business · Founder",
    period: "May 2025 – present",
    role: "Photography · reselling · web",
    body: "I run a photography business and have turned reselling, photography, and building websites into $35,000+ in net profit — fully bootstrapped, no outside capital. Entrepreneurial from a young age.",
    stat: "$35,000+ net profit",
  },
];

export const experience = {
  title: "Work experience",
  pullquote:
    "Two startups I co-founded, a 120+ member student org I lead, and the MD Anderson roles where I write the code and run the analysis.",
  photo: {
    key: "experienceCanyon",
    alt: "A wide canyon vista at low sun — layered ridgelines receding into the gorge.",
    caption: "Wide open — the long view I keep coming back to.",
  },
  entries,
};
