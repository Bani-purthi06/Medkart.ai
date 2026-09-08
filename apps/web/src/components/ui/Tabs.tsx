import { cn } from "@/utils/cn";

export function Tabs<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex rounded-md bg-slate-100 p-1 dark:bg-slate-800" role="tablist">
      {options.map((option) => (
        <button
          key={option.value}
          className={cn(
            "focus-ring rounded px-3 py-1.5 text-sm font-semibold transition",
            value === option.value ? "bg-white text-ink shadow-sm dark:bg-slate-950 dark:text-white" : "text-slate-500",
          )}
          onClick={() => onChange(option.value)}
          role="tab"
          aria-selected={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
