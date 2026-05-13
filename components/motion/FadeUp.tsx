"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

type FadeUpProps = HTMLMotionProps<"div"> & {
  delay?: number;
  x?: number;
  y?: number;
};

export function FadeUp({
  delay = 0,
  x = 0,
  y = 24,
  children,
  ...props
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
