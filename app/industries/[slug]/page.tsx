import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { ClinicsHealthcareIndustryPage } from "@/components/sections/industries/ClinicsHealthcareIndustryPage";
import { RetailEcommerceIndustryPage } from "@/components/sections/industries/RetailEcommerceIndustryPage";
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
    title: industry.eyebrow,
    description: industry.subtitle,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  if (industry.slug === "retail-ecommerce") {
    return <RetailEcommerceIndustryPage />;
  }

  if (industry.slug === "clinics-healthcare") {
    return <ClinicsHealthcareIndustryPage />;
  }

  return (
    <main id="main" className="relative">
      <MarketingHero
        eyebrow={industry.eyebrow}
        title={
          <>
            {industry.title}{" "}
            <span className="text-primary">{industry.accent}</span>
          </>
        }
        subtitle={industry.subtitle}
        actions={[
          { label: "Book a Call", href: "/book-demo" },
          { label: "See pricing", href: "/pricing", variant: "outline" },
        ]}
      >
        <Card className="relative overflow-hidden p-6 shadow-card">
          <div
            aria-hidden
            className="absolute inset-x-8 top-8 h-24 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative">
            <Badge>{industry.eyebrow}</Badge>
            <div className="mt-6 grid gap-3">
              {industry.signals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-xl border border-border bg-background/45 p-4 text-sm font-semibold text-foreground/80"
                >
                  {signal}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </MarketingHero>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="Workflows"
            title={
              <>
                Built for the questions your team handles{" "}
                <span className="text-primary">every day</span>
              </>
            }
            subtitle="Each AI workflow is configured around your services, response rules, and handoff points."
          />
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-5 md:grid-cols-3">
          {industry.workflows.map((workflow) => (
            <StaggerItem key={workflow}>
              <Card className="h-full p-7 transition-colors hover:border-primary/40">
                <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden />
                <p className="mt-5 leading-7 text-foreground/82">{workflow}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <Card className="gold-card p-8 sm:p-10">
          <SectionHeader
            eyebrow="Outcomes"
            title={
              <>
                Practical AI coverage without changing how{" "}
                <span className="text-primary">your team works</span>
              </>
            }
            subtitle="Start with the highest-volume enquiry path, then expand once the workflow is proven."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {industry.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="rounded-xl border border-foreground/10 bg-background/35 p-5 text-sm leading-6 text-foreground/78"
              >
                {outcome}
              </div>
            ))}
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
