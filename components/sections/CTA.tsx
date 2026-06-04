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
      <Container className="relative z-10 text-center">
        <FadeUp>
          <h2 className="text-foreground text-h1 font-bold uppercase">
            Ready To Discover What AI Can{" "}
            <span className="text-primary">Automate</span> In Your Business?
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p className="text-foreground/75 mx-auto mt-5 max-w-2xl text-lead">
            Book a consultation and we&apos;ll identify the highest-impact AI
            opportunities for your organisation at no cost.
          </p>
        </FadeUp>
        <FadeUp delay={0.16}>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/contact#book">
                Book Consultation
                <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
