import type { Metadata } from "next";
import Link from "next/link";
import { Headphones, PhoneCall, ShieldCheck } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { VoiceDemoPanel } from "@/components/demo/VoiceDemoPanel";

export const metadata: Metadata = {
  title: "Live Voice Agent Demo",
  description:
    "Hear how Kaizen AI voice agents answer calls, handle enquiries, and book appointments in a simulated live demo.",
};

const demoPoints = [
  {
    icon: PhoneCall,
    title: "Natural call handling",
    description:
      "The agent answers quickly, understands the caller, and keeps the conversation moving.",
  },
  {
    icon: Headphones,
    title: "Booking-ready flow",
    description:
      "It checks intent, captures details, offers next steps, and confirms the appointment path.",
  },
  {
    icon: ShieldCheck,
    title: "Safe escalation",
    description:
      "When the call needs a human, Kaizen can hand off with context instead of dropping the lead.",
  },
];

export default function DemoPage() {
  return (
    <main id="main" className="relative">
      <MarketingHero
        eyebrow="AI Voice Agent · Live Demo"
        title={
          <>
            Hear the agent your customers would{" "}
            <span className="text-primary">speak to first</span>
          </>
        }
        subtitle="A simulated live voice-agent experience showing how Kaizen answers, understands intent, offers appointment slots, and confirms the booking."
        actions={[
          { label: "Book a real demo", href: "/book-demo" },
          { label: "See voice agents", href: "/solutions/voice-agents", variant: "outline" },
        ]}
      >
        <VoiceDemoPanel />
      </MarketingHero>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="What to listen for"
            title={
              <>
                A phone experience that feels{" "}
                <span className="text-primary">useful, not robotic</span>
              </>
            }
            subtitle="Kaizen voice agents are designed around caller intent, business knowledge, escalation rules, and booking outcomes."
          />
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-5 md:grid-cols-3">
          {demoPoints.map((point) => {
            const Icon = point.icon;
            return (
              <StaggerItem key={point.title}>
                <Card className="h-full p-7 transition-colors hover:border-primary/40">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
                    {point.title}
                  </h2>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {point.description}
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
            <Badge variant="popular">Ready for your own script?</Badge>
            <h2 className="mx-auto mt-5 max-w-3xl text-h2 font-medium text-foreground">
              We can map a voice agent around your real callers.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lead text-foreground/75">
              Bring your FAQs, booking rules, and handoff moments. We will show
              how the first production call flow should work.
            </p>
            <Button asChild size="xl" className="mt-8">
              <Link href="/book-demo">Book demo</Link>
            </Button>
          </FadeUp>
        </Card>
      </MarketingSection>
    </main>
  );
}
