import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { getIndustry, industries } from "@/lib/content/industries";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return {};
  }

  return {
    title: industry.metadataTitle,
    description: industry.metadataDescription,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  const workflow = [
    {
      label: "Customer",
      text: industry.workflow.customer,
    },
    {
      label: "KaizenAI AI System",
      text: industry.workflow.system,
    },
    {
      label: "Business Outcome",
      text: industry.workflow.outcome,
    },
  ];

  return (
    <main id="main" className="relative overflow-hidden">
      <MarketingHero
        eyebrow={industry.label}
        title={industry.title}
        subtitle={industry.subtitle}
        actions={[
          { label: "Book Consultation", href: "/contact#book" },
          { label: "All Industries", href: "/industries", variant: "outline" },
        ]}
      >
        <Card className="relative overflow-hidden p-6 shadow-card">
          <div
            aria-hidden
            className="absolute inset-x-8 top-8 h-24 rounded-full bg-primary/15 blur-3xl"
          />
          <div className="relative">
            <span className="text-5xl" aria-hidden>
              {industry.emoji}
            </span>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
              {industry.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {industry.description}
            </p>
          </div>
        </Card>
      </MarketingHero>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="Challenges"
            title="The Problems We Solve"
            subtitle="The first step is removing the repeat work, missed opportunities, and slow handoffs that quietly drain your team."
          />
        </FadeUp>
        <StaggerGrid className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industry.painPoints.map((point) => (
            <StaggerItem key={point.title}>
              <Card className="h-full p-6 transition-colors hover:border-primary/40">
                <span className="text-3xl" aria-hidden>
                  {point.emoji}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {point.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="Solutions"
            title="What We Build For You"
            subtitle="Each system is designed around your workflow, tools, channels, and handoff rules."
          />
        </FadeUp>
        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {industry.solutions.map((solution) => (
            <StaggerItem key={solution.title}>
              <Card className="h-full p-5 transition-colors hover:border-primary/40">
                <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {solution.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {solution.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="How It Works"
            title="From First Contact To Outcome"
            subtitle="A simple example of how the AI system turns an enquiry into a measurable business result."
          />
        </FadeUp>
        <div className="relative mt-10">
          <div
            aria-hidden
            className="absolute left-[12%] right-[12%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent lg:block"
          />
          <StaggerGrid className="grid gap-4 lg:grid-cols-3">
            {workflow.map((step, index) => (
              <StaggerItem key={step.label} className="relative">
                <Card className="relative z-10 h-full p-6 text-center transition-colors hover:border-primary/40">
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-primary/30 bg-background text-sm font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                    {step.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {step.text}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </MarketingSection>

      <MarketingSection>
        <Card className="gold-card p-8 text-center sm:p-10">
          <FadeUp>
            <h2 className="mx-auto max-w-3xl text-h2 font-medium text-foreground">
              {industry.ctaTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lead text-foreground/75">
              {industry.ctaText}
            </p>
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
