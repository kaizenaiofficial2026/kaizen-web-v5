"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Headphones,
  Languages,
  LayoutDashboard,
  Mic,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
  Radio,
  UserCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { Container } from "@/components/primitives/Container";
import { MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { cn } from "@/lib/utils";

type IconItem = {
  title: string;
  text: string;
  Icon: LucideIcon;
};

type ImpactMetric = {
  value: number;
  suffix: string;
  label: string;
  text: string;
  Icon: LucideIcon;
};

type VoicePrompt = {
  question: string;
  answer: string;
};

const trustChips = [
  "Human-like conversations",
  "Inbound + outbound calls",
  "Trained on your business",
  "Multi-language support",
];

const handleCards: IconItem[] = [
  {
    title: "Answer incoming enquiries",
    text: "Never leave callers waiting in silence.",
    Icon: PhoneIncoming,
  },
  {
    title: "Call missed leads back instantly",
    text: "Recover interest while it is still warm.",
    Icon: PhoneOutgoing,
  },
  {
    title: "Book appointments automatically",
    text: "Guide callers into confirmed next steps.",
    Icon: CalendarCheck,
  },
  {
    title: "Qualify sales prospects",
    text: "Ask the right questions before handoff.",
    Icon: UserCheck,
  },
  {
    title: "Follow up automatically",
    text: "Keep leads moving without manual chasing.",
    Icon: PhoneForwarded,
  },
  {
    title: "Escalate hot leads to your team",
    text: "Send context when a human should close.",
    Icon: Users,
  },
  {
    title: "Speak multiple languages",
    text: "Support callers in the languages you need.",
    Icon: Languages,
  },
  {
    title: "Update CRM / dashboard",
    text: "Store outcomes, intent, and call notes.",
    Icon: LayoutDashboard,
  },
];

const flowSteps = [
  { label: "Customer calls", Icon: PhoneCall },
  { label: "AI answers instantly", Icon: Zap },
  { label: "Understands intent", Icon: Mic },
  { label: "Answers questions", Icon: Headphones },
  { label: "Books / qualifies / escalates", Icon: CalendarCheck },
  { label: "Lead stored in dashboard", Icon: LayoutDashboard },
];

const impactMetrics: ImpactMetric[] = [
  {
    value: 148,
    suffix: "+",
    label: "Calls Handled",
    text: "AI can manage high call volume without staff overload.",
    Icon: PhoneIncoming,
  },
  {
    value: 37,
    suffix: "+",
    label: "Appointments Booked",
    text: "Turns conversations into confirmed next steps.",
    Icon: CalendarCheck,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Availability",
    text: "Answers and follows up even after business hours.",
    Icon: Radio,
  },
  {
    value: 5,
    suffix: " sec",
    label: "Response Time",
    text: "Customers get answered before they move to competitors.",
    Icon: Zap,
  },
];

const faqs = [
  {
    q: "Does the AI sound human?",
    a: "The agent is designed to sound natural, confident, and conversational, with tone and wording trained around your business.",
  },
  {
    q: "Can it answer inbound and make outbound calls?",
    a: "Yes. It can answer incoming calls and also make outbound follow-ups, reminders, and lead qualification calls.",
  },
  {
    q: "Can it transfer calls to my team?",
    a: "Yes. When a call needs human attention, it can transfer or escalate with context.",
  },
  {
    q: "Can it speak multiple languages?",
    a: "Yes. It can support multiple languages depending on the business requirements and setup.",
  },
  {
    q: "Can it book appointments?",
    a: "Yes. It can collect details, confirm availability through connected tools, and guide the customer toward booking.",
  },
  {
    q: "What if the AI does not know the answer?",
    a: "It can ask clarifying questions, use approved business knowledge, or escalate to a human when needed.",
  },
];

const voicePrompts: VoicePrompt[] = [
  {
    question: "Can you book me tomorrow?",
    answer:
      "Yes, I can help with that. What service would you like to book and what time works best?",
  },
  {
    question: "Do you have pricing?",
    answer:
      "I can share the available pricing options. Which service are you interested in?",
  },
  {
    question: "Can I speak to someone?",
    answer:
      "Of course. I can send this to the team with your details so they can contact you directly.",
  },
  {
    question: "What services do you offer?",
    answer:
      "I can walk you through the available services and help match the right option to what you need.",
  },
  {
    question: "Can you call me back?",
    answer:
      "Yes. I can capture your number, preferred time, and reason for the callback.",
  },
  {
    question: "Do you support Sinhala?",
    answer:
      "Yes. I can handle conversations in multiple languages depending on your business setup.",
  },
  {
    question: "Can you send the location?",
    answer:
      "Yes. I can send the location link and any parking or arrival instructions your customer needs.",
  },
  {
    question: "Is anyone available now?",
    answer:
      "I can check availability, confirm the next opening, or escalate this to the team if it is urgent.",
  },
];

function PhoneCallMockup() {
  const [activePrompt, setActivePrompt] = useState(voicePrompts[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (speechTimer.current) {
        window.clearTimeout(speechTimer.current);
      }
    };
  }, []);

  function handlePromptClick(prompt: VoicePrompt) {
    if (speechTimer.current) {
      window.clearTimeout(speechTimer.current);
    }

    setActivePrompt(prompt);
    setIsSpeaking(true);
    speechTimer.current = window.setTimeout(() => {
      setIsSpeaking(false);
      speechTimer.current = null;
    }, 2600);
  }

  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      <div
        aria-hidden
        className="absolute -inset-10 rounded-full bg-primary/18 blur-3xl"
      />
      <div className="relative rounded-[2.6rem] border border-white/12 bg-[#050504] p-2.5 shadow-[0_40px_120px_-54px_rgba(201,160,61,0.9),inset_0_1px_0_rgba(255,255,255,0.16)]">
        <div className="relative h-[610px] max-h-[calc(100dvh-7rem)] overflow-hidden rounded-[2.1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(23,20,13,0.98),rgba(5,5,4,0.98))]">
          <div className="absolute left-1/2 top-2 z-20 h-7 w-24 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_8%,rgba(201,160,61,0.26),transparent_68%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-8 top-28 h-64 rounded-full bg-primary/8 blur-3xl"
          />

          <div className="relative z-10 flex h-10 items-end justify-between px-7 pb-1.5 text-[11px] font-semibold text-foreground/84">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-4 rounded-full bg-foreground/70" />
              <span className="h-2.5 w-4 rounded-sm border border-foreground/70" />
            </span>
          </div>

          <div className="relative z-10 flex h-[570px] flex-col px-4 pb-4 pt-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-2 text-left backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/24 bg-primary/12 text-primary">
                  <Mic className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-none text-foreground">
                    Kaizen Voice Agent
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {isSpeaking ? "AI speaking..." : "Tap a question"}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                <Radio
                  className={cn("h-3 w-3", isSpeaking && "animate-pulse")}
                />
                Live
              </span>
            </div>

            <div className="relative flex flex-1 flex-col items-center justify-center py-4">
              <div className="relative grid h-40 w-40 place-items-center">
                <span
                  aria-hidden
                  className={cn(
                    "absolute h-36 w-36 rounded-full border border-primary/20 bg-primary/10 blur-sm",
                    isSpeaking ? "voiceOrbRingSpeaking" : "voiceOrbRingIdle",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute h-28 w-28 rounded-full border border-white/10 bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.62),rgba(201,160,61,0.72)_28%,rgba(104,79,25,0.92)_66%,rgba(12,10,6,0.98)_100%)] shadow-[0_0_70px_-18px_rgba(201,160,61,1),inset_0_1px_18px_rgba(255,255,255,0.28)]",
                    isSpeaking ? "voiceOrbSpeaking" : "voiceOrbIdle",
                  )}
                />
                <span
                  aria-hidden
                  className="absolute left-16 top-11 h-7 w-10 rounded-full bg-white/28 blur-md"
                />
                <span className="relative grid h-14 w-14 place-items-center rounded-full border border-white/18 bg-black/24 text-primary backdrop-blur-md">
                  <Mic className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-1 flex h-7 items-center justify-center">
                {isSpeaking ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    AI speaking
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Voice preview
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {voicePrompts.map((prompt) => {
                const isActive = activePrompt.question === prompt.question;

                return (
                  <button
                    key={prompt.question}
                    type="button"
                    onClick={() => handlePromptClick(prompt)}
                    className={cn(
                      "min-h-10 rounded-full border px-2.5 py-2 text-left text-[11px] font-semibold leading-tight transition",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive
                        ? "border-primary/42 bg-primary/16 text-foreground shadow-[0_0_26px_-18px_rgba(201,160,61,1)]"
                        : "border-white/10 bg-white/[0.055] text-foreground/74 hover:border-primary/30 hover:bg-primary/10 hover:text-foreground",
                    )}
                  >
                    {prompt.question}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 rounded-2xl border border-primary/20 bg-black/34 p-3 text-left backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                  Live transcript
                </p>
                <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  Ready for backend
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-foreground/74">
                <span className="text-muted-foreground">Customer:</span>{" "}
                {activePrompt.question}
              </p>
              <p className="mt-2 text-sm leading-5 text-foreground">
                <span className="text-primary">Kaizen AI:</span>{" "}
                {activePrompt.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/16 bg-black/28 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary/84">
          <Play className="h-3 w-3" />
          Replaceable with demo video
        </span>
      </div>
    </div>
  );
}

function FlowDiagram() {
  return (
    <div className="mt-12">
      <div className="grid gap-5 lg:grid-cols-6 lg:gap-6">
        {flowSteps.map(({ label, Icon }, index) => (
          <div key={label} className="relative">
            {index > 0 && (
              <div
                aria-hidden
                className="absolute left-6 top-0 h-5 w-px -translate-y-5 bg-primary/35 lg:left-0 lg:top-10 lg:h-px lg:w-6 lg:-translate-x-6 lg:-translate-y-0"
              />
            )}
            <div className="relative z-10 flex h-full min-h-[112px] items-center gap-4 rounded-2xl border border-primary/18 bg-card/58 p-4 backdrop-blur-md lg:flex-col lg:justify-start lg:text-center">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary/24 bg-primary/10 text-primary shadow-[0_0_28px_-16px_rgba(201,160,61,1)]">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold leading-tight text-foreground">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/8 px-4 py-2 text-xs font-semibold text-foreground/78">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          Every call becomes a trackable business outcome.
        </span>
      </div>
    </div>
  );
}

function CountUpNumber({
  start,
  value,
  suffix,
}: {
  start: boolean;
  value: number;
  suffix: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    let frame = 0;
    let animationFrame = 0;
    const totalFrames = 56;

    const tick = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [start, value]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

function ImpactStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = stripRef.current;

    if (!node || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={stripRef}
      className="mt-12 overflow-hidden rounded-[1.75rem] border border-primary/24 bg-[linear-gradient(135deg,rgba(201,160,61,0.14),rgba(255,255,255,0.045),rgba(201,160,61,0.08))] shadow-[0_34px_100px_-72px_rgba(201,160,61,0.95)]"
    >
      <div className="grid divide-y divide-primary/14 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {impactMetrics.map(({ value, suffix, label, text, Icon }) => (
          <div key={label} className="relative min-h-[240px] p-6">
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity hover:opacity-100"
              style={{
                backgroundImage:
                  "radial-gradient(65% 65% at 50% 0%, rgba(201,160,61,0.15), transparent 72%)",
              }}
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/24 bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-primary/35 to-transparent" />
              </div>
              <p className="mt-7 font-serif text-5xl font-medium leading-none text-primary sm:text-6xl">
                <CountUpNumber
                  start={isVisible}
                  value={value}
                  suffix={suffix}
                />
              </p>
              <h3 className="mt-4 text-xl font-semibold leading-tight text-foreground">
                {label}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VoiceAgentSolutionPage() {
  return (
    <main id="main" className="relative">
      <section className="relative w-full overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_58%_at_50%_0%,rgba(201,160,61,0.22),rgba(201,160,61,0.06)_38%,rgba(10,9,7,0)_72%)]"
        />
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)]">
          <FadeUp>
            <Badge>AI Voice Agent</Badge>
            <h1 className="mt-6 text-h1 font-medium text-foreground">
              Your Best Sales Rep Never Sleeps.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-foreground/75">
              Custom-built AI voice agents that answer inbound calls, follow up
              with leads, handle customer enquiries, book appointments, and help
              your business close more sales 24/7.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {trustChips.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-primary/18 bg-card/40 px-3 py-1 text-xs font-semibold text-foreground/76"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="xl">
                <Link href="/demo">
                  Speak to Our AI Agent
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/book-demo">Book Strategy Call</Link>
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <PhoneCallMockup />
          </FadeUp>
        </Container>
      </section>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <FadeUp>
          <SectionHeader
            eyebrow="What It Handles"
            title={
              <>
                What your{" "}
                <span className="text-primary">AI Voice Agent</span> handles
                for you.
              </>
            }
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {handleCards.map(({ title, text, Icon }) => (
            <StaggerItem key={title}>
              <Card className="group h-full p-5 transition-colors hover:border-primary/38">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/24 bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-lg font-semibold leading-tight text-foreground">
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {text}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <FadeUp>
          <SectionHeader
            eyebrow="Call Flow"
            title="From first ring to booked customer."
          />
        </FadeUp>
        <FadeUp delay={0.1}>
          <FlowDiagram />
        </FadeUp>
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <FadeUp>
          <SectionHeader
            eyebrow="Business Impact"
            title="Built to improve the calls that drive revenue."
          />
        </FadeUp>
        <FadeUp delay={0.1}>
          <ImpactStrip />
        </FadeUp>
      </MarketingSection>

      <MarketingSection
        id="faq"
        className="py-16 sm:py-20 lg:py-24"
        containerClassName="max-w-5xl"
      >
        <FadeUp>
          <SectionHeader
            eyebrow="FAQ"
            title="Voice-agent questions."
            subtitle="Short answers for how Kaizen handles calls, handoffs, languages, and bookings."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 lg:grid-cols-2">
          {faqs.map((item) => (
            <StaggerItem key={item.q}>
              <div className="h-full rounded-2xl border border-border bg-card/38 p-6 backdrop-blur-md">
                <h3 className="text-lg font-semibold leading-snug text-foreground">
                  {item.q}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item.a}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </MarketingSection>

      <section className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(201,160,61,0.18), rgba(255,255,255,0.045), rgba(201,160,61,0.1)), radial-gradient(70% 65% at 50% 0%, rgba(201,160,61,0.2), rgba(10,9,7,0) 70%)",
          }}
        />
        <div
          aria-hidden
          className="from-transparent via-primary/30 to-transparent pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r"
        />
        <Container className="text-center">
          <FadeUp>
            <Badge>AI Voice Agent</Badge>
            <h2 className="mx-auto mt-5 max-w-4xl text-h2 font-medium text-foreground">
              Stop letting missed calls become lost revenue.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lead text-muted-foreground">
              See how a bespoke AI voice agent can answer, follow up, and
              convert customers around the clock.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button asChild size="xl">
                <Link href="/demo">
                  Speak to Our AI Agent
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/book-demo">Book Strategy Call</Link>
              </Button>
            </div>
          </FadeUp>
        </Container>
      </section>

      <style>{`
        @keyframes voiceOrbIdle {
          0%, 100% {
            transform: translateY(0) scale(1);
            filter: saturate(1);
          }
          50% {
            transform: translateY(-7px) scale(1.025);
            filter: saturate(1.12);
          }
        }
        @keyframes voiceOrbSpeaking {
          0%, 100% {
            transform: translateY(-2px) scale(1.02) rotate(0deg);
            border-radius: 48% 52% 50% 50%;
            filter: saturate(1.15);
          }
          28% {
            transform: translateY(-9px) scale(1.075) rotate(1.5deg);
            border-radius: 54% 46% 49% 51%;
            filter: saturate(1.35);
          }
          58% {
            transform: translateY(1px) scale(0.98) rotate(-1.2deg);
            border-radius: 46% 54% 55% 45%;
            filter: saturate(1.2);
          }
        }
        @keyframes voiceOrbRingIdle {
          0%, 100% {
            transform: scale(0.94);
            opacity: 0.42;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.68;
          }
        }
        @keyframes voiceOrbRingSpeaking {
          0% {
            transform: scale(0.86);
            opacity: 0.72;
          }
          70% {
            transform: scale(1.18);
            opacity: 0.12;
          }
          100% {
            transform: scale(1.24);
            opacity: 0;
          }
        }
        .voiceOrbIdle {
          animation: voiceOrbIdle 4.6s ease-in-out infinite;
        }
        .voiceOrbSpeaking {
          animation: voiceOrbSpeaking 0.9s ease-in-out infinite;
        }
        .voiceOrbRingIdle {
          animation: voiceOrbRingIdle 3.8s ease-in-out infinite;
        }
        .voiceOrbRingSpeaking {
          animation: voiceOrbRingSpeaking 1.05s ease-out infinite;
        }
      `}</style>
    </main>
  );
}
