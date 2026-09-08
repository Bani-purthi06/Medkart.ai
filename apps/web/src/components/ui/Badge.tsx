import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-mint/10 px-2.5 py-1 text-xs font-semibold text-mint",
        className,
      )}
      {...props}
    />
  );
}
