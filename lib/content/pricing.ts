import type { Tier } from "@/lib/types";

export const tiers: Tier[] = [
  {
    name: "AI Chatbot",
    description:
      "A trained website and messaging agent for enquiries, lead capture, and booking.",
    price: { monthly: "custom", annual: "custom" },
    cta: "Book a call",
    ctaHref: "/demo",
    seats: "Website + WhatsApp",
    seatsLabel: "channels included",
    storage: "3-5 days",
    storageLabel: "typical setup",
    features: [
      "Business FAQ training",
      "Lead qualification",
      "Calendar or CRM handoff",
    ],
  },
  {
    name: "AI Voice Agent",
    description:
      "A natural phone agent that answers calls, handles enquiries, and books appointments.",
    price: { monthly: "custom", annual: "custom" },
    cta: "Hear the demo",
    ctaHref: "/demo",
    seats: "Phone + transfer",
    seatsLabel: "call flow",
    storage: "7-14 days",
    storageLabel: "typical setup",
    inheritsLabel: "Most requested",
    features: [
      { label: "Inbound call handling", badge: "Voice" },
      "Human escalation",
      "WhatsApp lead alerts",
    ],
    highlighted: true,
    popular: true,
  },
  {
    name: "Full AI Stack",
    description:
      "Chatbot, voice agent, missed-call recovery, and reporting across your channels.",
    price: { monthly: "custom", annual: "custom" },
    cta: "Plan rollout",
    ctaIcon: "mail",
    ctaHref: "mailto:hello@kaizenai.dev?subject=Kaizen%20AI%20rollout",
    seats: "All channels",
    seatsLabel: "coverage",
    storage: "Monthly",
    storageLabel: "optimisation report",
    inheritsLabel: "Chat + voice +",
    features: ["Missed-call recovery", "Dashboard reporting", "Ongoing tuning"],
  },
];
