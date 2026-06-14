import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Grain } from "@/components/primitives/Grain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { cn } from "@/lib/utils";
import { industryAutomationPages } from "@/lib/content/industry-automation";

export const metadata: Metadata = {
  title: "About — KaizenAI",
  description:
    "Learn about KaizenAI, a premium AI automation consultancy helping businesses reduce repetitive work and build intelligent workflow automation around real operations.",
};

const storyParagraphs = [
  "We founded KaizenAI with a simple belief: technology should empower people, not overwhelm them.",
  "Businesses today are under constant pressure to do more with less - managing customers, operations, administration, and growth while expectations continue to rise.",
  "We believe AI should remove that burden.",
  "By combining intelligent automation with practical business solutions, we help organizations reduce manual effort, improve efficiency, and unlock new opportunities for growth.",
  "Our goal isn't to replace people.",
  "It's to help people spend less time on repetitive work and more time doing the work that truly matters.",
];

const philosophyParagraphs = [
  "The conversation around AI often focuses on replacement.",
  "We see it differently.",
  "At KaizenAI, we believe the best technology works alongside people, not instead of them.",
  "AI should handle repetitive tasks, streamline operations, and remove bottlenecks so teams can focus on creativity, decision-making, customer relationships, and growth.",
  "When implemented correctly, AI becomes an extension of your team - working behind the scenes to support the people who drive your business forward.",
];

const founders = [
  {
    name: "Founder Name Placeholder",
    role: "Chief Executive Officer & Co-Founder",
    credential: "Software Engineer | 3+ Years Industry Experience",
    email: "Personal email placeholder",
    linkedin: "LinkedIn placeholder",
    quote:
      "Technology should solve problems, not create them. KaizenAI was built around the idea that businesses shouldn't need large teams or complex systems to operate efficiently. By making AI practical and accessible, we can help businesses spend less time managing operations and more time creating value.",
  },
  {
    name: "Founder Name Placeholder",
    role: "Chief Technology Officer & Co-Founder",
    credential: "Software Engineer | 3+ Years Industry Experience",
    email: "Personal email placeholder",
    linkedin: "LinkedIn placeholder",
    quote:
      "I've always been fascinated by how technology can simplify everyday challenges. Through KaizenAI, we're building intelligent systems that help businesses automate repetitive work, improve decision-making, and unlock new levels of productivity while keeping people at the center of every solution.",
  },
];

const services = [
  "AI Chat Agents",
  "AI Voice Agents",
  "Lead Qualification Automation",
  "Customer Support Automation",
  "Appointment & Booking Automation",
  "CRM & Sales Automation",
  "Internal Workflow Automation",
  "Custom AI Solutions",
];

const aboutIndustries = industryAutomationPages.map((industry) => ({
  slug: industry.slug,
  name: industry.industryName,
  href: `/industries/${industry.slug}`,
}));

