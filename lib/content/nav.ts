import type { NavItem } from "@/lib/types";

export const industryNavItems = [
  {
    label: "Ecommerce & Retail",
    href: "/industries/ecommerce-retail",
    description: "Answer product questions and recover lost sales 24/7.",
  },
  {
    label: "Healthcare & Clinics",
    href: "/industries/healthcare",
    description: "Automate bookings, reminders, and patient communication.",
  },
  {
    label: "Real Estate",
    href: "/industries/real-estate",
    description: "Qualify leads and book viewings without manual follow-up.",
  },
  {
    label: "Hospitality & Restaurants",
    href: "/industries/hospitality",
    description: "Handle reservations, menus, and event enquiries automatically.",
  },
  {
    label: "Education",
    href: "/industries/education",
    description: "Manage admissions enquiries and student support at scale.",
  },
  {
    label: "Legal & Professional Services",
    href: "/industries/legal",
    description: "Streamline client intake, scheduling, and follow-ups.",
  },
  {
    label: "Financial Services & Insurance",
    href: "/industries/finance",
    description: "Automate quotes, onboarding, and client communication.",
  },
  {
    label: "Recruitment & HR",
    href: "/industries/recruitment",
    description: "Screen candidates and schedule interviews automatically.",
  },
  {
    label: "Professional Services & Agencies",
    href: "/industries/agencies",
    description: "Qualify leads, onboard clients, and automate operations.",
  },
];

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Industries",
    href: "/industries",
    children: industryNavItems,
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
