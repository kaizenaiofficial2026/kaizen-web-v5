"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/Container";
import { Grain } from "@/components/primitives/Grain";
import { HeroBackgroundFallback } from "@/components/backgrounds/HeroBackgroundFallback";

const HeroBackground = dynamic(
  () =>
    import("@/components/backgrounds/HeroBackground").then(
      (m) => m.HeroBackground,
    ),
  { ssr: false, loading: () => <HeroBackgroundFallback /> },
);

const heroStats = [
  "148 calls answered today",
  "0 missed leads",
  "< 5s avg response",
  "30+ languages handled",
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[88vh] w-full flex-col overflow-hidden pb-24 pt-32 sm:pt-40">
      {reduced ? <HeroBackgroundFallback /> : <HeroBackground />}
      <div className="bg-background/34 pointer-events-none absolute inset-0 z-0" />
      <Grain />

      <Container className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="border-primary/25 bg-card/60 text-foreground/85 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs backdrop-blur-md sm:text-sm"
        >
          <span className="bg-primary block h-1.5 w-1.5 rounded-full" />
          AI chatbots and voice agents
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-foreground text-display mt-6 max-w-4xl font-medium"
        >
          Never miss a lead. <br className="hidden sm:block" />
          <span className="text-primary">Never lose a customer.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.16,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-foreground/75 text-lead mt-6 max-w-xl"
        >
          AI agents that answer calls, reply to messages, qualify enquiries,
          and book appointments 24/7 in the customer&apos;s preferred language.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="xl">
            <Link href="/demo">
              Book a strategy call
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link href="/solutions">See solutions</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-[0.2em]">
            Always on duty for calls, chats, and bookings
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-60">
            {heroStats.map((name) => (
              <span
                key={name}
                className="text-foreground/70 text-sm font-semibold tracking-wide"
              >
                {name}
              </span>
            ))}
          </div>
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
