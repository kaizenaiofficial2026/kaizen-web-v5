import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
}: {
  className?: string;
  withPill?: boolean;
  surface?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label="Kaizen AI home"
      className={cn(
        "relative block h-10 w-[152px] shrink-0 overflow-hidden sm:w-[172px]",
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt=""
        fill
        priority
        sizes="(min-width: 640px) 172px, 152px"
        className="object-cover object-center"
        aria-hidden
      />
    </Link>
  );
}
