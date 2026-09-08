import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-orange-100 bg-white shadow-sm transition",
        className,
      )}
      {...props}
    />
  );
}
