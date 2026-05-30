"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/Container";
import { Grain } from "@/components/primitives/Grain";
import { HeroBackgroundFallback } from "@/components/backgrounds/HeroBackgroundFallback";

const trustItems = [
  "Inbound Calls",
  "Outbound Calls",
  "WhatsApp Chats",
  "Instagram DMs",
  "Messenger",
  "Lead Conversion",
  "Bookings",
];

const trustRows = [trustItems.slice(0, 4), trustItems.slice(4)];

const proofItems = [
  "Trained on your business",
  "Human-like conversations",
  "Built to convert",
];

const HeroBackground = dynamic(
  () =>
    import("@/components/backgrounds/HeroBackground").then(
      (m) => m.HeroBackground,
    ),
  { ssr: false, loading: () => <HeroBackgroundFallback /> },
);

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[88vh] w-full flex-col overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-32 lg:min-h-[100dvh] lg:pb-20 lg:pt-28 2xl:pb-24 2xl:pt-32">
      {reduced ? <HeroBackgroundFallback /> : <HeroBackground />}
      <div className="bg-background/34 pointer-events-none absolute inset-0 z-0" />
      <Grain />

      <Container className="relative z-10 flex flex-1 flex-col items-center justify-start pt-8 text-center sm:pt-10 lg:pt-14 2xl:pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="[font-family:var(--font-syne)] max-w-5xl text-[clamp(2.65rem,12vw,6.35rem)] font-bold leading-[0.98] text-[#d8c58a] drop-shadow-[0_3px_22px_rgba(0,0,0,0.78)] [text-shadow:0_1px_0_rgba(255,255,255,0.08),0_0_34px_rgba(0,0,0,0.65)] sm:text-[clamp(3.35rem,6vw+0.8rem,6.35rem)] sm:leading-[0.96]"
        >
          Your AI Sales Team{" "}
          <span className="block bg-gradient-to-r from-[#a07820] via-[#edd070] to-[#c49a30] bg-clip-text text-transparent">
            Never Sleeps.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.16,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="[font-family:var(--font-dm-sans)] mt-6 max-w-3xl text-[1.08rem] leading-8 text-foreground sm:text-[1.24rem] sm:leading-9"
        >
          Custom-built AI voice and chat systems that answer calls, reply to
          messages, follow up with leads, book appointments, and help your
          business close more sales 24/7/365.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm font-semibold text-foreground sm:gap-x-4 sm:text-lg"
        >
          {proofItems.map((item, index) => (
            <span key={item} className="inline-flex items-center gap-2 sm:gap-4">
              {index > 0 && <span aria-hidden className="hidden min-[390px]:inline">•</span>}
              {item}
            </span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
        >
          <Button
            asChild
            size="xl"
            className="w-full rounded-xl border border-[#8d6f24]/65 bg-[linear-gradient(135deg,rgba(141,111,36,0.34),rgba(72,55,18,0.24))] px-5 font-extrabold text-[#f0ead8] shadow-[0_18px_42px_-30px_rgba(141,111,36,0.72),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-[border-color,background-color,box-shadow,color,transform] hover:-translate-y-0.5 hover:border-[#a07820]/85 hover:bg-[linear-gradient(135deg,rgba(160,120,32,0.42),rgba(72,55,18,0.28))] hover:shadow-[0_0_30px_rgba(141,111,36,0.18),0_20px_50px_-32px_rgba(141,111,36,0.75),inset_0_1px_0_rgba(255,255,255,0.16)] sm:w-auto sm:px-7"
          >
            <Link href="/book-demo">
              Book a free strategy call
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="xl"
            className="w-full rounded-xl border-white/18 bg-black/20 font-bold text-foreground/78 shadow-none backdrop-blur-md transition-[border-color,background-color,box-shadow,color,transform] hover:-translate-y-0.5 hover:border-white/34 hover:bg-white/[0.045] hover:text-foreground hover:shadow-[0_0_24px_rgba(255,255,255,0.14)] sm:w-auto"
          >
            <Link href="/demo">See live demo</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.32,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 flex w-full max-w-6xl flex-col items-center justify-center gap-3 overflow-hidden text-[10px] font-bold uppercase text-foreground/68 sm:text-[11px] lg:text-xs"
        >
          {trustRows.map((row) => (
            <div
              key={row.join("-")}
              className="flex max-w-full flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:gap-4"
            >
              {row.map((item) => (
                <span
                  key={item}
                  className="whitespace-nowrap rounded-full border border-primary/22 bg-card/35 px-2.5 py-1.5 shadow-[0_8px_26px_-22px_rgba(255,255,255,0.35)] backdrop-blur-md sm:px-3"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </Container>

      {!reduced && (
        <motion.div
          aria-hidden
          className="text-muted-foreground/60 absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      )}
    </section>
  );
}
