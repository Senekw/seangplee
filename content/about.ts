// 06 — About ("Who's building this").

export const about = {
  title: "Who's building this",

  prose: [
    "I'm a rising junior at Cinco Ranch High School, focused on translational oncology and computational biology. I started independent cancer research at 14 and have since become first author on two computational-oncology manuscripts under review (spanning 1,000+ tumors), the youngest presenter in the Cholangiocarcinoma Foundation conference's history, and co-founder of Sutura Genomics — a graph-deep-learning tool for aligning torn tissue in spatial transcriptomics — accepted to YC Startup School.",
    "At 14 I wanted to do real cancer research, and every door assumed I needed a degree first. I figured out the actual gate wasn't credentials or age — it was a well-aimed ask. Instead of generic “can I help?” emails, I read researchers' actual papers and wrote each one a short, specific note proposing a concrete thing I could contribute. That got me a real role at MD Anderson, where I became first author. Then I productized the hack: I founded the Cancer Research Society and taught 120+ students the same cold-email playbook — 25+ have since placed in labs at Stanford, Yale, MIT, MD Anderson, and Google. The system was never locked; it was just waiting for someone to ask well.",
    "My work spans biliary tract cancer, hepatocellular carcinoma, and NSCLC radiomics, in direct collaboration with an associate professor at MD Anderson Cancer Center, researchers at Baylor College of Medicine, and the University of Houston. The work is real: I write the code, build the models, and run the analysis on patient genomic data — still in high school, still building.",
    "I believe the gap between data and clinical impact should be smaller than it is. Everything I build is pointed at that gap.",
  ],

  photos: [
    {
      key: "approachLight",
      alt: "A single sprig of white flowers catching a shaft of low light against a dark surface.",
      caption: "Found light — attention is the whole job.",
      feature: true,
    },
    {
      key: "approachConference",
      alt: "Sean working on his analysis on a laptop in a conference hall.",
      caption: "Between sessions — running the analysis on-site.",
      feature: false,
    },
  ],

  tags: ["cancer genomics", "bioinformatics", "tumor immunology", "survival modeling"],
} as const;
