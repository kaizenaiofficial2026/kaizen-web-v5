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
    heading: "Product",
    links: [
      { label: "AI Chatbots", href: "/solutions" },
      { label: "AI Voice Agents", href: "/solutions" },
      { label: "Missed-call Recovery", href: "/solutions" },
      { label: "How it Works", href: "/demo" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Results", href: "/#testimonials" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/demo" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/#faq" },
      { label: "Book a Call", href: "/demo" },
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
