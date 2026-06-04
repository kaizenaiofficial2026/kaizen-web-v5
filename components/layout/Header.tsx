"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { openConsultationModal } from "@/components/contact/ConsultationModal";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./BrandMark";
import { MobileNav } from "./MobileNav";
import { ScrollProgress } from "./ScrollProgress";
import { primaryNav } from "@/lib/content/nav";
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
  item: (typeof primaryNav)[number],
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const currentSearch = useSyncExternalStore(
    subscribeToLocationChange,
    getSearchSnapshot,
    getServerSearchSnapshot,
  );
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  useEffect(() => {
    function handleDocumentPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("pointerdown", handleDocumentPointerDown);
    return () =>
      document.removeEventListener("pointerdown", handleDocumentPointerDown);
  }, []);

  return (
    <>
      <motion.header
        role="banner"
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors",
          scrolled
            ? "border-border bg-background/88 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : isHomePage
              ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
              : "border-border/50 bg-background/72 backdrop-blur-xl",
        )}
      >
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-[72px]">
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 lg:h-20 lg:gap-6">
            <BrandMark className="text-xl tracking-tight" />

            <nav
              ref={navRef}
              aria-label="Primary"
              className="hidden items-center gap-8 text-[15px] font-semibold text-foreground/62 lg:flex"
            >
              {primaryNav.map((item) => {
                const isActive = isNavItemActive(
                  pathname,
                  currentSearch,
                  item,
                );
                const hasChildren = !!item.children?.length;

                if (hasChildren) {
                  const dropdownOpen = openDropdown === item.label;

                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      onFocus={() => setOpenDropdown(item.label)}
                      onBlur={(event) => {
                        if (
                          !event.currentTarget.contains(
                            event.relatedTarget as Node | null,
                          )
                        ) {
                          setOpenDropdown(null);
                        }
                      }}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={() => {
                            setOpenDropdown(null);
                            notifyLocationChange();
                          }}
                          aria-current={isActive ? "page" : undefined}
                          aria-haspopup="menu"
                          aria-expanded={dropdownOpen}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-md py-7 transition-colors",
                            isActive
                              ? "text-primary"
                              : "hover:text-foreground focus-visible:text-foreground focus-visible:outline-none",
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              dropdownOpen && "rotate-180",
                            )}
                            aria-hidden
                          />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded={dropdownOpen}
                          aria-current={isActive ? "page" : undefined}
                          onClick={() =>
                            setOpenDropdown((current) =>
                              current === item.label ? null : item.label,
                            )
                          }
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-md py-7 transition-colors",
                            isActive
                              ? "text-primary"
                              : "hover:text-foreground focus-visible:text-foreground focus-visible:outline-none",
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              dropdownOpen && "rotate-180",
                            )}
                            aria-hidden
                          />
                        </button>
                      )}
                      <div
                        role="menu"
                        className={cn(
                          "absolute left-1/2 top-full z-50 w-[32rem] -translate-x-1/2 rounded-2xl border border-primary/20 bg-background/95 p-2 shadow-[0_24px_70px_-38px_color-mix(in_oklab,var(--primary)_80%,transparent)] backdrop-blur-xl transition-all duration-200",
                          dropdownOpen
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-1 opacity-0",
                        )}
                      >
                        {item.children?.map((child) => {
                          const isChildActive = isHrefActive(
                            pathname,
                            currentSearch,
                            child.href,
                          );
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => {
                                setOpenDropdown(null);
                                notifyLocationChange();
                              }}
                              role="menuitem"
                              aria-current={isChildActive ? "page" : undefined}
                              className={cn(
                                "group block rounded-xl px-4 py-3 transition-colors hover:bg-primary/10",
                                isChildActive && "text-primary",
                              )}
                            >
                              <span
                                className={cn(
                                  "block text-sm font-semibold text-foreground/82 transition-colors group-hover:text-primary",
                                  isChildActive && "text-primary",
                                )}
                              >
                                {child.label}
                              </span>
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
                      isActive ? "text-primary" : "hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="col-start-3 flex items-center justify-end gap-5">
              <Button
                asChild
                size="sm"
                className="hidden h-10 rounded-lg border-0 bg-transparent px-2 text-sm font-medium text-foreground/86 shadow-none hover:bg-transparent hover:text-foreground lg:inline-flex"
              >
                <a href="#">Client Portal</a>
              </Button>
              <Button
                size="sm"
                className="hidden h-12 rounded-lg border border-[#b88b25]/70 bg-black/10 px-6 text-sm font-semibold text-[#d6a738] shadow-[0_0_34px_-15px_rgba(216,169,40,0.95),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#d0a235] hover:bg-[#c49a30]/10 hover:text-[#ecd479] lg:inline-flex"
                onClick={openConsultationModal}
              >
                Free Consultation
                <ArrowRight aria-hidden />
              </Button>
              <MobileNav items={primaryNav} />
            </div>
          </div>
        </div>
        <ScrollProgress />
      </motion.header>
    </>
  );
}
