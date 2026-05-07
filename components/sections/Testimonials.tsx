import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { testimonials } from "@/lib/content/testimonials";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <FadeUp>
          <SectionHeader
            eyebrow="Results"
            title={
              <>
                Real results, <span className="text-primary">real numbers</span>
              </>
            }
            subtitle="Operators use Kaizen to recover missed calls, capture late-night enquiries, and book more appointments without adding headcount."
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-muted-foreground mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm">
            <span>
              <span className="text-foreground font-semibold">+23</span> extra
              bookings / month
            </span>
            <span aria-hidden className="text-muted-foreground/50">
              ·
            </span>
            <span>
              <span className="text-foreground font-semibold">30+</span>{" "}
              languages
            </span>
            <span aria-hidden className="text-muted-foreground/50">
              ·
            </span>
            <span>
              <span className="text-foreground font-semibold">24/7/365</span>{" "}
              coverage
            </span>
          </p>
        </FadeUp>

        <StaggerGrid className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <Card className="hover:border-primary/30 flex h-full flex-col gap-6 p-7 transition-colors">
                <p className="text-foreground text-base leading-7">
                  “{t.quote}”
                </p>
                <div className="border-border mt-auto flex items-center gap-3 border-t pt-5">
                  <span
                    aria-hidden
                    className="bg-primary/20 text-primary grid h-10 w-10 place-items-center rounded-full text-sm font-semibold"
                  >
                    {t.initials}
                  </span>
                  <div className="text-sm leading-tight">
                    <div className="text-foreground font-medium">
                      {t.author}
                    </div>
                    <div className="text-muted-foreground mt-0.5">
                      {t.title}, {t.company}
                    </div>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
