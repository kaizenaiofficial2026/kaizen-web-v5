"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  FileImage,
  Globe2,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  Mic,
  PhoneCall,
  Play,
  Radio,
  Sparkles,
  UserCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/utils";

type OfferId = "chat" | "voice";

type Offer = {
  id: OfferId;
  label: string;
  cardTitle: string;
  cardImageSrc: string;
  cardImageAlt: string;
  title: string;
  modalTitle: string;
  summary: string;
  description: string;
  Icon: LucideIcon;
  accent: string;
  chips: {
    label: string;
    Icon: LucideIcon;
  }[];
  capabilities: {
    label: string;
    Icon: LucideIcon;
  }[];
  exploreLabel: string;
  exploreHref: string;
  demoHref: string;
  pricingHref: string;
};

const offers: Offer[] = [
  {
    id: "chat",
    label: "AI CHAT AGENT",
    cardTitle: "AI Chat Agent",
    cardImageSrc: "/images/ai-chat-agent-card.png",
    cardImageAlt:
      "KaizenAI AI Chat Agent connected to WhatsApp, Instagram, Facebook and website",
    title: "Turn every message into a sales opportunity.",
    modalTitle: "Turn every message into a sales opportunity.",
    summary:
      "Instant replies across your website, WhatsApp, Instagram, and Facebook.",
    description:
      "Instantly reply to website, WhatsApp, Instagram, and Facebook enquiries with an AI agent trained on your products, services, pricing, FAQs, and sales flow.",
    Icon: Bot,
    accent: "from-[#ecd479]/24 via-[#c9a03d]/12 to-transparent",
    chips: [
      { label: "Website + WhatsApp replies", Icon: MessageCircle },
      { label: "Instagram + Facebook DMs", Icon: Sparkles },
      { label: "Product and service answers", Icon: Bot },
      { label: "Order capture", Icon: Check },
      { label: "Lead dashboard", Icon: LayoutDashboard },
      { label: "Human handoff", Icon: UserCheck },
    ],
    capabilities: [
      { label: "Sends brochures, menus, visuals, and prices", Icon: FileImage },
      { label: "Tracks conversations, leads, and bookings", Icon: LayoutDashboard },
      { label: "Escalates to staff when needed", Icon: UserCheck },
      { label: "Supports multilingual/local slang where configured", Icon: Globe2 },
      { label: "Built for retail, clinics, hospitality, real estate, and service businesses", Icon: Check },
    ],
    exploreLabel: "Explore Chat Agents",
    exploreHref: "/solutions/chatbots",
    demoHref: "/demo#chat-agent-demo",
    pricingHref: "/pricing?type=chat",
  },
  {
    id: "voice",
    label: "AI RECEPTIONIST",
    cardTitle: "AI Receptionist",
    cardImageSrc: "/images/ai-receptionist-card.png",
    cardImageAlt:
      "KaizenAI AI Receptionist answering calls with AI brain automation",
    title: "Answer calls, recover missed leads, and book appointments.",
    modalTitle: "Answer calls, follow up, and book appointments 24/7.",
    summary:
      "Natural call handling for enquiries, bookings, missed calls, and follow-ups.",
    description:
      "A natural AI calling agent that answers inbound calls, follows up with missed leads, handles enquiries, books appointments, and transfers urgent conversations to your team.",
    Icon: Mic,
    accent: "from-[#f1ece0]/16 via-[#c9a03d]/14 to-transparent",
    chips: [
      { label: "Inbound calls", Icon: PhoneCall },
      { label: "Missed-call recovery", Icon: Radio },
      { label: "Appointment booking", Icon: CalendarCheck },
      { label: "Google Calendar sync", Icon: CalendarCheck },
      { label: "WhatsApp confirmations", Icon: MessageCircle },
      { label: "Human call transfer", Icon: Headphones },
    ],
    capabilities: [
      { label: "Qualifies enquiries before booking", Icon: Check },
      { label: "Sends call summaries and lead details", Icon: LayoutDashboard },
      { label: "Recovers missed calls automatically", Icon: PhoneCall },
      { label: "Speaks naturally across configured languages", Icon: Globe2 },
      { label: "Stores transcript, outcome, and caller history", Icon: FileImage },
    ],
    exploreLabel: "Explore Voice Agents",
    exploreHref: "/solutions/voice-agents",
    demoHref: "/demo#voice-agent-demo",
    pricingHref: "/pricing?type=voice",
  },
];

