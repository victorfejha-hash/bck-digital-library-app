import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "lift-card rounded-[var(--radius-xl)] border border-border bg-surface p-4 text-fg",
        className,
      )}
      {...props}
    />
  );
}
