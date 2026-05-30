import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Newspaper, Sparkles } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Grain } from "@/components/primitives/Grain";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

type Article = {
  category: string;
  title: string;
  readTime: string;
  link: string;
  excerpt?: string;
  meta?: string;
  visual: string;
};

const externalArticleUrl = "https://medium.com/";

const featuredArticle: Article = {
  title: "How AI Voice Agents Help Businesses Recover Missed Revenue",
  category: "AI Voice Agents",
  readTime: "5 min read",
  meta: "5 min read · AI Voice Agents · Coming soon",
  link: externalArticleUrl,
  excerpt:
    "A practical look at how AI can answer calls, follow up with leads, and turn missed enquiries into booked opportunities.",
  visual:
    "radial-gradient(circle at 20% 20%, rgba(236,212,121,0.4), transparent 32%), radial-gradient(circle at 78% 30%, rgba(201,160,61,0.25), transparent 34%), linear-gradient(135deg, rgba(26,22,12,0.98), rgba(8,7,5,0.98))",
};

const articles: Article[] = [
  {
    title: "AI Chat Agents vs Traditional Chatbots: What Businesses Need to Know",
    category: "AI Chat Agents",
    readTime: "4 min read",
    link: externalArticleUrl,
    visual:
      "radial-gradient(circle at 18% 18%, rgba(201,160,61,0.28), transparent 35%), linear-gradient(145deg, rgba(25,22,15,0.96), rgba(7,6,5,0.98))",
  },
  {
    title: "Why Slow Replies Kill Sales Before Your Team Even Speaks",
    category: "Lead Conversion",
    readTime: "3 min read",
    link: externalArticleUrl,
    visual:
      "radial-gradient(circle at 82% 20%, rgba(236,212,121,0.24), transparent 34%), linear-gradient(145deg, rgba(18,17,12,0.96), rgba(6,5,4,0.98))",
  },
  {
    title: "How WhatsApp AI Automation Can Improve Customer Response Times",
    category: "WhatsApp Automation",
    readTime: "5 min read",
    link: externalArticleUrl,
    visual:
      "radial-gradient(circle at 22% 78%, rgba(201,160,61,0.25), transparent 34%), linear-gradient(145deg, rgba(21,18,12,0.96), rgba(7,6,5,0.98))",
  },
  {
    title: "The Future of Customer Support Is Human-Like AI",
    category: "Customer Experience",
    readTime: "4 min read",
    link: externalArticleUrl,
    visual:
      "radial-gradient(circle at 72% 72%, rgba(236,212,121,0.22), transparent 36%), linear-gradient(145deg, rgba(24,21,15,0.96), rgba(8,7,5,0.98))",
  },
  {
    title: "How AI Follow-Ups Help Convert More Leads Into Appointments",
    category: "Sales Automation",
    readTime: "5 min read",
    link: externalArticleUrl,
    visual:
      "radial-gradient(circle at 30% 22%, rgba(201,160,61,0.28), transparent 34%), linear-gradient(145deg, rgba(20,17,12,0.96), rgba(7,6,5,0.98))",
  },
  {
    title: "What to Prepare Before Building an AI Agent for Your Business",
    category: "AI Strategy",
    readTime: "6 min read",
    link: externalArticleUrl,
    visual:
      "radial-gradient(circle at 76% 24%, rgba(236,212,121,0.24), transparent 35%), linear-gradient(145deg, rgba(25,21,13,0.96), rgba(7,6,5,0.98))",
  },
  {
    title: "Using AI to Reduce Missed Calls, Missed Messages, and Missed Sales",
    category: "Business Growth",
    readTime: "4 min read",
    link: externalArticleUrl,
    visual:
      "radial-gradient(circle at 18% 68%, rgba(201,160,61,0.25), transparent 36%), linear-gradient(145deg, rgba(22,19,13,0.96), rgba(7,6,5,0.98))",
  },
  {
    title: "How Small Businesses Can Use AI Without Hiring a Full Tech Team",
    category: "SME Automation",
    readTime: "5 min read",
    link: externalArticleUrl,
    visual:
      "radial-gradient(circle at 80% 70%, rgba(236,212,121,0.22), transparent 34%), linear-gradient(145deg, rgba(24,20,12,0.96), rgba(7,6,5,0.98))",
  },
];

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas, insights, and strategies from Kaizen AI on chat agents, voice agents, lead automation, and customer experience.",
};