const reasons = [
  {
    title: "Business-First Thinking",
    text: "We focus on solving operational challenges, not selling technology.",
  },
  {
    title: "Human-Centered Automation",
    text: "Every solution is designed to support people and improve customer experiences.",
  },
  {
    title: "Built Around Your Workflow",
    text: "No generic templates. Every automation is tailored to your business.",
  },
  {
    title: "Long-Term Partnership",
    text: "We continue optimizing and supporting solutions long after deployment.",
  },
  {
    title: "Practical, Not Experimental",
    text: "We build systems that create measurable business impact from day one.",
  },
  {
    title: "Scalable By Design",
    text: "Our solutions grow with your business and evolve alongside your operations.",
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

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="relative min-h-[28rem] overflow-hidden rounded-[1.75rem] border border-primary/22 bg-[linear-gradient(145deg,rgba(18,16,11,0.95),rgba(0,0,0,0.96))] shadow-[0_34px_120px_-76px_rgba(201,160,61,0.95)]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 22% 18%, rgba(212,168,83,0.22), transparent 34%), radial-gradient(circle at 78% 70%, rgba(196,154,48,0.16), transparent 38%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-6 rounded-[1.25rem] border border-primary/14"
      />
      <div className="relative flex h-full min-h-[28rem] flex-col justify-end p-7">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary/80">
          {label}
        </span>
      </div>
    </div>
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
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.88fr] lg:gap-14">
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
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <PlaceholderImage label="Founder / team imagery placeholder" />
          </FadeUp>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <SectionIntro title="AI Should Feel Like An Extra Team Member.">
            {philosophyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </SectionIntro>

          <FadeUp delay={0.08}>
            <Card className="gold-card h-full rounded-[1.5rem] border-primary/28 p-7 shadow-[0_32px_110px_-74px_rgba(201,160,61,0.95)] sm:p-8">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                What Makes Us Different
              </h3>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                <p>
                  We&apos;re workflow specialists first, AI specialists second.
                </p>
                <p>
                  Before recommending a solution, we take the time to understand
                  how your business operates, how your teams work, where time is
                  being lost, and where opportunities are being missed.
                </p>
                <p>Only then do we design the automation.</p>
                <p>
                  We&apos;re not tied to any single tool, platform, or technology
                  stack.
                </p>
                <p>
                  Instead, we focus on building the right solution for the
                  problem at hand.
                </p>
              </div>
              <p className="mt-7 text-lg font-semibold text-primary">
                Tool-Agnostic. Industry-Agnostic. Results-Obsessed.
              </p>
              <p className="mt-4 text-sm leading-7 text-foreground/72 sm:text-base">
                Whether it&apos;s customer service, lead management, operations,
                recruitment, bookings, reporting, or internal processes, our
                focus remains the same: deliver measurable business outcomes
                through intelligent automation.
              </p>
            </Card>
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
        <SectionIntro title="Meet The People Behind KaizenAI" className="max-w-4xl">
          <p>
            KaizenAI was founded by software engineers who share a passion for
            building technology that solves real-world business challenges.
          </p>
          <p>
            With 3+ years of experience designing, developing, and deploying
            software solutions, our founders saw firsthand how businesses were
            struggling with inefficient processes, disconnected systems, and
            repetitive operational work.
          </p>
          <p>KaizenAI was created to bridge that gap.</p>
        </SectionIntro>

        <StaggerGrid className="mt-10 grid gap-6 lg:grid-cols-2">
          {founders.map((founder) => (
            <StaggerItem key={founder.role}>
              <Card className="h-full overflow-hidden rounded-[1.5rem] border-primary/18 transition-colors hover:border-primary/42">
                <div className="grid min-h-64 place-items-center border-b border-primary/14 bg-[linear-gradient(145deg,rgba(20,18,12,0.92),rgba(0,0,0,0.95))] p-8">
                  <span className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary/72">
                    Founder image placeholder
                  </span>
                </div>
                <div className="p-7 sm:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                    {founder.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-primary">
                    {founder.role}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {founder.credential}
                  </p>
                  <div className="mt-5 grid gap-2 text-sm text-foreground/72 sm:grid-cols-2">
                    <span>{founder.email}</span>
                    <span>{founder.linkedin}</span>
                  </div>
                  <h4 className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-primary">
                    What Kaizen Means To Me
                  </h4>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    &quot;{founder.quote}&quot;
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Section>

      <Section>
        <SectionIntro title="AI Automation Solutions Built Around Your Business">
          <p>Every business operates differently.</p>
          <p>That&apos;s why we don&apos;t believe in one-size-fits-all automation.</p>
          <p>
            We design and deploy intelligent systems tailored to your workflows,
            processes, and operational goals.
          </p>
        </SectionIntro>
        <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service}>
              <Card className="flex min-h-28 items-end rounded-[1.2rem] border-primary/16 p-5 transition-colors hover:border-primary/42">
                <h3 className="text-base font-semibold text-foreground">
                  {service}
                </h3>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Section>

      <Section>
        <SectionIntro title="Built For Businesses Across Every Industry">
          <p>
            While every business is different, operational challenges are
            universal.
          </p>
          <p>
            We help organizations identify inefficiencies and deploy automation
            solutions that create measurable results.
          </p>
        </SectionIntro>
        <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutIndustries.map((industry) => (
            <StaggerItem key={industry.slug}>
              <Link href={industry.href} className="group block h-full">
                <Card className="relative grid min-h-28 place-items-center overflow-hidden rounded-[1.2rem] border-primary/14 p-5 text-center transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/42 hover:shadow-glow">
                  <ArrowRight
                    aria-hidden
                    className="absolute right-4 top-4 h-4 w-4 text-primary/55 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                  <h3 className="max-w-[14rem] text-base font-semibold leading-tight tracking-tight text-foreground">
                    {industry.name}
                  </h3>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
        <FadeUp>
          <p className="mx-auto mt-10 max-w-4xl text-center text-lg leading-8 text-foreground/76">
            No matter the industry, our approach remains the same: understand
            the workflow, identify the bottleneck, design the solution, deliver
            the outcome.
          </p>
        </FadeUp>
      </Section>

      <Section>
        <SectionIntro title="Why Businesses Choose KaizenAI" className="mx-auto text-center" />
        <StaggerGrid className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <Card className="h-full rounded-[1.25rem] border-primary/16 p-6 transition-colors hover:border-primary/42">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {reason.text}
                </p>
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