function PhoneFrame({
  children,
  mode,
}: {
  children: ReactNode;
  mode: "chat" | "voice";
}) {
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px]">
      <div
        aria-hidden
        className="absolute -inset-8 rounded-full bg-primary/18 blur-3xl"
      />
      <div className="relative rounded-[2.55rem] border border-white/12 bg-[#050504] p-2.5 shadow-[0_34px_100px_-48px_rgba(201,160,61,0.84),inset_0_1px_0_rgba(255,255,255,0.16)]">
        <div className="relative h-[560px] max-h-[calc(100dvh-11rem)] overflow-hidden rounded-[2.05rem] border border-white/10 bg-[linear-gradient(180deg,rgba(26,22,12,0.98),rgba(7,7,5,0.98))]">
          <div className="absolute left-1/2 top-2 z-20 h-7 w-24 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
          <div className="relative z-10 flex h-9 items-end justify-between px-7 pb-1.5 text-[11px] font-semibold text-foreground/84">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-4 rounded-full bg-foreground/70" />
              <span className="h-2.5 w-4 rounded-sm border border-foreground/70" />
            </span>
          </div>
          <div className="h-[calc(100%-2.25rem)]">{children}</div>
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/16 bg-black/28 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary/84">
          <Play className="h-3 w-3" />
          {mode === "chat" ? "Chat demo ready" : "Voice demo ready"}
        </span>
      </div>
    </div>
  );
}

