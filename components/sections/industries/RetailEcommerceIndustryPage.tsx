"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  ImageIcon,
  LockKeyhole,
  MessageCircle,
  MousePointerClick,
  PackageCheck,
  Palette,
  PanelTop,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tags,
  Timer,
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

type PainCard = {
  title: string;
  text: string;
  badge: string;
  icon: LucideIcon;
  className: string;
  isPrimary?: boolean;
};

type UseCase = {
  title: string;
  description: string;
  icon: LucideIcon;
  customer: string;
  ai: string;
  visualLabel: string;
};

type OutcomeCard = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const painCards: PainCard[] = [
  {
    title: "Lost buying intent",
    text: "Interested shoppers disappear when no one follows up at the right time.",
    badge: "Lost sale risk",
    icon: Timer,
    isPrimary: true,
    className:
      "sm:col-span-2 lg:absolute lg:left-[22%] lg:top-[34%] lg:z-30 lg:w-[56%] lg:rotate-[-1deg]",
  },
  {
    title: "Missed DMs",
    text: "Customers ask on WhatsApp, Instagram, or Facebook and leave when replies are slow.",
    badge: "Slow reply",
    icon: MessageCircle,
    className:
      "lg:absolute lg:left-[2%] lg:top-[1%] lg:z-20 lg:w-[36%] lg:rotate-[-6deg]",
  },
  {
    title: "Repeated product questions",
    text: "Your team keeps answering the same questions about price, stock, size, colour, and delivery.",
    badge: "Manual work",
    icon: PackageCheck,
    className:
      "lg:absolute lg:right-[1%] lg:top-0 lg:z-20 lg:w-[42%] lg:rotate-[5deg]",
  },
  {
    title: "Manual product support",
    text: "Staff spend time replying instead of closing orders and handling priority customers.",
    badge: "Team overload",
    icon: ClipboardList,
    className:
      "lg:absolute lg:bottom-[3%] lg:left-[5%] lg:z-20 lg:w-[43%] lg:rotate-[4deg]",
  },
  {
    title: "Too many channels",
    text: "Website · WhatsApp · Instagram · Facebook",
    badge: "Scattered enquiries",
    icon: PanelTop,
    className:
      "lg:absolute lg:bottom-[5%] lg:right-[2%] lg:z-20 lg:w-[38%] lg:rotate-[-4deg]",
  },
];

const useCases: UseCase[] = [
  {
    title: "Product questions",
    description: "Answers fit, use, variants, care, and product details.",
    icon: ShoppingBag,
    customer: "Do you have this bag in black?",
    ai: "Yes, the black version is available. I can send the product image and price now.",
    visualLabel: "Product answer preview",
  },
  {
    title: "Product image replies",
    description: "Sends image-led replies with product context.",
    icon: ImageIcon,
    customer: "Can I see the blue one?",
    ai: "Sure. Here is the blue option with product details and availability.",
    visualLabel: "Image reply placeholder",
  },
  {
    title: "Price and availability",
    description: "Checks price, stock status, and next buying steps.",
    icon: CircleDollarSign,
    customer: "How much is this and is it in stock?",
    ai: "This item is currently available. The price is listed as a placeholder and your team can update it from the dashboard.",
    visualLabel: "Stock and price check",
  },
  {
    title: "Size / colour / stock checks",
    description: "Guides customers through variants before they leave.",
    icon: Palette,
    customer: "Is medium available in olive?",
    ai: "Medium in olive is marked as available. I can reserve the enquiry and share delivery options.",
    visualLabel: "Variant selector preview",
  },
  {
    title: "Order enquiry capture",
    description: "Collects buyer details and the product they want.",
    icon: ClipboardList,
    customer: "I want to order two of these for delivery.",
    ai: "Great. I’ll capture your name, phone number, delivery area, and preferred quantity for the team.",
    visualLabel: "Lead capture form",
  },
  {
    title: "Discount or offer questions",
    description: "Explains active offers without confusing the customer.",
    icon: BadgePercent,
    customer: "Do you have a discount if I buy three?",
    ai: "I can check the current offer rules and pass this enquiry to the team if a custom bundle price is needed.",
    visualLabel: "Offer reply preview",
  },
  {
    title: "WhatsApp selling",
    description: "Keeps buying conversations moving in chat.",
    icon: Send,
    customer: "Can you WhatsApp me the details?",
    ai: "Yes. I can continue the conversation on WhatsApp and keep the product details attached to your enquiry.",
    visualLabel: "WhatsApp enquiry preview",
  },
  {
    title: "Human handoff",
    description: "Escalates priority shoppers with full context.",
    icon: UserRoundCheck,
    customer: "Can I speak to someone before ordering?",
    ai: "Of course. I’ll pass this to the team with the full conversation context.",
    visualLabel: "Team handoff preview",
  },
];

