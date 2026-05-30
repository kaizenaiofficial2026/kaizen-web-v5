"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Database,
  FileText,
  FolderCheck,
  Gauge,
  GitBranch,
  Inbox,
  Landmark,
  ListChecks,
  LockKeyhole,
  Mail,
  MousePointerClick,
  PanelTop,
  PencilLine,
  Repeat2,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  SquareKanban,
  Workflow,
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

type AutomationUseCase = {
  title: string;
  description: string;
  icon: LucideIcon;
  problem: string;
  preview: string[];
  result: string;
  note?: string;
  visualLabel: string;
};

type AutomationBuilderColumn = {
  title: string;
  icon: LucideIcon;
  cards: string[];
};

type IndustryOutcomeCard = {
  value: string;
  label: string;
  icon: LucideIcon;
  countTo?: number;
  suffix?: string;
};

const automationPainCards: IndustryPainCard[] = [
  {
    title: "Manual work is slowing growth",
    text: "Your team spends hours repeating admin tasks instead of focusing on customers, sales, and decisions.",
    badge: "Growth blocker",
    icon: Repeat2,
    isPrimary: true,
    className:
      "sm:col-span-2 lg:absolute lg:left-[20%] lg:top-[32%] lg:z-30 lg:w-[60%] lg:rotate-[-1deg]",
  },
  {
    title: "Manual data entry",
    text: "Staff copy the same information between forms, spreadsheets, CRMs, emails, and systems every day.",
    badge: "Time leak",
    icon: PencilLine,
    className:
      "lg:absolute lg:left-[2%] lg:top-[3%] lg:z-20 lg:w-[38%] lg:rotate-[-6deg]",
  },
  {
    title: "Disconnected tools",
    text: "Leads, tasks, documents, invoices, reports, and updates are scattered across too many platforms.",
    badge: "Messy workflow",
    icon: GitBranch,
    className:
      "lg:absolute lg:right-[1%] lg:top-[1%] lg:z-20 lg:w-[43%] lg:rotate-[5deg]",
  },
  {
    title: "Slow follow-ups",
    text: "Customers, leads, suppliers, and internal teams wait because reminders and updates are handled manually.",
    badge: "Delayed action",
    icon: Clock3,
    className:
      "lg:absolute lg:bottom-[4%] lg:left-[4%] lg:z-20 lg:w-[43%] lg:rotate-[4deg]",
  },
  {
    title: "No clear visibility",
    text: "Reports / CRM / Email / Accounting / Tasks",
    badge: "Scattered operations",
    icon: PanelTop,
    className:
      "lg:absolute lg:bottom-[6%] lg:right-[1%] lg:z-20 lg:w-[40%] lg:rotate-[-4deg]",
  },
];

