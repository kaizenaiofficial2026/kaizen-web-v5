"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
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
  Users,
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

type ClinicPainCard = {
  title: string;
  text: string;
  badge: string;
  icon: LucideIcon;
  className: string;
  isPrimary?: boolean;
};

type ClinicUseCase = {
  title: string;
  description: string;
  icon: LucideIcon;
  mode: string;
  patient?: string;
  ai: string;
  followUp?: string;
  visualLabel: string;
};

type ClinicOutcomeCard = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const clinicPainCards: ClinicPainCard[] = [
  {
    title: "Lost appointment requests",
    text: "Patients move on when no one replies or follows up fast enough.",
    badge: "Lost appointment",
    icon: Calendar,
    isPrimary: true,
    className:
      "sm:col-span-2 lg:absolute lg:left-[22%] lg:top-[34%] lg:z-30 lg:w-[56%] lg:rotate-[-1deg]",
  },
  {
    title: "Missed patient calls",
    text: "Patients call during busy hours and no one has time to answer.",
    badge: "Missed booking",
    icon: Phone,
    className:
      "lg:absolute lg:left-[2%] lg:top-[1%] lg:z-20 lg:w-[36%] lg:rotate-[-6deg]",
  },
  {
    title: "Front desk overload",
    text: "Reception keeps answering the same questions about services, doctors, prices, and availability.",
    badge: "Staff pressure",
    icon: Users,
    className:
      "lg:absolute lg:right-[1%] lg:top-0 lg:z-20 lg:w-[42%] lg:rotate-[5deg]",
  },
  {
    title: "No-show reminders",
    text: "Appointments get missed when reminders are not sent at the right time.",
    badge: "Missed reminder",
    icon: Bell,
    className:
      "lg:absolute lg:bottom-[3%] lg:left-[5%] lg:z-20 lg:w-[43%] lg:rotate-[4deg]",
  },
  {
    title: "Too many channels",
    text: "Phone · WhatsApp · Website · Instagram · Facebook",
    badge: "Scattered enquiries",
    icon: PanelTop,
    className:
      "lg:absolute lg:bottom-[5%] lg:right-[2%] lg:z-20 lg:w-[38%] lg:rotate-[-4deg]",
  },
];

const clinicUseCases: ClinicUseCase[] = [
  {
    title: "Appointment booking",
    description: "Collects preferred day, service, and contact details.",
    icon: Calendar,
    mode: "Voice or chat",
    patient: "Hi, can I book a cleaning appointment this week?",
    ai: "Yes, I can help with that. I’ll collect your preferred day and send the appointment details.",
    followUp: "WhatsApp confirmation sent with appointment details.",
    visualLabel: "Booking preview",
  },
  {
    title: "Missed call callback",
    description: "Calls back missed enquiries before they go cold.",
    icon: Phone,
    mode: "AI Voice Agent",
    ai: "Hi, this is the clinic assistant calling back. I noticed we missed your call. How can I help?",
    followUp: "Call summary saved for the front desk.",
    visualLabel: "Voice callback preview",
  },
  {
    title: "WhatsApp appointment confirmation",
    description: "Sends details and next steps after a booking request.",
    icon: Send,
    mode: "WhatsApp",
    patient: "Please confirm my appointment details.",
    ai: "Your appointment request has been noted. Here are the details and next steps on WhatsApp.",
    followUp: "Patient receives date, time, service, and clinic instructions.",
    visualLabel: "WhatsApp confirmation preview",
  },
  {
    title: "Appointment reminders",
    description: "Reduces forgotten visits with timely reminders.",
    icon: Bell,
    mode: "WhatsApp reminder",
    ai: "Reminder: your appointment is scheduled for tomorrow. Please reply if you need to reschedule.",
    followUp: "Reminder status marked in the dashboard.",
    visualLabel: "Reminder preview",
  },
  {
    title: "Service and doctor FAQs",
    description: "Answers approved questions about services and availability.",
    icon: FileText,
    mode: "Chat support",
    patient: "Do you offer evening appointments with Dr. Perera?",
    ai: "I can check the clinic’s approved availability notes and collect your preferred time for the team.",
    followUp: "FAQ answer stays within clinic-approved information.",
    visualLabel: "FAQ response preview",
  },
  {
    title: "Human handoff to receptionist",
    description: "Escalates priority enquiries with full context.",
    icon: UserRoundCheck,
    mode: "Handoff",
    patient: "Can I speak to reception before booking?",
    ai: "I’ll pass this to the receptionist with your enquiry summary so you don’t need to repeat everything.",
    followUp: "Reception gets the summary and conversation context.",
    visualLabel: "Reception handoff preview",
  },
  {
    title: "Patient enquiry summary",
    description: "Summarises calls and chats for quick staff review.",
    icon: ClipboardList,
    mode: "Dashboard summary",
    patient: "I need to ask about appointment slots and pricing.",
    ai: "I’ll summarise the service, preferred time, contact details, and next step for the clinic team.",
    followUp: "Summary saved with channel and intent labels.",
    visualLabel: "Summary preview",
  },
  {
    title: "Follow-up after enquiry",
    description: "Keeps appointment intent moving after first contact.",
    icon: MessageCircle,
    mode: "WhatsApp follow-up",
    patient: "I’m not sure which time works yet.",
    ai: "No problem. I can follow up with available appointment options and a reminder to confirm.",
    followUp: "Next-step message sent automatically.",
    visualLabel: "Follow-up preview",
  },
];

