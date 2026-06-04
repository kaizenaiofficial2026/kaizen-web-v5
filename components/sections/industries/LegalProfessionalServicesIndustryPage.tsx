"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Clock3,
  LockKeyhole,
  MessageCircle,
  MousePointerClick,
  PanelTop,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Tags,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type IndustryPainCard = {
  title: string;
  text: string;
  badge: string;
  icon: LucideIcon;
  className: string;
  isPrimary?: boolean;
};

type IndustryUseCase = {
  title: string;
  description: string;
  icon: LucideIcon;
  mode: string;
  lead?: string;
  ai: string;
  followUp?: string;
  visualLabel: string;
};

type IndustryOutcomeCard = {
  value: string;
  label: string;
  icon: LucideIcon;
  countTo?: number;
  prefix?: string;
  suffix?: string;
};

const professionalServicesPainCards: IndustryPainCard[] = [
  {
    title: "Lost consultation leads",
    text: "Serious prospects move on when they cannot get quick answers or book a consultation.",
    badge: "Lost consultation",
    icon: CalendarCheck,
    isPrimary: true,
    className:
      "sm:col-span-2 lg:absolute lg:left-[21%] lg:top-[33%] lg:z-30 lg:w-[58%] lg:rotate-[-1deg]",
  },
  {
    title: "Missed enquiries",
    text: "Potential clients ask questions after hours and leave when no one responds.",
    badge: "Missed lead",
    icon: MessageCircle,
    className:
      "lg:absolute lg:left-[2%] lg:top-[2%] lg:z-20 lg:w-[37%] lg:rotate-[-6deg]",
  },
  {
    title: "Repeated basic questions",
    text: "Your team keeps answering the same service, fee, document, and consultation-time questions.",
    badge: "Admin overload",
    icon: Clock3,
    className:
      "lg:absolute lg:right-[1%] lg:top-[1%] lg:z-20 lg:w-[43%] lg:rotate-[5deg]",
  },
  {
    title: "Poor intake details",
    text: "Clients send incomplete enquiries, forcing your team to chase basic information.",
    badge: "Incomplete intake",
    icon: ClipboardList,
    className:
      "lg:absolute lg:bottom-[4%] lg:left-[4%] lg:z-20 lg:w-[44%] lg:rotate-[4deg]",
  },
  {
    title: "Too many channels",
    text: "Website · WhatsApp · Instagram · Facebook",
    badge: "Scattered enquiries",
    icon: PanelTop,
    className:
      "lg:absolute lg:bottom-[6%] lg:right-[1%] lg:z-20 lg:w-[39%] lg:rotate-[-4deg]",
  },
];

const professionalServicesUseCases: IndustryUseCase[] = [
  {
    title: "Consultation booking",
    description: "Collects the basics and guides serious enquiries to book.",
    icon: CalendarCheck,
    mode: "AI Chat Agent",
    lead: "I need to speak to someone about a contract issue.",
    ai: "I can help collect the basic details and guide you to book a consultation with the team.",
    followUp: "Consultation request saved with service need, urgency, and contact details.",
    visualLabel: "Consultation booking preview",
  },
  {
    title: "Service FAQs",
    description: "Answers approved questions about services and next steps.",
    icon: MessageCircle,
    mode: "Approved FAQs",
    lead: "Do you handle company registration?",
    ai: "Yes, the firm can assist with company registration. I can collect your details and send this to the team.",
    followUp: "FAQ answer stays within firm-approved service information.",
    visualLabel: "Service FAQ preview",
  },
  {
    title: "Client intake questions",
    description: "Captures required details before team follow-up.",
    icon: ClipboardList,
    mode: "Intake",
    ai: "Please share your name, contact number, the service you need, and a short summary of the enquiry.",
    followUp: "Intake fields are saved for staff review.",
    visualLabel: "Intake preview",
  },
  {
    title: "Document request guidance",
    description: "Notes document readiness before consultation.",
    icon: ClipboardList,
    mode: "Preparation",
    ai: "Before your consultation, the team may need basic documents related to your enquiry. I will note what you have and pass it to them.",
    followUp: "Document readiness saved without reviewing or advising on content.",
    visualLabel: "Document guidance preview",
  },
  {
    title: "WhatsApp follow-up",
    description: "Sends confirmation, summary, and next steps.",
    icon: Send,
    mode: "WhatsApp",
    ai: "Your enquiry has been received. Here is your consultation request summary and next step.",
    followUp: "Client receives confirmation and consultation information by WhatsApp.",
    visualLabel: "WhatsApp follow-up preview",
  },
  {
    title: "Human handoff",
    description: "Escalates serious enquiries with full context.",
    icon: UserRoundCheck,
    mode: "Team handoff",
    ai: "I will pass this to the team with your enquiry details so you do not need to repeat everything.",
    followUp: "Professional team receives the transcript, intake fields, and next action.",
    visualLabel: "Handoff preview",
  },
  {
    title: "Enquiry summary",
    description: "Summarises channel, service need, urgency, and follow-up.",
    icon: Tags,
    mode: "Dashboard summary",
    ai: "Summary: consultation requested, service type selected, contact details collected, needs staff review.",
    followUp: "Summary and urgency label are saved to the dashboard.",
    visualLabel: "Summary preview",
  },
  {
    title: "Optional missed-call callback",
    description: "Voice add-on for missed calls and consultation requests.",
    icon: Phone,
    mode: "Optional Voice Agent",
    ai: "Hi, this is the office assistant calling back. I noticed we missed your call. Would you like to book a consultation or leave enquiry details?",
    followUp: "Call summary can be saved and followed up on WhatsApp.",
    visualLabel: "Optional voice callback preview",
  },
];

