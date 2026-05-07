import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { blogPosts } from "@/lib/content/blog";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read Kaizen AI ideas on workflow design, AI operations, productivity, and security-first automation.",
};

export default function BlogPage() {
  return (
    <main id="main" className="relative">
      <MarketingHero
        eyebrow="Blog"
        title={
          <>
            Notes on building <span className="text-primary">better AI</span>{" "}
            workflows
          </>
        }
        subtitle="Practical essays for teams turning AI experiments into dependable operating systems."
        actions={[
          { label: "Book a demo", href: "/demo" },
          {
            label: "Contact the team",
            href: `mailto:${siteConfig.email}`,
            variant: "outline",
          },
        ]}
      >
        <Card className="overflow-hidden p-6 shadow-card">
          <div className="border-border bg-background/45 rounded-xl border p-5">
            <BookOpen className="text-primary h-8 w-8" aria-hidden />
            <h2 className="text-foreground mt-5 text-2xl font-semibold tracking-tight">
              Field notes for AI operators
            </h2>
            <p className="text-muted-foreground mt-3 leading-7">
              Strategy, workflow patterns, rollout lessons, and security
              practices from teams moving beyond one-off prompts.
            </p>
          </div>
        </Card>
      </MarketingHero>

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="Latest writing"
            title={
              <>
                Ideas for teams that want{" "}
                <span className="text-primary">compounding output</span>
              </>
            }
            subtitle="Fresh thinking on operating rhythm, rollout quality, and the practical systems that help AI work hold up in production."
          />
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-5 md:grid-cols-2">
          {blogPosts.map((post) => (
            <StaggerItem key={post.title}>
              <Card className="hover:border-primary/40 flex h-full flex-col p-7 transition-colors">
                <Badge>{post.category}</Badge>
                <h2 className="text-foreground mt-6 text-2xl font-semibold tracking-tight">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mt-4 leading-7">
                  {post.excerpt}
                </p>
                <div className="text-muted-foreground border-border mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-6 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" aria-hidden />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" aria-hidden />
                    {post.readTime}
                  </span>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection>
        <Card className="gold-card p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <FadeUp>
              <Badge variant="popular">From reading to rollout</Badge>
              <h2 className="text-foreground mt-5 max-w-3xl text-h2 font-medium">
                Want to see how these patterns map to your team?
              </h2>
              <p className="text-foreground/75 mt-5 max-w-2xl text-lead">
                Bring one workflow that keeps slipping. We will show how Kaizen
                would connect the context, approvals, and outcomes.
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <Button asChild size="xl">
                <Link href="/demo">Request a demo</Link>
              </Button>
            </FadeUp>
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
