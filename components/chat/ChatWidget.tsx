"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { OPEN_CHAT_WIDGET_EVENT } from "@/lib/chat-events";
import { cn } from "@/lib/utils";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api.kaizenai.dev";

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

function makeSessionId() {
  return `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

let _msgId = 1;
const nextMsgId = () => ++_msgId;

function renderMarkdown(text: string): React.ReactNode {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={j}>{part.slice(2, -2)}</strong>
        : part
    );
    return <span key={i}>{parts}{i < arr.length - 1 && <br />}</span>;
  });
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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hideLauncherOnMobileHero, setHideLauncherOnMobileHero] =
    useState(pathname === "/");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sessionIdRef = useRef<string>(makeSessionId());
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
    const openChatWidget = () => {
      setHideLauncherOnMobileHero(false);
      setOpen(true);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    };

    window.addEventListener(OPEN_CHAT_WIDGET_EVENT, openChatWidget);

    return () => window.removeEventListener(OPEN_CHAT_WIDGET_EVENT, openChatWidget);
  }, []);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [messages, isTyping, open, reducedMotion]);

  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setHideLauncherOnMobileHero(false);
      return;
    }

    let frameId = 0;
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const updateLauncherVisibility = () => {
      const hero = document.getElementById("home-hero");
      const shouldHide =
        mobileQuery.matches && !open && !!hero && hero.getBoundingClientRect().bottom > 0;

      setHideLauncherOnMobileHero(shouldHide);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateLauncherVisibility);
    };

    updateLauncherVisibility();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    mobileQuery.addEventListener("change", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      mobileQuery.removeEventListener("change", requestUpdate);
    };
  }, [open, pathname]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const userMsgId = nextMsgId();
    const assistantMsgId = nextMsgId();
    setMessages((current) => [
      ...current,
      { id: userMsgId, role: "user", text: trimmed },
    ]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, sessionId: sessionIdRef.current, agentId: 'kaizenai' }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) throw new Error("API error");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const msgId = assistantMsgId;
      let assistantText = "";
      let firstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value, { stream: true }).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          let parsed: { chunk?: string; done?: boolean };
          try { parsed = JSON.parse(line.slice(6)); } catch { continue; }
          if (parsed.done) break;
          if (parsed.chunk) {
            if (firstChunk) {
              firstChunk = false;
              setIsTyping(false);
              assistantText = parsed.chunk;
              setMessages((current) => [
                ...current,
                { id: msgId, role: "assistant", text: parsed.chunk! },
              ]);
            } else {
              assistantText += parsed.chunk;
              const snapshot = assistantText;
              setMessages((current) =>
                current.map((m) => (m.id === msgId ? { ...m, text: snapshot } : m))
              );
            }
          }
        }
      }

      if (firstChunk) setIsTyping(false);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setIsTyping(false);
      setMessages((current) => [
        ...current,
        {
          id: assistantMsgId,
          role: "assistant",
          text: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    }
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
            className="pointer-events-auto fixed inset-x-2 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[72] flex max-h-[min(74dvh,640px)] flex-col overflow-hidden rounded-2xl border border-primary/25 bg-background/95 shadow-[0_28px_90px_-34px_rgba(201,160,61,0.85)] backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:w-[400px] sm:max-h-[min(78dvh,640px)]"
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
                      "max-w-[88%] overflow-hidden rounded-2xl px-3.5 py-3 text-sm leading-6 break-words sm:max-w-[82%] sm:px-4",
                      message.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md border border-border/70 bg-card/70 text-foreground/85",
                    )}
                  >
                    {message.role === 'assistant' ? renderMarkdown(message.text) : message.text}
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
                className="mt-3 w-full rounded-xl whitespace-normal"
              >
                <Link href="/contact#book" onClick={() => setOpen(false)}>
                  <CalendarCheck className="h-4 w-4" aria-hidden />
                  Book consultation
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
        tabIndex={hideLauncherOnMobileHero ? -1 : undefined}
        className={cn(
          "group pointer-events-auto fixed bottom-[calc(0.875rem+env(safe-area-inset-bottom))] right-3 z-[73] inline-flex h-14 w-14 items-center justify-start overflow-hidden rounded-full border border-primary/30 bg-primary p-2 text-primary-foreground shadow-[0_22px_60px_-24px_color-mix(in_oklab,var(--primary)_90%,transparent)] transition-[width,background-color,border-color,box-shadow,transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent hover:shadow-[0_28px_76px_-26px_color-mix(in_oklab,var(--primary)_95%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 sm:p-3 sm:hover:w-[13.75rem] sm:focus-visible:w-[13.75rem]",
          hideLauncherOnMobileHero &&
            "max-md:pointer-events-none max-md:translate-y-5 max-md:opacity-0",
        )}
      >
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-foreground/15 transition-colors duration-500 group-hover:bg-primary-foreground/20 group-focus-visible:bg-primary-foreground/20">
          {open ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <MessageCircle className="h-5 w-5" aria-hidden />
          )}
          {!open && (
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-primary bg-emerald-400" />
          )}
        </span>
        <span className="ml-1.5 max-w-0 translate-x-0.5 whitespace-nowrap text-base font-bold opacity-0 transition-[max-width,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:group-hover:max-w-32 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-focus-visible:max-w-32 sm:group-focus-visible:translate-x-0 sm:group-focus-visible:opacity-100">
          Ask Kaizen
        </span>
        <Sparkles
          className="ml-auto h-5 w-5 shrink-0 translate-x-2 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-x-0 sm:group-focus-visible:opacity-100"
          aria-hidden
        />
      </button>
    </div>
  );
}