const professionalServicesOutcomeCards: IndustryOutcomeCard[] = [
  {
    value: "Under 5 sec",
    label: "average chat response time",
    icon: Clock3,
    countTo: 5,
    prefix: "Under ",
    suffix: " sec",
  },
  {
    value: "24/7",
    label: "enquiry coverage",
    icon: MessageCircle,
    countTo: 24,
    suffix: "/7",
  },
  {
    value: "More",
    label: "consultation leads captured",
    icon: CalendarCheck,
  },
  {
    value: "Cleaner",
    label: "client intake details",
    icon: ClipboardList,
  },
  {
    value: "Less",
    label: "admin follow-up work",
    icon: MousePointerClick,
  },
];

const professionalServicesChannels = ["Website", "WhatsApp", "Instagram", "Facebook"];
const consultationStages = [
  "New enquiry",
  "Details collected",
  "Qualified",
  "Consultation booked",
  "Staff review",
  "Closed",
];
const professionalServicesSentiments = [
  "Ready to book",
  "Urgent",
  "Confused",
  "Price-focused",
  "Needs professional review",
];
const professionalServicesKnowledgeItems = [
  "Services",
  "Consultation rules",
  "Office hours",
  "Approved FAQs",
  "Required intake fields",
  "Handoff instructions",
];

export function LegalProfessionalServicesIndustryPage() {
  const [activeUseCase, setActiveUseCase] = useState<IndustryUseCase | null>(
    null,
  );

  return (
    <main id="main" className="relative overflow-hidden">
      <IndustryHero />
      <IndustryUseCaseCards
        activeUseCase={activeUseCase}
        setActiveUseCase={setActiveUseCase}
      />
      <IndustryDashboardPreview />
      <IndustryOutcomeCards />
      <IndustryMiniDemo />
      <IndustryCTA />
    </main>
  );
}

function IndustryHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <Container
        size="wide"
        className="relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]"
      >
        <FadeUp className="min-w-0">
          <Badge>Legal & Professional Services</Badge>
          <h1 className="text-h1 mt-6 max-w-4xl font-medium text-foreground">
            Capture serious enquiries{" "}
            <span className="text-primary">
              without giving away{" "}
              <span className="block sm:inline">your time.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-muted-foreground">
            AI chat agents that answer approved service questions, collect
            enquiry details, qualify leads, book consultations, and hand serious
            matters to your team with full context.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["AI Chat Agent", "Website chat", "WhatsApp intake"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            Built for law firms, consultants, accountants, advisory firms,
            agencies, and service providers.
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Voice support available as an add-on for missed calls and
            consultation booking.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/contact">
                See Legal Demo <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
              <Link href="/contact#book">Book a Call</Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Link href="/contact">View Chat Agent Pricing</Link>
            </Button>
          </div>
        </FadeUp>
        <FadeUp delay={0.1} className="min-w-0">
          <IndustryPainCards />
        </FadeUp>
      </Container>
    </section>
  );
}

