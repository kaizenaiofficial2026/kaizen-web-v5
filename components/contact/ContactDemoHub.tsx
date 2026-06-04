"use client";

import dynamic from "next/dynamic";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Mic,
  PhoneOff,
} from "lucide-react";
import { useBrowserVoiceCall } from "@/components/demo/BrowserVoiceCall";
import { FacebookIcon, LinkedinIcon } from "@/components/icons/social";
import { openConsultationModal } from "@/components/contact/ConsultationModal";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OPEN_CHAT_WIDGET_EVENT } from "@/lib/chat-events";
import { cn } from "@/lib/utils";

const whatsappHref = "https://wa.me/94770299569";
const emailHref = "mailto:hello@kaizenai.dev";
const premiumCardClass =
  "group/card relative isolate overflow-visible border-primary/18 bg-black/75 shadow-[0_26px_90px_-70px_rgba(196,154,48,0.9),inset_0_1px_0_rgba(240,234,216,0.05)] transition-[border-color,box-shadow,transform] duration-300 before:pointer-events-none before:absolute before:-inset-5 before:-z-10 before:rounded-[2rem] before:bg-[radial-gradient(circle_at_50%_42%,rgba(196,154,48,0.12),transparent_70%)] before:opacity-70 before:blur-2xl before:transition-opacity before:duration-300 hover:-translate-y-1 hover:border-primary/42 hover:shadow-[0_34px_110px_-70px_rgba(212,168,83,1),inset_0_1px_0_rgba(240,234,216,0.08)] hover:before:opacity-100";

const VoiceSphere = dynamic(() => import("@/components/VoiceSphere"), {
  ssr: false,
});

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    Icon: LinkedinIcon,
  },
  {
    label: "Instagram",
    href: "#",
    initials: "IG",
  },
  {
    label: "Facebook",
    href: "#",
    Icon: FacebookIcon,
  },
];

function SocialMark({
  social,
}: {
  social: (typeof socials)[number];
}) {
  const Icon = "Icon" in social ? social.Icon : null;

  return (
    <a
      href={social.href}
      aria-label={social.label}
      className="group flex items-center justify-between rounded-2xl border border-primary/14 bg-black/28 px-4 py-3 text-sm font-semibold text-foreground/75 transition-colors hover:border-primary/40 hover:text-primary"
    >
      <span>{social.label}</span>
      <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/18 bg-primary/8 text-xs text-primary/80 transition-colors group-hover:bg-primary/12 group-hover:text-primary">
        {Icon ? (
          <Icon className="h-4 w-4" aria-hidden />
        ) : (
          <span aria-hidden>{social.initials}</span>
        )}
      </span>
    </a>
  );
}

function openWebsiteChat() {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(OPEN_CHAT_WIDGET_EVENT));
}

