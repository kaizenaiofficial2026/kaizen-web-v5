import {
  TwitterIcon,
  MediumIcon,
  LinkedinIcon,
  FacebookIcon,
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
      { label: "Ecommerce & Retail", href: "/industries/ecommerce-retail" },
      { label: "Healthcare & Clinics", href: "/industries/healthcare" },
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Education", href: "/industries/education" },
      { label: "Legal", href: "/industries/legal" },
      { label: "Finance", href: "/industries/finance" },
      { label: "Recruitment", href: "/industries/recruitment" },
      { label: "Agencies", href: "/industries/agencies" },
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
  { label: "Twitter", href: "https://x.com/kaizen_ai_dev", icon: TwitterIcon },
  {
    label: "Medium",
    href: "https://medium.com/@kaizenaioffcial2026",
    icon: MediumIcon,
  },
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
];

export const legalLinks = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
];
