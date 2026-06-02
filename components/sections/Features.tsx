"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Mic,
  PhoneCall,
  Play,
  Zap,
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
  modalTitle: string;
  description: string;
  accent: string;
  exploreLabel: string;
  exploreHref: string;
  demoHref: string;
};

const offers: Offer[] = [
  {
    id: "chat",
    label: "AI CHAT AGENT",
    cardTitle: "AI Chat Agent",
    cardImageSrc: "/images/ai-chat-agent-card.png",
    cardImageAlt:
      "KaizenAI AI Chat Agent connected to WhatsApp, Instagram, Facebook and website",
    modalTitle: "Turn every message into a sales opportunity.",
    description:
      "Instantly reply to website, WhatsApp, Instagram, and Facebook enquiries with an AI agent trained on your products, services, pricing, FAQs, and sales flow.",
    accent: "from-[#ecd479]/24 via-[#c9a03d]/12 to-transparent",
    exploreLabel: "Explore Chat Agents",
    exploreHref: "/solutions/chatbots",
    demoHref: "/demo#chat-agent-demo",
  },
  {
    id: "voice",
    label: "AI RECEPTIONIST",
    cardTitle: "AI Receptionist",
    cardImageSrc: "/images/ai-receptionist-card.png",
    cardImageAlt:
      "KaizenAI AI Receptionist answering calls with AI brain automation",
    modalTitle: "Answer calls, follow up, and book appointments 24/7.",
    description:
      "A natural AI receptionist that answers inbound calls, recovers missed leads, books appointments, and hands urgent conversations to your team.",
    accent: "from-[#f1ece0]/16 via-[#c9a03d]/14 to-transparent",
    exploreLabel: "Explore Voice Agents",
    exploreHref: "/solutions/voice-agents",
    demoHref: "/demo#voice-agent-demo",
  },
];

const voicePrompts = [
  {
    id: "appointment",
    label: "Book an appointment",
    line:
      "Sure, I can help you book an appointment. What day and time would you prefer?",
    audioSrc: "/audio/voice-demo-book-appointment.m4a",
  },
  {
    id: "hours",
    label: "Ask about opening hours",
    line:
      "We're open from 9 AM to 6 PM, Monday to Saturday. Would you like me to help you book a visit?",
    audioSrc: "/audio/voice-demo-opening-hours.m4a",
  },
  {
    id: "missed-call",
    label: "Recover missed call",
    line:
      "Hi, we noticed you missed our call. I can help you continue your enquiry or book a time that works for you.",
    audioSrc: "/audio/voice-demo-missed-call.m4a",
  },
  {
    id: "availability",
    label: "Check availability",
    line:
      "Yes, I can check the next available slot and confirm it for you instantly.",
    audioSrc: "/audio/voice-demo-check-availability.m4a",
  },
] as const;

