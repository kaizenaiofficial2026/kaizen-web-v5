"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Bot,
  Building2,
  CheckCircle2,
  Clock3,
  Info,
  Rocket,
  Settings,
  Star,
  Tags,
  TrendingUp,
} from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/utils";

type PricingMode = "AI Chatbot" | "AI Voice Agent";

const pricingModes: PricingMode[] = ["AI Chatbot", "AI Voice Agent"];

const chatbotPlans = [
  {
    name: "Chat Starter",
    icon: Bot,
    rate: "$149",
    rateSuffix: "/mo",
    retainerLabel: "Monthly retainer",
    retainer: "$149/mo",
    setup: "$249 one-time setup",
    usageLabel: "Included conversations",
    usage: "1,000 chats/month",
    usageNote: "~35 chats/day",
    cta: "Get Started",
    features: [
      "Website chatbot for inbound enquiries",
      "Business FAQ and service training",
      "Lead capture with email notifications",
      "Basic appointment request handoff",
      "Setup includes onboarding and widget configuration",
    ],
  },
  {
    name: "Chat Growth",
    icon: TrendingUp,
    rate: "$299",
    rateSuffix: "/mo",
    retainerLabel: "Monthly retainer",
    retainer: "$299/mo",
    setup: "$449 one-time setup",
    usageLabel: "Included conversations",
    usage: "3,000 chats/month",
    usageNote: "~100 chats/day",
    cta: "Choose Growth",
    popular: true,
    features: [
      "Website and WhatsApp enquiry handling",
      "Lead qualification and routing",
      "Calendar or CRM handoff",
      "Conversation summaries and transcripts",
      "Setup includes onboarding and workflow configuration",
    ],
  },
  {
    name: "Chat Scale",
    icon: TrendingUp,
    rate: "$549",
    rateSuffix: "/mo",
    retainerLabel: "Monthly retainer",
    retainer: "$549/mo",
    setup: "$799 one-time setup",
    usageLabel: "Included conversations",
    usage: "8,000 chats/month",
    usageNote: "~265 chats/day",
    cta: "Scale Faster",
    features: [
      "Multi-channel chatbot coverage",
      "Advanced lead scoring and segmentation",
      "HubSpot, Sheets, or CRM integration",
      "Priority support and optimisation",
      "Setup includes onboarding and conversion tuning",
    ],
  },
  {
    name: "Enterprise Chat",
    icon: Building2,
    rate: "Custom",
    retainerLabel: "Monthly retainer",
    retainer: "Custom monthly",
    setup: "Custom setup",
    usageLabel: "Included conversations",
    usage: "Custom volume",
    usageNote: "Multi-brand / multi-region",
    cta: "Contact Sales",
    features: [
      "Custom chatbot workflows and approvals",
      "CRM, API, and internal tool integrations",
      "Dedicated support options",
      "Advanced reporting and attribution",
      "Custom onboarding and deployment",
    ],
  },
];

const voicePlans = [
  {
    name: "VA Starter",
    icon: Rocket,
    rate: "$0.184",
    rateSuffix: "/min",
    retainerLabel: "Monthly retainer",
    retainer: "$249/mo",
    setup: "$349 one-time setup",
    usageLabel: "Included usage",
    usage: "1,350 mins/month",
    usageNote: "~45 mins/day",
    cta: "Get Started",
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
    rate: "$0.148",
    rateSuffix: "/min",
    retainerLabel: "Monthly retainer",
    retainer: "$399/mo",
    setup: "$549 one-time setup",
    usageLabel: "Included usage",
    usage: "2,700 mins/month",
    usageNote: "~90 mins/day",
    cta: "Choose Growth",
    popular: true,
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
    rate: "$0.129",
    rateSuffix: "/min",
    retainerLabel: "Monthly retainer",
    retainer: "$699/mo",
    setup: "$989 one-time setup",
    usageLabel: "Included usage",
    usage: "5,400 mins/month",
    usageNote: "~3 hrs/day",
    cta: "Scale Faster",
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
    rate: "Custom",
    retainerLabel: "Monthly retainer",
    retainer: "Custom monthly",
    setup: "Custom setup",
    usageLabel: "Included usage",
    usage: "Custom minutes",
    usageNote: "Multi-team / multi-branch",
    cta: "Contact Sales",
    features: [
      "Custom workflows and integrations",
      "CRM and API integrations",
      "Dedicated support options",
      "Advanced reporting",
      "Custom onboarding and deployment",
    ],
  },
];

