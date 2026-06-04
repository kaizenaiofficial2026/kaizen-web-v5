import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import type { ProductPageContent } from "@/lib/content/product-pages";

export function ProductDetailPage({ product }: { product: ProductPageContent }) {
  return (
    <main id="main" className="relative">
      <MarketingHero
        eyebrow={product.eyebrow}
        title={
          <>
            {product.title} <span className="text-primary">{product.accent}</span>
          </>
        }
        subtitle={product.subtitle}
        actions={[
          { label: product.primaryCta, href: "/contact#book" },
          {
            label: product.secondaryCta,
            href: "/contact",
            variant: "outline",
          },
        ]}
      >
        <Card className="relative overflow-hidden p-6 shadow-card">
          <div
            aria-hidden
            className="absolute inset-x-8 top-8 h-24 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative">
            <Badge>{product.badge}</Badge>
            <div className="mt-6 grid gap-3">
              {product.heroSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.label}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background/45 p-4 sm:flex-nowrap sm:gap-4"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-medium text-foreground">
                      {step.label}
                    </span>
                    <span className="ml-0 text-sm font-semibold text-primary sm:ml-auto">
                      {step.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </MarketingHero>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="What it does"
            title={
              <>
                Built to answer, qualify, and{" "}
                <span className="text-primary">move the customer forward</span>
              </>
            }
            subtitle="Kaizen is configured around your real customer questions, service rules, and booking process before launch."
          />
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-5 md:grid-cols-3">
          {product.features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <Card className="h-full p-7 transition-colors hover:border-primary/40">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h2>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <FadeUp>
            <SectionHeader
              align="start"
              eyebrow="Outcomes"
              title={
                <>
                  Designed for teams that cannot afford{" "}
                  <span className="text-primary">slow response</span>
                </>
              }
              subtitle="Start with one channel, prove the workflow, then expand across the rest of your customer front desk."
            />
            <Button asChild size="xl" className="mt-8 w-full sm:w-auto">
              <Link href="/contact#book">Plan my first agent</Link>
            </Button>
          </FadeUp>
          <Card className="p-7">
            <ul className="space-y-4">
              {product.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex gap-3 text-foreground/85"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </MarketingSection>

      <MarketingSection>
        <Card className="gold-card p-8 sm:p-10">
          <div className="grid gap-6 sm:grid-cols-3">
            {product.proof.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-foreground/10 bg-background/35 p-5"
              >
                <div className="text-3xl font-semibold tracking-tight text-primary">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-foreground/70">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
