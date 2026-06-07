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
import {
  getIndustry,
  industries,
  type IndustryPainPoint,
} from "@/lib/content/industries";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

const engagementSteps = [
  {
    title: "AI Opportunity Audit",
    description:
      "We map your operations and pinpoint the highest-ROI AI opportunities. Free to start.",
    badge: "FREE",
  },
  {
    title: "Build & Deploy",
    description:
      "We custom-build and integrate the AI system into the tools you already use.",
  },
  {
    title: "Train & Enable",
    description:
      "We train your team to run the system with confidence, so it actually gets used.",
  },
  {
    title: "Manage & Optimize",
    description:
      "We monitor, improve, and add new automations as your business grows.",
  },
];

function HeroPainPointGrid({ painPoints }: { painPoints: IndustryPainPoint[] }) {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:max-w-[44rem]">
      {painPoints.map((point, index) => (
        <Card
          key={point.title}
          className="h-full p-4 transition-colors hover:border-primary/40 sm:p-5"
        >
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs"
          >
            Pain point #{index + 1}
          </span>
          <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
            {point.title}
          </h3>
          <p className="mt-2 text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
            {point.description}
          </p>
        </Card>
      ))}
    </div>
  );
}

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

  return (
    <main id="main" className="relative overflow-hidden">
      <MarketingHero
        eyebrow={industry.label}
        containerSize="wide"
        containerClassName="lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-14"
        title={
          <span className="block text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.04]">
            {industry.title}
          </span>
        }
        subtitle={
          <span className="block text-[clamp(0.95rem,1.05vw,1.125rem)] leading-7">
            {industry.subtitle}
          </span>
        }
        actions={[
          { label: "Book Free Consultation", href: "/contact#book" },
          {
            label: "Talk to AI Representative",
            href: "/contact",
            variant: "outline",
          },
        ]}
      >
        <HeroPainPointGrid painPoints={industry.painPoints} />
      </MarketingHero>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            title="What We Build For You"
            subtitle="Each system is designed around your workflow, tools, channels, and handoff rules."
            className="[&_h2]:mt-0"
          />
        </FadeUp>
        <StaggerGrid className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industry.solutions.map((solution) => (
            <StaggerItem key={solution.title}>
              <Card className="h-full p-3 transition-colors hover:border-primary/40 sm:p-5">
                <CheckCircle2 className="h-4 w-4 text-primary sm:h-5 sm:w-5" aria-hidden />
                <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight text-foreground sm:mt-4 sm:text-lg">
                  {solution.title}
                </h3>
                <p className="mt-2 text-[13px] leading-5 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-6">
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
            title="How We Work With You"
            subtitle="From a free AI Opportunity Audit to ongoing optimization — one simple, proven path."
            className="[&_h2]:mt-0"
          />
        </FadeUp>
        <div className="relative mt-10">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
            {engagementSteps.map((step, index) => (
              <div key={step.title} className="contents">
                <Card className="relative z-10 h-full p-3 text-center transition-colors hover:border-primary/40 sm:p-4 lg:p-5">
                  <span className="mx-auto grid h-8 w-8 place-items-center rounded-full border border-primary/30 bg-background text-[11px] font-bold text-primary sm:h-9 sm:w-9 sm:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step.badge && (
                    <span className="mt-2 inline-flex rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-primary sm:mt-3 sm:px-2.5 sm:py-1 sm:text-[9px]">
                      {step.badge}
                    </span>
                  )}
                  <h3 className="mt-3 text-sm font-semibold leading-snug tracking-tight text-foreground sm:mt-4 sm:text-base lg:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-4 text-muted-foreground sm:text-xs sm:leading-5 lg:text-sm lg:leading-6">
                    {step.description}
                  </p>
                </Card>
                {index < engagementSteps.length - 1 && (
                  <div
                    aria-hidden
                    className="hidden items-center justify-center text-primary/55 lg:flex"
                  >
                    <span className="text-2xl leading-none">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
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
                Book Free Consultation
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </FadeUp>
        </Card>
      </MarketingSection>
    </main>
  );
}
