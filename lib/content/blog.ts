export type BlogPost = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    category: "Workflow design",
    title: "How adaptive workflows reduce the invisible cost of coordination",
    excerpt:
      "A practical look at where manual follow-ups hide inside growing teams and how to remove them without creating a new process tax.",
    date: "May 1, 2026",
    readTime: "6 min read",
  },
  {
    category: "AI operations",
    title: "The operating layer your AI tools need before they scale",
    excerpt:
      "AI pilots become production systems when context, approvals, logs, and outcomes are designed into the workflow from the start.",
    date: "April 24, 2026",
    readTime: "8 min read",
  },
  {
    category: "Productivity",
    title: "Why teams should measure saved decisions, not just saved time",
    excerpt:
      "Time savings matter, but compounding output comes from better handoffs, clearer accountability, and fewer stalled decisions.",
    date: "April 15, 2026",
    readTime: "5 min read",
  },
  {
    category: "Security",
    title: "A security-first checklist for bringing AI agents into real work",
    excerpt:
      "The controls, review paths, and audit habits that make AI automation easier to approve in high-trust environments.",
    date: "April 3, 2026",
    readTime: "7 min read",
  },
];
