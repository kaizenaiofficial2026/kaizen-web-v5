import {
  CalendarDays,
  FileText,
  Rocket,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

type ProcessStep = {
  title: string;
  copy: string;
  Icon: LucideIcon;
};

const steps: ProcessStep[] = [
  {
    title: "Fill the form",
    copy: "Share your offer and lead channels.",
    Icon: FileText,
  },
  {
    title: "Strategy meeting",
    copy: "Choose the fastest AI agent to launch.",
    Icon: CalendarDays,
  },
  {
    title: "We build and train your AI",
    copy: "Services, FAQs, tone, bookings, and handoff rules.",
    Icon: Wrench,
  },
  {
    title: "Launch in 7–10 days",
    copy: "Go live, track leads, and improve from real conversations.",
    Icon: Rocket,
  },
];

export function SimpleProcess() {
  return (
    <section
      id="process"
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(54% 44% at 50% 0%, rgba(201,160,61,0.08) 0%, rgba(10,9,7,0) 72%)",
        }}
      />
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Simple process"
            title={
              <>
                Easy setup.{" "}
                <span className="text-primary">Launch in 7–10 days.</span>
              </>
            }
            subtitle="A low-effort launch path for teams that want speed without chaos."
          />
        </FadeUp>

        <div className="relative mt-10">
          <div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent md:block"
          />
          <StaggerGrid className="grid gap-3 md:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.Icon;
              return (
                <StaggerItem key={step.title} className="relative">
                  <div className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full border border-primary/32 bg-background shadow-[0_0_0_7px_rgba(10,9,7,0.92),0_18px_45px_-34px_rgba(201,160,61,0.78)]">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <Card className="mt-4 h-full p-4 text-center transition-colors hover:border-primary/34">
                    <span className="text-primary text-[11px] font-bold uppercase tracking-[0.16em]">
                      Step {index + 1}
                    </span>
                    <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-5 text-muted-foreground">
                      {step.copy}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </Container>
    </section>
  );
}
