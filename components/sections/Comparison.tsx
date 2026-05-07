import { Check, X, Plus } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { challenges, solutions } from "@/lib/content/comparison";

export function Comparison() {
  return (
    <section
      id="comparison"
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
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.18em]">
              Comparison
            </span>
            <h2 className="text-foreground text-h2 mt-4 font-bold">
              From chaos to clarity:
              <br />
              simplify your workflow
            </h2>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lead">
              Manage everything in one place — no more scattered apps or manual
              work.
            </p>
          </div>
        </FadeUp>

        <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2">
          {/* Traditional column — visually de-emphasized */}
          <FadeUp className="opacity-80">
            <div className="flex h-full flex-col">
              <div className="border-border bg-card/40 rounded-2xl border px-6 py-5 text-center">
                <span className="text-foreground/70 text-base font-semibold">
                  Traditional approach
                </span>
              </div>
              <div className="border-border bg-card/40 mt-4 flex-1 rounded-2xl border px-6 py-8 sm:px-8">
                <h3 className="text-foreground/80 text-lg font-semibold">
                  Challenges
                </h3>
                <StaggerGrid
                  role="list"
                  className="mt-6 space-y-4 text-sm sm:text-base"
                >
                  {challenges.map((item) => (
                    <StaggerItem
                      role="listitem"
                      key={item}
                      className="text-foreground/70 flex items-center gap-3"
                    >
                      <span
                        aria-hidden
                        className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-rose-300/40 text-rose-300/80"
                      >
                        <X className="h-3 w-3" />
                      </span>
                      {item}
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </div>
            </div>
          </FadeUp>

          {/* Kaizen AI column — featured */}
          <FadeUp delay={0.05}>
            <div className="flex h-full flex-col">
              <div className="bg-primary rounded-2xl px-6 py-5 text-center">
                <span className="text-primary-foreground inline-flex items-center gap-2 text-base font-semibold">
                  <span
                    aria-hidden
                    className="bg-primary-foreground/15 grid h-5 w-5 place-items-center rounded-full"
                  >
                    <Plus className="h-3 w-3" />
                  </span>
                  Kaizen AI
                </span>
              </div>
              <div className="gold-card border-primary/40 mt-4 flex-1 rounded-2xl border px-6 py-8 sm:px-8">
                <h3 className="text-foreground text-lg font-semibold">
                  Our solution
                </h3>
                <StaggerGrid
                  role="list"
                  className="mt-6 space-y-4 text-sm sm:text-base"
                >
                  {solutions.map((item) => (
                    <StaggerItem
                      role="listitem"
                      key={item}
                      className="text-foreground flex items-center gap-3"
                    >
                      <span
                        aria-hidden
                        className="bg-primary text-primary-foreground grid h-5 w-5 shrink-0 place-items-center rounded-full"
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </div>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
