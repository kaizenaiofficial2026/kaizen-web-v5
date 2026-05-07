"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./BrandMark";
import { MobileNav } from "./MobileNav";
import { ScrollProgress } from "./ScrollProgress";
import { primaryNav } from "@/lib/content/nav";
import { cn } from "@/lib/utils";

function isNavItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <motion.header
      role="banner"
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-border bg-background/88 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "border-border/50 bg-background/72 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[72px]">
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-6">
          <BrandMark
            surface="dark"
            withPill={false}
            className="text-xl tracking-tight"
          />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-9 text-[15px] font-semibold text-foreground/62 lg:flex"
          >
            {primaryNav.map((item) => {
              const isActive = isNavItemActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md transition-colors",
                    isActive
                      ? "text-primary"
                      : "hover:text-foreground",
                  )}
                >
                  {item.label}
                  {item.href === "/solutions" && (
                    <ChevronDown className="h-4 w-4" aria-hidden />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-5">
            <Link
              href="/demo"
              className="hidden text-[15px] font-semibold text-foreground/62 transition-colors hover:text-primary md:inline-flex"
            >
              Client portal
            </Link>
            <Button
              asChild
              size="lg"
              className="hidden rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-[0_16px_36px_-18px_color-mix(in_oklab,var(--primary)_75%,transparent)] hover:bg-accent sm:inline-flex"
            >
              <Link href="/demo">Book demo</Link>
            </Button>
            <MobileNav items={primaryNav} />
          </div>
        </div>
      </div>
      <ScrollProgress />
    </motion.header>
  );
}