const automationUseCases: AutomationUseCase[] = [
  {
    title: "Lead Follow-Up Automation",
    description: "Responds, logs, reminds, and moves leads through your pipeline.",
    icon: Send,
    problem: "New leads come in, but follow-ups are delayed or forgotten.",
    preview: [
      "New lead received",
      "AI sends follow-up",
      "Updates lead status",
      "Notifies team",
      "Logs activity in dashboard",
    ],
    result: "Faster response, fewer forgotten leads, cleaner sales pipeline.",
    visualLabel: "Lead follow-up automation preview",
  },
  {
    title: "CRM Update Automation",
    description: "Keeps customer records, notes, stages, and next actions cleaner.",
    icon: Database,
    problem:
      "Sales teams forget to update customer records, notes, and lead stages.",
    preview: [
      "AI reads the enquiry",
      "Updates CRM fields",
      "Adds notes",
      "Sets next action",
      "Alerts assigned staff",
    ],
    result: "Cleaner CRM, better visibility, less manual admin.",
    visualLabel: "CRM update automation preview",
  },
  {
    title: "Document Processing",
    description: "Extracts, classifies, and summarises forms, PDFs, and files.",
    icon: FileText,
    problem:
      "Staff manually read forms, PDFs, invoices, applications, and enquiry files.",
    preview: [
      "Document uploaded",
      "AI extracts key details",
      "Classifies the file",
      "Creates a summary",
      "Sends it for review",
    ],
    result: "Faster document handling and fewer manual checks.",
    visualLabel: "Document processing preview",
  },
  {
    title: "Internal Reporting",
    description: "Prepares recurring summaries and highlights items to watch.",
    icon: BarChart3,
    problem: "Managers wait for manual daily, weekly, or monthly reports.",
    preview: [
      "AI collects business activity",
      "Summarises key numbers",
      "Highlights risks",
      "Prepares dashboard report",
    ],
    result: "Faster reporting and better management visibility.",
    visualLabel: "Internal reporting preview",
  },
  {
    title: "Customer Support Routing",
    description: "Sorts enquiries by category, urgency, and team owner.",
    icon: Route,
    problem:
      "Customer enquiries go to the wrong person or sit unanswered.",
    preview: [
      "AI reads the enquiry",
      "Identifies category",
      "Sets urgency",
      "Routes it to the right team",
    ],
    result: "Faster support handling and fewer missed issues.",
    visualLabel: "Support routing preview",
  },
  {
    title: "Approval Workflow Tracking",
    description: "Tracks owners, reminders, overdue items, and review status.",
    icon: ClipboardCheck,
    problem:
      "Approvals get delayed because reminders and ownership are unclear.",
    preview: [
      "Request created",
      "AI tracks pending approval",
      "Sends reminder",
      "Escalates overdue items",
      "Updates dashboard",
    ],
    result: "Fewer bottlenecks and better process control.",
    visualLabel: "Approval workflow preview",
  },
  {
    title: "Email and Message Automation",
    description: "Classifies, drafts, routes, or sends repeated messages.",
    icon: Mail,
    problem:
      "Teams spend too much time sorting, drafting, and replying to repeated messages.",
    preview: [
      "AI reads the email or message",
      "Classifies it",
      "Drafts response",
      "Routes or sends based on rules",
    ],
    result: "Less inbox pressure and faster communication.",
    visualLabel: "Email automation preview",
  },
  {
    title: "Custom Dashboard Alerts",
    description: "Makes important activity visible before it gets missed.",
    icon: Bell,
    problem:
      "Important events are missed because there is no single control centre.",
    preview: [
      "AI detects important activity",
      "Triggers dashboard alert",
      "Sends notification",
      "Logs action",
    ],
    result: "Important work becomes visible immediately.",
    visualLabel: "Dashboard alert preview",
  },
  {
    title: "Accounting Automation",
    description: "Supports finance workflows with extraction and review queues.",
    icon: Landmark,
    problem:
      "Finance teams manually handle invoices, expenses, payment reminders, reconciliation notes, and report preparation.",
    preview: [
      "Invoice or expense received",
      "AI extracts details",
      "Categorises the transaction",
      "Flags missing information",
      "Prepares finance summary for review",
    ],
    result:
      "Less manual finance admin, cleaner records, faster reporting support.",
    note: "Designed as accounting workflow support, not a replacement for accountants or final accounting decisions.",
    visualLabel: "Accounting workflow preview",
  },
  {
    title: "Tax Workflow Support",
    description: "Organises tax documents, reminders, checklists, and summaries.",
    icon: FolderCheck,
    problem:
      "Tax-related documents, deadlines, forms, and summaries are often managed manually and can become messy.",
    preview: [
      "Tax-related documents received",
      "AI organises files",
      "Extracts key values",
      "Prepares checklist",
      "Sends reminder",
      "Creates review summary",
    ],
    result:
      "Better preparation, fewer forgotten documents, clearer tax workflow visibility.",
    note: "Designed for tax workflow support and accountant review preparation, not tax advice or independent filing.",
    visualLabel: "Tax workflow support preview",
  },
];

const automationBuilderColumns: AutomationBuilderColumn[] = [
  {
    title: "Business Inputs",
    icon: Inbox,
    cards: [
      "Website forms",
      "WhatsApp messages",
      "Emails",
      "CRM records",
      "Spreadsheets",
      "PDFs and invoices",
      "Accounting files",
      "Customer enquiries",
    ],
  },
  {
    title: "AI Processing",
    icon: Bot,
    cards: [
      "Read",
      "Classify",
      "Summarise",
      "Extract data",
      "Recommend action",
      "Route to team",
      "Prepare report",
      "Flag missing details",
    ],
  },
  {
    title: "Business Actions",
    icon: Workflow,
    cards: [
      "Send follow-up",
      "Update CRM",
      "Create task",
      "Generate report",
      "Notify staff",
      "Prepare finance summary",
      "Prepare tax checklist",
      "Escalate issue",
    ],
  },
  {
    title: "Dashboard Control",
    icon: Gauge,
    cards: [
      "Activity logs",
      "Pending tasks",
      "Pipeline stages",
      "Workflow status",
      "Finance summaries",
      "Review queue",
      "Alerts",
      "Performance reports",
    ],
  },
];

