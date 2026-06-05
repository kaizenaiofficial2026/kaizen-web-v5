import {
  DraftingCompass,
  Map,
  Rocket,
  SearchCheck,
  Settings2,
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
    title: "Discover",
    copy: "We map your operations and identify the highest-impact AI opportunities.",
    Icon: SearchCheck,
  },
  {
    title: "Map",
    copy: "We design the full AI system architecture tailored to your business.",
    Icon: Map,
  },
  {
    title: "Design",
    copy: "Workflows, logic, and integrations are blueprinted before a line is built.",
    Icon: DraftingCompass,
  },
  {
    title: "Build",
    copy: "We build, test, and refine your production-ready AI system end to end.",
    Icon: Settings2,
  },
  {
    title: "Launch",
    copy: "Your AI goes live, integrated, and working. We stay on for support.",
    Icon: Rocket,
  },
];

export function SimpleProcess() {
  return (
    <section
      id="process"
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            title={
              <>
                From Challenge To{" "}
                <span className="text-primary">Working AI System</span>
              </>
            }
            subtitle="A structured delivery process that takes you from problem to production in 30 days."
            className="[&_h2]:mt-0"
          />
        </FadeUp>

        <div className="relative mt-10">
          <div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent md:block"
          />
          <StaggerGrid className="grid items-stretch gap-4 md:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.Icon;
              return (
                <StaggerItem key={step.title} className="relative flex h-full flex-col">
                  <div className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full border border-primary/32 bg-background shadow-[0_0_0_7px_rgba(0,0,0,0.92),0_18px_45px_-34px_rgba(201,160,61,0.78)]">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <Card className="relative mt-5 flex min-h-[188px] h-full flex-col items-center overflow-hidden border-primary/18 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(196,154,48,0.045)_48%,rgba(0,0,0,0.58)_100%)] p-5 text-center shadow-[0_24px_74px_-64px_rgba(196,154,48,0.9)] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/42 hover:shadow-[0_28px_90px_-58px_rgba(196,154,48,0.95)]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-6 -top-10 h-20 rounded-full bg-primary/12 blur-2xl"
                    />
                    <span className="relative text-primary text-[11px] font-bold uppercase tracking-[0.16em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="relative mt-4 text-base font-semibold leading-tight tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
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
