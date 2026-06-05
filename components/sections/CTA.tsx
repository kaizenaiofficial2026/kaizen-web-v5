"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { openConsultationModal } from "@/components/contact/ConsultationModal";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative w-full overflow-hidden bg-black py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[90px] sm:h-[28rem] sm:w-[28rem]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-8 h-44 w-80 rotate-[-18deg] rounded-full bg-[radial-gradient(circle,rgba(240,234,216,0.18),rgba(196,154,48,0.09)_42%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-8 h-52 w-80 rotate-12 rounded-full bg-[radial-gradient(circle,rgba(196,154,48,0.2),rgba(196,154,48,0.08)_48%,transparent_72%)] blur-2xl"
      />

      <Container className="relative z-10 text-center">
        <FadeUp>
          <h2 className="text-foreground text-h1 font-bold">
            Ready to discover what{" "}
            <span className="font-serif italic text-primary">AI</span> can{" "}
            <span className="[font-family:var(--font-syne)] font-bold tracking-tight text-primary">
              automate
            </span>{" "}
            in your business?
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-foreground/72 sm:text-lg">
            Book a free consultation and we&apos;ll identify the highest-impact
            AI opportunities for your organisation.
          </p>
        </FadeUp>
        <FadeUp delay={0.16}>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              size="xl"
              className="w-full rounded-xl border border-[#d0a235]/65 bg-[linear-gradient(135deg,#d8a928,#b98918)] px-7 font-semibold text-black shadow-[0_0_42px_-14px_rgba(216,169,40,0.95),inset_0_1px_0_rgba(255,255,255,0.28)] hover:bg-[linear-gradient(135deg,#e5b83d,#c99824)] sm:w-auto"
              onClick={openConsultationModal}
            >
              Free Consultation
              <ArrowRight aria-hidden />
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="w-full rounded-xl border-[#b88b25]/65 bg-black/20 px-7 text-[#f1ece0] shadow-[0_0_28px_-20px_rgba(216,169,40,0.9)] hover:border-[#d0a235] hover:bg-[#c49a30]/10 hover:text-[#f1ece0] sm:w-auto"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
