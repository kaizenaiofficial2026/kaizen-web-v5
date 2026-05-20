export type IndustryPageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  signals: string[];
  workflows: string[];
  outcomes: string[];
};

export const industries: IndustryPageContent[] = [
  {
    slug: "retail-ecommerce",
    eyebrow: "Retail & E-commerce",
    title: "Always-on AI for stores that need",
    accent: "faster answers",
    subtitle:
      "Help shoppers get product answers, order updates, recommendations, and support across web chat, social DMs, and messaging channels.",
    signals: ["Product FAQs", "Order updates", "Lead capture"],
    workflows: [
      "Answer product, delivery, return, and availability questions",
      "Capture high-intent shoppers and route them to the right offer",
      "Follow up on abandoned enquiries after hours",
    ],
    outcomes: [
      "Shorter response times during campaigns and peak shopping hours",
      "More qualified customer conversations reaching your team",
      "Consistent answers across website and messaging channels",
    ],
  },
  {
    slug: "clinics-healthcare",
    eyebrow: "Clinics & Healthcare",
    title: "Patient response workflows that keep",
    accent: "front desks moving",
    subtitle:
      "Use AI chat and voice agents to answer routine questions, collect patient details, and guide appointment requests with careful escalation.",
    signals: ["Appointments", "FAQs", "Escalation"],
    workflows: [
      "Answer opening hours, service, preparation, and appointment questions",
      "Collect patient enquiry details before handoff",
      "Escalate urgent or sensitive conversations to the clinic team",
    ],
    outcomes: [
      "Fewer missed calls during busy reception hours",
      "More complete context before staff follow up",
      "Clearer routing for routine and urgent patient enquiries",
    ],
  },
  {
    slug: "real-estate",
    eyebrow: "Real Estate",
    title: "Respond to property leads before",
    accent: "they go cold",
    subtitle:
      "AI voice and chat agents that answer property enquiries, qualify buyers and renters, send WhatsApp follow-ups, and help book viewings faster.",
    signals: ["Listings", "Viewings", "Qualification"],
    workflows: [
      "Answer listing, price, location, and availability questions",
      "Qualify buyers, renters, sellers, and landlords",
      "Book viewings or route hot leads to the right agent",
    ],
    outcomes: [
      "Faster replies when property enquiries come in",
      "Better lead context before an agent picks up",
      "More consistent follow-up across channels",
    ],
  },
  {
    slug: "legal-professional-service",
    eyebrow: "Legal & Professional Services",
    title: "Capture serious enquiries without",
    accent: "giving away your time",
    subtitle:
      "AI chat agents that answer approved service questions, collect enquiry details, qualify leads, book consultations, and hand serious matters to your team with full context.",
    signals: ["Chat intake", "Consultations", "Human handoff"],
    workflows: [
      "Collect contact details, service needs, urgency, and short enquiry summaries",
      "Answer approved service FAQs without giving professional advice",
      "Route serious enquiries to the right person with full context",
    ],
    outcomes: [
      "Cleaner intake before the first human response",
      "More consultation-ready enquiries reaching your team",
      "Less admin time spent chasing basic details",
    ],
  },
  {
    slug: "hospitality-food",
    eyebrow: "Hospitality & Food",
    title: "Turn guest enquiries into",
    accent: "bookings faster",
    subtitle:
      "AI voice and chat agents that answer reservation calls, reply to WhatsApp enquiries, handle menu and room questions, send follow-ups, and help your team capture more bookings.",
    signals: ["Reservations", "Menus", "Guest support"],
    workflows: [
      "Answer reservation, menu, room, package, location, and opening-hour questions",
      "Capture table, room, catering, and event enquiries across calls and chat",
      "Send WhatsApp follow-ups and route priority enquiries to staff",
    ],
    outcomes: [
      "Faster replies during service, rush hours, and after hours",
      "More reservation and package enquiries captured",
      "Less staff time spent answering repeated questions",
    ],
  },
  {
    slug: "custom-ai-automations",
    eyebrow: "Custom AI Automations",
    title: "Automate the work your team repeats",
    accent: "every day",
    subtitle:
      "Custom AI systems that connect your tools, process information, reduce manual work, and give your team a dashboard to manage operations.",
    signals: ["Workflows", "Dashboards", "AI operations"],
    workflows: [
      "Automate lead follow-up, CRM updates, reporting, and repeated admin tasks",
      "Support document, finance, accounting, and tax preparation workflows with review queues",
      "Connect approved business rules, staff notifications, dashboards, and human handoff",
    ],
    outcomes: [
      "Less manual admin work across recurring business processes",
      "Clearer visibility into tasks, bottlenecks, documents, and review queues",
      "Faster follow-up while keeping important decisions with your team",
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
