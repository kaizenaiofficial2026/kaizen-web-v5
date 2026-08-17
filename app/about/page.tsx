import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Grain } from "@/components/primitives/Grain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About — KaizenAI",
  description:
    "Learn about KaizenAI, a premium AI automation consultancy helping businesses reduce repetitive work and build intelligent workflow automation around real operations.",
};

const storyParagraphs = [
  "We founded KaizenAI on a simple belief: technology should empower people, not overwhelm them.",
  "Businesses are under constant pressure to do more with less. We build the automation that takes that weight off your team.",
];

const philosophyParagraphs = [
  "The conversation around AI focuses on replacement. We see it differently — AI should handle the repetitive work, so your people can focus on decisions, relationships, and growth.",
];

const founders = [
  {
    name: "Abdulrahman Muneer",
    role: "Chief Executive Officer & Co-Founder",
    shortRole: "CEO & Co-Founder",
    credential: "Software Engineer | 3+ Years Industry Experience",
    email: "ceo@kaizenai.dev",
    linkedin: "https://www.linkedin.com/in/abdulrahman-muneer-08648b29a",
    thumb: "/images/team/abdulrahman-muneer-thumb.jpg",
    quote:
      "Technology should solve problems, not create them. KaizenAI was built around the idea that businesses shouldn't need large teams or complex systems to operate efficiently. By making AI practical and accessible, we can help businesses spend less time managing operations and more time creating value.",
  },
  {
    name: "Rushaid Khan",
    role: "Chief Technology Officer & Co-Founder",
    shortRole: "CTO & Co-Founder",
    credential: "Software Engineer | 3+ Years Industry Experience",
    email: "cto@kaizenai.dev",
    linkedin: "https://www.linkedin.com/in/rushaid-khan",
    thumb: "/images/team/rushaid-khan-thumb.jpg",
    quote:
      "I've always been fascinated by how technology can simplify everyday challenges. Through KaizenAI, we're building intelligent systems that help businesses automate repetitive work, improve decision-making, and unlock new levels of productivity while keeping people at the center of every solution.",
  },
];

function Section({
  children,
  className,
  hairline = true,
  heroGlow = false,
}: {
  children: React.ReactNode;
  className?: string;
  hairline?: boolean;
  heroGlow?: boolean;
}) {
  return (
    <section className={cn("relative overflow-hidden py-16 sm:py-20 lg:py-28", className)}>
      {heroGlow ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_34%),radial-gradient(circle_at_86%_12%,color-mix(in_oklab,var(--primary)_7%,transparent),transparent_32%)]"
        />
      ) : null}
      {hairline ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
        />
      ) : null}
      <Container size="wide" className="relative z-10">
        {children}
      </Container>
    </section>
  );
}

function SectionIntro({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <FadeUp className={cn("max-w-3xl", className)}>
      <h2 className="text-h2 font-medium text-foreground">{title}</h2>
      {children ? (
        <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {children}
        </div>
      ) : null}
    </FadeUp>
  );
}

