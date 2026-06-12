"use client";

import * as React from "react";
import { m, type HTMLMotionProps } from "motion/react";

const parentVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function StaggerGrid({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <m.div
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      {...props}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <m.div variants={childVariants} {...props}>
      {children}
    </m.div>
  );
}
