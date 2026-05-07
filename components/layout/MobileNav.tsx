"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { BrandMark } from "./BrandMark";
import type { NavItem } from "@/lib/types";
import { siteConfig } from "@/lib/content/site";
import { cn } from "@/lib/utils";

function isNavItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="text-foreground/80 hover:bg-primary/10 hover:text-primary lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col gap-8 border-border bg-background pt-10 text-foreground"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <BrandMark withPill={false} surface="dark" />
        <nav aria-label="Mobile primary" className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive = isNavItemActive(pathname, item.href);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "-mx-3 rounded-lg px-3 py-3 text-2xl font-semibold tracking-tight text-foreground/72 transition-colors hover:bg-primary/10 hover:text-primary",
                    isActive && "bg-primary/15 text-primary",
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
        <Separator />
        <div className="flex flex-col gap-3">
          <SheetClose asChild>
            <Link
              href="/demo"
              className={buttonVariants({
                size: "lg",
                className:
                  "w-full rounded-xl bg-primary text-primary-foreground hover:bg-accent",
              })}
            >
              Book demo
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <a
              href={`mailto:${siteConfig.salesEmail}`}
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "w-full rounded-xl border-primary/40 bg-background text-foreground hover:bg-primary/10 hover:text-primary",
              })}
            >
              Contact sales
            </a>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
