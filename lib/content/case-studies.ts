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
    company: "Lotus Dental",
    industry: "Dental clinic",
    summary:
      "A Colombo clinic used Kaizen to answer missed calls instantly and turn after-hours patient enquiries into booked appointments.",
    challenge:
      "The front desk could not reliably answer every call during busy clinic hours or after closing.",
    solution:
      "Kaizen handled routine enquiries, checked appointment intent, and alerted the team when a booking needed confirmation.",
    metrics: [
      { value: "+23", label: "extra bookings / month" },
      { value: "0", label: "unanswered routine calls" },
    ],
    quote:
      "Now every call gets answered quickly, and the team can focus on patients already in the clinic.",
    author: "Dr. Amara Silva",
    role: "Clinic Director",
  },
  {
    company: "Mendis Properties",
    industry: "Real estate",
    summary:
      "A property team kept enquiries moving while agents were showing homes, driving between viewings, or with clients.",
    challenge:
      "High-intent calls were arriving at exactly the moments agents could not pick up.",
    solution:
      "The voice agent answered property questions, qualified interest, and booked viewing requests for human follow-up.",
    metrics: [
      { value: "< 5s", label: "average pickup" },
      { value: "24/7", label: "phone coverage" },
    ],
    quote:
      "The agent handles the first conversation while I am with clients, so fewer leads drift away.",
    author: "Ravi Mendis",
    role: "Principal",
  },
  {
    company: "Glow Aesthetics",
    industry: "Aesthetic clinic",
    summary:
      "A clinic captured late-night website and social enquiries in multiple languages without expanding the reception team.",
    challenge:
      "Patients were asking questions after hours, but replies often waited until the next business day.",
    solution:
      "Kaizen answered FAQs, collected lead details, and routed appointment-ready conversations to the team.",
    metrics: [
      { value: "30%", label: "new patients from bot-assisted leads" },
      { value: "3", label: "languages in active use" },
    ],
    quote:
      "The chatbot catches demand at night and gives our team cleaner leads in the morning.",
    author: "Nisha Perera",
    role: "Operations",
  },
];
