"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/primitives/Container";
import { partnerLogos } from "@/lib/content/logos";

type PartnerLogo = (typeof partnerLogos)[number];

const Row = ({
  logos,
  reverse = false,
}: {
  logos: PartnerLogo[];
  reverse?: boolean;
}) => {
  const doubled = [...logos, ...logos];
  return (
    <div className="mask-fade-x group relative overflow-hidden">
      <motion.div
        className="flex w-max items-center gap-14 whitespace-nowrap py-2.5 group-hover:[animation-play-state:paused] sm:gap-16 sm:py-3"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 76, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((logo, i) => (
          <span
            key={`${logo.name}-${i}`}
            className="grid h-[4.25rem] w-[8.5rem] shrink-0 place-items-center gap-1.5 transition-opacity sm:h-20 sm:w-40"
          >
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              width={116}
              height={50}
              className="max-h-8 w-auto max-w-24 select-none object-contain opacity-48 brightness-0 invert transition-opacity hover:opacity-85 sm:max-h-10 sm:max-w-[7.5rem]"
            />
            <span className="select-none text-center text-[10px] font-semibold leading-none text-foreground/46 transition-colors group-hover:text-foreground/62 sm:text-xs">
              {logo.name}
            </span>
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
      className="relative w-full overflow-hidden border-t border-border/25 bg-[linear-gradient(180deg,rgba(16,14,9,0.8),rgba(12,10,7,0.72)_56%,rgba(10,9,7,0))] py-11 sm:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(64%_70%_at_50%_6%,rgba(201,160,61,0.18),rgba(201,160,61,0.06)_44%,rgba(10,9,7,0)_76%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-background"
      />
      <Container>
        <p
          id="logos-heading"
          className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.24em] text-foreground/62 sm:mb-8"
        >
          Built on the world&apos;s best AI infrastructure
        </p>
        <div className="relative flex flex-col gap-2 sm:gap-3">
          <Row logos={partnerLogos} />
          <Row logos={[...partnerLogos].reverse()} reverse />
        </div>
      </Container>
    </section>
  );
}
