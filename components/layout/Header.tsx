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

function isHrefActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isNavItemActive(
  pathname: string,
  item: (typeof primaryNav)[number],
) {
  return (
    (item.href ? isHrefActive(pathname, item.href) : false) ||
    Boolean(item.children?.some((child) => isHrefActive(pathname, child.href)))
  );
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
            className="hidden items-center gap-8 text-[15px] font-semibold text-foreground/62 lg:flex"
          >
            {primaryNav.map((item) => {
              const isActive = isNavItemActive(pathname, item);
              const hasChildren = !!item.children?.length;

              if (hasChildren) {
                return (
                  <div key={item.label} className="group relative">
                    <button
                      type="button"
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md py-7 transition-colors",
                        isActive ? "text-primary" : "hover:text-foreground",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className="h-4 w-4 transition-transform group-hover:rotate-180"
                        aria-hidden
                      />
                    </button>
                    <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 -translate-y-1 rounded-2xl border border-primary/20 bg-background/95 p-2 opacity-0 shadow-[0_24px_70px_-38px_rgba(201,160,61,0.8)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children?.map((child) => {
                        const isChildActive =
                          pathname === child.href.split("#")[0];
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block rounded-xl px-4 py-3 text-sm font-semibold text-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary",
                              isChildActive && "text-primary",
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href ?? item.label}
                  href={item.href ?? "/"}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md transition-colors",
                    isActive
                      ? "text-primary"
                      : "hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-5">
            <Button
              asChild
              size="sm"
              className="hidden h-10 rounded-lg border border-primary/35 bg-transparent px-5 text-sm font-extrabold text-foreground/82 shadow-none transition-[border-color,background-color,box-shadow,color] hover:border-primary/55 hover:bg-white/[0.04] hover:text-foreground hover:shadow-[0_0_24px_rgba(255,255,255,0.20)] sm:inline-flex"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="hidden h-10 rounded-lg border border-primary/35 bg-transparent px-5 text-sm font-extrabold text-foreground/82 shadow-none transition-[border-color,background-color,box-shadow,color] hover:border-primary/55 hover:bg-white/[0.04] hover:text-foreground hover:shadow-[0_0_24px_rgba(255,255,255,0.20)] sm:inline-flex"
            >
              <Link href="/book-demo">Book a Call</Link>
            </Button>
            <MobileNav items={primaryNav} />
          </div>
        </div>
      </div>
      <ScrollProgress />
    </motion.header>
  );
}
