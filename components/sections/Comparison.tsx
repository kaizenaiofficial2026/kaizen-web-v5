import {
  ArrowRight,
  CalendarCheck,
  Clock,
  MessageCircle,
  PhoneCall,
  RefreshCcw,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { cn } from "@/lib/utils";

type ComparisonItem = {
  label: string;
  Icon: LucideIcon;
};

const oldWay: ComparisonItem[] = [
  { label: "Missed calls", Icon: PhoneCall },
  { label: "Slow replies", Icon: MessageCircle },
  { label: "Manual follow-ups", Icon: RefreshCcw },
  { label: "Staff overload", Icon: Users },
  { label: "Lost leads", Icon: TrendingDown },
];

const kaizenWay: ComparisonItem[] = [
  { label: "Instant replies", Icon: Zap },
  { label: "24/7 call handling", Icon: Clock },
  { label: "Automated follow-ups", Icon: RefreshCcw },
  { label: "Booked appointments", Icon: CalendarCheck },
  { label: "More sales", Icon: TrendingUp },
];

function ComparisonPanel({
  title,
  items,
  variant,
}: {
  title: string;
  items: ComparisonItem[];
  variant: "old" | "kaizen";
}) {
  const isKaizen = variant === "kaizen";

  return (
    <Card
      className={cn(
        "relative h-full overflow-hidden p-5",
        isKaizen
          ? "gold-card border-primary/45 shadow-[0_28px_90px_-58px_rgba(201,160,61,0.82)]"
          : "border-white/10 bg-card/34 opacity-85",
      )}
    >
      {isKaizen && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[kaizen-sheen_5.8s_ease-in-out_infinite]"
        />
      )}

      <div className="relative flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            isKaizen ? "bg-primary" : "bg-rose-300/70",
          )}
        />
      </div>

      <StaggerGrid role="list" className="relative mt-5 grid gap-2.5">
        {items.map((item) => {
          const Icon = item.Icon;
          return (
            <StaggerItem key={item.label} role="listitem">
              <div
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3",
                  isKaizen
                    ? "border-primary/20 bg-black/18"
                    : "border-white/8 bg-black/16",
                )}
              >
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-xl border",
                    isKaizen
                      ? "border-primary/26 bg-primary/12 text-primary"
                      : "border-white/10 bg-white/[0.04] text-foreground/52",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {item.label}
                </span>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </Card>
  );
}

export function Comparison() {
  return (
    <section
      id="comparison"
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,160,61,0.08) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      <Container>
        <FadeUp>
          <SectionHeader
            title="Old Way vs Kaizen Way"
            subtitle="A compact view of the shift from reactive follow-up to always-on lead capture."
          />
        </FadeUp>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)]">
          <FadeUp x={-18}>
            <ComparisonPanel title="Old Way" items={oldWay} variant="old" />
          </FadeUp>

          <div className="hidden items-center justify-center lg:flex">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-primary/28 bg-card/50 text-primary shadow-[0_18px_45px_-30px_rgba(201,160,61,0.75)] backdrop-blur-md">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>

          <FadeUp delay={0.08} x={18}>
            <ComparisonPanel
              title="Kaizen Way"
              items={kaizenWay}
              variant="kaizen"
            />
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