function IndustryPainCards() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-4 rounded-[2rem] border border-primary/10 bg-primary/[0.03] blur-sm lg:inset-8"
      />
      <div className="relative grid gap-3 sm:grid-cols-2 lg:block lg:min-h-[35rem] xl:min-h-[38rem]">
        {professionalServicesPainCards.map((card) => (
          <IndustryPainPointCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}

function IndustryPainPointCard({ card }: { card: IndustryPainCard }) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-primary/25 bg-card/70 p-4 shadow-card backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-primary/55 hover:shadow-glow lg:hover:rotate-0",
        card.isPrimary
          ? "border-primary/45 bg-dark-surface/95 p-5 shadow-glow sm:p-6"
          : "p-4",
        card.className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary",
            card.isPrimary ? "h-12 w-12" : "h-10 w-10",
          )}
        >
          <card.icon
            className={cn(card.isPrimary ? "h-6 w-6" : "h-5 w-5")}
            aria-hidden
          />
        </span>
        <span className="max-w-[62%] truncate rounded-full border border-primary/25 bg-background/55 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">
          {card.badge}
        </span>
      </div>
      <h2
        className={cn(
          "mt-5 font-semibold text-foreground",
          card.isPrimary ? "text-2xl sm:text-3xl" : "text-base sm:text-lg",
        )}
      >
        {card.title}
      </h2>
      <p
        className={cn(
          "mt-3 text-muted-foreground",
          card.isPrimary ? "text-sm leading-6" : "text-xs leading-5",
        )}
      >
        {card.text}
      </p>
    </div>
  );
}

type IndustryUseCaseCardsProps = {
  activeUseCase: IndustryUseCase | null;
  setActiveUseCase: (useCase: IndustryUseCase | null) => void;
};