const clinicOutcomeCards: ClinicOutcomeCard[] = [
  {
    value: "Under 5 sec",
    label: "average chat response time",
    icon: Clock3,
  },
  {
    value: "24/7",
    label: "patient enquiry coverage",
    icon: Phone,
  },
  {
    value: "More",
    label: "appointments captured",
    icon: Calendar,
  },
  {
    value: "Less",
    label: "front desk pressure",
    icon: Users,
  },
  {
    value: "Fewer",
    label: "missed calls and forgotten follow-ups",
    icon: Bell,
  },
];

const clinicChannels = ["Website", "WhatsApp", "Instagram", "Facebook"];
const appointmentStages = [
  "New enquiry",
  "Details collected",
  "Appointment requested",
  "Reminder sent",
  "Completed / Follow-up",
];
const clinicSentiments = ["Positive", "Confused", "Urgent", "Unhappy", "Ready to book"];
const clinicKnowledgeItems = [
  "Services",
  "Doctors",
  "Opening hours",
  "Appointment rules",
  "FAQs",
  "Follow-up instructions",
];

export function ClinicsHealthcareIndustryPage() {
  const [activeUseCase, setActiveUseCase] = useState<ClinicUseCase | null>(null);

  return (
    <main id="main" className="relative overflow-hidden">
      <ClinicHero />
      <ClinicUseCaseCards
        activeUseCase={activeUseCase}
        setActiveUseCase={setActiveUseCase}
      />
      <ClinicDashboardPreview />
      <ClinicOutcomeCards />
      <ClinicMiniDemo />
      <ClinicCta />
    </main>
  );
}

function ClinicHero() {
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
        <FadeUp>
          <Badge>Clinics & Healthcare</Badge>
          <h1 className="text-h1 mt-6 max-w-4xl font-medium text-foreground">
            Fill appointments without overwhelming{" "}
            <span className="text-primary">your front desk.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-muted-foreground">
            AI voice and chat agents that answer patient calls, reply to
            WhatsApp enquiries, book appointments, send reminders, and follow up
            automatically.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/demo">
                See Clinic Demo <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
              <Link href="/book-demo">Book a Call</Link>
            </Button>
            <Button asChild size="xl" variant="secondary" className="w-full sm:w-auto">
              <Link href="/pricing?type=voice">View Voice Agent Pricing</Link>
            </Button>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ClinicHeroVisual />
        </FadeUp>
      </Container>
    </section>
  );
}

