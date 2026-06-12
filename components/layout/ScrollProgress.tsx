"use client";

import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden
      className="bg-gradient-to-r from-primary/0 via-primary to-primary/0 absolute inset-x-0 bottom-0 h-px origin-left"
      style={{ scaleX }}
    />
  );
}
