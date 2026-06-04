import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

export const metadata: Metadata = {
  title: "About — KaizenAI",
  description:
    "KaizenAI is an Agentic AI consultancy and delivery company. We identify, design, build, and deliver custom AI systems for businesses in 30 days.",
};

const values = [
  {
    title: "Outcomes Over Tools",
    description:
      "We don't sell products. We solve problems. Every system we build is measured against one thing: does it deliver the business outcome the client needs?",
  },
  {
    title: "Custom Over Generic",
    description:
      "No templates. No off-the-shelf tools rebranded as custom solutions. Every AI system is designed and built specifically for your business, your workflow, and your goals.",
  },
  {
    title: "Partnership Over Transactions",
    description:
      "We don't disappear after launch. We stay on, monitor performance, and continuously improve every system we build.",
  },
];

const systems = [
  "AI Receptionists",
  "AI Sales Agents",
  "AI Customer Support Agents",
  "Lead Qualification Systems",
  "Appointment Booking Systems",
  "CRM Automation",
  "Workflow Automation",
  "Internal AI Assistants",
  "Recruitment Automation",
  "Reporting Automation",
  "AI Mobile Applications",
  "Industry-Specific AI Systems",
];

export default function AboutPage() {
  return (
    <main id="main" className="relative overflow-hidden">
      <MarketingHero
        eyebrow="About KaizenAI"
        title="We Are KaizenAI."
        subtitle="A team of AI consultants, architects, and builders helping businesses identify opportunities for intelligent automation, design the right systems, and deliver them fully integrated in 30 days."
        actions={[{ label: "Book Consultation", href: "/contact#book" }]}
      />

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="Our Mission"
            title="We Identify. We Design. We Build. We Deliver."
            subtitle="KaizenAI exists to make Agentic AI accessible to every business, not just enterprises with large tech teams. We take the complexity out of AI implementation and deliver systems that work from day one. The client describes the problem and the outcome they want. We do everything else."
          />
        </FadeUp>
      </MarketingSection>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="What We Stand For"
            title="Built on Three Principles"
          />
        </FadeUp>
        <StaggerGrid className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <Card className="h-full p-7 transition-colors hover:border-primary/40">
                <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <FadeUp>
          <SectionHeader eyebrow="Our Work" title="The AI Systems We Build" />
        </FadeUp>
        <StaggerGrid className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((system) => (
            <StaggerItem key={system}>
              <Card className="flex h-full items-center gap-3 p-5 transition-colors hover:border-primary/40">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                <span className="font-semibold text-foreground">{system}</span>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <Card className="gold-card p-8 text-center sm:p-10">
          <FadeUp>
            <h2 className="mx-auto max-w-3xl text-h2 font-medium text-foreground">
              Ready to See What AI Can Do For Your Business?
            </h2>
            <Button asChild size="xl" className="mt-8">
              <Link href="/contact#book">
                Book Consultation
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </FadeUp>
        </Card>
      </MarketingSection>
    </main>
  );
}
