import type { Metadata } from "next";
import Link from "next/link";
import { Bot, CalendarClock, PhoneCall } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Kaizen AI pricing for chatbot, voice agent, and custom automation rollouts.",
};

const previewItems = [
  {
    title: "Chatbot plans",
    description: "Website, WhatsApp, and social DM coverage for everyday enquiries.",
    icon: Bot,
  },
  {
    title: "Voice agent plans",
    description: "Inbound call handling, missed-call recovery, and booking support.",
    icon: PhoneCall,
  },
  {
    title: "Custom scope",
    description: "Enterprise workflows, CRM integrations, and dedicated rollout support.",
    icon: CalendarClock,
  },
];

export default function PricingPage() {
  return (
    <main id="main" className="relative">
      <MarketingHero
        eyebrow="Pricing"
        title={
          <>
            Pricing is being prepared for{" "}
            <span className="text-primary">your launch path</span>
          </>
        }
        subtitle="We are shaping the dedicated pricing page around chatbot plans, voice agent packages, included usage, setup scope, and custom rollout options."
        actions={[
          { label: "Book a demo", href: "/demo" },
          { label: "Explore solutions", href: "/solutions", variant: "outline" },
        ]}
      >
        <Card className="relative overflow-hidden p-6 shadow-card">
          <Badge variant="popular">Coming soon</Badge>
          <div className="mt-6 rounded-xl border border-border bg-background/45 p-5">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Preview
            </p>
            <div className="mt-5 space-y-4">
              {["AI Chatbot", "AI Voice Agent", "Enterprise"].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="font-semibold text-foreground">{label}</span>
                  <span className="text-sm text-primary">Drafting</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </MarketingHero>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="What to expect"
            title={
              <>
                Clear packages without{" "}
                <span className="text-primary">surprise scope</span>
              </>
            }
            subtitle="The final page will separate monthly retainers, included usage, setup, integrations, and the moments where a custom quote makes more sense."
          />
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-5 md:grid-cols-3">
          {previewItems.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <Card className="h-full p-7 transition-colors hover:border-primary/40">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <Card className="gold-card p-8 text-center sm:p-10">
          <FadeUp>
            <Badge>Need numbers now?</Badge>
            <h2 className="mx-auto mt-5 max-w-3xl text-h2 font-medium text-foreground">
              We can scope the right first package on a short strategy call.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lead text-foreground/75">
              Bring your channels, rough enquiry volume, and launch target. We
              will map the first agent and the budget range.
            </p>
            <Button asChild size="xl" className="mt-8">
              <Link href="/demo">Book a demo</Link>
            </Button>
          </FadeUp>
        </Card>
      </MarketingSection>
    </main>
  );
}
