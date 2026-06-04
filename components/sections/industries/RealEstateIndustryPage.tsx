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
  Home,
  ImageIcon,
  KeyRound,
  LockKeyhole,
  MapPin,
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

const realEstatePainCards: IndustryPainCard[] = [
  {
    title: "Lost viewing opportunities",
    text: "Serious buyers move on when no one qualifies them or books a viewing quickly.",
    badge: "Lost viewing",
    icon: CalendarCheck,
    isPrimary: true,
    className:
      "sm:col-span-2 lg:absolute lg:left-[21%] lg:top-[33%] lg:z-30 lg:w-[58%] lg:rotate-[-1deg]",
  },
  {
    title: "Missed property calls",
    text: "Interested buyers call while agents are busy with viewings, meetings, and site visits.",
    badge: "Missed lead",
    icon: Phone,
    className:
      "lg:absolute lg:left-[2%] lg:top-[2%] lg:z-20 lg:w-[37%] lg:rotate-[-6deg]",
  },
  {
    title: "Slow lead response",
    text: "Property leads go cold when replies take hours instead of seconds.",
    badge: "Slow follow-up",
    icon: Clock3,
    className:
      "lg:absolute lg:right-[1%] lg:top-[1%] lg:z-20 lg:w-[43%] lg:rotate-[5deg]",
  },
  {
    title: "Unqualified enquiries",
    text: "Agents waste time chasing people who are not ready, outside budget, or not serious.",
    badge: "Low-quality leads",
    icon: Tags,
    className:
      "lg:absolute lg:bottom-[4%] lg:left-[4%] lg:z-20 lg:w-[44%] lg:rotate-[4deg]",
  },
  {
    title: "Too many channels",
    text: "Phone · WhatsApp · Website · Instagram · Facebook",
    badge: "Scattered enquiries",
    icon: PanelTop,
    className:
      "lg:absolute lg:bottom-[6%] lg:right-[1%] lg:z-20 lg:w-[39%] lg:rotate-[-4deg]",
  },
];

const realEstateUseCases: IndustryUseCase[] = [
  {
    title: "Property enquiry replies",
    description: "Answers listing questions and captures viewing intent.",
    icon: Home,
    mode: "Voice or chat",
    lead: "Is the apartment in Colombo 05 still available?",
    ai: "Yes, I can help check the details. I'll share the property summary and collect your preferred viewing time.",
    followUp: "Property summary, location notes, and next steps prepared for WhatsApp.",
    visualLabel: "Property reply preview",
  },
  {
    title: "Buyer qualification",
    description: "Collects area, budget, timeline, and property fit.",
    icon: UserRoundCheck,
    mode: "AI qualification",
    ai: "What is your preferred area, budget range, and move-in timeline?",
    followUp: "Lead profile updated with budget, urgency, and preferred location.",
    visualLabel: "Qualification preview",
  },
  {
    title: "Viewing bookings",
    description: "Helps turn serious enquiries into booked viewings.",
    icon: CalendarCheck,
    mode: "Booking support",
    lead: "Can I see it this weekend?",
    ai: "I can help arrange a viewing. Please share your preferred day and time.",
    followUp: "Viewing request added with preferred time and listing interest.",
    visualLabel: "Viewing booking preview",
  },
  {
    title: "Missed call callback",
    description: "Calls back property leads before another agency does.",
    icon: Phone,
    mode: "AI Voice Agent",
    ai: "Hi, this is the property assistant calling back. I noticed we missed your call about a listing. How can I help?",
    followUp: "Call transcript and next action saved for the agent.",
    visualLabel: "Voice callback preview",
  },
  {
    title: "WhatsApp property follow-up",
    description: "Sends listing details after a call or chat.",
    icon: Send,
    mode: "WhatsApp",
    ai: "Here are the property details, location, price placeholder, and next viewing availability.",
    followUp: "Buyer receives property details, location, viewing time, and next steps.",
    visualLabel: "WhatsApp follow-up preview",
  },
  {
    title: "Rental enquiry handling",
    description: "Captures tenant needs, budget, and move-in timing.",
    icon: KeyRound,
    mode: "Rental assistant",
    lead: "Is this rental available from next month?",
    ai: "I can help check availability and collect your preferred move-in date, budget range, and viewing preference.",
    followUp: "Rental enquiry logged with move-in timeline and property match.",
    visualLabel: "Rental enquiry preview",
  },
  {
    title: "Agent handoff",
    description: "Routes serious leads with a clean summary.",
    icon: MessageCircle,
    mode: "Human handoff",
    ai: "I'll send this to the agent with your budget, preferred location, property interest, and full conversation summary.",
    followUp: "Agent receives the lead summary before calling back.",
    visualLabel: "Agent handoff preview",
  },
  {
    title: "Lead summary and scoring",
    description: "Shows which leads need attention first.",
    icon: ClipboardList,
    mode: "Dashboard summary",
    ai: "Hot lead. Budget confirmed. Interested in a 3-bedroom apartment. Wants weekend viewing.",
    followUp: "Lead score, sentiment, and next action are saved to the dashboard.",
    visualLabel: "Lead scoring preview",
  },
];

