"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-8 pt-10">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <BrandMark withPill={false} />
        <nav aria-label="Mobile primary" className="flex flex-col gap-1">
          {items.map((item) => (
            <SheetClose asChild key={item.href}>
              <a
                href={item.href}
                className="text-foreground hover:bg-primary/10 hover:text-primary -mx-3 rounded-lg px-3 py-3 text-2xl font-medium tracking-tight transition-colors"
              >
                {item.label}
              </a>
            </SheetClose>
          ))}
        </nav>
        <Separator />
        <div className="flex flex-col gap-3">
          <SheetClose asChild>
            <a href="#cta">
              <Button className="w-full" size="lg">
                Get started
              </Button>
            </a>
          </SheetClose>
          <SheetClose asChild>
            <a href="#cta">
              <Button variant="outline" className="w-full" size="lg">
                Sign in
              </Button>
            </a>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
