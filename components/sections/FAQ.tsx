import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeUp } from "@/components/motion/FadeUp";
import { faqs } from "@/lib/content/faq";

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,160,61,0.06) 0%, rgba(10,9,7,0) 70%)",
        }}
      />
      <Container>
        <FadeUp>
          <div className="border-border bg-card/60 rounded-2xl border px-6 py-10 backdrop-blur-md sm:px-12 sm:py-14">
            <div className="flex items-start justify-between gap-8 pb-10">
              <p className="text-muted-foreground max-w-sm text-sm leading-6 sm:text-base">
                Can&apos;t find the answer?
                <br />
                Book a call and we&apos;ll walk you through it.
              </p>
              <h2 className="text-foreground flex items-start gap-3 font-serif text-5xl italic leading-none tracking-tight sm:text-6xl">
                FAQ
                <ArrowUpRight
                  aria-hidden
                  className="text-primary mt-1 h-7 w-7 sm:h-9 sm:w-9"
                />
              </h2>
            </div>

            <Accordion
              type="single"
              collapsible
              className="border-border border-t"
            >
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
