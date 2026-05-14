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
    eyebrow: "RealEstate",
    title: "AI follow-up for property teams that need",
    accent: "speed to lead",
    subtitle:
      "Respond to buyer, seller, tenant, and landlord enquiries quickly, qualify intent, and keep warm leads moving toward viewings.",
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
    eyebrow: "Legal & Proffessional Service",
    title: "AI intake for firms that need",
    accent: "cleaner enquiries",
    subtitle:
      "Capture service enquiries, collect key details, answer routine questions, and route prospects to the right professional with context.",
    signals: ["Intake", "Qualification", "Routing"],
    workflows: [
      "Collect matter type, urgency, contact details, and preferred timing",
      "Answer service, process, and consultation questions",
      "Route qualified enquiries to the right person or team",
    ],
    outcomes: [
      "Cleaner intake before the first human response",
      "Less admin time spent chasing missing details",
      "More consistent handling of new business enquiries",
    ],
  },
  {
    slug: "hospitality-food",
    eyebrow: "Hospitality & Food",
    title: "Guest response automation for teams that need",
    accent: "coverage at rush time",
    subtitle:
      "Answer reservation, menu, catering, location, and availability questions while your team focuses on service.",
    signals: ["Bookings", "Menus", "Guest support"],
    workflows: [
      "Answer menu, hours, location, delivery, and event questions",
      "Capture booking or catering enquiries",
      "Route urgent guest issues to the right team member",
    ],
    outcomes: [
      "Faster guest replies during service hours",
      "More booking and catering enquiries captured after hours",
      "Consistent guest information across phone, chat, and social",
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
