import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { features } from "@/lib/content/features";
import { cn } from "@/lib/utils";

export function Features() {
  return (
    <section
      id="features"
      className="relative w-full overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,160,61,0.08) 0%, rgba(10,9,7,0) 70%)",
        }}
      />
      <Container>
        <FadeUp>
          <SectionHeader
            eyebrow="Solutions"
            title={
              <>
                Every customer who reaches out{" "}
                <span className="text-primary">gets heard and booked</span>
              </>
            }
            subtitle="Dental clinic, retail shop, real estate team, law firm, or aesthetic clinic: your agent is trained on your services, pricing, availability, and FAQs."
          />
        </FadeUp>

        <StaggerGrid className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-fr">
          {features.map((feat) => {
            const Icon = feat.icon;
            const isWide = feat.span === "wide";
            return (
              <StaggerItem
                key={feat.title}
                className={cn(isWide && "md:col-span-2 md:row-span-1")}
              >
                <Card
                  className={cn(
                    "group h-full p-7 transition-colors hover:border-primary/40",
                    isWide && "p-9",
                  )}
                >
                  <div
                    className={cn(
                      "border-primary/30 bg-primary/10 text-primary inline-flex items-center justify-center rounded-xl border",
                      isWide ? "h-12 w-12" : "h-10 w-10",
                    )}
                  >
                    <Icon
                      className={isWide ? "h-6 w-6" : "h-5 w-5"}
                      aria-hidden
                    />
                  </div>
                  <h3
                    className={cn(
                      "text-foreground mt-5 font-semibold tracking-tight",
                      isWide ? "text-2xl" : "text-lg",
                    )}
                  >
                    {feat.title}
                  </h3>
                  <p
                    className={cn(
                      "text-muted-foreground mt-2 leading-7",
                      isWide ? "max-w-md text-base" : "text-sm",
                    )}
                  >
                    {feat.description}
                  </p>
                  {/* Decorative gradient for the hero card */}
                  {isWide && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -z-10 opacity-40"
                      style={{
                        backgroundImage:
                          "radial-gradient(50% 60% at 80% 20%, rgba(201,160,61,0.18) 0%, rgba(201,160,61,0) 70%)",
                      }}
                    />
                  )}
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </Container>
    </section>
  );
}
