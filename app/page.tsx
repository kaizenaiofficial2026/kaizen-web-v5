import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { PositioningStory } from "@/components/sections/PositioningStory";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { SimpleProcess } from "@/components/sections/SimpleProcess";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { FadeUp } from "@/components/motion/FadeUp";
import { industriesOverview } from "@/lib/content/industries";

export const metadata: Metadata = {
  title: "KaizenAI — The Future of Agentic AI, Delivered Today",
  description:
    "KaizenAI designs and delivers custom AI systems for businesses across every industry. AI receptionists, sales agents, workflow automation, and more in 30 days.",
};

const stats = [
  {
    value: "14–20 Days",
    label: "Target delivery timeline",
  },
  {
    value: "24/7/365",
    label: "AI systems working beyond business hours",
  },
  {
    value: "+35%",
    label: "Potential uplift from faster lead response",
  },
  {
    value: "9+",
    label: "Industries mapped for AI automation",
  },
];

export default function Home() {
  return (
    <main id="main" className="relative">
      <Hero />
      <PositioningStory />
      <LogoCloud />

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
          {industriesOverview.map((industry, index) => (
            <StaggerItem
              key={industry.slug}
              className={`h-full ${
                index === industriesOverview.length - 1
                  ? "min-[360px]:col-span-2 min-[360px]:mx-auto min-[360px]:w-[calc((100%_-_0.75rem)_/_2)] md:col-span-1 md:w-full"
                  : ""
              }`}
            >
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

      <MarketingSection
        id="outcomes"
        ambient={false}
        containerClassName="max-w-7xl"
      >
        <FadeUp>
          <SectionHeader
            title="Built Around Results"
            subtitle="Every engagement starts with one question: where is your business losing time, leads, or efficiency?"
            className="[&_h2]:mt-0"
          />
        </FadeUp>
        <StaggerGrid className="mt-10 grid grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.value} className="h-full">
              <Card className="grid min-h-[150px] h-full place-items-center overflow-hidden p-4 text-center transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/36 hover:shadow-[0_24px_84px_-56px_rgba(240,234,216,0.65)] sm:min-h-[188px] sm:p-6">
                <div className="mx-auto flex w-full max-w-[15rem] flex-col items-center justify-center text-center">
                  <div className="w-full whitespace-nowrap text-center text-[clamp(1.45rem,6vw,2.75rem)] font-semibold leading-none tracking-tight text-[#F0EAD8] drop-shadow-[0_0_18px_rgba(240,234,216,0.32)] [text-shadow:0_0_24px_rgba(240,234,216,0.26),0_0_42px_rgba(196,154,48,0.2)]">
                    {stat.value}
                  </div>
                  <p className="mx-auto mt-3 max-w-[12rem] text-center text-xs leading-5 text-muted-foreground/85 sm:mt-4 sm:text-sm sm:leading-6">
                    {stat.label}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <CTA />
      <FAQ />
    </main>
  );
}
