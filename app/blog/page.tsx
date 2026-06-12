import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Grain } from "@/components/primitives/Grain";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

type Article = {
  category: string;
  title: string;
  publishedTitle: string;
  readTime: string;
  date: string;
  platform: "LinkedIn Article" | "Medium";
  link: string | null;
  excerpt: string;
  meta?: string;
  cta: string;
  status: "published" | "scheduled" | "draft";
  visual: string;
};

const mediumProfileUrl = "https://medium.com/@kaizenaioffcial2026";

const featuredArticle: Article = {
  title: "How AI Automation Helps Businesses Recover Missed Revenue",
  publishedTitle:
    "How AI Automation Turns Missed Calls, Slow Replies, and Manual Follow-Ups Into Revenue Opportunities",
  category: "AI Automation",
  readTime: "5 min read",
  date: "12 June 2026",
  platform: "LinkedIn Article",
  meta: "5 min read · AI Automation · LinkedIn",
  link: "https://www.linkedin.com/pulse/how-ai-automation-turns-missed-calls-slow-replies-manual-j6dpc",
  excerpt:
    "AI automation helps businesses recover lost opportunities by turning missed calls, slow replies, and inconsistent follow-ups into faster business action.",
  cta: "Read on LinkedIn",
  status: "published",
  visual:
    "radial-gradient(circle at 20% 20%, rgba(236,212,121,0.4), transparent 32%), radial-gradient(circle at 78% 30%, rgba(201,160,61,0.25), transparent 34%), linear-gradient(135deg, rgba(26,22,12,0.98), rgba(8,7,5,0.98))",
};