const outcomeCards: OutcomeCard[] = [
  {
    value: "Under 5 sec",
    label: "average reply time",
    icon: Timer,
  },
  {
    value: "24/7",
    label: "customer enquiry coverage",
    icon: Clock3,
  },
  {
    value: "More",
    label: "product enquiries captured",
    icon: BarChart3,
  },
  {
    value: "Less",
    label: "manual reply workload",
    icon: MousePointerClick,
  },
];

const channels = ["Website", "WhatsApp", "Instagram", "Facebook"];
const pipelineStages = ["New enquiry", "Interested", "Quoted", "Follow-up", "Closed"];
const sentimentLabels = ["Positive", "Neutral", "Negative", "Urgent", "Ready to buy"];
const knowledgeItems = [
  "Product info",
  "Policies",
  "Delivery details",
  "Offers",
  "Business FAQs",
];

export function RetailEcommerceIndustryPage() {
  const [activeUseCase, setActiveUseCase] = useState<UseCase | null>(null);

  return (
    <main id="main" className="relative overflow-hidden">
      <RetailHero />
      <UseCaseCards
        activeUseCase={activeUseCase}
        setActiveUseCase={setActiveUseCase}
      />
      <DashboardPreview />
      <OutcomeCards />
      <RetailCta />
    </main>
  );
}

function RetailHero() {
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
          <Badge>Retail & E-commerce</Badge>
          <h1 className="text-h1 mt-6 max-w-4xl font-medium text-foreground">
            Turn every product enquiry into a{" "}
            <span className="text-primary">sales opportunity.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-muted-foreground">
            AI chat agents that reply instantly, answer product questions,
            recommend products, capture leads, and help customers move closer to
            buying across your website, WhatsApp, Instagram, and Facebook.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="xl">
              <Link href="/demo">
                See Retail Demo <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/book-demo">Book a Call</Link>
            </Button>
            <Button asChild size="xl" variant="secondary">
              <Link href="/pricing?type=chat">View Chat Agent Pricing</Link>
            </Button>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <RetailHeroVisual />
        </FadeUp>
      </Container>
    </section>
  );
}