function PhoneFrame({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      <div
        aria-hidden
        className="absolute -inset-10 rounded-full bg-primary/18 blur-3xl"
      />
      <div className="relative rounded-[2.6rem] border border-white/12 bg-[#050504] p-2.5 shadow-[0_40px_120px_-54px_rgba(201,160,61,0.9),inset_0_1px_0_rgba(255,255,255,0.16)]">
        <div className="relative h-[610px] max-h-[calc(100dvh-7rem)] overflow-hidden rounded-[2.1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,18,18,0.98),rgba(3,3,3,0.99))]">
          <div className="absolute left-1/2 top-2 z-20 h-7 w-24 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
          <div className="relative z-10 flex h-10 items-end justify-between px-7 pb-1.5 text-[11px] font-semibold text-foreground/84">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-4 rounded-full bg-foreground/70" />
              <span className="h-2.5 w-4 rounded-sm border border-foreground/70" />
            </span>
          </div>
          <div className="h-[calc(100%-2.5rem)]">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ChatPhoneMockup() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#25d366]/28 bg-[#25d366]/10 text-[#25d366]">
              <MessageCircle className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground leading-none">
                KaizenAI Chat
              </p>
              <p className="mt-1 text-[11px] text-[#25d366]">
                WhatsApp Business
              </p>
            </div>
          </div>
          <span className="rounded-full bg-[#25d366]/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#25d366]">
            Online
          </span>
        </div>

        <div className="scrollbar-thin flex-1 space-y-2.5 overflow-y-auto px-3.5 py-4">
          <div className="ml-auto max-w-[86%] rounded-2xl rounded-tr-md border border-white/8 bg-white/[0.06] px-3.5 py-2.5 text-[13px] leading-5 text-foreground/84">
            Hi, is the black chronograph watch available?
          </div>
          <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-[#25d366]/18 bg-[#25d366]/12 px-3.5 py-2.5 text-[13px] leading-5 text-foreground">
            Yes, it&apos;s available. The black chronograph model is in stock
            and ready for delivery.
          </div>
          <div className="ml-auto max-w-[72%] rounded-2xl rounded-tr-md border border-white/8 bg-white/[0.06] px-3.5 py-2.5 text-[13px] leading-5 text-foreground/84">
            What&apos;s the price?
          </div>
          <div className="max-w-[90%] rounded-2xl rounded-tl-md border border-[#25d366]/18 bg-[#25d366]/12 px-3.5 py-2.5 text-[13px] leading-5 text-foreground">
            It&apos;s LKR 18,500. It includes a stainless steel strap, 1-year
            warranty, and free delivery within Colombo.
          </div>
          <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-md border border-white/8 bg-white/[0.06] px-3.5 py-2.5 text-[13px] leading-5 text-foreground/84">
            Can I reserve one?
          </div>
          <div className="max-w-[90%] rounded-2xl rounded-tl-md border border-[#25d366]/18 bg-[#25d366]/12 px-3.5 py-2.5 text-[13px] leading-5 text-foreground">
            Of course. I can reserve it for you now. Please send your name,
            contact number, and delivery location.
          </div>
          <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md border border-white/8 bg-white/[0.06] px-3.5 py-2.5 text-[13px] leading-5 text-foreground/84">
            Reserve it under Nimal. Delivery to Colombo 5.
          </div>
          <div className="max-w-[90%] rounded-2xl rounded-tl-md border border-[#25d366]/18 bg-[#25d366]/12 px-3.5 py-2.5 text-[13px] leading-5 text-foreground">
            Perfect. Your watch has been reserved. Our team will confirm the
            order and delivery time shortly.
          </div>
        </div>

        <div className="border-t border-white/8 p-3.5">
          <div className="rounded-2xl border border-primary/18 bg-black/36 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
              ORDER CAPTURED
            </p>
            <div className="mt-2 space-y-1 text-xs text-foreground/78">
              <p>
                <span className="text-foreground">Product:</span> Black
                chronograph watch
              </p>
              <p>
                <span className="text-foreground">Price:</span> LKR 18,500
              </p>
              <p>
                <span className="text-foreground">Customer:</span> Nimal
              </p>
              <p>
                <span className="text-foreground">Status:</span> Ready for
                confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function VoicePhoneMockup() {
  const [activePromptId, setActivePromptId] =
    useState<(typeof voicePrompts)[number]["id"]>("appointment");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playbackToken = useRef(0);

  useEffect(() => {
    return () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      audioRef.current?.pause();
    };
  }, []);

  const activePrompt =
    voicePrompts.find((prompt) => prompt.id === activePromptId) ??
    voicePrompts[0];

  const playPrompt = async (prompt: (typeof voicePrompts)[number]) => {
    const token = playbackToken.current + 1;
    playbackToken.current = token;

    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    audioRef.current?.pause();

    setActivePromptId(prompt.id);
    setIsSpeaking(true);

    const finishFallback = () => {
      fallbackTimer.current = setTimeout(() => {
        if (playbackToken.current === token) setIsSpeaking(false);
      }, 2600);
    };

    // Replace these local preview files in public/audio when final voice clips are ready.
    const response = await fetch(prompt.audioSrc, { method: "HEAD" }).catch(
      () => null,
    );
    if (!response?.ok || playbackToken.current !== token) {
      finishFallback();
      return;
    }

    const audio = new Audio(prompt.audioSrc);
    audioRef.current = audio;
    audio.onended = () => {
      if (playbackToken.current === token) setIsSpeaking(false);
    };
    audio.onerror = () => {
      if (playbackToken.current === token) finishFallback();
    };
    audio.play().catch(() => {
      if (playbackToken.current === token) finishFallback();
    });
  };

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-4 py-4 text-center">
        <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.035] px-3 py-2 text-left">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary/82">
              AI Receptionist active
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {isSpeaking ? "Playing response..." : "Ready for next prompt"}
            </p>
          </div>
          <PhoneCall className="h-4 w-4 text-primary/82" />
        </div>

        <div className="relative grid flex-1 place-items-center py-4">
          <motion.div
            aria-hidden
            className="absolute h-40 w-40 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: isSpeaking
                ? [1, 1.18, 0.98, 1.12, 1]
                : [1, 1.05, 1],
            }}
            transition={{ duration: isSpeaking ? 1.2 : 4, repeat: Infinity }}
          />
          <motion.button
            type="button"
            aria-label="Play selected AI receptionist prompt"
            onClick={() => playPrompt(activePrompt)}
            className="relative grid h-32 w-32 place-items-center rounded-full border border-primary/28 bg-[radial-gradient(circle_at_35%_28%,rgba(236,212,121,0.35),rgba(201,160,61,0.12)_38%,rgba(0,0,0,0.88)_72%)] text-primary shadow-[0_0_48px_-18px_rgba(201,160,61,0.82),inset_0_1px_0_rgba(255,255,255,0.22)]"
            animate={{
              scale: isSpeaking
                ? [1, 1.05, 0.98, 1.08, 1]
                : [1, 1.02, 1],
            }}
            transition={{ duration: isSpeaking ? 0.9 : 3.4, repeat: Infinity }}
          >
            <motion.span
              aria-hidden
              className="absolute inset-2 rounded-full border border-primary/20"
              animate={{
                scale: isSpeaking ? [1, 1.28, 1] : [1, 1.12, 1],
                opacity: isSpeaking
                  ? [0.8, 0.2, 0.7]
                  : [0.5, 0.18, 0.5],
              }}
              transition={{ duration: isSpeaking ? 0.9 : 3.6, repeat: Infinity }}
            />
            <Mic className="relative h-10 w-10" />
          </motion.button>
        </div>

        <div className="rounded-2xl border border-white/8 bg-black/26 p-3 text-left">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary/82">
            <Play className="h-3 w-3" />
            Preview line
          </div>
          <p className="mt-2 min-h-[3.75rem] text-xs leading-5 text-foreground/78">
            {activePrompt.line}
          </p>
        </div>

        <div className="mt-3 grid gap-2">
          {voicePrompts.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => playPrompt(prompt)}
              className={cn(
                "rounded-xl border px-3 py-2 text-left text-xs font-semibold transition",
                activePromptId === prompt.id
                  ? "border-primary/32 bg-primary/10 text-foreground"
                  : "border-white/8 bg-white/[0.035] text-foreground/70 hover:border-primary/20 hover:text-foreground",
              )}
            >
              {prompt.label}
            </button>
          ))}
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
    <DialogContent className="max-h-[calc(100dvh-1.25rem)] w-[calc(100vw-1.25rem)] max-w-5xl overflow-y-auto rounded-[1.5rem] border-white/10 bg-[linear-gradient(145deg,rgba(15,15,15,0.98),rgba(0,0,0,0.98))] p-5 shadow-[0_34px_120px_-72px_rgba(201,160,61,0.62)] sm:p-6 lg:overflow-hidden [&>button.absolute]:right-4 [&>button.absolute]:top-4 [&>button.absolute]:grid [&>button.absolute]:h-10 [&>button.absolute]:w-10 [&>button.absolute]:place-items-center [&>button.absolute]:rounded-full [&>button.absolute]:border [&>button.absolute]:border-white/12 [&>button.absolute]:bg-black/55 [&>button.absolute]:text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_48%_at_78%_22%,rgba(201,160,61,0.11),transparent_68%),radial-gradient(44%_42%_at_18%_90%,rgba(201,160,61,0.06),transparent_70%)]"
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-20",
          offer.accent,
        )}
      />

      <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
        <div className="px-0 py-1 sm:px-1 lg:py-3">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
            {offer.label}
          </p>
          <DialogTitle className="mt-3 max-w-2xl text-[2rem] font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {offer.modalTitle}
          </DialogTitle>
          <DialogDescription className="mt-4 max-w-2xl text-base leading-7 text-foreground/70">
            {offer.description}
          </DialogDescription>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={offer.demoHref}>
                See Live Demo
                <Zap className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href={offer.exploreHref}>
                {offer.exploreLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="min-w-0">
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
