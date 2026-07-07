import type { NavItem } from "@/lib/types";
import { serviceNavItems } from "@/lib/content/services";

const industryNavItems = [
  {
    label: "Healthcare & Clinics",
    href: "/industries/healthcare-clinics",
  },
  {
    label: "Hospitality, Travel & Restaurants",
    href: "/industries/hospitality-travel-restaurants",
  },
  {
    label: "Ecommerce & Retail",
    href: "/industries/ecommerce-retail",
  },
  {
    label: "Education",
    href: "/industries/education",
  },
  {
    label: "Real Estate",
    href: "/industries/real-estate",
  },
  {
    label: "Accounting, Audit & Financial Reporting",
    href: "/industries/accounting-audit-financial-reporting",
  },
];

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    children: serviceNavItems,
  },
  {
    label: "Industries",
    children: industryNavItems,
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
