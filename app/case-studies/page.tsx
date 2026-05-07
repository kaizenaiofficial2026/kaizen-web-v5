import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { caseStudies } from "@/lib/content/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how teams use Kaizen AI to launch secure automation, reduce coordination work, and improve operating rhythm.",
};

export default function CaseStudiesPage() {
  return (
    <main id="main" className="relative">
      <MarketingHero
        eyebrow="Case studies"
        title={
          <>
            Teams are turning workflow chaos into{" "}
            <span className="text-primary">measurable output</span>
          </>
        }
        subtitle="Realistic examples from operations, engineering, and security teams using Kaizen to move AI from pilot to production."
        actions={[
          { label: "Book a demo", href: "/demo" },
          { label: "Explore solutions", href: "/solutions", variant: "outline" },
        ]}
      >
        <Card className="p-6 shadow-card">
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "3x", label: "throughput gain" },
              { value: "31%", label: "faster releases" },
              { value: "9 days", label: "to production" },
              { value: "100%", label: "workflow audit trail" },
            ].map((metric) => (
              <div
                key={metric.label}
                className="border-border bg-background/45 rounded-xl border p-5"
              >
                <div className="text-primary text-3xl font-semibold tracking-tight">
                  {metric.value}
                </div>
                <div className="text-muted-foreground mt-2 text-sm leading-5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </MarketingHero>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="Customer stories"
            title={
              <>
                Built with the teams who{" "}
                <span className="text-primary">own the outcome</span>
              </>
            }
            subtitle="Each story focuses on a practical first workflow, the operational problem behind it, and the measurable shift after launch."
          />
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <StaggerItem key={study.company}>
              <Card className="hover:border-primary/40 flex h-full flex-col p-7 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-foreground text-2xl font-semibold tracking-tight">
                      {study.company}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {study.industry}
                    </p>
                  </div>
                  <Badge>{study.industry}</Badge>
                </div>
                <p className="text-foreground/80 mt-5 leading-7">
                  {study.summary}
                </p>
                <div className="mt-6 space-y-4 text-sm">
                  <div>
                    <div className="text-primary text-xs font-semibold uppercase tracking-[0.18em]">
                      Challenge
                    </div>
                    <p className="text-muted-foreground mt-2 leading-6">
                      {study.challenge}
                    </p>
                  </div>
                  <div>
                    <div className="text-primary text-xs font-semibold uppercase tracking-[0.18em]">
                      Solution
                    </div>
                    <p className="text-muted-foreground mt-2 leading-6">
                      {study.solution}
                    </p>
                  </div>
                </div>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  {study.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="border-border bg-background/40 rounded-lg border p-4"
                    >
                      <div className="text-primary text-2xl font-semibold">
                        {metric.value}
                      </div>
                      <div className="text-muted-foreground mt-1 text-xs leading-5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-border mt-7 border-t pt-6">
                  <Quote className="text-primary h-5 w-5" aria-hidden />
                  <p className="text-foreground mt-3 text-sm leading-6">
                    &quot;{study.quote}&quot;
                  </p>
                  <p className="text-muted-foreground mt-4 text-sm">
                    {study.author}, {study.role}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <Card className="gold-card p-8 text-center sm:p-10">
          <FadeUp>
            <Badge variant="popular">Your first workflow</Badge>
            <h2 className="text-foreground mx-auto mt-5 max-w-3xl text-h2 font-medium">
              Bring one real workflow and leave with a practical rollout path.
            </h2>
            <p className="text-foreground/75 mx-auto mt-5 max-w-2xl text-lead">
              A demo is the fastest way to see which Kaizen pattern maps to
              your team&apos;s current operating friction.
            </p>
            <Button asChild size="xl" className="mt-8">
              <Link href="/demo">Request a demo</Link>
            </Button>
          </FadeUp>
        </Card>
      </MarketingSection>
    </main>
  );
}