function RetailHeroVisual() {
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
        {painCards.map((card) => (
          <PainPointCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}

function PainPointCard({ card }: { card: PainCard }) {
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

type UseCaseCardsProps = {
  activeUseCase: UseCase | null;
  setActiveUseCase: (useCase: UseCase | null) => void;
};

function UseCaseCards({ activeUseCase, setActiveUseCase }: UseCaseCardsProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Use cases"
            title="What your Retail AI Chat Agent can handle"
            subtitle="Tap a card to preview how the AI handles real customer enquiries."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase) => (
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

      <UseCaseDialog
        activeUseCase={activeUseCase}
        setActiveUseCase={setActiveUseCase}
      />
    </section>
  );
}

function UseCaseDialog({
  activeUseCase,
  setActiveUseCase,
}: UseCaseCardsProps) {
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
              <DialogTitle className="text-h3 text-foreground">
                {activeUseCase.title}
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm leading-6 text-muted-foreground">
                A quick preview of how the Retail AI Chat Agent keeps buying
                intent moving.
              </DialogDescription>
              <div className="mt-6 space-y-3">
                <ChatBubble label="Customer" text={activeUseCase.customer} />
                <ChatBubble label="AI" text={activeUseCase.ai} align="end" />
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Real GIFs and videos can be added when your product workflow
                  is ready.
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

function ChatBubble({
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

function DashboardPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Dashboard"
            title="Your retail command centre."
            subtitle="Manage products, view conversations, track leads, and control what the AI knows from one dashboard."
          />
        </FadeUp>

        <FadeUp delay={0.08}>
          <Card className="mt-12 overflow-hidden p-4 shadow-card sm:p-5 lg:p-6">
            <div className="rounded-2xl border border-border bg-background/45 p-4 sm:p-5">
              <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Kaizen Retail Dashboard
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Products, transcripts, leads, and AI knowledge in one place.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Products", "Chats", "Pipeline"].map((item, index) => (
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
                <DashboardPanel
                  icon={ShoppingBag}
                  title="Product Inventory Manager"
                  description="Upload product images, descriptions, prices, availability, and FAQs so the AI can answer accurately."
                  className="min-h-full"
                >
                  <div className="grid gap-4 md:grid-cols-[0.78fr_1fr]">
                    <div className="flex min-h-44 items-center justify-center rounded-2xl border border-dashed border-primary/30 bg-primary/10">
                      <div className="text-center text-sm text-muted-foreground">
                        <ImageIcon
                          className="mx-auto h-7 w-7 text-primary"
                          aria-hidden
                        />
                        <p className="mt-2 font-semibold text-foreground">
                          Image upload
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      {[
                        ["Product name", "Luna Crossbody Bag"],
                        ["Description", "Compact vegan leather bag"],
                        ["Price", "$89 placeholder"],
                        ["Stock / availability", "In stock"],
                        ["Category", "Bags"],
                        ["FAQs", "Delivery, returns, care"],
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
                </DashboardPanel>

                <DashboardPanel
                  icon={PanelTop}
                  title="Chat Transcripts by Channel"
                  description="View every customer conversation separately by channel."
                >
                  <div className="flex flex-wrap gap-2">
                    {channels.map((channel, index) => (
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
                    {["Bag in black?", "Delivery to Colombo?", "Can I see blue?"].map(
                      (message) => (
                        <div
                          key={message}
                          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/45 px-3 py-2"
                        >
                          <span className="text-xs font-medium text-foreground">
                            {message}
                          </span>
                          <span className="text-xs text-primary">Captured</span>
                        </div>
                      ),
                    )}
                  </div>
                </DashboardPanel>

                <DashboardPanel
                  icon={BarChart3}
                  title="Sales Pipeline"
                  description="Track where each product enquiry sits in the sales process."
                >
                  <div className="grid gap-2 sm:grid-cols-5">
                    {pipelineStages.map((stage, index) => (
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
                </DashboardPanel>

                <DashboardPanel
                  icon={Bot}
                  title="AI Knowledge Control"
                  description="The business controls what the AI knows and can update product or service information anytime."
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    {knowledgeItems.map((item) => (
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
                </DashboardPanel>

                <DashboardPanel
                  icon={Tags}
                  title="Conversation Sentiment"
                  description="Understand the overall customer vibe and identify hot leads faster."
                >
                  <div className="flex flex-wrap gap-2">
                    {sentimentLabels.map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-foreground"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </DashboardPanel>

                <DashboardPanel
                  icon={ShieldCheck}
                  title="Privacy / Data Control"
                  description="No private business or customer data belongs to Kaizen AI. The business keeps control of its products, customer conversations, transcripts, and dashboard data."
                >
                  <div className="flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary/10 p-4">
                    <LockKeyhole className="h-6 w-6 text-primary" aria-hidden />
                    <p className="text-sm font-semibold text-foreground">
                      Client-controlled product, customer, and transcript data.
                    </p>
                  </div>
                </DashboardPanel>
              </div>
            </div>
          </Card>
        </FadeUp>
      </Container>
    </section>
  );
}

function DashboardPanel({
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

function OutcomeCards() {
  return (
    <section className="py-16 sm:py-20">
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Outcomes"
            title="Built to improve the numbers that matter."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outcomeCards.map((card) => (
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
          Example metrics shown for demo. Actual results depend on traffic,
          offer, response volume, and implementation.
        </p>
      </Container>
    </section>
  );
}

function RetailCta() {
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
              <Badge>Retail growth</Badge>
              <h2 className="text-h2 mt-5 font-medium text-foreground">
                Stop losing sales from unanswered messages.
              </h2>
              <p className="mt-5 text-lead text-muted-foreground">
                Give customers instant answers, product details, and follow-ups
                while your team focuses on closing orders.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="xl">
                  <Link href="/book-demo">Book a Call</Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <Link href="/demo">See Live Demo</Link>
                </Button>
                <Button asChild size="xl" variant="secondary">
                  <Link href="/pricing?type=chat">View Chat Agent Pricing</Link>
                </Button>
              </div>
            </div>
          </Card>
        </FadeUp>
      </Container>
    </section>
  );
}