export default function BlogPage() {
  return (
    <main id="main" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(70% 45% at 50% 0%, rgba(201,160,61,0.16) 0%, rgba(201,160,61,0.04) 42%, rgba(10,9,7,0) 74%)",
        }}
      />
      <Grain />

      <section className="relative pb-14 pt-32 sm:pb-16 sm:pt-40">
        <Container size="wide">
          <FadeUp className="max-w-5xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/60 px-4 py-1.5 text-sm font-semibold text-foreground/85 backdrop-blur-md">
              <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
              Kaizen AI Blog
            </span>
            <h1 className="mt-7 max-w-5xl text-h1 font-medium text-foreground">
              Ideas, insights, and strategies for{" "}
              <span className="text-primary">AI-powered business growth.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lead text-foreground/72">
              Practical guides on AI chat agents, voice agents, lead automation,
              sales workflows, and customer experience.
            </p>
          </FadeUp>
        </Container>
      </section>

      <section className="relative py-10 sm:py-14">
        <Container size="wide">
          <FadeUp>
            <a
              href={featuredArticle.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${featuredArticle.title}. Opens external article.`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Card className="grid overflow-hidden rounded-[1.75rem] border-primary/24 bg-card/55 shadow-[0_38px_130px_-70px_rgba(201,160,61,0.95)] transition-[border-color,transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-primary/55 group-hover:shadow-[0_42px_150px_-72px_rgba(201,160,61,1)] lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-72 overflow-hidden p-6 sm:min-h-96 sm:p-8">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ backgroundImage: featuredArticle.visual }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-45"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(201,160,61,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(201,160,61,0.12) 1px, transparent 1px)",
                      backgroundSize: "42px 42px",
                    }}
                  />
                  <div className="relative flex h-full min-h-60 flex-col justify-between">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-black/35 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-md">
                      Featured
                    </span>
                    <div className="grid h-20 w-20 place-items-center rounded-3xl border border-primary/25 bg-primary/12 text-primary shadow-[0_26px_70px_-38px_rgba(201,160,61,1)]">
                      <Newspaper className="h-9 w-9" aria-hidden />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-primary">
                      <span>{featuredArticle.meta}</span>
                    </div>
                    <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                      {featuredArticle.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors group-hover:text-accent">
                    Read on Medium
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Card>
            </a>
          </FadeUp>
        </Container>
      </section>

      <section className="relative py-12 sm:py-16 lg:py-20">
        <Container size="wide">
          <FadeUp className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Badge>Latest Articles</Badge>
              <h2 className="mt-4 text-h2 font-medium text-foreground">
                Fresh thinking for always-on growth.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right">
              Placeholder links point to Medium for now. The data is ready to
              swap with future Medium, Reddit, or custom article sources.
            </p>
          </FadeUp>

          <StaggerGrid className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {articles.map((article, index) => (
              <StaggerItem key={article.title}>
                <ArticleCard article={article} index={index} />
              </StaggerItem>
            ))}
          </StaggerGrid>

          <FadeUp className="mt-10 flex justify-center">
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <a
                href={externalArticleUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View More Articles
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </FadeUp>
        </Container>
      </section>

      <section className="relative py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <Card className="gold-card overflow-hidden rounded-[1.75rem] border-primary/28 p-7 shadow-[0_34px_120px_-72px_rgba(201,160,61,0.95)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <FadeUp>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  From insight to implementation
                </span>
                <h2 className="mt-4 max-w-3xl text-h2 font-medium text-foreground">
                  Want to see AI working inside your business?
                </h2>
                <p className="mt-5 max-w-3xl text-lead text-foreground/75">
                  Book a strategy call and we&apos;ll show you how AI chat and
                  voice agents can help capture more leads, automate follow-ups,
                  and book more appointments.
                </p>
              </FadeUp>
              <FadeUp delay={0.08} className="flex flex-wrap gap-3">
                <Button asChild size="xl" className="w-full sm:w-auto">
                  <Link href="/book-demo">
                    Book a Call
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
                  <Link href="/solutions/voice-agents">
                    Explore AI Voice Agents
                  </Link>
                </Button>
              </FadeUp>
            </div>
          </Card>
        </Container>
      </section>
    </main>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${article.title}. Opens external article.`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[1.35rem] border-primary/18 bg-card/52 transition-[border-color,transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-primary/48 group-hover:shadow-[0_28px_100px_-58px_rgba(201,160,61,0.92)]">
        <div className="relative min-h-36 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ backgroundImage: article.visual }}
          />
          <div className="relative flex h-full min-h-36 items-end justify-between p-4">
            <span className="rounded-full border border-primary/22 bg-black/35 px-3 py-1 text-xs font-bold text-primary backdrop-blur-md">
              {String(index + 1).padStart(2, "0")}
            </span>
            <ExternalLink
              className="h-4 w-4 text-primary opacity-70 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
            <span>{article.category}</span>
            <span className="h-1 w-1 rounded-full bg-primary/55" />
            <span>{article.readTime}</span>
          </div>
          <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-foreground">
            {article.title}
          </h3>
          <span className="mt-auto pt-6 text-sm font-bold text-foreground/68 transition-colors group-hover:text-primary">
            Read article
          </span>
        </div>
      </Card>
    </a>
  );
}
