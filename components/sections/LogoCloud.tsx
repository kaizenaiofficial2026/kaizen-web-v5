"use client";

import { motion } from "motion/react";
import { Container } from "@/components/primitives/Container";
import { partnerLogos } from "@/lib/content/logos";

const Row = ({
  logos,
  reverse = false,
}: {
  logos: string[];
  reverse?: boolean;
}) => {
  const doubled = [...logos, ...logos];
  return (
    <div className="mask-fade-x group relative overflow-hidden">
      <motion.div
        className="flex w-max items-center gap-14 whitespace-nowrap py-4 group-hover:[animation-play-state:paused]"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            className="text-foreground/40 hover:text-foreground select-none text-2xl font-semibold tracking-tight transition-colors sm:text-3xl"
          >
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export function LogoCloud() {
  return (
    <section
      aria-labelledby="logos-heading"
      className="relative w-full border-y border-border/50 bg-card/20 py-14 sm:py-20"
    >
      <Container>
        <p
          id="logos-heading"
          className="text-muted-foreground mb-8 text-center text-xs font-medium uppercase tracking-[0.22em]"
        >
          Built on the world&apos;s best AI infrastructure
        </p>
        <div className="flex flex-col gap-2">
          <Row logos={partnerLogos} />
          <Row logos={[...partnerLogos].reverse()} reverse />
        </div>
      </Container>
    </section>
  );
}
