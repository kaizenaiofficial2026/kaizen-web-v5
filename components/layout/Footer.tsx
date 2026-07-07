import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { BrandMark } from "./BrandMark";
import { footerColumns, legalLinks, socialLinks } from "@/lib/content/footer";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start justify-items-center gap-y-12 text-center sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-12">
          <div className="flex w-full max-w-xs flex-col items-center">
            <BrandMark />
            <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-6">
              The Future of Agentic AI, Delivered Today.
            </p>
            <nav
              aria-label="Social"
              className="mt-8 grid w-52 grid-cols-3 justify-items-center gap-y-4 md:w-48 lg:w-52"
            >
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="group/social border-border text-muted-foreground hover:text-primary hover:border-primary/40 relative grid h-11 w-11 place-items-center rounded-full border transition-colors"
                  >
                    <span
                      aria-hidden
                      className="border-border bg-background text-foreground pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border px-2 py-1 text-xs font-medium opacity-0 shadow-lg transition-opacity group-hover/social:opacity-100 group-focus-visible/social:opacity-100"
                    >
                      {s.label}
                    </span>
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{s.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {footerColumns.map((col) => (
            <div
              key={col.heading}
              className={cn(
                "w-full max-w-56 min-w-0 text-left",
                col.heading === "Company" && "lg:translate-x-6 xl:translate-x-8",
              )}
            >
              <h3 className="text-foreground text-xs font-semibold uppercase tracking-[0.18em]">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary block text-sm leading-6 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2026 KaizenAI. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                scroll={false}
                className="hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <span className="text-muted-foreground/70">English (US)</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
