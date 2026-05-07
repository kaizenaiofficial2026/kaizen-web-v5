import type { Tier } from "@/lib/types";

export const tiers: Tier[] = [
  {
    name: "Starter",
    description: "Core AI tools for everyday work. Single workspace.",
    price: { monthly: 0, annual: 0 },
    cta: "Choose this plan",
    ctaHref: "#cta",
    seats: "2 free",
    storage: "250MB",
    features: ["Core AI tools", "Community support", "Single workspace"],
  },
  {
    name: "Pro",
    description: "Adaptive workflows, realtime agents, and team collaboration.",
    price: { monthly: 29, annual: 23 },
    cta: "Choose this plan",
    ctaHref: "#cta",
    seats: "5 free",
    storage: "10GB",
    inheritsLabel: "Starter +",
    features: [
      { label: "Adaptive workflows", badge: "AI-based" },
      "Realtime collaboration",
      "Priority support",
    ],
    highlighted: true,
    popular: true,
  },
  {
    name: "Enterprise",
    description: "SSO, dedicated infrastructure, and custom agents.",
    price: { monthly: "custom", annual: "custom" },
    cta: "Contact us",
    ctaIcon: "mail",
    ctaHref: "mailto:sales@kaizen.ai?subject=Enterprise%20inquiry",
    seats: "Unlimited",
    storage: "1TB+",
    inheritsLabel: "Starter & Pro +",
    features: ["SSO & SCIM", "Dedicated infra", "24/7 support"],
  },
];
