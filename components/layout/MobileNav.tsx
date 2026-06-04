"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
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
import { cn } from "@/lib/utils";

function getPathFromHref(href: string) {
  return href.split(/[?#]/)[0] || "/";
}

function getSearchFromHref(href: string) {
  const queryStart = href.indexOf("?");
  if (queryStart === -1) return "";

  const hashStart = href.indexOf("#", queryStart);
  return href.slice(queryStart, hashStart === -1 ? undefined : hashStart);
}

function normalizeSearch(search: string) {
  const params = new URLSearchParams(search);
  return params.toString();
}

function subscribeToLocationChange(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("kaizen-locationchange", callback);

  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("kaizen-locationchange", callback);
  };
}

function getSearchSnapshot() {
  return window.location.search;
}

function getServerSearchSnapshot() {
  return "";
}

function notifyLocationChange() {
  const dispatch = () => {
    window.dispatchEvent(new Event("kaizen-locationchange"));
  };

  window.setTimeout(dispatch, 0);
  window.setTimeout(dispatch, 120);
}

function isHrefActive(pathname: string, currentSearch: string, href: string) {
  const hrefPath = getPathFromHref(href);
  const hrefSearch = getSearchFromHref(href);
  const pathMatches =
    hrefPath === "/"
      ? pathname === "/"
      : pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);

  if (!pathMatches) return false;

  if (hrefSearch) {
    const normalizedCurrentSearch = normalizeSearch(currentSearch);
    const normalizedHrefSearch = normalizeSearch(hrefSearch);

    return normalizedCurrentSearch === normalizedHrefSearch;
  }

  return true;
}

function isNavItemActive(
  pathname: string,
  currentSearch: string,
  item: NavItem,
) {
  return (
    (item.href ? isHrefActive(pathname, currentSearch, item.href) : false) ||
    Boolean(
      item.children?.some((child) =>
        isHrefActive(pathname, currentSearch, child.href),
      ),
    )
  );
}

export function MobileNav({
  items,
}: {
  items: NavItem[];
}) {
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );
  const pathname = usePathname();
  const currentSearch = useSyncExternalStore(
    subscribeToLocationChange,
    getSearchSnapshot,
    getServerSearchSnapshot,
  );

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
        className="flex h-dvh max-h-dvh flex-col gap-6 overflow-y-auto overscroll-contain border-border bg-background px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-[calc(2.5rem+env(safe-area-inset-top))] text-foreground sm:gap-8 sm:px-6 lg:px-6"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex items-center justify-between gap-4">
          <BrandMark />
        </div>
        <nav aria-label="Mobile primary" className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive = isNavItemActive(pathname, currentSearch, item);
            const hasChildren = !!item.children?.length;
            const expanded = expandedItems[item.label] ?? isActive;

            if (hasChildren) {
              return (
                <div key={item.href ?? item.label}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() =>
                      setExpandedItems((current) => ({
                        ...current,
                        [item.label]: !expanded,
                      }))
                    }
                    className={cn(
                      "-mx-3 flex w-[calc(100%+1.5rem)] items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-xl font-semibold tracking-tight text-foreground/72 transition-colors hover:bg-primary/10 hover:text-primary sm:text-2xl",
                      isActive && "bg-primary/15 text-primary",
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 transition-transform",
                        expanded && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-200",
                      expanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-1 space-y-1 border-l border-primary/20 pl-4">
                        {item.children?.map((child) => {
                          const isChildActive = isHrefActive(
                            pathname,
                            currentSearch,
                            child.href,
                          );

                          return (
                            <SheetClose asChild key={child.href}>
                              <Link
                                href={child.href}
                                onClick={notifyLocationChange}
                                aria-current={
                                  isChildActive ? "page" : undefined
                                }
                                className={cn(
                                  "block rounded-lg px-3 py-2 transition-colors hover:bg-primary/10",
                                  isChildActive && "bg-primary/10 text-primary",
                                )}
                              >
                                <span
                                  className={cn(
                                    "block text-base font-semibold text-foreground/68 hover:text-primary",
                                    isChildActive && "text-primary",
                                  )}
                                >
                                  {child.label}
                                </span>
                              </Link>
                            </SheetClose>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={item.href ?? item.label}>
                {item.href ? (
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      onClick={notifyLocationChange}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-3 text-xl font-semibold tracking-tight text-foreground/72 transition-colors hover:bg-primary/10 hover:text-primary sm:text-2xl",
                        isActive && "bg-primary/15 text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ) : (
                  <div
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "-mx-3 block rounded-lg px-3 py-3 text-xl font-semibold tracking-tight text-foreground/72 sm:text-2xl",
                      isActive && "bg-primary/15 text-primary",
                    )}
                  >
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <Separator />
        <div className="flex flex-col gap-3">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-xl border-primary/40 bg-background text-foreground hover:bg-primary/10 hover:text-primary"
          >
            <a href="#" onClick={() => setOpen(false)}>
              Client Portal
            </a>
          </Button>
          <SheetClose asChild>
            <Link
              href="/contact#book"
              className={buttonVariants({
                size: "lg",
                className:
                  "w-full rounded-xl bg-primary text-primary-foreground hover:bg-accent",
              })}
            >
              Book Consultation
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