type DetailedPlan = (typeof voicePlans)[number] | (typeof chatbotPlans)[number];

type ParsedNumericText = {
  prefix: string;
  value: number;
  decimals: number;
  suffix: string;
};

function parseNumericText(value: string): ParsedNumericText | null {
  const match = value.match(/^([^0-9-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, rawValue, suffix] = match;
  const normalizedValue = Number(rawValue.replaceAll(",", ""));

  if (!Number.isFinite(normalizedValue)) {
    return null;
  }

  return {
    prefix,
    value: normalizedValue,
    decimals: rawValue.includes(".") ? rawValue.split(".")[1].length : 0,
    suffix,
  };
}

function formatAnimatedNumber(value: number, decimals: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function AnimatedNumericText({
  value,
  className,
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const parsed = useMemo(() => parseNumericText(value), [value]);
  const reducedMotion = useReducedMotion();
  const count = useMotionValue(parsed && reducedMotion ? parsed.value : 0);
  const text = useTransform(() => {
    if (!parsed) {
      return value;
    }

    return `${parsed.prefix}${formatAnimatedNumber(
      count.get(),
      parsed.decimals,
    )}${parsed.suffix}`;
  });

  useEffect(() => {
    if (!parsed) {
      return;
    }

    count.set(reducedMotion ? parsed.value : 0);

    if (reducedMotion) {
      return;
    }

    const controls = animate(count, parsed.value, {
      duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, duration, parsed, reducedMotion]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <motion.span aria-label={value} className={className}>
      {text}
    </motion.span>
  );
}

function DetailedPricingCard({
  plan,
}: {
  plan: DetailedPlan;
}) {
  const Icon = plan.icon;
  const isPopular = !!plan.popular;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative flex h-full flex-col overflow-visible rounded-2xl border p-5 backdrop-blur-md sm:p-6",
        isPopular
          ? "border-primary/70 gold-card-bright shadow-[0_0_70px_-34px_color-mix(in_oklab,var(--primary)_80%,transparent)]"
          : "border-border bg-card/60",
      )}
    >
      {isPopular && (
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
            "grid h-12 w-12 shrink-0 place-items-center rounded-2xl border",
            isPopular
              ? "border-primary/30 bg-primary/20 text-primary"
              : "border-border bg-primary/10 text-primary",
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0 pt-2">
          <h3 className="text-foreground text-xl font-semibold tracking-tight">
            {plan.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {plan.rate === "Custom"
              ? "Tailored pricing"
              : "Effective monthly rate"}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-end gap-1">
        <AnimatedNumericText
          value={plan.rate}
          className={cn(
            "text-5xl font-semibold tracking-tight",
            isPopular ? "text-primary" : "text-foreground",
          )}
          duration={1.8}
        />
        {plan.rateSuffix && (
          <span className="pb-2 text-2xl font-semibold text-primary">
            {plan.rateSuffix}
          </span>
        )}
      </div>

      <div className="mt-5 divide-y divide-border border-y border-border">
        <div className="flex items-center gap-3 py-3">
          <Tags className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div>
            <p className="text-xs text-muted-foreground">
              {plan.retainerLabel}
            </p>
            <p className="font-semibold text-foreground">
              <AnimatedNumericText value={plan.retainer} duration={1.2} />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-3">
          <Settings className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div>
            <p className="text-xs text-muted-foreground">
              Included setup (one-time)
            </p>
            <p className="font-semibold text-foreground">
              <AnimatedNumericText value={plan.setup} duration={1.2} />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-3">
          <Clock3 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">{plan.usageLabel}</p>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="font-semibold text-foreground">
                <AnimatedNumericText value={plan.usage} duration={1.35} />
              </p>
              <p className="text-xs text-muted-foreground">
                <AnimatedNumericText value={plan.usageNote} duration={1.35} />
              </p>
            </div>
          </div>
        </div>
      </div>

      <ul className="mt-5 flex-1 space-y-2.5 text-sm">
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

      <Button
        asChild
        size="lg"
        variant={isPopular ? "default" : "outline"}
        className="mt-6 w-full"
      >
        <Link href="/demo">{plan.cta}</Link>
      </Button>
    </motion.div>
  );
}

function DetailedPricingGrid({
  title,
  subtitle,
  plans,
  note,
}: {
  title: string;
  subtitle: string;
  plans: DetailedPlan[];
  note: ReactNode;
}) {
  return (
    <div className="mt-12">
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="text-h3 font-semibold text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      </div>

      <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <DetailedPricingCard key={plan.name} plan={plan} />
        ))}
      </div>

      <div className="mx-auto mt-6 flex max-w-3xl items-start gap-3 rounded-2xl border border-border bg-card/55 px-5 py-4 text-sm leading-6 text-muted-foreground backdrop-blur-md">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <p>{note}</p>
      </div>
    </div>
  );
}

export function Pricing() {
  const [selectedPricing, setSelectedPricing] =
    useState<PricingMode>("AI Voice Agent");

  return (
    <section
      id="pricing"
      className="relative w-full overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,160,61,0.08) 0%, rgba(10,9,7,0) 70%)",
        }}
      />
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Pricing"
            title={
              <>
                Choose the first agent
                <br />
                <span className="text-primary">to launch.</span>
              </>
            }
            subtitle="Every build is scoped around your channels, call volume, integrations, and launch timeline. Start focused, then add voice, chat, recovery, and reporting."
          />
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="mt-8 flex justify-center">
            <div
              className="grid w-full max-w-md grid-cols-2 rounded-2xl border border-primary/25 bg-card/55 p-1.5 shadow-[0_18px_60px_-36px_color-mix(in_oklab,var(--primary)_55%,transparent)] backdrop-blur-md"
              aria-label="Choose pricing type"
            >
              {pricingModes.map((mode) => {
                const active = selectedPricing === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedPricing(mode)}
                    className={cn(
                      "h-11 rounded-xl px-4 text-sm font-semibold transition-colors",
                      active
                        ? "bg-primary text-primary-foreground shadow-[0_12px_30px_-18px_color-mix(in_oklab,var(--primary)_80%,transparent)]"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                    )}
                  >
                    {mode.replace("AI ", "")}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {selectedPricing === "AI Voice Agent" ? (
          <DetailedPricingGrid
            title="Voice Agent Pricing"
            subtitle="Simple plans for businesses of every size. Transparent setup pricing, clear monthly retainers, and affordable per-minute value."
            plans={voicePlans}
            note={
              <>
                Additional voice minutes:{" "}
                <span className="font-semibold text-foreground">
                  $0.15/min
                </span>
                . If usage consistently exceeds your selected plan, we will
                recommend the next package for better value.
              </>
            }
          />
        ) : (
          <DetailedPricingGrid
            title="Chatbot Pricing"
            subtitle="Simple plans for website and messaging automation. Transparent setup pricing, clear monthly retainers, and included conversation volume."
            plans={chatbotPlans}
            note={
              <>
                Additional chatbot conversations:{" "}
                <span className="font-semibold text-foreground">
                  $0.03/conversation
                </span>
                . If usage consistently exceeds your selected plan, we will
                recommend the next package for better value.
              </>
            }
          />
        )}
      </Container>
    </section>
  );
}
