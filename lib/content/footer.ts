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
import { services } from "@/lib/content/services";

export type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const footerColumns: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Industries", href: "/industries" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: services.map((service) => ({
      label: service.navLabel ?? service.title,
      href: service.href,
    })),
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
