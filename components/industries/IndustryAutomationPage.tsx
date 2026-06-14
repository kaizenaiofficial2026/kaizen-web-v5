import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Grain } from "@/components/primitives/Grain";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  IndustryAutomationContent,
  IndustryAutomationItem,
} from "@/lib/content/industry-automation";

type IndustryAutomationPageProps = {
  content: IndustryAutomationContent;
};

type IndustryCardProps = {
  item: IndustryAutomationItem;
  index: number;
  variant: "pain" | "solution";
};

function getScopeItems(scope: string) {
  return scope
    .replace(/\.$/, "")
    .split(",")
    .map((item) => item.trim().replace(/^and\s+/i, ""))
    .filter(Boolean);
}

function IndustryHero({ content }: IndustryAutomationPageProps) {
  const scopeItems = getScopeItems(content.scope);

  return (
    <section className="relative z-10 pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-24 lg:pt-40">
      <Container size="wide">
        <FadeUp className="max-w-5xl">
          <h1 className="max-w-5xl text-[clamp(2.25rem,6vw,5.75rem)] font-medium leading-[0.95] tracking-tight text-foreground">
            {content.industryName}
          </h1>
          <p className="mt-6 max-w-3xl text-[clamp(1rem,1.35vw,1.35rem)] leading-8 text-muted-foreground">
            {content.subheading}
          </p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <Card className="mt-10 max-w-5xl border-primary/20 bg-card/55 p-5 shadow-[0_30px_90px_-60px_color-mix(in_oklab,var(--primary)_55%,transparent)] sm:p-6 lg:p-8">
            <p className="text-eyebrow text-primary">Industry Scope</p>
            <ul className="mt-4 flex max-w-4xl flex-wrap gap-x-4 gap-y-2">
              {scopeItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm leading-6 text-foreground/78 sm:text-base"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </FadeUp>
      </Container>
    </section>
  );
}

function SectionIntro({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <FadeUp className="max-w-3xl">
      <h2 className="text-h2 font-medium text-foreground">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
        {subtitle}
      </p>
    </FadeUp>
  );
}

function NumberBadge({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "pain" | "solution";
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-7 items-center justify-center rounded-full border px-2 text-[10px] font-bold uppercase tracking-[0.12em]",
        variant === "pain"
          ? "border-primary/20 bg-background/70 text-primary"
          : "border-primary/35 bg-primary/10 text-primary",
      )}
    >
      {children}
    </span>
  );
}

function IndustryCard({ item, index, variant }: IndustryCardProps) {
  const isSolution = variant === "solution";

  return (
    <Card
      className={cn(
        "group h-full rounded-[1.05rem] p-3 transition-colors duration-300 sm:p-4 lg:p-5",
        "hover:border-primary/45",
        isSolution
          ? "border-primary/25 bg-[linear-gradient(145deg,color-mix(in_oklab,var(--primary)_11%,transparent),rgba(0,0,0,0.58))]"
          : "border-primary/15 bg-card/45",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <NumberBadge variant={variant}>
          {isSolution && item.badge
            ? item.badge
            : String(index + 1).padStart(2, "0")}
        </NumberBadge>
      </div>
      <h3 className="mt-4 text-[0.9rem] font-semibold leading-snug tracking-tight text-foreground sm:text-base lg:text-lg">
        {item.title}
      </h3>
      <p className="mt-2 text-[0.74rem] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
        {item.description}
      </p>
    </Card>
  );
}

function IndustryCardGrid({
  items,
  variant,
}: {
  items: IndustryAutomationItem[];
  variant: "pain" | "solution";
}) {
  return (
    <StaggerGrid className="mt-10 grid grid-cols-1 gap-3 min-[340px]:grid-cols-2 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <StaggerItem key={item.title}>
          <IndustryCard item={item} index={index} variant={variant} />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}

function IndustrySection({
  title,
  subtitle,
  items,
  variant,
}: {
  title: string;
  subtitle: string;
  items: IndustryAutomationItem[];
  variant: "pain" | "solution";
}) {
  return (
    <section className="relative z-10 py-12 sm:py-16 lg:py-20">
      <Container size="wide">
        <SectionIntro title={title} subtitle={subtitle} />
        <IndustryCardGrid items={items} variant={variant} />
      </Container>
    </section>
  );
}

function IndustryCTA() {
  return (
    <section className="relative z-10 py-12 sm:py-16 lg:py-24">
      <Container size="wide">
        <Card className="gold-card p-6 text-center sm:p-10 lg:p-12">
          <FadeUp>
            <h2 className="mx-auto max-w-4xl text-h2 font-medium text-foreground">
              Ready to automate the work slowing your business down?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-foreground/72 sm:text-lg">
              Book a free consultation and we&apos;ll help identify the
              highest-impact AI automation opportunities for your business.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link href="/contact#book">
                  Book A Free Consultation
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link
                  href="https://wa.me/94770299569"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Talk To Us On WhatsApp
                  <MessageCircle aria-hidden />
                </Link>
              </Button>
            </div>
          </FadeUp>
        </Card>
      </Container>
    </section>
  );
}

export function IndustryAutomationPage({
  content,
}: IndustryAutomationPageProps) {
  return (
    <main id="main" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_32%),radial-gradient(circle_at_88%_28%,color-mix(in_oklab,var(--primary)_4%,transparent),transparent_30%)]"
      />
      <Grain />
      <IndustryHero content={content} />
      <IndustrySection
        title="Exact Pain Points"
        subtitle="The operational bottlenecks businesses in this industry face every day."
        items={content.painPoints}
        variant="pain"
      />
      <IndustrySection
        title="AI Automation Solutions"
        subtitle="Practical AI workflows designed to remove manual work, recover lost revenue, and improve operational efficiency."
        items={content.solutions}
        variant="solution"
      />
      <IndustryCTA />
    </main>
  );
}
