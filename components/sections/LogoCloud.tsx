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
        className="flex w-max items-center gap-12 whitespace-nowrap py-1.5 group-hover:[animation-play-state:paused]"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 76, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((logo, i) => (
          <span
            key={`${logo.name}-${i}`}
            className="grid h-14 w-28 shrink-0 place-items-center gap-1 transition-opacity sm:h-16 sm:w-32"
          >
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              width={92}
              height={40}
              className="max-h-7 w-auto max-w-20 select-none object-contain opacity-35 brightness-0 invert transition-opacity hover:opacity-80 sm:max-h-8 sm:max-w-24"
            />
            <span className="select-none text-center text-[10px] font-semibold leading-none text-foreground/38 transition-colors group-hover:text-foreground/55 sm:text-[11px]">
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
      className="relative w-full border-y border-border/50 bg-card/20 py-8 sm:py-10"
    >
      <Container>
        <p
          id="logos-heading"
          className="text-muted-foreground mb-4 text-center text-[11px] font-medium uppercase tracking-[0.22em]"
        >
          Built on the world&apos;s best AI infrastructure
        </p>
        <div className="flex flex-col gap-1">
          <Row logos={partnerLogos} />
          <Row logos={[...partnerLogos].reverse()} reverse />
        </div>
      </Container>
    </section>
  );
}
