"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  ChevronRight,
  CircleDot,
  Globe2,
  Handshake,
  Image as ImageIcon,
  Languages,
  LayoutDashboard,
  MessageCircle,
  MessagesSquare,
  Monitor,
  Phone,
  Play,
  PlugZap,
  Send,
  Sparkles,
  ThumbsUp,
  Users,
  Video,
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
  description: string;
  detail: string;
  transcript: string;
  Icon: LucideIcon;
  tags: string[];
  visual:
    | "website"
    | "social"
    | "language"
    | "slang"
    | "handoff"
    | "media"
    | "dashboard"
    | "knowledge";
};

const featureDemos: FeatureDemo[] = [
  {
    title: "Website & WhatsApp replies",
    description: "Replies instantly when customers ask on your site or WhatsApp.",
    detail:
      "Kaizen agents answer common questions, qualify interest, and guide customers toward booking without waiting for staff.",
    transcript:
      "Customer: Do you have appointments this week?\nKaizen AI: Yes. Thursday 4:30 PM and Saturday 10:00 AM are available.",
    Icon: MessageCircle,
    tags: ["Website", "WhatsApp", "Instant replies"],
    visual: "website",
  },
  {
    title: "Instagram / Facebook DMs",
    description: "Responds to social media enquiries before interest goes cold.",
    detail:
      "The agent can handle DMs from social channels, answer product or service questions, and capture the lead source.",
    transcript:
      "Customer: Is this package still available?\nKaizen AI: Yes, I can help. Would you like pricing or available slots?",
    Icon: MessagesSquare,
    tags: ["Instagram", "Facebook", "DMs"],
    visual: "social",
  },
  {
    title: "Human handoff",
    description:
      "Hands over to your team with full conversation context when needed.",
    detail:
      "When a customer is urgent, complex, or high value, Kaizen routes the chat to a human with the lead details already summarized.",
    transcript:
      "Kaizen AI: I’ll send this to the team with your request, preferred time, and contact details.",
    Icon: Handshake,
    tags: ["Context", "Priority", "Handoff"],
    visual: "handoff",
  },
  {
    title: "Multi-language support",
    description: "Handles English, Sinhala, Tamil, Arabic, and more.",
    detail:
      "Kaizen agents can respond in the customer's preferred language while keeping the same service rules, pricing, and booking flow.",
    transcript:
      "Customer: Can I chat in Sinhala?\nKaizen AI: Yes. I can continue in the language you prefer.",
    Icon: Languages,
    tags: ["English", "Sinhala", "Tamil", "Arabic"],
    visual: "language",
  },
  {
    title: "Local slang and mixed language",
    description:
      "Understands Singlish, Tinglish, casual spelling, and mixed-language messages.",
    detail:
      "Customers do not need to write perfect formal messages. The agent can interpret casual local phrasing and still guide them clearly.",
    transcript:
      "Customer: whitening ekak book krgnna puluwanda?\nKaizen AI: Yes, I can help book it. What day works best?",
    Icon: Globe2,
    tags: ["Singlish", "Tinglish", "Mixed chat"],
    visual: "slang",
  },
  {
    title: "Image/video responses",
    description:
      "Can send images, videos, menus, brochures, price lists, and product visuals.",
    detail:
      "The agent can share rich media so customers can see packages, proof, examples, or menus without waiting for staff.",
    transcript:
      "Kaizen AI: I’ve sent the brochure and price list here. Would you like me to explain the packages?",
    Icon: ImageIcon,
    tags: ["Images", "Videos", "PDFs"],
    visual: "media",
  },
  {
    title: "Lead dashboard",
    description:
      "Tracks leads, conversations, bookings, and customer intent in one place.",
    detail:
      "Your team gets a clean operating view of conversations, qualified leads, booking intent, and follow-up priorities.",
    transcript:
      "Lead saved: Booking intent, WhatsApp source, Saturday preference, follow-up needed.",
    Icon: LayoutDashboard,
    tags: ["Leads", "Bookings", "Intent"],
    visual: "dashboard",
  },
  {
    title: "Business-trained knowledge",
    description:
      "Learns your services, prices, FAQs, opening hours, policies, and sales process.",
    detail:
      "The agent is configured around your actual business content before launch, so replies feel specific instead of generic.",
    transcript:
      "Kaizen AI: Your selected service starts at the listed price and is available during opening hours.",
    Icon: Bot,
    tags: ["FAQs", "Prices", "Policies"],
    visual: "knowledge",
  },
];