function ClinicHeroVisual() {
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
        {clinicPainCards.map((card) => (
          <ClinicPainPointCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}

function ClinicPainPointCard({ card }: { card: ClinicPainCard }) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-primary/25 bg-card/70 p-4 shadow-card backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-primary/55 hover:shadow-glow lg:hover:rotate-0",
        card.isPrimary ? "p-5 sm:p-6" : "p-4",
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
        <span className="rounded-full border border-primary/25 bg-background/55 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">
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

type ClinicUseCaseCardsProps = {
  activeUseCase: ClinicUseCase | null;
  setActiveUseCase: (useCase: ClinicUseCase | null) => void;
};

function ClinicUseCaseCards({
  activeUseCase,
  setActiveUseCase,
}: ClinicUseCaseCardsProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Use cases"
            title="What your Clinic AI Agent can handle"
            subtitle="Tap a card to preview how voice, chat, and WhatsApp follow-ups work together."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clinicUseCases.map((useCase) => (
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

      <ClinicUseCaseDialog
        activeUseCase={activeUseCase}
        setActiveUseCase={setActiveUseCase}
      />
    </section>
  );
}

function ClinicUseCaseDialog({
  activeUseCase,
  setActiveUseCase,
}: ClinicUseCaseCardsProps) {
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
              <div className="relative flex h-44 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                <div className="text-center">
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
                    Preview how voice, chat, and WhatsApp follow-up support
                    clinic enquiries without giving medical advice.
                  </DialogDescription>
                </div>
                <span className="w-fit rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {activeUseCase.mode}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {activeUseCase.patient && (
                  <ClinicChatBubble label="Patient" text={activeUseCase.patient} />
                )}
                <ClinicChatBubble label="AI" text={activeUseCase.ai} align="end" />
                {activeUseCase.followUp && (
                  <ClinicChatBubble
                    label="WhatsApp / dashboard"
                    text={activeUseCase.followUp}
                  />
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Real GIFs and videos can be added once your clinic workflow is
                  mapped.
                </p>
                <Button asChild>
                  <Link href="/book-demo">Book a Call</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ClinicChatBubble({
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
            : "rounded-tl-sm border-border bg-background/45 text-foreground/84",
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

function ClinicDashboardPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Dashboard"
            title="Your clinic command centre."
            subtitle="Manage services, view call and chat transcripts, track appointment enquiries, and control what the AI knows from one dashboard."
          />
        </FadeUp>

        <FadeUp delay={0.08}>
          <Card className="mt-12 overflow-hidden p-4 shadow-card sm:p-5 lg:p-6">
            <div className="rounded-2xl border border-border bg-background/45 p-4 sm:p-5">
              <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Kaizen Clinic Dashboard
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Calls, chats, appointments, services, and follow-ups in one
                    place.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Calls", "Appointments", "Knowledge"].map((item, index) => (
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
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <ClinicDashboardPanel
                  icon={Calendar}
                  title="Service Inventory Manager"
                  description="Upload clinic services, appointment types, doctor availability, pricing notes, FAQs, and business information so the AI can answer accurately."
                >
                  <div className="grid gap-2">
                    {[
                      ["Service name", "Dental cleaning"],
                      ["Doctor or department", "General dentistry"],
                      ["Description", "Routine cleaning appointment"],
                      ["Price placeholder", "From $XX"],
                      ["Duration", "45 minutes"],
                      ["Availability notes", "Weekdays and selected evenings"],
                      ["FAQ notes", "Preparation, payment, reschedule rules"],
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
                </ClinicDashboardPanel>

                <ClinicDashboardPanel
                  icon={Phone}
                  title="Voice Call Transcripts"
                  description="View full AI voice call transcripts, summaries, and patient intent after every call."
                >
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Caller: Patient name
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Intent: Appointment request
                        </p>
                      </div>
                      <span className="rounded-full border border-primary/25 bg-background/45 px-3 py-1 text-xs font-semibold text-primary">
                        Audio
                      </span>
                    </div>
                    <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                      <p className="rounded-xl border border-border bg-background/45 p-3">
                        Summary: asked about availability, preferred Friday,
                        requested WhatsApp confirmation.
                      </p>
                      <p className="rounded-xl border border-border bg-background/45 p-3">
                        Transcript preview: “I’d like to book a consultation
                        this week if possible...”
                      </p>
                    </div>
                  </div>
                </ClinicDashboardPanel>

                <ClinicDashboardPanel
                  icon={PanelTop}
                  title="Chat Transcripts by Channel"
                  description="View every patient conversation separately by channel."
                >
                  <div className="flex flex-wrap gap-2">
                    {clinicChannels.map((channel, index) => (
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
                    {["Book cleaning", "Ask opening hours", "Need reminder"].map(
                      (message) => (
                        <div
                          key={message}
                          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/45 px-3 py-2"
                        >
                          <span className="text-xs font-medium text-foreground">
                            {message}
                          </span>
                          <span className="text-xs text-primary">Logged</span>
                        </div>
                      ),
                    )}
                  </div>
                </ClinicDashboardPanel>

                <ClinicDashboardPanel
                  icon={BarChart3}
                  title="Appointment Pipeline"
                  description="Track appointment enquiries from first contact to follow-up."
                >
                  <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {appointmentStages.map((stage, index) => (
                      <div
                        key={stage}
                        className="rounded-xl border border-border bg-background/45 p-3"
                      >
                        <div className="mb-3 h-1.5 rounded-full bg-primary/20">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${Math.max(35, 100 - index * 14)}%` }}
                          />
                        </div>
                        <p className="text-xs font-semibold text-foreground">
                          {stage}
                        </p>
                      </div>
                    ))}
                  </div>
                </ClinicDashboardPanel>

                <ClinicDashboardPanel
                  icon={Tags}
                  title="Conversation Sentiment"
                  description="Understand patient conversation mood and urgency faster."
                >
                  <div className="flex flex-wrap gap-2">
                    {clinicSentiments.map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-foreground"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </ClinicDashboardPanel>

                <ClinicDashboardPanel
                  icon={Bot}
                  title="AI Knowledge Control"
                  description="The clinic controls what the AI knows and can update service or business information anytime."
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    {clinicKnowledgeItems.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-xl border border-border bg-background/45 px-3 py-2 text-sm text-foreground/84"
                      >
                        <CheckCircle2
                          className="h-4 w-4 text-primary"
                          aria-hidden
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </ClinicDashboardPanel>

                <ClinicDashboardPanel
                  icon={ShieldCheck}
                  title="Privacy / Data Control"
                  description="No private clinic, business, or customer data belongs to Kaizen AI. The clinic keeps control of its services, patient conversations, transcripts, and dashboard data."
                >
                  <div className="flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary/10 p-4">
                    <LockKeyhole className="h-6 w-6 text-primary" aria-hidden />
                    <p className="text-sm font-semibold text-foreground">
                      Clinic-controlled service, conversation, transcript, and
                      dashboard data.
                    </p>
                  </div>
                </ClinicDashboardPanel>
              </div>
            </div>
          </Card>
        </FadeUp>
      </Container>
    </section>
  );
}

function ClinicDashboardPanel({
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
        "rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm",
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

function ClinicOutcomeCards() {
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
          {clinicOutcomeCards.map((card) => (
            <StaggerItem key={card.label}>
              <Card className="h-full p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-5 text-3xl font-semibold text-foreground">
                  {card.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{card.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
          Example metrics shown for demo. Actual results depend on enquiry
          volume, clinic workflow, booking process, and implementation.
        </p>
      </Container>
    </section>
  );
}

function ClinicMiniDemo() {
  return (
    <section className="py-12 sm:py-18">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Mini demo"
            title="From call to WhatsApp follow-up."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "AI Voice Call",
              preview: "Patient calls and asks about an appointment.",
              icon: Phone,
            },
            {
              title: "AI Response",
              preview:
                "AI answers naturally, collects details, and confirms the next step.",
              icon: Bot,
            },
            {
              title: "WhatsApp Follow-up",
              preview:
                "Patient receives appointment details, reminder, or enquiry summary by WhatsApp.",
              icon: Send,
            },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <Card className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/45">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="h-2 w-16 rounded-full bg-primary/25" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
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

function ClinicCta() {
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
              <Badge>Clinic growth</Badge>
              <h2 className="text-h2 mt-5 font-medium text-foreground">
                Let AI handle routine patient enquiries before your staff gets
                overloaded.
              </h2>
              <p className="mt-5 text-lead text-muted-foreground">
                Answer calls, reply to messages, confirm appointments, and send
                follow-ups automatically while your team focuses on patient care.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="xl" className="w-full sm:w-auto">
                  <Link href="/book-demo">Book a Call</Link>
                </Button>
                <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                  <Link href="/demo">See Live Demo</Link>
                </Button>
                <Button asChild size="xl" variant="secondary" className="w-full sm:w-auto">
                  <Link href="/pricing?type=voice">View Voice Agent Pricing</Link>
                </Button>
              </div>
            </div>
          </Card>
        </FadeUp>
      </Container>
    </section>
  );
}
