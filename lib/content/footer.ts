import {
  TwitterIcon,
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
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
      { label: "Solutions", href: "/solutions" },
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Demo", href: "/demo" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Customers", href: "/#testimonials" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
      { label: "Status", href: "/status" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "Twitter", href: "https://twitter.com/kaizen_ai", icon: TwitterIcon },
  { label: "GitHub", href: "https://github.com/kaizen-ai", icon: GithubIcon },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/kaizen-ai",
    icon: LinkedinIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@kaizen-ai",
    icon: YoutubeIcon,
  },
];

export const legalLinks = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
];
