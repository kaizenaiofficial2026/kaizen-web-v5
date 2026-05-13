"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  Bot,
  CalendarCheck,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const quickPrompts = [
  "What can Kaizen do?",
  "How fast can we launch?",
  "Do you handle calls?",
  "Show pricing",
];

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi, I am Kaizen AI. Ask me about chatbots, voice agents, pricing, or how we can help you stop missing leads.",
  },
];

function getBotReply(message: string) {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("price") ||
    normalized.includes("pricing") ||
    normalized.includes("cost") ||
    normalized.includes("plan")
  ) {
    return "Kaizen has chatbot and voice-agent plans for different volumes. The fastest way to choose the right one is to share your channels, enquiry volume, and whether you need calls, chat, or both.";
  }

  if (
    normalized.includes("call") ||
    normalized.includes("voice") ||
    normalized.includes("phone")
  ) {
    return "Yes. Kaizen can answer inbound calls, qualify leads, capture details, summarize conversations, and help route or book appointments when your team is unavailable.";
  }

  if (
    normalized.includes("launch") ||
    normalized.includes("setup") ||
    normalized.includes("fast") ||
    normalized.includes("time")
  ) {
    return "Most chatbot launches can be ready in a few days. Voice agents usually need more testing because call flows, tone, and handoff rules matter more.";
  }

  if (
    normalized.includes("what") ||
    normalized.includes("do") ||
    normalized.includes("help") ||
    normalized.includes("kaizen")
  ) {
    return "Kaizen answers messages and calls, qualifies enquiries, follows up quickly, and helps turn missed leads into booked appointments across chat, WhatsApp, and voice.";
  }

  return "That is a good question. Kaizen is built to recover missed leads, answer customer enquiries, and book more appointments without adding headcount. A quick demo is the best next step for a specific recommendation.";
}

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.98,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    inputRef.current?.focus();

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [messages, isTyping, open, reducedMotion]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text: trimmed },
    ]);
    setInput("");
    setIsTyping(true);

    timeoutRef.current = setTimeout(
      () => {
        setMessages((current) => [
          ...current,
          {
            id: Date.now() + 1,
            role: "assistant",
            text: getBotReply(trimmed),
          },
        ]);
        setIsTyping(false);
      },
      reducedMotion ? 0 : 520,
    );
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby="chat-widget-title"
            aria-describedby="chat-widget-description"
            variants={reducedMotion ? undefined : panelVariants}
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? undefined : "show"}
            exit={reducedMotion ? undefined : "exit"}
            className="pointer-events-auto fixed inset-x-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-[72] flex max-h-[min(78dvh,640px)] flex-col overflow-hidden rounded-2xl border border-primary/25 bg-background/95 shadow-[0_28px_90px_-34px_rgba(201,160,61,0.85)] backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:w-[400px]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "radial-gradient(80% 55% at 80% 0%, rgba(201,160,61,0.2) 0%, rgba(201,160,61,0) 72%)",
              }}
            />

            <div className="relative flex items-start justify-between gap-4 border-b border-border/70 px-4 py-4 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_16px_40px_-22px_color-mix(in_oklab,var(--primary)_90%,transparent)]">
                  <Bot className="h-5 w-5" aria-hidden />
                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-background bg-emerald-400" />
                </div>
                <div>
                  <h2
                    id="chat-widget-title"
                    className="text-sm font-semibold text-foreground"
                  >
                    Kaizen AI
                  </h2>
                  <p
                    id="chat-widget-description"
                    className="mt-0.5 text-xs text-muted-foreground"
                  >
                    Online now. Usually replies instantly.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-foreground/60 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              className="relative flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6",
                      message.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md border border-border/70 bg-card/70 text-foreground/85",
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border/70 bg-card/70 px-4 py-3">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-primary/80 animate-pulse"
                        style={{ animationDelay: `${dot * 120}ms` }}
                      />
                    ))}
                    <span className="sr-only">Kaizen AI is typing</span>
                  </div>
                </div>
              )}
            </div>

            <div className="relative border-t border-border/70 px-4 py-4 sm:px-5">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    disabled={isTyping}
                    className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:bg-primary/15 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                className="flex items-center gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage(input);
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about Kaizen..."
                  className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-background/80 px-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  className="h-11 w-11 rounded-xl"
                >
                  <Send className="h-4 w-4" aria-hidden />
                </Button>
              </form>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-3 w-full rounded-xl"
              >
                <Link href="/demo" onClick={() => setOpen(false)}>
                  <CalendarCheck className="h-4 w-4" aria-hidden />
                  Book demo
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close Kaizen AI chat" : "Open Kaizen AI chat"}
        aria-expanded={open}
        className="pointer-events-auto fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[73] inline-flex h-14 items-center gap-3 rounded-2xl border border-primary/30 bg-primary px-4 text-primary-foreground shadow-[0_22px_60px_-24px_color-mix(in_oklab,var(--primary)_90%,transparent)] transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6"
      >
        <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-primary-foreground/15">
          {open ? (
            <X className="h-4 w-4" aria-hidden />
          ) : (
            <MessageCircle className="h-4 w-4" aria-hidden />
          )}
          {!open && (
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-primary bg-emerald-400" />
          )}
        </span>
        <span className="hidden text-sm font-bold sm:inline">Ask Kaizen</span>
        <Sparkles className="hidden h-4 w-4 sm:block" aria-hidden />
      </button>
    </div>
  );
}
