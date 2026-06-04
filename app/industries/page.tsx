import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { industriesOverview } from "@/lib/content/industries";

export const metadata: Metadata = {
  title: "Industries — KaizenAI",
  description:
    "Explore how KaizenAI builds custom AI systems for your industry. From healthcare to ecommerce, we identify and solve your biggest operational challenges with AI.",
};

export default function IndustriesPage() {
  return (
    <main id="main" className="relative overflow-hidden">
      <MarketingHero
        eyebrow="Industries"
        title="Choose Your Industry"
        subtitle="KaizenAI builds custom AI systems that solve the real operational problems your business faces every day. Select your industry to see exactly what we can automate for you."
      />

      <MarketingSection className="pt-0" containerClassName="max-w-7xl">
        <StaggerGrid className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industriesOverview.map((industry) => (
            <StaggerItem key={industry.slug}>
              <Link href={industry.href} className="group block h-full">
                <Card className="relative flex h-full flex-col overflow-hidden p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow">
                  <div className="flex items-start justify-end gap-4">
                    <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                  <h2 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                    {industry.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {industry.description}
                  </p>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection className="pt-0">
        <Card className="gold-card p-8 text-center sm:p-10">
          <FadeUp>
            <h2 className="mx-auto max-w-3xl text-h3 font-semibold text-foreground">
              Don&apos;t see your industry? Book a consultation and we&apos;ll
              map what&apos;s possible for your specific business.
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
