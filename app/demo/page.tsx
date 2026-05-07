import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import {
  demoAgenda,
  demoOutcomes,
  demoProofPoints,
  demoVisualSteps,
} from "@/lib/content/demo";
import { siteConfig } from "@/lib/content/site";

const demoHref = `mailto:${siteConfig.salesEmail}?subject=Request%20Kaizen%20AI%20demo`;

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "Request a Kaizen AI demo and see how adaptive workflows can fit your team's tools, controls, and operating rhythm.",
};

export default function DemoPage() {
  return (
    <main id="main" className="relative">
      <MarketingHero
        eyebrow="Request a demo"
        title={
          <>
            See where Kaizen can remove{" "}
            <span className="text-primary">your team&apos;s friction</span>
          </>
        }
        subtitle="A focused walkthrough for teams ready to connect real tools, automate high-friction loops, and launch AI workflows with control."
        actions={[
          { label: "Email sales", href: demoHref },
          { label: "Explore solutions", href: "/solutions", variant: "outline" },
        ]}
      >
        <Card className="relative overflow-hidden p-6 shadow-card">
          <Badge>30 minute walkthrough</Badge>
          <div className="mt-6 grid gap-3">
            {demoVisualSteps.map((step, index) => {
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
          <div className="border-border mt-6 rounded-xl border p-5">
            <p className="text-muted-foreground text-sm leading-6">
              Best fit for teams with a repeatable workflow, a clear owner, and
              a goal to launch the first automation this month.
            </p>
          </div>
        </Card>
      </MarketingHero>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="What happens"
            title={
              <>
                A demo built around{" "}
                <span className="text-primary">your workflow</span>
              </>
            }
            subtitle="No generic tour. The session starts with your operating friction and ends with a practical next step."
          />
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-5 md:grid-cols-3">
          {demoAgenda.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <Card className="hover:border-primary/40 h-full p-7 transition-colors">
                  <div className="border-primary/30 bg-primary/10 text-primary grid h-12 w-12 place-items-center rounded-xl border">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h2 className="text-foreground mt-6 text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground mt-3 leading-7">
                    {item.description}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <FadeUp>
            <SectionHeader
              align="start"
              eyebrow="Good fit"
              title={
                <>
                  Bring the messy workflow.{" "}
                  <span className="text-primary">We will map it.</span>
                </>
              }
              subtitle="The best demo conversations are practical: one workflow, a few systems, and a measurable outcome."
            />
            <ul className="mt-8 space-y-3">
              {demoOutcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="text-foreground/85 flex items-center gap-3"
                >
                  <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                  {outcome}
                </li>
              ))}
            </ul>
          </FadeUp>
          <StaggerGrid className="grid gap-4 sm:grid-cols-3">
            {demoProofPoints.map((point) => {
              const Icon = point.icon;
              return (
                <StaggerItem key={point.title}>
                  <Card className="hover:border-primary/30 h-full p-6 transition-colors">
                    <div className="bg-primary/15 text-primary grid h-10 w-10 place-items-center rounded-lg">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h2 className="text-foreground mt-5 text-xl font-semibold tracking-tight">
                      {point.title}
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm leading-6">
                      {point.description}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </MarketingSection>

      <MarketingSection>
        <Card className="gold-card p-8 text-center sm:p-10">
          <FadeUp>
            <Badge variant="popular">Ready when you are</Badge>
            <h2 className="text-foreground mx-auto mt-5 max-w-3xl text-h2 font-medium">
              Request a Kaizen AI demo with the team that will own the rollout.
            </h2>
            <p className="text-foreground/75 mx-auto mt-5 max-w-2xl text-lead">
              We will reply through {siteConfig.salesEmail} and coordinate a
              time that works for your operators, builders, and decision makers.
            </p>
            <Button asChild size="xl" className="mt-8">
              <Link href={demoHref}>
                <Mail aria-hidden />
                Email sales
              </Link>
            </Button>
          </FadeUp>
        </Card>
      </MarketingSection>
    </main>
  );
}
