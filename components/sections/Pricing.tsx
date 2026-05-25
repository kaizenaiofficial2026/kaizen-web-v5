"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Database,
  Gauge,
  Headphones,
  MessagesSquare,
  PanelsTopLeft,
  Plus,
  Send,
  Settings,
  ShieldCheck,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/primitives/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { siteConfig } from "@/lib/content/site";
import { cn } from "@/lib/utils";

export type PricingType = "chat" | "voice";

type ChatPricingPlan = {
  name: string;
  badge: string;
  commitment: string;
  price: string;
  billingText: string;
  supportText: string;
  cta: string;
  popular?: boolean;
  premium?: boolean;
};

type FeatureGroup = {
  title: string;
  icon: LucideIcon;
  features: string[];
};

type ComparisonRow = {
  label: string;
  essential: string;
  growth: string;
  elite: string;
};

type ChatFaq = {
  question: string;
  answer: string;
};

type VoicePricingPlan = {
  name: string;
  badge: string;
  perMinuteRate: number | null;
  perMinuteLabel: string;
  monthlyRetainer: string;
  setupFee: string;
  includedUsage: string;
  additionalUsageRate: string;
  cta: string;
  popular?: boolean;
  premium?: boolean;
};

type VoiceComparisonRow = {
  label: string;
  starter: string;
  growth: string;
  scale: string;
  enterprise: string;
};

const chatPricingPlans: ChatPricingPlan[] = [
  {
    name: "Essential AI Agent",
    badge: "MONTHLY",
    commitment: "1 Month",
    price: "LKR 36,000",
    billingText: "Billed monthly",
    supportText: "Flexible month-to-month plan",
    cta: "Start with Essential",
  },
  {
    name: "Growth AI Agent",
    badge: "MOST POPULAR",
    commitment: "3-Month Package",
    price: "LKR 33,000",
    billingText: "Billed LKR 99,000 / 3 months",
    supportText: "Save LKR 9,000 vs monthly",
    cta: "Choose Growth",
    popular: true,
  },
  {
    name: "Elite AI Agent",
    badge: "BEST VALUE",
    commitment: "6-Month Package",
    price: "LKR 30,000",
    billingText: "Billed LKR 180,000 / 6 months",
    supportText: "Save LKR 36,000 vs monthly",
    cta: "Choose Elite",
    premium: true,
  },
];

const chatFeatureGroups: FeatureGroup[] = [
  {
    title: "Channels",
    icon: MessagesSquare,
    features: [
      "Instagram DM AI replies instantly 24/7",
      "Facebook Messenger full automation",
      "WhatsApp Business complete AI agent",
      "Website chatbot to capture every visitor",
    ],
  },
  {
    title: "Dashboard & CRM",
    icon: PanelsTopLeft,
    features: [
      "Custom Brand Dashboard to add and update products anytime",
      "Full chat transcript per customer and per channel",
      "Sales pipeline from first message to purchase",
      "Lead capture with name, contact, interest, and next action",
      "Vibe check, chat summary, and customer intent overview",
      "AI order capture: product, ID, quantity, price, and payment auto-logged in a structured card",
      "Human verification alert: blinking flag holds every order until client confirms",
      "Vibe score from 0-100% per chat: Cold, Warm-Cold, Warm, Hot intent indicator",
      "Live order board: update status from Pending to Dispatched to Delivered with revenue totals",
      "Full customer directory: history, orders, lifetime spend, vibe score, and custom tags such as VIP or Wholesale",
      "Repeat buyer identification: returning customers flagged automatically",
      "Direct CRM sync: Salesforce, HubSpot, Zoho, and more in real time with zero manual entry",
    ],
  },
  {
    title: "Product AI",
    icon: BrainCircuit,
    features: [
      "Custom Product Brain trained on the client's catalogue, services, specs, and pricing",
      "Unlimited AI usage with no token caps",
      "Human-like responses with natural sales conversations",
      "Sends and receives images, links, and videos",
      "Smart product and service recommendations by budget, need, and preference",
      "Handles FAQs on shipping, pricing, availability, policies, and more",
    ],
  },
  {
    title: "Inventory & Knowledge Base",
    icon: Database,
    features: [
      "Full catalogue management: images, prices, IDs, and tags; AI learns every entry instantly",
      "Stock status control: AI stops recommending out-of-stock items automatically",
      "Product categories and collections: AI guides customers to the right section",
      "Promotional pricing: add offer prices and AI communicates deals across all channels",
      "Bulk CSV upload or manual entry: add one product or hundreds at once",
    ],
  },
  {
    title: "Operations",
    icon: Gauge,
    features: [
      "Works 24/7/365 across all platforms non-stop",
      "Handles up to around 1,000 simultaneous chats without delays or drop in quality",
      "Seamless human takeover: jump into any live chat directly from WhatsApp at any time",
      "Human escalation with full conversation context",
      "Customer memory so the AI picks up where the chat left off",
      "Monthly performance report",
    ],
  },
  {
    title: "Sales Outreach",
    icon: Send,
    features: [
      "300 outbound messages per month",
      "Abandoned interest follow-up automation",
      "Missed enquiry recovery for customers who went cold",
      "New arrival and promotion broadcast support",
      "Follow-up message tracking inside the dashboard",
    ],
  },
  {
    title: "Support & Control",
    icon: Headphones,
    features: [
      "24/7 direct support from the Kaizen AI team",
      "Business controls product knowledge, services, policies, and offers",
      "Private customer and business data remains under client control",
      "Built to help turn enquiries into confirmed sales, across any industry",
      "Auto support ticket: unresolved complaints flagged instantly for human follow-up",
    ],
  },
];