function ChatPhoneMockup() {
  return (
    <PhoneFrame mode="chat">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-primary/28 bg-primary/12 text-primary">
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

        <div className="flex-1 space-y-3 px-4 py-4">
          <div className="max-w-[82%] rounded-2xl rounded-tl-md border border-white/8 bg-white/[0.06] px-4 py-3 text-sm leading-5 text-foreground/82">
            Hi, is this available?
          </div>
          <div className="ml-auto max-w-[86%] rounded-2xl rounded-tr-md border border-primary/28 bg-primary/14 px-4 py-3 text-sm leading-5 text-foreground">
            Yes, it&apos;s available. I can also help with delivery or pickup.
          </div>
          <div className="ml-auto max-w-[84%] rounded-2xl rounded-tr-md border border-primary/28 bg-primary/14 px-4 py-3 text-sm leading-5 text-foreground">
            Please send your name and contact number to reserve it.
          </div>

          <div className="rounded-2xl border border-primary/24 bg-black/28 p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                  Lead captured
                </p>
                <p className="mt-1 text-sm text-foreground">
                  Product enquiry
                </p>
                <p className="text-xs text-muted-foreground">
                  Customer details saved
                </p>
              </div>
              <LayoutDashboard className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 p-4">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Chat demo ready
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function VoicePhoneMockup() {
  return (
    <PhoneFrame mode="voice">
      <div className="flex h-full flex-col">
        <div className="px-5 py-5 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-primary/30 bg-primary/14 text-primary shadow-[0_0_34px_rgba(201,160,61,0.2)]">
            <PhoneCall className="h-7 w-7" />
          </span>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            AI call active
          </p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">
            New booking enquiry
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Qualified and booking now
          </p>
        </div>

        <div className="flex h-14 items-center justify-center gap-1.5 px-6">
          {[24, 42, 30, 52, 28, 46, 34, 56, 38, 26].map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="w-1.5 rounded-full bg-primary/70 animate-pulse"
              style={{
                height,
                animationDelay: `${index * 90}ms`,
              }}
            />
          ))}
        </div>

        <div className="flex-1 space-y-3 px-4 py-4">
          <div className="rounded-2xl border border-white/8 bg-white/[0.05] px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Live transcript
            </p>
            <p className="mt-2 text-sm leading-5 text-foreground/86">
              Customer wants Saturday. Agent confirms service, location, and
              preferred time.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/24 bg-primary/12 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
              Booking confirmed
            </p>
            <p className="mt-2 text-sm leading-5 text-foreground">
              Saturday 10:00 AM sent to dashboard.
            </p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/24 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Summary
            </p>
            <p className="mt-2 text-sm leading-5 text-foreground/82">
              Lead is ready for staff follow-up with notes and contact details.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-white/8 p-4 text-center text-[11px] font-semibold text-foreground/72">
          <span className="rounded-full bg-white/[0.05] py-2">Summary</span>
          <span className="rounded-full bg-primary/14 py-2 text-primary">
            Transfer
          </span>
          <span className="rounded-full bg-white/[0.05] py-2">Lead</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OfferMockup({ id }: { id: OfferId }) {
  return id === "chat" ? <ChatPhoneMockup /> : <VoicePhoneMockup />;
}

function OfferModal({ offer }: { offer: Offer }) {
  return (
    <DialogContent className="max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-6xl overflow-y-auto rounded-[1.75rem] border-primary/24 bg-[linear-gradient(145deg,rgba(26,22,12,0.96),rgba(9,8,6,0.98))] p-4 shadow-[0_38px_140px_-62px_rgba(201,160,61,0.86)] sm:p-5 lg:overflow-hidden [&>button.absolute]:right-4 [&>button.absolute]:top-4 [&>button.absolute]:grid [&>button.absolute]:h-10 [&>button.absolute]:w-10 [&>button.absolute]:place-items-center [&>button.absolute]:rounded-full [&>button.absolute]:border [&>button.absolute]:border-primary/24 [&>button.absolute]:bg-black/40 [&>button.absolute]:text-foreground">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80",
          offer.accent,
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_82%_28%,rgba(201,160,61,0.18),transparent_68%)]"
      />

      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
        <div className="px-1 py-2 sm:px-3 lg:py-4">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
            {offer.label}
          </p>
          <DialogTitle className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {offer.modalTitle}
          </DialogTitle>
          <DialogDescription className="mt-4 max-w-2xl text-base leading-7 text-foreground/72">
            {offer.description}
          </DialogDescription>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {offer.chips.map((chip) => {
              const ChipIcon = chip.Icon;
              return (
                <div
                  key={chip.label}
                  className="flex items-center gap-3 rounded-2xl border border-primary/18 bg-black/24 px-4 py-3 text-sm font-semibold text-foreground/84"
                >
                  <ChipIcon className="h-4 w-4 shrink-0 text-primary" />
                  {chip.label}
                </div>
              );
            })}
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {offer.capabilities.map((capability) => {
              const CapabilityIcon = capability.Icon;
              return (
                <div
                  key={capability.label}
                  className="flex items-start gap-2.5 rounded-xl border border-white/8 bg-white/[0.035] px-3.5 py-2.5 text-sm leading-5 text-foreground/72"
                >
                  <CapabilityIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  {capability.label}
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={offer.demoHref}>
                See Live Demo
                <Zap className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={offer.exploreHref}>
                {offer.exploreLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="link" size="lg" className="px-1 text-primary">
              <Link href={offer.pricingHref}>View Pricing</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-primary/14 bg-black/18 px-3 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-5">
          <OfferMockup id={offer.id} />
        </div>
      </div>
    </DialogContent>
  );
}

export function Features() {
  const [activeOffer, setActiveOffer] = useState<OfferId | null>(null);
  const activeOfferData = useMemo(
    () => offers.find((offer) => offer.id === activeOffer),
    [activeOffer],
  );

  return (
    <section
      id="features"
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,160,61,0.1) 0%, rgba(0,0,0,0) 72%)",
        }}
      />
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="What we offer"
            title={
              <>
                AI agents built to{" "}
                <span className="text-primary">capture demand</span>
              </>
            }
            subtitle="Two high-conversion agents for the moments where customers usually disappear: messages, calls, follow-ups, and bookings."
          />
        </FadeUp>

        <Dialog
          open={activeOffer !== null}
          onOpenChange={(open) => {
            if (!open) setActiveOffer(null);
          }}
        >
          <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
            {offers.map((offer) => {
              return (
                <motion.button
                  type="button"
                  key={offer.id}
                  aria-label={`Open ${offer.cardTitle} details`}
                  aria-haspopup="dialog"
                  onClick={() => setActiveOffer(offer.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-[1.65rem] border border-primary/20 bg-card/58 p-3 text-left shadow-[0_28px_90px_-64px_rgba(201,160,61,0.72)] backdrop-blur-xl transition-colors hover:border-primary/42 sm:p-4"
                >
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80",
                      offer.accent,
                    )}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100 group-hover:animate-[kaizen-sheen_5.5s_ease-in-out_infinite]"
                  />

                  <span className="relative block aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Image
                      src={offer.cardImageSrc}
                      alt={offer.cardImageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.025]"
                      priority={offer.id === "chat"}
                    />
                  </span>
                </motion.button>
              );
            })}
          </div>

          {activeOfferData && <OfferModal offer={activeOfferData} />}
        </Dialog>
      </Container>
    </section>
  );
}
