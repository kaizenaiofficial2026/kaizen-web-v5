import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionShellProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  ambient?: boolean;
  hairline?: boolean;
};

export function SectionShell({
  id,
  children,
  className,
  containerClassName,
  ambient = true,
  hairline = true,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden py-16 sm:py-20 lg:py-40",
        className,
      )}
    >
      {ambient && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 50% 0%, rgba(201,160,61,0.08) 0%, rgba(0,0,0,0) 70%), radial-gradient(80% 60% at 50% 100%, rgba(201,160,61,0.05) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
      )}
      {hairline && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      )}
      <Container className={cn("relative z-10", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