const chatComparisonRows: ComparisonRow[] = [
  {
    label: "Monthly rate",
    essential: "LKR 36,000 / month",
    growth: "LKR 33,000 / month",
    elite: "LKR 30,000 / month",
  },
  {
    label: "Commitment",
    essential: "1 month",
    growth: "3 months",
    elite: "6 months",
  },
  {
    label: "Billing",
    essential: "Billed monthly",
    growth: "Billed LKR 99,000 / 3 months",
    elite: "Billed LKR 180,000 / 6 months",
  },
  {
    label: "Savings",
    essential: "Flexible month-to-month plan",
    growth: "Save LKR 9,000 vs monthly",
    elite: "Save LKR 36,000 vs monthly",
  },
  {
    label: "Supported channels",
    essential: "Included",
    growth: "Included",
    elite: "Included",
  },
  {
    label: "Dashboard & CRM",
    essential: "Included",
    growth: "Included",
    elite: "Included",
  },
  {
    label: "Product AI",
    essential: "Included",
    growth: "Included",
    elite: "Included",
  },
  {
    label: "Inventory & Knowledge Base",
    essential: "Included",
    growth: "Included",
    elite: "Included",
  },
  {
    label: "Operations",
    essential: "Included",
    growth: "Included",
    elite: "Included",
  },
  {
    label: "Sales Outreach",
    essential: "Included",
    growth: "Included",
    elite: "Included",
  },
  {
    label: "Support & Control",
    essential: "Included",
    growth: "Included",
    elite: "Included",
  },
];

const chatFaqs: ChatFaq[] = [
  {
    question: "Are the features different between packages?",
    answer:
      "No. Every package includes the same complete feature set. The package only changes the commitment period, monthly rate, and total billing cycle.",
  },
  {
    question: "What channels are included?",
    answer:
      "Instagram DM, Facebook Messenger, WhatsApp Business, and a website chatbot are included.",
  },
  {
    question: "Is AI usage limited?",
    answer: "No. The package includes unlimited AI usage with no token caps.",
  },
  {
    question: "Can a human take over a conversation?",
    answer:
      "Yes. Your team can jump into live chats, and the AI can escalate conversations with full context.",
  },
  {
    question: "Are integrations included?",
    answer:
      "CRM sync and operational integrations can be connected depending on the client's current tools. Final onboarding scope is confirmed after reviewing the client's channels and product catalogue.",
  },
];

const voicePricingPlans: VoicePricingPlan[] = [
  {
    badge: "STARTER",
    name: "VA Starter",
    perMinuteRate: 0.184,
    perMinuteLabel: "$0.184 / min",
    monthlyRetainer: "$249 / mo",
    setupFee: "$349 one-time setup",
    includedUsage: "1,350 mins/month · ~45 mins/day",
    additionalUsageRate: "Additional minutes billed at $0.184 / min",
    cta: "Start with Starter",
  },
  {
    badge: "MOST POPULAR",
    name: "VA Growth",
    perMinuteRate: 0.148,
    perMinuteLabel: "$0.148 / min",
    monthlyRetainer: "$399 / mo",
    setupFee: "$549 one-time setup",
    includedUsage: "2,700 mins/month · ~90 mins/day",
    additionalUsageRate: "Additional minutes billed at $0.148 / min",
    cta: "Choose Growth",
    popular: true,
  },
  {
    badge: "BEST VALUE",
    name: "VA Scale",
    perMinuteRate: 0.129,
    perMinuteLabel: "$0.129 / min",
    monthlyRetainer: "$699 / mo",
    setupFee: "$989 one-time setup",
    includedUsage: "5,400 mins/month · ~3 hrs/day",
    additionalUsageRate: "Additional minutes billed at $0.129 / min",
    cta: "Choose Scale",
    premium: true,
  },
  {
    badge: "ENTERPRISE",
    name: "Enterprise Voice",
    perMinuteRate: null,
    perMinuteLabel: "Custom",
    monthlyRetainer: "Custom",
    setupFee: "Custom setup",
    includedUsage: "Custom usage, workflows, and integrations",
    additionalUsageRate: "Custom per-minute rate",
    cta: "Talk to Sales",
  },
];

