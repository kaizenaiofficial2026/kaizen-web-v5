import { Check, X } from "lucide-react";
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
              Work
            </span>
            <h2 className="text-foreground text-h2 mt-4 font-bold">
              The old way vs.
              <br />
              the Kaizen way
            </h2>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lead">
              A missed call after hours can become a booked appointment for a
              competitor minutes later. Kaizen closes that gap.
            </p>
          </div>
        </FadeUp>

        <div className="relative mt-14 grid items-stretch gap-5 sm:grid-cols-2">
          {/* Traditional column — visually de-emphasized */}
          <FadeUp x={-24} className="opacity-80">
            <div className="flex h-full flex-col">
              <div className="border-border bg-card/35 rounded-2xl border px-6 py-5 text-center">
                <span className="text-foreground/70 text-base font-semibold">
                  Manual follow-up
                </span>
              </div>
              <div className="border-border bg-card/35 mt-4 flex-1 rounded-2xl border px-6 py-8 sm:px-8">
                <h3 className="text-foreground/80 text-lg font-semibold">
                  Staff and manual follow-up
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
                        className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-rose-300/40 text-rose-300/80 shadow-[0_0_0_0_rgba(253,164,175,0.25)] animate-[kaizen-x-pulse_0.75s_ease-out_both]"
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
          <FadeUp delay={0.08} x={24}>
            <div className="flex h-full flex-col">
              <div className="bg-primary shadow-[0_24px_70px_-36px_color-mix(in_oklab,var(--primary)_90%,transparent)] rounded-2xl px-6 py-5 text-center">
                <span className="text-primary-foreground inline-flex items-center gap-2 text-base font-semibold">
                  <span
                    aria-hidden
                    className="bg-primary-foreground/15 relative grid h-5 w-5 place-items-center rounded-full"
                  >
                    <span className="bg-primary-foreground absolute h-2 w-2 rounded-full" />
                    <span className="border-primary-foreground/45 absolute h-5 w-5 rounded-full border animate-[kaizen-status-pulse_2.2s_ease-in-out_infinite]" />
                  </span>
                  Kaizen AI active
                </span>
              </div>
              <div className="gold-card border-primary/45 shadow-[0_28px_90px_-48px_color-mix(in_oklab,var(--primary)_80%,transparent)] relative mt-4 flex-1 overflow-hidden rounded-2xl border px-6 py-8 sm:px-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "radial-gradient(70% 45% at 85% 0%, rgba(236,212,121,0.18) 0%, rgba(236,212,121,0) 72%)",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[kaizen-sheen_5.5s_ease-in-out_infinite]"
                />
                <h3 className="text-foreground text-lg font-semibold">
                  One AI, always on
                </h3>
                <StaggerGrid
                  role="list"
                  className="mt-6 space-y-4 text-sm sm:text-base"
                >
                  {solutions.map((item) => (
                    <StaggerItem
                      role="listitem"
                      key={item}
                      className="text-foreground relative flex items-center gap-3"
                    >
                      <span
                        aria-hidden
                        className="bg-primary text-primary-foreground grid h-5 w-5 shrink-0 place-items-center rounded-full shadow-[0_10px_24px_-12px_color-mix(in_oklab,var(--primary)_85%,transparent)] animate-[kaizen-check-pop_0.65s_cubic-bezier(0.22,1,0.36,1)_both]"
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
