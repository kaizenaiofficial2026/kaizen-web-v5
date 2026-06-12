import type { NavItem } from "@/lib/types";

const industryNavItems = [
  {
    label: "Healthcare & Clinics",
    href: "/industries/healthcare-clinics",
    description: "Automate bookings, reminders, and patient communication.",
  },
  {
    label: "Real Estate",
    href: "/industries/real-estate",
    description: "Qualify leads and book viewings without manual follow-up.",
  },
  {
    label: "Hospitality, Travel & Restaurants",
    href: "/industries/hospitality-restaurants",
    description: "Handle reservations, travel enquiries, and guest follow-up automatically.",
  },
  {
    label: "Ecommerce & Retail",
    href: "/industries/ecommerce-retail",
    description: "Answer product questions and recover lost sales 24/7.",
  },
  {
    label: "Education",
    href: "/industries/education",
    description: "Manage admissions enquiries and student support at scale.",
  },
  {
    label: "Recruitment & HR",
    href: "/industries/recruitment-hr",
    description: "Screen candidates and schedule interviews automatically.",
  },
  {
    label: "Legal Services",
    href: "/industries/legal-professional-services",
    description: "Streamline client intake, scheduling, and routine legal admin.",
  },
  {
    label: "Financial Services & Insurance",
    href: "/industries/financial-services-insurance",
    description: "Automate quotes, onboarding, and client communication.",
  },
  {
    label: "Professional Services & Agencies",
    href: "/industries/professional-services-agencies",
    description: "Qualify leads, onboard clients, and automate operations.",
  },
];

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Industries",
    children: industryNavItems,
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
