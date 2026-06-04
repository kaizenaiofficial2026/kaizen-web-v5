"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Bell,
  Bot,
  Boxes,
  BrainCircuit,
  ClipboardCheck,
  Clock3,
  ContactRound,
  DatabaseZap,
  FileText,
  Flag,
  Handshake,
  Image as ImageIcon,
  LayoutDashboard,
  ListChecks,
  MessageCircle,
  MessagesSquare,
  Monitor,
  PackageCheck,
  Percent,
  Phone,
  Play,
  Radio,
  RefreshCcw,
  SearchCheck,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  ThumbsUp,
  TicketCheck,
  TrendingUp,
  Upload,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { Container } from "@/components/primitives/Container";
import { MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { cn } from "@/lib/utils";

type FeatureDemo = {
  title: string;
  shortText: string;
  explanation: string;
  example: string;
  Icon: LucideIcon;
};

type WorkflowCard = {
  label: string;
  Icon: LucideIcon;
};

type OutcomeCard = {
  metric: string;
  title: string;
  text: string;
};

const featureDemos: FeatureDemo[] = [
  {
    title: "AI Chat Automation Across WhatsApp, Facebook, Instagram & Website",
    shortText: "One AI agent replying across every customer inbox.",
    explanation:
      "One trained AI chat agent handles conversations across all major customer messaging channels. It replies instantly, answers questions, recommends products, captures leads or orders, and keeps every conversation connected to the dashboard.",
    example:
      "A customer asks about a product on Instagram, another asks about delivery on WhatsApp, and another asks for pricing through website chat. The same AI agent handles all three without your team switching between inboxes.",
    Icon: MessagesSquare,
  },
  {
    title: "AI Order Capture",
    shortText: "Log product, quantity, price, and payment details.",
    explanation:
      "The AI captures structured order information including product ID, quantity, price, customer details, and payment status inside the dashboard.",
    example:
      "Instead of searching through chats, the business sees a clean order card ready for confirmation.",
    Icon: ShoppingCart,
  },
  {
    title: "Product Brain",
    shortText: "Trained on your catalogue and services.",
    explanation:
      "The AI learns your products, pricing, service details, specifications, and business rules so replies are accurate and relevant.",
    example:
      "The AI can answer product-specific questions without your team replying manually.",
    Icon: BrainCircuit,
  },
  {
    title: "Live Order Board",
    shortText: "Track orders from pending to delivered.",
    explanation:
      "The dashboard shows order status and revenue totals so your team can manage fulfilment without digging through chats.",
    example:
      "Pending, Dispatched, and Delivered orders are visible in one place.",
    Icon: PackageCheck,
  },
  {
    title: "Full Chat Transcript",
    shortText: "Every conversation saved automatically.",
    explanation:
      "Every chat is saved by customer and channel, making it easy to review what the customer asked, what the AI replied, and what action is needed.",
    example:
      "Your team can open any customer record and see the full conversation history.",
    Icon: FileText,
  },
  {
    title: "Customer Directory",
    shortText: "Build a searchable customer history.",
    explanation:
      "The system stores customer history, orders, lifetime spend, vibe score, and custom tags like VIP, wholesale, or repeat buyer.",
    example:
      "A returning buyer can be identified with past purchases and preferences.",
    Icon: ContactRound,
  },
  {
    title: "Seamless Human Takeover",
    shortText: "Jump into any live chat.",
    explanation:
      "Your team can take over conversations when a customer needs human help, while keeping the full conversation context.",
    example:
      "If a VIP customer needs special handling, a human can take over without losing the chat history.",
    Icon: Handshake,
  },
  {
    title: "Abandoned Interest Follow-Up",
    shortText: "Recover customers who went cold.",
    explanation:
      "If a customer shows interest but does not complete the purchase, the agent can follow up and bring them back.",
    example:
      "A customer asks for price and disappears. The agent follows up later with a helpful reminder.",
    Icon: Bell,
  },
  {
    title: "Human Verification Flag",
    shortText: "Keep final order control with your team.",
    explanation:
      "Every captured order can be held for human verification before fulfilment, reducing mistakes and keeping business control in your hands.",
    example:
      "The AI captures the order, but your team confirms stock, payment, or dispatch before processing.",
    Icon: Flag,
  },
  {
    title: "Vibe Score",
    shortText: "Know who is cold, warm, or ready to buy.",
    explanation:
      "Each chat receives an intent indicator from 0-100%, helping your team focus on high-intent customers first.",
    example:
      "Hot leads can be prioritised for faster human follow-up.",
    Icon: TrendingUp,
  },
  {
    title: "Intent Summary",
    shortText: "Understand the customer at a glance.",
    explanation:
      "The dashboard summarises the customer's mood, buying intent, key request, and recommended next action.",
    example:
      "Your team sees whether the customer is asking, comparing, complaining, or ready to buy.",
    Icon: SearchCheck,
  },
  {
    title: "Repeat Buyer Detection",
    shortText: "Identify returning customers automatically.",
    explanation:
      "The AI recognises returning customers and shows previous orders, preferences, and tags.",
    example:
      "A repeat buyer can be greeted with context instead of being treated like a new customer.",
    Icon: RefreshCcw,
  },
  {
    title: "Smart Recommendations",
    shortText: "Recommend by budget, need, and preference.",
    explanation:
      "The AI guides customers toward the right product or service based on what they ask, their budget, and their preferences.",
    example:
      "A customer says they need a gift under a certain budget. The AI suggests suitable options.",
    Icon: Sparkles,
  },
  {
    title: "FAQ Handling",
    shortText: "Answer repeated questions instantly.",
    explanation:
      "The AI answers common questions about shipping, pricing, availability, returns, policies, and business hours.",
    example:
      "Customers get answers without waiting for staff to reply.",
    Icon: MessageCircle,
  },
  {
    title: "Catalogue Management",
    shortText: "Manage products, images, IDs, and tags.",
    explanation:
      "Your team can update product details in the dashboard, including catalogue images, prices, IDs, tags, and categories.",
    example:
      "When a product is added or updated, the AI can use that knowledge in conversations.",
    Icon: Boxes,
  },
  {
    title: "Stock Status Control",
    shortText: "Stop recommending out-of-stock products.",
    explanation:
      "When a product is out of stock, the AI stops recommending it and can suggest relevant alternatives.",
    example:
      "If a size or colour is unavailable, the AI guides the customer to another option.",
    Icon: ClipboardCheck,
  },
  {
    title: "Promotional Pricing",
    shortText: "Let the AI explain offers and deals.",
    explanation:
      "Add promotional prices and offers once, and the AI can communicate them consistently across connected channels.",
    example:
      "The AI can tell customers about current discounts, bundles, or seasonal offers.",
    Icon: Percent,
  },
  {
    title: "Bulk Product Upload",
    shortText: "Add one product or hundreds.",
    explanation:
      "Products can be added manually or through bulk CSV upload so the catalogue stays scalable.",
    example:
      "A store with hundreds of products can upload its catalogue without manually adding every item one by one.",
    Icon: Upload,
  },
  {
    title: "Human Escalation",
    shortText: "Complex cases go to your team.",
    explanation:
      "When the AI cannot resolve a question, complaint, or special request, it escalates the chat with full context.",
    example:
      "A complaint is flagged and routed to a human instead of being ignored.",
    Icon: ShieldCheck,
  },
  {
    title: "Customer Memory",
    shortText: "Continue from previous conversations.",
    explanation:
      "The agent can continue from previous context so customers do not need to repeat themselves every time.",
    example:
      "The AI remembers that the customer asked about a product earlier and follows up with context.",
    Icon: DatabaseZap,
  },
  {
    title: "Promotion Broadcasts",
    shortText: "Support new arrivals and offers.",
    explanation:
      "The system can support promotional broadcasts for new arrivals, offers, and campaigns while keeping follow-up activity visible.",
    example:
      "Interested customers can be notified when a new collection or offer goes live.",
    Icon: Radio,
  },
  {
    title: "Outbound Messages",
    shortText: "300 outbound messages per month included.",
    explanation:
      "The package supports outbound customer follow-up messages for promotions, reminders, and recovery workflows.",
    example:
      "The business can follow up with warm leads or abandoned interest without manual messaging.",
    Icon: Send,
  },
  {
    title: "Auto Support Ticket",
    shortText: "Unresolved issues are flagged.",
    explanation:
      "If a complaint or unresolved issue appears, the system can create a support flag for human follow-up.",
    example:
      "A customer complaint is automatically marked for your team instead of being buried in the inbox.",
    Icon: TicketCheck,
  },
  {
    title: "CRM Sync",
    shortText: "Send leads to your CRM.",
    explanation:
      "Lead and customer details can sync into tools like HubSpot, Salesforce, Zoho, and other CRM systems.",
    example:
      "A qualified lead can be pushed into the CRM with no manual data entry.",
    Icon: DatabaseZap,
  },
  {
    title: "Monthly Performance Report",
    shortText: "See what the AI handled.",
    explanation:
      "KaizenAI provides monthly reporting so clients can understand leads, orders, follow-ups, and customer activity.",
    example:
      "The business can review how many conversations were handled and what opportunities were captured.",
    Icon: ListChecks,
  },
];

const visibleFeatureDemos = featureDemos.slice(0, 8);
const expandableFeatureDemos = featureDemos.slice(8);
const featureGridClassName =
  "grid gap-3 min-[380px]:grid-cols-2 sm:gap-4 lg:grid-cols-4";

const channels: WorkflowCard[] = [
  { label: "Website Chat", Icon: Monitor },
  { label: "WhatsApp Business", Icon: Phone },
  { label: "Instagram DMs", Icon: ImageIcon },
  { label: "Facebook Messenger", Icon: ThumbsUp },
];

const brainRules = [
  "Product Brain",
  "Inventory & Pricing Rules",
  "Customer Memory",
  "Intent / Vibe Score",
  "Escalation Rules",
];

const businessOutputs: WorkflowCard[] = [
  { label: "Lead Captured", Icon: BadgeCheck },
  { label: "Order Captured", Icon: ShoppingCart },
  { label: "Full Transcript Saved", Icon: FileText },
  { label: "Human Verification Flag", Icon: Flag },
  { label: "Follow-Up Scheduled", Icon: Clock3 },
  { label: "Support Ticket Created", Icon: TicketCheck },
];

const businessSystems: WorkflowCard[] = [
  { label: "Kaizen Dashboard", Icon: LayoutDashboard },
  { label: "Live Order Board", Icon: PackageCheck },
  { label: "Customer Directory", Icon: ContactRound },
  { label: "CRM Sync", Icon: DatabaseZap },
  { label: "Human Team", Icon: Users },
  { label: "Monthly Report", Icon: ListChecks },
];

const outcomeCards: OutcomeCard[] = [
  {
    metric: "<5s",
    title: "Target response time",
    text: "Reply while the customer is still ready to buy.",
  },
  {
    metric: "24/7/365",
    title: "Always-on sales coverage",
    text: "Handle enquiries after hours, weekends, and holidays.",
  },
  {
    metric: "~1,000",
    title: "Simultaneous chats supported",
    text: "Scale conversations without slowing down.",
  },
  {
    metric: "300/mo",
    title: "Outbound messages included",
    text: "Follow up with warm leads, abandoned interest, and promotions.",
  },
  {
    metric: "4",
    title: "Connected channels",
    text: "Website, WhatsApp, Instagram, and Facebook.",
  },
  {
    metric: "100%",
    title: "Conversation visibility",
    text: "Every chat saved with transcript, customer details, and next action.",
  },
  {
    metric: "0",
    title: "Manual catalogue confusion",
    text: "Product, stock, pricing, and offer rules stay inside the AI brain.",
  },
  {
    metric: "Faster",
    title: "Human handoff",
    text: "Escalate complex cases with full context already attached.",
  },
];

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      <div
        aria-hidden
        className="absolute -inset-10 rounded-full bg-primary/18 blur-3xl"
      />
      <div className="relative rounded-[2.6rem] border border-white/12 bg-[#050504] p-2.5 shadow-[0_40px_120px_-54px_rgba(201,160,61,0.9),inset_0_1px_0_rgba(255,255,255,0.16)]">
        <div className="relative h-[610px] max-h-[calc(100dvh-7rem)] overflow-hidden rounded-[2.1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,18,12,0.98),rgba(5,5,4,0.98))]">
          <div className="absolute left-1/2 top-2 z-20 h-7 w-24 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
          <div className="relative z-10 flex h-10 items-end justify-between px-7 pb-1.5 text-[11px] font-semibold text-foreground/84">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-4 rounded-full bg-foreground/70" />
              <span className="h-2.5 w-4 rounded-sm border border-foreground/70" />
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[#25d366]/30 bg-[#25d366]/12 text-[#25d366]">
                <Bot className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Kaizen Agent
                </p>
                <p className="text-xs text-[#25d366]">WhatsApp Business</p>
              </div>
            </div>
            <span className="rounded-full bg-[#25d366]/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#25d366]">
              Online
            </span>
          </div>

          <div className="space-y-3 px-4 py-5">
            <div className="max-w-[82%] rounded-2xl rounded-tl-md border border-white/8 bg-white/[0.06] px-4 py-3 text-sm leading-5 text-foreground/82">
              Hi, is this available in medium?
            </div>
            <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md border border-primary/28 bg-primary/14 px-4 py-3 text-sm leading-5 text-foreground">
              Yes, medium is available. Delivery to Colombo takes 1-2 days.
            </div>
            <div className="ml-auto max-w-[84%] rounded-2xl rounded-tr-md border border-primary/28 bg-primary/14 px-4 py-3 text-sm leading-5 text-foreground">
              I can reserve it now. Please send your name and contact number.
            </div>
            <div className="rounded-2xl border border-primary/24 bg-black/28 p-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                Lead captured
              </p>
              <div className="mt-3 grid gap-2 text-xs text-foreground/76">
                <span className="rounded-xl bg-white/[0.05] px-3 py-2">
                  Intent: Product enquiry
                </span>
                <span className="rounded-xl bg-white/[0.05] px-3 py-2">
                  Source: WhatsApp
                </span>
                <span className="rounded-xl bg-white/[0.05] px-3 py-2">
                  Status: Ready to order
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-4 bottom-4 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-muted-foreground">
            Replying like a trained sales rep
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/16 bg-black/28 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary/84">
          <Play className="h-3 w-3" aria-hidden />
          Replaceable with demo video
        </span>
      </div>
    </div>
  );
}

