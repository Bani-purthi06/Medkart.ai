import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "bg-mint text-white hover:bg-mint/90 active:scale-[0.98]",
  secondary: "bg-white text-ink ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:ring-slate-700",
  ghost: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  danger: "bg-coral text-white hover:bg-coral/90 active:scale-[0.98]",
};

export function Button({ className, variant = "primary", icon, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
