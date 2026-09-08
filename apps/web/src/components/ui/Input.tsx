import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-ink placeholder:text-slate-400",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
