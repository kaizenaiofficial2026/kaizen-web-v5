import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { siteConfig } from "@/lib/content/site";

export function CTA() {
  return (
    <section
      id="cta"
      className="bg-background relative w-full overflow-hidden py-32 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70% 55% at 50% 30%, rgba(201,160,61,0.28) 0%, rgba(201,160,61,0.08) 35%, rgba(10,9,7,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="cta-grid pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
      />
      <Container className="relative z-10 text-center">
        <FadeUp>
          <h2 className="text-foreground text-display font-bold uppercase">
            Ready to <span className="text-primary">amplify</span>
            <br className="hidden sm:block" />
            your <span className="text-primary">output</span> this month?
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p className="text-foreground/75 mx-auto mt-6 max-w-2xl text-lead">
            To maintain our exceptional standards, we work with a carefully
            chosen group of teams. If you&apos;re committed to compounding your
            team&apos;s output, reach out.
          </p>
        </FadeUp>
        <FadeUp delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="xl" className="uppercase tracking-[0.08em]">
              <Link
                href={`mailto:${siteConfig.email}?subject=Free%20website%20audit`}
              >
                Free website audit
                <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href={`mailto:${siteConfig.email}`}>Contact us</Link>
            </Button>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