const workflowStages = [
  "New task",
  "Processing",
  "Waiting approval",
  "Review needed",
  "Completed",
];

const knowledgeItems = [
  "SOPs",
  "Service descriptions",
  "FAQs",
  "Process notes",
  "Internal instructions",
  "Finance rules",
  "Tax document checklists",
];

const performanceItems = [
  ["Manual tasks reduced", "Visible"],
  ["Pending items", "12"],
  ["Completed tasks", "48"],
  ["Bottlenecks", "3"],
  ["Response time", "Faster"],
  ["Review queue", "Ready"],
];

const automationOutcomeCards: IndustryOutcomeCard[] = [
  {
    value: "24/7",
    label: "workflow monitoring",
    icon: Clock3,
    countTo: 24,
    suffix: "/7",
  },
  {
    value: "Less",
    label: "manual admin work",
    icon: Repeat2,
  },
  {
    value: "Faster",
    label: "lead and task follow-up",
    icon: Send,
  },
  {
    value: "Clearer",
    label: "business visibility",
    icon: Gauge,
  },
  {
    value: "More",
    label: "time for high-value work",
    icon: Sparkles,
  },
];

export function CustomAIAutomationsPage() {
  const [activeUseCase, setActiveUseCase] =
    useState<AutomationUseCase | null>(null);

  return (
    <main id="main" className="relative overflow-hidden">
      <IndustryHero />
      <AutomationUseCaseCards
        activeUseCase={activeUseCase}
        setActiveUseCase={setActiveUseCase}
      />
      <AutomationSystemBuilder />
      <AutomationDashboardPreview />
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
          <Badge>Custom AI Automations</Badge>
          <h1 className="text-h1 mt-6 max-w-4xl font-medium text-foreground">
            Automate the work your team repeats{" "}
            <span className="text-primary">
              every <span className="block sm:inline">day.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-muted-foreground">
            Custom AI systems that connect your tools, process information,
            reduce manual work, and give your team a dashboard to manage
            operations.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Workflow automation", "AI modules", "Custom dashboard"].map(
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
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            AI Chat Agents and Voice Agents handle conversations. Custom AI
            Automations handle the work behind the conversations.
          </p>
          <p className="mt-2 max-w-xl text-sm font-semibold text-primary">
            Built around your workflow, not a fixed template.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/book-demo">
                Discuss Automation <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href="/book-demo">Book a Call</Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Link href="/demo">See Demo</Link>
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
        {automationPainCards.map((card) => (
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

type AutomationUseCaseCardsProps = {
  activeUseCase: AutomationUseCase | null;
  setActiveUseCase: (useCase: AutomationUseCase | null) => void;
};

function AutomationUseCaseCards({
  activeUseCase,
  setActiveUseCase,
}: AutomationUseCaseCardsProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Automation use cases"
            title="What can Kaizen AI automate for you?"
            subtitle="Tap a card to preview how AI can reduce manual work across sales, operations, finance, reporting, and customer workflows."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {automationUseCases.map((useCase) => (
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

      <AutomationUseCaseDialog
        activeUseCase={activeUseCase}
        setActiveUseCase={setActiveUseCase}
      />
    </section>
  );
}

function AutomationUseCaseDialog({
  activeUseCase,
  setActiveUseCase,
}: AutomationUseCaseCardsProps) {
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
                  className="absolute inset-x-8 top-10 grid grid-cols-6 gap-2 opacity-45"
                >
                  {[40, 64, 48, 78, 54, 70].map((height) => (
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
              <DialogTitle className="text-h3 text-foreground">
                {activeUseCase.title}
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm leading-6 text-muted-foreground">
                Preview how the workflow can move from manual task to AI-assisted
                action with dashboard visibility.
              </DialogDescription>

              <div className="mt-6 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
                <div className="rounded-2xl border border-border bg-background/45 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    Problem
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground/85">
                    {activeUseCase.problem}
                  </p>
                </div>
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    AI preview
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {activeUseCase.preview.map((step, index) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="rounded-full border border-primary/25 bg-background/55 px-3 py-1.5 text-xs font-semibold text-foreground">
                          {step}
                        </span>
                        {index < activeUseCase.preview.length - 1 && (
                          <ArrowRight
                            className="h-3.5 w-3.5 text-primary/70"
                            aria-hidden
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-border bg-background/45 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Business result
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/85">
                  {activeUseCase.result}
                </p>
                {activeUseCase.note && (
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    {activeUseCase.note}
                  </p>
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Real GIFs and videos can be added once your workflow is
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

function AutomationSystemBuilder() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="System builder"
            title="Built around your workflow."
            subtitle="We connect the inputs, AI actions, business tools, and dashboards your team needs."
          />
        </FadeUp>

        <FadeUp delay={0.08}>
          <Card className="mt-12 overflow-hidden p-4 shadow-card sm:p-5 lg:p-6">
            <div className="rounded-2xl border border-border bg-background/45 p-4 sm:p-5">
              <div className="grid gap-4 lg:grid-cols-4">
                {automationBuilderColumns.map((column, columnIndex) => (
                  <div key={column.title} className="relative">
                    {columnIndex < automationBuilderColumns.length - 1 && (
                      <div
                        aria-hidden
                        className="absolute right-[-1.25rem] top-12 hidden h-px w-8 bg-primary/35 lg:block"
                      />
                    )}
                    <div className="h-full rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                          <column.icon className="h-5 w-5" aria-hidden />
                        </span>
                        <h3 className="text-base font-semibold text-foreground">
                          {column.title}
                        </h3>
                      </div>
                      <div className="mt-5 grid gap-2">
                        {column.cards.map((item, itemIndex) => (
                          <div
                            key={item}
                            className={cn(
                              "rounded-xl border px-3 py-2 text-sm font-medium",
                              itemIndex % 3 === 0
                                ? "border-primary/25 bg-primary/10 text-foreground"
                                : "border-border bg-background/45 text-foreground/82",
                            )}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </FadeUp>
      </Container>
    </section>
  );
}

function AutomationDashboardPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Dashboard"
            title="Your business control centre."
            subtitle="See what the AI processed, what actions were taken, what needs review, and where your workflow is stuck."
          />
        </FadeUp>

        <FadeUp delay={0.08}>
          <Card className="mt-12 overflow-hidden p-4 shadow-card sm:p-5 lg:p-6">
            <div className="rounded-2xl border border-border bg-background/45 p-4 sm:p-5">
              <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Kaizen Custom Automation Dashboard
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Workflows, documents, tasks, finance support, alerts, and
                    review queues in one place.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Workflows", "Tasks", "Finance", "Tax", "Alerts"].map(
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

              <div className="mt-5 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                <AutomationDashboardPanel
                  icon={Workflow}
                  title="Workflow Control Centre"
                  description="Manage workflows, triggers, rules, and AI actions from one place."
                >
                  <div className="overflow-hidden rounded-2xl border border-border">
                    {[
                      ["Workflow", "Lead follow-up"],
                      ["Trigger", "New form entry"],
                      ["Action", "Send message + update CRM"],
                      ["Status", "Active"],
                      ["Last run", "2 min ago"],
                      ["Owner", "Sales team"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="grid gap-1 border-b border-border bg-background/45 px-3 py-2 last:border-b-0 sm:grid-cols-[0.8fr_1.2fr]"
                      >
                        <span className="text-xs text-muted-foreground">
                          {label}
                        </span>
                        <span className="text-xs font-semibold text-foreground sm:text-right">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </AutomationDashboardPanel>

                <AutomationDashboardPanel
                  icon={ClipboardList}
                  title="Business Knowledge Base"
                  description="Upload process notes, service details, documents, FAQs, SOPs, accounting rules, tax checklist requirements, and business instructions."
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    {knowledgeItems.map((item) => (
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
                </AutomationDashboardPanel>

                <AutomationDashboardPanel
                  icon={ListChecks}
                  title="Activity Logs"
                  description="View what the AI processed, what action it took, and what needs human review."
                >
                  <div className="space-y-2">
                    {[
                      ["Invoice processed", "Review needed", "Now"],
                      ["Lead follow-up sent", "Completed", "4 min"],
                      ["Support enquiry routed", "Assigned", "8 min"],
                    ].map(([item, status, time]) => (
                      <div
                        key={item}
                        className="grid gap-1 rounded-xl border border-border bg-background/45 px-3 py-2 sm:grid-cols-[1.2fr_0.8fr_auto] sm:items-center sm:gap-2"
                      >
                        <span className="text-xs font-medium text-foreground">
                          {item}
                        </span>
                        <span className="text-xs text-primary">{status}</span>
                        <span className="text-xs text-muted-foreground">
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>
                </AutomationDashboardPanel>

                <AutomationDashboardPanel
                  icon={SquareKanban}
                  title="Task / Pipeline Tracking"
                  description="Track tasks and workflow progress clearly."
                >
                  <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {workflowStages.map((stage, index) => (
                      <div
                        key={stage}
                        className="rounded-xl border border-border bg-background/45 p-3"
                      >
                        <div className="mb-3 h-1.5 rounded-full bg-primary/20">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${Math.max(34, 100 - index * 15)}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs font-semibold text-foreground">
                          {stage}
                        </p>
                      </div>
                    ))}
                  </div>
                </AutomationDashboardPanel>

                <AutomationDashboardPanel
                  icon={Landmark}
                  title="Finance and Accounting Summary"
                  description="Support accounting workflows by organising documents, extracting information, and preparing finance summaries for review."
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      "Invoices captured",
                      "Expenses categorised",
                      "Payment reminders",
                      "Missing details",
                      "Review queue",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-medium text-foreground"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </AutomationDashboardPanel>

                <AutomationDashboardPanel
                  icon={FolderCheck}
                  title="Tax Workflow Tracker"
                  description="Support tax preparation workflows by tracking documents, reminders, checklists, and summaries for the accountant or tax team."
                >
                  <div className="space-y-2">
                    {[
                      ["Document checklist", "6 of 8 ready"],
                      ["Deadline reminders", "Active"],
                      ["Missing documents", "2 flagged"],
                      ["Review status", "Accountant review"],
                      ["Prepared summary", "Draft ready"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/45 px-3 py-2"
                      >
                        <span className="text-xs text-muted-foreground">
                          {label}
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </AutomationDashboardPanel>

                <AutomationDashboardPanel
                  icon={Gauge}
                  title="Performance Summary"
                  description="Understand workload reduced, pending items, completed tasks, and bottlenecks."
                >
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {performanceItems.map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-border bg-background/45 p-3"
                      >
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </AutomationDashboardPanel>

                <AutomationDashboardPanel
                  icon={ShieldCheck}
                  title="Data Control"
                  description="Business data, workflow rules, customer records, finance documents, and internal files remain controlled by the client. Kaizen AI does not own private business or customer data."
                >
                  <div className="flex flex-col gap-3 rounded-2xl border border-primary/25 bg-primary/10 p-4 sm:flex-row sm:items-center">
                    <LockKeyhole className="h-6 w-6 text-primary" aria-hidden />
                    <p className="text-sm font-semibold text-foreground">
                      Client-controlled workflows, customer records, finance
                      documents, internal files, dashboard data, and review
                      queues.
                    </p>
                  </div>
                </AutomationDashboardPanel>
              </div>
            </div>
          </Card>
        </FadeUp>
      </Container>
    </section>
  );
}

function AutomationDashboardPanel({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="self-start rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
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
          {automationOutcomeCards.map((card) => (
            <StaggerItem key={card.label}>
              <Card className="h-full p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-5 text-3xl font-semibold text-foreground">
                  <CountUpValue card={card} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {card.label}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
          Example metrics shown for demo. Actual results depend on workflow
          complexity, tool access, business process, and implementation.
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
            title="From manual task to automated workflow."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 lg:grid-cols-4">
          {[
            {
              title: "Business Input",
              preview:
                "A form, message, document, invoice, email, or customer enquiry comes in.",
              icon: Inbox,
            },
            {
              title: "AI Processing",
              preview:
                "AI reads, extracts, classifies, summarises, and selects the next step based on approved rules.",
              icon: Bot,
            },
            {
              title: "Business Action",
              preview:
                "AI sends a follow-up, updates CRM, creates a task, prepares a report, or flags the item for review.",
              icon: Workflow,
            },
            {
              title: "Dashboard + Notification",
              preview:
                "Your team sees the update, gets notified, and reviews anything important.",
              icon: Bell,
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
                      <span className="h-px w-12 bg-primary/30" />
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
              <Badge>Custom automation</Badge>
              <h2 className="text-h2 mt-5 font-medium text-foreground">
                Show us your workflow. We&apos;ll show you what AI can automate.
              </h2>
              <p className="mt-5 text-lead text-muted-foreground">
                Whether it is lead follow-up, CRM updates, reporting, document
                handling, accounting workflows, tax preparation support, or
                internal task tracking, Kaizen AI can design a custom system
                around your business process.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="xl" className="w-full sm:w-auto">
                  <Link href="/book-demo">Book a Call</Link>
                </Button>
                <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                  <Link href="/book-demo">Discuss Automation</Link>
                </Button>
                <Button asChild size="xl" variant="secondary" className="w-full sm:w-auto">
                  <Link href="/demo">See Demo</Link>
                </Button>
              </div>
            </div>
          </Card>
        </FadeUp>
      </Container>
    </section>
  );
}
