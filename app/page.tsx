import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { SimpleProcess } from "@/components/sections/SimpleProcess";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { FadeUp } from "@/components/motion/FadeUp";
import { blogPosts } from "@/lib/content/blog";
import { industriesOverview } from "@/lib/content/industries";

export const metadata: Metadata = {
  title: "KaizenAI — The Future of Agentic AI, Delivered Today",
  description:
    "KaizenAI designs and delivers custom AI systems for businesses across every industry. AI receptionists, sales agents, workflow automation, and more in 30 days.",
};

const stats = [
  {
    value: "30 Days",
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
  const previewPosts = blogPosts.slice(0, 3);

  return (
    <main id="main" className="relative">
      <Hero />
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

        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industriesOverview.map((industry) => (
            <StaggerItem key={industry.slug}>
              <Link href={industry.href} className="group block h-full">
                <Card className="relative grid min-h-[128px] place-items-center overflow-hidden p-6 text-center transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow sm:min-h-[144px]">
                  <ArrowRight
                    aria-hidden
                    className="absolute right-5 top-5 h-4 w-4 text-primary/55 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                  <h3 className="max-w-[13rem] text-xl font-semibold tracking-tight text-foreground">
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
        <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.value}>
              <Card className="h-full overflow-hidden p-6 text-center transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_80px_-58px_rgba(201,160,61,0.88)] sm:p-7">
                <div className="text-[clamp(2.4rem,5vw,3.75rem)] font-semibold leading-none tracking-tight text-primary">
                  {stat.value}
                </div>
                <p className="mx-auto mt-4 max-w-[12rem] text-sm leading-6 text-muted-foreground">
                  {stat.label}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection
        id="insights"
        ambient={false}
        containerClassName="max-w-7xl"
      >
        <FadeUp className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            title="From The Front Lines of AI"
            align="start"
            className="mx-0 [&_h2]:mt-0"
          />
          <Button asChild variant="outline" size="lg" className="rounded-xl">
            <Link href="/blog">
              Read The Blog
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </FadeUp>

        <StaggerGrid className="mt-10 grid gap-5 md:grid-cols-3">
          {previewPosts.map((post, index) => (
            <StaggerItem key={post.title}>
              <Card className="flex h-full flex-col p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/40">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  {index === 0 ? "Featured" : post.category}
                </span>
                <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-foreground">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="mt-auto pt-6 text-sm font-bold text-foreground/68">
                  {post.readTime}
                </span>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
