import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { BrandMark } from "./BrandMark";
import { siteConfig } from "@/lib/content/site";
import { footerColumns, legalLinks, socialLinks } from "@/lib/content/footer";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <BrandMark />
            <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-6">
              AI chatbots and voice agents that never miss a customer.
            </p>
            <nav aria-label="Social" className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="border-border text-muted-foreground hover:text-primary hover:border-primary/40 grid h-9 w-9 place-items-center rounded-full border transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{s.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-foreground text-xs font-semibold uppercase tracking-[0.18em]">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border mt-16 flex flex-col items-start justify-between gap-4 border-t pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
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
