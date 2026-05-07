import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  withPill = true,
}: {
  className?: string;
  withPill?: boolean;
}) {
  if (!withPill) {
    return (
      <Link
        href="/"
        className={cn(
          "text-foreground inline-flex items-center gap-2 text-sm font-medium",
          className,
        )}
        aria-label="Kaizen AI home"
      >
        <span className="bg-primary/20 grid h-5 w-5 place-items-center rounded-sm">
          <span className="bg-primary block h-2 w-2 rounded-full" />
        </span>
        Kaizen.AI
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="Kaizen AI home"
      className={cn(
        "border-border bg-card/60 text-foreground inline-flex items-center gap-2 rounded-full border py-2 pl-3 pr-5 text-sm font-medium backdrop-blur-md transition-colors hover:border-primary/40",
        className,
      )}
    >
      <span className="bg-primary/20 grid h-5 w-5 place-items-center rounded-sm">
        <span className="bg-primary block h-2 w-2 rounded-full" />
      </span>
      Kaizen.AI
    </Link>
  );
}
