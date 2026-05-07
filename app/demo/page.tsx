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

const demoHref = `mailto:${siteConfig.salesEmail}?subject=Book%20a%20Kaizen%20AI%20strategy%20call`;

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description:
    "Book a Kaizen AI strategy call to plan your chatbot, voice agent, missed-call recovery, and appointment booking rollout.",
};

export default function DemoPage() {
  return (
    <main id="main" className="relative">
      <MarketingHero
        eyebrow="Book a strategy call"
        title={
          <>
            Find the leads your business is{" "}
            <span className="text-primary">losing today</span>
          </>
        }
        subtitle="A focused call to map missed calls, slow replies, booking gaps, and the fastest AI agent to launch first."
        actions={[
          { label: "Email the team", href: demoHref },
          { label: "Explore solutions", href: "/solutions", variant: "outline" },
        ]}
      >
        <Card className="relative overflow-hidden p-6 shadow-card">
          <Badge>20 minute strategy call</Badge>
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
              Best fit for businesses that rely on phone calls, website chat,
              WhatsApp, social DMs, or appointment bookings to convert demand.
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
                A call built around{" "}
                <span className="text-primary">your customer flow</span>
              </>
            }
            subtitle="No generic tour. The session starts with where customers reach you and ends with a practical first launch scope."
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
                  Bring the missed-call problem.{" "}
                  <span className="text-primary">We will map the fix.</span>
                </>
              }
              subtitle="The best conversations are practical: one channel, clear customer questions, and a measurable booking outcome."
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
              Book the call with the team that will own the rollout.
            </h2>
            <p className="text-foreground/75 mx-auto mt-5 max-w-2xl text-lead">
              We will reply through {siteConfig.salesEmail} and coordinate a
              time to review your channels, customers, and launch timeline.
            </p>
            <Button asChild size="xl" className="mt-8">
              <Link href={demoHref}>
                <Mail aria-hidden />
                Email the team
              </Link>
            </Button>
          </FadeUp>
        </Card>
      </MarketingSection>
    </main>
  );
}