const voiceFeatureGroups: FeatureGroup[] = [
  {
    title: "Call Handling",
    icon: Headphones,
    features: [
      "Answers inbound calls instantly 24/7 with no hold time",
      "Natural human-like voice conversations powered by AI",
      "Full word-for-word call transcript logged per caller",
      "Plain English call summary with outcome badge: Booked, FAQ Answered, or Escalated",
      "Vibe score from 0-100% per call: Cold, Warm-Cold, Warm, Hot intent indicator",
      "Human escalation with full live call context handed over",
    ],
  },
  {
    title: "Appointment Booking",
    icon: Clock3,
    features: [
      "Books appointments autonomously during the call with no human input or confirmation needed",
      "Checks live Google Calendar availability and secures the slot on the spot",
      "Google Calendar integration: all bookings sync instantly in real time",
      "Appointment details captured and logged automatically under the Bookings tab",
      "Reschedule and cancellation handling via voice or WhatsApp follow-up",
    ],
  },
  {
    title: "Post-Call Follow-Up",
    icon: Send,
    features: [
      "Auto WhatsApp confirmation sent after every booking with appointment date, time, service, and price",
      "Caller replies visible in dashboard alongside the original call transcript",
      "WhatsApp delivery status shown: Sent, Delivered, Read",
      "Missed call recovery: AI follows up automatically via WhatsApp",
    ],
  },
  {
    title: "Dashboard & CRM",
    icon: PanelsTopLeft,
    features: [
      "Every call logged with caller number, date, duration, and outcome",
      "Full call transcript and WhatsApp follow-up visible in one place per caller",
      "Dedicated Bookings tab with appointment details: name, contact, date, time, slot, and service",
      "Live appointment board to view, manage, and update bookings by date or status",
      "Full customer directory with caller contact, call history, past bookings, and upcoming bookings",
      "Repeat caller identification: returning customers flagged automatically",
      "Direct CRM sync with Salesforce, HubSpot, Zoho, and more with zero manual entry",
    ],
  },
  {
    title: "Knowledge & Intelligence",
    icon: BrainCircuit,
    features: [
      "Custom Voice Brain trained on services, FAQs, pricing, and policies",
      "Handles FAQs on hours, pricing, availability, location, and more",
      "Smart service recommendations based on caller needs and budget",
      "Update knowledge base anytime: AI learns every change instantly",
    ],
  },
  {
    title: "Operations",
    icon: Gauge,
    features: [
      "Works 24/7/365: never misses a call and never puts a customer on hold",
      "Handles up to around 1,000 simultaneous calls without dropping quality",
      "Customer memory: AI picks up context from previous calls",
      "Monthly call volume and performance report included",
    ],
  },
  {
    title: "Reporting & Analytics",
    icon: TrendingUp,
    features: [
      "Total calls answered today, this week, and this month",
      "Average call duration and outcome breakdown per period",
      "AI usage minutes tracked daily with limit alerts: Healthy, Approaching, Near Limit",
      "Conversion rate from call to appointment",
      "Peak call hour heatmap to show when customers call most",
      "Full analytics, call logs, and appointment data sync into Salesforce, HubSpot, Zoho, and other CRMs",
    ],
  },
  {
    title: "Support & Control",
    icon: ShieldCheck,
    features: [
      "24/7 direct support from the Kaizen AI team",
      "Business controls all voice scripts, policies, and service knowledge",
      "Private caller data remains fully under client control",
      "Auto support ticket: unresolved calls flagged instantly for human follow-up",
      "Built to turn inbound calls into confirmed appointments or resolved enquiries",
    ],
  },
  {
    title: "Add-On Options",
    icon: Settings,
    features: [
      "Additional call minutes available at your package per-minute rate",
      "Multi-location support: separate calendars and scripts per branch",
      "Custom voice persona: choose tone, name, and language of your AI agent",
      "Multi-language support available on request",
      "Outbound VA follow-up calls: Coming soon",
    ],
  },
];

