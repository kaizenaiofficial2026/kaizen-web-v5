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
    value: "30",
    label: "Days average delivery target from consultation to launch",
  },
  {
    value: "24/7",
    label: "Continuous operation. Your AI never sleeps, never stops",
  },
  {
    value: "9+",
    label: "Industries served with custom-built AI systems",
  },
  {
    value: "100%",
    label: "Custom workflow design. No templates, no generic tools",
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
        <FadeUp className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Industries"
            title="What Kind of Business Are You?"
            subtitle="Choose your industry and see exactly how KaizenAI solves your specific problems."
            align="start"
            className="mx-0"
          />
          <Button asChild variant="outline" size="lg" className="rounded-xl">
            <Link href="/industries">
              View All Industries
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </FadeUp>

        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industriesOverview.map((industry) => (
            <StaggerItem key={industry.slug}>
              <Link href={industry.href} className="group block h-full">
                <Card className="relative h-full overflow-hidden p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow">
                  <div className="flex items-start justify-end gap-4">
                    <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
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
            eyebrow="Outcomes"
            title="Built Around Results"
            subtitle="Every engagement is measured against operational outcomes your team can feel."
          />
        </FadeUp>
        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.value}>
              <Card className="h-full p-6 text-center transition-colors hover:border-primary/40">
                <div className="text-5xl font-semibold tracking-tight text-primary">
                  {stat.value}
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
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
            eyebrow="Insights"
            title="From The Front Lines of AI"
            align="start"
            className="mx-0"
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
