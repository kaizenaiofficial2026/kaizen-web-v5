import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { PositioningStory } from "@/components/sections/PositioningStory";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { CoreServices } from "@/components/sections/CoreServices";
import { SimpleProcess } from "@/components/sections/SimpleProcess";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { FadeUp } from "@/components/motion/FadeUp";
import { industryAutomationPages } from "@/lib/content/industry-automation";

export const metadata: Metadata = {
  title: "KaizenAI — The Future of Agentic AI, Delivered Today",
  description:
    "KaizenAI designs and delivers custom AI systems for businesses across every industry. AI receptionists, sales agents, workflow automation, and more in 30 days.",
};

const homepageIndustries = industryAutomationPages.map((industry) => ({
  slug: industry.slug,
  name: industry.industryName,
  href: `/industries/${industry.slug}`,
}));

export default function Home() {
  return (
    <main id="main" className="relative">
      <Hero />
      <PositioningStory />
      <LogoCloud />
      <CoreServices />

      <MarketingSection
        id="industries"
        ambient={false}
        containerClassName="max-w-7xl"
      >
        <FadeUp>
          <SectionHeader
            title="What Kind of Business Are You?"
            subtitle="Choose your industry and explore where AI can remove bottlenecks, recover lost opportunities, and automate daily work."
            className="[&_h2]:mt-0"
          />
        </FadeUp>

        <StaggerGrid className="mt-10 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {homepageIndustries.map((industry) => (
            <StaggerItem key={industry.slug} className="h-full">
              <Link href={industry.href} className="group block h-full">
                <Card className="relative grid min-h-[108px] place-items-center overflow-hidden p-4 text-center transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow sm:min-h-[132px] sm:p-6 lg:min-h-[144px]">
                  <ArrowRight
                    aria-hidden
                    className="absolute right-4 top-4 h-4 w-4 text-primary/55 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-primary sm:right-5 sm:top-5"
                  />
                  <h3 className="max-w-[9rem] text-base font-semibold leading-tight tracking-tight text-foreground sm:max-w-[13rem] sm:text-xl">
                    {industry.name}
                  </h3>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <SimpleProcess />

      <CTA />
      <FAQ />
    </main>
  );
}
