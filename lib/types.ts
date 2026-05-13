import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type Feature = string | { label: string; badge: string };

export type FeatureCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  span?: "wide" | "default";
};

export type Tier = {
  name: string;
  description: string;
  price: { monthly: number | "custom"; annual: number | "custom" };
  cta: string;
  ctaIcon?: "mail";
  ctaHref: string;
  seats: string;
  seatsLabel?: string;
  storage: string;
  storageLabel?: string;
  inheritsLabel?: string;
  features: Feature[];
  highlighted?: boolean;
  popular?: boolean;
};

export type FAQItem = {
  q: string;
  a: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  title: string;
  company: string;
  initials: string;
};

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};
