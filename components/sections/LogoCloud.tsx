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
        className="flex w-max items-center gap-14 whitespace-nowrap py-4 group-hover:[animation-play-state:paused]"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 76, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((logo, i) => (
          <span
            key={`${logo.name}-${i}`}
            className="grid h-20 w-28 shrink-0 place-items-center gap-2 transition-opacity sm:h-22 sm:w-32"
          >
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              width={92}
              height={40}
              className="max-h-9 w-auto max-w-20 select-none object-contain opacity-35 brightness-0 invert transition-opacity hover:opacity-80 sm:max-h-10 sm:max-w-24"
            />
            <span className="select-none text-center text-[11px] font-semibold leading-none text-foreground/38 transition-colors group-hover:text-foreground/55 sm:text-xs">
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
