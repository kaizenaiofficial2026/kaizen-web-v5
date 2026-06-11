import {
  FacebookIcon,
  GmailIcon,
  InstagramIcon,
  LinkedinIcon,
  MediumIcon,
  WhatsAppIcon,
} from "@/components/icons/social";
import type { ComponentType, SVGProps } from "react";
import type { FooterColumn } from "@/lib/types";

export type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const footerColumns: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Client Portal", href: "#" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Healthcare & Clinics", href: "/industries/healthcare-clinics" },
      { label: "Real Estate", href: "/industries/real-estate" },
      {
        label: "Hospitality, Travel & Restaurants",
        href: "/industries/hospitality-restaurants",
      },
      { label: "Ecommerce & Retail", href: "/industries/ecommerce-retail" },
      { label: "Education", href: "/industries/education" },
      { label: "Recruitment & HR", href: "/industries/recruitment-hr" },
      { label: "Legal Services", href: "/industries/legal-professional-services" },
      {
        label: "Financial Services & Insurance",
        href: "/industries/financial-services-insurance",
      },
      {
        label: "Professional Services & Agencies",
        href: "/industries/professional-services-agencies",
      },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "kaizenai.dev", href: "https://kaizenai.dev" },
      { label: "hello@kaizenai.dev", href: "mailto:hello@kaizenai.dev" },
      { label: "+94 77 029 9569", href: "https://wa.me/94770299569" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/kaizenai-dev/about/?viewAsMember=true",
    icon: LinkedinIcon,
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61574344472130",
    icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kaizenai.dev/",
    icon: InstagramIcon,
  },
  {
    label: "Medium",
    href: "https://medium.com/@kaizenaioffcial2026",
    icon: MediumIcon,
  },
  {
    label: "Gmail",
    href: "mailto:hello@kaizenai.dev",
    icon: GmailIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/94770299569",
    icon: WhatsAppIcon,
  },
];

export const legalLinks = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
];
