"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CheckCircle2,
  Clock3,
  MessageSquareText,
  Rocket,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Tags,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/primitives/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/utils";

export type PricingType = "chat" | "voice";

type PlanDetail = {
  label: string;
  value: string;
  note?: string;
  icon: LucideIcon;
};

type PricingPlan = {
  name: string;
  icon: LucideIcon;
  price: string;
  priceSuffix?: string;
  priceNote: string;
  description: string;
  cta: "Get Started" | "Book a Call";
  features: string[];
  details?: PlanDetail[];
  popular?: boolean;
};

const chatPlans: PricingPlan[] = [
  {
    name: "Monthly Retainer",
    icon: MessageSquareText,
    price: "$109",
    priceSuffix: "/ month",
    priceNote: "Monthly retainer",
    description:
      "Start with a custom AI chat agent for your website and messaging channels.",
    cta: "Get Started",
    features: [
      "Website chat agent setup",
      "WhatsApp-ready conversation flow",
      "Instagram / Facebook DM support placeholder",
      "Business-trained FAQ responses",
      "Lead capture flow",
      "Human handoff support",
      "Basic conversation tracking",
      "Monthly optimisation placeholder",
    ],
  },
  {
    name: "3-Month Package",
    icon: Sparkles,
    price: "Custom Quote",
    priceNote: "Focused rollout",
    description:
      "A focused 3-month rollout for businesses that want setup, launch, and optimisation support.",
    cta: "Get Started",
    popular: true,
    features: [
      "Everything in Monthly Retainer",
      "3-month guided optimisation",
      "Improved lead qualification flow",
      "Multi-channel conversation setup",
      "Dashboard/reporting placeholder",
      "Monthly performance review placeholder",
      "Priority implementation support placeholder",
      "Custom integrations placeholder",
    ],
  },
  {
    name: "6-Month Package",
    icon: ShieldCheck,
    price: "Custom Quote",
    priceNote: "Growth package",
    description:
      "A longer-term growth package for businesses that want deeper automation, tracking, and conversion improvements.",
    cta: "Get Started",
    features: [
      "Everything in 3-Month Package",
      "Advanced AI conversation flows",
      "Deeper business knowledge training",
      "Sales follow-up workflows placeholder",
      "Lead dashboard placeholder",
      "Multi-language setup placeholder",
      "Monthly improvement cycles",
      "Premium support placeholder",
    ],
  },
];

