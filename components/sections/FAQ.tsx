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
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,160,61,0.06) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      <Container>
        <FadeUp>
          <div className="border-border bg-card/60 rounded-2xl border px-6 py-8 backdrop-blur-md sm:px-10 sm:py-10">
            <div className="flex flex-col-reverse items-start justify-between gap-6 pb-8 sm:flex-row sm:gap-8">
              <p className="text-muted-foreground max-w-sm text-sm leading-6 sm:text-base">
                Can&apos;t find the answer?
                <br />
                Book a call and we&apos;ll walk you through it.
              </p>
              <h2 className="text-foreground flex items-start gap-3 font-serif text-4xl italic leading-none tracking-tight sm:text-6xl">
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