const realEstateOutcomeCards: IndustryOutcomeCard[] = [
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
    label: "property enquiry coverage",
    icon: Phone,
    countTo: 24,
    suffix: "/7",
  },
  {
    value: "More",
    label: "viewings booked",
    icon: CalendarCheck,
  },
  {
    value: "Better",
    label: "qualified buyer leads",
    icon: UserRoundCheck,
  },
  {
    value: "Less",
    label: "manual lead chasing",
    icon: MousePointerClick,
  },
];

const realEstateChannels = ["Website", "WhatsApp", "Instagram", "Facebook"];
const viewingStages = [
  "New lead",
  "Qualified",
  "Viewing booked",
  "Follow-up",
  "Negotiation",
  "Closed",
];
const realEstateSentiments = [
  "Hot lead",
  "Casual enquiry",
  "Price-sensitive",
  "Ready to view",
  "Needs agent",
];
const realEstateKnowledgeItems = [
  "Listings",
  "Pricing notes",
  "Locations",
  "Availability",
  "Viewing rules",
  "Agency FAQs",
  "Follow-up instructions",
];

export function RealEstateIndustryPage() {
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
          <Badge>Real Estate</Badge>
          <h1 className="text-h1 mt-6 max-w-4xl font-medium text-foreground">
            Respond to property leads{" "}
            <span className="text-primary">
              before they go <span className="block sm:inline">cold.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-muted-foreground">
            AI voice and chat agents that answer property enquiries, qualify
            buyers and renters, send WhatsApp follow-ups, and help book viewings
            faster.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["AI Voice Agent", "AI Chat Agent", "WhatsApp follow-up"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary"
                >
                  {item}
                </span>
              ),
            )}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/contact">
                See Real Estate Demo <ArrowRight aria-hidden />
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
              <Link href="/contact">View Voice Agent Pricing</Link>
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
        {realEstatePainCards.map((card) => (
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
            title="What your Real Estate AI Agent can handle"
            subtitle="Tap a card to preview how voice, chat, and WhatsApp follow-ups help turn property enquiries into booked viewings."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {realEstateUseCases.map((useCase) => (
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
                    Preview how voice, chat, and WhatsApp follow-up help move a
                    property enquiry toward a viewing.
                  </DialogDescription>
                </div>
                <span className="w-fit rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {activeUseCase.mode}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {activeUseCase.lead && (
                  <IndustryChatBubble label="Lead" text={activeUseCase.lead} />
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
                  Real GIFs and videos can be added once your real estate
                  workflow is mapped.
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
            title="Your real estate command centre."
            subtitle="Manage listings, view call and chat transcripts, track buyer intent, and control what the AI knows from one dashboard."
          />
        </FadeUp>

        <FadeUp delay={0.08}>
          <Card className="mt-12 overflow-hidden p-4 shadow-card sm:p-5 lg:p-6">
            <div className="rounded-2xl border border-border bg-background/45 p-4 sm:p-5">
              <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Kaizen Real Estate Dashboard
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Listings, calls, chats, viewings, and follow-ups in one
                    place.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Listings", "Calls", "Chats", "Pipeline", "Knowledge"].map(
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
                  icon={ImageIcon}
                  title="Property Inventory Manager"
                  description="Upload property images, descriptions, prices, availability, viewing times, location details, and FAQs so the AI can answer accurately."
                >
                  <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
                    <div className="flex min-h-64 flex-col justify-between rounded-2xl border border-primary/20 bg-primary/10 p-4">
                      <div>
                        <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-primary/35 bg-background/35">
                          <div className="text-center">
                            <ImageIcon
                              className="mx-auto h-6 w-6 text-primary"
                              aria-hidden
                            />
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                              Image upload
                            </p>
                          </div>
                        </div>
                        <p className="mt-4 text-sm font-semibold text-foreground">
                          3-bedroom apartment placeholder
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" aria-hidden />
                          Colombo 05
                        </p>
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-2 text-xs min-[430px]:grid-cols-2">
                        {[
                          ["Price", "$XXX,XXX"],
                          ["Status", "Available"],
                          ["Beds", "3"],
                          ["Baths", "2"],
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
                        ["Property description", "Modern apartment near schools"],
                        ["Viewing notes", "Weekend viewings preferred"],
                        ["Availability", "Ready for scheduled viewings"],
                        ["Location details", "Nearby transport and amenities"],
                        ["FAQ notes", "Parking, pets, maintenance, documents"],
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
                  title="Voice Call Transcripts"
                  description="View full AI voice call transcripts, summaries, buyer intent, and next action after every call."
                >
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Caller: Buyer name
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Intent: Weekend viewing
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
                        Summary: budget confirmed, asked about parking, wants
                        Saturday viewing.
                      </p>
                      <p className="rounded-xl border border-border bg-background/45 p-3">
                        Transcript preview: Interested in the apartment near
                        Colombo 05.
                      </p>
                    </div>
                  </div>
                </IndustryDashboardPanel>

                <IndustryDashboardPanel
                  icon={PanelTop}
                  title="Chat Transcripts by Channel"
                  description="View every property enquiry separately by channel."
                >
                  <div className="flex flex-wrap gap-2">
                    {realEstateChannels.map((channel, index) => (
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
                      "Asks about apartment availability",
                      "Requests location pin",
                      "Wants weekend viewing",
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
                  title="Sales / Viewing Pipeline"
                  description="Track every property enquiry from first message to viewing and follow-up."
                  className="xl:col-span-2"
                >
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {viewingStages.map((stage, index) => (
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
                  title="Lead Sentiment and Urgency"
                  description="Understand which leads need attention first."
                >
                  <div className="flex flex-wrap gap-2">
                    {realEstateSentiments.map((label) => (
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
                  description="The agency controls what the AI knows and can update property or business information anytime."
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    {realEstateKnowledgeItems.map((item) => (
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
                  description="No private business, listing, or customer data belongs to Kaizen AI. The agency keeps control of its listings, leads, transcripts, and dashboard data."
                  className="xl:col-span-2"
                >
                  <div className="flex flex-col gap-3 rounded-2xl border border-primary/25 bg-primary/10 p-4 sm:flex-row sm:items-center">
                    <LockKeyhole className="h-6 w-6 text-primary" aria-hidden />
                    <p className="text-sm font-semibold text-foreground">
                      Agency-controlled listings, leads, transcripts, customer
                      conversations, and dashboard data.
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
          {realEstateOutcomeCards.map((card) => (
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
          volume, property demand, follow-up process, and implementation.
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
            title="From enquiry to viewing follow-up."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "AI Voice Call",
              preview: "Buyer calls about a property listing.",
              icon: Phone,
            },
            {
              title: "AI Qualification",
              preview:
                "AI asks for budget, location, timeline, and viewing preference.",
              icon: Bot,
            },
            {
              title: "WhatsApp Follow-up",
              preview:
                "Buyer receives property details, viewing time, location, and next steps by WhatsApp.",
              icon: Send,
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
                  {index < 2 && (
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
              <Badge>Real estate growth</Badge>
              <h2 className="text-h2 mt-5 font-medium text-foreground">
                Turn property enquiries into booked viewings.
              </h2>
              <p className="mt-5 text-lead text-muted-foreground">
                Answer calls, reply to messages, qualify leads, send WhatsApp
                follow-ups, and help your agents focus on serious buyers.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="xl" className="w-full sm:w-auto">
                  <Link href="/contact#book">Book a Call</Link>
                </Button>
                <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                  <Link href="/contact">See Live Demo</Link>
                </Button>
                <Button asChild size="xl" variant="secondary" className="w-full sm:w-auto">
                  <Link href="/contact">View Voice Agent Pricing</Link>
                </Button>
              </div>
            </div>
          </Card>
        </FadeUp>
      </Container>
    </section>
  );
}
