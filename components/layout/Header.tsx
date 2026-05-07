"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/Container";
import { BrandMark } from "./BrandMark";
import { MobileNav } from "./MobileNav";
import { ScrollProgress } from "./ScrollProgress";
import { primaryNav } from "@/lib/content/nav";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { cn } from "@/lib/utils";

const sectionIds = primaryNav
  .map((n) => n.href)
  .filter((h) => h.startsWith("#"))
  .map((h) => h.slice(1));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(sectionIds);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <motion.header
      role="banner"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex items-center justify-between gap-4 py-4">
          <BrandMark />

          <nav
            aria-label="Primary"
            className="border-border bg-card/60 hidden items-center gap-1 rounded-full border px-2 py-1.5 text-sm backdrop-blur-md md:flex"
          >
            {primaryNav.map((item) => {
              const isActive =
                item.href.startsWith("#") && active === item.href.slice(1);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-1.5 transition-colors",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-foreground/80 hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="#cta">Get started</Link>
            </Button>
            <MobileNav items={primaryNav} />
          </div>
        </div>
      </Container>
      <ScrollProgress />
    </motion.header>
  );
}
