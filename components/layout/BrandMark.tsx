"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
  if (window.location.pathname !== "/") return;

  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function BrandMark({
  className,
}: {
  className?: string;
}) {
  return (
    <Link
      href="/"
      scroll
      onClick={handleClick}
      aria-label="Kaizen AI home"
      className={cn(
        "relative block h-12 w-[182px] shrink-0 -translate-y-1 overflow-hidden sm:w-[206px]",
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt=""
        fill
        priority
        sizes="(min-width: 640px) 206px, 182px"
        className="object-cover object-center"
        aria-hidden
      />
    </Link>
  );
}
