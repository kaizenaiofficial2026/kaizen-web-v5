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
          <StaggerGrid className="grid gap-3 md:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.Icon;
              return (
                <StaggerItem key={step.title} className="relative">
                  <div className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full border border-primary/32 bg-background shadow-[0_0_0_7px_rgba(0,0,0,0.92),0_18px_45px_-34px_rgba(201,160,61,0.78)]">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <Card className="mt-4 h-full p-4 text-center transition-colors hover:border-primary/34">
                    <span className="text-primary text-[11px] font-bold uppercase tracking-[0.16em]">
                      {String(index + 1).padStart(2, "0")}
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
