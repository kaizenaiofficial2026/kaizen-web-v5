import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "footer" | "header" | "nav" | "main";
  size?: "default" | "narrow" | "wide";
};

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-10",
        size === "default" && "max-w-6xl",
        size === "narrow" && "max-w-4xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
      {...props}
    />
  );
}