export function ContactDemoHub() {
  const {
    state,
    error,
    start,
    stop,
    statusLabel,
  } = useBrowserVoiceCall();
  const voiceActive = state === "connecting" || state === "active";

  return (
    <main id="main" className="relative overflow-hidden bg-black">
      <section className="relative overflow-hidden bg-black">
        <Container size="wide" className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
            <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col lg:items-start items-center gap-6">
              <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-[0.94] tracking-tight text-[#F0EAD8]">
                Let&apos;s Talk
              </h1>
              <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#A3A3A3] sm:text-lg lg:mx-0">
                Whether you want to automate customer conversations, internal
                workflows, or industry-specific operations, we&apos;ll help you
                identify what AI can handle for your business.
              </p>
              <Button
                size="xl"
                onClick={openConsultationModal}
                className="mt-9 w-full rounded-xl bg-primary text-primary-foreground hover:bg-accent sm:w-auto"
              >
                Book a Free Consultation
                <ArrowRight aria-hidden />
              </Button>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center text-center gap-6">
              <div
                className="mx-auto w-full"
                style={{
                  height: "min(460px, 75vw)",
                  maxWidth: "min(460px, 75vw)",
                }}
              >
                <VoiceSphere isActive={voiceActive} />
              </div>
              <div className="mx-auto mt-8 flex max-w-sm flex-col items-center gap-3 px-4 text-center sm:px-0">
                <p className="text-base font-semibold text-[#F0EAD8]">
                  Talk to our AI representative live.
                </p>
                <p className="min-h-5 text-sm text-muted-foreground">
                  {statusLabel ?? "Browser microphone access is required."}
                </p>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                <Button
                  size="xl"
                  onClick={voiceActive ? stop : start}
                  className={cn(
                    "mt-3 w-full rounded-xl sm:w-auto",
                    voiceActive
                      ? "border border-destructive/24 bg-destructive/12 text-destructive hover:bg-destructive/18"
                      : "bg-primary text-primary-foreground hover:bg-accent",
                  )}
                >
                  {voiceActive ? (
                    <>
                      <PhoneOff aria-hidden />
                      End Call
                    </>
                  ) : (
                    <>
                      <Mic aria-hidden />
                      Talk to AI Representative
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-black pb-20 sm:pb-24 lg:pb-32">
        <Container size="wide">
          <div className="grid gap-5 lg:grid-cols-3">
            <Card className={cn(premiumCardClass, "flex h-full flex-col p-6")}>
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-primary/24 bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[#F0EAD8]">
                Chat With Our AI Agent
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#A3A3A3]">
                Our AI Chat Agent is available through the website chat bubble
                at the bottom-right of this page, or directly through WhatsApp
                for instant interaction.
              </p>
              <div className="mt-auto grid grid-cols-1 gap-3 pt-6 xl:grid-cols-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={openWebsiteChat}
                  className="h-12 min-w-0 rounded-full border-primary/38 bg-black/55 px-5 text-[#F0EAD8] shadow-[0_16px_46px_-34px_rgba(196,154,48,0.9)] backdrop-blur-md transition-[border-color,box-shadow,transform,background-color,color] hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary/10 hover:text-primary hover:shadow-[0_22px_64px_-34px_rgba(212,168,83,0.95)]"
                >
                  Use Website Chat
                  <MessageCircle aria-hidden />
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="h-12 min-w-0 rounded-full bg-[linear-gradient(135deg,#D4A853_0%,#C49A30_52%,#8F6A16_100%)] px-5 text-black shadow-[0_18px_54px_-28px_rgba(212,168,83,1),inset_0_1px_0_rgba(255,255,255,0.35)] transition-[box-shadow,transform,filter] hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#E0BA61_0%,#C49A30_55%,#9B741C_100%)] hover:shadow-[0_24px_68px_-30px_rgba(212,168,83,1),inset_0_1px_0_rgba(255,255,255,0.42)]"
                >
                  <a href={whatsappHref} target="_blank" rel="noreferrer">
                    Chat on WhatsApp
                    <ArrowRight aria-hidden />
                  </a>
                </Button>
              </div>
            </Card>

            <Card className={cn(premiumCardClass, "h-full p-6")}>
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-primary/24 bg-primary/10 text-primary">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[#F0EAD8]">
                Get In Touch Directly
              </h2>
              <div className="mt-5 space-y-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-primary/14 bg-black/28 p-4 transition-colors hover:border-primary/40"
                >
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">
                    WhatsApp
                  </span>
                  <span className="mt-1 block text-sm text-foreground/82">
                    +94 77 029 9569
                  </span>
                </a>
                <a
                  href={emailHref}
                  className="block rounded-2xl border border-primary/14 bg-black/28 p-4 transition-colors hover:border-primary/40"
                >
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">
                    Email
                  </span>
                  <span className="mt-1 block text-sm text-foreground/82">
                    hello@kaizenai.dev
                  </span>
                </a>
              </div>
            </Card>

            <Card className={cn(premiumCardClass, "h-full p-6")}>
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-primary/24 bg-primary/10 text-primary">
                <LinkedinIcon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[#F0EAD8]">
                Follow KaizenAI
              </h2>
              <nav aria-label="Social media" className="mt-5 grid gap-3">
                {socials.map((social) => (
                  <SocialMark key={social.label} social={social} />
                ))}
              </nav>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
