"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, Mic, Phone, PhoneOff, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Container } from "@/components/primitives/Container";
import { Grain } from "@/components/primitives/Grain";
import { MarketingSection } from "@/components/primitives/MarketingPage";
import { FadeUp } from "@/components/motion/FadeUp";
import { OPEN_CHAT_WIDGET_EVENT } from "@/lib/chat-events";
import { siteConfig } from "@/lib/content/site";
import { cn } from "@/lib/utils";
import { useBrowserVoiceCall } from "@/components/demo/BrowserVoiceCall";

type RegistrationForm = {
  name: string;
  phone: string;
  email: string;
};

type RegistrationErrors = Partial<Record<keyof RegistrationForm, string>>;

const initialRegistration: RegistrationForm = {
  name: "",
  phone: "",
  email: "",
};

const inputClassName =
  "mt-2 h-12 w-full rounded-md border border-border bg-background/70 px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-primary/70 focus:ring-2 focus:ring-primary/20";

const whatsappHref =
  "https://wa.me/94770299569?text=Hi%20KaizenAI%2C%20I%20want%20to%20try%20the%20chat%20agent%20demo.";

function validateRegistration(form: RegistrationForm) {
  const errors: RegistrationErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.phone.trim()) errors.phone = "Phone number is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

function VoiceOrb({
  active,
  speaking,
  userSpeaking,
}: {
  active: boolean;
  speaking: boolean;
  userSpeaking: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const pulse = active
    ? [1, 1.12, 0.97, 1.08, 1]
    : [1, 1.04, 1];

  return (
    <div className="relative grid h-48 w-48 place-items-center sm:h-56 sm:w-56" aria-hidden>
      <motion.div
        className={cn(
          "absolute inset-4 rounded-full border",
          userSpeaking
            ? "border-sky-300/40 bg-sky-300/10"
            : active
              ? "border-primary/40 bg-primary/10"
              : "border-primary/20 bg-primary/5",
        )}
        animate={reduceMotion ? undefined : { scale: active ? [1, 1.18, 1] : [1, 1.08, 1], opacity: active ? [0.45, 0.82, 0.45] : [0.35, 0.55, 0.35] }}
        transition={{ duration: active ? 1.6 : 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-primary/20"
        animate={reduceMotion ? undefined : { scale: active ? [0.95, 1.28, 0.95] : [1, 1.12, 1], opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: active ? 2 : 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.div
        className={cn(
          "relative h-28 w-28 overflow-hidden rounded-full shadow-[0_0_80px_-18px_color-mix(in_oklab,var(--primary)_80%,transparent)] sm:h-32 sm:w-32",
          speaking || active ? "bg-primary" : "bg-primary/80",
        )}
        animate={reduceMotion ? undefined : { scale: pulse, rotate: active ? [0, 4, -5, 0] : [0, 1, 0] }}
        transition={{ duration: active ? 1.25 : 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.95),rgba(255,255,255,0)_24%),radial-gradient(circle_at_70%_68%,rgba(10,9,7,0.9),rgba(10,9,7,0)_50%)]" />
        <motion.div
          className="absolute -left-8 top-8 h-16 w-44 rounded-full bg-white/30 blur-xl"
          animate={reduceMotion ? undefined : { x: active ? [0, 22, -12, 0] : [0, 10, 0], y: active ? [0, -8, 10, 0] : [0, 4, 0] }}
          transition={{ duration: active ? 1.7 : 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

function StatusBars({ active }: { active: boolean }) {
  return (
    <div className="flex items-end justify-center gap-1.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((bar) => (
        <motion.span
          key={bar}
          className={cn("w-1.5 rounded-full", active ? "bg-primary" : "bg-primary/40")}
          animate={{ height: active ? [8, 22 + bar * 3, 10, 18] : [7, 12, 7] }}
          transition={{ duration: active ? 0.9 : 2.6, repeat: Infinity, ease: "easeInOut", delay: bar * 0.08 }}
        />
      ))}
    </div>
  );
}

export function InteractiveDemoPage() {
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<HTMLElement | null>(null);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [consentOpen, setConsentOpen] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [registration, setRegistration] = useState<RegistrationForm>(initialRegistration);
  const [registrationErrors, setRegistrationErrors] = useState<RegistrationErrors>({});
  const [registeredLead, setRegisteredLead] = useState<RegistrationForm | null>(null);

  const {
    state,
    error,
    isSpeaking,
    isUserSpeaking,
    transcript,
    start,
    stop,
  } = useBrowserVoiceCall();

  const voiceActive = state === "connecting" || state === "active";

  const phoneStatus = useMemo(() => {
    if (registrationOpen) return "Register to continue";
    if (consentOpen) return "Confirm privacy notice";
    if (state === "connecting") return "Starting voice demo...";
    if (state === "active" && isUserSpeaking) return "Listening...";
    if (state === "active" && isSpeaking) return "AI is speaking...";
    if (state === "active") return "Voice agent active";
    if (state === "error") return "Microphone access required";
    return "Ready when you are";
  }, [consentOpen, isSpeaking, isUserSpeaking, registrationOpen, state]);

  const latestTranscript = transcript[transcript.length - 1];

  const openVoiceFlow = () => {
    phoneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (registeredLead) {
      setConsentChecked(false);
      setConsentOpen(true);
      return;
    }
    setRegistrationOpen(true);
  };

  const handleRegistrationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateRegistration(registration);
    setRegistrationErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setRegisteredLead({
      name: registration.name.trim(),
      phone: registration.phone.trim(),
      email: registration.email.trim(),
    });
    setRegistrationOpen(false);
    setConsentChecked(false);
    setConsentOpen(true);
  };

  const startVoiceDemo = async () => {
    if (!consentChecked) return;
    setConsentOpen(false);
    await start();
  };

  const scrollToChatSection = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openChatBubble = () => {
    window.dispatchEvent(new Event(OPEN_CHAT_WIDGET_EVENT));
  };

  return (
    <main id="main" className="relative overflow-hidden">
      <section id="voice-agent-demo" className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-28 lg:pt-38">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(70% 55% at 48% 0%, rgba(201,160,61,0.20) 0%, rgba(201,160,61,0.07) 36%, rgba(10,9,7,0) 72%), radial-gradient(42% 38% at 86% 32%, rgba(201,160,61,0.12) 0%, rgba(10,9,7,0) 72%)",
          }}
        />
        <Grain />
        <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(340px,0.74fr)] xl:gap-16">
          <FadeUp>
            <div className="max-w-3xl">
              <h1 className="text-h1 font-medium text-foreground">
                Try KaizenAI Live
              </h1>
              <p className="mt-5 text-balance text-3xl font-medium tracking-tight text-primary sm:text-4xl lg:text-5xl">
                Talk to our AI Voice Agent in real time.
              </p>
              <p className="mt-6 max-w-2xl text-lead text-foreground/75">
                Experience how KaizenAI answers calls, handles enquiries, books
                appointments, and responds like a trained business assistant.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="xl" onClick={openVoiceFlow} aria-label="Call the Voice Agent live demo" className="w-full sm:w-auto">
                  Call the Voice Agent
                  <ArrowRight aria-hidden />
                </Button>
                <Button size="xl" variant="outline" onClick={scrollToChatSection} className="w-full sm:w-auto">
                  Try Chat Agent
                  <MessageCircle aria-hidden />
                </Button>
              </div>
              <div className="mt-8 grid gap-3 text-sm text-foreground/70 sm:grid-cols-3">
                {["Live browser voice call", "Booking-focused flow", "Human handoff ready"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div ref={phoneRef} className="mx-auto w-full max-w-[340px] sm:max-w-[370px]">
              <div className="rounded-[2.2rem] border border-primary/25 bg-black/80 p-2 shadow-[0_34px_120px_-46px_color-mix(in_oklab,var(--primary)_75%,transparent)] sm:rounded-[2.6rem] sm:p-3">
                <div className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[linear-gradient(160deg,rgba(22,18,11,0.98),rgba(8,8,7,0.98)_46%,rgba(31,23,10,0.94))] px-4 pb-5 pt-4 sm:rounded-[2.15rem] sm:px-5 sm:pb-6">
                  <div aria-hidden className="absolute left-1/2 top-2 h-6 w-28 -translate-x-1/2 rounded-full bg-black/75" />
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-medium text-foreground/75">
                    <span>9:41</span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-4 rounded-sm border border-foreground/45" />
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </span>
                  </div>

                  <div className="relative z-10 mt-10 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                      KaizenAI
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-foreground">
                      AI Voice Agent
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">Live demo assistant</p>
                  </div>

                  <div className="relative z-10 mt-6 grid place-items-center">
                    <VoiceOrb active={voiceActive} speaking={isSpeaking} userSpeaking={isUserSpeaking} />
                  </div>

                  <div className="relative z-10 mt-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-md">
                    <p className="text-sm font-medium text-foreground">{phoneStatus}</p>
                    <div className="mt-3">
                      <StatusBars active={voiceActive} />
                    </div>
                    {latestTranscript && state === "active" && (
                      <p className="mt-4 line-clamp-2 rounded-xl border border-primary/15 bg-primary/10 px-3 py-2 text-left text-xs leading-5 text-foreground/75">
                        <span className="font-semibold text-primary">
                          {latestTranscript.role === "user" ? "You" : "AI"}:
                        </span>{" "}
                        {latestTranscript.text}
                      </p>
                    )}
                  </div>

                  {error && (
                    <p className="relative z-10 mt-4 rounded-xl border border-destructive/25 bg-destructive/10 px-3 py-2 text-xs leading-5 text-destructive">
                      Microphone access is required to use the live voice demo. Please allow microphone access and try again.
                    </p>
                  )}

                  <div className="relative z-10 mt-5">
                    {state === "active" ? (
                      <Button
                        size="xl"
                        variant="outline"
                        className="w-full border-destructive/40 text-destructive hover:bg-destructive/10"
                        onClick={stop}
                      >
                        <PhoneOff aria-hidden />
                        End Demo
                      </Button>
                    ) : (
                      <Button
                        size="xl"
                        className="w-full"
                        onClick={openVoiceFlow}
                        disabled={state === "connecting"}
                      >
                        <Phone aria-hidden />
                        {state === "connecting" ? "Starting voice demo..." : "Call Now"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      <MarketingSection
        id="chat-agent-demo"
        className="py-18 sm:py-24 lg:py-28"
        containerClassName="relative"
      >
        <section ref={chatRef} className="relative">
          <FadeUp>
            <Card className="gold-card relative overflow-hidden p-7 sm:p-10 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.55fr)] lg:items-center">
                <div>
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <MessageCircle className="h-5 w-5" aria-hidden />
                  </div>
                  <h2 className="mt-6 text-h2 font-medium text-foreground">
                    Prefer to type? Try the Chat Agent.
                  </h2>
                  <p className="mt-5 max-w-2xl text-lead text-foreground/75">
                    Message the KaizenAI chat agent directly on the website or
                    text us on WhatsApp to experience how our AI handles
                    customer conversations.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button size="xl" onClick={openChatBubble} className="w-full sm:w-auto">
                      Use the website chat
                      <ArrowRight aria-hidden />
                    </Button>
                    <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                      <a href={whatsappHref} target="_blank" rel="noreferrer">
                        Message us on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="relative rounded-2xl border border-border bg-background/55 p-5 text-sm text-foreground/75 backdrop-blur-md">
                  <p className="font-medium text-foreground">Website chat demo</p>
                  <p className="mt-3 leading-6">
                    The floating chat bubble stays live on this page. Open it
                    from the bottom-right corner and ask the assistant a real
                    customer question.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-primary">
                    <Mic className="h-4 w-4" aria-hidden />
                    <span className="text-sm font-medium">Voice and chat demos share the same product feel.</span>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-14 right-3 hidden w-72 text-primary lg:block">
                <p className="mb-2 text-right text-xs font-semibold uppercase tracking-[0.22em] text-primary/85">
                  Click the chat bubble to test it live.
                </p>
                <svg viewBox="0 0 290 120" fill="none" className="h-28 w-full">
                  <path
                    d="M12 20 C88 18 92 98 158 86 C204 78 208 36 276 52"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="7 8"
                  />
                  <path
                    d="M262 39 L278 52 L258 60"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Card>
          </FadeUp>
        </section>
      </MarketingSection>

      <MarketingSection className="pt-0">
        <Card className="gold-card p-8 text-center sm:p-10">
          <FadeUp>
            <ShieldCheck className="mx-auto h-8 w-8 text-primary" aria-hidden />
            <h2 className="mx-auto mt-5 max-w-3xl text-h2 font-medium text-foreground">
              Ready to build this around your real workflow?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lead text-foreground/75">
              Bring your call flow, chat questions, booking rules, and handoff
              moments. We will map the demo into a production-ready setup.
            </p>
            <Button asChild size="xl" className="mt-8">
              <Link href="/book-demo">
                Book a Free Demo
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <p className="mt-5 text-sm text-muted-foreground">
              {siteConfig.url.replace("https://", "")} · {siteConfig.salesEmail}
            </p>
          </FadeUp>
        </Card>
      </MarketingSection>

      <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
        <DialogContent className="max-w-xl">
          <DialogTitle>Register for the live voice demo</DialogTitle>
          <DialogDescription className="leading-6">
            Please register before starting the live voice demo. You may receive
            emails from KaizenAI about your demo request and related services.
          </DialogDescription>
          <form className="mt-2 space-y-4" onSubmit={handleRegistrationSubmit} noValidate>
            <div>
              <label htmlFor="demo-name" className="text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="demo-name"
                value={registration.name}
                onChange={(event) => setRegistration((current) => ({ ...current, name: event.target.value }))}
                className={inputClassName}
                autoComplete="name"
                aria-invalid={Boolean(registrationErrors.name)}
              />
              {registrationErrors.name && <p className="mt-1 text-xs text-destructive">{registrationErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="demo-phone" className="text-sm font-medium text-foreground">
                Phone number
              </label>
              <input
                id="demo-phone"
                value={registration.phone}
                onChange={(event) => setRegistration((current) => ({ ...current, phone: event.target.value }))}
                className={inputClassName}
                autoComplete="tel"
                aria-invalid={Boolean(registrationErrors.phone)}
              />
              {registrationErrors.phone && <p className="mt-1 text-xs text-destructive">{registrationErrors.phone}</p>}
            </div>

            <div>
              <label htmlFor="demo-email" className="text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                id="demo-email"
                type="email"
                value={registration.email}
                onChange={(event) => setRegistration((current) => ({ ...current, email: event.target.value }))}
                className={inputClassName}
                autoComplete="email"
                aria-invalid={Boolean(registrationErrors.email)}
              />
              {registrationErrors.email && <p className="mt-1 text-xs text-destructive">{registrationErrors.email}</p>}
            </div>

            <Button type="submit" size="xl" className="w-full">
              Continue
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
        <DialogContent className="max-w-xl">
          <DialogTitle>Before you start the voice demo</DialogTitle>
          <DialogDescription className="leading-6">
            Your voice interaction may be recorded, processed, and reviewed to
            improve the KaizenAI demo experience. By continuing, you agree to
            enable your microphone and allow KaizenAI to process the
            conversation for demo and follow-up purposes.
          </DialogDescription>
          <p className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm leading-6 text-foreground/80">
            Please do not share sensitive personal, financial, medical, or
            confidential business information during the demo.
          </p>
          <label className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4 text-sm text-foreground/80">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(event) => setConsentChecked(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border accent-primary"
            />
            <span>I understand and agree to continue.</span>
          </label>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => setConsentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={startVoiceDemo} disabled={!consentChecked} className="whitespace-normal">
              Enable Microphone & Start Demo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
