import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  tone = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "accent" | "success" | "warn" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "default" && "bg-primary/15 text-accent",
        tone === "accent" && "bg-accent/15 text-accent",
        tone === "success" && "bg-success/15 text-success",
        tone === "warn" && "bg-warn/15 text-warn",
        tone === "muted" && "bg-surface-2 text-muted",
        className,
      )}
      {...props}
    />
  );
}