const voicePlans: PricingPlan[] = [
  {
    name: "VA Starter",
    icon: Rocket,
    price: "$0.184",
    priceSuffix: "/min",
    priceNote: "Per-minute rate",
    description:
      "AI voice agent for inbound calls, basic lead capture, summaries, and safe human handoff.",
    cta: "Get Started",
    details: [
      {
        label: "Monthly retainer",
        value: "$249/mo",
        icon: Tags,
      },
      {
        label: "Included setup (one-time)",
        value: "$349 one-time setup",
        icon: Settings,
      },
      {
        label: "Included usage",
        value: "1,350 mins/month",
        note: "~45 mins/day",
        icon: Clock3,
      },
    ],
    features: [
      "AI voice agent for inbound calls",
      "Call summaries and basic lead capture",
      "Human handoff when needed",
      "Monthly usage report",
      "Setup includes onboarding and voice configuration",
    ],
  },
  {
    name: "VA Growth",
    icon: TrendingUp,
    price: "$0.148",
    priceSuffix: "/min",
    priceNote: "Per-minute rate",
    description:
      "Daily call handling with appointment support, transcripts, and missed-call recovery.",
    cta: "Get Started",
    popular: true,
    details: [
      {
        label: "Monthly retainer",
        value: "$399/mo",
        icon: Tags,
      },
      {
        label: "Included setup (one-time)",
        value: "$549 one-time setup",
        icon: Settings,
      },
      {
        label: "Included usage",
        value: "2,700 mins/month",
        note: "~90 mins/day",
        icon: Clock3,
      },
    ],
    features: [
      "AI voice agent for regular daily enquiries",
      "Appointment and enquiry handling",
      "Call transcripts and summaries",
      "Missed-call recovery",
      "Setup includes onboarding and voice configuration",
    ],
  },
  {
    name: "VA Scale",
    icon: TrendingUp,
    price: "$0.129",
    priceSuffix: "/min",
    priceNote: "Per-minute rate",
    description:
      "Higher-volume voice coverage for inbound, outbound, and lead follow-up workflows.",
    cta: "Get Started",
    details: [
      {
        label: "Monthly retainer",
        value: "$699/mo",
        icon: Tags,
      },
      {
        label: "Included setup (one-time)",
        value: "$989 one-time setup",
        icon: Settings,
      },
      {
        label: "Included usage",
        value: "5,400 mins/month",
        note: "~3 hrs/day",
        icon: Clock3,
      },
    ],
    features: [
      "Higher-volume call handling",
      "Inbound and outbound call support",
      "Lead follow-up workflows",
      "Priority support",
      "Setup includes onboarding and voice configuration",
    ],
  },
  {
    name: "Enterprise Voice",
    icon: Building2,
    price: "Custom",
    priceNote: "Tailored pricing",
    description:
      "Custom voice deployments for multi-team, multi-branch, or deeper integration needs.",
    cta: "Book a Call",
    details: [
      {
        label: "Monthly retainer",
        value: "Custom monthly",
        icon: Tags,
      },
      {
        label: "Included setup (one-time)",
        value: "Custom setup",
        icon: Settings,
      },
      {
        label: "Included usage",
        value: "Custom minutes",
        note: "Multi-team / multi-branch",
        icon: Clock3,
      },
    ],
    features: [
      "Custom workflows and integrations",
      "CRM and API integrations",
      "Dedicated support options",
      "Advanced reporting",
      "Custom onboarding and deployment",
    ],
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

function PricingCard({ plan }: { plan: PricingPlan }) {
  const Icon = plan.icon;

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative flex h-full flex-col rounded-2xl border p-5 backdrop-blur-md transition-colors sm:p-6",
        plan.popular
          ? "border-primary/70 gold-card-bright shadow-[0_0_80px_-40px_color-mix(in_oklab,var(--primary)_85%,transparent)]"
          : "border-border bg-card/62 hover:border-primary/45 hover:bg-card/80",
      )}
    >
      {plan.popular && (
        <Badge
          variant="popular"
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 gap-1.5 px-4 py-1 text-xs"
        >
          <Star className="h-3.5 w-3.5 fill-current" />
          Most Popular
        </Badge>
      )}

      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className={cn(
            "grid h-12 w-12 shrink-0 place-items-center rounded-xl border",
            plan.popular
              ? "border-primary/35 bg-primary/20 text-primary"
              : "border-border bg-primary/10 text-primary",
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {plan.description}
          </p>
        </div>
      </div>

      <div className="mt-7">
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          {plan.priceNote}
        </p>
        <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
          <PriceText
            value={plan.price}
            className={cn(
              "text-4xl font-semibold leading-none sm:text-5xl",
              plan.popular ? "text-primary" : "text-foreground",
            )}
          />
          {plan.priceSuffix && (
            <span className="pb-1 text-lg font-semibold text-primary sm:text-xl">
              {plan.priceSuffix}
            </span>
          )}
        </div>
      </div>

      <Button
        asChild
        size="lg"
        variant={plan.popular ? "default" : "outline"}
        className="mt-6 w-full rounded-xl"
      >
        <Link href="/book-demo">{plan.cta}</Link>
      </Button>

      {!!plan.details?.length && (
        <div className="mt-6 divide-y divide-border border-y border-border">
          {plan.details.map((detail) => {
            const DetailIcon = detail.icon;

            return (
              <div key={detail.label} className="flex items-start gap-3 py-3">
                <DetailIcon
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    {detail.label}
                  </p>
                  <p className="font-semibold text-foreground">
                    {detail.value}
                  </p>
                  {detail.note && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {detail.note}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ul className="mt-6 flex-1 space-y-3 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-foreground/86">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              aria-hidden
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function PricingGrid({
  selected,
  title,
  subtitle,
  plans,
  note,
}: {
  selected: PricingType;
  title: string;
  subtitle: string;
  plans: PricingPlan[];
  note: ReactNode;
}) {
  return (
    <FadeUp delay={0.08}>
      <section
        id={selected === "chat" ? "chat-agent-pricing" : "voice-agent-pricing"}
        className="mt-16 scroll-mt-28"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div
          className={cn(
            "mt-10 grid items-stretch gap-5",
            selected === "chat"
              ? "lg:grid-cols-3"
              : "md:grid-cols-2 xl:grid-cols-4",
          )}
        >
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-4xl items-start gap-3 rounded-2xl border border-border bg-card/55 px-5 py-4 text-sm leading-6 text-muted-foreground backdrop-blur-md">
          <ShieldCheck
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
            aria-hidden
          />
          <p>{note}</p>
        </div>
      </section>
    </FadeUp>
  );
}

function FinalCta() {
  return (
    <FadeUp delay={0.16}>
      <section className="mt-20 overflow-hidden rounded-2xl border border-primary/25 bg-card/65 p-6 shadow-[0_24px_90px_-52px_color-mix(in_oklab,var(--primary)_80%,transparent)] backdrop-blur-md sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-primary">
            Strategy call
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            Not sure which package fits your business?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Book a free strategy call and we&apos;ll recommend the best AI setup
            based on your current calls, messages, leads, and sales process.
          </p>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
          <Button asChild size="xl" className="rounded-xl">
            <Link href="/book-demo">Book a Call</Link>
          </Button>
          <Button asChild size="xl" variant="outline" className="rounded-xl">
            <Link href="/demo">View Demo</Link>
          </Button>
        </div>
      </section>
    </FadeUp>
  );
}

export function Pricing({
  initialType = "chat",
}: {
  initialType?: PricingType;
}) {
  const selectedPricing = initialType;
  const selectedTitle =
    selectedPricing === "chat" ? "Chat Agent Pricing" : "Voice Agent Pricing";
  const isChatPricing = selectedPricing === "chat";

  return (
    <section
      id="pricing"
      className="relative w-full overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 44% at 50% 0%, color-mix(in oklab, var(--primary) 16%, transparent) 0%, transparent 72%)",
        }}
      />
      <Container size="wide">
        <FadeUp>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase text-primary">
              Pricing
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Simple pricing for AI agents that help you sell more.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              Choose the AI setup that fits your business. Start with chat,
              voice, or combine both as your customer conversations grow.
            </p>
          </div>
        </FadeUp>

        <PricingGrid
          key={selectedPricing}
          selected={selectedPricing}
          title={selectedTitle}
          subtitle={
            isChatPricing
              ? "Three clear chat-agent packages for launching, optimizing, and expanding the conversations that turn website and messaging traffic into qualified leads."
              : "Simple plans for businesses of every size. Transparent setup pricing, clear monthly retainers, and affordable per-minute value."
          }
          plans={isChatPricing ? chatPlans : voicePlans}
          note={
            isChatPricing ? (
              <>
                Chat package features are placeholders for now and can be
                finalized around your channels, integrations, and lead flow
                during the strategy call.
              </>
            ) : (
              <>
                Additional voice minutes:{" "}
                <span className="font-semibold text-foreground">
                  $0.15/min
                </span>
                . If usage consistently exceeds your selected plan, we will
                recommend the next package for better value.
              </>
            )
          }
        />

        <FinalCta />
      </Container>
    </section>
  );
}
