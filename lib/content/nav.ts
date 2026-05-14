import type { NavItem } from "@/lib/types";

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    children: [
      { label: "Chatbots", href: "/solutions/chatbots" },
      { label: "Voice Agents", href: "/solutions/voice-agents" },
      {
        label: "Custom AI Automations",
        href: "/solutions/custom-ai-automations",
      },
    ],
  },
  { label: "Demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Industries",
    children: [
      { label: "Retail & E-commerce", href: "/industries/retail-ecommerce" },
      { label: "Clinics & Healthcare", href: "/industries/clinics-healthcare" },
      { label: "RealEstate", href: "/industries/real-estate" },
      {
        label: "Legal & Proffessional Service",
        href: "/industries/legal-professional-service",
      },
      { label: "Hospitality & Food", href: "/industries/hospitality-food" },
    ],
  },
  { label: "Blog", href: "/blog" },
];
