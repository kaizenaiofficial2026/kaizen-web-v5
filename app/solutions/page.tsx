import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import {
  solutionPillars,
  solutionProof,
  solutionVisualSteps,
  workflowUseCases,
} from "@/lib/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore Kaizen AI solutions for adaptive workflows, secure automation, and AI-assisted team operations.",
};

export default function SolutionsPage() {
  return (
    <main id="main" className="relative">
      <MarketingHero
        eyebrow="Solutions"
        title={
          <>
            AI workflows that <span className="text-primary">fit the way</span>{" "}
            your team already works
          </>
        }
        subtitle="Kaizen connects your tools, routes high-friction work, and improves every workflow from the outcomes your team accepts."
        actions={[
          { label: "Book a demo", href: "/demo" },
          { label: "See customer proof", href: "/case-studies", variant: "outline" },
        ]}
      >
        <Card className="relative overflow-hidden p-6 shadow-card">
          <div
            aria-hidden
            className="bg-primary/10 absolute inset-x-8 top-8 h-24 rounded-full blur-3xl"
          />
          <div className="relative">
            <Badge>Operating layer</Badge>
            <div className="mt-6 space-y-3">
              {solutionVisualSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.label}
                    className="border-border bg-background/45 flex items-center gap-4 rounded-xl border p-4"
                  >
                    <span className="bg-primary/15 text-primary grid h-10 w-10 place-items-center rounded-lg">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-foreground font-medium">
                      {step.label}
                    </span>
                    <span className="text-muted-foreground ml-auto text-sm">
                      0{index + 1}
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
            eyebrow="Platform pillars"
            title={
              <>
                One system for <span className="text-primary">reliable</span>{" "}
                AI execution
              </>
            }
            subtitle="The strongest automation is not a single agent. It is a connected workflow with context, controls, and feedback."
          />
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-5 md:grid-cols-3">
          {solutionPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={pillar.title}>
                <Card className="hover:border-primary/40 flex h-full flex-col p-7 transition-colors">
                  <div className="border-primary/30 bg-primary/10 text-primary grid h-12 w-12 place-items-center rounded-xl border">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h2 className="text-foreground mt-6 text-2xl font-semibold tracking-tight">
                    {pillar.title}
                  </h2>
                  <p className="text-muted-foreground mt-3 leading-7">
                    {pillar.description}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {pillar.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-foreground/85 flex items-center gap-3"
                      >
                        <CheckCircle2
                          className="text-primary h-4 w-4"
                          aria-hidden
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <FadeUp>
            <SectionHeader
              align="start"
              eyebrow="Use cases"
              title={
                <>
                  Built for the teams closest to{" "}
                  <span className="text-primary">the work</span>
                </>
              }
              subtitle="Start with one high-friction loop, then expand Kaizen across the workflows that need shared context."
            />
          </FadeUp>
          <StaggerGrid className="grid gap-4 sm:grid-cols-2">
            {workflowUseCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <StaggerItem key={useCase.title}>
                  <Card className="hover:border-primary/30 h-full p-6 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="bg-primary/15 text-primary grid h-10 w-10 place-items-center rounded-lg">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <span className="text-muted-foreground text-xs font-medium uppercase tracking-[0.18em]">
                        {useCase.team}
                      </span>
                    </div>
                    <h2 className="text-foreground mt-5 text-xl font-semibold tracking-tight">
                      {useCase.title}
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm leading-6">
                      {useCase.description}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </MarketingSection>

      <MarketingSection>
        <Card className="gold-card overflow-hidden p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <FadeUp>
              <Badge variant="popular">Proof of fit</Badge>
              <h2 className="text-foreground mt-5 text-h2 font-medium">
                Launch a useful workflow before the next planning cycle.
              </h2>
              <p className="text-foreground/75 mt-5 max-w-2xl text-lead">
                Kaizen is designed for practical adoption: connect the systems
                your team already trusts, prove one workflow, then compound.
              </p>
              <Button asChild size="xl" className="mt-8">
                <Link href="/demo">Request a demo</Link>
              </Button>
            </FadeUp>
            <StaggerGrid className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {solutionProof.map((item) => (
                <StaggerItem key={item.label}>
                  <div className="border-foreground/10 bg-background/35 rounded-xl border p-5">
                    <div className="text-primary text-3xl font-semibold tracking-tight">
                      {item.value}
                    </div>
                    <div className="text-foreground/70 mt-1 text-sm">
                      {item.label}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
