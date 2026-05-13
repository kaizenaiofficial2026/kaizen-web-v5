import type { NavItem } from "@/lib/types";

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Chatbots", href: "/solutions/chatbots" },
      { label: "Voice Agents", href: "/solutions/voice-agents" },
    ],
  },
  { label: "Demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
];
