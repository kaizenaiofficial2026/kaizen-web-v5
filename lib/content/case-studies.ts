export type CaseStudy = {
  company: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
  role: string;
};

export const caseStudies: CaseStudy[] = [
  {
    company: "Northwind",
    industry: "Operations",
    summary:
      "A distributed operations team replaced manual reporting with adaptive workflows across support, finance, and product.",
    challenge:
      "Weekly reviews depended on four disconnected tools and a contractor stitching data together by hand.",
    solution:
      "Kaizen connected the operating stack, summarized open work, and routed follow-ups to the right owners.",
    metrics: [
      { value: "3x", label: "weekly throughput" },
      { value: "42%", label: "fewer status meetings" },
    ],
    quote:
      "Kaizen gave us one operating picture and took the manual chase work off the team's plate.",
    author: "Maya Okafor",
    role: "Head of Operations",
  },
  {
    company: "Lumen Labs",
    industry: "Engineering",
    summary:
      "A product engineering org used Kaizen to keep product feedback, issues, and launch decisions in sync.",
    challenge:
      "Launch blockers were scattered across docs, issue comments, and customer requests.",
    solution:
      "Kaizen summarized feedback, detected repeated blockers, and created review-ready launch briefs.",
    metrics: [
      { value: "31%", label: "faster release cycles" },
      { value: "18h", label: "saved each week" },
    ],
    quote:
      "It started feeling like the system knew our delivery rhythm better than our status docs did.",
    author: "Daniel Reyes",
    role: "VP Engineering",
  },
  {
    company: "Helix",
    industry: "Security",
    summary:
      "A regulated platform team rolled out AI workflows after Kaizen passed review with audit and access controls in place.",
    challenge:
      "Security requirements kept AI pilots stuck in review, with no clear owner trail or data boundary.",
    solution:
      "Kaizen provided workspace controls, workflow logs, and a narrow rollout path for production teams.",
    metrics: [
      { value: "9 days", label: "to production" },
      { value: "100%", label: "audited workflows" },
    ],
    quote:
      "The security review moved quickly because the control model was visible from day one.",
    author: "Priya Shah",
    role: "CTO",
  },
];
