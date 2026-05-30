import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/Container";
import { FadeUp } from "@/components/motion/FadeUp";

export function CTA() {
  return (
    <section
      id="cta"
      className="bg-background relative w-full overflow-hidden py-20 sm:py-24 lg:py-28"
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
          <h2 className="text-foreground text-h1 font-bold uppercase">
            Stop <span className="text-primary">missing leads</span>.
            <br className="hidden sm:block" />
            Start <span className="text-primary">growing</span>.
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p className="text-foreground/75 mx-auto mt-5 max-w-2xl text-lead">
            Book a focused call and we&apos;ll show where your business is
            losing customers today, plus the fastest AI agent to launch first.
          </p>
        </FadeUp>
        <FadeUp delay={0.16}>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/book-demo">
                Book a Free Call
                <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
              <Link href="/demo">See Live Demo</Link>
            </Button>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
