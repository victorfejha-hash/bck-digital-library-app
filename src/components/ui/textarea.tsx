import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-[var(--radius-md)] border border-border bg-bg-elevated px-3 py-2.5 text-sm text-fg placeholder:text-subtle",
        "transition-[border-color] duration-150 focus-visible:border-primary",
        className,
      )}
      {...props}
    />
  );
}