const articles: Article[] = [
  {
    title: "AI Automation vs Traditional Software: What Businesses Need to Know",
    publishedTitle:
      "AI Automation vs Traditional Software: Why Businesses Need Systems That Think, Act, and Adapt",
    category: "AI Automation",
    readTime: "5 min read",
    date: "12 June 2026",
    platform: "Medium",
    link: "https://medium.com/@kaizenaioffcial2026/ai-automation-vs-traditional-software-why-businesses-need-systems-that-think-act-and-adapt-694b14f12d49",
    excerpt:
      "A practical breakdown of how AI automation differs from traditional software, where each approach fits, and why modern businesses need systems that can interpret, act, and adapt.",
    cta: "Read on Medium",
    status: "published",
    visual:
      "radial-gradient(circle at 18% 18%, rgba(201,160,61,0.28), transparent 35%), linear-gradient(145deg, rgba(25,22,15,0.96), rgba(7,6,5,0.98))",
  },
  {
    title: "Why Slow Workflows Kill Sales Before Your Team Even Responds",
    publishedTitle:
      "Why Slow Business Workflows Cost More Than Most Companies Realise",
    category: "Workflow Automation",
    readTime: "4 min read",
    date: "12 June 2026",
    platform: "LinkedIn Article",
    link: "https://www.linkedin.com/pulse/why-slow-business-workflows-cost-more-than-most-companies-bo8oc",
    excerpt:
      "Slow workflows quietly cost businesses revenue, time, visibility, and customer trust. Here's why operational delays matter more than most teams realise.",
    cta: "Read on LinkedIn",
    status: "published",
    visual:
      "radial-gradient(circle at 82% 20%, rgba(236,212,121,0.24), transparent 34%), linear-gradient(145deg, rgba(18,17,12,0.96), rgba(6,5,4,0.98))",
  },
  {
    title: "How AI Receptionists Improve Customer Response and Booking Speed",
    publishedTitle:
      "How AI Receptionists Are Changing the Way Businesses Handle Calls, Enquiries, and Appointments",
    category: "AI Receptionists",
    readTime: "5 min read",
    date: "12 June 2026",
    platform: "Medium",
    link: "https://medium.com/@kaizenaioffcial2026/how-ai-receptionists-are-changing-the-way-businesses-handle-calls-enquiries-and-appointments-67834f94f55a",
    excerpt:
      "AI receptionists help businesses answer calls, qualify enquiries, book appointments, and follow up faster through workflows built around their actual operations.",
    cta: "Read on Medium",
    status: "published",
    visual:
      "radial-gradient(circle at 22% 78%, rgba(201,160,61,0.25), transparent 34%), linear-gradient(145deg, rgba(21,18,12,0.96), rgba(7,6,5,0.98))",
  },
  {
    title: "The Future of Customer Experience Is AI-Powered Operations",
    publishedTitle:
      "The Future of Customer Experience Is Not Just Faster Replies — It Is Smarter Operations",
    category: "Customer Experience with AI",
    readTime: "4 min read",
    date: "13 June 2026",
    platform: "LinkedIn Article",
    link: null,
    excerpt:
      "Faster replies help, but real customer experience improves when businesses connect data, workflows, people, and actions into smarter operations.",
    cta: "Scheduled",
    status: "scheduled",
    visual:
      "radial-gradient(circle at 72% 72%, rgba(236,212,121,0.22), transparent 36%), linear-gradient(145deg, rgba(24,21,15,0.96), rgba(8,7,5,0.98))",
  },
  {
    title: "How AI Follow-Ups Help Convert More Leads Into Appointments",
    publishedTitle:
      "How AI Follow-Up Automation Helps Businesses Convert More Leads Without Adding More Staff",
    category: "Lead Conversion",
    readTime: "5 min read",
    date: "13 June 2026",
    platform: "Medium",
    link: null,
    excerpt:
      "AI follow-up automation helps businesses respond faster, qualify leads, book meetings, and move more enquiries forward without increasing headcount.",
    cta: "Coming soon",
    status: "draft",
    visual:
      "radial-gradient(circle at 30% 22%, rgba(201,160,61,0.28), transparent 34%), linear-gradient(145deg, rgba(20,17,12,0.96), rgba(7,6,5,0.98))",
  },
  {
    title: "What to Prepare Before Building an AI Agent for Your Business",
    publishedTitle:
      "What Every Business Should Prepare Before Starting an AI Automation Project",
    category: "AI Implementation",
    readTime: "5 min read",
    date: "14 June 2026",
    platform: "LinkedIn Article",
    link: null,
    excerpt:
      "A practical checklist for businesses before starting an AI automation project, covering workflows, systems, data, team readiness, and success metrics.",
    cta: "Scheduled",
    status: "scheduled",
    visual:
      "radial-gradient(circle at 76% 24%, rgba(236,212,121,0.24), transparent 35%), linear-gradient(145deg, rgba(25,21,13,0.96), rgba(7,6,5,0.98))",
  },
  {
    title: "The Hidden Cost of Missed Enquiries — and How AI Automation Helps Fix It",
    publishedTitle:
      "The Hidden Cost of Missed Enquiries — and How AI Automation Helps Fix It",
    category: "Demand Capture",
    readTime: "5 min read",
    date: "14 June 2026",
    platform: "Medium",
    link: null,
    excerpt:
      "Missed enquiries often create unseen revenue loss. AI automation helps businesses capture, route, and follow up on demand across calls, messages, forms, and chat.",
    cta: "Coming soon",
    status: "draft",
    visual:
      "radial-gradient(circle at 18% 68%, rgba(201,160,61,0.25), transparent 36%), linear-gradient(145deg, rgba(22,19,13,0.96), rgba(7,6,5,0.98))",
  },
  {
    title: "How Small Businesses Can Use AI Without Hiring a Full Tech Team",
    publishedTitle:
      "How Small Businesses Can Adopt AI Automation Without Building an Internal Tech Team",
    category: "AI for Small Business",
    readTime: "5 min read",
    date: "15 June 2026",
    platform: "LinkedIn Article",
    link: null,
    excerpt:
      "Small businesses can adopt AI automation by starting with one high-impact workflow, using existing tools, and working with the right implementation partner.",
    cta: "Scheduled",
    status: "scheduled",
    visual:
      "radial-gradient(circle at 80% 70%, rgba(236,212,121,0.22), transparent 34%), linear-gradient(145deg, rgba(24,20,12,0.96), rgba(7,6,5,0.98))",
  },
];

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas, insights, and strategies from Kaizen AI on AI automation, agentic systems, workflow automation, lead conversion, and customer experience.",
};