export default function AboutPage() {
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

      <Section
        className="pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-40"
        hairline={false}
        heroGlow
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.88fr] lg:gap-14">
          <FadeUp>
            <span className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
              Our Story
            </span>
            <h1 className="mt-5 max-w-5xl text-h1 font-medium text-foreground">
              Building A Future Where People Focus On People, Not Repetitive Work.
            </h1>
            <div className="mt-7 max-w-2xl space-y-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {philosophyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-7 text-lg font-semibold text-primary">
              Tool-Agnostic. Industry-Agnostic. Results-Obsessed.
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 bg-[radial-gradient(58%_46%_at_50%_36%,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_72%)] blur-2xl"
              />
              <div className="relative rounded-[1.8rem] bg-[linear-gradient(150deg,color-mix(in_oklab,var(--primary)_52%,transparent),color-mix(in_oklab,var(--primary)_6%,transparent)_34%,transparent_58%,color-mix(in_oklab,var(--primary)_34%,transparent))] p-px shadow-[0_44px_130px_-72px_rgba(201,160,61,0.95)]">
                <div className="relative overflow-hidden rounded-[1.75rem] bg-white/4 backdrop-blur-2xl">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_70%_at_0%_0%,rgba(255,255,255,0.08),transparent_58%)]"
                  />
                  {founders.map((founder, index) => (
                    <div
                      key={founder.role}
                      className={cn(
                        "relative flex items-center gap-4 p-5 sm:gap-6 sm:p-6",
                        index > 0 && "border-t border-primary/12",
                      )}
                    >
                      <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-[1.1rem] border border-primary/20 bg-black/40 sm:h-40 sm:w-32">
                        <Image
                          src={founder.thumb}
                          alt={`${founder.name}, ${founder.role} at KaizenAI`}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-xl">
                          {founder.name}
                        </h2>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                          {founder.shortRole}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {founder.credential}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/72">
                          <a
                            href={`mailto:${founder.email}`}
                            className="transition-colors hover:text-primary"
                          >
                            {founder.email}
                          </a>
                          <a
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-primary"
                          >
                            LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </Section>

      <Section className="pt-10 sm:pt-14 lg:pt-20">
        <SectionIntro title="Vision & Mission" className="mx-auto text-center" />
        <StaggerGrid className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            {
              title: "Our Vision",
              text: "To create a future where businesses of every size can leverage intelligent automation to operate more efficiently, serve customers better, and compete on a global scale.",
            },
            {
              title: "Our Mission",
              text: "To help businesses unlock their full potential by designing intelligent automation systems that eliminate inefficiencies, simplify operations, and create more time for people to focus on meaningful work.",
            },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <Card className="h-full rounded-[1.35rem] border-primary/18 p-7 transition-colors hover:border-primary/42 sm:p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-muted-foreground">
                  {item.text}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Section>

      <Section>
        <SectionIntro title="What Kaizen Means To Us" className="mx-auto text-center">
          <p className="text-center">
            KaizenAI was founded by software engineers who saw firsthand how much
            time businesses lose to inefficient, repetitive work.
          </p>
        </SectionIntro>

        <StaggerGrid className="mt-10 grid gap-5 md:grid-cols-2">
          {founders.map((founder) => (
            <StaggerItem key={founder.role}>
              <Card className="h-full rounded-[1.35rem] border-primary/18 p-7 transition-colors hover:border-primary/42 sm:p-8">
                <p className="text-base leading-7 text-muted-foreground">
                  &quot;{founder.quote}&quot;
                </p>
                <p className="mt-6 text-sm font-semibold text-foreground">
                  {founder.name}
                </p>
                <p className="mt-1 text-sm text-primary">{founder.shortRole}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Section>

      <Section>
        <FadeUp className="mx-auto max-w-4xl text-center">
          <h2 className="text-h2 font-medium text-foreground">
            The Future Isn&apos;t AI vs Humans.
          </h2>
          <p className="mt-3 text-3xl font-medium tracking-tight text-primary sm:text-4xl">
            It&apos;s Humans Empowered By AI.
          </p>
          <div className="mx-auto mt-7 max-w-3xl space-y-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            <p>
              We believe the most successful businesses of the future won&apos;t
              be the ones that replace people with technology.
            </p>
            <p>
              They&apos;ll be the ones that use technology to help people perform
              at their best.
            </p>
            <p>
              The future belongs to organizations that can combine human
              creativity, expertise, and relationships with the speed,
              consistency, and efficiency of intelligent automation.
            </p>
            <p>That&apos;s the future we&apos;re building toward every day at KaizenAI.</p>
          </div>
        </FadeUp>
      </Section>

      <Section className="pb-20 lg:pb-32">
        <Card className="gold-card overflow-hidden rounded-[1.75rem] border-primary/28 p-7 text-center shadow-[0_34px_120px_-72px_rgba(201,160,61,0.95)] sm:p-10 lg:p-12">
          <FadeUp>
            <h2 className="mx-auto max-w-3xl text-h2 font-medium text-foreground">
              Let&apos;s Build Something Meaningful Together
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lead text-foreground/75">
              Whether you&apos;re exploring AI for the first time or looking to
              automate complex business processes, we&apos;re here to help you
              identify opportunities, remove bottlenecks, and unlock growth
              through intelligent automation.
            </p>
            <p className="mt-6 text-base font-semibold text-primary">
              AI isn&apos;t here to replace your team. It&apos;s here to help your team achieve more.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="xl" className="w-full sm:w-auto">
                <Link href="/contact#book">
                  Book A Free Consultation
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
                <a
                  href="https://wa.me/94770299569"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Talk To Us On WhatsApp
                  <MessageCircle className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>
          </FadeUp>
        </Card>
      </Section>
    </main>
  );
}