function IndustryUseCaseCards({
  activeUseCase,
  setActiveUseCase,
}: IndustryUseCaseCardsProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Use cases"
            title="What your Professional Services AI Agent can handle"
            subtitle="Tap a card to preview how the AI captures enquiries, qualifies leads, and prepares your team before the consultation."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {professionalServicesUseCases.map((useCase) => (
            <StaggerItem key={useCase.title}>
              <button
                type="button"
                onClick={() => setActiveUseCase(useCase)}
                className="group h-full w-full rounded-2xl border border-border bg-card/60 p-5 text-left text-card-foreground shadow-soft backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                    <useCase.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <MousePointerClick
                    className="h-4 w-4 text-muted-foreground transition group-hover:text-primary"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {useCase.description}
                </p>
              </button>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>

      <IndustryUseCaseDialog
        activeUseCase={activeUseCase}
        setActiveUseCase={setActiveUseCase}
      />
    </section>
  );
}

function IndustryUseCaseDialog({
  activeUseCase,
  setActiveUseCase,
}: IndustryUseCaseCardsProps) {
  return (
    <Dialog
      open={Boolean(activeUseCase)}
      onOpenChange={(open) => {
        if (!open) {
          setActiveUseCase(null);
        }
      }}
    >
      <DialogContent className="max-h-[90dvh] max-w-3xl overflow-y-auto rounded-2xl border-primary/25 bg-card p-0">
        {activeUseCase && (
          <div className="overflow-hidden rounded-2xl">
            <div className="relative min-h-52 border-b border-border bg-background/60 p-6 sm:p-8">
              <div
                aria-hidden
                className="absolute inset-x-10 top-8 h-28 rounded-full bg-primary/15 blur-3xl"
              />
              <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-primary/10">
                <div
                  aria-hidden
                  className="absolute inset-x-8 top-10 grid grid-cols-5 gap-2 opacity-45"
                >
                  {[40, 64, 48, 78, 54].map((height) => (
                    <span
                      key={height}
                      className="rounded-full bg-primary/35"
                      style={{ height }}
                    />
                  ))}
                </div>
                <div className="relative text-center">
                  <Sparkles
                    className="mx-auto h-7 w-7 text-primary"
                    aria-hidden
                  />
                  <p className="mt-3 text-sm font-semibold text-foreground">
                    {activeUseCase.visualLabel}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    GIF / video placeholder
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <DialogTitle className="text-h3 text-foreground">
                    {activeUseCase.title}
                  </DialogTitle>
                  <DialogDescription className="mt-3 text-sm leading-6 text-muted-foreground">
                    Preview how chat, WhatsApp, and optional voice support help
                    collect intake details before team review.
                  </DialogDescription>
                </div>
                <span className="w-fit rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {activeUseCase.mode}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {activeUseCase.lead && (
                  <IndustryChatBubble label="Client" text={activeUseCase.lead} />
                )}
                <IndustryChatBubble
                  label="AI"
                  text={activeUseCase.ai}
                  align="end"
                />
                {activeUseCase.followUp && (
                  <IndustryChatBubble
                    label="WhatsApp / dashboard"
                    text={activeUseCase.followUp}
                  />
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Real GIFs and videos can be added once your professional services
                  intake workflow is mapped.
                </p>
                <Button asChild>
                  <Link href="/contact#book">Book a Call</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function IndustryChatBubble({
  label,
  text,
  align = "start",
}: {
  label: string;
  text: string;
  align?: "start" | "end";
}) {
  return (
    <div className={cn("flex", align === "end" && "justify-end")}>
      <div
        className={cn(
          "max-w-[88%] rounded-2xl border p-4 text-sm leading-6",
          align === "end"
            ? "rounded-tr-sm border-primary/30 bg-primary/10 text-foreground"
            : "rounded-tl-sm border-border bg-background/45 text-foreground/85",
        )}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {label}
        </p>
        <p className="mt-2">{text}</p>
      </div>
    </div>
  );
}

function IndustryDashboardPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Dashboard"
            title="Your enquiry command centre."
            subtitle="Manage services, view client enquiry transcripts, track consultation leads, and control what the AI knows from one dashboard."
          />
        </FadeUp>

        <FadeUp delay={0.08}>
          <Card className="mt-12 overflow-hidden p-4 shadow-card sm:p-5 lg:p-6">
            <div className="rounded-2xl border border-border bg-background/45 p-4 sm:p-5">
              <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Kaizen Professional Services Dashboard
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Services, chats, intake details, consultations, and
                    follow-ups in one place.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Services", "Intake", "Chats", "Pipeline", "Knowledge"].map(
                    (item, index) => (
                      <span
                        key={item}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold",
                          index === 0
                            ? "border-primary/35 bg-primary/10 text-primary"
                            : "border-border bg-card text-muted-foreground",
                        )}
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <IndustryDashboardPanel
                  icon={ClipboardList}
                  title="Service Knowledge Manager"
                  description="Upload approved service descriptions, consultation types, FAQs, required intake questions, business information, and follow-up instructions."
                >
                  <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
                    <div className="flex min-h-64 flex-col justify-between rounded-2xl border border-primary/20 bg-primary/10 p-4">
                      <div>
                        <div className="rounded-xl border border-dashed border-primary/35 bg-background/35 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                            Service card
                          </p>
                          <p className="mt-4 text-lg font-semibold text-foreground">
                            Contract review consultation
                          </p>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Approved intake and booking path for routine service
                            enquiries.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-2 text-xs min-[430px]:grid-cols-2">
                        {[
                          ["Type", "Initial consult"],
                          ["Team", "Corporate"],
                          ["Urgency", "Staff review"],
                          ["Follow-up", "WhatsApp"],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="rounded-xl border border-border bg-background/45 p-3"
                          >
                            <p className="text-muted-foreground">{label}</p>
                            <p className="mt-1 font-semibold text-foreground">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      {[
                        ["Service name", "Contract review"],
                        ["Practice area / department", "Corporate advisory"],
                        ["Required details", "Name, contact, service, summary"],
                        ["Approved FAQs", "Fees, process, timing, documents"],
                        ["Follow-up rules", "Confirm receipt and next step"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/45 px-3 py-2"
                        >
                          <span className="text-xs text-muted-foreground">
                            {label}
                          </span>
                          <span className="text-right text-xs font-semibold text-foreground">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </IndustryDashboardPanel>

                <IndustryDashboardPanel
                  icon={Phone}
                  title="Optional Voice Call Transcripts"
                  description="For firms using voice support, view missed-call callbacks, call summaries, and consultation intent."
                >
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Caller: Client name
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Intent: Consultation request
                        </p>
                      </div>
                      <span className="rounded-full border border-primary/25 bg-background/45 px-3 py-1 text-xs font-semibold text-primary">
                        Audio
                      </span>
                    </div>
                    <div className="mt-4 flex items-end gap-1.5 rounded-xl border border-border bg-background/45 p-3">
                      {[24, 38, 30, 52, 44, 68, 34, 48, 28, 56].map(
                        (height, index) => (
                          <span
                            key={`${height}-${index}`}
                            className="w-full rounded-full bg-primary/45"
                            style={{ height }}
                          />
                        ),
                      )}
                    </div>
                    <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                      <p className="rounded-xl border border-border bg-background/45 p-3">
                        Summary: missed-call callback, service type captured,
                        asks for consultation availability.
                      </p>
                      <p className="rounded-xl border border-border bg-background/45 p-3">
                        Transcript preview: Wants to leave enquiry details
                        before speaking with the team.
                      </p>
                    </div>
                  </div>
                </IndustryDashboardPanel>

                <IndustryDashboardPanel
                  icon={PanelTop}
                  title="Chat Transcripts by Channel"
                  description="View every professional enquiry separately by channel."
                >
                  <div className="flex flex-wrap gap-2">
                    {professionalServicesChannels.map((channel, index) => (
                      <span
                        key={channel}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold",
                          index === 1
                            ? "border-primary/35 bg-primary/10 text-primary"
                            : "border-border bg-background/40 text-muted-foreground",
                        )}
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      "Asks about company registration",
                      "Shares consultation preference",
                      "Requests document checklist",
                    ].map((message) => (
                      <div
                        key={message}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/45 px-3 py-2"
                      >
                        <span className="text-xs font-medium text-foreground">
                          {message}
                        </span>
                        <span className="text-xs text-primary">Logged</span>
                      </div>
                    ))}
                  </div>
                </IndustryDashboardPanel>

                <IndustryDashboardPanel
                  icon={BarChart3}
                  title="Consultation / Enquiry Pipeline"
                  description="Track every enquiry from first message to consultation booking and follow-up."
                  className="xl:col-span-2"
                >
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {consultationStages.map((stage, index) => (
                      <div
                        key={stage}
                        className="rounded-xl border border-border bg-background/45 p-3"
                      >
                        <div className="mb-3 h-1.5 rounded-full bg-primary/20">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${Math.max(38, 100 - index * 11)}%` }}
                          />
                        </div>
                        <p className="text-xs font-semibold text-foreground">
                          {stage}
                        </p>
                      </div>
                    ))}
                  </div>
                </IndustryDashboardPanel>

                <IndustryDashboardPanel
                  icon={Tags}
                  title="Enquiry Sentiment and Urgency"
                  description="Understand which enquiries need quick team attention."
                >
                  <div className="flex flex-wrap gap-2">
                    {professionalServicesSentiments.map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-foreground"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </IndustryDashboardPanel>

                <IndustryDashboardPanel
                  icon={Bot}
                  title="AI Knowledge Control"
                  description="The firm controls what the AI knows and can update service information anytime."
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    {professionalServicesKnowledgeItems.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-xl border border-border bg-background/45 px-3 py-2 text-sm text-foreground/85"
                      >
                        <CheckCircle2
                          className="h-4 w-4 text-primary"
                          aria-hidden
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </IndustryDashboardPanel>

                <IndustryDashboardPanel
                  icon={ShieldCheck}
                  title="Privacy / Data Control"
                  description="No private business, firm, or customer data belongs to Kaizen AI. The business keeps control of its service information, client enquiries, transcripts, and dashboard data."
                  className="xl:col-span-2"
                >
                  <div className="flex flex-col gap-3 rounded-2xl border border-primary/25 bg-primary/10 p-4 sm:flex-row sm:items-center">
                    <LockKeyhole className="h-6 w-6 text-primary" aria-hidden />
                    <p className="text-sm font-semibold text-foreground">
                      Business-controlled services, client enquiries,
                      transcripts, follow-ups, and dashboard data.
                    </p>
                  </div>
                </IndustryDashboardPanel>
              </div>
            </div>
          </Card>
        </FadeUp>
      </Container>
    </section>
  );
}

function IndustryDashboardPanel({
  icon: Icon,
  title,
  description,
  children,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "self-start rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function IndustryOutcomeCards() {
  return (
    <section className="py-16 sm:py-20">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Outcomes"
            title="Built to improve the numbers that matter."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {professionalServicesOutcomeCards.map((card) => (
            <StaggerItem key={card.label}>
              <Card className="h-full p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-5 text-3xl font-semibold text-foreground">
                  <CountUpValue card={card} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{card.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
          Example metrics shown for demo. Actual results depend on enquiry
          volume, service type, follow-up process, and implementation.
        </p>
      </Container>
    </section>
  );
}

function CountUpValue({ card }: { card: IndustryOutcomeCard }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isInView || card.countTo === undefined || shouldReduceMotion) {
      return;
    }

    let frame = 0;
    const duration = 900;
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setCurrentValue(Math.round(card.countTo! * progress));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [card.countTo, isInView, shouldReduceMotion]);

  if (card.countTo === undefined) {
    return <span ref={ref}>{card.value}</span>;
  }

  return (
    <span ref={ref}>
      {card.prefix}
      {shouldReduceMotion ? card.countTo : currentValue}
      {card.suffix}
    </span>
  );
}

function IndustryMiniDemo() {
  return (
    <section className="py-12 sm:py-18">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Mini demo"
            title="From enquiry to consultation follow-up."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Website or WhatsApp Enquiry",
              preview: "Client asks about a service or consultation.",
              icon: MessageCircle,
            },
            {
              title: "AI Intake Summary",
              preview:
                "AI collects the service needed, contact details, urgency, and short matter summary.",
              icon: Bot,
            },
            {
              title: "WhatsApp Follow-up",
              preview:
                "Client receives confirmation, next steps, and consultation information by WhatsApp.",
              icon: Send,
            },
            {
              title: "Staff Handoff",
              preview:
                "The team receives the enquiry summary and transcript before contacting the client.",
              icon: UserRoundCheck,
            },
          ].map((item, index) => (
            <StaggerItem key={item.title}>
              <Card className="relative h-full overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/45">
                <div
                  aria-hidden
                  className="absolute inset-x-8 top-6 h-16 rounded-full bg-primary/10 blur-2xl"
                />
                <div className="relative flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  {index < 3 && (
                    <span className="hidden items-center gap-2 text-primary/70 lg:flex">
                      <span className="h-px w-16 bg-primary/30" />
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  )}
                </div>
                <h3 className="relative mt-6 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                  {item.preview}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}

function IndustryCTA() {
  return (
    <section className="pb-20 pt-8 sm:pb-28">
      <Container size="wide">
        <FadeUp>
          <Card className="gold-card relative overflow-hidden p-8 text-center shadow-card sm:p-10 lg:p-12">
            <div
              aria-hidden
              className="absolute inset-x-20 top-0 h-32 rounded-full bg-primary/20 blur-3xl"
            />
            <div className="relative mx-auto max-w-3xl">
              <Badge>Professional intake</Badge>
              <h2 className="text-h2 mt-5 font-medium text-foreground">
                Let AI handle intake, not professional advice.
              </h2>
              <p className="mt-5 text-lead text-muted-foreground">
                Reply to enquiries, collect details, book consultations, and
                hand serious matters to your team with full context.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="xl" className="w-full sm:w-auto">
                  <Link href="/contact#book">Book a Call</Link>
                </Button>
                <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                  <Link href="/contact">See Live Demo</Link>
                </Button>
                <Button asChild size="xl" variant="secondary" className="w-full sm:w-auto">
                  <Link href="/contact">View Chat Agent Pricing</Link>
                </Button>
              </div>
            </div>
          </Card>
        </FadeUp>
      </Container>
    </section>
  );
}