export default function BlogPage() {
  return (
    <main id="main" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(70% 45% at 50% 0%, rgba(201,160,61,0.16) 0%, rgba(201,160,61,0.04) 42%, rgba(0,0,0,0) 74%)",
        }}
      />
      <Grain />

      <section className="relative pb-14 pt-32 sm:pb-16 sm:pt-40">
        <Container size="wide">
          <FadeUp className="max-w-5xl">
            <h1 className="max-w-5xl text-h1 font-medium text-foreground">
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
              href={featuredArticle.link ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${featuredArticle.title}. Opens external article.`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Card className="overflow-hidden rounded-[1.75rem] border-primary/24 bg-card/55 p-6 shadow-[0_38px_130px_-70px_rgba(201,160,61,0.95)] transition-[border-color,transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-primary/55 group-hover:shadow-[0_42px_150px_-72px_rgba(201,160,61,1)] sm:p-8 lg:p-10">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-black/35 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-md">
                      Featured
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">
                      {featuredArticle.platform === "LinkedIn Article"
                        ? "LinkedIn"
                        : featuredArticle.platform}
                    </span>
                  </div>

                  <div>
                    <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                      {featuredArticle.title}
                    </h2>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-primary">
                      <span>{featuredArticle.category}</span>
                      <span className="h-1 w-1 rounded-full bg-primary/55" />
                      <span>{featuredArticle.readTime}</span>
                      <span className="h-1 w-1 rounded-full bg-primary/55" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors group-hover:text-accent">
                      {featuredArticle.cta}
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
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
              <h2 className="text-h2 font-medium text-foreground">
                Fresh thinking for always-on growth.
              </h2>
            </div>
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
                href={mediumProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Medium Profile
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
                  <Link href="/contact#book">
                    Book a Call
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
                  <Link href="/industries">Explore Industries</Link>
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
  const isPublished = article.status === "published" && Boolean(article.link);
  const card = (
    <Card
      className={`flex h-full flex-col rounded-[1.35rem] border-primary/18 bg-card/52 p-6 transition-[border-color,transform,box-shadow] duration-300 sm:p-7 ${
        isPublished
          ? "group-hover:-translate-y-1 group-hover:border-primary/48 group-hover:shadow-[0_28px_100px_-58px_rgba(201,160,61,0.92)]"
          : ""
      }`}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="rounded-full border border-primary/22 bg-black/35 px-3 py-1 text-xs font-bold text-primary backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>
        {isPublished ? (
          <ExternalLink
            className="h-4 w-4 text-primary opacity-70 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        ) : (
          <span className="h-4 w-4" aria-hidden />
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
            <span>{article.category}</span>
            <span className="h-1 w-1 rounded-full bg-primary/55" />
            <span>{article.readTime}</span>
            <span className="h-1 w-1 rounded-full bg-primary/55" />
            <span>{article.date}</span>
          </div>
          <span
            className={`mt-3 inline-block text-sm font-bold transition-colors ${
              isPublished
                ? "text-foreground/68 group-hover:text-primary"
                : "text-muted-foreground/70"
            }`}
          >
            {article.cta}
          </span>
        </div>
      </div>
    </Card>
  );

  if (!isPublished) {
    return (
      <article
        aria-label={`${article.title}. ${article.cta}.`}
        className="group block h-full"
      >
        {card}
      </article>
    );
  }

  return (
    <a
      href={article.link ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${article.title}. Opens external article.`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {card}
    </a>
  );
}