const outcomeMetrics = [
  {
    value: "+ Revenue Opportunities",
    label: "More Revenue Opportunities",
    text: "Capture enquiries before they go cold.",
    Icon: Sparkles,
  },
  {
    value: "+ Sales Conversions",
    label: "Higher Sales Conversion",
    text: "Guide interested customers toward booking or buying.",
    Icon: Check,
  },
  {
    value: "Instant Replies",
    label: "Faster Customer Response",
    text: "Reply across website, WhatsApp, Instagram, and Facebook.",
    Icon: Send,
  },
  {
    value: "24/7 Conversations",
    label: "More Conversations Handled",
    text: "Let AI manage repeat enquiries while your team closes.",
    Icon: MessagesSquare,
  },
];

const intakeChannels = [
  { label: "Website Chat", Icon: Monitor },
  { label: "WhatsApp", Icon: Phone },
  { label: "Instagram DMs", Icon: ImageIcon },
  { label: "Facebook Messenger", Icon: ThumbsUp },
];

const workflowOutputs = [
  { label: "Dashboard", Icon: LayoutDashboard },
  { label: "CRM", Icon: PlugZap },
  { label: "Calendar", Icon: CalendarCheck },
  { label: "Human Team", Icon: Users },
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
                <Bot className="h-5 w-5" />
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
              Hi, do you have appointments this week?
            </div>
            <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md border border-primary/28 bg-primary/14 px-4 py-3 text-sm leading-5 text-foreground">
              Yes. Thursday 4:30 PM and Saturday 10:00 AM are available.
            </div>
            <div className="ml-auto max-w-[84%] rounded-2xl rounded-tr-md border border-primary/28 bg-primary/14 px-4 py-3 text-sm leading-5 text-foreground">
              I can reserve a slot and send the prep guide now.
            </div>
            <div className="rounded-2xl border border-primary/24 bg-black/28 p-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                Lead captured
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-foreground/76">
                <span className="rounded-xl bg-white/[0.05] px-3 py-2">
                  Intent: Booking
                </span>
                <span className="rounded-xl bg-white/[0.05] px-3 py-2">
                  Source: WhatsApp
                </span>
              </div>
            </div>
            <div className="ml-auto flex max-w-[88%] items-center gap-2 rounded-2xl rounded-tr-md border border-primary/24 bg-primary/10 px-4 py-3 text-sm text-foreground">
              <ImageIcon className="h-4 w-4 text-primary" />
              Price list and brochure sent.
            </div>
          </div>

          <div className="absolute inset-x-4 bottom-4 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-muted-foreground">
            Replying like a trained team member
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

function VisualDemo({ type, large = false }: { type: FeatureDemo["visual"]; large?: boolean }) {
  const height = large ? "h-64 sm:h-72" : "h-40";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-primary/18 bg-[linear-gradient(145deg,rgba(201,160,61,0.12),rgba(255,255,255,0.045))]",
        height,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_70%_at_70%_10%,rgba(201,160,61,0.26),transparent_62%)]"
      />
      <div className="relative flex h-full flex-col justify-between p-4">
        {type === "website" && (
          <>
            <div className="space-y-2 text-sm">
              <p className="max-w-[82%] rounded-2xl rounded-tl-md bg-white/[0.07] px-3 py-2 text-foreground/78">
                Are there slots this week?
              </p>
              <p className="ml-auto max-w-[86%] rounded-2xl rounded-tr-md bg-primary/14 px-3 py-2 text-foreground">
                Yes. I can show the next available times.
              </p>
            </div>
            <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-primary/16 px-3 py-1 text-xs text-primary">
              <Send className="h-3.5 w-3.5" />
              Instant reply
            </span>
          </>
        )}
        {type === "social" && (
          <>
            <div className="grid grid-cols-[auto_1fr] gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/24 text-primary">
                <MessagesSquare className="h-5 w-5" />
              </span>
              <div className="space-y-2 text-sm">
                <p className="rounded-2xl rounded-tl-md bg-white/[0.07] px-3 py-2 text-foreground/78">
                  Package details pls
                </p>
                <p className="rounded-2xl rounded-tr-md bg-primary/14 px-3 py-2 text-foreground">
                  Sure. I can send pricing and available dates.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-primary">
              Social DM captured
            </span>
          </>
        )}
        {type === "language" && (
          <>
            <div className="grid grid-cols-2 gap-2">
              {["English", "Sinhala", "Tamil", "Arabic"].map((item, index) => (
                <span
                  key={item}
                  className="rounded-xl border border-white/10 bg-black/28 px-3 py-2 text-xs font-semibold text-foreground/82"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {item}
                </span>
              ))}
            </div>
            <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-primary/16 px-3 py-1 text-xs text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Auto language match
            </span>
          </>
        )}
        {type === "slang" && (
          <>
            <div className="space-y-2 text-sm">
              <p className="max-w-[80%] rounded-2xl rounded-tl-md bg-white/[0.07] px-3 py-2 text-foreground/78">
                whitening ekak book krgnna puluwanda?
              </p>
              <p className="ml-auto max-w-[86%] rounded-2xl rounded-tr-md bg-primary/14 px-3 py-2 text-foreground">
                Yes, I can help book it.
              </p>
            </div>
            <span className="text-xs font-semibold text-primary">
              Casual message understood
            </span>
          </>
        )}
        {type === "handoff" && (
          <>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/24 p-3">
                <p className="text-xs text-muted-foreground">AI summary</p>
                <p className="mt-2 text-sm text-foreground">High intent lead</p>
              </div>
              <ChevronRight className="h-5 w-5 text-primary" />
              <div className="rounded-2xl border border-primary/24 bg-primary/12 p-3">
                <p className="text-xs text-primary">Team inbox</p>
                <p className="mt-2 text-sm text-foreground">Ready to call</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-primary">
              Context sent with handoff
            </span>
          </>
        )}
        {type === "media" && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {[ImageIcon, Video, Send].map((Icon, index) => (
                <span
                  key={index}
                  className="grid aspect-square place-items-center rounded-2xl border border-white/10 bg-black/24 text-primary"
                >
                  <Icon className="h-6 w-6" />
                </span>
              ))}
            </div>
            <span className="rounded-xl border border-primary/18 bg-primary/10 px-3 py-2 text-xs text-foreground/84">
              Brochure, menu, price list, and visuals can be sent in-chat.
            </span>
          </>
        )}
        {type === "dashboard" && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {["42", "18", "7"].map((value, index) => (
                <div key={value} className="rounded-2xl bg-black/26 p-3">
                  <p className="text-xl font-semibold text-primary">{value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {["Leads", "Hot", "Booked"][index]}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-1.5">
              {[34, 56, 42, 74, 62, 88, 70].map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className="w-full rounded-t bg-primary/60"
                  style={{ height }}
                />
              ))}
            </div>
          </>
        )}
        {type === "knowledge" && (
          <>
            <div className="space-y-2">
              {["Services", "Prices", "FAQs", "Policies"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/24 px-3 py-2 text-sm text-foreground/82"
                >
                  <Check className="h-4 w-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold text-primary">
              Trained before launch
            </span>
          </>
        )}
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/34 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/70">
        <CircleDot className="h-3 w-3 animate-pulse text-primary" />
        Demo visual
      </div>
    </div>
  );
}

function WorkflowDiagram() {
  return (
    <div className="mt-12">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="grid gap-3 sm:grid-cols-2">
          {intakeChannels.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card/54 p-4 backdrop-blur-md"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/24 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center lg:flex-col">
          <ArrowDown className="h-8 w-8 text-primary lg:hidden" />
          <ArrowRight className="hidden h-8 w-8 text-primary lg:block" />
        </div>

        <div className="rounded-[1.75rem] border border-primary/28 bg-[linear-gradient(145deg,rgba(201,160,61,0.17),rgba(255,255,255,0.045))] p-5 shadow-[0_30px_90px_-62px_rgba(201,160,61,0.9)]">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/16 text-primary">
              <Bot className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Kaizen AI Chat Agent
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Qualify, reply, route, and summarize.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 flex justify-center">
        <ArrowDown className="h-8 w-8 text-primary" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {workflowOutputs.map(({ label, Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-primary/18 bg-background/45 p-5 text-center"
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <p className="mt-3 text-sm font-semibold text-foreground">{label}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-7 max-w-2xl text-center text-base text-muted-foreground">
        Every conversation is captured, organised, and routed to the right place.
      </p>
    </div>
  );
}

export function ChatbotSolutionPage() {
  const [activeFeature, setActiveFeature] = useState<FeatureDemo | null>(null);

  return (
    <main id="main" className="relative">
      <section className="relative w-full overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_58%_at_50%_0%,rgba(201,160,61,0.2),rgba(201,160,61,0.06)_38%,rgba(10,9,7,0)_72%)]"
        />
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)]">
          <FadeUp>
            <Badge>AI Chat Agent</Badge>
            <h1 className="mt-6 text-h1 font-medium text-foreground">
              AI Chat Agents That Turn Messages Into Customers.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-foreground/75">
              Custom-built chat agents that reply instantly across your website,
              WhatsApp, Instagram, and Facebook, helping customers get answers,
              book appointments, and move closer to buying.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="xl">
                <Link href="/demo">
                  Try It Yourself
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/book-demo">Book a Call</Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/pricing?type=chat">View Pricing</Link>
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
        <FadeUp>
          <SectionHeader
            title={
              <>
                What your{" "}
                <span className="text-primary">AI Chat Agent</span> handles for
                you
              </>
            }
            subtitle="Tap any feature to preview the demo flow."
          />
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureDemos.map((feature) => {
            const Icon = feature.Icon;

            return (
              <StaggerItem key={feature.title}>
                <Card
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveFeature(feature)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveFeature(feature);
                    }
                  }}
                  className="group relative h-full cursor-pointer overflow-hidden p-5 transition-colors hover:border-primary/38 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-primary/18 bg-primary/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/80 opacity-80 transition-opacity group-hover:opacity-100">
                    <ArrowRight className="h-3 w-3" />
                    Preview
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/24 bg-primary/10 text-primary transition-transform group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold leading-tight text-foreground">
                    {feature.title}
                  </h2>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <FadeUp>
          <SectionHeader
            eyebrow="Workflow"
            title={
              <>
                Connect every conversation to your{" "}
                <span className="text-primary">business workflow.</span>
              </>
            }
          />
        </FadeUp>
        <WorkflowDiagram />
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <FadeUp>
          <SectionHeader
            eyebrow="Business Outcomes"
            title={
              <>
                Built to improve the{" "}
                <span className="text-primary">outcomes that matter.</span>
              </>
            }
          />
        </FadeUp>
        <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-primary/22 bg-[linear-gradient(145deg,rgba(201,160,61,0.12),rgba(255,255,255,0.045))] shadow-[0_32px_110px_-76px_rgba(201,160,61,0.9)]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {outcomeMetrics.map(({ value, label, text, Icon }) => (
              <div
                key={label}
                className="relative min-h-[220px] border-b border-primary/16 p-6 last:border-b-0 sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                />
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/22 bg-primary/12 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-primary/18 bg-black/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/80">
                    Outcome
                  </span>
                </div>
                <p className="mt-7 text-2xl font-semibold tracking-tight text-primary">
                  {value}
                </p>
                <h2 className="mt-3 text-lg font-semibold leading-tight text-foreground">
                  {label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
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
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild size="xl">
              <Link href="/book-demo">
                Book a Call
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/demo">See Live Demo</Link>
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
            <VisualDemo type={activeFeature.visual} large />
            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
              <div>
                <DialogTitle className="text-3xl font-semibold tracking-tight text-foreground">
                  {activeFeature.title}
                </DialogTitle>
                <DialogDescription className="mt-3 text-base leading-7 text-muted-foreground">
                  {activeFeature.detail}
                </DialogDescription>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {activeFeature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/18 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-primary/18 bg-black/26 p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                Demo transcript
              </p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-foreground/84">
                {activeFeature.transcript.split("\n").map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