function FeaturePreviewPlaceholder({ title }: { title: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder demo visual for ${title}`}
      className="relative grid h-64 place-items-center overflow-hidden rounded-2xl border border-primary/18 bg-[linear-gradient(145deg,rgba(201,160,61,0.12),rgba(255,255,255,0.045))] sm:h-72"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_70%_at_70%_10%,rgba(201,160,61,0.26),transparent_62%)]"
      />
      <div className="relative z-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-primary/24 bg-primary/12 text-primary">
          <Play className="h-6 w-6" aria-hidden />
        </span>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Demo visual will be added here
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  feature,
  onSelect,
}: {
  feature: FeatureDemo;
  onSelect: (feature: FeatureDemo) => void;
}) {
  const Icon = feature.Icon;

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onSelect(feature)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(feature);
        }
      }}
      className="group relative h-full min-h-[170px] cursor-pointer overflow-hidden p-3 transition-colors hover:border-primary/38 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background min-[380px]:p-4 sm:min-h-[220px] sm:p-5"
    >
      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-primary/18 bg-primary/8 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-primary/80 opacity-80 transition-opacity group-hover:opacity-100 sm:right-4 sm:top-4 sm:px-2.5 sm:py-1 sm:text-[10px]">
        Preview
      </span>
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-primary/24 bg-primary/10 text-primary transition-transform group-hover:scale-105 sm:h-12 sm:w-12 sm:rounded-2xl">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
      </span>
      <h2 className="mt-4 pr-8 text-sm font-semibold leading-tight text-foreground sm:mt-5 sm:pr-0 sm:text-lg">
        {feature.title}
      </h2>
      <p className="mt-2 text-xs leading-5 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-6">
        {feature.shortText}
      </p>
    </Card>
  );
}

function WorkflowColumn({
  title,
  cards,
  columns = "sm:grid-cols-2",
}: {
  title: string;
  cards: WorkflowCard[];
  columns?: string;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
        {title}
      </p>
      <div className={cn("grid gap-3", columns)}>
        {cards.map(({ label, Icon }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card/54 p-4 backdrop-blur-md"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/24 bg-primary/10 text-primary">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-sm font-semibold text-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center lg:pt-11">
      <ArrowDown className="h-8 w-8 text-primary lg:hidden" aria-hidden />
      <ArrowRight className="hidden h-8 w-8 text-primary lg:block" aria-hidden />
    </div>
  );
}

function WorkflowDiagram() {
  return (
    <div className="mt-12 rounded-[2rem] border border-primary/20 bg-card/30 p-4 shadow-[0_32px_110px_-78px_rgba(201,160,61,0.9)] backdrop-blur-md sm:p-6 lg:p-7">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto_minmax(270px,0.92fr)_auto_1fr_auto_1fr] lg:items-start">
        <WorkflowColumn title="Layer 1: Customer Channels" cards={channels} />
        <FlowArrow />

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
            Layer 2: KaizenAI Chat Agent
          </p>
          <div className="rounded-[1.75rem] border border-primary/32 bg-[linear-gradient(145deg,rgba(201,160,61,0.20),rgba(255,255,255,0.045))] p-5 shadow-[0_30px_90px_-62px_rgba(201,160,61,0.9)]">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/16 text-primary">
                <Bot className="h-7 w-7" aria-hidden />
              </span>
              <div>
                <p className="text-lg font-semibold text-foreground">
                  KaizenAI Chat Agent
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Reply, qualify, recommend, capture, follow up, and escalate.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-2">
              {brainRules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-xl border border-primary/14 bg-black/24 px-3 py-2 text-xs font-semibold text-foreground/78"
                >
                  {rule}
                </div>
              ))}
            </div>
          </div>
        </div>

        <FlowArrow />
        <WorkflowColumn
          title="Layer 3: Business Outputs"
          cards={businessOutputs}
          columns="sm:grid-cols-2 lg:grid-cols-1"
        />
        <FlowArrow />
        <WorkflowColumn
          title="Layer 4: Business Systems"
          cards={businessSystems}
          columns="sm:grid-cols-2 lg:grid-cols-1"
        />
      </div>
      <p className="mx-auto mt-8 max-w-3xl text-center text-base text-muted-foreground">
        Every conversation is captured, structured, and routed to the right next
        action.
      </p>
    </div>
  );
}

export function ChatbotSolutionPage() {
  const [activeFeature, setActiveFeature] = useState<FeatureDemo | null>(null);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const featureSectionRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const toggleMoreFeatures = () => {
    if (showMoreFeatures) {
      setShowMoreFeatures(false);
      window.setTimeout(() => {
        featureSectionRef.current?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }, 80);
      return;
    }

    setShowMoreFeatures(true);
  };

  return (
    <main id="main" className="relative">
      <section className="relative w-full overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_58%_at_50%_0%,rgba(201,160,61,0.2),rgba(201,160,61,0.06)_38%,rgba(0,0,0,0)_72%)]"
        />
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)]">
          <FadeUp>
            <Badge>AI Chat Agent</Badge>
            <h1 className="mt-6 text-h1 font-medium text-foreground">
              AI Chat Agents That Turn Messages Into Customers.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-foreground/75">
              Custom-built chat agents that reply instantly across your website,
              WhatsApp, Instagram, and Facebook. They answer questions,
              recommend products, capture orders, follow up with leads, and hand
              over to your team when needed.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="xl" className="w-full sm:w-auto">
                <Link href="/contact">
                  Try It Yourself
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                <Link href="/contact#book">Book a Call</Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                <Link href="/contact">View Pricing</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Website", "WhatsApp", "Instagram", "Facebook"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-primary/18 bg-card/40 px-3 py-1 text-xs font-semibold text-foreground/76"
                >
                  {item}
                </span>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <PhoneMockup />
          </FadeUp>
        </Container>
      </section>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <div ref={featureSectionRef} />
        <FadeUp>
          <SectionHeader
            title="What your AI Chat Agent handles for you"
            subtitle="Tap any feature to preview how the agent works inside real customer conversations."
          />
        </FadeUp>
        <StaggerGrid className={cn("mt-12", featureGridClassName)}>
          {visibleFeatureDemos.map((feature) => (
            <StaggerItem key={feature.title}>
              <FeatureCard feature={feature} onSelect={setActiveFeature} />
            </StaggerItem>
          ))}
        </StaggerGrid>
        <AnimatePresence initial={false}>
          {showMoreFeatures && (
            <motion.div
              id="chat-agent-extra-features"
              initial={reducedMotion ? false : { height: 0, opacity: 0 }}
              animate={reducedMotion ? undefined : { height: "auto", opacity: 1 }}
              exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <motion.div
                initial={reducedMotion ? false : { y: 12 }}
                animate={reducedMotion ? undefined : { y: 0 }}
                exit={reducedMotion ? undefined : { y: 8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={cn("pt-4", featureGridClassName)}
              >
                {expandableFeatureDemos.map((feature) => (
                  <FeatureCard
                    key={feature.title}
                    feature={feature}
                    onSelect={setActiveFeature}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-9 flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="xl"
            aria-expanded={showMoreFeatures}
            aria-controls="chat-agent-extra-features"
            onClick={toggleMoreFeatures}
          >
            {showMoreFeatures ? "See less" : "View more features"}
            <ArrowDown
              className={cn(
                "transition-transform",
                showMoreFeatures && "rotate-180",
              )}
              aria-hidden
            />
          </Button>
        </div>
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <FadeUp>
          <SectionHeader
            eyebrow="Workflow"
            title="Connect every conversation to your business workflow."
            subtitle="Every message flows through one trained AI layer, then into the right dashboard, order, CRM, or human handoff path."
          />
        </FadeUp>
        <WorkflowDiagram />
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <FadeUp>
          <SectionHeader
            eyebrow="Business Outcomes"
            title="Built to improve the outcomes that matter."
            subtitle="Less waiting. More captured leads. Cleaner follow-up. Better visibility across every customer conversation."
          />
        </FadeUp>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outcomeCards.map((outcome) => (
            <Card key={outcome.title} className="h-full p-6">
              <p className="text-4xl font-semibold tracking-tight text-primary">
                {outcome.metric}
              </p>
              <h2 className="mt-5 text-lg font-semibold leading-tight text-foreground">
                {outcome.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {outcome.text}
              </p>
            </Card>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <Card className="gold-card overflow-hidden p-8 text-center sm:p-10 lg:p-12">
          <Badge>Next step</Badge>
          <h2 className="mx-auto mt-5 max-w-3xl text-h2 font-medium text-foreground">
            Ready to turn messages into customers?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-foreground/74">
            Book a free strategy call and see how a custom AI chat agent can
            handle your website, WhatsApp, Instagram, and Facebook
            conversations.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/contact#book">
                Book a Call
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
              <Link href="/contact">See Live Demo</Link>
            </Button>
          </div>
        </Card>
      </MarketingSection>

      <Dialog
        open={activeFeature !== null}
        onOpenChange={(open) => {
          if (!open) setActiveFeature(null);
        }}
      >
        {activeFeature && (
          <DialogContent className="max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-3xl overflow-y-auto rounded-[1.5rem] border-primary/24 bg-[linear-gradient(145deg,rgba(26,22,12,0.97),rgba(9,8,6,0.99))] p-5 shadow-[0_38px_140px_-62px_rgba(201,160,61,0.86)] sm:p-7 [&>button.absolute]:right-4 [&>button.absolute]:top-4 [&>button.absolute]:grid [&>button.absolute]:h-10 [&>button.absolute]:w-10 [&>button.absolute]:place-items-center [&>button.absolute]:rounded-full [&>button.absolute]:border [&>button.absolute]:border-primary/24 [&>button.absolute]:bg-black/40 [&>button.absolute]:text-foreground">
            <FeaturePreviewPlaceholder title={activeFeature.title} />
            <DialogTitle className="text-3xl font-semibold tracking-tight text-foreground">
              {activeFeature.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-7 text-muted-foreground">
              {activeFeature.explanation}
            </DialogDescription>
            <div className="rounded-2xl border border-primary/18 bg-black/26 p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                Real-world example
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground/84">
                {activeFeature.example}
              </p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