const voiceComparisonRows: VoiceComparisonRow[] = [
  {
    label: "Monthly retainer",
    starter: "$249 / mo",
    growth: "$399 / mo",
    scale: "$699 / mo",
    enterprise: "Custom",
  },
  {
    label: "Setup fee",
    starter: "$349 one-time",
    growth: "$549 one-time",
    scale: "$989 one-time",
    enterprise: "Custom",
  },
  {
    label: "Included minutes",
    starter: "1,350 mins/month",
    growth: "2,700 mins/month",
    scale: "5,400 mins/month",
    enterprise: "Custom",
  },
  {
    label: "Approx. daily usage",
    starter: "~45 mins/day",
    growth: "~90 mins/day",
    scale: "~3 hrs/day",
    enterprise: "Custom",
  },
  {
    label: "Per-minute rate",
    starter: "$0.184 / min",
    growth: "$0.148 / min",
    scale: "$0.129 / min",
    enterprise: "Custom",
  },
  {
    label: "Additional minutes",
    starter: "$0.184 / min",
    growth: "$0.148 / min",
    scale: "$0.129 / min",
    enterprise: "Custom",
  },
  {
    label: "Call Handling",
    starter: "Included",
    growth: "Included",
    scale: "Included",
    enterprise: "Included",
  },
  {
    label: "Appointment Booking",
    starter: "Included",
    growth: "Included",
    scale: "Included",
    enterprise: "Included",
  },
  {
    label: "Post-Call Follow-Up",
    starter: "Included",
    growth: "Included",
    scale: "Included",
    enterprise: "Included",
  },
  {
    label: "Dashboard & CRM",
    starter: "Included",
    growth: "Included",
    scale: "Included",
    enterprise: "Included",
  },
  {
    label: "Knowledge & Intelligence",
    starter: "Included",
    growth: "Included",
    scale: "Included",
    enterprise: "Included",
  },
  {
    label: "Operations",
    starter: "Included",
    growth: "Included",
    scale: "Included",
    enterprise: "Included",
  },
  {
    label: "Reporting & Analytics",
    starter: "Included",
    growth: "Included",
    scale: "Included",
    enterprise: "Included",
  },
  {
    label: "Support & Control",
    starter: "Included",
    growth: "Included",
    scale: "Included",
    enterprise: "Included",
  },
  {
    label: "Add-On Options",
    starter: "Available",
    growth: "Available",
    scale: "Available",
    enterprise: "Custom",
  },
  {
    label: "Outbound VA follow-up calls",
    starter: "Coming soon",
    growth: "Coming soon",
    scale: "Coming soon",
    enterprise: "Custom",
  },
];

const voiceFaqs: ChatFaq[] = [
  {
    question: "Are the features different between packages?",
    answer:
      "No. Every package includes the same complete feature set. The package only changes call volume, monthly retainer, setup fee, and per-minute rate.",
  },
  {
    question: "What does the setup fee cover?",
    answer:
      "The one-time setup fee covers onboarding, voice configuration, calendar integration, and launch.",
  },
  {
    question: "What happens if I exceed my included minutes?",
    answer:
      "Additional minutes beyond the monthly inclusion are billed at your package per-minute rate.",
  },
  {
    question: "Can the voice agent book appointments?",
    answer:
      "Yes. The voice agent can check live Google Calendar availability, secure the slot during the call, and sync bookings instantly.",
  },
  {
    question: "Does the system send WhatsApp confirmations?",
    answer:
      "Yes. After every booking, the system can send an automatic WhatsApp confirmation with the appointment date, time, service, and price.",
  },
  {
    question: "Can a human take over?",
    answer:
      "Yes. The AI can escalate calls with full live call context so your team understands what happened before taking over.",
  },
  {
    question: "Is Enterprise Voice different?",
    answer:
      "Enterprise Voice is for custom usage, workflows, integrations, multi-location needs, or higher call volumes that require a tailored package.",
  },
  {
    question: "Can the voice agent make outbound follow-up calls?",
    answer:
      "Outbound VA follow-up calls are planned as a coming soon feature. The current voice agent package focuses on answering inbound calls, booking appointments, missed call recovery, WhatsApp confirmations, and call follow-up tracking.",
  },
];

