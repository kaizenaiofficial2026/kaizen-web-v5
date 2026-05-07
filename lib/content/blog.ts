export type BlogPost = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    category: "Lead response",
    title: "Why missed calls quietly become your competitor's pipeline",
    excerpt:
      "How after-hours calls, delayed DMs, and slow follow-up create revenue leaks that an always-on AI agent can close.",
    date: "May 1, 2026",
    readTime: "6 min read",
  },
  {
    category: "Voice agents",
    title: "What makes an AI phone agent feel natural to customers",
    excerpt:
      "The voice, timing, escalation, and business knowledge details that separate a useful voice agent from a frustrating phone tree.",
    date: "April 24, 2026",
    readTime: "7 min read",
  },
  {
    category: "Chat automation",
    title: "Turning website chat and WhatsApp into booked appointments",
    excerpt:
      "A practical flow for answering FAQs, qualifying intent, checking availability, and handing off clean bookings to your team.",
    date: "April 15, 2026",
    readTime: "5 min read",
  },
  {
    category: "Implementation",
    title: "The 10-day path from discovery call to live AI agent",
    excerpt:
      "What happens during discovery, build, testing, launch, and optimisation when Kaizen sets up your first agent.",
    date: "April 3, 2026",
    readTime: "6 min read",
  },
];
