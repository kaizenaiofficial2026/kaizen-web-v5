"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Cloud, Mail, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { tiers } from "@/lib/content/pricing";
import type { Tier } from "@/lib/types";
import { cn } from "@/lib/utils";

function PlanGlyph({ tone }: { tone: "muted" | "gold" | "deep" }) {
  const fillId = `pg-${tone}`;
  const stops =
    tone === "gold"
      ? ["#ecd479", "#c9a03d"]
      : tone === "deep"
        ? ["#8d6f24", "#3a2d10"]
        : ["#3a3528", "#171206"];
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden>
      <defs>
        <radialGradient id={fillId} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor={stops[0]} />
          <stop offset="100%" stopColor={stops[1]} />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill={`url(#${fillId})`} />
      <path
        d="M11 23c4-1 6-7 10-7s5 6 9 5"
        stroke="rgba(10,9,7,0.45)"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CornerArt({ highlighted }: { highlighted?: boolean }) {
  const stroke = highlighted ? "rgba(10,9,7,0.35)" : "rgba(201,160,61,0.18)";
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 220"
      className="pointer-events-none absolute -right-6 -top-6 h-44 w-44"
    >
      <path
        d="M10 130 Q70 60 120 110 T210 80"
        stroke={stroke}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M30 170 Q90 110 140 150 T220 120"
        stroke={stroke}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function formatPrice(value: number | "custom") {
  if (value === "custom") return "Contact us";
  return `$${value}`;
}

function PricingCard({
  tier,
  indexTone,
  cadence,
}: {
  tier: Tier;
  indexTone: number;
  cadence: "monthly" | "annual";
}) {
  const isHighlighted = !!tier.highlighted;
  const glyphTone =
    indexTone === 0 ? "muted" : indexTone === 1 ? "gold" : "deep";
  const priceValue = tier.price[cadence];
  const isCustom = priceValue === "custom";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 backdrop-blur-md",
        isHighlighted
          ? "border-primary/50 gold-card-bright"
          : "border-border bg-card/60",
      )}
    >
      <CornerArt highlighted={isHighlighted} />

      {tier.popular && (
        <Badge
          variant="popular"
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        >
          Most popular
        </Badge>
      )}

      <div className="relative">
        <PlanGlyph tone={glyphTone} />
      </div>

      <h3 className="text-foreground relative mt-6 text-2xl font-semibold tracking-tight">
        {tier.name}
      </h3>
      <p
        className={cn(
          "relative mt-2 text-sm leading-6",
          isHighlighted ? "text-foreground/85" : "text-muted-foreground",
        )}
      >
        {tier.description}
      </p>

      <div className="relative mt-6 flex items-baseline gap-1.5">
        <span className="text-foreground text-4xl font-semibold tracking-tight">
          {formatPrice(priceValue)}
        </span>
        {!isCustom && (
          <span
            className={cn(
              "text-sm",
              isHighlighted ? "text-foreground/70" : "text-muted-foreground",
            )}
          >
            /{cadence === "monthly" ? "month" : "month, billed yearly"}
          </span>
        )}
      </div>

      <Button
        asChild
        variant={isHighlighted ? "default" : "outline"}
        size="lg"
        className="relative mt-6 w-full"
      >
        <Link href={tier.ctaHref}>
          {tier.ctaIcon === "mail" && <Mail aria-hidden />}
          {tier.cta}
        </Link>
      </Button>

      <div className="relative mt-6 space-y-2.5 text-sm">
        <div className="text-foreground/85 flex items-center gap-3">
          <Users
            aria-hidden
            className={cn(
              "h-4 w-4",
              isHighlighted ? "text-foreground/80" : "text-muted-foreground",
            )}
          />
          <span>
            <span className="font-medium">{tier.seats}</span>{" "}
            <span
              className={
                isHighlighted ? "text-foreground/70" : "text-muted-foreground"
              }
            >
              seats available
            </span>
          </span>
        </div>
        <div className="text-foreground/85 flex items-center gap-3">
          <Cloud
            aria-hidden
            className={cn(
              "h-4 w-4",
              isHighlighted ? "text-foreground/80" : "text-muted-foreground",
            )}
          />
          <span>
            <span className="font-medium">{tier.storage}</span>{" "}
            <span
              className={
                isHighlighted ? "text-foreground/70" : "text-muted-foreground"
              }
            >
              of cloud storage
            </span>
          </span>
        </div>
      </div>

      <div className="relative mt-6">
        <div
          className={cn(
            "flex items-center gap-3",
            !tier.inheritsLabel && "opacity-0",
          )}
        >
          <span
            className={cn(
              "h-px flex-1",
              isHighlighted ? "bg-foreground/15" : "bg-border",
            )}
          />
          <span
            className={cn(
              "text-[11px] font-medium uppercase tracking-[0.18em]",
              isHighlighted ? "text-foreground/70" : "text-muted-foreground",
            )}
          >
            {tier.inheritsLabel ?? "—"}
          </span>
          <span
            className={cn(
              "h-px flex-1",
              isHighlighted ? "bg-foreground/15" : "bg-border",
            )}
          />
        </div>
      </div>

      <ul className="relative mt-5 space-y-3 text-sm">
        {tier.features.map((feature) => {
          const label = typeof feature === "string" ? feature : feature.label;
          const badge = typeof feature === "string" ? null : feature.badge;
          return (
            <li
              key={label}
              className="text-foreground/90 flex items-center gap-3"
            >
              <span
                aria-hidden
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full",
                  isHighlighted
                    ? "bg-foreground/15 text-foreground"
                    : "bg-primary/15 text-primary",
                )}
              >
                <Check className="h-3 w-3" />
              </span>
              <span className="font-medium">{label}</span>
              {badge && (
                <Badge
                  variant={isHighlighted ? "muted" : "default"}
                  className="ml-auto"
                >
                  <Sparkles className="h-3 w-3" />
                  {badge}
                </Badge>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export function Pricing() {
  const [cadence, setCadence] = React.useState<"monthly" | "annual">("monthly");

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
      <Container>
        <FadeUp>
          <SectionHeader
            eyebrow="Pricing"
            title={
              <>
                Simple plans.
                <br />
                <span className="text-primary">Powerful results.</span>
              </>
            }
            subtitle="Pick the tier that fits today. Upgrade the moment you outgrow it."
          />
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setCadence("monthly")}
              className={cn(
                "text-sm font-medium transition-colors",
                cadence === "monthly"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <Switch
              checked={cadence === "annual"}
              onCheckedChange={(c) => setCadence(c ? "annual" : "monthly")}
              aria-label="Toggle annual pricing"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCadence("annual")}
                className={cn(
                  "text-sm font-medium transition-colors",
                  cadence === "annual"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Annual
              </button>
              <Badge variant="success">Save 20%</Badge>
            </div>
          </div>
        </FadeUp>

        <div className="mt-12 grid items-stretch gap-6 pt-3 sm:grid-cols-3">
          {tiers.map((tier, i) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              indexTone={i}
              cadence={cadence}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