function PriceText({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return <span className={className}>{value}</span>;
}

function ChatHero() {
  return (
    <FadeUp>
      <section
        id="chat-agent-pricing"
        className="mx-auto max-w-4xl scroll-mt-28 text-center"
      >
        <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
          Chat Agent Pricing
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          A complete AI sales chat agent for Instagram, Facebook Messenger,
          WhatsApp Business, and website enquiries. Choose the commitment that
          fits your growth plan.
        </p>
        <p className="mt-4 text-sm font-semibold text-primary">
          Same complete feature set in every package.
        </p>
      </section>
    </FadeUp>
  );
}

function ChatPricingCard({ plan }: { plan: ChatPricingPlan }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 backdrop-blur-md transition-colors",
        plan.popular
          ? "border-primary/70 gold-card-bright shadow-[0_0_90px_-38px_color-mix(in_oklab,var(--primary)_85%,transparent)]"
          : plan.premium
            ? "border-primary/35 bg-card/72 shadow-[0_24px_80px_-56px_color-mix(in_oklab,var(--primary)_70%,transparent)] hover:border-primary/55"
            : "border-border bg-card/62 hover:border-primary/45 hover:bg-card/80",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px",
          plan.popular
            ? "bg-primary"
            : "bg-gradient-to-r from-transparent via-primary/35 to-transparent",
        )}
      />

      <div className="min-w-0">
        <Badge
          variant={plan.popular ? "popular" : "default"}
          className="uppercase"
        >
          {plan.popular && <Star className="h-3.5 w-3.5 fill-current" />}
          {plan.badge}
        </Badge>
        <h3 className="mt-4 text-2xl font-semibold text-foreground">
          {plan.name}
        </h3>
        <p className="mt-2 text-sm font-semibold text-primary">
          {plan.commitment}
        </p>
      </div>

      <div className="mt-6 flex-1">
        <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
          <PriceText
            value={plan.price}
            className={cn(
              "text-4xl font-semibold leading-none sm:text-[2.65rem]",
              plan.popular ? "text-primary" : "text-foreground",
            )}
          />
          <span className="pb-1 text-base font-semibold text-primary">
            / month
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {plan.billingText}
        </p>
        <p className="text-sm font-semibold text-foreground">
          {plan.supportText}
        </p>
      </div>

      <Button
        asChild
        size="lg"
        variant={plan.popular ? "default" : "outline"}
        className="mt-5 w-full rounded-xl"
      >
        <Link href="/book-demo">
          {plan.cta}
          <ArrowRight aria-hidden />
        </Link>
      </Button>
    </motion.article>
  );
}

