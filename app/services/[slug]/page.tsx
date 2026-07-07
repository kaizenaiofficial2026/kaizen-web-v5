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
  getService,
  serviceSlugs,
  services,
  type ServicePageContent,
} from "@/lib/content/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

function HeroServicePanel({ service }: { service: ServicePageContent }) {
  return (
    <Card className="gold-card h-full p-5 shadow-[0_30px_100px_-70px_rgba(201,160,61,0.9)] sm:p-6 lg:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Built Around Your Workflow
      </p>
      <div className="mt-6 grid gap-3">
        {service.buildFocus.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-xl border border-primary/18 bg-background/45 p-3"
          >
            <CheckCircle2
              aria-hidden
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
            />
            <span className="text-sm font-medium leading-6 text-foreground/78">
              {item}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <main id="main" className="relative overflow-hidden">
      <MarketingHero
        eyebrow="Core Service"
        containerSize="wide"
        containerClassName="lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.78fr)] xl:gap-14"
        title={
          <span className="block text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.04]">
            {service.title}
          </span>
        }
        subtitle={
          <span className="block text-[clamp(0.95rem,1.05vw,1.125rem)] leading-7">
            {service.summary}
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
        <HeroServicePanel service={service} />
      </MarketingHero>

      <MarketingSection containerClassName="max-w-7xl">
        <FadeUp>
          <SectionHeader
            title="What This Solves"
            subtitle="We design every system around the real operational friction inside your business."
            className="[&_h2]:mt-0"
          />
        </FadeUp>

        <StaggerGrid className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {service.outcomes.map((outcome) => (
            <StaggerItem key={outcome} className="h-full">
              <Card className="h-full p-5 transition-colors hover:border-primary/42 sm:p-6">
                <CheckCircle2
                  aria-hidden
                  className="h-5 w-5 text-primary"
                />
                <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-foreground">
                  {outcome}
                </h3>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection containerClassName="max-w-7xl">
        <FadeUp>
          <SectionHeader
            title="Explore More Services"
            subtitle="Each service can stand alone or combine into one connected AI system for your operation."
            className="[&_h2]:mt-0"
          />
        </FadeUp>

        <StaggerGrid className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {otherServices.slice(0, 4).map((item) => (
            <StaggerItem key={item.href} className="h-full">
              <Link href={item.href} className="group block h-full">
                <Card className="flex h-full min-h-32 items-end p-5 transition-[border-color,transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-primary/42 group-hover:shadow-glow sm:p-6">
                  <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
                    {item.title}
                  </h3>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <Card className="gold-card p-8 text-center sm:p-10">
          <FadeUp>
            <h2 className="mx-auto max-w-3xl text-h2 font-medium text-foreground">
              Ready To Build This Around Your Business?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lead text-foreground/75">
              We will map your workflow, identify the fastest ROI opportunities,
              and design the AI-integrated system your team actually needs.
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
