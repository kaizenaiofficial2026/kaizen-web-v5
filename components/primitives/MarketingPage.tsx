import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { Grain } from "@/components/primitives/Grain";
import { cn } from "@/lib/utils";

type HeroAction = {
  label: string;
  href: string;
  variant?: "default" | "outline";
};

type MarketingHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  actions?: HeroAction[];
  children?: React.ReactNode;
  className?: string;
};

type MarketingSectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  ambient?: boolean;
  hairline?: boolean;
};

export function MarketingHero({
  eyebrow,
  title,
  subtitle,
  actions,
  children,
  className,
}: MarketingHeroProps) {
  const hasVisual = Boolean(children);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(70% 55% at 50% 0%, rgba(201,160,61,0.20) 0%, rgba(201,160,61,0.06) 38%, rgba(10,9,7,0) 72%)",
        }}
      />
      <Grain />
      <Container
        className={cn(
          "relative z-10",
          hasVisual
            ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.82fr)]"
            : "text-center",
        )}
      >
        <FadeUp className={cn(!hasVisual && "mx-auto max-w-4xl")}>
          <span className="border-primary/25 bg-card/60 text-foreground/85 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs backdrop-blur-md sm:text-sm">
            <span className="bg-primary block h-1.5 w-1.5 rounded-full" />
            {eyebrow}
          </span>
          <h1 className="text-foreground mt-6 text-h1 font-medium">
            {title}
          </h1>
          <p
            className={cn(
              "text-foreground/75 mt-6 max-w-2xl text-lead",
              !hasVisual && "mx-auto",
            )}
          >
            {subtitle}
          </p>
          {actions && actions.length > 0 && (
            <div
              className={cn(
                "mt-10 flex flex-wrap gap-3",
                hasVisual ? "justify-start" : "justify-center",
              )}
            >
              {actions.map((action, index) => (
                <Button
                  asChild
                  key={action.href}
                  size="xl"
                  variant={action.variant ?? (index === 0 ? "default" : "outline")}
                >
                  <Link href={action.href}>
                    {action.label}
                    {index === 0 && <ArrowRight aria-hidden />}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </FadeUp>
        {children && (
          <FadeUp delay={0.1} className="w-full">
            {children}
          </FadeUp>
        )}
      </Container>
    </section>
  );
}

export function MarketingSection({
  id,
  children,
  className,
  containerClassName,
  ambient = true,
  hairline = true,
}: MarketingSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden py-20 sm:py-28 lg:py-32",
        className,
      )}
    >
      {ambient && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 50% 0%, rgba(201,160,61,0.08) 0%, rgba(10,9,7,0) 70%), radial-gradient(80% 60% at 50% 100%, rgba(201,160,61,0.05) 0%, rgba(10,9,7,0) 70%)",
          }}
        />
      )}
      {hairline && (
        <div
          aria-hidden
          className="from-transparent via-primary/30 to-transparent pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r"
        />
      )}
      <Container className={cn("relative z-10", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
