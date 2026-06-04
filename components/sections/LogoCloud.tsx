"use client";

import { motion } from "motion/react";
import { Container } from "@/components/primitives/Container";

const trustItems = [
  "Healthcare",
  "Real Estate",
  "Ecommerce",
  "Hospitality",
  "Education",
  "Legal",
  "Finance",
  "Recruitment",
  "Professional Services",
];

const Row = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => {
  const doubled = [...items, ...items];

  return (
    <div className="mask-fade-x group relative overflow-hidden">
      <motion.div
        className="flex w-max items-center gap-4 whitespace-nowrap py-2.5 group-hover:[animation-play-state:paused] sm:gap-5 sm:py-3"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex h-12 shrink-0 items-center rounded-full border border-primary/18 bg-card/45 px-5 text-sm font-semibold text-foreground/72 backdrop-blur-md transition-colors hover:border-primary/36 hover:text-primary sm:h-14 sm:px-6 sm:text-base"
          >
            {item}
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
      className="relative w-full overflow-hidden border-t border-border/25 bg-black py-11 sm:py-14"
    >
      <Container>
        <p
          id="logos-heading"
          className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.24em] text-foreground/62 sm:mb-8"
        >
          Trusted by businesses preparing for the future
        </p>
        <div className="relative flex flex-col gap-2 sm:gap-3">
          <Row items={trustItems} />
          <Row items={[...trustItems].reverse()} reverse />
        </div>
      </Container>
    </section>
  );
}