function ChatPricingPlansSection() {
  return (
    <FadeUp delay={0.08}>
      <section
        className="mt-12 scroll-mt-28 sm:mt-14 lg:mt-16"
        aria-label="Chat agent packages"
      >
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {chatPricingPlans.map((plan) => (
            <ChatPricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-border bg-card/55 px-5 py-4 text-sm leading-6 text-muted-foreground backdrop-blur-md">
          <p>
            Prices above are monthly retainer rates. Final onboarding scope,
            integrations, and launch timeline can be confirmed after reviewing
            the client&apos;s current channels and product catalogue.
          </p>
        </div>
      </section>
    </FadeUp>
  );
}

function FeatureGroupCard({ group }: { group: FeatureGroup }) {
  const Icon = group.icon;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="rounded-2xl border border-border bg-card/58 p-5 backdrop-blur-md transition-colors hover:border-primary/45 hover:bg-card/78 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary"
        >
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="pt-2 text-xl font-semibold text-foreground">
          {group.title}
        </h3>
      </div>
      <ul className="mt-5 space-y-3 text-sm leading-6">
        {group.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-foreground/82">
            <CheckCircle2
              className="mt-1 h-4 w-4 shrink-0 text-primary"
              aria-hidden
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function ChatEveryPackageIncludes() {
  return (
    <FadeUp delay={0.1}>
      <section
        id="every-package-includes"
        className="mt-24 scroll-mt-28"
        aria-labelledby="every-package-title"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="every-package-title"
            className="text-3xl font-semibold text-foreground sm:text-4xl"
          >
            Every package includes
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            All plans include the full AI sales chat agent. You are not choosing
            fewer features. You are only choosing the commitment period that
            fits your business.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {chatFeatureGroups.map((group) => (
            <FeatureGroupCard key={group.title} group={group} />
          ))}
        </div>
      </section>
    </FadeUp>
  );
}

function IncludedValue({ value }: { value: string }) {
  if (value !== "Included" && value !== "Available") {
    return <span>{value}</span>;
  }

  return (
    <span className="inline-flex items-center gap-2 font-semibold text-foreground">
      <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
      {value}
    </span>
  );
}

function ChatComparisonSection() {
  return (
    <FadeUp delay={0.12}>
      <section className="mt-24" aria-labelledby="comparison-title">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="comparison-title"
            className="text-3xl font-semibold text-foreground sm:text-4xl"
          >
            Compare packages
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Every package includes the same complete feature set. The difference
            is the commitment period, monthly rate, and billing cycle.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card/58 backdrop-blur-md">
          <table className="min-w-[860px] w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Chat agent pricing comparison for Essential, Growth, and Elite
              packages.
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th
                  scope="col"
                  className="w-[28%] px-5 py-5 text-xs font-semibold uppercase text-muted-foreground"
                >
                  Feature / Detail
                </th>
                <th
                  scope="col"
                  className="px-5 py-5 text-base font-semibold text-foreground"
                >
                  Essential
                </th>
                <th
                  scope="col"
                  className="bg-primary/8 px-5 py-5 text-base font-semibold text-primary"
                >
                  Growth
                </th>
                <th
                  scope="col"
                  className="px-5 py-5 text-base font-semibold text-foreground"
                >
                  Elite
                </th>
              </tr>
            </thead>
            <tbody>
              {chatComparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-border/80 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 font-semibold text-foreground"
                  >
                    {row.label}
                  </th>
                  <td className="px-5 py-4 leading-6 text-muted-foreground">
                    <IncludedValue value={row.essential} />
                  </td>
                  <td className="bg-primary/8 px-5 py-4 leading-6 text-muted-foreground">
                    <IncludedValue value={row.growth} />
                  </td>
                  <td className="px-5 py-4 leading-6 text-muted-foreground">
                    <IncludedValue value={row.elite} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </FadeUp>
  );
}

function ChatValueExplanation() {
  return (
    <FadeUp delay={0.14}>
      <section className="mt-24 grid gap-6 rounded-2xl border border-primary/25 bg-card/65 p-6 shadow-[0_24px_90px_-58px_color-mix(in_oklab,var(--primary)_75%,transparent)] backdrop-blur-md sm:p-8 lg:grid-cols-[0.7fr_1fr] lg:items-center">
        <div>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Why every package includes everything
          </h2>
        </div>
        <p className="text-base leading-8 text-muted-foreground">
          Most agencies hide key features behind higher tiers. Kaizen AI keeps
          the full system available in every package because the AI agent only
          performs properly when channels, product knowledge, CRM, order
          capture, follow-ups, and human takeover work together.
        </p>
      </section>
    </FadeUp>
  );
}

function ChatFaqSection() {
  return (
    <FadeUp delay={0.16}>
      <section className="mt-24" aria-labelledby="chat-faq-title">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2
              id="chat-faq-title"
              className="text-3xl font-semibold text-foreground sm:text-4xl"
            >
              Clear answers before you book a demo
            </h2>
          </div>

          <div className="space-y-3">
            {chatFaqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border bg-card/58 px-5 backdrop-blur-md transition-colors open:border-primary/35 open:bg-card/78"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <Plus
                    className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="border-t border-border pb-5 pt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}

function ChatFinalCta() {
  return (
    <FadeUp delay={0.18}>
      <section className="mt-24 overflow-hidden rounded-2xl border border-primary/25 bg-card/70 p-6 shadow-[0_24px_90px_-52px_color-mix(in_oklab,var(--primary)_80%,transparent)] backdrop-blur-md sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Ready to turn your messages into confirmed sales?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Show us your current channels and catalogue. We&apos;ll map the best
            setup, confirm the launch scope, and help you choose the right
            commitment plan.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            kaizenai.dev · {siteConfig.salesEmail} · +94 77 029 9569
          </p>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
          <Button asChild size="xl" className="rounded-xl">
            <Link href="/book-demo">
              Book a free demo
              <ArrowUpRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline" className="rounded-xl">
            <a href={`mailto:${siteConfig.salesEmail}?subject=Kaizen%20AI%20chat%20agent%20pricing`}>
              Talk to Kaizen AI
            </a>
          </Button>
        </div>
      </section>
    </FadeUp>
  );
}

function ChatPricingPage() {
  return (
    <>
      <ChatHero />
      <ChatPricingPlansSection />
      <ChatEveryPackageIncludes />
      <ChatComparisonSection />
      <ChatValueExplanation />
      <ChatFaqSection />
      <ChatFinalCta />
    </>
  );
}

function VoiceHero() {
  return (
    <FadeUp>
      <section
        id="voice-agent-pricing"
        className="mx-auto max-w-4xl scroll-mt-28 text-center"
      >
        <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
          Voice Agent Pricing
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          A complete AI voice agent that answers calls, books appointments,
          sends WhatsApp confirmations, and follows up on missed enquiries
          24/7. Choose the call volume that fits your business.
        </p>
        <p className="mt-4 text-sm font-semibold text-primary">
          Same complete feature set in every package.
        </p>
      </section>
    </FadeUp>
  );
}

function CountUpPrice({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = valueRef.current;

    if (!element || hasAnimated) {
      return;
    }

    let animationFrame = 0;
    let startedAt = 0;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      animationFrame = window.requestAnimationFrame(() => {
        setDisplayValue(value);
        setHasAnimated(true);
      });

      return () => {
        window.cancelAnimationFrame(animationFrame);
      };
    }

    const animate = (timestamp: number) => {
      if (!startedAt) {
        startedAt = timestamp;
      }

      const progress = Math.min((timestamp - startedAt) / 1100, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setHasAnimated(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        observer.disconnect();
        animationFrame = window.requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [hasAnimated, value]);

  return (
    <span
      ref={valueRef}
      aria-label={`$${value.toFixed(3)} per minute`}
      className="inline-flex items-baseline gap-1.5 whitespace-nowrap"
    >
      <span>${displayValue.toFixed(3)}</span>
      <span className="text-base font-semibold text-primary sm:text-lg">
        &nbsp;/ min
      </span>
    </span>
  );
}

function VoicePricingCard({ plan }: { plan: VoicePricingPlan }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 backdrop-blur-md transition-colors sm:p-6",
        plan.popular
          ? "border-primary/70 gold-card-bright shadow-[0_0_90px_-38px_color-mix(in_oklab,var(--primary)_85%,transparent)]"
          : plan.premium
            ? "border-primary/35 bg-card/72 shadow-[0_24px_80px_-56px_color-mix(in_oklab,var(--primary)_70%,transparent)] hover:border-primary/55"
            : "border-border bg-card/62 hover:border-primary/45 hover:bg-card/80",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px",
          plan.popular
            ? "bg-primary"
            : "bg-gradient-to-r from-transparent via-primary/35 to-transparent",
        )}
      />

      <div>
        <Badge
          variant={plan.popular ? "popular" : "default"}
          className="uppercase"
        >
          {plan.popular && <Star className="h-3.5 w-3.5 fill-current" />}
          {plan.badge}
        </Badge>
      </div>

      <div className="mt-6 min-w-0">
        <h3 className="text-2xl font-semibold leading-tight text-foreground">
          {plan.name}
        </h3>
        <div
          className={cn(
            "mt-5 max-w-full text-4xl font-semibold leading-tight sm:text-[2.65rem]",
            plan.popular ? "text-primary" : "text-foreground",
          )}
        >
          {plan.perMinuteRate === null ? (
            <span className="block break-words">{plan.perMinuteLabel}</span>
          ) : (
            <CountUpPrice value={plan.perMinuteRate} />
          )}
        </div>
      </div>

      <dl className="mt-7 flex-1 space-y-4 border-y border-border py-5 text-sm leading-6">
        <div>
          <dt className="text-muted-foreground">Monthly retainer</dt>
          <dd className="font-semibold text-foreground">
            {plan.monthlyRetainer}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Setup fee</dt>
          <dd className="font-semibold text-foreground">{plan.setupFee}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Included usage</dt>
          <dd className="font-semibold text-foreground">
            {plan.includedUsage}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Additional usage rate</dt>
          <dd className="font-semibold text-foreground">
            {plan.additionalUsageRate}
          </dd>
        </div>
      </dl>

      <Button
        asChild
        size="lg"
        variant={plan.popular ? "default" : "outline"}
        className="mt-6 w-full rounded-xl"
      >
        <Link href="/book-demo">
          {plan.cta}
          <ArrowRight aria-hidden />
        </Link>
      </Button>
    </motion.article>
  );
}

function VoicePricingPlansSection() {
  return (
    <FadeUp delay={0.08}>
      <section
        className="mt-12 scroll-mt-28 sm:mt-14 lg:mt-16"
        aria-label="Voice agent packages"
      >
        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {voicePricingPlans.map((plan) => (
            <VoicePricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-border bg-card/55 px-5 py-4 text-sm leading-6 text-muted-foreground backdrop-blur-md">
          <p>
            Pricing above is in USD. One-time setup fee covers onboarding,
            voice configuration, calendar integration, and launch. Additional
            minutes beyond the monthly inclusion are billed at your package
            per-minute rate. Final scope is confirmed after reviewing your
            current call volume and service workflows.
          </p>
        </div>
      </section>
    </FadeUp>
  );
}

function VoiceEveryPackageIncludes() {
  return (
    <FadeUp delay={0.1}>
      <section
        id="voice-every-package-includes"
        className="mt-24 scroll-mt-28"
        aria-labelledby="voice-every-package-title"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="voice-every-package-title"
            className="text-3xl font-semibold text-foreground sm:text-4xl"
          >
            Every package includes
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            All plans include the full AI voice agent system. You are not
            choosing fewer features. You are choosing the call volume and
            support level that fits your business.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {voiceFeatureGroups.map((group) => (
            <FeatureGroupCard key={group.title} group={group} />
          ))}
        </div>
      </section>
    </FadeUp>
  );
}

function VoiceComparisonSection() {
  return (
    <FadeUp delay={0.12}>
      <section className="mt-24" aria-labelledby="voice-comparison-title">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="voice-comparison-title"
            className="text-3xl font-semibold text-foreground sm:text-4xl"
          >
            Compare packages
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Every package includes the same complete feature set. The difference
            is monthly call volume, retainer price, setup fee, and per-minute
            rate.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card/58 backdrop-blur-md">
          <table className="min-w-[1040px] w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Voice agent pricing comparison for VA Starter, VA Growth, VA
              Scale, and Enterprise Voice packages.
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th
                  scope="col"
                  className="w-[24%] px-5 py-5 text-xs font-semibold uppercase text-muted-foreground"
                >
                  Feature / Detail
                </th>
                <th
                  scope="col"
                  className="px-5 py-5 text-base font-semibold text-foreground"
                >
                  VA Starter
                </th>
                <th
                  scope="col"
                  className="bg-primary/8 px-5 py-5 text-base font-semibold text-primary"
                >
                  VA Growth
                </th>
                <th
                  scope="col"
                  className="px-5 py-5 text-base font-semibold text-foreground"
                >
                  VA Scale
                </th>
                <th
                  scope="col"
                  className="px-5 py-5 text-base font-semibold text-foreground"
                >
                  Enterprise Voice
                </th>
              </tr>
            </thead>
            <tbody>
              {voiceComparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-border/80 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 font-semibold text-foreground"
                  >
                    {row.label}
                  </th>
                  <td className="px-5 py-4 leading-6 text-muted-foreground">
                    <IncludedValue value={row.starter} />
                  </td>
                  <td className="bg-primary/8 px-5 py-4 leading-6 text-muted-foreground">
                    <IncludedValue value={row.growth} />
                  </td>
                  <td className="px-5 py-4 leading-6 text-muted-foreground">
                    <IncludedValue value={row.scale} />
                  </td>
                  <td className="px-5 py-4 leading-6 text-muted-foreground">
                    <IncludedValue value={row.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </FadeUp>
  );
}

function VoiceValueExplanation() {
  return (
    <FadeUp delay={0.14}>
      <section className="mt-24 grid gap-6 rounded-2xl border border-primary/25 bg-card/65 p-6 shadow-[0_24px_90px_-58px_color-mix(in_oklab,var(--primary)_75%,transparent)] backdrop-blur-md sm:p-8 lg:grid-cols-[0.7fr_1fr] lg:items-center">
        <div>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Why every package includes everything
          </h2>
        </div>
        <p className="text-base leading-8 text-muted-foreground">
          Most agencies hide key voice features behind higher tiers. Kaizen AI
          keeps the full system available in every package because a voice agent
          only performs properly when call handling, calendar booking, WhatsApp
          follow-up, CRM logging, knowledge updates, analytics, and human
          escalation work together.
        </p>
      </section>
    </FadeUp>
  );
}

function VoiceFaqSection() {
  return (
    <FadeUp delay={0.16}>
      <section className="mt-24" aria-labelledby="voice-faq-title">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2
              id="voice-faq-title"
              className="text-3xl font-semibold text-foreground sm:text-4xl"
            >
              Clear answers before you book a demo
            </h2>
          </div>

          <div className="space-y-3">
            {voiceFaqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border bg-card/58 px-5 backdrop-blur-md transition-colors open:border-primary/35 open:bg-card/78"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <Plus
                    className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="border-t border-border pb-5 pt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}

function VoiceFinalCta() {
  return (
    <FadeUp delay={0.18}>
      <section className="mt-24 overflow-hidden rounded-2xl border border-primary/25 bg-card/70 p-6 shadow-[0_24px_90px_-52px_color-mix(in_oklab,var(--primary)_80%,transparent)] backdrop-blur-md sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Ready to stop missing calls?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Show us your current call volume and appointment workflow.
            We&apos;ll map the best setup, confirm the launch scope, and help
            you choose the right voice agent package.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            kaizenai.dev · {siteConfig.salesEmail} · +94 77 029 9569
          </p>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
          <Button asChild size="xl" className="rounded-xl">
            <Link href="/book-demo">
              Book a free demo
              <ArrowUpRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline" className="rounded-xl">
            <a href={`mailto:${siteConfig.salesEmail}?subject=Kaizen%20AI%20voice%20agent%20pricing`}>
              Talk to Kaizen AI
            </a>
          </Button>
        </div>
      </section>
    </FadeUp>
  );
}

function VoicePricingPage() {
  return (
    <>
      <VoiceHero />
      <VoicePricingPlansSection />
      <VoiceEveryPackageIncludes />
      <VoiceComparisonSection />
      <VoiceValueExplanation />
      <VoiceFaqSection />
      <VoiceFinalCta />
    </>
  );
}

export function Pricing({
  initialType = "chat",
}: {
  initialType?: PricingType;
}) {
  const isChatPricing = initialType === "chat";

  return (
    <section
      id="pricing"
      className="relative w-full overflow-hidden pb-24 pt-20 sm:pb-32 sm:pt-24 lg:pb-40 lg:pt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 44% at 50% 0%, color-mix(in oklab, var(--primary) 16%, transparent) 0%, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[720px] -z-10 h-[460px] w-[min(86vw,920px)] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl"
      />
      <Container size="wide">
        {isChatPricing ? <ChatPricingPage /> : <VoicePricingPage />}
      </Container>
    </section>
  );
}
